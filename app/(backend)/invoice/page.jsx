'use client';

import { useEffect, useState, useCallback, useMemo } from 'react';
import FixedHeader from '@/components/dashboard/FixedHeader';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  AlertTriangle,
  Loader2,
  RefreshCw,
  FileText,
  DollarSign,
  TrendingUp,
  Clock,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import InvoiceTable from '@/components/dashboard/InvoiceTable';

export default function InvoicePage() {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
    let isMounted = true;

    if (isMounted) {
      fetchInvoices();
    }

    return () => {
      isMounted = false;
    };
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

    return {
      totalInvoices,
      totalRevenue,
      totalProfit,
      pendingInvoices,
      paidInvoices,
    };
  }, [invoices]);

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
        render: (invoice) => (
          <Badge
            variant={invoice.status === 'COMPLETED' ? 'success' : 'warning'}
            className={
              invoice.status === 'COMPLETED'
                ? 'bg-green-100 text-green-800'
                : 'bg-yellow-100 text-yellow-800'
            }
          >
            {invoice.status}
          </Badge>
        ),
      },
      {
        key: 'paymentStatus',
        label: 'Payment',
        sortable: true,
        render: (invoice) => (
          <Badge
            variant={invoice.paymentStatus === 'PAID' ? 'success' : 'destructive'}
            className={
              invoice.paymentStatus === 'PAID'
                ? 'bg-blue-100 text-blue-800'
                : 'bg-red-100 text-red-800'
            }
          >
            {invoice.paymentStatus}
          </Badge>
        ),
      },
      {
        key: 'username',
        label: 'Created By',
        sortable: true,
      },
    ],
    []
  );

  // Loading state
  if (loading) {
    return (
      <div className="space-y-4">
        <FixedHeader title="Invoices" newLink="/overview/invoice/new" />
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
            <p className="text-muted-foreground">Loading invoices...</p>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="space-y-4">
        <FixedHeader title="Invoices" newLink="/overview/invoice/new" />
        <div className="flex items-center justify-center min-h-[400px]">
          <Card className="p-6 max-w-md">
            <div className="text-center">
              <AlertTriangle className="h-12 w-12 text-red-600 mx-auto mb-4" />
              <h2 className="text-xl font-bold mb-2 text-red-600">Error Loading Invoices</h2>
              <p className="text-sm text-muted-foreground mb-4">{error}</p>
              <Button onClick={fetchInvoices}>
                <RefreshCw className="mr-2 h-4 w-4" />
                Try Again
              </Button>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <FixedHeader title="Invoices" newLink="/overview/invoice/new" />

      {/* Statistics Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5 p-4 md:p-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Invoices</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{statistics.totalInvoices}</div>
            <p className="text-xs text-muted-foreground">All time</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{statistics.totalRevenue.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">Total sales</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Profit</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              ₹{statistics.totalProfit.toFixed(2)}
            </div>
            <p className="text-xs text-muted-foreground">Net profit</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{statistics.pendingInvoices}</div>
            <p className="text-xs text-muted-foreground">Awaiting completion</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Paid</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{statistics.paidInvoices}</div>
            <p className="text-xs text-muted-foreground">Payment received</p>
          </CardContent>
        </Card>
      </div>

      {/* Invoice Table */}
      <div className="p-4 md:p-8">
        <Card>
          <CardHeader>
            <CardTitle>Invoice Management</CardTitle>
            <CardDescription>Track and manage your invoices and payments</CardDescription>
          </CardHeader>
          <CardContent>
            {invoices.length > 0 ? (
              <InvoiceTable
                data={invoices}
                columns={columns}
                resourceName="invoice"
                setData={setInvoices}
                onDelete={handleDelete}
                onRefresh={fetchInvoices}
              />
            ) : (
              <div className="text-center py-10 border border-dashed rounded-lg">
                <FileText className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-lg font-medium mb-2">No invoices found</p>
                <p className="text-sm text-muted-foreground mb-4">
                  Create your first invoice to get started
                </p>
                <Button onClick={() => (window.location.href = '/overview/invoice/new')}>
                  <FileText className="mr-2 h-4 w-4" />
                  Create Invoice
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
