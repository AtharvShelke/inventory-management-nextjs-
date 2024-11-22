import db from "@/lib/db";
import { NextResponse } from "next/server";

export const POST = async (request) => {
    try {
        const data = await request.json();

        const { referenceNumber, transferStockQty, description, itemId } = data;

        if (!itemId || !transferStockQty) {
            return NextResponse.json(
                { message: "All fields (sending warehouse, item, and transfer quantity) are required." },
                { status: 400 }
            );
        }

        const item = await db.item.findUnique({
            where: { id: itemId },
        });

        if (!item) {
            return NextResponse.json(
                { message: "Item not found." },
                { status: 404 }
            );
        }

        const transferQty = parseInt(transferStockQty, 10);
        if (isNaN(transferQty) || transferQty <= 0) {
            return NextResponse.json(
                { message: "Invalid transfer quantity." },
                { status: 400 }
            );
        }

        const currentQty = parseInt(item.qty, 10);
        if (currentQty < transferQty) {
            return NextResponse.json(
                { message: "Not enough stock to transfer." },
                { status: 400 }
            );
        }

        const updatedItem = await db.item.update({
            where: { id: itemId },
            data: {
                qty: (currentQty - transferQty).toString(),
            },
        });

        const transferStockAdjustment = await db.transferStockAdjustment.create({
            data: {
                referenceNumber,
                transferStockQty: transferQty.toString(),
                description,
               
                item: {
                    connect: { id: itemId },
                },
            },
        });

        return NextResponse.json(transferStockAdjustment);

    } catch (error) {
        console.error("Error creating transfer stock adjustment:", error);
        return NextResponse.json(
            { error: error.message || error, message: "Failed to create adjustments" },
            { status: 500 }
        );
    }
};



export const GET = async(request) => {
    try {
        const transfer = await db.transferStockAdjustment.findMany({
            orderBy:{
                createdAt:'desc' //latest transfer
            }
        });
       
        return NextResponse.json(transfer);
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            error,
            message:"Failed to fetch the transfer"

        },{
            status:500
        }
    )
    }
}