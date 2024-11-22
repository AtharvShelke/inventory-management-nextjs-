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