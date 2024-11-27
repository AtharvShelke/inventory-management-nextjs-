import React, { useMemo } from 'react';
import dynamic from 'next/dynamic';
import { Package, Users, Truck, WarehouseIcon } from 'lucide-react';

// Dynamically import components
const FixedHeader = dynamic(() => import('@/components/dashboard/FixedHeader'));
const OptionCard = dynamic(() => import('@/components/dashboard/OptionCard'));

export default function Inventory() {
  // Memoize the card options
  const itemsCardOptions = useMemo(
    () => [
      {
        title: 'Items',
        Icon: Package,
        description: 'New Item',
        href: '/overview/items/new',
        linkTitle: 'New Item',
        enabled: true,
      },
      {
        title: 'Warehouse',
        Icon: WarehouseIcon,
        description: 'New Warehouse',
        href: '/overview/warehouse/new',
        linkTitle: 'New Warehouse',
        enabled: true,
      },
      {
        title: 'Suppliers',
        Icon: Users,
        description: 'New Supplier',
        href: '/overview/supplier/new',
        linkTitle: 'New Supplier',
        enabled: true,
      },
      {
        title: 'Adjustments',
        Icon: Truck,
        description: 'Transfer Stock from the main warehouse',
        href: '/overview/inventoryadjustment/new',
        linkTitle: 'New Adjustment',
        enabled: true,
      },
    ],
    []
  );

  return (
    <>
      <FixedHeader newLink="/overview/items/new" title="Item" />
      <div className="grid grid-cols-1 md:grid-cols-2 m-6 gap-6">
        {itemsCardOptions.map((item, index) => (
          <OptionCard key={index} optionData={item} />
        ))}
      </div>
    </>
  );
}
