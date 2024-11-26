import { hash } from 'bcrypt';
import { NextResponse } from 'next/server';
import prisma from "@/lib/db"; // Ensure you have a proper Prisma client setup
import db from '@/lib/db';

export async function POST(request) {
    try {
        const { name, email, password, confirmPassword } = await request.json();

        // Validate passwords
        if (password !== confirmPassword) {
            return NextResponse.json({ message: "Passwords do not match." }, { status: 400 });
        }

        // Check if the user already exists
        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            return NextResponse.json({ message: "User with this email already exists." }, { status: 409 });
        }

        // Hash the password
        const saltRounds = 10;
        const hashedPassword = await hash(password, saltRounds);

        // Create the new user
        const newUser = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
            },
        });

        return NextResponse.json(
            { message: "User created successfully.", user: newUser },
            { status: 201 }
        );
    } catch (error) {
        console.error("Error creating user:", error);
        return NextResponse.json(
            { message: "Internal server error." },
            { status: 500 }
        );
    }
}
export const GET = async(request) => {
    try {
        const user = await db.user.findMany({
            orderBy:{
                createdAt:'desc' //latest user
            },
            
        });
       
        return NextResponse.json(user);
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            error,
            message:"Failed to fetch the user"

        },{
            status:500
        }
    )
    }
}