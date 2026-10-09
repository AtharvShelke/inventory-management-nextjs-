'use client';

import React from 'react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  FileText,
  Printer,
  Download,
  ArrowLeft,
  Building2,
  Calendar,
  CheckCircle2,
  Clock,
  User,
  Phone,
  Mail,
} from 'lucide-react';

export default function InvoiceDetailView({ invoice, isAdmin }) {
  const handlePrint = () => {
    window.print();
  };

  const formatINR = (val) => {
    const num = Number(val) || 0;
    return `₹${num.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const getStatusBadge = (status) => {
    switch (status?.toUpperCase()) {
      case 'COMPLETED':
        return <Badge className="bg-emerald-500/15 text-emerald-700 border-emerald-300">COMPLETED</Badge>;
      case 'PENDING':
        return <Badge className="bg-amber-500/15 text-amber-700 border-amber-300">PENDING</Badge>;
      case 'CANCELLED':
        return <Badge className="bg-rose-500/15 text-rose-700 border-rose-300">CANCELLED</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getPaymentBadge = (status) => {
    switch (status?.toUpperCase()) {
      case 'PAID':
        return <Badge className="bg-blue-500/15 text-blue-700 border-blue-300">PAID</Badge>;
      case 'PARTIAL':
        return <Badge className="bg-purple-500/15 text-purple-700 border-purple-300">PARTIAL</Badge>;
      case 'UNPAID':
        return <Badge className="bg-red-500/15 text-red-700 border-red-300">UNPAID</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const subtotal = invoice.invoiceItems?.reduce((sum, item) => {
    return sum + (Number(item.sellingPrice) || 0) * (Number(item.qty) || 0);
  }, 0) || Number(invoice.totalSale) || 0;

  const discountPercent = Number(invoice.discount) || 0;
  const discountAmount = (subtotal * discountPercent) / 100;
  const discountedSubtotal = Math.max(0, subtotal - discountAmount);

  const taxPercent = Number(invoice.taxRate) || 0;
  const taxAmount = (discountedSubtotal * taxPercent) / 100;
  const grandTotal = discountedSubtotal + taxAmount;

  return (
    <div className="space-y-6 max-w-4xl mx-auto my-4">
      {/* Top Action Bar - Hidden during printing */}
      <div className="flex items-center justify-between print:hidden">
        <Link href="/invoice">
          <Button variant="outline" size="sm" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Invoices
          </Button>
        </Link>
        <div className="flex items-center gap-2">
          <Button onClick={handlePrint} variant="outline" size="sm" className="gap-2">
            <Printer className="h-4 w-4" />
            Print Invoice
          </Button>
          <Button onClick={handlePrint} size="sm" className="bg-blue-600 hover:bg-blue-500 gap-2 text-white">
            <Download className="h-4 w-4" />
            Download PDF
          </Button>
        </div>
      </div>

      {/* Formal Print-Ready Invoice Sheet */}
      <div className="bg-white border border-slate-200 rounded-2xl p-8 sm:p-12 shadow-md print:shadow-none print:border-none print:p-0">
        {/* Invoice Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-8 border-b border-slate-200 gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-lg">
                EF
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-900">Enrich Furniture</h1>
                <p className="text-xs text-slate-500">Premium Furnishings & Interior Solutions</p>
              </div>
            </div>
            <p className="text-xs text-slate-400">GSTIN: 27AABCE1234F1Z5 • support@enrichfurniture.com</p>
          </div>

          <div className="text-left sm:text-right space-y-1">
            <Badge className="bg-slate-900 text-white px-3 py-1 text-xs">TAX INVOICE</Badge>
            <h2 className="text-lg font-bold text-slate-900 pt-1">
              #{invoice.id ? invoice.id.slice(-8).toUpperCase() : 'INV-001'}
            </h2>
            <p className="text-xs text-slate-500 flex items-center sm:justify-end gap-1">
              <Calendar className="h-3 w-3" />
              Date: {new Date(invoice.date || invoice.createdAt).toLocaleDateString('en-IN')}
            </p>
            {invoice.dueDate && (
              <p className="text-xs text-amber-600 flex items-center sm:justify-end gap-1">
                <Clock className="h-3 w-3" />
                Due: {new Date(invoice.dueDate).toLocaleDateString('en-IN')}
              </p>
            )}
          </div>
        </div>

        {/* Billing & Recipient Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 py-6 border-b border-slate-200 text-sm">
          <div className="space-y-1.5">
            <span className="text-xs font-semibold uppercase text-slate-400">Billed To</span>
            <h3 className="text-base font-bold text-slate-900">{invoice.customerName}</h3>
            {invoice.customerPhone && (
              <p className="text-xs text-slate-600 flex items-center gap-1.5">
                <Phone className="h-3.5 w-3.5 text-slate-400" />
                {invoice.customerPhone}
              </p>
            )}
            {invoice.customerEmail && (
              <p className="text-xs text-slate-600 flex items-center gap-1.5">
                <Mail className="h-3.5 w-3.5 text-slate-400" />
                {invoice.customerEmail}
              </p>
            )}
            {invoice.description && (
              <p className="text-xs text-slate-500 pt-1 italic">
                Note: {invoice.description}
              </p>
            )}
          </div>

          <div className="sm:text-right space-y-2">
            <span className="text-xs font-semibold uppercase text-slate-400">Status & Payment</span>
            <div className="flex sm:justify-end gap-2">
              {getStatusBadge(invoice.status)}
              {getPaymentBadge(invoice.paymentStatus)}
            </div>
            <p className="text-xs text-slate-500">
              Processed by: <strong className="text-slate-700">{invoice.username || 'System'}</strong>
            </p>
          </div>
        </div>

        {/* Invoice Items Table */}
        <div className="py-6">
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500 text-xs uppercase font-semibold">
                <th className="pb-3">#</th>
                <th className="pb-3">Item Description</th>
                <th className="pb-3 text-center">Qty</th>
                <th className="pb-3 text-right">Unit Price</th>
                {isAdmin && <th className="pb-3 text-right text-slate-400">Unit Cost</th>}
                <th className="pb-3 text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {invoice.invoiceItems?.map((item, index) => {
                const itemQty = Number(item.qty) || 0;
                const sp = Number(item.sellingPrice) || 0;
                const bp = Number(item.buyingPrice) || 0;
                const lineTotal = itemQty * sp;

                return (
                  <tr key={item.id || index} className="py-3">
                    <td className="py-3 text-slate-400 text-xs">{index + 1}</td>
                    <td className="py-3">
                      <p className="font-semibold text-slate-900">{item.item?.title || 'Product'}</p>
                      {item.item?.category && (
                        <span className="text-xs text-slate-400">{item.item.category}</span>
                      )}
                    </td>
                    <td className="py-3 text-center font-medium text-slate-800">{itemQty}</td>
                    <td className="py-3 text-right text-slate-800">{formatINR(sp)}</td>
                    {isAdmin && (
                      <td className="py-3 text-right text-xs text-slate-400">{formatINR(bp)}</td>
                    )}
                    <td className="py-3 text-right font-bold text-slate-900">{formatINR(lineTotal)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Financial Summary Calculation */}
        <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row justify-between items-start gap-6">
          <div className="text-xs text-slate-500 space-y-1 max-w-sm">
            <p className="font-semibold text-slate-700">Terms & Conditions:</p>
            <p>1. Goods once sold are subject to company warranty guidelines.</p>
            <p>2. Please retain this invoice copy for all warranty and exchange claims.</p>
          </div>

          <div className="w-full sm:w-72 space-y-2 text-sm">
            <div className="flex justify-between text-slate-600">
              <span>Subtotal:</span>
              <span className="font-semibold text-slate-800">{formatINR(subtotal)}</span>
            </div>

            {discountPercent > 0 && (
              <div className="flex justify-between text-emerald-600">
                <span>Discount ({discountPercent}%):</span>
                <span>-{formatINR(discountAmount)}</span>
              </div>
            )}

            {taxPercent > 0 && (
              <div className="flex justify-between text-slate-600">
                <span>GST / Tax ({taxPercent}%):</span>
                <span>+{formatINR(taxAmount)}</span>
              </div>
            )}

            <div className="pt-2 border-t border-slate-300 flex justify-between text-lg font-bold text-slate-900">
              <span>Grand Total:</span>
              <span className="text-blue-600">{formatINR(grandTotal)}</span>
            </div>

            {isAdmin && Number(invoice.totalProfit) > 0 && (
              <div className="pt-1 flex justify-between text-xs text-emerald-700">
                <span>Net Profit:</span>
                <span>+{formatINR(invoice.totalProfit)}</span>
              </div>
            )}
          </div>
        </div>

        {/* Signature & Footer */}
        <div className="pt-12 mt-8 border-t border-dashed border-slate-200 flex justify-between items-end text-xs text-slate-400">
          <div>
            <p>Thank you for your business!</p>
            <p>Computer-generated invoice. No physical signature required.</p>
          </div>
          <div className="text-right">
            <div className="w-36 border-b border-slate-400 mb-1" />
            <p className="font-semibold text-slate-600">Authorized Signatory</p>
          </div>
        </div>
      </div>
    </div>
  );
}
