'use client'
import React, { useState, useEffect } from 'react';
import NewWarehouse from '../../new/page';
import { getRequest } from '@/lib/apiRequest';
import toast from 'react-hot-toast';

export default function UpdateWarehouse({ params: { id } }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getRequest(`warehouse/${id}`);
        setData(result);
      } catch (err) {
        setError('Failed to fetch warehouse data');
        toast.error('Failed to fetch warehouse data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>; // Add a loading spinner or any loading UI
  }

  if (error) {
    return <div>{error}</div>; // Handle the error gracefully
  }

  return (
    <NewWarehouse initialData={data} isUpdate={true} />
  );
}
