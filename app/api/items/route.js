import db from "@/lib/db";
import { NextResponse } from "next/server";

const handleError = (error, message, status = 500) => {
    console.error(error); 
    return NextResponse.json({ error: error.message || error, message }, { status });
};

export const POST = async (request) => {
    try {
        const data = await request.json();
        const item = await db.item.create({ data });

        return NextResponse.json(item);
    } catch (error) {
        return handleError(error, "Failed to create an item");
    }
};

export const GET = async (request) => {
    try {
        const items = await db.item.findMany({
            orderBy: {
                createdAt: "desc", 
            },
            include: {
                supplier: true, 
            },
        });

        return NextResponse.json(items);
    } catch (error) {
        return handleError(error, "Failed to fetch items");
    }
};
