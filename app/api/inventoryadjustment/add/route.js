import db from '@/lib/db';
import { NextResponse } from 'next/server';
import { handleApiError, ApiError } from '@/lib/api/errorHandler';

export async function POST(request) {
  try {
    const { referenceNumber, addStockQty, description, warehouseId, itemId, username } =
      await request.json();

    // Validate required fields
    if (!warehouseId || !itemId || !addStockQty) {
      throw new ApiError('Warehouse ID, Item ID, and Quantity are required', 400);
    }

    // Validate quantity
    const qty = parseInt(addStockQty);
    if (isNaN(qty) || qty <= 0) {
      throw new ApiError('Invalid quantity value', 400);
    }

    // Use transaction for data consistency
    const result = await db.$transaction(async (tx) => {
      // Fetch current item
      const item = await tx.item.findUnique({
        where: { id: itemId },
        select: { id: true, qty: true, title: true },
      });

      if (!item) {
        throw new ApiError('Item not found', 404);
      }

      // Verify warehouse exists
      const warehouse = await tx.warehouse.findUnique({
        where: { id: warehouseId },
        select: { id: true, title: true },
      });

      if (!warehouse) {
        throw new ApiError('Warehouse not found', 404);
      }

      // Calculate new quantity
      const currentQty = parseInt(item.qty) || 0;
      const newQty = currentQty + qty;

      // Update item quantity
      await tx.item.update({
        where: { id: itemId },
        data: { 
          qty: newQty.toString(),
          updatedAt: new Date(),
        },
      });

      // Create adjustment record
      const adjustment = await tx.addStockAdjustment.create({
        data: {
          referenceNumber: referenceNumber || `ADD-${Date.now()}`,
          addStockQty: qty.toString(),
          description,
          username,
          warehouseId,
          itemId,
        },
        include: {
          warehouse: { select: { id: true, title: true } },
          item: { select: { id: true, title: true, qty: true } },
        },
      });

      return adjustment;
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Stock added successfully',
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
    const adjustments = await db.addStockAdjustment.findMany({
      orderBy: { id: 'desc' },
      include: {
        item: {
          select: {
            id: true,
            title: true,
            buyingPrice: true,
          },
        },
        warehouse: {
          select: {
            id: true,
            title: true,
          },
        },
      },
    });

    return NextResponse.json({
      success: true,
      data: adjustments,
      count: adjustments.length,
    });
  } catch (error) {
    return handleApiError(error);
  } finally {
    await db.$disconnect();
  }
}
