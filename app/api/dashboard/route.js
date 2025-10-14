import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(request) {
  try {
    // Warehouse statistics
    const warehousesCount = await prisma.warehouse.count();
    const warehousesList = await prisma.warehouse.findMany({
      select: {
        id: true,
        title: true,
        location: true,
        warehouseType: true,
        description: true,
        createdAt: true,
        updatedAt: true,
        _count: {
          select: { 
            Item: true 
          },
        },
      },
      take: 10,
      orderBy: {
        createdAt: 'desc'
      }
    });

    // Items statistics
    const itemsCount = await prisma.item.count();
    
    // Get distinct categories and brands
    const categories = await prisma.item.findMany({
      distinct: ['category'],
      select: { category: true },
      where: { 
        category: { 
          not: null 
        } 
      },
    });
    
    const brands = await prisma.item.findMany({
      distinct: ['brand'],
      select: { brand: true },
      where: { 
        brand: { 
          not: null 
        } 
      },
    });

    // Low stock items (below reorder point)
    const lowStockItems = await prisma.item.findMany({
      where: {
        qty: {
          lt: '30' // Comparing as string since qty is String type
        }
      },
      select: {
        id: true,
        title: true,
        qty: true,
        reorderPoint: true,
        warehouse: {
          select: {
            title: true
          }
        }
      },
      take: 10
    });

    // Calculate total quantity (since qty is string, we need to parse)
    const allItems = await prisma.item.findMany({
      select: { qty: true }
    });
    const totalQty = allItems.reduce((sum, item) => {
      return sum + (parseInt(item.qty) || 0);
    }, 0);

    // Suppliers count
    const suppliersCount = await prisma.supplier.count();

    // Recent suppliers
    const recentSuppliers = await prisma.supplier.findMany({
      take: 5,
      orderBy: {
        createdAt: 'desc'
      },
      select: {
        id: true,
        title: true,
        email: true,
        phone: true,
        _count: {
          select: { Item: true }
        }
      }
    });

    // Stock adjustments statistics
    const addStockCount = await prisma.addStockAdjustment.count();
    const transferStockCount = await prisma.transferStockAdjustment.count();

    // Recent stock adjustments
    const recentAddStockAdjustments = await prisma.addStockAdjustment.findMany({
      take: 5,
      orderBy: {
        id: 'desc'
      },
      select: {
        id: true,
        referenceNumber: true,
        addStockQty: true,
        username: true,
        item: {
          select: {
            title: true
          }
        },
        warehouse: {
          select: {
            title: true
          }
        }
      }
    });

    // Invoices statistics
    const invoicesCount = await prisma.invoice.count();
    
    // Get all invoices to calculate totals
    const allInvoices = await prisma.invoice.findMany({
      select: {
        totalSale: true,
        totalProfit: true,
        totalCost: true,
        status: true,
        paymentStatus: true
      }
    });

    // Calculate financial totals
    const totalSales = allInvoices.reduce((sum, inv) => {
      return sum + (parseFloat(inv.totalSale) || 0);
    }, 0);

    const totalProfit = allInvoices.reduce((sum, inv) => {
      return sum + (parseFloat(inv.totalProfit) || 0);
    }, 0);

    const totalCost = allInvoices.reduce((sum, inv) => {
      return sum + (parseFloat(inv.totalCost) || 0);
    }, 0);

    // Invoice status breakdown
    const pendingInvoices = allInvoices.filter(inv => inv.status === 'PENDING').length;
    const unpaidInvoices = allInvoices.filter(inv => inv.paymentStatus === 'UNPAID').length;

    // Recent invoices
    const recentInvoices = await prisma.invoice.findMany({
      take: 5,
      orderBy: {
        createdAt: 'desc'
      },
      select: {
        id: true,
        customerName: true,
        date: true,
        totalSale: true,
        totalProfit: true,
        status: true,
        paymentStatus: true
      }
    });

    // Users statistics
    const usersCount = await prisma.user.count();
    const adminsCount = await prisma.user.count({ 
      where: { 
        role: 'ADMIN' 
      } 
    });
    const regularUsersCount = usersCount - adminsCount;

    // Recent users
    const recentUsers = await prisma.user.findMany({
      take: 5,
      orderBy: {
        createdAt: 'desc'
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true
      }
    });

    // Inventory value calculation
    const itemsForValue = await prisma.item.findMany({
      select: {
        qty: true,
        buyingPrice: true,
        sellingPrice: true
      }
    });

    const inventoryValue = {
      costValue: itemsForValue.reduce((sum, item) => {
        const qty = parseInt(item.qty) || 0;
        const price = parseFloat(item.buyingPrice) || 0;
        return sum + (qty * price);
      }, 0),
      saleValue: itemsForValue.reduce((sum, item) => {
        const qty = parseInt(item.qty) || 0;
        const price = parseFloat(item.sellingPrice) || 0;
        return sum + (qty * price);
      }, 0)
    };

    // Construct response
    const dashboardData = {
      warehouses: {
        count: warehousesCount,
        list: warehousesList.map((wh) => ({
          ...wh,
          totalItems: wh._count.Item,
        })),
      },
      items: {
        count: itemsCount,
        totalQty: totalQty,
        categories: categories.map((c) => c.category).filter(Boolean),
        brands: brands.map((b) => b.brand).filter(Boolean),
        lowStockItems: lowStockItems,
        inventoryValue: inventoryValue
      },
      suppliers: {
        count: suppliersCount,
        recent: recentSuppliers.map(supplier => ({
          ...supplier,
          totalItems: supplier._count.Item
        }))
      },
      stockAdjustments: {
        addStockCount,
        transferStockCount,
        recentAddStock: recentAddStockAdjustments
      },
      invoices: {
        count: invoicesCount,
        totalSales: totalSales.toFixed(2),
        totalProfit: totalProfit.toFixed(2),
        totalCost: totalCost.toFixed(2),
        pendingCount: pendingInvoices,
        unpaidCount: unpaidInvoices,
        recent: recentInvoices
      },
      users: {
        count: usersCount,
        roles: {
          ADMIN: adminsCount,
          USER: regularUsersCount,
        },
        recent: recentUsers
      },
      summary: {
        totalRevenue: totalSales.toFixed(2),
        totalProfit: totalProfit.toFixed(2),
        profitMargin: totalSales > 0 ? ((totalProfit / totalSales) * 100).toFixed(2) : 0,
        activeWarehouses: warehousesCount,
        totalInventoryItems: itemsCount,
        lowStockAlerts: lowStockItems.length
      }
    };

    return NextResponse.json(dashboardData, { status: 200 });

  } catch (error) {
    console.error('Dashboard API Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch dashboard data', details: error.message },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
