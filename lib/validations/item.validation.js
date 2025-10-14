import { z } from 'zod';

// Item creation schema
export const createItemSchema = z.object({
  title: z.string().min(1, 'Item title is required').max(200),
  description: z.string().max(1000).optional().nullable(),
  qty: z.string().min(1, 'Quantity is required'),
  buyingPrice: z.string().optional().nullable(),
  sellingPrice: z.string().optional().nullable(),
  supplierId: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid supplier ID'),
  warehouseId: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid warehouse ID').optional().nullable(),
  username: z.string().optional().nullable(),
  taxRate: z.string().optional().nullable(),
  dimensions: z.string().optional().nullable(),
  reorderPoint: z.number().int().min(0).optional().default(30),
  category: z.string().max(100).optional().nullable(),
  brand: z.string().max(100).optional().nullable(),
  sku: z.string().max(100).optional().nullable(),
  barcode: z.string().max(100).optional().nullable(),
  minStockLevel: z.number().int().min(0).optional().default(10),
  maxStockLevel: z.number().int().min(0).optional().nullable(),
  lastOrderDate: z.string().datetime().optional().nullable(),
}).refine(
  (data) => {
    // ✅ FIXED: Check if both prices exist before comparing
    if (data.buyingPrice && data.sellingPrice) {
      const buying = parseFloat(data.buyingPrice);
      const selling = parseFloat(data.sellingPrice);
      
      // Only validate if both are valid numbers
      if (!isNaN(buying) && !isNaN(selling)) {
        return selling >= buying;
      }
    }
    // If prices are not provided or invalid, skip this validation
    return true;
  },
  {
    message: 'Selling price must be greater than or equal to buying price',
    path: ['sellingPrice'], // ✅ FIXED: Use path instead of parent
  }
);

// Item update schema
export const updateItemSchema = z.object({
  title: z.string().min(1).max(200).optional(),
  description: z.string().max(1000).optional().nullable(),
  qty: z.string().optional(),
  buyingPrice: z.string().optional().nullable(),
  sellingPrice: z.string().optional().nullable(),
  supplierId: z.string().regex(/^[0-9a-fA-F]{24}$/).optional(),
  warehouseId: z.string().regex(/^[0-9a-fA-F]{24}$/).optional().nullable(),
  username: z.string().optional().nullable(),
  taxRate: z.string().optional().nullable(),
  dimensions: z.string().optional().nullable(),
  reorderPoint: z.number().int().min(0).optional(),
  category: z.string().max(100).optional().nullable(),
  brand: z.string().max(100).optional().nullable(),
  sku: z.string().max(100).optional().nullable(),
  barcode: z.string().max(100).optional().nullable(),
  minStockLevel: z.number().int().min(0).optional(),
  maxStockLevel: z.number().int().min(0).optional().nullable(),
  lastOrderDate: z.string().datetime().optional().nullable(),
}).refine(
  (data) => {
    if (data.buyingPrice && data.sellingPrice) {
      const buying = parseFloat(data.buyingPrice);
      const selling = parseFloat(data.sellingPrice);
      
      if (!isNaN(buying) && !isNaN(selling)) {
        return selling >= buying;
      }
    }
    return true;
  },
  {
    message: 'Selling price must be greater than or equal to buying price',
    path: ['sellingPrice'],
  }
);

// Query parameters validation
export const itemQuerySchema = z.object({
  page: z.string()
    .optional()
    .default('1')
    .transform((val) => parseInt(val, 10))
    .pipe(z.number().int().min(1)),
  
  limit: z.string()
    .optional()
    .default('10')
    .transform((val) => parseInt(val, 10))
    .pipe(z.number().int().min(1).max(1000)),
  
  search: z.string().optional(),
  category: z.string().optional(),
  supplierId: z.string().regex(/^[0-9a-fA-F]{24}$/).optional(),
  warehouseId: z.string().regex(/^[0-9a-fA-F]{24}$/).optional(),
  lowStock: z.enum(['true', 'false']).optional(),
});
