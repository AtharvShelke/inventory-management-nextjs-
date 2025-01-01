import db from "@/lib/db";
import { NextResponse } from "next/server";

// Helper function to extract ID from URL
const extractIdFromPath = (pathname) => {
    const match = pathname.match(/\/api\/items\/([^/]+)/);
    return match ? match[1] : null;
};

// Helper function for error handling
const handleError = (error, message) => {
    console.error(message, error); // Log the error details
    const errorMessage = error.message || "An unexpected error occurred";
    return NextResponse.json(
        { message: `${message}: ${errorMessage}` },
        { status: 500 }
    );
};
// GET request to fetch item by ID
export const GET = async (req) => {
    const id = extractIdFromPath(req.nextUrl.pathname);

    if (!id) {
        return NextResponse.json({ message: "Invalid ID" }, { status: 400 });
    }

    try {
        const item = await db.item.findUnique({ where: { id } });

        if (!item) {
            return NextResponse.json({ message: "Item not found" }, { status: 404 });
        }

        return NextResponse.json(item);
    } catch (error) {
        return handleError(error, "Failed to fetch item");
    }
};

// PUT request to update item by ID
export const PUT = async (req) => {
    const id = extractIdFromPath(req.nextUrl.pathname);

    if (!id) {
        return NextResponse.json(
            { message: "Invalid ID: The ID parameter is missing or malformed" },
            { status: 400 }
        );
    }

    try {
        // Parse and validate the request body
        const data = await req.json();
        console.log("Received data:", data);

        const { id: removedId, ...updateData } = data;

        if (removedId) {
            return NextResponse.json(
                { message: "Invalid update data: 'id' field cannot be updated" },
                { status: 400 }
            );
        }

        // Check if the item exists
        const item = await db.item.findUnique({ where: { id } });
        if (!item) {
            return NextResponse.json(
                { message: `Item not found with ID: ${id}` },
                { status: 404 }
            );
        }

        // Perform the update
        const updatedItem = await db.item.update({
            where: { id },
            data: updateData,
        });

        return NextResponse.json(updatedItem);
    } catch (error) {
        // Handle JSON parsing errors specifically
        if (error instanceof SyntaxError && error.message.includes("JSON")) {
            return NextResponse.json(
                { message: "Invalid JSON in request body" },
                { status: 400 }
            );
        }

        // Handle database-related errors specifically
        if (error.code) {
            return NextResponse.json(
                { message: `Database error: ${error.code}` },
                { status: 500 }
            );
        }

        // Fallback to general error handling
        return handleError(error, "Failed to update item");
    }
};

// DELETE request to delete item by ID
export const DELETE = async (req) => {
    const id = extractIdFromPath(req.nextUrl.pathname);

    if (!id) {
        return NextResponse.json({ message: "Invalid ID" }, { status: 400 });
    }

    try {
        const item = await db.item.findUnique({ where: { id } });

        if (!item) {
            return NextResponse.json({ message: "Item not found" }, { status: 404 });
        }

        await db.item.delete({ where: { id } });

        return NextResponse.json({ message: "Item deleted successfully" });
    } catch (error) {
        return handleError(error, "Failed to delete item");
    }
};
