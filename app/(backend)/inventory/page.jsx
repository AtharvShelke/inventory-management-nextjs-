'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import FixedHeader from '@/components/dashboard/FixedHeader';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Package,
  Users,
  Warehouse as WarehouseIcon,
  Truck,
  FileText,
  Search,
  Plus,
  AlertTriangle,
  Layers,
  ArrowUpRight,
  TrendingUp,
  RefreshCw,
  Building2,
  CheckCircle2,
  Filter,
} from 'lucide-react';

export default function InventoryHub() {
  const [items, setItems] = useState([]);
  const [warehouses, setWarehouses] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedWarehouse, setSelectedWarehouse] = useState('ALL');
  const [selectedStockFilter, setSelectedStockFilter] = useState('ALL');

  const fetchHubData = async () => {
    try {
      setLoading(true);
      const [itemsRes, whRes, supRes] = await Promise.all([
        fetch('/api/items?limit=1000'),
        fetch('/api/warehouse'),
        fetch('/api/supplier'),
      ]);

      const [itemsData, whData, supData] = await Promise.all([
        itemsRes.json(),
        whRes.json(),
        supRes.json(),
      ]);

      setItems(itemsData.data || (Array.isArray(itemsData) ? itemsData : []));
      setWarehouses(whData.data || (Array.isArray(whData) ? whData : []));
      setSuppliers(supData.data || (Array.isArray(supData) ? supData : []));
    } catch (err) {
      console.error('Error loading inventory hub data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHubData();
  }, []);

  // Compute live metrics
  const hubMetrics = useMemo(() => {
    const totalItems = items.length;
    let totalUnits = 0;
    let totalCostVal = 0;
    let totalSaleVal = 0;
    let lowStockCount = 0;
    let criticalStockCount = 0;

    items.forEach((item) => {
      const q = parseInt(item.qty) || 0;
      const bp = parseFloat(item.buyingPrice) || 0;
      const sp = parseFloat(item.sellingPrice) || 0;
      const reorder = item.reorderPoint || 30;

      totalUnits += q;
      totalCostVal += q * bp;
      totalSaleVal += q * sp;

      if (q < 10) criticalStockCount++;
      else if (q < reorder) lowStockCount++;
    });

    return {
      totalItems,
      totalUnits,
      totalCostVal,
      totalSaleVal,
      lowStockCount,
      criticalStockCount,
      totalWarehouses: warehouses.length,
      totalSuppliers: suppliers.length,
    };
  }, [items, warehouses, suppliers]);

  // Filter items
  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const matchesSearch =
        !searchQuery ||
        item.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.sku?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.supplier?.title?.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesWarehouse =
        selectedWarehouse === 'ALL' || item.warehouseId === selectedWarehouse;

      const qty = parseInt(item.qty) || 0;
      const reorder = item.reorderPoint || 30;

      const matchesStock =
        selectedStockFilter === 'ALL' ||
        (selectedStockFilter === 'CRITICAL' && qty < 10) ||
        (selectedStockFilter === 'LOW' && qty >= 10 && qty < reorder) ||
        (selectedStockFilter === 'HEALTHY' && qty >= reorder);

      return matchesSearch && matchesWarehouse && matchesStock;
    });
  }, [items, searchQuery, selectedWarehouse, selectedStockFilter]);

  const formatINR = (val) => {
    const num = parseFloat(val) || 0;
    return `₹${num.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  return (
    <div className="space-y-6 pb-12">
      <FixedHeader newLink="/items/new" title="Consolidated Inventory Hub" />

      {/* Quick Launch Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="hover:shadow-md transition-shadow border-slate-200">
          <CardContent className="p-5 flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-xs font-semibold text-slate-500 uppercase">Items Catalog</p>
              <h3 className="text-2xl font-bold text-slate-900">{hubMetrics.totalItems}</h3>
              <p className="text-xs text-slate-500">{hubMetrics.totalUnits.toLocaleString()} units stored</p>
            </div>
            <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
              <Package className="h-6 w-6" />
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow border-slate-200">
          <CardContent className="p-5 flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-xs font-semibold text-slate-500 uppercase">Inventory Value</p>
              <h3 className="text-2xl font-bold text-emerald-600">{formatINR(hubMetrics.totalSaleVal)}</h3>
              <p className="text-xs text-slate-500">Cost: {formatINR(hubMetrics.totalCostVal)}</p>
            </div>
            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
              <TrendingUp className="h-6 w-6" />
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow border-slate-200">
          <CardContent className="p-5 flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-xs font-semibold text-slate-500 uppercase">Warehouses</p>
              <h3 className="text-2xl font-bold text-slate-900">{hubMetrics.totalWarehouses}</h3>
              <p className="text-xs text-slate-500">Active distribution hubs</p>
            </div>
            <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
              <WarehouseIcon className="h-6 w-6" />
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow border-slate-200">
          <CardContent className="p-5 flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-xs font-semibold text-slate-500 uppercase">Suppliers</p>
              <h3 className="text-2xl font-bold text-slate-900">{hubMetrics.totalSuppliers}</h3>
              <p className="text-xs text-slate-500">Vendor partners</p>
            </div>
            <div className="p-3 bg-amber-50 text-amber-600 rounded-xl">
              <Users className="h-6 w-6" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Action Navigation Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        <Link
          href="/items/new"
          className="p-4 rounded-xl border border-slate-200 bg-white hover:border-blue-400 hover:shadow-sm transition-all flex flex-col items-center text-center group"
        >
          <div className="p-2.5 rounded-lg bg-blue-50 text-blue-600 group-hover:scale-110 transition-transform mb-2">
            <Package className="h-5 w-5" />
          </div>
          <span className="text-sm font-semibold text-slate-800">Add Item</span>
          <span className="text-xs text-slate-400">New SKU in stock</span>
        </Link>

        <Link
          href="/warehouse/new"
          className="p-4 rounded-xl border border-slate-200 bg-white hover:border-blue-400 hover:shadow-sm transition-all flex flex-col items-center text-center group"
        >
          <div className="p-2.5 rounded-lg bg-indigo-50 text-indigo-600 group-hover:scale-110 transition-transform mb-2">
            <WarehouseIcon className="h-5 w-5" />
          </div>
          <span className="text-sm font-semibold text-slate-800">Add Warehouse</span>
          <span className="text-xs text-slate-400">New storage location</span>
        </Link>

        <Link
          href="/supplier/new"
          className="p-4 rounded-xl border border-slate-200 bg-white hover:border-blue-400 hover:shadow-sm transition-all flex flex-col items-center text-center group"
        >
          <div className="p-2.5 rounded-lg bg-emerald-50 text-emerald-600 group-hover:scale-110 transition-transform mb-2">
            <Users className="h-5 w-5" />
          </div>
          <span className="text-sm font-semibold text-slate-800">Add Supplier</span>
          <span className="text-xs text-slate-400">Register vendor</span>
        </Link>

        <Link
          href="/inventoryadjustment/new"
          className="p-4 rounded-xl border border-slate-200 bg-white hover:border-blue-400 hover:shadow-sm transition-all flex flex-col items-center text-center group"
        >
          <div className="p-2.5 rounded-lg bg-amber-50 text-amber-600 group-hover:scale-110 transition-transform mb-2">
            <Truck className="h-5 w-5" />
          </div>
          <span className="text-sm font-semibold text-slate-800">Stock Adjustment</span>
          <span className="text-xs text-slate-400">Add or transfer stock</span>
        </Link>

        <Link
          href="/invoice/new"
          className="p-4 rounded-xl border border-slate-200 bg-white hover:border-blue-400 hover:shadow-sm transition-all flex flex-col items-center text-center group col-span-2 sm:col-span-1"
        >
          <div className="p-2.5 rounded-lg bg-purple-50 text-purple-600 group-hover:scale-110 transition-transform mb-2">
            <FileText className="h-5 w-5" />
          </div>
          <span className="text-sm font-semibold text-slate-800">Create Invoice</span>
          <span className="text-xs text-slate-400">Generate customer bill</span>
        </Link>
      </div>

      {/* Search and Filters Bar */}
      <Card className="border-slate-200 shadow-sm">
        <CardContent className="p-4 flex flex-col sm:flex-row gap-3 items-center justify-between">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              placeholder="Search items, SKU, category, supplier..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 bg-slate-50 border-slate-200"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
            {/* Warehouse Filter */}
            <select
              value={selectedWarehouse}
              onChange={(e) => setSelectedWarehouse(e.target.value)}
              className="px-3 py-2 text-xs border border-slate-200 rounded-lg bg-slate-50 text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="ALL">All Warehouses ({warehouses.length})</option>
              {warehouses.map((w) => (
                <option key={w.id} value={w.id}>
                  {w.title}
                </option>
              ))}
            </select>

            {/* Stock Level Filter */}
            <select
              value={selectedStockFilter}
              onChange={(e) => setSelectedStockFilter(e.target.value)}
              className="px-3 py-2 text-xs border border-slate-200 rounded-lg bg-slate-50 text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="ALL">All Stock Levels</option>
              <option value="CRITICAL">Critical (&lt;10)</option>
              <option value="LOW">Low Stock (&lt;30)</option>
              <option value="HEALTHY">Healthy Stock (&gt;=30)</option>
            </select>

            <Button variant="outline" size="sm" onClick={fetchHubData} className="gap-1.5 text-xs">
              <RefreshCw className="h-3.5 w-3.5" />
              Refresh
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Interactive Hub Tabs */}
      <Tabs defaultValue="items" className="space-y-4">
        <TabsList className="bg-slate-100 p-1 border border-slate-200 rounded-xl">
          <TabsTrigger value="items" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">
            Catalog Inventory ({filteredItems.length})
          </TabsTrigger>
          <TabsTrigger value="warehouses" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">
            Warehouses ({warehouses.length})
          </TabsTrigger>
          <TabsTrigger value="suppliers" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">
            Suppliers ({suppliers.length})
          </TabsTrigger>
        </TabsList>

        {/* TAB 1: ALL ITEMS TABLE */}
        <TabsContent value="items">
          <Card className="border-slate-200 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-3">
              <div>
                <CardTitle className="text-base font-bold">Consolidated Items Roster</CardTitle>
                <CardDescription>Live stock levels, suppliers, and pricing across all warehouses</CardDescription>
              </div>
              <Button asChild size="sm">
                <Link href="/items/new">
                  <Plus className="h-4 w-4 mr-1" /> Add Product
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="bg-slate-50 text-slate-600 text-xs uppercase border-b border-slate-200">
                    <tr>
                      <th className="px-4 py-3">Item Details</th>
                      <th className="px-4 py-3">Category</th>
                      <th className="px-4 py-3">Warehouse</th>
                      <th className="px-4 py-3">Supplier</th>
                      <th className="px-4 py-3 text-center">Stock Qty</th>
                      <th className="px-4 py-3 text-right">Selling Price</th>
                      <th className="px-4 py-3 text-center">Status</th>
                      <th className="px-4 py-3 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredItems.length > 0 ? (
                      filteredItems.map((item) => {
                        const qty = parseInt(item.qty) || 0;
                        const reorder = item.reorderPoint || 30;
                        return (
                          <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                            <td className="px-4 py-3">
                              <p className="font-semibold text-slate-900">{item.title}</p>
                              <p className="text-xs text-slate-400">SKU: {item.sku || 'N/A'}</p>
                            </td>
                            <td className="px-4 py-3 text-slate-600">
                              <Badge variant="outline" className="text-xs font-normal">
                                {item.category || 'General'}
                              </Badge>
                            </td>
                            <td className="px-4 py-3 text-slate-600">
                              {item.warehouse?.title || 'Unassigned'}
                            </td>
                            <td className="px-4 py-3 text-slate-600">
                              {item.supplier?.title || 'Unassigned'}
                            </td>
                            <td className="px-4 py-3 text-center font-bold">
                              <span
                                className={
                                  qty < 10
                                    ? 'text-rose-600'
                                    : qty < reorder
                                    ? 'text-amber-600'
                                    : 'text-slate-800'
                                }
                              >
                                {qty}
                              </span>
                            </td>
                            <td className="px-4 py-3 text-right font-semibold text-slate-900">
                              {item.sellingPrice ? formatINR(item.sellingPrice) : 'N/A'}
                            </td>
                            <td className="px-4 py-3 text-center">
                              {qty < 10 ? (
                                <Badge className="bg-rose-500/15 text-rose-700 border-rose-300">
                                  Critical
                                </Badge>
                              ) : qty < reorder ? (
                                <Badge className="bg-amber-500/15 text-amber-700 border-amber-300">
                                  Low Stock
                                </Badge>
                              ) : (
                                <Badge className="bg-emerald-500/15 text-emerald-700 border-emerald-300">
                                  Healthy
                                </Badge>
                              )}
                            </td>
                            <td className="px-4 py-3 text-right">
                              <div className="flex items-center justify-end gap-1.5">
                                <Button asChild size="sm" variant="ghost" className="h-7 text-xs text-blue-600">
                                  <Link href={`/items/update/${item.id}`}>Edit</Link>
                                </Button>
                              </div>
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td colSpan={8} className="px-4 py-8 text-center text-slate-400">
                          No items match your criteria.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* TAB 2: WAREHOUSES OVERVIEW */}
        <TabsContent value="warehouses">
          <div className="grid gap-4 md:grid-cols-3">
            {warehouses.map((wh) => (
              <Card key={wh.id} className="border-slate-200 shadow-sm hover:border-blue-300 transition-all">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <div className="flex items-center gap-2">
                    <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                      <WarehouseIcon className="h-5 w-5" />
                    </div>
                    <div>
                      <CardTitle className="text-base font-bold">{wh.title}</CardTitle>
                      <p className="text-xs text-slate-500">{wh.location || 'No location set'}</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="capitalize">
                    {wh.warehouseType || 'Storage'}
                  </Badge>
                </CardHeader>
                <CardContent className="space-y-3 pt-2">
                  <p className="text-xs text-slate-600 line-clamp-2">
                    {wh.description || 'General warehouse storage hub for products and transfers.'}
                  </p>
                  <div className="flex justify-between items-center text-sm pt-2 border-t">
                    <span className="text-slate-500">Catalog SKUs:</span>
                    <span className="font-semibold text-slate-800">{wh._count?.Item || 0}</span>
                  </div>
                  <div className="pt-2 flex justify-between gap-2">
                    <Button asChild size="sm" variant="outline" className="w-full text-xs">
                      <Link href="/warehouse">Manage Hub</Link>
                    </Button>
                    <Button asChild size="sm" className="w-full text-xs">
                      <Link href="/inventoryadjustment/new">Transfer Stock</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* TAB 3: SUPPLIERS DIRECTORY */}
        <TabsContent value="suppliers">
          <div className="grid gap-4 md:grid-cols-3">
            {suppliers.map((s) => (
              <Card key={s.id} className="border-slate-200 shadow-sm hover:border-blue-300 transition-all">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <div className="flex items-center gap-2">
                    <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
                      <Building2 className="h-5 w-5" />
                    </div>
                    <div>
                      <CardTitle className="text-base font-bold">{s.title}</CardTitle>
                      <p className="text-xs text-slate-500">{s.contactPerson || 'Vendor Contact'}</p>
                    </div>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {s._count?.Item || 0} SKUs
                  </Badge>
                </CardHeader>
                <CardContent className="space-y-2.5 pt-2 text-xs text-slate-600">
                  {s.email && <p>Email: <strong className="text-slate-800">{s.email}</strong></p>}
                  {s.phone && <p>Phone: <strong className="text-slate-800">{s.phone}</strong></p>}
                  {s.paymentTerms && <p>Terms: <Badge variant="outline" className="ml-1 text-[10px]">{s.paymentTerms}</Badge></p>}
                  <div className="pt-3 border-t flex justify-end">
                    <Button asChild size="sm" variant="ghost" className="text-xs text-blue-600">
                      <Link href="/supplier">View Profile →</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
