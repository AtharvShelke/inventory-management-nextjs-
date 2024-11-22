import db from "@/lib/db";
import { NextResponse } from "next/server";

export const POST = async(request) => {
    try {
        
        const data = await request.json();
        
        const item = await db.item.create({data})
        
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
export const GET = async(request) => {
    try {
        const item = await db.item.findMany({
            orderBy:{
                createdAt:'desc' //latest item
            },
            include:{
                
                supplier:true,
                
            }
        });
       
        return NextResponse.json(item);
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            error,
            message:"Failed to fetch the item"

        },{
            status:500
        }
    )
    }
}