import db from '@/lib/db';
import { NextResponse } from 'next/server';
import { handleApiError, ApiError } from '@/lib/api/errorHandler';
import { z } from 'zod';

// Validation schema
const warehouseSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200, 'Title too long'),
  location: z.string().optional().nullable(),
  warehouseType: z.string().min(1, 'Warehouse type is required'),
  description: z.string().max(1000, 'Description too long').optional().nullable(),
});

/**
 * POST /api/warehouse - Create a new warehouse
 */
export async function POST(request) {
  try {
    const body = await request.json();

    // Validate input
    const validatedData = warehouseSchema.parse(body);

    // Check for duplicate warehouse name
    const existingWarehouse = await db.warehouse.findFirst({
      where: {
        title: validatedData.title,
      },
    });

    if (existingWarehouse) {
      throw new ApiError('A warehouse with this name already exists', 409);
    }

    // Create warehouse
    const warehouse = await db.warehouse.create({
      data: {
        ...validatedData,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      include: {
        _count: {
          select: { Item: true },
        },
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Warehouse created successfully',
        data: warehouse,
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
 * GET /api/warehouse - Get all warehouses
 */
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search');
    const type = searchParams.get('type');

    // Build filter
    const where = {};

    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { location: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ];
    }

    if (type) {
      where.warehouseType = type;
    }

    const warehouses = await db.warehouse.findMany({
      where,
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        _count: {
          select: { Item: true },
        },
      },
    });

    return NextResponse.json({
      success: true,
      data: warehouses,
      count: warehouses.length,
    });
  } catch (error) {
    return handleApiError(error);
  } finally {
    await db.$disconnect();
  }
}
