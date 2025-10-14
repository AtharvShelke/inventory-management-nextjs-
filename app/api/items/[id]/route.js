import db from '@/lib/db';
import { NextResponse } from 'next/server';
import { updateItemSchema } from '@/lib/validations/item.validation';
import { handleApiError, ApiError } from '@/lib/api/errorHandler';

/**
 * Validate MongoDB ObjectId format
 */
function isValidObjectId(id) {
  return /^[0-9a-fA-F]{24}$/.test(id);
}

/**
 * GET /api/items/[id] - Get a single item by ID
 */
export async function GET(request, { params }) {
  try {
    const { id } = params;

    if (!isValidObjectId(id)) {
      throw new ApiError('Invalid item ID format', 400);
    }

    const item = await db.item.findUnique({
      where: { id },
      include: {
        supplier: {
          select: {
            id: true,
            title: true,
            email: true,
            phone: true,
            address: true,
            contactPerson: true,
            supplierCode: true,
          },
        },
        warehouse: {
          select: {
            id: true,
            title: true,
            location: true,
            warehouseType: true,
            description: true,
          },
        },
        AddStockAdjustment: {
          take: 5,
          orderBy: { id: 'desc' },
          select: {
            id: true,
            referenceNumber: true,
            addStockQty: true,
            description: true,
            username: true,
          },
        },
        TransferStockAdjustment: {
          take: 5,
          orderBy: { createdAt: 'desc' },
          select: {
            id: true,
            referenceNumber: true,
            transferStockQty: true,
            description: true,
            username: true,
            createdAt: true,
          },
        },
      },
    });

    if (!item) {
      throw new ApiError('Item not found', 404);
    }

    // Calculate stock status
    const qty = parseInt(item.qty) || 0;
    const stockStatus = qty < item.minStockLevel 
      ? 'critical' 
      : qty < item.reorderPoint 
      ? 'low' 
      : 'good';

    return NextResponse.json({
      success: true,
      data: {
        ...item,
        stockStatus,
      },
    });
  } catch (error) {
    return handleApiError(error);
  } finally {
    await db.$disconnect();
  }
}

/**
 * PUT /api/items/[id] - Update an item by ID
 */
export async function PUT(request, { params }) {
  try {
    const { id } = params;

    if (!isValidObjectId(id)) {
      throw new ApiError('Invalid item ID format', 400);
    }

    // Check if item exists
    const existingItem = await db.item.findUnique({
      where: { id },
      select: { id: true },
    });

    if (!existingItem) {
      throw new ApiError('Item not found', 404);
    }

    // Parse and validate request body
    const body = await request.json();
    const validatedData = updateItemSchema.parse(body);

    // Verify supplier exists if being updated
    if (validatedData.supplierId) {
      const supplier = await db.supplier.findUnique({
        where: { id: validatedData.supplierId },
        select: { id: true },
      });

      if (!supplier) {
        throw new ApiError('Supplier not found', 404);
      }
    }

    // Verify warehouse exists if being updated
    if (validatedData.warehouseId) {
      const warehouse = await db.warehouse.findUnique({
        where: { id: validatedData.warehouseId },
        select: { id: true },
      });

      if (!warehouse) {
        throw new ApiError('Warehouse not found', 404);
      }
    }

    // Check for duplicate SKU or barcode if being updated
    if (validatedData.sku || validatedData.barcode) {
      const duplicateCheck = await db.item.findFirst({
        where: {
          AND: [
            { id: { not: id } }, // Exclude current item
            {
              OR: [
                validatedData.sku ? { sku: validatedData.sku } : {},
                validatedData.barcode ? { barcode: validatedData.barcode } : {},
              ],
            },
          ],
        },
      });

      if (duplicateCheck) {
        throw new ApiError(
          'Another item with this SKU or barcode already exists',
          409,
          {
            duplicateField: duplicateCheck.sku === validatedData.sku ? 'sku' : 'barcode',
          }
        );
      }
    }

    // Update the item
    const updatedItem = await db.item.update({
      where: { id },
      data: {
        ...validatedData,
        updatedAt: new Date(),
      },
      include: {
        supplier: {
          select: {
            id: true,
            title: true,
            email: true,
            phone: true,
          },
        },
        warehouse: {
          select: {
            id: true,
            title: true,
            location: true,
            warehouseType: true,
          },
        },
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Item updated successfully',
      data: updatedItem,
    });
  } catch (error) {
    return handleApiError(error);
  } finally {
    await db.$disconnect();
  }
}

/**
 * DELETE /api/items/[id] - Delete an item by ID
 */
export async function DELETE(request, { params }) {
  try {
    const { id } = params;

    if (!isValidObjectId(id)) {
      throw new ApiError('Invalid item ID format', 400);
    }

    // Check if item exists
    const existingItem = await db.item.findUnique({
      where: { id },
      include: {
        _count: {
          select: {
            InvoiceItem: true,
            AddStockAdjustment: true,
            TransferStockAdjustment: true,
          },
        },
      },
    });

    if (!existingItem) {
      throw new ApiError('Item not found', 404);
    }

    // Check if item is referenced in invoices
    if (existingItem._count.InvoiceItem > 0) {
      throw new ApiError(
        'Cannot delete item that is referenced in invoices',
        400,
        {
          invoiceCount: existingItem._count.InvoiceItem,
          suggestion: 'Consider marking the item as inactive instead',
        }
      );
    }

    // Delete the item (cascade will handle related adjustments)
    await db.item.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: 'Item deleted successfully',
      data: { id },
    });
  } catch (error) {
    return handleApiError(error);
  } finally {
    await db.$disconnect();
  }
}
