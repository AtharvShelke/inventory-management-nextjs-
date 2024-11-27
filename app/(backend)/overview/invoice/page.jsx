'use client';

import FixedHeader from '@/components/dashboard/FixedHeader';
import InvoiceTable from '@/components/dashboard/InvoiceTable';
import { getRequest } from '@/lib/apiRequest';
import { useEffect, useState } from 'react';

export default function Invoice() {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        // Fetch all required data
        const [invoicesData, invoiceItems, items] = await Promise.all([
          getRequest('invoice'),
          getRequest('invoiceitem'),
          getRequest('items')
        ]);

        // Format invoice data
        const formattedInvoices = invoicesData.map(invoice => ({
          ...invoice,
          date: new Date(invoice.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' })
        }));

        setInvoices(formattedInvoices); // Update the state
      } catch (err) {
        setError('Failed to load invoices');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchInvoices();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Display loading state
  }

  if (error) {
    return <div>{error}</div>; // Display error message if data fetch fails
  }

  const columns = ['date', 'customerName', 'description'];

  return (
    <>
      <FixedHeader title={'Invoice'} newLink={'/overview/invoice/new'} />
      <div className="my-4 p-8">
        <InvoiceTable data={invoices} columns={columns} resourceName={'invoice'} />
      </div>
    </>
  );
}
