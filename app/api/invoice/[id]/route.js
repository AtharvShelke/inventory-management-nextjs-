import db from '@/lib/db';
import { NextResponse } from 'next/server';
import { handleApiError, ApiError } from '@/lib/api/errorHandler';
import { updateInvoiceSchema } from '@/lib/validations/invoice.validation';

// Validate MongoDB ObjectId
function isValidObjectId(id) {
  return /^[0-9a-fA-F]{24}$/.test(id);
}

/**
 * GET /api/invoice/[id] - Get a single invoice
 */
export async function GET(request, { params }) {
  try {
    const { id } = params;

    if (!isValidObjectId(id)) {
      throw new ApiError('Invalid invoice ID format', 400);
    }

    const invoice = await db.invoice.findUnique({
      where: { id },
      include: {
        invoiceItems: {
          include: {
            item: {
              select: {
                id: true,
                title: true,
                description: true,
                category: true,
                brand: true,
                sku: true,
              },
            },
          },
          orderBy: {
            createdAt: 'asc',
          },
        },
      },
    });

    if (!invoice) {
      throw new ApiError('Invoice not found', 404);
    }

    return NextResponse.json({
      success: true,
      data: invoice,
    });
  } catch (error) {
    return handleApiError(error);
  } finally {
    await db.$disconnect();
  }
}

/**
 * PUT /api/invoice/[id] - Update an invoice
 */
export async function PUT(request, { params }) {
  try {
    const { id } = params;

    if (!isValidObjectId(id)) {
      throw new ApiError('Invalid invoice ID format', 400);
    }

    // Check if invoice exists
    const existingInvoice = await db.invoice.findUnique({
      where: { id },
      include: {
        invoiceItems: true,
      },
    });

    if (!existingInvoice) {
      throw new ApiError('Invoice not found', 404);
    }

    // Prevent updating completed or cancelled invoices
    if (existingInvoice.status === 'COMPLETED' || existingInvoice.status === 'CANCELLED') {
      throw new ApiError(
        `Cannot update ${existingInvoice.status.toLowerCase()} invoice`,
        400
      );
    }

    // Parse and validate body
    const body = await request.json();
    const { id: removedId, ...updateData } = body;
    const validatedData = updateInvoiceSchema.parse(updateData);

    // Update invoice
    const updatedInvoice = await db.invoice.update({
      where: { id },
      data: {
        ...validatedData,
        updatedAt: new Date(),
      },
      include: {
        invoiceItems: {
          include: {
            item: true,
          },
        },
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Invoice updated successfully',
      data: updatedInvoice,
    });
  } catch (error) {
    return handleApiError(error);
  } finally {
    await db.$disconnect();
  }
}

/**
 * DELETE /api/invoice/[id] - Delete an invoice
 */
export async function DELETE(request, { params }) {
  try {
    const { id } = params;

    if (!isValidObjectId(id)) {
      throw new ApiError('Invalid invoice ID format', 400);
    }

    // Check if invoice exists
    const invoice = await db.invoice.findUnique({
      where: { id },
      include: {
        invoiceItems: {
          include: {
            item: true,
          },
        },
      },
    });

    if (!invoice) {
      throw new ApiError('Invoice not found', 404);
    }

    // Prevent deletion of paid invoices
    if (invoice.paymentStatus === 'PAID') {
      throw new ApiError('Cannot delete paid invoices', 400);
    }

    // Use transaction to restore stock and delete invoice
    await db.$transaction(async (tx) => {
      // Restore stock for each item
      for (const invoiceItem of invoice.invoiceItems) {
        const currentQty = parseInt(invoiceItem.item.qty) || 0;
        const returnQty = parseInt(invoiceItem.qty) || 0;
        const newQty = currentQty + returnQty;

        await tx.item.update({
          where: { id: invoiceItem.itemId },
          data: {
            qty: newQty.toString(),
            updatedAt: new Date(),
          },
        });
      }

      // Delete invoice (cascade will delete invoice items)
      await tx.invoice.delete({
        where: { id },
      });
    });

    return NextResponse.json({
      success: true,
      message: 'Invoice deleted successfully and stock restored',
      data: { id },
    });
  } catch (error) {
    return handleApiError(error);
  } finally {
    await db.$disconnect();
  }
}
