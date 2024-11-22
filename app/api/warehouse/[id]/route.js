import db from "@/lib/db";
import { NextResponse } from "next/server";

export const GET = async (req) => {
    const pathname = req.nextUrl.pathname;


    // Extract the dynamic 'id' from the pathname using a regular expression
    const match = pathname.match(/\/api\/warehouse\/([^/]+)/);
    const id = match ? match[1] : null;

    try {
        const warehouse = await db.warehouse.findUnique({
            where: { id: id }, // Find the invoice by the dynamic `id`
            
        });

        if (!warehouse) {
            return NextResponse.json({ message: "warehouse not found" }, { status: 404 });
        }

        return NextResponse.json(warehouse);
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            {
                error,
                message: "Failed to fetch invoice",
            },
            {
                status: 500,
            }
        );
    }
}
export const PUT = async (req) => {
    const pathname = req.nextUrl.pathname;

    // Extract the dynamic 'id' from the pathname using a regular expression
    const match = pathname.match(/\/api\/warehouse\/([^/]+)/);
    const id = match ? match[1] : null;

    if (!id) {
        return NextResponse.json({ message: "Invalid ID" }, { status: 400 });
    }

    try {
        const data = await req.json();
        const { id: removedId, ...updateData } = data;

        const warehouse = await db.warehouse.findUnique({ where: { id } });

        if (!warehouse) {
            return NextResponse.json({ message: "warehouse not found" }, { status: 404 });
        }

        const updatedwarehouse = await db.warehouse.update({
            where: { id },
            data: updateData, // Fix: Pass updateData as the 'data' field
        });

        return NextResponse.json(updatedwarehouse);
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            {
                error,
                message: "Failed to update warehouse",
            },
            {
                status: 500,
            }
        );
    }
};

