// app/api/invoice/[id]/route.js

import db from '@/lib/db';
import { NextResponse } from 'next/server';

// GET request to fetch an invoice by id
export const GET = async (req) => {
    // Access the pathname from the req object
    const pathname = req.nextUrl.pathname;
    

    // Extract the dynamic 'id' from the pathname using a regular expression
    const match = pathname.match(/\/api\/invoice\/([^/]+)/);
    const id = match ? match[1] : null;

    
    try {
        const invoice = await db.invoice.findUnique({
            where: { id: id }, // Find the invoice by the dynamic `id`
            include: {
                invoiceItems: {
                    include: {
                        item: true // Include the related item data
                    }
                }
            }
        });

        if (!invoice) {
            return NextResponse.json({ message: "Invoice not found" }, { status: 404 });
        }

        return NextResponse.json(invoice);
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
};

export const PUT = async (req) => {
    const pathname = req.nextUrl.pathname;

    // Extract the dynamic 'id' from the pathname using a regular expression
    const match = pathname.match(/\/api\/invoice\/([^/]+)/);
    const id = match ? match[1] : null;

    if (!id) {
        return NextResponse.json({ message: "Invalid ID" }, { status: 400 });
    }

    try {
        const data = await req.json();
        const { id: removedId, ...updateData } = data;

        const invoice = await db.invoice.findUnique({ where: { id } });

        if (!invoice) {
            return NextResponse.json({ message: "invoice not found" }, { status: 404 });
        }

        const updatedinvoice = await db.invoice.update({
            where: { id },
            data: updateData, // Fix: Pass updateData as the 'data' field
        });

        return NextResponse.json(updatedinvoice);
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            {
                error,
                message: "Failed to update invoice",
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
    const match = pathname.match(/\/api\/invoice\/([^/]+)/);
    const id = match ? match[1] : null;
  
    if (!id) {
      return NextResponse.json({ message: "Invalid ID" }, { status: 400 });
    }
  
    try {
      // Check if the invoice exists before attempting to delete
      const invoice = await db.invoice.findUnique({ where: { id } });
  
      if (!invoice) {
        return NextResponse.json({ message: "invoice not found" }, { status: 404 });
      }
  
      // Delete the invoice
      await db.invoice.delete({ where: { id } });
  
      return NextResponse.json({ message: "invoice deleted successfully" });
    } catch (error) {
      console.error(error);
      return NextResponse.json(
        {
          error,
          message: "Failed to delete invoice",
        },
        {
          status: 500,
        }
      );
    }
  };
