import db from '@/lib/db';
import { NextResponse } from 'next/server';
import { handleApiError, ApiError } from '@/lib/api/errorHandler';
import { z } from 'zod';

// Validation helpers
function isValidObjectId(id) {
  return /^[0-9a-fA-F]{24}$/.test(id);
}

const updateWarehouseSchema = z.object({
  title: z.string().min(1).max(200).optional(),
  location: z.string().optional().nullable(),
  warehouseType: z.string().optional(),
  description: z.string().max(1000).optional().nullable(),
});

/**
 * GET /api/warehouse/[id] - Get a single warehouse
 */
export async function GET(request, { params }) {
  try {
    const { id } = params;

    if (!isValidObjectId(id)) {
      throw new ApiError('Invalid warehouse ID format', 400);
    }

    const warehouse = await db.warehouse.findUnique({
      where: { id },
      include: {
        _count: {
          select: { Item: true, AddStockAdjustment: true },
        },
        Item: {
          take: 10,
          orderBy: { createdAt: 'desc' },
          select: {
            id: true,
            title: true,
            qty: true,
            category: true,
            createdAt: true,
          },
        },
      },
    });

    if (!warehouse) {
      throw new ApiError('Warehouse not found', 404);
    }

    return NextResponse.json({
      success: true,
      data: warehouse,
    });
  } catch (error) {
    return handleApiError(error);
  } finally {
    await db.$disconnect();
  }
}

/**
 * PUT /api/warehouse/[id] - Update a warehouse
 */
export async function PUT(request, { params }) {
  try {
    const { id } = params;

    if (!isValidObjectId(id)) {
      throw new ApiError('Invalid warehouse ID format', 400);
    }

    // Check if warehouse exists
    const existingWarehouse = await db.warehouse.findUnique({
      where: { id },
    });

    if (!existingWarehouse) {
      throw new ApiError('Warehouse not found', 404);
    }

    // Parse and validate body
    const body = await request.json();
    const { id: removedId, ...updateData } = body;
    const validatedData = updateWarehouseSchema.parse(updateData);

    // Check for duplicate name if title is being updated
    if (validatedData.title && validatedData.title !== existingWarehouse.title) {
      const duplicateWarehouse = await db.warehouse.findFirst({
        where: {
          title: validatedData.title,
          id: { not: id },
        },
      });

      if (duplicateWarehouse) {
        throw new ApiError('A warehouse with this name already exists', 409);
      }
    }

    // Update warehouse
    const updatedWarehouse = await db.warehouse.update({
      where: { id },
      data: {
        ...validatedData,
        updatedAt: new Date(),
      },
      include: {
        _count: {
          select: { Item: true },
        },
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Warehouse updated successfully',
      data: updatedWarehouse,
    });
  } catch (error) {
    return handleApiError(error);
  } finally {
    await db.$disconnect();
  }
}

/**
 * DELETE /api/warehouse/[id] - Delete a warehouse
 */
export async function DELETE(request, { params }) {
  try {
    const { id } = params;

    if (!isValidObjectId(id)) {
      throw new ApiError('Invalid warehouse ID format', 400);
    }

    // Check if warehouse exists and get item count
    const warehouse = await db.warehouse.findUnique({
      where: { id },
      include: {
        _count: {
          select: { Item: true, AddStockAdjustment: true },
        },
      },
    });

    if (!warehouse) {
      throw new ApiError('Warehouse not found', 404);
    }

    // Prevent deletion if warehouse has items
    if (warehouse._count.Item > 0) {
      throw new ApiError(
        `Cannot delete warehouse with ${warehouse._count.Item} items. Please reassign or remove items first.`,
        400,
        {
          itemCount: warehouse._count.Item,
          suggestion: 'Reassign items to another warehouse before deletion',
        }
      );
    }

    // Delete warehouse
    await db.warehouse.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: 'Warehouse deleted successfully',
      data: { id },
    });
  } catch (error) {
    return handleApiError(error);
  } finally {
    await db.$disconnect();
  }
}
