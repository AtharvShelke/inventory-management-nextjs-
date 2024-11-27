import db from "@/lib/db";
import { NextResponse } from "next/server";

// Helper function to handle JSON responses
const createResponse = (message, status, data = null) => {
    const response = { message };
    if (data) response.data = data;
    return NextResponse.json(response, { status });
};

// POST request to create a transfer stock adjustment
export const POST = async (request) => {
    try {
        const data = await request.json();
        const { referenceNumber, transferStockQty, description, itemId } = data;

        // Validate required fields
        if (!itemId || !transferStockQty) {
            return createResponse("All fields (sending warehouse, item, and transfer quantity) are required.", 400);
        }

        // Fetch the item details
        const item = await db.item.findUnique({ where: { id: itemId } });
        if (!item) {
            return createResponse("Item not found.", 404);
        }

        // Validate transfer quantity
        const transferQty = parseInt(transferStockQty, 10);
        if (isNaN(transferQty) || transferQty <= 0) {
            return createResponse("Invalid transfer quantity.", 400);
        }

        const currentQty = parseInt(item.qty, 10);
        if (currentQty < transferQty) {
            return createResponse("Not enough stock to transfer.", 400);
        }

        // Update the item quantity
        await db.item.update({
            where: { id: itemId },
            data: { qty: (currentQty - transferQty).toString() },
        });

        // Create the transfer stock adjustment record
        const transferStockAdjustment = await db.transferStockAdjustment.create({
            data: {
                referenceNumber,
                transferStockQty: transferQty.toString(),
                description,
                item: { connect: { id: itemId } },
            },
        });

        return NextResponse.json(transferStockAdjustment);
    } catch (error) {
        console.error("Error creating transfer stock adjustment:", error);
        return createResponse("Failed to create adjustments", 500, error.message || error);
    }
};

// GET request to fetch transfer stock adjustments
export const GET = async (request) => {
    try {
        const transfer = await db.transferStockAdjustment.findMany({
            orderBy: { createdAt: 'desc' }, // Latest transfer first
        });

        return NextResponse.json(transfer);
    } catch (error) {
        console.error("Error fetching transfer stock adjustments:", error);
        return createResponse("Failed to fetch the transfer", 500, error.message || error);
    }
};
