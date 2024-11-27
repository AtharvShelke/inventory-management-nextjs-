// app/api/inventoryadjustment/add/[id]/route.js

import db from '@/lib/db';
import { NextResponse } from 'next/server';

// Utility function to extract the ID from the URL
const extractIdFromPath = (pathname) => {
    const match = pathname.match(/\/api\/inventoryadjustment\/add\/([^/]+)/);
    return match ? match[1] : null;
};

// Helper function to handle error responses
const handleErrorResponse = (message, status = 500, error = null) => {
    console.error(error);
    return NextResponse.json({ error, message }, { status });
};

// GET request to fetch an addStockAdjustment by id
export const GET = async (req) => {
    const id = extractIdFromPath(req.nextUrl.pathname);

    if (!id) {
        return handleErrorResponse("Invalid ID", 400);
    }

    try {
        const addStockAdjustment = await db.addStockAdjustment.findUnique({ where: { id } });

        if (!addStockAdjustment) {
            return NextResponse.json({ message: "addStockAdjustment not found" }, { status: 404 });
        }

        return NextResponse.json(addStockAdjustment);
    } catch (error) {
        return handleErrorResponse("Failed to fetch addStockAdjustment", 500, error);
    }
};

// PUT request to update an addStockAdjustment
export const PUT = async (req) => {
    const id = extractIdFromPath(req.nextUrl.pathname);

    if (!id) {
        return handleErrorResponse("Invalid ID", 400);
    }

    try {
        const data = await req.json();
        const { id: removedId, ...updateData } = data;

        const addStockAdjustment = await db.addStockAdjustment.findUnique({ where: { id } });

        if (!addStockAdjustment) {
            return NextResponse.json({ message: "addStockAdjustment not found" }, { status: 404 });
        }

        const updatedAddStockAdjustment = await db.addStockAdjustment.update({
            where: { id },
            data: updateData,
        });

        return NextResponse.json(updatedAddStockAdjustment);
    } catch (error) {
        return handleErrorResponse("Failed to update addStockAdjustment", 500, error);
    }
};

// DELETE request to delete an addStockAdjustment
export const DELETE = async (req) => {
    const id = extractIdFromPath(req.nextUrl.pathname);

    if (!id) {
        return handleErrorResponse("Invalid ID", 400);
    }

    try {
        const addStockAdjustment = await db.addStockAdjustment.findUnique({ where: { id } });

        if (!addStockAdjustment) {
            return NextResponse.json({ message: "addStockAdjustment not found" }, { status: 404 });
        }

        await db.addStockAdjustment.delete({ where: { id } });

        return NextResponse.json({ message: "addStockAdjustment deleted successfully" });
    } catch (error) {
        return handleErrorResponse("Failed to delete addStockAdjustment", 500, error);
    }
};
