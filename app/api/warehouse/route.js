import { NextResponse } from "next/server";

export const POST = async(request) => {
    try {
        
        const data = await request.json();
        console.log(data)

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