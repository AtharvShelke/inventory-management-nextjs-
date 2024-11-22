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
