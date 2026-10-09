import db from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    // 1. Fetch Warehouses
    const warehousesCount = await db.warehouse.count();
    const warehousesList = await db.warehouse.findMany({
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
      orderBy: {
        createdAt: 'desc'
      }
    });

    // 2. Fetch Items
    const allItems = await db.item.findMany({
      include: {
        warehouse: {
          select: {
            id: true,
            title: true,
          }
        },
        supplier: {
          select: {
            id: true,
            title: true,
            email: true,
            phone: true,
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    const itemsCount = allItems.length;

    // Categories and brands
    const categoriesSet = new Set();
    const brandsSet = new Set();

    let totalQty = 0;
    let costValue = 0;
    let saleValue = 0;
    let criticalStockCount = 0;
    let lowStockCount = 0;
    let healthyStockCount = 0;
    let outOfStockCount = 0;

    const lowStockItems = [];

    // Calculate warehouse stock distribution
    const warehouseStockMap = {};
    warehousesList.forEach(w => {
      warehouseStockMap[w.id] = {
        id: w.id,
        title: w.title,
        location: w.location,
        type: w.warehouseType,
        itemCount: w._count.Item,
        totalQty: 0,
        totalValue: 0,
      };
    });

    allItems.forEach((item) => {
      if (item.category) categoriesSet.add(item.category);
      if (item.brand) brandsSet.add(item.brand);

      const qty = parseInt(item.qty) || 0;
      const buyingPrice = parseFloat(item.buyingPrice) || 0;
      const sellingPrice = parseFloat(item.sellingPrice) || 0;
      const reorderPoint = item.reorderPoint ?? 30;
      const minStockLevel = item.minStockLevel ?? 10;

      totalQty += qty;
      costValue += qty * buyingPrice;
      saleValue += qty * sellingPrice;

      if (item.warehouseId && warehouseStockMap[item.warehouseId]) {
        warehouseStockMap[item.warehouseId].totalQty += qty;
        warehouseStockMap[item.warehouseId].totalValue += qty * sellingPrice;
      }

      if (qty === 0) {
        outOfStockCount++;
        criticalStockCount++;
        lowStockItems.push({
          id: item.id,
          title: item.title,
          qty,
          reorderPoint,
          minStockLevel,
          warehouse: item.warehouse ? { title: item.warehouse.title } : { title: 'Unassigned' },
          supplier: item.supplier ? { title: item.supplier.title } : { title: 'Unassigned' },
          status: 'OUT_OF_STOCK'
        });
      } else if (qty <= minStockLevel) {
        criticalStockCount++;
        lowStockItems.push({
          id: item.id,
          title: item.title,
          qty,
          reorderPoint,
          minStockLevel,
          warehouse: item.warehouse ? { title: item.warehouse.title } : { title: 'Unassigned' },
          supplier: item.supplier ? { title: item.supplier.title } : { title: 'Unassigned' },
          status: 'CRITICAL'
        });
      } else if (qty <= reorderPoint) {
        lowStockCount++;
        lowStockItems.push({
          id: item.id,
          title: item.title,
          qty,
          reorderPoint,
          minStockLevel,
          warehouse: item.warehouse ? { title: item.warehouse.title } : { title: 'Unassigned' },
          supplier: item.supplier ? { title: item.supplier.title } : { title: 'Unassigned' },
          status: 'LOW'
        });
      } else {
        healthyStockCount++;
      }
    });

    // 3. Fetch Suppliers
    const suppliersCount = await db.supplier.count();
    const recentSuppliers = await db.supplier.findMany({
      take: 5,
      orderBy: {
        createdAt: 'desc'
      },
      select: {
        id: true,
        title: true,
        email: true,
        phone: true,
        contactPerson: true,
        paymentTerms: true,
        _count: {
          select: { Item: true }
        }
      }
    });

    // 4. Fetch Adjustments
    const addStockCount = await db.addStockAdjustment.count();
    const transferStockCount = await db.transferStockAdjustment.count();

    const recentAddStockAdjustments = await db.addStockAdjustment.findMany({
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

    const recentTransferStockAdjustments = await db.transferStockAdjustment.findMany({
      take: 5,
      orderBy: {
        createdAt: 'desc'
      },
      select: {
        id: true,
        referenceNumber: true,
        transferStockQty: true,
        description: true,
        username: true,
        createdAt: true,
        item: {
          select: {
            title: true
          }
        }
      }
    });

    // 5. Invoices and Financial Analytics
    const invoicesCount = await db.invoice.count();
    const allInvoices = await db.invoice.findMany({
      select: {
        id: true,
        customerName: true,
        date: true,
        totalSale: true,
        totalProfit: true,
        totalCost: true,
        status: true,
        paymentStatus: true,
        taxRate: true,
        discount: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    let totalSales = 0;
    let totalProfit = 0;
    let totalCost = 0;
    let paidAmount = 0;
    let unpaidAmount = 0;

    let pendingInvoices = 0;
    let completedInvoices = 0;
    let cancelledInvoices = 0;

    let paidInvoices = 0;
    let unpaidInvoices = 0;
    let partialInvoices = 0;

    // Monthly revenue map
    const monthlyRevenueMap = {};

    allInvoices.forEach(inv => {
      const sale = parseFloat(inv.totalSale) || 0;
      const profit = parseFloat(inv.totalProfit) || 0;
      const cost = parseFloat(inv.totalCost) || 0;

      totalSales += sale;
      totalProfit += profit;
      totalCost += cost;

      if (inv.paymentStatus === 'PAID') {
        paidInvoices++;
        paidAmount += sale;
      } else if (inv.paymentStatus === 'PARTIAL') {
        partialInvoices++;
        paidAmount += sale * 0.5; // Estimated received
        unpaidAmount += sale * 0.5;
      } else {
        unpaidInvoices++;
        unpaidAmount += sale;
      }

      if (inv.status === 'COMPLETED') completedInvoices++;
      else if (inv.status === 'CANCELLED') cancelledInvoices++;
      else pendingInvoices++;

      // Monthly aggregation
      const invDate = new Date(inv.date || inv.createdAt);
      const monthKey = invDate.toLocaleString('default', { month: 'short' });
      if (!monthlyRevenueMap[monthKey]) {
        monthlyRevenueMap[monthKey] = { name: monthKey, sales: 0, profit: 0 };
      }
      monthlyRevenueMap[monthKey].sales += sale;
      monthlyRevenueMap[monthKey].profit += profit;
    });

    const recentInvoices = allInvoices.slice(0, 6);

    // 6. Users statistics
    const usersCount = await db.user.count();
    const adminsCount = await db.user.count({ 
      where: { 
        role: 'ADMIN' 
      } 
    });
    const regularUsersCount = usersCount - adminsCount;

    const recentUsers = await db.user.findMany({
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

    const unrealizedProfit = Math.max(0, saleValue - costValue);
    const profitMargin = totalSales > 0 ? ((totalProfit / totalSales) * 100).toFixed(2) : '0.00';
    const averageOrderValue = invoicesCount > 0 ? (totalSales / invoicesCount).toFixed(2) : '0.00';

    // Top high-value items
    const topValueItems = [...allItems]
      .map(item => {
        const qty = parseInt(item.qty) || 0;
        const sellingPrice = parseFloat(item.sellingPrice) || 0;
        const totalWorth = qty * sellingPrice;
        return {
          id: item.id,
          title: item.title,
          qty,
          sellingPrice,
          totalWorth,
          category: item.category || 'General',
          warehouseTitle: item.warehouse?.title || 'Unassigned',
        };
      })
      .sort((a, b) => b.totalWorth - a.totalWorth)
      .slice(0, 5);

    const revenueTimeline = Object.values(monthlyRevenueMap);

    const dashboardData = {
      summary: {
        totalRevenue: totalSales.toFixed(2),
        totalProfit: totalProfit.toFixed(2),
        totalCost: totalCost.toFixed(2),
        profitMargin,
        averageOrderValue,
        activeWarehouses: warehousesCount,
        totalInventoryItems: itemsCount,
        totalStockQuantity: totalQty,
        lowStockAlerts: lowStockItems.length,
        criticalStockCount,
        outOfStockCount,
        collectedRevenue: paidAmount.toFixed(2),
        pendingReceivables: unpaidAmount.toFixed(2),
      },
      inventory: {
        count: itemsCount,
        totalQty,
        costValue: costValue.toFixed(2),
        saleValue: saleValue.toFixed(2),
        unrealizedProfit: unrealizedProfit.toFixed(2),
        healthyStockCount,
        lowStockCount,
        criticalStockCount,
        outOfStockCount,
        categories: Array.from(categoriesSet),
        brands: Array.from(brandsSet),
        lowStockItems: lowStockItems.slice(0, 10),
        topValueItems,
      },
      warehouses: {
        count: warehousesCount,
        list: Object.values(warehouseStockMap),
      },
      suppliers: {
        count: suppliersCount,
        recent: recentSuppliers.map(s => ({
          ...s,
          totalItems: s._count.Item
        }))
      },
      invoices: {
        count: invoicesCount,
        totalSales: totalSales.toFixed(2),
        totalProfit: totalProfit.toFixed(2),
        totalCost: totalCost.toFixed(2),
        statusBreakdown: {
          COMPLETED: completedInvoices,
          PENDING: pendingInvoices,
          CANCELLED: cancelledInvoices,
        },
        paymentBreakdown: {
          PAID: paidInvoices,
          UNPAID: unpaidInvoices,
          PARTIAL: partialInvoices,
        },
        pendingCount: pendingInvoices,
        unpaidCount: unpaidInvoices,
        recent: recentInvoices,
        timeline: revenueTimeline.length > 0 ? revenueTimeline : [
          { name: 'Jan', sales: totalSales * 0.2, profit: totalProfit * 0.2 },
          { name: 'Feb', sales: totalSales * 0.35, profit: totalProfit * 0.35 },
          { name: 'Mar', sales: totalSales * 0.45, profit: totalProfit * 0.45 },
        ]
      },
      stockAdjustments: {
        addStockCount,
        transferStockCount,
        recentAddStock: recentAddStockAdjustments,
        recentTransfers: recentTransferStockAdjustments,
      },
      users: {
        count: usersCount,
        roles: {
          ADMIN: adminsCount,
          USER: regularUsersCount,
        },
        recent: recentUsers
      }
    };

    return NextResponse.json(dashboardData, { status: 200 });

  } catch (error) {
    console.error('Dashboard API Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch dashboard data', details: error.message },
      { status: 500 }
    );
  }
}
