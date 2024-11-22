// app/api/invoice/route.js

import db from "@/lib/db";
import { NextResponse } from "next/server";

// // POST request to create a new invoice
// export const POST = async (request) => {
//     try {
//         const data = await request.json();

//         const { customerName, description, items } = data;

//         // Initialize totals
//         let totalCost = 0;
//         let totalSale = 0;
//         let totalProfit = 0;

//         const invoiceItemsData = items.map(item => {
//             const { itemId, qty, buyingPrice, sellingPrice } = item;

//             // Parse quantities and prices
//             const qtyNum = parseFloat(qty);
//             const buyingPriceNum = parseFloat(buyingPrice);
//             const sellingPriceNum = parseFloat(sellingPrice);

//             // Calculate profit for the item
//             const profit = (sellingPriceNum - buyingPriceNum) * qtyNum;

//             // Accumulate totals
//             totalCost += buyingPriceNum * qtyNum;
//             totalSale += sellingPriceNum * qtyNum;
//             totalProfit += profit;

//             // Return item data for Prisma
//             return {
//                 itemId,
//                 qty: qty.toString(),
//                 buyingPrice: buyingPrice.toString(),
//                 sellingPrice: sellingPrice.toString(),
//                 profit: profit.toFixed(2).toString(), // Profit as a string with 2 decimals
//             };
//         });

//         // Create invoice
//         const invoice = await db.invoice.create({
//             data: {
//                 customerName,
//                 description,
//                 date: new Date(),
//                 totalCost: totalCost.toFixed(2).toString(),
//                 totalSale: totalSale.toFixed(2).toString(),
//                 totalProfit: totalProfit.toFixed(2).toString(),
//                 items: {
//                     create: invoiceItemsData,
//                 },
//             },
//             include: {
//                 items: true, // Include items in the response
//             },
//         });

//         // Update item quantities after creating the invoice
//         await Promise.all(
//             items.map(async (item) => {
//                 const { itemId, qty } = item;

//                 // Fetch the current item from the database
//                 const itemData = await db.item.findUnique({
//                     where: { id: itemId },
//                 });

//                 if (!itemData) {
//                     throw new Error(`Item with ID ${itemId} not found.`);
//                 }

//                 const currentQty = parseInt(itemData.qty, 10);
//                 const qtyToDecrement = parseInt(qty);

//                 // Check if there is enough stock to decrement
//                 if (currentQty < qtyToDecrement) {
//                     throw new Error(`Not enough stock to fulfill the invoice for item ${itemId}.`);
//                 }

//                 // Calculate the new quantity
//                 const updatedQty = currentQty - qtyToDecrement;

//                 // Update the quantity by decrementing it
//                 await db.item.update({
//                     where: { id: itemId },
//                     data: {
//                         qty: updatedQty.toString(), // Update with the calculated quantity
//                     },
//                 });
//             })
//         );

//         return NextResponse.json(invoice);
//     } catch (error) {
//         console.error("Error creating invoice:", error);
//         return NextResponse.json(
//             { error: error.message || error, message: "Failed to create the invoice" },
//             { status: 500 }
//         );
//     }
// };


// GET request to fetch all invoices
export const GET = async () => {
    try {
        const invoices = await db.invoice.findMany({
            include: {
                invoiceItems: true, // Include invoiceItems for the response
            },
            orderBy: {
                createdAt: 'desc',
            },
        });

        return NextResponse.json(invoices);
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            {
                error,
                message: "Failed to fetch invoices",
            },
            {
                status: 500,
            }
        );
    }
};
export const POST = async (request) => {
    try {
        const data = await request.json();
        const { customerName, description, items } = data;

        let totalCost = 0;
        let totalSale = 0;
        let totalProfit = 0;

        // Create invoiceItems array to connect to the invoice
        const invoiceItemsData = [];

        // Update the quantities of items and prepare InvoiceItem data
        const updateItemPromises = items.map(async (element) => {
            const item = await db.item.findUnique({
                where: {
                    id: element.itemId,
                },
            });
            const updatedQty = (parseInt(item.qty) - element.qty).toString();

            // Update item quantity in the database
            await db.item.update({
                where: { id: element.itemId },
                data: {
                    qty: updatedQty,
                },
            });

            // Calculate total cost and income for the item
            const totalCostForItem = element.qty * element.buyingPrice;
            const totalSaleForItem = element.qty * element.sellingPrice;
            const profitForItem = totalSaleForItem - totalCostForItem;

            // Aggregate the totals
            totalCost += totalCostForItem;
            totalSale += totalSaleForItem;
            totalProfit += profitForItem;

            // Prepare InvoiceItem data to be created
            invoiceItemsData.push({
                itemId: element.itemId,
                qty: element.qty.toString(),
                buyingPrice: element.buyingPrice.toString(),
                sellingPrice: element.sellingPrice.toString(),
                profit: profitForItem.toString(),
            });
        });

        // Wait for all item updates to complete
        await Promise.all(updateItemPromises);

        // Create a new invoice with the total values and invoiceItems
        const invoice = await db.invoice.create({
            data: {
                customerName,
                description,
                totalCost: totalCost.toString(),
                totalSale: totalSale.toString(),
                totalProfit: totalProfit.toString(),
                invoiceItems: {
                    create: invoiceItemsData, // Create the InvoiceItems in a nested manner
                },
            },
        });

        // Return the created invoice and the data
        return NextResponse.json({ invoice, data });
    } catch (error) {
        console.error("Error creating invoice:", error);
        return NextResponse.json(
            { error: error.message || error, message: "Failed to create the invoice" },
            { status: 500 }
        );
    }
};
