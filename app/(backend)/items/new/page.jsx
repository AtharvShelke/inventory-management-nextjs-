'use client';

import { useState, useEffect } from 'react';
import CreateItemForm from '@/components/dashboard/CreateItemForm';
import FormHeader from '@/components/dashboard/FormHeader';
import { getRequest } from '@/lib/apiRequest';
import { Card } from '@/components/ui/card';
import { AlertTriangle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function NewItem({ initialData = {}, isUpdate = false }) {
  const [warehouses, setWarehouses] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const [warehousesData, suppliersData] = await Promise.all([
          getRequest('warehouse'),
          getRequest('supplier')
        ]);

        if (isMounted) {
          // Validate data structure
          if (!Array.isArray(warehousesData) || !Array.isArray(suppliersData)) {
            throw new Error('Invalid data format received');
          }

          // Check if data exists
          if (warehousesData.length === 0) {
            console.warn('No warehouses found');
          }
          if (suppliersData.length === 0) {
            console.warn('No suppliers found');
          }

          setWarehouses(warehousesData);
          setSuppliers(suppliersData);
        }
      } catch (err) {
        console.error('Error fetching data:', err);
        if (isMounted) {
          setError(err.message || 'Failed to load warehouses or suppliers');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Loading form data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Card className="p-6 max-w-md">
          <div className="text-center">
            <AlertTriangle className="h-12 w-12 text-red-600 mx-auto mb-4" />
            <h2 className="text-xl font-bold mb-2 text-red-600">Error Loading Form</h2>
            <p className="text-sm text-muted-foreground mb-4">{error}</p>
            <Button onClick={() => window.location.reload()}>
              Try Again
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <FormHeader title={isUpdate ? 'Update Item' : 'New Item'} href="/inventory" />
      <CreateItemForm
        initialData={initialData}
        isUpdate={isUpdate}
        warehouses={warehouses}
        suppliers={suppliers}
      />
    </div>
  );
}
