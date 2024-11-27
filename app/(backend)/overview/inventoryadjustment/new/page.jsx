'use client'
import FormHeader from '@/components/dashboard/FormHeader';
import InventoryAdjustment from '@/components/dashboard/InventoryAdjustment';
import { getRequest } from '@/lib/apiRequest';
import React, { useState, useEffect } from 'react';

export default function NewAdjustments() {
  const [warehouses, setWarehouses] = useState(null);
  const [items, setItems] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [warehousesData, itemsData] = await Promise.all([
          getRequest('warehouse'),
          getRequest('items'),
        ]);
        setWarehouses(warehousesData);
        setItems(itemsData);
      } catch (err) {
        setError('Error fetching data. Please try again later.');
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Show loading state while data is being fetched
  }

  if (error) {
    return <div>{error}</div>; // Show error message if something goes wrong
  }

  return (
    <>
      <FormHeader title="Inventory Adjustment" href="/overview/inventoryadjustment" />
      <InventoryAdjustment warehouses={warehouses} items={items} />
    </>
  );
}
