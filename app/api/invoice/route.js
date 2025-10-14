import db from '@/lib/db';
import { NextResponse } from 'next/server';
import { handleApiError, ApiError } from '@/lib/api/errorHandler';
import { createInvoiceSchema } from '@/lib/validations/invoice.validation';


/**
 * GET /api/invoice - Get all invoices
 */
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const paymentStatus = searchParams.get('paymentStatus');
    const search = searchParams.get('search');

    // Build filter
    const where = {};

    if (status) {
      where.status = status;
    }

    if (paymentStatus) {
      where.paymentStatus = paymentStatus;
    }

    if (search) {
      where.OR = [
        { customerName: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ];
    }

    const invoices = await db.invoice.findMany({
      where,
      include: {
        invoiceItems: {
          include: {
            item: {
              select: {
                id: true,
                title: true,
                category: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json({
      success: true,
      data: invoices,
      count: invoices.length,
    });
  } catch (error) {
    return handleApiError(error);
  } finally {
    await db.$disconnect();
  }
}

/**
 * POST /api/invoice - Create a new invoice
 */
export async function POST(request) {
  try {
    const body = await request.json();

    // Validate input
    const validatedData = createInvoiceSchema.parse(body);

    const { customerName, description, items, username, status, paymentStatus, taxRate, discount, dueDate } = validatedData;

    // Use transaction for data consistency
    const result = await db.$transaction(async (tx) => {
      let totalCost = 0;
      let totalSale = 0;
      let totalProfit = 0;

      const invoiceItemsData = [];

      // Process each item
      for (const element of items) {
        // Fetch item details
        const item = await tx.item.findUnique({
          where: { id: element.itemId },
          select: { id: true, title: true, qty: true, buyingPrice: true, sellingPrice: true },
        });

        if (!item) {
          throw new ApiError(`Item with ID ${element.itemId} not found`, 404);
        }

        // Check stock availability
        const currentQty = parseInt(item.qty) || 0;
        if (currentQty < element.qty) {
          throw new ApiError(
            `Insufficient stock for item "${item.title}". Available: ${currentQty}, Requested: ${element.qty}`,
            400
          );
        }

        // Update item quantity
        const updatedQty = currentQty - element.qty;
        await tx.item.update({
          where: { id: element.itemId },
          data: { 
            qty: updatedQty.toString(),
            updatedAt: new Date(),
          },
        });

        // Calculate totals
        const itemCost = element.qty * element.buyingPrice;
        const itemSale = element.qty * element.sellingPrice;
        const itemProfit = itemSale - itemCost;

        totalCost += itemCost;
        totalSale += itemSale;
        totalProfit += itemProfit;

        // Prepare invoice item data
        invoiceItemsData.push({
          itemId: element.itemId,
          qty: element.qty.toString(),
          buyingPrice: element.buyingPrice.toString(),
          sellingPrice: element.sellingPrice.toString(),
          profit: itemProfit.toFixed(2).toString(),
        });
      }

      // Apply discount if provided
      if (discount > 0) {
        const discountAmount = (totalSale * discount) / 100;
        totalSale -= discountAmount;
        totalProfit -= discountAmount;
      }

      // Create invoice with all items
      const invoice = await tx.invoice.create({
        data: {
          customerName,
          description,
          username,
          totalCost: totalCost.toFixed(2).toString(),
          totalSale: totalSale.toFixed(2).toString(),
          totalProfit: totalProfit.toFixed(2).toString(),
          status: status || 'PENDING',
          paymentStatus: paymentStatus || 'UNPAID',
          taxRate: taxRate || 18,
          discount: discount || 0,
          dueDate: dueDate ? new Date(dueDate) : null,
          invoiceItems: {
            create: invoiceItemsData,
          },
        },
        include: {
          invoiceItems: {
            include: {
              item: {
                select: {
                  id: true,
                  title: true,
                },
              },
            },
          },
        },
      });

      return invoice;
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Invoice created successfully',
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
