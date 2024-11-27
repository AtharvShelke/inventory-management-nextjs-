'use client';

import { useEffect, useState } from 'react';
import DataTable from '@/components/dashboard/DataTable';
import FixedHeader from '@/components/dashboard/FixedHeader';
import { getRequest } from '@/lib/apiRequest';

export default function Supplier() {
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const data = await getRequest('supplier');
        setSuppliers(data);
      } catch (err) {
        setError('Failed to fetch supplier data');
      } finally {
        setLoading(false);
      }
    };

    fetchSuppliers();
  }, []);

  const columns = ['title', 'phone', 'email'];

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <FixedHeader title={'Supplier'} newLink={'/overview/supplier/new'} wantButton={false} />
      <div className="my-4 p-8">
        {suppliers.length ? (
          <DataTable data={suppliers} columns={columns} resourceName={'supplier'} />
        ) : (
          <div>No suppliers available</div>
        )}
      </div>
    </>
  );
}
