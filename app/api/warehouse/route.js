import { NextResponse } from "next/server";

export const POST = async(request) => {
    try {
        const {title, location, description} = await request.json();
        const warehouse = {title, location, description};
        console.log(warehouse)
        return NextResponse.json(warehouse)
    } catch (error) {
        console.log(error);
        NextResponse.json({
            error,
            message:"Failed to create a warehouse"
        }, {
            status:500
        })
    }
   
}