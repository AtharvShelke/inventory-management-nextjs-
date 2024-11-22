import db from "@/lib/db";
import { NextResponse } from "next/server";

export const GET = async (req) => {
    const pathname = req.nextUrl.pathname;


    // Extract the dynamic 'id' from the pathname using a regular expression
    const match = pathname.match(/\/api\/items\/([^/]+)/);
    const id = match ? match[1] : null;

    try {
        const item = await db.item.findUnique({
            where: { id: id }, // Find the invoice by the dynamic `id`
            
        });

        if (!item) {
            return NextResponse.json({ message: "Item not found" }, { status: 404 });
        }

        return NextResponse.json(item);
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
    const match = pathname.match(/\/api\/items\/([^/]+)/);
    const id = match ? match[1] : null;

    if (!id) {
        return NextResponse.json({ message: "Invalid ID" }, { status: 400 });
    }

    try {
        const data = await req.json();
        const { id: removedId, ...updateData } = data;

        const item = await db.item.findUnique({ where: { id } });

        if (!item) {
            return NextResponse.json({ message: "Item not found" }, { status: 404 });
        }

        const updatedItem = await db.item.update({
            where: { id },
            data: updateData, // Fix: Pass updateData as the 'data' field
        });

        return NextResponse.json(updatedItem);
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            {
                error,
                message: "Failed to update item",
            },
            {
                status: 500,
            }
        );
    }
};

