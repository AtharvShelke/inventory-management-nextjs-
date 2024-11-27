import db from "@/lib/db";
import { NextResponse } from "next/server";

// Helper function for handling errors
const handleError = (error, message, status = 500) => {
    console.error(error); // Log error for debugging
    return NextResponse.json({ error: error.message || error, message }, { status });
};

// POST request to create a new item
export const POST = async (request) => {
    try {
        const data = await request.json();
        const item = await db.item.create({ data });

        return NextResponse.json(item);
    } catch (error) {
        return handleError(error, "Failed to create an item");
    }
};

// GET request to fetch all items, with suppliers included, ordered by creation date
export const GET = async (request) => {
    try {
        const items = await db.item.findMany({
            orderBy: {
                createdAt: "desc", // Fetch latest items first
            },
            include: {
                supplier: true, // Include supplier information for each item
            },
        });

        return NextResponse.json(items);
    } catch (error) {
        return handleError(error, "Failed to fetch items");
    }
};
