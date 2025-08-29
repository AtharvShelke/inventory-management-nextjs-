'use client'
import { useEffect, useState } from 'react'
import { getRequest } from '@/lib/apiRequest'
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
  MoreHorizontal,
  Activity
} from 'lucide-react'
import {LineChart} from '@/components/Charts'
import {BarChart} from '@/components/Charts'

import { formatCurrency } from '@/lib/utils'

// Example data format for charts
const revenueData = [
  { name: 'Jan', value: 4000 },
  { name: 'Feb', value: 3000 },
  { name: 'Mar', value: 2000 },
  { name: 'Apr', value: 2780 },
  { name: 'May', value: 1890 },
  { name: 'Jun', value: 2390 },
]

const productsData = [
  { name: 'Product A', value: 400 },
  { name: 'Product B', value: 300 },
  { name: 'Product C', value: 200 },
  { name: 'Product D', value: 278 },
  { name: 'Product E', value: 189 },
]

export default function Dashboard() {
  const [dashboardData, setDashboardData] = useState({
    stats: {
      totalRevenue: 0,
      totalItems: 0,
      totalSales: 0,
      activeOrders: 0
    },
    recentOrders: [],
    inventory: []
  });
  const [loading, setLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(true)
  const [stats, setStats] = useState({
    revenueData: revenueData,
    productsData: productsData,
    // ...other stats
  })

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [invoices, items, adjustments] = await Promise.all([
          getRequest('invoice'),
          getRequest('items'),
          getRequest('inventoryadjustment/transfer')
        ]);

        const totalRevenue = invoices.reduce((acc, inv) => acc + (inv.totalSale || 0), 0);
        const totalSales = adjustments.length;
        
        setDashboardData({
          stats: {
            totalRevenue: totalRevenue,
            totalItems: items.length,
            totalSales: totalSales,
            activeOrders: invoices.filter(inv => inv.status === 'PENDING').length
          },
          recentOrders: invoices.slice(0, 5).map(inv => ({
            id: inv.invoiceNumber,
            customer: inv.customerName,
            amount: `Rs.${inv.totalSale?.toFixed(2)}`,
            status: inv.status.toLowerCase(),
            date: new Date(inv.createdAt).toLocaleDateString()
          })),
          inventory: items.map(item => ({
            name: item.title,
            stock: item.qty,
            target: 100, // You may want to add a reorderPoint field to your schema
            status: item.qty < 30 ? 'critical' : item.qty < 60 ? 'low' : 'good'
          }))
        });
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const statsData = [
    {
      title: "Total Revenue",
      value: `Rs.${dashboardData.stats.totalRevenue.toFixed(2)}`,
      change: "+20.1% from last month",
      icon: <DollarSign className="h-4 w-4 text-muted-foreground" />,
      trend: "up"
    },
    {
      title: "Active Users",
      value: "+2350",
      change: "+180.1% from last month",
      icon: <Users className="h-4 w-4 text-muted-foreground" />,
      trend: "up"
    },
    {
      title: "Sales",
      value: dashboardData.stats.totalSales,
      change: "+19% from last month",
      icon: <ShoppingCart className="h-4 w-4 text-muted-foreground" />,
      trend: "up"
    },
    {
      title: "Active Orders",
      value: dashboardData.stats.activeOrders,
      change: "+201 since last hour",
      icon: <Activity className="h-4 w-4 text-muted-foreground" />,
      trend: "up"
    }
  ]

  const recentOrders = dashboardData.recentOrders

  const inventoryItems = dashboardData.inventory

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800'
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'processing': return 'bg-blue-100 text-blue-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStockStatus = (stock, target) => {
    const percentage = (stock / target) * 100
    if (percentage < 30) return { color: 'bg-red-500', status: 'critical' }
    if (percentage < 60) return { color: 'bg-yellow-500', status: 'low' }
    return { color: 'bg-green-500', status: 'good' }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back! Here's what's happening with your business today.
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
              <p className="text-xs text-muted-foreground flex items-center">
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

      {/* Main Content Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        {/* Recent Orders */}
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
            <CardDescription>
              You made 265 sales this month.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-9 w-9">
                      <AvatarImage src={order.avatar} alt={order.customer} />
                      <AvatarFallback>
                        {order.customer.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium leading-none">{order.customer}</p>
                      <p className="text-sm text-muted-foreground">{order.id}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className={getStatusColor(order.status)} variant="secondary">
                      {order.status}
                    </Badge>
                    <div className="text-sm font-medium">{order.amount}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Inventory Status */}
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Inventory Status</CardTitle>
            <CardDescription>
              Current stock levels and alerts
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {inventoryItems.map((item, index) => {
              const stockStatus = getStockStatus(item.stock, item.target)
              const percentage = (item.stock / item.target) * 100
              
              return (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">{item.name}</span>
                    <span className="text-muted-foreground">
                      {item.stock}/{item.target}
                    </span>
                  </div>
                  <Progress 
                    value={percentage} 
                    className="h-2"
                  />
                  {percentage < 30 && (
                    <div className="flex items-center text-xs text-red-600">
                      <AlertTriangle className="h-3 w-3 mr-1" />
                      Critical - Reorder needed
                    </div>
                  )}
                </div>
              )
            })}
          </CardContent>
        </Card>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="font-semibold mb-4">Revenue Overview</h3>
          <LineChart
            data={stats?.revenueData || []}
            height={300}
          />
        </Card>
        <Card className="p-6">
          <h3 className="font-semibold mb-4">Top Products</h3>
          <BarChart 
            data={stats?.productsData || []}
            height={300}
          />
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="p-6">
        <h3 className="font-semibold mb-4">Recent Activity</h3>
        <div className="space-y-4">
          {stats?.recentActivity?.map((activity, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <div className="p-2 bg-white rounded-full mr-4">
                  {activity.icon}
                </div>
                <div>
                  <p className="font-medium text-gray-900">{activity.title}</p>
                  <p className="text-sm text-gray-600">{activity.description}</p>
                </div>
              </div>
              <span className="text-sm text-gray-500">{activity.time}</span>
            </div>
          ))}
        </div>
      </Card>

      {/* Bottom Section */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Sales Overview */}
        <Card>
          <CardHeader>
            <CardTitle>Sales Overview</CardTitle>
            <CardDescription>Monthly sales performance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">This Month</span>
                <span className="text-sm font-medium">Rs.12,345</span>
              </div>
              <Progress value={75} className="h-2" />
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Last Month</span>
                <span className="text-sm font-medium">Rs.10,234</span>
              </div>
              <Progress value={60} className="h-2" />
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Target</span>
                <span className="text-sm font-medium">Rs.15,000</span>
              </div>
              <Progress value={82} className="h-2" />
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Frequently used operations</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full justify-start" variant="outline">
              <Package className="mr-2 h-4 w-4" />
              Add New Product
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <Users className="mr-2 h-4 w-4" />
              Manage Customers
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <TrendingUp className="mr-2 h-4 w-4" />
              View Analytics
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <ShoppingCart className="mr-2 h-4 w-4" />
              Process Orders
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
