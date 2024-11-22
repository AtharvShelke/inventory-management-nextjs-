import db from "@/lib/db";
import { NextResponse } from "next/server";

export const GET = async (req) => {
    const pathname = req.nextUrl.pathname;


    // Extract the dynamic 'id' from the pathname using a regular expression
    const match = pathname.match(/\/api\/supplier\/([^/]+)/);
    const id = match ? match[1] : null;

    try {
        const supplier = await db.supplier.findUnique({
            where: { id: id }, // Find the invoice by the dynamic `id`
            
        });

        if (!supplier) {
            return NextResponse.json({ message: "supplier not found" }, { status: 404 });
        }

        return NextResponse.json(supplier);
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
    const match = pathname.match(/\/api\/supplier\/([^/]+)/);
    const id = match ? match[1] : null;

    if (!id) {
        return NextResponse.json({ message: "Invalid ID" }, { status: 400 });
    }

    try {
        const data = await req.json();
        const { id: removedId, ...updateData } = data;

        const supplier = await db.supplier.findUnique({ where: { id } });

        if (!supplier) {
            return NextResponse.json({ message: "supplier not found" }, { status: 404 });
        }

        const updatedsupplier = await db.supplier.update({
            where: { id },
            data: updateData, // Fix: Pass updateData as the 'data' field
        });

        return NextResponse.json(updatedsupplier);
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            {
                error,
                message: "Failed to update supplier",
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
    const match = pathname.match(/\/api\/supplier\/([^/]+)/);
    const id = match ? match[1] : null;
  
    if (!id) {
      return NextResponse.json({ message: "Invalid ID" }, { status: 400 });
    }
  
    try {
      // Check if the supplier exists before attempting to delete
      const supplier = await db.supplier.findUnique({ where: { id } });
  
      if (!supplier) {
        return NextResponse.json({ message: "Supplier not found" }, { status: 404 });
      }
  
      // Delete the supplier
      await db.supplier.delete({ where: { id } });
  
      return NextResponse.json({ message: "Supplier deleted successfully" });
    } catch (error) {
      console.error(error);
      return NextResponse.json(
        {
          error,
          message: "Failed to delete supplier",
        },
        {
          status: 500,
        }
      );
    }
  };
