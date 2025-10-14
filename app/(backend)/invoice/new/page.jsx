'use client'
import CreateInvoiceForm from '@/components/dashboard/CreateInvoiceForm';
import FormHeader from '@/components/dashboard/FormHeader';
import { getRequest } from '@/lib/apiRequest';
import React, { useEffect, useState } from 'react';

export default function NewInvoice() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch items and handle loading and errors
    const fetchItems = async () => {
      try {
        const fetchedItems = await getRequest('items');
        setItems(fetchedItems);
      } catch (err) {
        setError('Failed to load items');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // or a loading spinner
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      {/* Header */}
      <FormHeader title='New Invoice' href="/overview/invoice" />
      {/* Form */}
      <CreateInvoiceForm items={items} />
    </>
  );
}
