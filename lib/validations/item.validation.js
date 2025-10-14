import { z } from 'zod';

// Base item schema for validation
export const createItemSchema = z.object({
  title: z.string()
    .min(1, 'Title is required')
    .max(200, 'Title must be less than 200 characters'),
  
  description: z.string()
    .max(1000, 'Description must be less than 1000 characters')
    .optional()
    .nullable(),
  
  qty: z.string()
    .regex(/^\d+$/, 'Quantity must be a valid number')
    .refine((val) => parseInt(val) >= 0, 'Quantity cannot be negative'),
  
  buyingPrice: z.string()
    .regex(/^\d+(\.\d{1,2})?$/, 'Buying price must be a valid decimal')
    .optional()
    .nullable(),
  
  sellingPrice: z.string()
    .regex(/^\d+(\.\d{1,2})?$/, 'Selling price must be a valid decimal')
    .optional()
    .nullable()
    .refine((val, ctx) => {
      if (val && ctx.parent.buyingPrice) {
        const selling = parseFloat(val);
        const buying = parseFloat(ctx.parent.buyingPrice);
        return selling >= buying;
      }
      return true;
    }, 'Selling price must be greater than or equal to buying price'),
  
  supplierId: z.string()
    .regex(/^[0-9a-fA-F]{24}$/, 'Invalid supplier ID format'),
  
  warehouseId: z.string()
    .regex(/^[0-9a-fA-F]{24}$/, 'Invalid warehouse ID format')
    .optional()
    .nullable(),
  
  username: z.string().optional().nullable(),
  
  taxRate: z.string()
    .regex(/^\d+(\.\d{1,2})?$/, 'Tax rate must be a valid decimal')
    .optional()
    .nullable(),
  
  dimensions: z.string().optional().nullable(),
  
  category: z.string()
    .max(100, 'Category must be less than 100 characters')
    .optional()
    .nullable(),
  
  brand: z.string()
    .max(100, 'Brand must be less than 100 characters')
    .optional()
    .nullable(),
  
  sku: z.string()
    .max(100, 'SKU must be less than 100 characters')
    .optional()
    .nullable(),
  
  barcode: z.string()
    .max(100, 'Barcode must be less than 100 characters')
    .optional()
    .nullable(),
  
  reorderPoint: z.number()
    .int('Reorder point must be an integer')
    .min(0, 'Reorder point cannot be negative')
    .default(30),
  
  minStockLevel: z.number()
    .int('Min stock level must be an integer')
    .min(0, 'Min stock level cannot be negative')
    .default(10),
  
  maxStockLevel: z.number()
    .int('Max stock level must be an integer')
    .min(0, 'Max stock level cannot be negative')
    .optional()
    .nullable(),
  
  lastOrderDate: z.string()
    .datetime()
    .optional()
    .nullable(),
});

// Update schema (all fields optional except ID validation)
export const updateItemSchema = z.object({
  title: z.string()
    .min(1, 'Title is required')
    .max(200, 'Title must be less than 200 characters')
    .optional(),
  
  description: z.string()
    .max(1000, 'Description must be less than 1000 characters')
    .optional()
    .nullable(),
  
  qty: z.string()
    .regex(/^\d+$/, 'Quantity must be a valid number')
    .optional(),
  
  buyingPrice: z.string()
    .regex(/^\d+(\.\d{1,2})?$/, 'Buying price must be a valid decimal')
    .optional()
    .nullable(),
  
  sellingPrice: z.string()
    .regex(/^\d+(\.\d{1,2})?$/, 'Selling price must be a valid decimal')
    .optional()
    .nullable(),
  
  supplierId: z.string()
    .regex(/^[0-9a-fA-F]{24}$/, 'Invalid supplier ID format')
    .optional(),
  
  warehouseId: z.string()
    .regex(/^[0-9a-fA-F]{24}$/, 'Invalid warehouse ID format')
    .optional()
    .nullable(),
  
  username: z.string().optional().nullable(),
  taxRate: z.string().optional().nullable(),
  dimensions: z.string().optional().nullable(),
  category: z.string().optional().nullable(),
  brand: z.string().optional().nullable(),
  sku: z.string().optional().nullable(),
  barcode: z.string().optional().nullable(),
  reorderPoint: z.number().int().min(0).optional(),
  minStockLevel: z.number().int().min(0).optional(),
  maxStockLevel: z.number().int().min(0).optional().nullable(),
  lastOrderDate: z.string().datetime().optional().nullable(),
}).refine(
  (data) => Object.keys(data).length > 0,
  'At least one field must be provided for update'
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