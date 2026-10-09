'use client';

import React, { useEffect, useState } from 'react';
import CreateInvoiceForm from '@/components/dashboard/CreateInvoiceForm';
import FormHeader from '@/components/dashboard/FormHeader';
import { Card } from '@/components/ui/card';
import { Loader2, AlertTriangle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function NewInvoice() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchItems = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch('/api/items?limit=1000');
      if (!res.ok) {
        throw new Error('Failed to fetch product items');
      }
      const data = await res.json();
      const itemsList = data.data || (Array.isArray(data) ? data : []);
      setItems(itemsList);
    } catch (err) {
      console.error('Error loading items for invoice:', err);
      setError(err.message || 'Failed to load items');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  if (loading) {
    return (
      <div className="space-y-4">
        <FormHeader title="Generate Invoice & Bill" href="/invoice" />
        <div className="flex flex-col items-center justify-center min-h-[400px] space-y-3">
          <Loader2 className="h-10 w-10 animate-spin text-blue-600" />
          <p className="text-sm text-slate-500">Loading catalog items and stock rates...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-4">
        <FormHeader title="Generate Invoice & Bill" href="/invoice" />
        <div className="flex items-center justify-center min-h-[400px]">
          <Card className="p-6 max-w-md text-center">
            <AlertTriangle className="h-10 w-10 text-red-600 mx-auto mb-3" />
            <h2 className="text-lg font-bold text-slate-900 mb-1">Error Loading Items</h2>
            <p className="text-sm text-slate-500 mb-4">{error}</p>
            <Button onClick={fetchItems} className="gap-2">
              <RefreshCw className="h-4 w-4" />
              Try Again
            </Button>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <FormHeader title="Generate Invoice & Bill" href="/invoice" />
      <CreateInvoiceForm items={items} />
    </div>
  );
}
