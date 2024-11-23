// app/api/inventoryadjustment/add/[id]/route.js

import db from '@/lib/db';
import { NextResponse } from 'next/server';

// GET request to fetch an addStockAdjustment by id
export const GET = async (req) => {
    const pathname = req.nextUrl.pathname;


    // Extract the dynamic 'id' from the pathname using a regular expression
    const match = pathname.match(/\/api\/inventoryadjustment\/add\/([^/]+)/);
    const id = match ? match[1] : null;

    try {
        const addStockAdjustment = await db.addStockAdjustment.findUnique({
            where: { id: id }, // Find the invoice by the dynamic `id`
            
        });

        if (!addStockAdjustment) {
            return NextResponse.json({ message: "addStockAdjustment not found" }, { status: 404 });
        }

        return NextResponse.json(addStockAdjustment);
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            {
                error,
                message: "Failed to fetch invoice",
            },
            {
                status: 500,
            }
        );
    }
}
export const PUT = async (req) => {
    const pathname = req.nextUrl.pathname;

    // Extract the dynamic 'id' from the pathname using a regular expression
    const match = pathname.match(/\/api\/inventoryadjustment\/add\/([^/]+)/);
    const id = match ? match[1] : null;

    if (!id) {
        return NextResponse.json({ message: "Invalid ID" }, { status: 400 });
    }

    try {
        const data = await req.json();
        const { id: removedId, ...updateData } = data;

        const addStockAdjustment = await db.addStockAdjustment.findUnique({ where: { id } });

        if (!addStockAdjustment) {
            return NextResponse.json({ message: "addStockAdjustment not found" }, { status: 404 });
        }

        const updatedaddStockAdjustment = await db.addStockAdjustment.update({
            where: { id },
            data: updateData, // Fix: Pass updateData as the 'data' field
        });

        return NextResponse.json(updatedaddStockAdjustment);
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            {
                error,
                message: "Failed to update addStockAdjustment",
            },
            {
                status: 500,
            }
        );
    }
};
export const DELETE = async (req) => {
    const pathname = req.nextUrl.pathname;
  
    // Extract the dynamic 'id' from the pathname using a regular expression
    const match = pathname.match(/\/api\/inventoryadjustment\/add\/([^/]+)/);
    const id = match ? match[1] : null;
  
    if (!id) {
      return NextResponse.json({ message: "Invalid ID" }, { status: 400 });
    }
  
    try {
      // Check if the supplier exists before attempting to delete
      const addStockAdjustment = await db.addStockAdjustment.findUnique({ where: { id } });
  
      if (!addStockAdjustment) {
        return NextResponse.json({ message: "addStockAdjustment not found" }, { status: 404 });
      }
  
      // Delete the addStockAdjustment
      await db.addStockAdjustment.delete({ where: { id } });
  
      return NextResponse.json({ message: "addStockAdjustment deleted successfully" });
    } catch (error) {
      console.error(error);
      return NextResponse.json(
        {
          error,
          message: "Failed to delete addStockAdjustment",
        },
        {
          status: 500,
        }
      );
    }
  };
