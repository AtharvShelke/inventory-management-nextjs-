import db from "@/lib/db";
import { NextResponse } from "next/server";

export const POST = async (request) => {
    try {
        const data = await request.json();
        const { referenceNumber, addStockQty, description, warehouseId, itemId } = data;

        // Check if warehouseId and itemId are provided
        if (!warehouseId || !itemId) {
            return NextResponse.json(
                {
                    message: "Warehouse ID and Item ID are required.",
                },
                {
                    status: 400,
                }
            );
        }

        // Fetch the current item details to get the existing qty
        const item = await db.item.findUnique({
            where: { id: itemId },
        });

        if (!item) {
            return NextResponse.json(
                {
                    message: "Item not found.",
                },
                {
                    status: 404,
                }
            );
        }

        // Calculate the new quantity
        const currentQty = parseInt(item.qty);  // Convert to integer if qty is stored as a string
        const additionalQty = parseInt(addStockQty);  // Convert addStockQty to integer
        const newQty = currentQty + additionalQty;

        // Update the item quantity in the Item model
        await db.item.update({
            where: { id: itemId },
            data: { qty: newQty.toString() },  // Convert back to string if qty is stored as a string
        });

        // Create the stock adjustment with the connected warehouse and item
        const addStockAdjustment = await db.addStockAdjustment.create({
            data: {
                referenceNumber,
                addStockQty,
                description,
                warehouse: {
                    connect: { id: warehouseId },
                },
                item: {
                    connect: { id: itemId },
                },
            },
        });

        return NextResponse.json({
            message: 'Stock adjustment created and item quantity updated successfully',
            addStockAdjustment,
        });

    } catch (error) {
        console.error("Error creating stock adjustment:", error);
        return NextResponse.json(
            {
                error: error.message || error,
                message: "Failed to create adjustments",
            },
            {
                status: 500,
            }
        );
    }
};


export const GET = async(request) => {
    try {
        const addStockAdjustment = await db.addStockAdjustment.findMany({
            include:{
                item:true,
                
                // suppliers:true
            }
        });
       
        return NextResponse.json(addStockAdjustment);
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            error,
            message:"Failed to fetch the addStockAdjustment"

        },{
            status:500
        }
    )
    }
}