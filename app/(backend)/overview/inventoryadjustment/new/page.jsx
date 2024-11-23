

import FormHeader from '@/components/dashboard/FormHeader';
import InventoryAdjustment from '@/components/dashboard/InventoryAdjustment';
import { getRequest } from '@/lib/apiRequest';

import React from 'react';

export default async function NewAdjustments() {
    
  const [warehouses, items] = await Promise.all([
    getRequest('warehouse'),
    getRequest('items'),
]);
// console.log('items in new adjustments:' , items)

    return (
        <>
            <FormHeader title='Inventory Adjustment' href="/overview/inventoryadjustment" />
            <InventoryAdjustment warehouses={warehouses} items={items}/>
        </>
    );
}
