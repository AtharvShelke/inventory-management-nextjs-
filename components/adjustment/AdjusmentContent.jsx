'use client';

import { useMemo } from 'react';
import DataTable from '@/components/dashboard/DataTable';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, Package } from 'lucide-react';

export default function AdjustmentContent({ addStock, transferStock, items, role }) {
  // Create item lookup map
  const itemMap = useMemo(() => {
    return items.reduce((acc, item) => {
      acc[item.id] = item;
      return acc;
    }, {});
  }, [items]);

  // Process add stock adjustments
  const processedAddStock = useMemo(() => {
    return addStock.map((adjustment) => {
      const item = itemMap[adjustment.itemId];
      if (!item) return adjustment;

      const qty = parseInt(adjustment.addStockQty) || 0;
      const buyingPrice = parseFloat(item.buyingPrice) || 0;
      const cost = qty * buyingPrice;

      return {
        ...adjustment,
        item: item.title,
        warehouse: adjustment.warehouse?.title || 'N/A',
        buyingPrice: buyingPrice.toFixed(2),
        cost: cost.toFixed(2),
        qty: qty,
      };
    });
  }, [addStock, itemMap]);

  // Process transfer stock adjustments
  const processedTransferStock = useMemo(() => {
    return transferStock.map((adjustment) => {
      const item = itemMap[adjustment.itemId];
      if (!item) return adjustment;

      const qty = parseInt(adjustment.transferStockQty) || 0;
      const sellingPrice = parseFloat(item.sellingPrice) || 0;
      const sale = qty * sellingPrice;

      return {
        ...adjustment,
        item: item.title,
        sellingPrice: sellingPrice.toFixed(2),
        sale: sale.toFixed(2),
        qty: qty,
      };
    });
  }, [transferStock, itemMap]);

  // Calculate statistics
  const stats = useMemo(() => {
    const totalAdded = processedAddStock.reduce((sum, adj) => sum + (adj.qty || 0), 0);
    const totalTransferred = processedTransferStock.reduce((sum, adj) => sum + (adj.qty || 0), 0);
    const totalCost = processedAddStock.reduce((sum, adj) => sum + (parseFloat(adj.cost) || 0), 0);
    const totalSales = processedTransferStock.reduce((sum, adj) => sum + (parseFloat(adj.sale) || 0), 0);

    return {
      totalAdded,
      totalTransferred,
      totalCost,
      totalSales,
      netChange: totalAdded - totalTransferred,
    };
  }, [processedAddStock, processedTransferStock]);

  // Column definitions for admin
  const addStockColumns = [
    { key: 'referenceNumber', label: 'Reference', sortable: true },
    { key: 'item', label: 'Item', sortable: true },
    { key: 'warehouse', label: 'Warehouse', sortable: true },
    { key: 'addStockQty', label: 'Quantity', sortable: true },
    ...(role === 'ADMIN'
      ? [
          { 
            key: 'buyingPrice', 
            label: 'Buying Price', 
            sortable: true,
            format: (value) => `₹${value}` 
          },
          { 
            key: 'cost', 
            label: 'Total Cost', 
            sortable: true,
            format: (value) => `₹${value}` 
          },
          { key: 'username', label: 'Added By', sortable: true },
        ]
      : []),
  ];

  const transferStockColumns = [
    { key: 'referenceNumber', label: 'Reference', sortable: true },
    { key: 'item', label: 'Item', sortable: true },
    { key: 'transferStockQty', label: 'Quantity', sortable: true },
    ...(role === 'ADMIN'
      ? [
          { 
            key: 'sellingPrice', 
            label: 'Selling Price', 
            sortable: true,
            format: (value) => `₹${value}` 
          },
          { 
            key: 'sale', 
            label: 'Total Sale', 
            sortable: true,
            format: (value) => `₹${value}` 
          },
          { key: 'username', label: 'Processed By', sortable: true },
        ]
      : []),
    {
      key: 'createdAt',
      label: 'Date',
      sortable: true,
      format: (value) => new Date(value).toLocaleDateString('en-IN'),
    },
  ];

  return (
    <div className="space-y-6 p-4 md:p-8">
      {/* Statistics Cards */}
      {role === 'ADMIN' && (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Stock Added</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">+{stats.totalAdded}</div>
              <p className="text-xs text-muted-foreground">
                Total cost: ₹{stats.totalCost.toFixed(2)}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Stock Transferred</CardTitle>
              <TrendingDown className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">-{stats.totalTransferred}</div>
              <p className="text-xs text-muted-foreground">
                Total sales: ₹{stats.totalSales.toFixed(2)}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Net Change</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${stats.netChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {stats.netChange >= 0 ? '+' : ''}{stats.netChange}
              </div>
              <p className="text-xs text-muted-foreground">Units difference</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Profit</CardTitle>
              <TrendingUp className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">
                ₹{(stats.totalSales - stats.totalCost).toFixed(2)}
              </div>
              <p className="text-xs text-muted-foreground">From transfers</p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Add Stock Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-green-600" />
            Purchase Stock (Added)
          </CardTitle>
          <CardDescription>
            Stock additions from suppliers - {processedAddStock.length} records
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable
            data={processedAddStock}
            columns={addStockColumns}
            resourceName="inventoryadjustment/add"
            showStockStatus={false}
          />
        </CardContent>
      </Card>

      {/* Transfer Stock Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingDown className="h-5 w-5 text-red-600" />
            Sale Stock (Transferred)
          </CardTitle>
          <CardDescription>
            Stock transfers and sales - {processedTransferStock.length} records
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable
            data={processedTransferStock}
            columns={transferStockColumns}
            resourceName="inventoryadjustment/transfer"
            showStockStatus={false}
          />
        </CardContent>
      </Card>
    </div>
  );
}
