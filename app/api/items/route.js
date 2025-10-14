import db from '@/lib/db';
import { NextResponse } from 'next/server';
import { createItemSchema, itemQuerySchema } from '@/lib/validations/item.validation';
import { handleApiError, ApiError } from '@/lib/api/errorHandler';

/**
 * POST /api/items - Create a new item
 */
export async function POST(request) {
  try {
    // Parse and validate request body
    const body = await request.json();
    const validatedData = createItemSchema.parse(body);

    // Verify supplier exists
    const supplier = await db.supplier.findUnique({
      where: { id: validatedData.supplierId },
      select: { id: true, title: true },
    });

    if (!supplier) {
      throw new ApiError('Supplier not found', 404);
    }

    // Verify warehouse exists (if provided)
    if (validatedData.warehouseId) {
      const warehouse = await db.warehouse.findUnique({
        where: { id: validatedData.warehouseId },
        select: { id: true, title: true },
      });

      if (!warehouse) {
        throw new ApiError('Warehouse not found', 404);
      }
    }

    // Check for duplicate SKU or barcode if provided
    if (validatedData.sku || validatedData.barcode) {
      const duplicateCheck = await db.item.findFirst({
        where: {
          OR: [
            validatedData.sku ? { sku: validatedData.sku } : {},
            validatedData.barcode ? { barcode: validatedData.barcode } : {},
          ],
        },
      });

      if (duplicateCheck) {
        throw new ApiError(
          'Item with this SKU or barcode already exists',
          409,
          {
            duplicateField: duplicateCheck.sku === validatedData.sku ? 'sku' : 'barcode',
          }
        );
      }
    }

    // Create the item with all fields
    const item = await db.item.create({
      data: {
        ...validatedData,
        createdAt: new Date(),
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

    return NextResponse.json(
      {
        success: true,
        message: 'Item created successfully',
        data: item,
      },
      { status: 201 }
    );
  } catch (error) {
    return handleApiError(error);
  } finally {
    await db.$disconnect();
  }
}

/**
 * GET /api/items - Get all items with filtering, pagination, and search
 */
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    
    // Convert searchParams to object for validation
    const queryParams = Object.fromEntries(searchParams.entries());
    const validated = itemQuerySchema.parse(queryParams);

    const { page, limit, search, category, supplierId, warehouseId, lowStock } = validated;

    // Build filter conditions
    const where = {};

    // Search filter (title, description, sku, barcode)
    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        { sku: { contains: search, mode: 'insensitive' } },
        { barcode: { contains: search, mode: 'insensitive' } },
      ];
    }

    // Category filter
    if (category) {
      where.category = category;
    }

    // Supplier filter
    if (supplierId) {
      where.supplierId = supplierId;
    }

    // Warehouse filter
    if (warehouseId) {
      where.warehouseId = warehouseId;
    }

    // Low stock filter
    if (lowStock === 'true') {
      // Note: Since qty is string in schema, we need to handle this carefully
      // This is a limitation - consider changing qty to Int in schema
      where.qty = { lt: '30' }; // Adjust threshold as needed
    }

    // Calculate pagination
    const skip = (page - 1) * limit;

    // Execute query with pagination
    const [items, totalCount] = await Promise.all([
      db.item.findMany({
        where,
        skip,
        take: limit,
        orderBy: {
          createdAt: 'desc',
        },
        include: {
          supplier: {
            select: {
              id: true,
              title: true,
              email: true,
              phone: true,
              supplierCode: true,
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
      }),
      db.item.count({ where }),
    ]);

    // Calculate pagination metadata
    const totalPages = Math.ceil(totalCount / limit);
    const hasNextPage = page < totalPages;
    const hasPrevPage = page > 1;

    return NextResponse.json({
      success: true,
      data: items,
      pagination: {
        total: totalCount,
        page,
        limit,
        totalPages,
        hasNextPage,
        hasPrevPage,
      },
    });
  } catch (error) {
    return handleApiError(error);
  } finally {
    await db.$disconnect();
  }
}
