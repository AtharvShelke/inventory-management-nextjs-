import db from "@/lib/db";
import { NextResponse } from "next/server";

// Helper function for error handling
const handleError = (error, message) => {
    console.error(error);
    return NextResponse.json({ error: error.message || error, message }, { status: 500 });
};

// POST request to create a new invoice item
export const POST = async (request) => {
    try {
        const data = await request.json();

        // Extract necessary data from the request
        const { invoiceId, itemId, qty, buyingPrice, sellingPrice } = data;

        // Parse quantities and prices as numbers
        const qtyNum = parseFloat(qty);
        const buyingPriceNum = parseFloat(buyingPrice);
        const sellingPriceNum = parseFloat(sellingPrice);

        // Ensure valid inputs
        if (isNaN(qtyNum) || isNaN(buyingPriceNum) || isNaN(sellingPriceNum)) {
            throw new Error("Invalid input data: qty, buyingPrice, or sellingPrice is not a number.");
        }

        // Calculate profit for the item
        const profit = (sellingPriceNum - buyingPriceNum) * qtyNum;

        // Create a new invoice item record in the database
        const invoiceItem = await db.invoiceItem.create({
            data: {
                invoiceId,
                itemId,
                qty: qtyNum.toString(),
                buyingPrice: buyingPriceNum.toString(),
                sellingPrice: sellingPriceNum.toString(),
                profit: profit.toFixed(2), // Convert profit to a string with 2 decimal places
            },
        });

        return NextResponse.json(invoiceItem);
    } catch (error) {
        return handleError(error, "Failed to create the invoice item");
    }
};

// GET request to fetch all invoice items
export const GET = async () => {
    try {
        const invoiceItems = await db.invoiceItem.findMany({
            include: {
                item: true, // Include item details, ensure necessary fields are selected
            },
            orderBy: {
                createdAt: 'desc',
            },
        });

        return NextResponse.json(invoiceItems);
    } catch (error) {
        return handleError(error, "Failed to fetch invoice items");
    }
};
