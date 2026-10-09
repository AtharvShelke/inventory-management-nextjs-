'use client';

import React, { useState, useCallback, useMemo } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  FileText,
  Plus,
  Trash2,
  AlertTriangle,
  DollarSign,
  TrendingUp,
  Percent,
  CheckCircle2,
  Calendar,
  User,
  Phone,
  Mail,
  Loader2,
} from 'lucide-react';
import { toast } from 'sonner';

export default function CreateInvoiceForm({ items = [] }) {
  const router = useRouter();
  const { data: session } = useSession();
  const role = session?.user?.role;
  const username = session?.user?.name || 'Admin';

  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState(null);

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      customerName: '',
      customerEmail: '',
      customerPhone: '',
      description: '',
      status: 'PENDING',
      paymentStatus: 'UNPAID',
      taxRate: 18,
      discount: 0,
      dueDate: '',
      items: [
        {
          itemId: '',
          qty: 1,
          buyingPrice: 0,
          sellingPrice: 0,
          availableStock: 0,
          title: '',
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({ control, name: 'items' });

  // Watch form fields for live calculation
  const watchedItems = watch('items') || [];
  const watchedTaxRate = parseFloat(watch('taxRate')) || 0;
  const watchedDiscount = parseFloat(watch('discount')) || 0;

  // Map items for fast lookup
  const itemsMap = useMemo(() => {
    const map = {};
    items.forEach((item) => {
      map[item.id] = item;
    });
    return map;
  }, [items]);

  // Handle item selection
  const handleItemChange = useCallback(
    (e, index) => {
      const selectedId = e.target.value;
      const selectedItem = itemsMap[selectedId];

      if (selectedItem) {
        const bp = parseFloat(selectedItem.buyingPrice) || 0;
        const sp = parseFloat(selectedItem.sellingPrice) || 0;
        const stock = parseInt(selectedItem.qty) || 0;

        setValue(`items.${index}.itemId`, selectedId);
        setValue(`items.${index}.title`, selectedItem.title);
        setValue(`items.${index}.buyingPrice`, bp);
        setValue(`items.${index}.sellingPrice`, sp);
        setValue(`items.${index}.availableStock`, stock);
      } else {
        setValue(`items.${index}.itemId`, '');
        setValue(`items.${index}.title`, '');
        setValue(`items.${index}.buyingPrice`, 0);
        setValue(`items.${index}.sellingPrice`, 0);
        setValue(`items.${index}.availableStock`, 0);
      }
    },
    [itemsMap, setValue]
  );

  // Calculate live financial summary
  const financials = useMemo(() => {
    let subtotal = 0;
    let totalCost = 0;
    let hasStockIssue = false;

    watchedItems.forEach((item) => {
      const q = parseInt(item.qty) || 0;
      const sp = parseFloat(item.sellingPrice) || 0;
      const bp = parseFloat(item.buyingPrice) || 0;
      const avail = item.availableStock ?? 9999;

      if (item.itemId && q > avail) {
        hasStockIssue = true;
      }

      subtotal += q * sp;
      totalCost += q * bp;
    });

    const discountAmount = (subtotal * watchedDiscount) / 100;
    const discountedTotal = Math.max(0, subtotal - discountAmount);
    const taxAmount = (discountedTotal * watchedTaxRate) / 100;
    const grandTotal = discountedTotal + taxAmount;
    const totalProfit = grandTotal - totalCost;
    const profitMargin = grandTotal > 0 ? ((totalProfit / grandTotal) * 100).toFixed(1) : 0;

    return {
      subtotal,
      discountAmount,
      taxAmount,
      grandTotal,
      totalCost,
      totalProfit,
      profitMargin,
      hasStockIssue,
    };
  }, [watchedItems, watchedDiscount, watchedTaxRate]);

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      setFormError(null);

      // Validate at least one valid item selected
      const validItems = data.items.filter((item) => item.itemId && parseInt(item.qty) > 0);
      if (validItems.length === 0) {
        setFormError('Please select at least one item with valid quantity.');
        setLoading(false);
        return;
      }

      // Check stock
      for (const itm of validItems) {
        const fullItem = itemsMap[itm.itemId];
        const requestedQty = parseInt(itm.qty) || 0;
        const available = parseInt(fullItem?.qty) || 0;

        if (requestedQty > available) {
          setFormError(
            `Insufficient stock for "${fullItem?.title || 'item'}". Available: ${available}, Requested: ${requestedQty}`
          );
          setLoading(false);
          return;
        }
      }

      // Build payload matching Zod schema
      const payload = {
        customerName: data.customerName.trim(),
        description: data.description ? data.description.trim() : null,
        username: username,
        status: data.status || 'PENDING',
        paymentStatus: data.paymentStatus || 'UNPAID',
        taxRate: parseFloat(data.taxRate) || 0,
        discount: parseFloat(data.discount) || 0,
        dueDate: data.dueDate ? new Date(data.dueDate).toISOString() : null,
        items: validItems.map((item) => ({
          itemId: item.itemId,
          qty: parseInt(item.qty),
          buyingPrice: parseFloat(item.buyingPrice) || 0,
          sellingPrice: parseFloat(item.sellingPrice) || 0,
        })),
      };

      const response = await fetch('/api/invoice', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || result.message || 'Failed to generate invoice');
      }

      toast.success('Invoice & Bill generated successfully!');
      router.push(`/invoice/${result.data.id}`);
    } catch (err) {
      console.error('Invoice creation error:', err);
      setFormError(err.message || 'Failed to generate invoice.');
      toast.error(err.message || 'Failed to generate invoice.');
    } finally {
      setLoading(false);
    }
  };

  const formatINR = (val) => {
    const num = parseFloat(val) || 0;
    return `₹${num.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-5xl mx-auto my-6">
      {formError && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>{formError}</AlertDescription>
        </Alert>
      )}

      {/* Customer & Billing Details Card */}
      <Card className="border-slate-200 shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg font-bold flex items-center gap-2">
            <User className="h-5 w-5 text-blue-600" />
            Customer & Invoice Details
          </CardTitle>
          <CardDescription>Enter billing recipient details, terms, and invoice status</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">
                Customer / Client Name <span className="text-red-500">*</span>
              </label>
              <Input
                placeholder="e.g. Rajesh Sharma / ABC Corp"
                {...register('customerName', { required: 'Customer name is required' })}
                className={errors.customerName ? 'border-red-500' : ''}
              />
              {errors.customerName && (
                <p className="text-[11px] text-red-500">{errors.customerName.message}</p>
              )}
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">Customer Phone</label>
              <Input placeholder="+91 98765 43210" {...register('customerPhone')} />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">Customer Email</label>
              <Input type="email" placeholder="customer@example.com" {...register('customerEmail')} />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">Invoice Status</label>
              <select
                {...register('status')}
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="PENDING">PENDING</option>
                <option value="COMPLETED">COMPLETED</option>
                <option value="CANCELLED">CANCELLED</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">Payment Status</label>
              <select
                {...register('paymentStatus')}
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="UNPAID">UNPAID</option>
                <option value="PARTIAL">PARTIAL</option>
                <option value="PAID">PAID</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">Tax / GST Rate (%)</label>
              <Input
                type="number"
                step="0.1"
                min="0"
                max="100"
                placeholder="18"
                {...register('taxRate')}
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">Discount (%)</label>
              <Input
                type="number"
                step="0.1"
                min="0"
                max="100"
                placeholder="0"
                {...register('discount')}
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">Payment Due Date</label>
              <Input type="date" {...register('dueDate')} />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">Notes / Payment Terms</label>
              <Input placeholder="e.g. Payment due within 15 days upon delivery" {...register('description')} />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Invoice Line Items */}
      <Card className="border-slate-200 shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between pb-3">
          <div>
            <CardTitle className="text-lg font-bold flex items-center gap-2">
              <FileText className="h-5 w-5 text-blue-600" />
              Invoice Line Items
            </CardTitle>
            <CardDescription>Select items from catalog. Live prices and stock are validated automatically.</CardDescription>
          </div>
          <Button
            type="button"
            onClick={() =>
              append({
                itemId: '',
                qty: 1,
                buyingPrice: 0,
                sellingPrice: 0,
                availableStock: 0,
                title: '',
              })
            }
            variant="outline"
            size="sm"
            className="gap-1 text-xs"
          >
            <Plus className="h-3.5 w-3.5" /> Add Row
          </Button>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="space-y-3">
            {fields.map((field, index) => {
              const currentItem = watchedItems[index] || {};
              const availStock = currentItem.availableStock ?? 0;
              const reqQty = parseInt(currentItem.qty) || 0;
              const isOverStock = currentItem.itemId && reqQty > availStock;
              const lineTotal = reqQty * (parseFloat(currentItem.sellingPrice) || 0);

              return (
                <div
                  key={field.id}
                  className={`p-3.5 rounded-xl border transition-all ${
                    isOverStock ? 'border-red-300 bg-red-50/50' : 'border-slate-200 bg-slate-50/60'
                  }`}
                >
                  <div className="grid gap-3 sm:grid-cols-12 items-end">
                    {/* Item Select */}
                    <div className="sm:col-span-5 space-y-1">
                      <label className="text-xs font-semibold text-slate-700">Select Item</label>
                      <select
                        value={currentItem.itemId || ''}
                        onChange={(e) => handleItemChange(e, index)}
                        className="w-full px-3 py-2 text-sm border border-slate-200 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">-- Choose an item ({items.length} available) --</option>
                        {items.map((item) => (
                          <option key={item.id} value={item.id}>
                            {item.title} (Stock: {item.qty} | Price: ₹{parseFloat(item.sellingPrice || 0).toFixed(2)})
                          </option>
                        ))}
                      </select>
                      {currentItem.itemId && (
                        <div className="flex items-center gap-2 text-[11px] mt-1">
                          <span className={availStock < 10 ? 'text-amber-600 font-semibold' : 'text-slate-500'}>
                            Available Stock: {availStock} units
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Quantity */}
                    <div className="sm:col-span-2 space-y-1">
                      <label className="text-xs font-semibold text-slate-700">Quantity</label>
                      <Input
                        type="number"
                        min="1"
                        {...register(`items.${index}.qty`, {
                          valueAsNumber: true,
                          required: true,
                        })}
                        className={isOverStock ? 'border-red-500' : ''}
                      />
                    </div>

                    {/* Unit Price */}
                    <div className="sm:col-span-2 space-y-1">
                      <label className="text-xs font-semibold text-slate-700">Unit Price (₹)</label>
                      <Input
                        type="number"
                        step="0.01"
                        min="0"
                        {...register(`items.${index}.sellingPrice`, {
                          valueAsNumber: true,
                        })}
                      />
                    </div>

                    {/* Line Total */}
                    <div className="sm:col-span-2 space-y-1">
                      <label className="text-xs font-semibold text-slate-700">Line Total</label>
                      <div className="px-3 py-2 bg-white border border-slate-200 rounded-md text-sm font-bold text-slate-800 text-right">
                        {formatINR(lineTotal)}
                      </div>
                    </div>

                    {/* Delete Action */}
                    <div className="sm:col-span-1 flex justify-end pb-1">
                      {fields.length > 1 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => remove(index)}
                          className="text-slate-400 hover:text-red-600 h-9 w-9"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>

                  {isOverStock && (
                    <p className="text-xs font-medium text-red-600 mt-2 flex items-center gap-1">
                      <AlertTriangle className="h-3.5 w-3.5" />
                      Warning: Requested quantity ({reqQty}) exceeds available warehouse stock ({availStock}).
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Financial Summary Calculation Card */}
      <div className="grid gap-6 md:grid-cols-2 items-start">
        <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-100 text-xs text-slate-600 space-y-2">
          <p className="font-semibold text-slate-800 text-sm flex items-center gap-1.5">
            <CheckCircle2 className="h-4 w-4 text-blue-600" />
            Automatic Stock & Revenue Sync
          </p>
          <p>
            Upon generating this invoice, the requested quantities will be automatically deducted from item inventory.
          </p>
          <p>
            You can print or download the finalized bill with full GST tax invoice layout upon confirmation.
          </p>
        </div>

        <Card className="border-slate-200 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-bold">Billing Breakdown</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2.5 text-sm">
            <div className="flex justify-between text-slate-600">
              <span>Items Subtotal:</span>
              <span className="font-semibold text-slate-800">{formatINR(financials.subtotal)}</span>
            </div>

            {watchedDiscount > 0 && (
              <div className="flex justify-between text-emerald-600">
                <span>Discount ({watchedDiscount}%):</span>
                <span>-{formatINR(financials.discountAmount)}</span>
              </div>
            )}

            {watchedTaxRate > 0 && (
              <div className="flex justify-between text-slate-600">
                <span>Tax / GST ({watchedTaxRate}%):</span>
                <span>+{formatINR(financials.taxAmount)}</span>
              </div>
            )}

            <div className="pt-2 border-t flex justify-between text-base font-bold text-slate-900">
              <span>Grand Total:</span>
              <span className="text-blue-600">{formatINR(financials.grandTotal)}</span>
            </div>

            {role === 'ADMIN' && (
              <div className="pt-2 border-t flex justify-between text-xs text-slate-500">
                <span>Estimated Margin:</span>
                <span className="font-semibold text-emerald-600">
                  +{formatINR(financials.totalProfit)} ({financials.profitMargin}%)
                </span>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Submission Actions */}
      <div className="flex items-center justify-end gap-3 pt-2">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push('/invoice')}
          disabled={loading}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={loading || financials.hasStockIssue}
          className="bg-blue-600 hover:bg-blue-500 min-w-[160px]"
        >
          {loading ? (
            <div className="flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              Processing...
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Generate Invoice & Bill
            </div>
          )}
        </Button>
      </div>
    </form>
  );
}
