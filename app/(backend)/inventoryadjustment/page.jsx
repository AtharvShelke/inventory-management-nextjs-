import { Suspense } from 'react';

import FixedHeader from '@/components/dashboard/FixedHeader';
import { Skeleton } from '@/components/ui/skeleton';
import { authOptions } from '@/lib/authOptions';
import { getServerSession } from 'next-auth';
import { Card } from '@/components/ui/card';
import AdjustmentContent from '@/components/adjustment/AdjusmentContent';

export const metadata = {
  title: 'Stock Adjustments | Inventory Management',
  description: 'Manage stock additions and transfers',
};

async function fetchAdjustmentData() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  
  try {
    const [addStockRes, transferStockRes, itemsRes] = await Promise.all([
      fetch(`${baseUrl}/api/inventoryadjustment/add`, { cache: 'no-store' }),
      fetch(`${baseUrl}/api/inventoryadjustment/transfer`, { cache: 'no-store' }),
      fetch(`${baseUrl}/api/items`, { cache: 'no-store' }),
    ]);

    if (!addStockRes.ok || !transferStockRes.ok || !itemsRes.ok) {
      throw new Error('Failed to fetch adjustment data');
    }

    const [addStock, transferStock, items] = await Promise.all([
      addStockRes.json(),
      transferStockRes.json(),
      itemsRes.json(),
    ]);

    return {
      addStock: Array.isArray(addStock) ? addStock : addStock.data || [],
      transferStock: Array.isArray(transferStock) ? transferStock : transferStock.data || [],
      items: Array.isArray(items) ? items : items.data || [],
    };
  } catch (error) {
    console.error('Error fetching adjustment data:', error);
    return { addStock: [], transferStock: [], items: [], error: error.message };
  }
}

function LoadingSkeleton() {
  return (
    <div className="space-y-8">
      <Skeleton className="h-12 w-full" />
      <div className="space-y-4">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-64 w-full" />
      </div>
      <div className="space-y-4">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-64 w-full" />
      </div>
    </div>
  );
}

export default async function AdjustmentPage() {
  const [session, adjustmentData] = await Promise.all([
    getServerSession(authOptions),
    fetchAdjustmentData(),
  ]);

  const role = session?.user?.role;

  if (adjustmentData.error) {
    return (
      <>
        <FixedHeader title="Stock Adjustments" newLink="/inventoryadjustment/new" />
        <div className="p-8">
          <Card className="p-6">
            <div className="text-center text-red-600">
              <p className="font-semibold">Error loading adjustments</p>
              <p className="text-sm">{adjustmentData.error}</p>
            </div>
          </Card>
        </div>
      </>
    );
  }

  return (
    <>
      <FixedHeader title="Stock Adjustments" newLink="/inventoryadjustment/new" />
      <Suspense fallback={<LoadingSkeleton />}>
        <AdjustmentContent
          addStock={adjustmentData.addStock}
          transferStock={adjustmentData.transferStock}
          items={adjustmentData.items}
          role={role}
        />
      </Suspense>
    </>
  );
}
