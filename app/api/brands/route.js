import db from "@/lib/db";
import { NextResponse } from "next/server";

export const POST = async(request) => {
    try {
        
        const data = await request.json();
        console.log(data)
        const brand = await db.brand.create({data})
        console.log(brand)
        return NextResponse.json(data)
    }  catch (error) {
        console.log(error);
        NextResponse.json({
            error,
            message:"Failed to create a brand"
        }, {
            status:500
        })
    }
   
}