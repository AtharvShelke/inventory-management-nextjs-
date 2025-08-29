import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const calculateStockStatus = (qty, reorderPoint) => {
  const stock = parseInt(qty)
  if (stock <= reorderPoint * 0.5) return 'critical'
  if (stock <= reorderPoint) return 'warning'
  return 'good'
}

export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount)
}
