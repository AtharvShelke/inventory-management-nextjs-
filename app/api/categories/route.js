import db from "@/lib/db";
import { NextResponse } from "next/server";

export const POST = async(request) => {
    try {
        
        const data = await request.json();
       
        const category = await db.category.create({data})
        console.log(category)
        return NextResponse.json(category)
    } catch (error) {
        console.log(error);
        NextResponse.json({
            error,
            message:"Failed to create a category"
        }, {
            status:500
        })
    }
   
}