import db from "@/lib/db";
import { NextResponse } from "next/server";

// Helper function for creating consistent error responses
const handleResponse = (message, status, data = null) => {
    const response = { message };
    if (data) response.data = data;
    return NextResponse.json(response, { status });
};

// POST method to create a stock adjustment and update the item quantity
export const POST = async (request) => {
    try {
        const { referenceNumber, addStockQty, description, warehouseId, itemId } = await request.json();

        // Validate required fields
        if (!warehouseId || !itemId) {
            return handleResponse("Warehouse ID and Item ID are required.", 400);
        }

        // Fetch the current item details to get the existing qty
        const item = await db.item.findUnique({
            where: { id: itemId },
        });

        if (!item) {
            return handleResponse("Item not found.", 404);
        }

        // Calculate the new quantity
        const currentQty = parseInt(item.qty, 10);  // Convert to integer
        const additionalQty = parseInt(addStockQty, 10);  // Convert to integer
        const newQty = currentQty + additionalQty;

        // Update the item quantity in the Item model
        await db.item.update({
            where: { id: itemId },
            data: { qty: newQty.toString() },  // Convert back to string
        });

        // Create the stock adjustment
        const addStockAdjustment = await db.addStockAdjustment.create({
            data: {
                referenceNumber,
                addStockQty,
                description,
                warehouse: { connect: { id: warehouseId } },
                item: { connect: { id: itemId } },
            },
        });

        return handleResponse('Stock adjustment created and item quantity updated successfully', 200, addStockAdjustment);

    } catch (error) {
        console.error("Error creating stock adjustment:", error);
        return handleResponse("Failed to create adjustments", 500, error.message || error);
    }
};

// GET method to fetch stock adjustments
export const GET = async (request) => {
    try {
        const addStockAdjustments = await db.addStockAdjustment.findMany({
            include: { item: true },  // Fetch related item details
        });

        return NextResponse.json(addStockAdjustments);

    } catch (error) {
        console.log("Error fetching stock adjustments:", error);
        return handleResponse("Failed to fetch the addStockAdjustment", 500, error.message || error);
    }
};
