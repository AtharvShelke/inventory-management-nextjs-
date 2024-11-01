import db from "@/lib/db";
import { NextResponse } from "next/server";

export const POST = async(request) => {
    try {
        
        const data = await request.json();
        console.log(data)
        const transferStockAdjustment = await db.transferStockAdjustment.create({data})
        console.log(transferStockAdjustment)
        return NextResponse.json(transferStockAdjustment)
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