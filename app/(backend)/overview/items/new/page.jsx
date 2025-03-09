'use client';

import { useState, useEffect } from 'react';
import CreateItemForm from '@/components/dashboard/CreateItemForm';
import FormHeader from '@/components/dashboard/FormHeader';
import { getRequest } from '@/lib/apiRequest';

export default function NewItem({ initialData = {}, isUpdate = false }) {
  const [warehouses, setWarehouses] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [warehousesData, suppliersData] = await Promise.all([
          getRequest('warehouse'),
          getRequest('supplier')
        ]);

        setWarehouses(warehousesData);
        setSuppliers(suppliersData);
      } catch (err) {
        setError('Failed to load warehouses or suppliers');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>; 
  }

  if (error) {
    return <div>{error}</div>; 
  }

  return (
    <>
      {/* header */}
      <FormHeader title={isUpdate ? 'Update Item' : 'New Item'} href="/overview/inventory" />
      <CreateItemForm
        initialData={initialData}
        isUpdate={isUpdate}
        warehouses={warehouses}
        suppliers={suppliers}
      />
    </>
  );
}
