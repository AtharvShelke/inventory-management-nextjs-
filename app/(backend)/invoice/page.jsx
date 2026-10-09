'use client';

import { useEffect, useState, useCallback, useMemo } from 'react';
import FixedHeader from '@/components/dashboard/FixedHeader';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  AlertTriangle,
  Loader2,
  RefreshCw,
  FileText,
  DollarSign,
  TrendingUp,
  Clock,
  CheckCircle2,
  Plus,
  Filter,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import InvoiceTable from '@/components/dashboard/InvoiceTable';
import Link from 'next/link';

export default function InvoicePage() {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [paymentFilter, setPaymentFilter] = useState('ALL');

  // Fetch invoices
  const fetchInvoices = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch('/api/invoice');

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      const data = Array.isArray(result) ? result : result.data || [];

      if (!Array.isArray(data)) {
        throw new Error('Invalid data format received');
      }

      // Format invoice data
      const formattedInvoices = data.map((invoice) => ({
        ...invoice,
        formattedDate: new Date(invoice.createdAt).toLocaleDateString('en-IN', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
        }),
        totalSale: parseFloat(invoice.totalSale) || 0,
        totalProfit: parseFloat(invoice.totalProfit) || 0,
        totalCost: parseFloat(invoice.totalCost) || 0,
      }));

      setInvoices(formattedInvoices);
    } catch (err) {
      console.error('Error fetching invoices:', err);
      setError(err.message || 'Failed to load invoices');
      toast.error('Failed to load invoices');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchInvoices();
  }, [fetchInvoices]);

  // Handle invoice deletion
  const handleDelete = useCallback((id) => {
    setInvoices((prev) => prev.filter((invoice) => invoice.id !== id));
    toast.success('Invoice deleted successfully');
  }, []);

  // Calculate statistics
  const statistics = useMemo(() => {
    const totalInvoices = invoices.length;
    const totalRevenue = invoices.reduce((sum, inv) => sum + inv.totalSale, 0);
    const totalProfit = invoices.reduce((sum, inv) => sum + inv.totalProfit, 0);
    const pendingInvoices = invoices.filter((inv) => inv.status === 'PENDING').length;
    const paidInvoices = invoices.filter((inv) => inv.paymentStatus === 'PAID').length;
    const unpaidInvoices = invoices.filter((inv) => inv.paymentStatus === 'UNPAID').length;

    return {
      totalInvoices,
      totalRevenue,
      totalProfit,
      pendingInvoices,
      paidInvoices,
      unpaidInvoices,
    };
  }, [invoices]);

  // Filtered invoices
  const filteredInvoices = useMemo(() => {
    return invoices.filter((inv) => {
      const matchStatus = statusFilter === 'ALL' || inv.status === statusFilter;
      const matchPayment = paymentFilter === 'ALL' || inv.paymentStatus === paymentFilter;
      return matchStatus && matchPayment;
    });
  }, [invoices, statusFilter, paymentFilter]);

  // Column configuration
  const columns = useMemo(
    () => [
      {
        key: 'formattedDate',
        label: 'Date',
        sortable: true,
      },
      {
        key: 'customerName',
        label: 'Customer',
        sortable: true,
      },
      {
        key: 'totalSale',
        label: 'Amount',
        sortable: true,
        format: (value) => `₹${parseFloat(value).toFixed(2)}`,
      },
      {
        key: 'status',
        label: 'Status',
        sortable: true,
        render: (invoice) => {
          const status = invoice.status?.toUpperCase();
          if (status === 'COMPLETED') {
            return <Badge className="bg-emerald-500/15 text-emerald-700 border-emerald-300">COMPLETED</Badge>;
          }
          if (status === 'CANCELLED') {
            return <Badge className="bg-rose-500/15 text-rose-700 border-rose-300">CANCELLED</Badge>;
          }
          return <Badge className="bg-amber-500/15 text-amber-700 border-amber-300">PENDING</Badge>;
        },
      },
      {
        key: 'paymentStatus',
        label: 'Payment',
        sortable: true,
        render: (invoice) => {
          const pay = invoice.paymentStatus?.toUpperCase();
          if (pay === 'PAID') {
            return <Badge className="bg-blue-500/15 text-blue-700 border-blue-300">PAID</Badge>;
          }
          if (pay === 'PARTIAL') {
            return <Badge className="bg-purple-500/15 text-purple-700 border-purple-300">PARTIAL</Badge>;
          }
          return <Badge className="bg-rose-500/15 text-rose-700 border-rose-300">UNPAID</Badge>;
        },
      },
      {
        key: 'username',
        label: 'Created By',
        sortable: true,
        render: (inv) => inv.username || 'Admin',
      },
    ],
    []
  );

  const formatINR = (val) => {
    return `₹${parseFloat(val || 0).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  // Loading state
  if (loading && invoices.length === 0) {
    return (
      <div className="space-y-4">
        <FixedHeader title="Invoices & Billing" newLink="/invoice/new" />
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <Loader2 className="h-10 w-10 animate-spin text-blue-600 mx-auto mb-3" />
            <p className="text-sm text-slate-500">Loading invoices...</p>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error && invoices.length === 0) {
    return (
      <div className="space-y-4">
        <FixedHeader title="Invoices & Billing" newLink="/invoice/new" />
        <div className="flex items-center justify-center min-h-[400px]">
          <Card className="p-6 max-w-md text-center">
            <AlertTriangle className="h-10 w-10 text-red-600 mx-auto mb-3" />
            <h2 className="text-lg font-bold text-slate-900 mb-1">Error Loading Invoices</h2>
            <p className="text-sm text-slate-500 mb-4">{error}</p>
            <Button onClick={fetchInvoices} className="gap-2">
              <RefreshCw className="h-4 w-4" />
              Try Again
            </Button>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-12">
      <FixedHeader title="Invoices & Billing" newLink="/invoice/new" />

      {/* Statistics Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <Card className="border-slate-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs font-semibold uppercase text-slate-500">Total Invoices</CardTitle>
            <FileText className="h-4 w-4 text-slate-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">{statistics.totalInvoices}</div>
            <p className="text-xs text-slate-500 mt-1">Generated orders</p>
          </CardContent>
        </Card>

        <Card className="border-slate-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs font-semibold uppercase text-slate-500">Total Billed</CardTitle>
            <DollarSign className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{formatINR(statistics.totalRevenue)}</div>
            <p className="text-xs text-slate-500 mt-1">Gross sales</p>
          </CardContent>
        </Card>

        <Card className="border-slate-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs font-semibold uppercase text-slate-500">Total Profit</CardTitle>
            <TrendingUp className="h-4 w-4 text-emerald-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-600">{formatINR(statistics.totalProfit)}</div>
            <p className="text-xs text-slate-500 mt-1">Net profit realized</p>
          </CardContent>
        </Card>

        <Card className="border-slate-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs font-semibold uppercase text-slate-500">Paid Invoices</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{statistics.paidInvoices}</div>
            <p className="text-xs text-slate-500 mt-1">Settled payments</p>
          </CardContent>
        </Card>

        <Card className="border-slate-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs font-semibold uppercase text-slate-500">Unpaid / Due</CardTitle>
            <Clock className="h-4 w-4 text-amber-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-600">{statistics.unpaidInvoices}</div>
            <p className="text-xs text-slate-500 mt-1">{statistics.pendingInvoices} pending orders</p>
          </CardContent>
        </Card>
      </div>

      {/* Invoice Table Container */}
      <Card className="border-slate-200 shadow-sm">
        <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4">
          <div>
            <CardTitle className="text-base font-bold">Billing & Invoice Ledger</CardTitle>
            <CardDescription>Filter and manage customer invoices, payment statuses, and print copies</CardDescription>
          </div>

          {/* Quick Filters */}
          <div className="flex flex-wrap items-center gap-2">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-1.5 text-xs border border-slate-200 rounded-lg bg-slate-50 text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="ALL">All Order Statuses</option>
              <option value="COMPLETED">Completed</option>
              <option value="PENDING">Pending</option>
              <option value="CANCELLED">Cancelled</option>
            </select>

            <select
              value={paymentFilter}
              onChange={(e) => setPaymentFilter(e.target.value)}
              className="px-3 py-1.5 text-xs border border-slate-200 rounded-lg bg-slate-50 text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="ALL">All Payments</option>
              <option value="PAID">Paid</option>
              <option value="PARTIAL">Partial</option>
              <option value="UNPAID">Unpaid</option>
            </select>

            <Button asChild size="sm" className="bg-blue-600 hover:bg-blue-500 text-white gap-1.5 text-xs">
              <Link href="/invoice/new">
                <Plus className="h-3.5 w-3.5" />
                New Invoice
              </Link>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {filteredInvoices.length > 0 ? (
            <InvoiceTable
              data={filteredInvoices}
              columns={columns}
              resourceName="invoice"
              setData={setInvoices}
              onDelete={handleDelete}
              onRefresh={fetchInvoices}
            />
          ) : (
            <div className="text-center py-12 border border-dashed rounded-xl bg-slate-50/50">
              <FileText className="h-12 w-12 mx-auto mb-3 text-slate-300" />
              <p className="text-base font-semibold text-slate-800 mb-1">No invoices found</p>
              <p className="text-xs text-slate-500 mb-4">
                {statusFilter !== 'ALL' || paymentFilter !== 'ALL'
                  ? 'Try clearing the active filters.'
                  : 'Generate your first customer invoice to record sales and deduct stock.'}
              </p>
              <Button asChild size="sm" className="gap-2">
                <Link href="/invoice/new">
                  <Plus className="h-4 w-4" />
                  Generate Invoice
                </Link>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
