import db from "@/lib/db";
import { NextResponse } from "next/server";

// Helper function for error handling
const handleError = (error, message, status = 500) => {
    console.error(error);
    return NextResponse.json({ error: error.message || error, message }, { status });
};

// POST request to create a new supplier
export const POST = async (request) => {
    try {
        const data = await request.json();
        const supplier = await db.supplier.create({ data });

        console.log('Supplier created:', supplier);  // Log supplier data for debugging
        return NextResponse.json(supplier, { status: 201 });  // 201 for successful creation
    } catch (error) {
        return handleError(error, "Failed to create a supplier");
    }
};

// GET request to fetch all suppliers
export const GET = async (request) => {
    try {
        const suppliers = await db.supplier.findMany({
            orderBy: { createdAt: 'desc' },  // Sort suppliers by creation date, latest first
        });

        return NextResponse.json(suppliers);
    } catch (error) {
        return handleError(error, "Failed to fetch suppliers");
    }
};
