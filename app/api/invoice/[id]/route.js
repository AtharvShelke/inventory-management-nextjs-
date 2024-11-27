import db from '@/lib/db';
import { NextResponse } from 'next/server';

// Helper function to extract ID from the URL
const extractIdFromPath = (pathname) => {
  const match = pathname.match(/\/api\/invoice\/([^/]+)/);
  return match ? match[1] : null;
};

// Helper function to handle response formatting
const createResponse = (message, status, data = null) => {
  const response = { message };
  if (data) response.data = data;
  return NextResponse.json(response, { status });
};

export const GET = async (req) => {
  const id = extractIdFromPath(req.nextUrl.pathname);

  if (!id) return createResponse("Invalid ID", 400);

  try {
    const invoice = await db.invoice.findUnique({
      where: { id },
      include: {
        invoiceItems: {
          include: {
            item: true, // Include related item data
          },
        },
      },
    });

    if (!invoice) return createResponse("Invoice not found", 404);

    return createResponse("Invoice fetched successfully", 200, invoice);
  } catch (error) {
    console.error(error);
    return createResponse("Failed to fetch invoice", 500, error.message || error);
  }
};

export const PUT = async (req) => {
  const id = extractIdFromPath(req.nextUrl.pathname);

  if (!id) return createResponse("Invalid ID", 400);

  try {
    const data = await req.json();
    const { id: removedId, ...updateData } = data;

    const invoice = await db.invoice.findUnique({ where: { id } });

    if (!invoice) return createResponse("Invoice not found", 404);

    const updatedInvoice = await db.invoice.update({
      where: { id },
      data: updateData,
    });

    return createResponse("Invoice updated successfully", 200, updatedInvoice);
  } catch (error) {
    console.error(error);
    return createResponse("Failed to update invoice", 500, error.message || error);
  }
};

export const DELETE = async (req) => {
  const id = extractIdFromPath(req.nextUrl.pathname);

  if (!id) return createResponse("Invalid ID", 400);

  try {
    const invoice = await db.invoice.findUnique({ where: { id } });

    if (!invoice) return createResponse("Invoice not found", 404);

    await db.invoice.delete({ where: { id } });

    return createResponse("Invoice deleted successfully", 200);
  } catch (error) {
    console.error(error);
    return createResponse("Failed to delete invoice", 500, error.message || error);
  }
};
