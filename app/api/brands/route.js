import { NextResponse } from "next/server";

export const POST = async(request) => {
    try {
        const {title} = await request.json();
        const brand = {title};
        console.log(brand)
        return NextResponse.json(brand)
    } catch (error) {
        console.log(error);
        NextResponse.json({
            error,
            message:"Failed to create a brand"
        }, {
            status:500
        })
    }
   
}