import db from "@/lib/db";
import { NextResponse } from "next/server";

export const POST = async(request) => {
    try {
        
        const data = await request.json();
        console.log(data)
        const addStockAdjustment = await db.addStockAdjustment.create({data})
        console.log(addStockAdjustment)
        return NextResponse.json(addStockAdjustment)
    } catch (error) {
        console.log(error);
        NextResponse.json({
            error,
            message:"Failed to create a adjustments"
        }, {
            status:500
        })
    }
   
}