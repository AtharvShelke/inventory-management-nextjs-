import db from '@/lib/db';
import { NextResponse } from 'next/server';

// Helper function for standardized response handling
const handleResponse = (message, status, data = null) => {
    const response = { message };
    if (data) response.data = data;
    return NextResponse.json(response, { status });
};

// Function to extract the dynamic ID from the pathname
const extractIdFromPath = (pathname) => {
    const match = pathname.match(/\/api\/inventoryadjustment\/transfer\/([^/]+)/);
    return match ? match[1] : null;
};

// GET request to fetch a transferStockAdjustment by id
export const GET = async (req) => {
    const id = extractIdFromPath(req.nextUrl.pathname);

    if (!id) {
        return handleResponse("Invalid ID", 400);
    }

    try {
        const transferStockAdjustment = await db.transferStockAdjustment.findUnique({
            where: { id },
        });

        if (!transferStockAdjustment) {
            return handleResponse("transferStockAdjustment not found", 404);
        }

        return NextResponse.json(transferStockAdjustment);
    } catch (error) {
        console.error("Error fetching transferStockAdjustment:", error);
        return handleResponse("Failed to fetch transferStockAdjustment", 500, error.message || error);
    }
};

// PUT request to update a transferStockAdjustment by id
export const PUT = async (req) => {
    const id = extractIdFromPath(req.nextUrl.pathname);

    if (!id) {
        return handleResponse("Invalid ID", 400);
    }

    try {
        const data = await req.json();
        const { id: removedId, ...updateData } = data; // Remove id from update data

        const transferStockAdjustment = await db.transferStockAdjustment.findUnique({
            where: { id },
        });

        if (!transferStockAdjustment) {
            return handleResponse("transferStockAdjustment not found", 404);
        }

        const updatedTransferStockAdjustment = await db.transferStockAdjustment.update({
            where: { id },
            data: updateData,
        });

        return NextResponse.json(updatedTransferStockAdjustment);
    } catch (error) {
        console.error("Error updating transferStockAdjustment:", error);
        return handleResponse("Failed to update transferStockAdjustment", 500, error.message || error);
    }
};

// DELETE request to remove a transferStockAdjustment by id
export const DELETE = async (req) => {
    const id = extractIdFromPath(req.nextUrl.pathname);

    if (!id) {
        return handleResponse("Invalid ID", 400);
    }

    try {
        const transferStockAdjustment = await db.transferStockAdjustment.findUnique({
            where: { id },
        });

        if (!transferStockAdjustment) {
            return handleResponse("transferStockAdjustment not found", 404);
        }

        await db.transferStockAdjustment.delete({
            where: { id },
        });

        return handleResponse("transferStockAdjustment deleted successfully", 200);
    } catch (error) {
        console.error("Error deleting transferStockAdjustment:", error);
        return handleResponse("Failed to delete transferStockAdjustment", 500, error.message || error);
    }
};
