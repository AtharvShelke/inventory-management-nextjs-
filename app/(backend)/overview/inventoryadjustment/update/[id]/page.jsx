

import FormHeader from '@/components/dashboard/FormHeader';
import InventoryAdjustmentAdd from '@/components/dashboard/InventoryAdjustmentAdd';
import { getRequest } from '@/lib/apiRequest';

import React from 'react';

export default async function UpdateAdjustment({params:{id}}) {
    const data = await getRequest(`inventoryadjusment/add/${id}`);
    
  const [warehouses, items] = await Promise.all([
    getRequest('warehouse'),
    getRequest('items'),
]);
// console.log('items in new adjustments:' , items)

    return (
        <>
            <FormHeader title='Inventory Adjustment' href="/overview/inventory" />
            <InventoryAdjustmentAdd warehouses={warehouses} items={items} initialData={data} isUpdate={true}/>
        </>
    );
}
