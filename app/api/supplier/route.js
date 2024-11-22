import db from "@/lib/db";
import { NextResponse } from "next/server";

export const POST = async(request) => {
    try {
        
        const data = await request.json();
        const supplier = await db.supplier.create({data})
        console.log(supplier)
        return NextResponse.json(supplier)
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
export const GET = async(request) => {
    try {
        const supplier = await db.supplier.findMany({
            orderBy:{
                createdAt:'desc' //latest supplier
            }
        });
        return NextResponse.json(supplier);
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            error,
            message:"Failed to fetch the supplier"

        },{
            status:500
        }
    )
    }
}