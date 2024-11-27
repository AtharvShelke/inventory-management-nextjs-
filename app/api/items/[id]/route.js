import db from "@/lib/db";
import { NextResponse } from "next/server";

// Helper function to extract ID from URL
const extractIdFromPath = (pathname) => {
    const match = pathname.match(/\/api\/items\/([^/]+)/);
    return match ? match[1] : null;
};

// Helper function for error handling
const handleError = (error, message, status = 500) => {
    console.error(error);
    return NextResponse.json({ error: error.message || error, message }, { status });
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
        return NextResponse.json({ message: "Invalid ID" }, { status: 400 });
    }

    try {
        const data = await req.json();
        const { id: removedId, ...updateData } = data;

        if (removedId) {
            return NextResponse.json({ message: "Invalid update data" }, { status: 400 });
        }

        const item = await db.item.findUnique({ where: { id } });

        if (!item) {
            return NextResponse.json({ message: "Item not found" }, { status: 404 });
        }

        const updatedItem = await db.item.update({
            where: { id },
            data: updateData,
        });

        return NextResponse.json(updatedItem);
    } catch (error) {
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
