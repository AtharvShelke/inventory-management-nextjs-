'use client'
import React, { useEffect, useState } from 'react';
import DataTable from '@/components/dashboard/DataTable';
import FixedHeader from '@/components/dashboard/FixedHeader';
import { getRequest } from '@/lib/apiRequest';
import toast from 'react-hot-toast';

export default function Warehouse() {
  const [warehouse, setWarehouse] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWarehouseData = async () => {
      try {
        const data = await getRequest('warehouse');
        setWarehouse(data);
      } catch (err) {
        setError('Failed to load warehouse data.');
        toast.error('Failed to load warehouse data.');
      } finally {
        setLoading(false);
      }
    };

    fetchWarehouseData();
  }, []);

  const columns = ['title', 'location', 'warehouseType', 'description'];

  if (loading) {
    return <div>Loading...</div>; // You can replace this with a loading spinner if preferred
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <FixedHeader title={'Warehouse'} newLink={'/overview/warehouse/new'} wantButton={false} />
      <div className="my-4 p-8">
        <DataTable data={warehouse} columns={columns} resourceName={'warehouse'} />
      </div>
    </>
  );
}
