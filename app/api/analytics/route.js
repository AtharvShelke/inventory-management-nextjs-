import db from '@/lib/db';
import { NextResponse } from 'next/server';
import { handleApiError } from '@/lib/api/errorHandler';

/**
 * GET /api/analytics - Get comprehensive analytics data
 */
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const period = searchParams.get('period') || '30';
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - parseInt(period));

    // Parallel data fetching for performance
    const [
      items,
      invoices,
      warehouses,
      suppliers,
      recentInvoices,
      lowStockItems,
      allInvoiceItems,
      stockAdjustments,
      categoryStats,
    ] = await Promise.all([
      // All items with relations
      db.item.findMany({
        include: {
          supplier: { select: { id: true, title: true } },
          warehouse: { select: { id: true, title: true } },
        },
      }),

      // All invoices in period
      db.invoice.findMany({
        where: { createdAt: { gte: startDate } },
        include: {
          invoiceItems: {
            include: {
              item: {
                select: {
                  id: true,
                  title: true,
                  category: true,
                  sellingPrice: true,
                },
              },
            },
          },
        },
      }),

      // Warehouse stats
      db.warehouse.findMany({
        include: {
          _count: { select: { Item: true } },
        },
      }),

      // Supplier stats
      db.supplier.findMany({
        include: {
          _count: { select: { Item: true } },
        },
      }),

      // Recent invoices
      db.invoice.findMany({
        take: 10,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          customerName: true,
          totalSale: true,
          totalProfit: true,
          status: true,
          paymentStatus: true,
          createdAt: true,
        },
      }),

      // Low stock items
      db.item.findMany({
        where: {
          qty: { lt: '30' },
        },
        select: {
          id: true,
          title: true,
          qty: true,
          reorderPoint: true,
          minStockLevel: true,
          warehouse: { select: { title: true } },
          supplier: { select: { title: true } },
        },
        take: 20,
        orderBy: { qty: 'asc' },
      }),

      // All invoice items for aggregation
      db.invoiceItem.findMany({
        include: {
          item: {
            select: {
              id: true,
              title: true,
              category: true,
              sellingPrice: true,
            },
          },
        },
      }),

      // Stock adjustments count
      Promise.all([
        db.addStockAdjustment.count(),
        db.transferStockAdjustment.count(),
      ]),

      // Get all items for category aggregation
      db.item.findMany({
        where: { category: { not: null } },
        select: { category: true, qty: true },
      }),
    ]);

    // Calculate top selling items manually
    const itemSalesMap = new Map();
    
    allInvoiceItems.forEach((invoiceItem) => {
      const itemId = invoiceItem.itemId;
      const qty = parseInt(invoiceItem.qty) || 0;
      
      if (itemSalesMap.has(itemId)) {
        const existing = itemSalesMap.get(itemId);
        itemSalesMap.set(itemId, {
          ...existing,
          totalSold: existing.totalSold + qty,
          orderCount: existing.orderCount + 1,
        });
      } else {
        itemSalesMap.set(itemId, {
          id: invoiceItem.item.id,
          title: invoiceItem.item.title,
          category: invoiceItem.item.category,
          sellingPrice: invoiceItem.item.sellingPrice,
          totalSold: qty,
          orderCount: 1,
        });
      }
    });

    // Convert map to array and sort by totalSold
    const topSellingItems = Array.from(itemSalesMap.values())
      .sort((a, b) => b.totalSold - a.totalSold)
      .slice(0, 10);

    // Calculate category statistics manually
    const categoryMap = new Map();
    
    categoryStats.forEach((item) => {
      const category = item.category;
      const qty = parseInt(item.qty) || 0;
      
      if (categoryMap.has(category)) {
        const existing = categoryMap.get(category);
        categoryMap.set(category, {
          category,
          itemCount: existing.itemCount + 1,
          totalQuantity: existing.totalQuantity + qty,
        });
      } else {
        categoryMap.set(category, {
          category,
          itemCount: 1,
          totalQuantity: qty,
        });
      }
    });

    const categoryDistribution = Array.from(categoryMap.values());

    // Calculate financial metrics
    const financialMetrics = invoices.reduce(
      (acc, invoice) => {
        const sale = parseFloat(invoice.totalSale) || 0;
        const cost = parseFloat(invoice.totalCost) || 0;
        const profit = parseFloat(invoice.totalProfit) || 0;

        acc.totalRevenue += sale;
        acc.totalCost += cost;
        acc.totalProfit += profit;

        if (invoice.status === 'PENDING') acc.pendingInvoices++;
        if (invoice.paymentStatus === 'UNPAID') acc.unpaidInvoices++;

        return acc;
      },
      {
        totalRevenue: 0,
        totalCost: 0,
        totalProfit: 0,
        pendingInvoices: 0,
        unpaidInvoices: 0,
      }
    );

    // Calculate inventory metrics
    const inventoryMetrics = items.reduce(
      (acc, item) => {
        const qty = parseInt(item.qty) || 0;
        const buyingPrice = parseFloat(item.buyingPrice) || 0;
        const sellingPrice = parseFloat(item.sellingPrice) || 0;

        acc.totalItems++;
        acc.totalQuantity += qty;
        acc.totalInventoryValue += qty * buyingPrice;
        acc.totalPotentialRevenue += qty * sellingPrice;

        if (qty < item.minStockLevel) acc.criticalStockItems++;
        else if (qty < item.reorderPoint) acc.lowStockItems++;

        if (qty === 0) acc.outOfStockItems++;

        return acc;
      },
      {
        totalItems: 0,
        totalQuantity: 0,
        totalInventoryValue: 0,
        totalPotentialRevenue: 0,
        criticalStockItems: 0,
        lowStockItems: 0,
        outOfStockItems: 0,
      }
    );

    // Calculate inventory turnover ratio
    const averageInventoryValue = inventoryMetrics.totalInventoryValue;
    const inventoryTurnoverRatio =
      averageInventoryValue > 0
        ? (financialMetrics.totalCost / averageInventoryValue).toFixed(2)
        : '0.00';

    // Calculate profit margin
    const profitMargin =
      financialMetrics.totalRevenue > 0
        ? ((financialMetrics.totalProfit / financialMetrics.totalRevenue) * 100).toFixed(2)
        : '0.00';

    // Revenue trend (daily for selected period)
    const revenueTrend = [];
    for (let i = parseInt(period) - 1; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      date.setHours(0, 0, 0, 0);

      const nextDate = new Date(date);
      nextDate.setDate(nextDate.getDate() + 1);

      const dayInvoices = invoices.filter(
        (inv) => new Date(inv.createdAt) >= date && new Date(inv.createdAt) < nextDate
      );

      const dayRevenue = dayInvoices.reduce(
        (sum, inv) => sum + (parseFloat(inv.totalSale) || 0),
        0
      );

      const dayProfit = dayInvoices.reduce(
        (sum, inv) => sum + (parseFloat(inv.totalProfit) || 0),
        0
      );

      revenueTrend.push({
        date: date.toISOString().split('T')[0],
        revenue: parseFloat(dayRevenue.toFixed(2)),
        profit: parseFloat(dayProfit.toFixed(2)),
        orders: dayInvoices.length,
      });
    }

    // Warehouse distribution
    const warehouseDistribution = warehouses.map((wh) => ({
      id: wh.id,
      name: wh.title,
      location: wh.location || 'N/A',
      itemCount: wh._count.Item,
      type: wh.warehouseType,
    }));

    // Supplier performance
    const supplierPerformance = suppliers
      .map((supplier) => ({
        id: supplier.id,
        name: supplier.title,
        itemCount: supplier._count.Item,
        email: supplier.email,
        phone: supplier.phone,
      }))
      .sort((a, b) => b.itemCount - a.itemCount)
      .slice(0, 10);

    // Stock adjustment metrics
    const [addStockCount, transferStockCount] = stockAdjustments;

    // Calculate average order value
    const averageOrderValue =
      invoices.length > 0
        ? (financialMetrics.totalRevenue / invoices.length).toFixed(2)
        : '0.00';

    // Calculate items per category
    const totalCategorizedItems = categoryDistribution.reduce(
      (sum, cat) => sum + cat.itemCount,
      0
    );

    // Construct comprehensive response
    const analyticsData = {
      summary: {
        period: `${period} days`,
        generatedAt: new Date().toISOString(),
        totalRevenue: financialMetrics.totalRevenue.toFixed(2),
        totalProfit: financialMetrics.totalProfit.toFixed(2),
        totalCost: financialMetrics.totalCost.toFixed(2),
        profitMargin: `${profitMargin}%`,
        averageOrderValue: averageOrderValue,
        totalOrders: invoices.length,
        pendingOrders: financialMetrics.pendingInvoices,
        unpaidInvoices: financialMetrics.unpaidInvoices,
      },
      inventory: {
        totalItems: inventoryMetrics.totalItems,
        totalQuantity: inventoryMetrics.totalQuantity,
        inventoryValue: inventoryMetrics.totalInventoryValue.toFixed(2),
        potentialRevenue: inventoryMetrics.totalPotentialRevenue.toFixed(2),
        inventoryTurnoverRatio,
        criticalStockItems: inventoryMetrics.criticalStockItems,
        lowStockItems: inventoryMetrics.lowStockItems,
        outOfStockItems: inventoryMetrics.outOfStockItems,
        stockAdjustments: {
          added: addStockCount,
          transferred: transferStockCount,
          total: addStockCount + transferStockCount,
        },
        warehouseCount: warehouses.length,
        supplierCount: suppliers.length,
        categorizedItems: totalCategorizedItems,
        uniqueCategories: categoryDistribution.length,
      },
      trends: {
        revenue: revenueTrend,
      },
      topPerformers: {
        items: topSellingItems,
        suppliers: supplierPerformance,
      },
      distribution: {
        warehouses: warehouseDistribution,
        categories: categoryDistribution,
      },
      alerts: {
        lowStock: lowStockItems.map((item) => ({
          ...item,
          stockLevel: parseInt(item.qty) || 0,
          status:
            parseInt(item.qty) < item.minStockLevel
              ? 'critical'
              : parseInt(item.qty) < item.reorderPoint
              ? 'low'
              : 'good',
        })),
        recentInvoices: recentInvoices,
      },
    };

    return NextResponse.json({
      success: true,
      data: analyticsData,
      meta: {
        fetchedAt: new Date().toISOString(),
        period: `${period} days`,
        dataPoints: {
          items: items.length,
          invoices: invoices.length,
          warehouses: warehouses.length,
          suppliers: suppliers.length,
        },
      },
    });
  } catch (error) {
    return handleApiError(error);
  } finally {
    await db.$disconnect();
  }
}
