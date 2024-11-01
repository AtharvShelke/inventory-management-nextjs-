import db from "@/lib/db";
import { NextResponse } from "next/server";

export const POST = async(request) => {
    try {
        
        const data = await request.json();
        console.log(data)
        const warehouse = await db.warehouse.create({data})
        console.log(warehouse)
        return NextResponse.json(data)
    }  catch (error) {
        console.log(error);
        NextResponse.json({
            error,
            message:"Failed to create a warehouse"
        }, {
            status:500
        })
    }
   
}