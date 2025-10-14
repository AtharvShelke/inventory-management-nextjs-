import { z } from 'zod';

// Invoice item schema
export const invoiceItemSchema = z.object({
  itemId: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid item ID'),
  qty: z.number().int().positive('Quantity must be positive'),
  buyingPrice: z.number().nonnegative('Buying price cannot be negative'),
  sellingPrice: z.number().positive('Selling price must be positive'),
});

// Create invoice schema
export const createInvoiceSchema = z.object({
  customerName: z.string().min(1, 'Customer name is required').max(200),
  description: z.string().max(1000).optional().nullable(),
  username: z.string().optional().nullable(),
  items: z.array(invoiceItemSchema).min(1, 'At least one item is required'),
  status: z.enum(['PENDING', 'COMPLETED', 'CANCELLED']).optional().default('PENDING'),
  paymentStatus: z.enum(['PAID', 'UNPAID', 'PARTIAL']).optional().default('UNPAID'),
  taxRate: z.number().min(0).max(100).optional().default(18),
  discount: z.number().min(0).max(100).optional().default(0),
  dueDate: z.string().datetime().optional().nullable(),
}).refine(
  (data) => {
    // Validate that all items have valid prices
    return data.items.every(item => item.sellingPrice >= item.buyingPrice);
  },
  {
    message: 'Selling price must be greater than or equal to buying price for all items',
    path: ['items'],
  }
);

// Update invoice schema
export const updateInvoiceSchema = z.object({
  customerName: z.string().min(1).max(200).optional(),
  description: z.string().max(1000).optional().nullable(),
  status: z.enum(['PENDING', 'COMPLETED', 'CANCELLED']).optional(),
  paymentStatus: z.enum(['PAID', 'UNPAID', 'PARTIAL']).optional(),
  taxRate: z.number().min(0).max(100).optional(),
  discount: z.number().min(0).max(100).optional(),
  dueDate: z.string().datetime().optional().nullable(),
});
