import db from "@/lib/db";
import { NextResponse } from "next/server";

// Helper function to handle item updates and calculate totals
const updateItemData = async (itemData, element) => {
    const item = await db.item.findUnique({
        where: { id: element.itemId },
    });

    if (!item) {
        throw new Error(`Item with ID ${element.itemId} not found.`);
    }

    const updatedQty = (parseInt(item.qty) - element.qty).toString();

    if (parseInt(item.qty) < element.qty) {
        throw new Error(`Not enough stock for item ${element.itemId}.`);
    }

    await db.item.update({
        where: { id: element.itemId },
        data: { qty: updatedQty },
    });

    // Calculate totals
    const totalCostForItem = element.qty * element.buyingPrice;
    const totalSaleForItem = element.qty * element.sellingPrice;
    const profitForItem = totalSaleForItem - totalCostForItem;

    itemData.totalCost += totalCostForItem;
    itemData.totalSale += totalSaleForItem;
    itemData.totalProfit += profitForItem;

    // Prepare InvoiceItem data
    itemData.invoiceItemsData.push({
        itemId: element.itemId,
        qty: element.qty.toString(),
        buyingPrice: element.buyingPrice.toString(),
        sellingPrice: element.sellingPrice.toString(),
        profit: profitForItem.toFixed(2).toString(),
    });
};

export const GET = async () => {
    try {
        const invoices = await db.invoice.findMany({
            include: {
                invoiceItems: true, // Include invoiceItems for the response
            },
            orderBy: {
                createdAt: 'desc',
            },
        });

        return NextResponse.json(invoices);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Failed to fetch invoices", error: error.message || error }, { status: 500 });
    }
};

export const POST = async (request) => {
    try {
        const data = await request.json();
        const { customerName, description, items } = data;

        let totalCost = 0;
        let totalSale = 0;
        let totalProfit = 0;

        // Create an array to hold InvoiceItem data
        const invoiceItemsData = [];

        // Prepare item data and calculate totals
        const itemData = { totalCost, totalSale, totalProfit, invoiceItemsData };

        const updateItemPromises = items.map((element) =>
            updateItemData(itemData, element)
        );

        // Wait for all items to be processed
        await Promise.all(updateItemPromises);

        // Create the invoice with aggregated totals and item data
        const invoice = await db.invoice.create({
            data: {
                customerName,
                description,
                totalCost: itemData.totalCost.toFixed(2),
                totalSale: itemData.totalSale.toFixed(2),
                totalProfit: itemData.totalProfit.toFixed(2),
                invoiceItems: {
                    create: itemData.invoiceItemsData,
                },
            },
        });

        return NextResponse.json({ invoice, data });
    } catch (error) {
        console.error("Error creating invoice:", error);
        return NextResponse.json({ error: error.message || error, message: "Failed to create the invoice" }, { status: 500 });
    }
};
