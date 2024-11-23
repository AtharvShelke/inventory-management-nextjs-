// app/api/inventoryadjustment/transfer/[id]/route.js

import db from '@/lib/db';
import { NextResponse } from 'next/server';

// GET request to fetch an transferStockAdjustment by id
export const GET = async (req) => {
    const pathname = req.nextUrl.pathname;


    // Extract the dynamic 'id' from the pathname using a regular expression
    const match = pathname.match(/\/api\/inventoryadjustment\/transfer\/([^/]+)/);
    const id = match ? match[1] : null;

    try {
        const transferStockAdjustment = await db.transferStockAdjustment.findUnique({
            where: { id: id }, // Find the invoice by the dynamic `id`
            
        });

        if (!transferStockAdjustment) {
            return NextResponse.json({ message: "transferStockAdjustment not found" }, { status: 404 });
        }

        return NextResponse.json(transferStockAdjustment);
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
    const match = pathname.match(/\/api\/inventoryadjustment\/transfer\/([^/]+)/);
    const id = match ? match[1] : null;

    if (!id) {
        return NextResponse.json({ message: "Invalid ID" }, { status: 400 });
    }

    try {
        const data = await req.json();
        const { id: removedId, ...updateData } = data;

        const transferStockAdjustment = await db.transferStockAdjustment.findUnique({ where: { id } });

        if (!transferStockAdjustment) {
            return NextResponse.json({ message: "transferStockAdjustment not found" }, { status: 404 });
        }

        const updatedtransferStockAdjustment = await db.transferStockAdjustment.update({
            where: { id },
            data: updateData, // Fix: Pass updateData as the 'data' field
        });

        return NextResponse.json(updatedtransferStockAdjustment);
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            {
                error,
                message: "Failed to update transferStockAdjustment",
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
    const match = pathname.match(/\/api\/inventoryadjustment\/transfer\/([^/]+)/);
    const id = match ? match[1] : null;
  
    if (!id) {
      return NextResponse.json({ message: "Invalid ID" }, { status: 400 });
    }
  
    try {
      // Check if the supplier exists before attempting to delete
      const transferStockAdjustment = await db.transferStockAdjustment.findUnique({ where: { id } });
  
      if (!transferStockAdjustment) {
        return NextResponse.json({ message: "transferStockAdjustment not found" }, { status: 404 });
      }
  
      // Delete the transferStockAdjustment
      await db.transferStockAdjustment.delete({ where: { id } });
  
      return NextResponse.json({ message: "transferStockAdjustment deleted successfully" });
    } catch (error) {
      console.error(error);
      return NextResponse.json(
        {
          error,
          message: "Failed to delete transferStockAdjustment",
        },
        {
          status: 500,
        }
      );
    }
  };
