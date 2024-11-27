import db from "@/lib/db";
import { NextResponse } from "next/server";

// Helper function to extract the supplier ID from the request URL
const extractSupplierId = (pathname) => {
    const match = pathname.match(/\/api\/supplier\/([^/]+)/);
    return match ? match[1] : null;
};

// Helper function for error responses
const handleError = (error, message, status = 500) => {
    console.error(error);
    return NextResponse.json({ error: error.message || error, message }, { status });
};

// GET request to fetch a supplier by ID
export const GET = async (req) => {
    const id = extractSupplierId(req.nextUrl.pathname);

    if (!id) return NextResponse.json({ message: "Invalid ID" }, { status: 400 });

    try {
        const supplier = await db.supplier.findUnique({ where: { id } });

        if (!supplier) {
            return NextResponse.json({ message: "Supplier not found" }, { status: 404 });
        }

        return NextResponse.json(supplier);
    } catch (error) {
        return handleError(error, "Failed to fetch supplier");
    }
};

// PUT request to update a supplier by ID
export const PUT = async (req) => {
    const id = extractSupplierId(req.nextUrl.pathname);

    if (!id) return NextResponse.json({ message: "Invalid ID" }, { status: 400 });

    try {
        const data = await req.json();
        const { id: removedId, ...updateData } = data;

        const supplier = await db.supplier.findUnique({ where: { id } });

        if (!supplier) {
            return NextResponse.json({ message: "Supplier not found" }, { status: 404 });
        }

        const updatedSupplier = await db.supplier.update({
            where: { id },
            data: updateData,
        });

        return NextResponse.json(updatedSupplier);
    } catch (error) {
        return handleError(error, "Failed to update supplier");
    }
};

// DELETE request to delete a supplier by ID
export const DELETE = async (req) => {
    const id = extractSupplierId(req.nextUrl.pathname);

    if (!id) return NextResponse.json({ message: "Invalid ID" }, { status: 400 });

    try {
        const supplier = await db.supplier.findUnique({ where: { id } });

        if (!supplier) {
            return NextResponse.json({ message: "Supplier not found" }, { status: 404 });
        }

        await db.supplier.delete({ where: { id } });

        return NextResponse.json({ message: "Supplier deleted successfully" });
    } catch (error) {
        return handleError(error, "Failed to delete supplier");
    }
};
