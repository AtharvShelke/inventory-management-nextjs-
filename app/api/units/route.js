import db from "@/lib/db";
import { NextResponse } from "next/server";

export const POST = async(request) => {
    try {
        
        const data = await request.json();
        console.log(data)
        const unit = await db.unit.create({data})
        console.log(unit)
        return NextResponse.json(unit)
    }  catch (error) {
        console.log(error);
        NextResponse.json({
            error,
            message:"Failed to create a unit"
        }, {
            status:500
        })
    }
   
}