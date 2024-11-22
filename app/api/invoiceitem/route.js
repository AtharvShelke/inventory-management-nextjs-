// app/api/invoiceItem/route.js

import db from "@/lib/db";
import { NextResponse } from "next/server";

// POST request to create a new invoice item
export const POST = async (request) => {
    try {
        const data = await request.json();

        // Extract necessary data from the request
        const { invoiceId, itemId, qty, buyingPrice, sellingPrice } = data;

        // Parse quantities and prices as numbers for calculation
        const qtyNum = parseFloat(qty);
        const buyingPriceNum = parseFloat(buyingPrice);
        const sellingPriceNum = parseFloat(sellingPrice);

        // Calculate profit for the item
        const profit = (sellingPriceNum - buyingPriceNum) * qtyNum;

        // Create a new invoice item record in the database
        const invoiceItem = await db.invoiceItem.create({
            data: {
                invoiceId,
                itemId,
                qty: qty.toString(),
                buyingPrice: buyingPrice.toString(),
                sellingPrice: sellingPrice.toString(),
                profit: profit.toFixed(2).toString(), // Convert profit to a string with 2 decimal places
            },
        });

        return NextResponse.json(invoiceItem);
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            {
                error,
                message: "Failed to create the invoice item",
            },
            {
                status: 500,
            }
        );
    }
};

// GET request to fetch all invoice items
export const GET = async () => {
    try {
        const invoiceItems = await db.invoiceItem.findMany({
            include: {
                item:true
            },
            orderBy: {
                createdAt: 'desc',
            },
        });
    
        return NextResponse.json(invoiceItems);
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            {
                error,
                message: "Failed to fetch invoice items",
            },
            {
                status: 500,
            }
        );
    }
};
