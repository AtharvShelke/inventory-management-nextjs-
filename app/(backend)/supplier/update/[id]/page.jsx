'use client';

import React, { useEffect, useState } from 'react';
import NewSupplier from '../../new/page';
import { getRequest } from '@/lib/apiRequest';

export default function UpdateSupplierPage({ params: { id } }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSupplierData = async () => {
      try {
        const supplierData = await getRequest(`supplier/${id}`);
        setData(supplierData);
      } catch (err) {
        setError('Failed to fetch supplier data');
      } finally {
        setLoading(false);
      }
    };

    fetchSupplierData();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!data) {
    return <div>No supplier data found</div>;
  }

  return (
    <>
      <NewSupplier initialData={data} isUpdate={true} />
    </>
  );
}
