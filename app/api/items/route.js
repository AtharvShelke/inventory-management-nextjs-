import db from "@/lib/db";
import { NextResponse } from "next/server";

export const POST = async(request) => {
    try {
        
        const data = await request.json();
        console.log(data)
        const item = await db.item.create({data})
        console.log(item)
        return NextResponse.json(item)
    } catch (error) {
        console.log(error);
        NextResponse.json({
            error,
            message:"Failed to create a item"
        }, {
            status:500
        })
    }
   
}