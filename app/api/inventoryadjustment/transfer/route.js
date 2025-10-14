import db from '@/lib/db';
import { NextResponse } from 'next/server';
import { handleApiError, ApiError } from '@/lib/api/errorHandler';

export async function POST(request) {
  try {
    const { referenceNumber, transferStockQty, description, itemId, username } =
      await request.json();

    // Validate required fields
    if (!itemId || !transferStockQty) {
      throw new ApiError('Item ID and transfer quantity are required', 400);
    }

    // Validate quantity
    const qty = parseInt(transferStockQty);
    if (isNaN(qty) || qty <= 0) {
      throw new ApiError('Invalid transfer quantity', 400);
    }

    // Use transaction for data consistency
    const result = await db.$transaction(async (tx) => {
      // Fetch current item
      const item = await tx.item.findUnique({
        where: { id: itemId },
        select: { id: true, qty: true, title: true, sellingPrice: true },
      });

      if (!item) {
        throw new ApiError('Item not found', 404);
      }

      // Validate sufficient stock
      const currentQty = parseInt(item.qty) || 0;
      if (currentQty < qty) {
        throw new ApiError(
          `Insufficient stock. Available: ${currentQty}, Requested: ${qty}`,
          400
        );
      }

      // Calculate new quantity
      const newQty = currentQty - qty;

      // Update item quantity
      await tx.item.update({
        where: { id: itemId },
        data: { 
          qty: newQty.toString(),
          updatedAt: new Date(),
        },
      });

      // Create transfer record
      const transfer = await tx.transferStockAdjustment.create({
        data: {
          referenceNumber: referenceNumber || `TRF-${Date.now()}`,
          transferStockQty: qty.toString(),
          description,
          username,
          itemId,
        },
        include: {
          item: {
            select: {
              id: true,
              title: true,
              qty: true,
              sellingPrice: true,
            },
          },
        },
      });

      return transfer;
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Stock transferred successfully',
        data: result,
      },
      { status: 201 }
    );
  } catch (error) {
    return handleApiError(error);
  } finally {
    await db.$disconnect();
  }
}

export async function GET(request) {
  try {
    const transfers = await db.transferStockAdjustment.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        item: {
          select: {
            id: true,
            title: true,
            sellingPrice: true,
          },
        },
      },
    });

    return NextResponse.json({
      success: true,
      data: transfers,
      count: transfers.length,
    });
  } catch (error) {
    return handleApiError(error);
  } finally {
    await db.$disconnect();
  }
}
