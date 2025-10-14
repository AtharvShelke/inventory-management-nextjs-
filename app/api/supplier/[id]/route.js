import db from '@/lib/db';
import { NextResponse } from 'next/server';
import { handleApiError, ApiError } from '@/lib/api/errorHandler';
import { z } from 'zod';

// Validation helpers
function isValidObjectId(id) {
  return /^[0-9a-fA-F]{24}$/.test(id);
}

const updateSupplierSchema = z.object({
  title: z.string().min(1).max(200).optional(),
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
 * GET /api/supplier/[id] - Get a single supplier
 */
export async function GET(request, { params }) {
  try {
    const { id } = params;

    if (!isValidObjectId(id)) {
      throw new ApiError('Invalid supplier ID format', 400);
    }

    const supplier = await db.supplier.findUnique({
      where: { id },
      include: {
        _count: {
          select: { Item: true },
        },
        Item: {
          take: 10,
          orderBy: { createdAt: 'desc' },
          select: {
            id: true,
            title: true,
            qty: true,
            buyingPrice: true,
            sellingPrice: true,
            category: true,
            createdAt: true,
          },
        },
      },
    });

    if (!supplier) {
      throw new ApiError('Supplier not found', 404);
    }

    return NextResponse.json({
      success: true,
      data: supplier,
    });
  } catch (error) {
    return handleApiError(error);
  } finally {
    await db.$disconnect();
  }
}

/**
 * PUT /api/supplier/[id] - Update a supplier
 */
export async function PUT(request, { params }) {
  try {
    const { id } = params;

    if (!isValidObjectId(id)) {
      throw new ApiError('Invalid supplier ID format', 400);
    }

    // Check if supplier exists
    const existingSupplier = await db.supplier.findUnique({
      where: { id },
    });

    if (!existingSupplier) {
      throw new ApiError('Supplier not found', 404);
    }

    // Parse and validate body
    const body = await request.json();
    const { id: removedId, ...updateData } = body;
    const validatedData = updateSupplierSchema.parse(updateData);

    // Check for duplicate supplier code if being updated
    if (
      validatedData.supplierCode &&
      validatedData.supplierCode !== existingSupplier.supplierCode
    ) {
      const duplicateCode = await db.supplier.findUnique({
        where: { supplierCode: validatedData.supplierCode },
      });

      if (duplicateCode) {
        throw new ApiError('Supplier code already exists', 409);
      }
    }

    // Check for duplicate email if being updated
    if (validatedData.email && validatedData.email !== existingSupplier.email) {
      const duplicateEmail = await db.supplier.findFirst({
        where: {
          email: validatedData.email,
          id: { not: id },
        },
      });

      if (duplicateEmail) {
        throw new ApiError('Supplier with this email already exists', 409);
      }
    }

    // Update supplier
    const updatedSupplier = await db.supplier.update({
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
      message: 'Supplier updated successfully',
      data: updatedSupplier,
    });
  } catch (error) {
    return handleApiError(error);
  } finally {
    await db.$disconnect();
  }
}

/**
 * DELETE /api/supplier/[id] - Delete a supplier
 */
export async function DELETE(request, { params }) {
  try {
    const { id } = params;

    if (!isValidObjectId(id)) {
      throw new ApiError('Invalid supplier ID format', 400);
    }

    // Check if supplier exists and get item count
    const supplier = await db.supplier.findUnique({
      where: { id },
      include: {
        _count: {
          select: { Item: true },
        },
      },
    });

    if (!supplier) {
      throw new ApiError('Supplier not found', 404);
    }

    // Prevent deletion if supplier has items
    if (supplier._count.Item > 0) {
      throw new ApiError(
        `Cannot delete supplier with ${supplier._count.Item} associated items. Please reassign or remove items first.`,
        400,
        {
          itemCount: supplier._count.Item,
          suggestion: 'Reassign items to another supplier before deletion',
        }
      );
    }

    // Delete supplier
    await db.supplier.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: 'Supplier deleted successfully',
      data: { id },
    });
  } catch (error) {
    return handleApiError(error);
  } finally {
    await db.$disconnect();
  }
}
