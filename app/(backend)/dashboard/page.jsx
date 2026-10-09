'use client';

import { useEffect, useState, useMemo } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  Package,
  Users,
  TrendingUp,
  TrendingDown,
  DollarSign,
  AlertTriangle,
  ArrowUpRight,
  ArrowDownRight,
  Warehouse as WarehouseIcon,
  Activity,
  Box,
  FileText,
  PlusCircle,
  Clock,
  CheckCircle2,
  XCircle,
  Truck,
  Building2,
  RefreshCw,
  Layers,
  ShoppingBag,
  CreditCard,
} from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid, BarChart as RechartsBarChart, Bar } from 'recharts';

export default function Dashboard() {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/dashboard');
      if (!response.ok) {
        throw new Error('Failed to fetch dashboard data');
      }
      const data = await response.json();
      setDashboardData(data);
      setError(null);
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
      setError(err.message || 'Error loading dashboard');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const formatINR = (val) => {
    const num = parseFloat(val) || 0;
    return `₹${num.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[65vh] space-y-4">
        <div className="relative">
          <div className="w-12 h-12 rounded-full border-4 border-blue-200 border-t-blue-600 animate-spin" />
        </div>
        <p className="text-sm text-slate-500 font-medium">Aggregating live business & inventory metrics...</p>
      </div>
    );
  }

  if (error || !dashboardData) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Card className="p-8 max-w-lg text-center shadow-lg border-red-100">
          <div className="w-12 h-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertTriangle className="h-6 w-6" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 mb-2">Unable to load metrics</h2>
          <p className="text-sm text-slate-500 mb-6">{error || 'Server returned empty dashboard payload.'}</p>
          <Button onClick={fetchDashboardData} className="gap-2">
            <RefreshCw className="h-4 w-4" />
            Retry Connection
          </Button>
        </Card>
      </div>
    );
  }

  const { summary, inventory, warehouses, suppliers, invoices, stockAdjustments } = dashboardData;

  const getStatusBadge = (status) => {
    switch (status?.toUpperCase()) {
      case 'COMPLETED':
        return <Badge className="bg-emerald-500/15 text-emerald-700 border-emerald-300 font-medium">Completed</Badge>;
      case 'PENDING':
        return <Badge className="bg-amber-500/15 text-amber-700 border-amber-300 font-medium">Pending</Badge>;
      case 'CANCELLED':
        return <Badge className="bg-rose-500/15 text-rose-700 border-rose-300 font-medium">Cancelled</Badge>;
      default:
        return <Badge variant="outline">{status || 'Draft'}</Badge>;
    }
  };

  const getPaymentBadge = (status) => {
    switch (status?.toUpperCase()) {
      case 'PAID':
        return <Badge className="bg-blue-500/15 text-blue-700 border-blue-300 font-medium">Paid</Badge>;
      case 'PARTIAL':
        return <Badge className="bg-purple-500/15 text-purple-700 border-purple-300 font-medium">Partial</Badge>;
      case 'UNPAID':
        return <Badge className="bg-red-500/15 text-red-700 border-red-300 font-medium">Unpaid</Badge>;
      default:
        return <Badge variant="outline">{status || 'Unpaid'}</Badge>;
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top Banner & Quick Operations Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-950 p-6 rounded-2xl text-white shadow-xl shadow-slate-950/10">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl lg:text-3xl font-bold tracking-tight">Executive Dashboard</h1>
            <Badge className="bg-blue-500/30 text-blue-300 border-blue-400/40 text-xs">Live Sync</Badge>
          </div>
          <p className="text-slate-300 text-sm max-w-xl">
            Real-time control center for inventory valuation, sales invoices, multi-warehouse stock levels, and vendor analytics.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <Button asChild className="bg-blue-600 hover:bg-blue-500 text-white font-medium shadow-md shadow-blue-600/30">
            <Link href="/invoice/new">
              <FileText className="mr-2 h-4 w-4" />
              New Invoice
            </Link>
          </Button>
          <Button asChild variant="outline" className="bg-white/10 hover:bg-white/20 text-white border-white/20">
            <Link href="/items/new">
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Item
            </Link>
          </Button>
          <Button asChild variant="outline" className="bg-white/10 hover:bg-white/20 text-white border-white/20">
            <Link href="/inventoryadjustment/new">
              <Truck className="mr-2 h-4 w-4" />
              Adjust Stock
            </Link>
          </Button>
          <Button variant="ghost" size="icon" onClick={fetchDashboardData} className="text-slate-300 hover:text-white hover:bg-white/10" title="Refresh">
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Primary KPI Metrics Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Total Revenue */}
        <Card className="border-slate-200/80 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-blue-500/10 to-transparent rounded-bl-full pointer-events-none" />
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Total Revenue</span>
            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
              <DollarSign className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">{formatINR(summary.totalRevenue)}</div>
            <div className="flex items-center gap-2 mt-1.5 text-xs">
              <span className="inline-flex items-center text-emerald-600 font-semibold">
                <ArrowUpRight className="h-3 w-3 mr-0.5" />
                {summary.profitMargin}% margin
              </span>
              <span className="text-slate-400">• Profit: {formatINR(summary.totalProfit)}</span>
            </div>
          </CardContent>
        </Card>

        {/* Inventory Valuation */}
        <Card className="border-slate-200/80 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-indigo-500/10 to-transparent rounded-bl-full pointer-events-none" />
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Inventory Valuation</span>
            <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
              <Package className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">{formatINR(inventory.saleValue)}</div>
            <div className="flex items-center justify-between text-xs text-slate-500 mt-1.5">
              <span>Cost: {formatINR(inventory.costValue)}</span>
              <span className="text-indigo-600 font-medium">+{formatINR(inventory.unrealizedProfit)} gain</span>
            </div>
          </CardContent>
        </Card>

        {/* Stock Status & Units */}
        <Card className="border-slate-200/80 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-emerald-500/10 to-transparent rounded-bl-full pointer-events-none" />
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">In-Stock Units</span>
            <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
              <Layers className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">{summary.totalStockQuantity.toLocaleString()} <span className="text-xs font-normal text-slate-500">units</span></div>
            <div className="flex items-center gap-2 mt-1.5 text-xs text-slate-500">
              <span className="font-medium text-slate-700">{inventory.count} catalog SKUs</span>
              <span>across {warehouses.count} hubs</span>
            </div>
          </CardContent>
        </Card>

        {/* Receivables & Invoices */}
        <Card className="border-slate-200/80 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-amber-500/10 to-transparent rounded-bl-full pointer-events-none" />
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Receivables & Invoices</span>
            <div className="p-2 bg-amber-50 text-amber-600 rounded-lg">
              <CreditCard className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">{formatINR(summary.pendingReceivables)}</div>
            <div className="flex items-center gap-2 mt-1.5 text-xs">
              <span className="text-amber-600 font-semibold">{invoices.unpaidCount} unpaid</span>
              <span className="text-slate-400">• Total {invoices.count} orders</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Low Stock Warning Banner if any critical items */}
      {summary.lowStockAlerts > 0 && (
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-amber-500/10 border border-amber-300/60 rounded-xl gap-3">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-100 text-amber-700 rounded-lg">
              <AlertTriangle className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-semibold text-amber-900">
                {summary.lowStockAlerts} items require reordering ({summary.criticalStockCount} critical/out-of-stock)
              </p>
              <p className="text-xs text-amber-700">
                Stock is currently below designated minimum safety thresholds.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 self-end sm:self-center">
            <Button asChild size="sm" variant="outline" className="border-amber-300 text-amber-800 hover:bg-amber-100">
              <Link href="/items">View Stock List</Link>
            </Button>
            <Button asChild size="sm" className="bg-amber-600 hover:bg-amber-700 text-white">
              <Link href="/inventoryadjustment/new">Restock Items</Link>
            </Button>
          </div>
        </div>
      )}

      {/* Main Interactive Views Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="bg-slate-100 p-1 border border-slate-200 rounded-xl">
          <TabsTrigger value="overview" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">
            Overview & Trends
          </TabsTrigger>
          <TabsTrigger value="inventory" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">
            Inventory & Warehouses
          </TabsTrigger>
          <TabsTrigger value="invoices" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">
            Invoices & Billing
          </TabsTrigger>
          <TabsTrigger value="suppliers" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">
            Vendors & Adjustments
          </TabsTrigger>
        </TabsList>

        {/* TAB 1: OVERVIEW & TRENDS */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-7">
            {/* Revenue Trend Chart */}
            <Card className="lg:col-span-4 border-slate-200 shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between pb-4">
                <div>
                  <CardTitle className="text-lg font-bold">Revenue & Profit Performance</CardTitle>
                  <CardDescription>Sales vs Net Earnings overview</CardDescription>
                </div>
                <div className="flex items-center gap-4 text-xs">
                  <span className="flex items-center gap-1.5 text-blue-600 font-medium">
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-600" /> Revenue
                  </span>
                  <span className="flex items-center gap-1.5 text-emerald-600 font-medium">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-600" /> Profit
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-[280px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={invoices.timeline} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                      <defs>
                        <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#2563eb" stopOpacity={0.4} />
                          <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="profitGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                          <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                      <XAxis dataKey="name" tickLine={false} axisLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                      <YAxis tickLine={false} axisLine={false} tick={{ fill: '#64748b', fontSize: 12 }} tickFormatter={(v) => `₹${v}`} />
                      <Tooltip formatter={(value) => [`₹${Number(value).toFixed(2)}`, '']} />
                      <Area type="monotone" dataKey="sales" name="Sales" stroke="#2563eb" strokeWidth={2.5} fillOpacity={1} fill="url(#revenueGrad)" />
                      <Area type="monotone" dataKey="profit" name="Profit" stroke="#10b981" strokeWidth={2.5} fillOpacity={1} fill="url(#profitGrad)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Stock Health & Valuation Breakdown */}
            <Card className="lg:col-span-3 border-slate-200 shadow-sm flex flex-col justify-between">
              <CardHeader>
                <CardTitle className="text-lg font-bold">Stock Health Distribution</CardTitle>
                <CardDescription>Inventory health status of all {inventory.count} catalog items</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-emerald-700 flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-emerald-500" /> Healthy Stock (30+)
                    </span>
                    <span>{inventory.healthyStockCount} items</span>
                  </div>
                  <Progress value={inventory.count > 0 ? (inventory.healthyStockCount / inventory.count) * 100 : 0} className="h-2 bg-slate-100 [&>div]:bg-emerald-500" />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-amber-700 flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-amber-500" /> Low Stock Warning (10-29)
                    </span>
                    <span>{inventory.lowStockCount} items</span>
                  </div>
                  <Progress value={inventory.count > 0 ? (inventory.lowStockCount / inventory.count) * 100 : 0} className="h-2 bg-slate-100 [&>div]:bg-amber-500" />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-rose-700 flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-rose-500" /> Critical Stock (Under 10)
                    </span>
                    <span>{inventory.criticalStockCount} items</span>
                  </div>
                  <Progress value={inventory.count > 0 ? (inventory.criticalStockCount / inventory.count) * 100 : 0} className="h-2 bg-slate-100 [&>div]:bg-rose-500" />
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <span>Categories: <strong className="text-slate-800">{inventory.categories.length}</strong></span>
                  <span>Brands: <strong className="text-slate-800">{inventory.brands.length}</strong></span>
                  <Link href="/items" className="text-blue-600 font-medium hover:underline flex items-center gap-0.5">
                    Manage Items <ArrowUpRight className="h-3 w-3" />
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Consolidated Row: Top High Value Products & Recent Invoices */}
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Top Valued Items */}
            <Card className="border-slate-200 shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between pb-3">
                <div>
                  <CardTitle className="text-base font-bold">Top Stock Valuation Items</CardTitle>
                  <CardDescription>Highest capital worth currently held</CardDescription>
                </div>
                <Button asChild variant="ghost" size="sm" className="text-xs">
                  <Link href="/items">All Items</Link>
                </Button>
              </CardHeader>
              <CardContent className="space-y-3">
                {inventory.topValueItems.length > 0 ? (
                  inventory.topValueItems.map((item, idx) => (
                    <div key={item.id || idx} className="flex items-center justify-between p-2.5 rounded-lg border border-slate-100 hover:bg-slate-50/80 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-xs">
                          {idx + 1}
                        </div>
                        <div>
                          <p className="font-semibold text-sm text-slate-900">{item.title}</p>
                          <p className="text-xs text-slate-500">{item.category} • {item.warehouseTitle}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold text-slate-900">{formatINR(item.totalWorth)}</p>
                        <p className="text-xs text-slate-500">{item.qty} units @ {formatINR(item.sellingPrice)}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-slate-400 py-4 text-center">No item records available.</p>
                )}
              </CardContent>
            </Card>

            {/* Recent Billing / Invoices */}
            <Card className="border-slate-200 shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between pb-3">
                <div>
                  <CardTitle className="text-base font-bold">Recent Invoices & Orders</CardTitle>
                  <CardDescription>Latest customer billing activity</CardDescription>
                </div>
                <Button asChild variant="ghost" size="sm" className="text-xs">
                  <Link href="/invoice">All Invoices</Link>
                </Button>
              </CardHeader>
              <CardContent className="space-y-3">
                {invoices.recent.length > 0 ? (
                  invoices.recent.map((inv) => (
                    <Link
                      key={inv.id}
                      href={`/invoice/${inv.id}`}
                      className="flex items-center justify-between p-2.5 rounded-lg border border-slate-100 hover:bg-slate-50/80 transition-colors group"
                    >
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8 text-xs bg-slate-100">
                          <AvatarFallback className="bg-slate-200 text-slate-700 font-semibold">
                            {inv.customerName ? inv.customerName.slice(0, 2).toUpperCase() : 'CU'}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-semibold text-sm text-slate-900 group-hover:text-blue-600 transition-colors">
                            {inv.customerName}
                          </p>
                          <p className="text-xs text-slate-500">
                            {new Date(inv.date || inv.createdAt).toLocaleDateString('en-IN')}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="hidden sm:flex flex-col items-end gap-1">
                          {getStatusBadge(inv.status)}
                        </div>
                        {getPaymentBadge(inv.paymentStatus)}
                        <div className="text-right font-bold text-sm text-slate-900">
                          {formatINR(inv.totalSale)}
                        </div>
                      </div>
                    </Link>
                  ))
                ) : (
                  <p className="text-xs text-slate-400 py-4 text-center">No invoices created yet.</p>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* TAB 2: INVENTORY & WAREHOUSES */}
        <TabsContent value="inventory" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-3">
            {warehouses.list.map((wh) => (
              <Card key={wh.id} className="border-slate-200 shadow-sm hover:border-blue-200 transition-all">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                      <WarehouseIcon className="h-5 w-5" />
                    </div>
                    <div>
                      <CardTitle className="text-base font-bold">{wh.title}</CardTitle>
                      <p className="text-xs text-slate-500">{wh.location || 'Location unassigned'}</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="capitalize">{wh.type || 'Main'}</Badge>
                </CardHeader>
                <CardContent className="space-y-3 pt-2">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-500">Distinct SKUs:</span>
                    <span className="font-semibold text-slate-800">{wh.itemCount || 0}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-500">Total Units:</span>
                    <span className="font-semibold text-slate-800">{wh.totalQty?.toLocaleString() || 0}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-500">Stored Worth:</span>
                    <span className="font-semibold text-emerald-600">{formatINR(wh.totalValue || 0)}</span>
                  </div>
                  <div className="pt-2 border-t flex justify-end">
                    <Button asChild size="sm" variant="ghost" className="text-xs text-blue-600">
                      <Link href="/items">Inspect Items →</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Urgent Low Stock Table */}
          <Card className="border-slate-200 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-base font-bold flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-amber-500" />
                  Urgent Low Stock Action List
                </CardTitle>
                <CardDescription>Items with quantity below the reorder point threshold</CardDescription>
              </div>
              <Button asChild size="sm">
                <Link href="/inventoryadjustment/new">Restock All</Link>
              </Button>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="bg-slate-50 text-slate-600 text-xs uppercase">
                    <tr>
                      <th className="px-4 py-3">Item Name</th>
                      <th className="px-4 py-3">Warehouse</th>
                      <th className="px-4 py-3">Supplier</th>
                      <th className="px-4 py-3 text-center">Current Qty</th>
                      <th className="px-4 py-3 text-center">Reorder Point</th>
                      <th className="px-4 py-3 text-right">Status</th>
                      <th className="px-4 py-3 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {inventory.lowStockItems.length > 0 ? (
                      inventory.lowStockItems.map((item) => (
                        <tr key={item.id} className="hover:bg-slate-50/80">
                          <td className="px-4 py-3 font-semibold text-slate-900">{item.title}</td>
                          <td className="px-4 py-3 text-slate-600">{item.warehouse?.title || 'Unassigned'}</td>
                          <td className="px-4 py-3 text-slate-600">{item.supplier?.title || 'Unassigned'}</td>
                          <td className="px-4 py-3 text-center font-bold text-rose-600">{item.qty}</td>
                          <td className="px-4 py-3 text-center text-slate-500">{item.reorderPoint}</td>
                          <td className="px-4 py-3 text-right">
                            {item.status === 'OUT_OF_STOCK' ? (
                              <Badge className="bg-red-500/15 text-red-700 border-red-300">Out of Stock</Badge>
                            ) : item.status === 'CRITICAL' ? (
                              <Badge className="bg-rose-500/15 text-rose-700 border-rose-300">Critical</Badge>
                            ) : (
                              <Badge className="bg-amber-500/15 text-amber-700 border-amber-300">Low Stock</Badge>
                            )}
                          </td>
                          <td className="px-4 py-3 text-right">
                            <Button asChild size="sm" variant="outline" className="text-xs h-7">
                              <Link href="/inventoryadjustment/new">Restock</Link>
                            </Button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={7} className="px-4 py-6 text-center text-slate-400">
                          Great news! All items meet healthy stock thresholds.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* TAB 3: INVOICES & BILLING */}
        <TabsContent value="invoices" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-4">
            <Card className="border-slate-200">
              <CardContent className="pt-6">
                <p className="text-xs text-slate-500 uppercase font-semibold">Total Invoices</p>
                <p className="text-2xl font-bold text-slate-900 mt-1">{invoices.count}</p>
                <p className="text-xs text-slate-400 mt-1">{invoices.statusBreakdown.COMPLETED} completed</p>
              </CardContent>
            </Card>

            <Card className="border-slate-200">
              <CardContent className="pt-6">
                <p className="text-xs text-slate-500 uppercase font-semibold">Total Sales Billed</p>
                <p className="text-2xl font-bold text-blue-600 mt-1">{formatINR(invoices.totalSales)}</p>
                <p className="text-xs text-slate-400 mt-1">{formatINR(invoices.totalProfit)} net profit</p>
              </CardContent>
            </Card>

            <Card className="border-slate-200">
              <CardContent className="pt-6">
                <p className="text-xs text-slate-500 uppercase font-semibold">Payment Received</p>
                <p className="text-2xl font-bold text-emerald-600 mt-1">{formatINR(summary.collectedRevenue)}</p>
                <p className="text-xs text-slate-400 mt-1">{invoices.paymentBreakdown.PAID} fully paid invoices</p>
              </CardContent>
            </Card>

            <Card className="border-slate-200">
              <CardContent className="pt-6">
                <p className="text-xs text-slate-500 uppercase font-semibold">Pending Receivables</p>
                <p className="text-2xl font-bold text-amber-600 mt-1">{formatINR(summary.pendingReceivables)}</p>
                <p className="text-xs text-slate-400 mt-1">{invoices.paymentBreakdown.UNPAID} unpaid / partial</p>
              </CardContent>
            </Card>
          </div>

          <Card className="border-slate-200 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-base font-bold">Billing & Invoices Registry</CardTitle>
                <CardDescription>Track payments, sales margin, and fulfillment</CardDescription>
              </div>
              <Button asChild>
                <Link href="/invoice/new">
                  <FileText className="mr-2 h-4 w-4" />
                  Generate Invoice
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="bg-slate-50 text-slate-600 text-xs uppercase">
                    <tr>
                      <th className="px-4 py-3">Customer</th>
                      <th className="px-4 py-3">Date</th>
                      <th className="px-4 py-3 text-right">Total Amount</th>
                      <th className="px-4 py-3 text-right">Profit</th>
                      <th className="px-4 py-3 text-center">Fulfillment</th>
                      <th className="px-4 py-3 text-center">Payment</th>
                      <th className="px-4 py-3 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {invoices.recent.map((inv) => (
                      <tr key={inv.id} className="hover:bg-slate-50/80">
                        <td className="px-4 py-3 font-semibold text-slate-900">{inv.customerName}</td>
                        <td className="px-4 py-3 text-slate-500">
                          {new Date(inv.date || inv.createdAt).toLocaleDateString('en-IN')}
                        </td>
                        <td className="px-4 py-3 text-right font-bold text-slate-900">{formatINR(inv.totalSale)}</td>
                        <td className="px-4 py-3 text-right text-emerald-600 font-medium">+{formatINR(inv.totalProfit)}</td>
                        <td className="px-4 py-3 text-center">{getStatusBadge(inv.status)}</td>
                        <td className="px-4 py-3 text-center">{getPaymentBadge(inv.paymentStatus)}</td>
                        <td className="px-4 py-3 text-right">
                          <Button asChild size="sm" variant="ghost" className="text-xs h-7">
                            <Link href={`/invoice/${inv.id}`}>View Bill</Link>
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* TAB 4: VENDORS & ADJUSTMENTS */}
        <TabsContent value="suppliers" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Suppliers */}
            <Card className="border-slate-200 shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-base font-bold">Suppliers & Vendor Network</CardTitle>
                  <CardDescription>{suppliers.count} registered partner suppliers</CardDescription>
                </div>
                <Button asChild size="sm" variant="outline">
                  <Link href="/supplier">View All</Link>
                </Button>
              </CardHeader>
              <CardContent className="space-y-3">
                {suppliers.recent.map((s) => (
                  <div key={s.id} className="flex items-center justify-between p-3 border rounded-xl hover:bg-slate-50/80 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 bg-blue-50 text-blue-600 rounded-lg">
                        <Building2 className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="font-semibold text-sm text-slate-900">{s.title}</p>
                        <p className="text-xs text-slate-500">{s.email || s.phone || 'No direct contact'}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge variant="secondary" className="text-xs">{s.totalItems} Items Supplied</Badge>
                      {s.paymentTerms && <p className="text-[11px] text-slate-400 mt-1">{s.paymentTerms}</p>}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Recent Adjustments Feed */}
            <Card className="border-slate-200 shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-base font-bold">Recent Stock Adjustments</CardTitle>
                  <CardDescription>
                    {stockAdjustments.addStockCount} Purchases, {stockAdjustments.transferStockCount} Transfers
                  </CardDescription>
                </div>
                <Button asChild size="sm" variant="outline">
                  <Link href="/inventoryadjustment">All Adjustments</Link>
                </Button>
              </CardHeader>
              <CardContent className="space-y-3">
                {stockAdjustments.recentAddStock.slice(0, 4).map((adj) => (
                  <div key={adj.id} className="flex items-center justify-between p-3 border rounded-xl hover:bg-slate-50/80 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
                        <TrendingUp className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="font-semibold text-sm text-slate-900">{adj.item?.title || 'Stock In'}</p>
                        <p className="text-xs text-slate-500">Ref: {adj.referenceNumber} • {adj.warehouse?.title}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="font-bold text-emerald-600 text-sm">+{adj.addStockQty}</span>
                      <p className="text-[11px] text-slate-400">{adj.username || 'Admin'}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
