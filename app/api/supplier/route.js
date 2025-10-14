import db from '@/lib/db';
import { NextResponse } from 'next/server';
import { handleApiError, ApiError } from '@/lib/api/errorHandler';
import { z } from 'zod';

// Validation schema
const supplierSchema = z.object({
  title: z.string().min(1, 'Supplier name is required').max(200),
  phone: z.string().optional().nullable(),
  email: z.string().email('Invalid email format').optional().nullable(),
  address: z.string().max(500).optional().nullable(),
  contactPerson: z.string().max(200).optional().nullable(),
  supplierCode: z.string().max(50).optional().nullable(),
  paymentTerms: z.string().max(200).optional().nullable(),
  taxId: z.string().max(50).optional().nullable(),
  description: z.string().max(1000).optional().nullable(),
});

/**
 * POST /api/supplier - Create a new supplier
 */
export async function POST(request) {
  try {
    const body = await request.json();

    // Validate input
    const validatedData = supplierSchema.parse(body);

    // Check for duplicate supplier code if provided
    if (validatedData.supplierCode) {
      const existingSupplier = await db.supplier.findUnique({
        where: { supplierCode: validatedData.supplierCode },
      });

      if (existingSupplier) {
        throw new ApiError('Supplier code already exists', 409);
      }
    }

    // Check for duplicate email if provided
    if (validatedData.email) {
      const existingEmail = await db.supplier.findFirst({
        where: { email: validatedData.email },
      });

      if (existingEmail) {
        throw new ApiError('Supplier with this email already exists', 409);
      }
    }

    // Create supplier
    const supplier = await db.supplier.create({
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
        message: 'Supplier created successfully',
        data: supplier,
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
 * GET /api/supplier - Get all suppliers
 */
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search');

    // Build filter
    const where = {};

    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
        { phone: { contains: search, mode: 'insensitive' } },
        { contactPerson: { contains: search, mode: 'insensitive' } },
        { supplierCode: { contains: search, mode: 'insensitive' } },
      ];
    }

    const suppliers = await db.supplier.findMany({
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
      data: suppliers,
      count: suppliers.length,
    });
  } catch (error) {
    return handleApiError(error);
  } finally {
    await db.$disconnect();
  }
}
