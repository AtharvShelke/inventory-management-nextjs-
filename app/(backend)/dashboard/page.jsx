'use client'
import { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  Package, 
  Users, 
  TrendingUp, 
  DollarSign, 
  ShoppingCart, 
  AlertTriangle,
  ArrowUpIcon,
  ArrowDownIcon,
  Warehouse as WarehouseIcon,
  Activity,
  Box
} from 'lucide-react'
import { LineChart, BarChart } from '@/components/Charts'
import { formatCurrency } from '@/lib/utils'

export default function Dashboard() {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isSubscribed = true;

    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/dashboard');
        
        if (!response.ok) {
          throw new Error('Failed to fetch dashboard data');
        }
        
        const data = await response.json();
        
        if (isSubscribed) {
          setDashboardData(data);
          setError(null);
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        if (isSubscribed) {
          setError(error.message);
        }
      } finally {
        if (isSubscribed) {
          setLoading(false);
        }
      }
    };

    fetchDashboardData();

    // Cleanup function to prevent state updates on unmounted component
    return () => {
      isSubscribed = false;
    };
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Card className="p-6 max-w-md">
          <div className="text-center text-red-600">
            <AlertTriangle className="h-12 w-12 mx-auto mb-4" />
            <h2 className="text-xl font-bold mb-2">Error Loading Dashboard</h2>
            <p className="text-sm">{error}</p>
            <Button className="mt-4" onClick={() => window.location.reload()}>
              Retry
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  if (!dashboardData) {
    return null;
  }

  const statsData = [
    {
      title: "Total Revenue",
      value: `₹${parseFloat(dashboardData.summary.totalRevenue).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      change: `${dashboardData.summary.profitMargin}% profit margin`,
      icon: <DollarSign className="h-4 w-4 text-muted-foreground" />,
      trend: "up"
    },
    {
      title: "Total Users",
      value: dashboardData.users.count,
      change: `${dashboardData.users.roles.ADMIN} Admins, ${dashboardData.users.roles.USER} Users`,
      icon: <Users className="h-4 w-4 text-muted-foreground" />,
      trend: "up"
    },
    {
      title: "Total Items",
      value: dashboardData.items.count,
      change: `${dashboardData.items.totalQty} total quantity`,
      icon: <Package className="h-4 w-4 text-muted-foreground" />,
      trend: "up"
    },
    {
      title: "Active Invoices",
      value: dashboardData.invoices.count,
      change: `${dashboardData.invoices.pendingCount} pending, ${dashboardData.invoices.unpaidCount} unpaid`,
      icon: <Activity className="h-4 w-4 text-muted-foreground" />,
      trend: "up"
    }
  ];

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'completed': return 'bg-green-100 text-green-800'
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'processing': return 'bg-blue-100 text-blue-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  };

  const getPaymentStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'paid': return 'bg-green-100 text-green-800'
      case 'unpaid': return 'bg-red-100 text-red-800'
      case 'partial': return 'bg-yellow-100 text-yellow-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back! Here's what's happening with your inventory today.
          </p>
        </div>
        <Button>
          <Package className="mr-2 h-4 w-4" />
          Add Product
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statsData.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              {stat.icon}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground flex items-center mt-1">
                {stat.trend === 'up' ? (
                  <ArrowUpIcon className="h-3 w-3 text-green-500 mr-1" />
                ) : (
                  <ArrowDownIcon className="h-3 w-3 text-red-500 mr-1" />
                )}
                {stat.change}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Warehouses</CardTitle>
            <WarehouseIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardData.warehouses.count}</div>
            <p className="text-xs text-muted-foreground">Active locations</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Suppliers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardData.suppliers.count}</div>
            <p className="text-xs text-muted-foreground">Total suppliers</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Stock Adjustments</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {dashboardData.stockAdjustments.addStockCount + dashboardData.stockAdjustments.transferStockCount}
            </div>
            <p className="text-xs text-muted-foreground">
              {dashboardData.stockAdjustments.addStockCount} added, {dashboardData.stockAdjustments.transferStockCount} transferred
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Low Stock Alerts</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {dashboardData.summary.lowStockAlerts}
            </div>
            <p className="text-xs text-muted-foreground">Items need reordering</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        {/* Recent Invoices */}
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Recent Invoices</CardTitle>
            <CardDescription>
              Latest {dashboardData.invoices.recent.length} invoices from your system
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {dashboardData.invoices.recent.map((invoice) => (
                <div key={invoice.id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-9 w-9">
                      <AvatarFallback>
                        {invoice.customerName.split(' ').map(n => n[0]).join('').toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium leading-none">{invoice.customerName}</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(invoice.date).toLocaleDateString('en-IN')}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className={getStatusColor(invoice.status)} variant="secondary">
                      {invoice.status}
                    </Badge>
                    <Badge className={getPaymentStatusColor(invoice.paymentStatus)} variant="secondary">
                      {invoice.paymentStatus}
                    </Badge>
                    <div className="text-sm font-medium">
                      ₹{parseFloat(invoice.totalSale).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Low Stock Items */}
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Low Stock Alerts</CardTitle>
            <CardDescription>
              Items below reorder point
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {dashboardData.items.lowStockItems.length > 0 ? (
              dashboardData.items.lowStockItems.slice(0, 6).map((item, index) => {
                const currentQty = parseInt(item.qty) || 0;
                const reorderPoint = item.reorderPoint || 30;
                const percentage = (currentQty / reorderPoint) * 100;
                
                return (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <div>
                        <span className="font-medium">{item.title}</span>
                        <p className="text-xs text-muted-foreground">{item.warehouse.title}</p>
                      </div>
                      <span className="text-muted-foreground">
                        {currentQty}/{reorderPoint}
                      </span>
                    </div>
                    <Progress 
                      value={Math.min(percentage, 100)} 
                      className="h-2"
                    />
                    {percentage < 30 && (
                      <div className="flex items-center text-xs text-red-600">
                        <AlertTriangle className="h-3 w-3 mr-1" />
                        Critical - Reorder needed
                      </div>
                    )}
                  </div>
                );
              })
            ) : (
              <div className="text-center text-muted-foreground py-4">
                <Package className="h-12 w-12 mx-auto mb-2 opacity-50" />
                <p>All items are well stocked</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Warehouses & Recent Stock Adjustments */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Warehouses */}
        <Card>
          <CardHeader>
            <CardTitle>Warehouses</CardTitle>
            <CardDescription>Your storage locations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {dashboardData.warehouses.list.slice(0, 5).map((warehouse) => (
                <div key={warehouse.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-blue-100 rounded-full">
                      <WarehouseIcon className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">{warehouse.title}</p>
                      <p className="text-xs text-muted-foreground">{warehouse.location || 'No location'}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge variant="outline">{warehouse.warehouseType}</Badge>
                    <p className="text-xs text-muted-foreground mt-1">
                      {warehouse.totalItems} items
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Stock Adjustments */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Stock Adjustments</CardTitle>
            <CardDescription>Latest inventory updates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {dashboardData.stockAdjustments.recentAddStock.map((adjustment) => (
                <div key={adjustment.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-green-100 rounded-full">
                      <Box className="h-4 w-4 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">{adjustment.item.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {adjustment.warehouse.title}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-green-600">+{adjustment.addStockQty}</p>
                    <p className="text-xs text-muted-foreground">{adjustment.username || 'System'}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Financial Overview */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Total Sales</CardTitle>
            <CardDescription>Overall revenue</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              ₹{parseFloat(dashboardData.invoices.totalSales).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
            </div>
            <Progress value={75} className="h-2 mt-4" />
            <p className="text-xs text-muted-foreground mt-2">
              From {dashboardData.invoices.count} invoices
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Total Profit</CardTitle>
            <CardDescription>Net earnings</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">
              ₹{parseFloat(dashboardData.invoices.totalProfit).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
            </div>
            <Progress value={60} className="h-2 mt-4" />
            <p className="text-xs text-muted-foreground mt-2">
              {dashboardData.summary.profitMargin}% profit margin
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Inventory Value</CardTitle>
            <CardDescription>Total stock worth</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              ₹{dashboardData.items.inventoryValue.saleValue.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
            </div>
            <Progress value={82} className="h-2 mt-4" />
            <p className="text-xs text-muted-foreground mt-2">
              Cost: ₹{dashboardData.items.inventoryValue.costValue.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Categories & Brands */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Categories</CardTitle>
            <CardDescription>Product categories in inventory</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {dashboardData.items.categories.length > 0 ? (
                dashboardData.items.categories.map((category, index) => (
                  <Badge key={index} variant="secondary">
                    {category}
                  </Badge>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">No categories available</p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Brands</CardTitle>
            <CardDescription>Product brands in inventory</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {dashboardData.items.brands.length > 0 ? (
                dashboardData.items.brands.map((brand, index) => (
                  <Badge key={index} variant="outline">
                    {brand}
                  </Badge>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">No brands available</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Frequently used operations</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <Button className="w-full justify-start" variant="outline">
            <Package className="mr-2 h-4 w-4" />
            Add Item
          </Button>
          <Button className="w-full justify-start" variant="outline">
            <WarehouseIcon className="mr-2 h-4 w-4" />
            Manage Warehouses
          </Button>
          <Button className="w-full justify-start" variant="outline">
            <Users className="mr-2 h-4 w-4" />
            View Suppliers
          </Button>
          <Button className="w-full justify-start" variant="outline">
            <ShoppingCart className="mr-2 h-4 w-4" />
            Create Invoice
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
