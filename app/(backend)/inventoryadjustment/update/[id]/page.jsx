import FormHeader from '@/components/dashboard/FormHeader';
import InventoryAdjustmentAdd from '@/components/dashboard/InventoryAdjustmentAdd';
import { getRequest } from '@/lib/apiRequest';
import React from 'react';

export default async function UpdateAdjustment({ params: { id } }) {
  try {
    // Fetch the required data concurrently
    const [data, warehouses, items] = await Promise.all([
      getRequest(`inventoryadjustment/add/${id}`),
      getRequest('warehouse'),
      getRequest('items'),
    ]);

    // Return the UI with the fetched data
    return (
      <>
        <FormHeader title="Inventory Adjustment" href="/inventory" />
        <InventoryAdjustmentAdd
          warehouses={warehouses}
          items={items}
          initialData={data}
          isUpdate={true}
        />
      </>
    );
  } catch (error) {
    // Handle errors and display a user-friendly message
    console.error('Error fetching data:', error);
    return <div>Something went wrong. Please try again later.</div>;
  }
}
