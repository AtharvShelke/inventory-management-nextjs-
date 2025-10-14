'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import DataTable from '@/components/dashboard/DataTable';
import FixedHeader from '@/components/dashboard/FixedHeader';
import { useSession } from 'next-auth/react';
import { Card } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle, Loader2, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export default function Items() {
  const { data: session, status: sessionStatus } = useSession();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refetchTrigger, setRefetchTrigger] = useState(0);

  // Fetch items data
  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch('/api/items?limit=1000');
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      
      if (!result.success) {
        throw new Error(result.error || 'Failed to fetch items');
      }

      // Handle both old API format (array) and new API format (object with data)
      const itemsData = Array.isArray(result) ? result : (result.data || []);
      
      if (!Array.isArray(itemsData)) {
        throw new Error('Invalid data format received from API');
      }

      setItems(itemsData);
      
    } catch (err) {
      console.error('Error fetching items:', err);
      setError(err.message || 'Failed to load items');
      toast.error('Failed to load items');
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial fetch
  useEffect(() => {
    let isMounted = true;

    if (sessionStatus === 'loading') return;

    if (isMounted) {
      fetchItems();
    }

    return () => {
      isMounted = false;
    };
  }, [fetchItems, sessionStatus, refetchTrigger]);

  // Handle item deletion
  const handleDelete = useCallback((id) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
    toast.success('Item deleted successfully');
  }, []);

  // Handle retry
  const handleRetry = useCallback(() => {
    setRefetchTrigger((prev) => prev + 1);
  }, []);

  // Get user role
  const role = session?.user?.role;

  // Memoized column configuration
  const columns = useMemo(() => {
    const baseColumns = [
      { key: 'title', label: 'Title', sortable: true },
      { key: 'qty', label: 'Quantity', sortable: true },
      { key: 'category', label: 'Category', sortable: true },
      { key: 'brand', label: 'Brand', sortable: true },
    ];

    const adminColumns = [
      ...baseColumns,
      { key: 'buyingPrice', label: 'Buying Price', sortable: true, format: (value) => value ? `₹${parseFloat(value).toFixed(2)}` : 'N/A' },
      { key: 'sellingPrice', label: 'Selling Price', sortable: true, format: (value) => value ? `₹${parseFloat(value).toFixed(2)}` : 'N/A' },
    ];

    // Add supplier column
    const columnsWithSupplier = role === 'ADMIN' ? adminColumns : baseColumns;
    columnsWithSupplier.push({
      key: 'supplier',
      label: 'Supplier',
      sortable: true,
      render: (item) => item.supplier?.title || 'N/A'
    });

    if (role === 'ADMIN') {
      columnsWithSupplier.push({ key: 'username', label: 'Added By', sortable: true });
    }

    return columnsWithSupplier;
  }, [role]);

  // Memoized table data with enhanced item information
  const tableData = useMemo(() => {
    return items.map((item) => {
      const qty = parseInt(item.qty) || 0;
      const stockStatus = qty < (item.minStockLevel || 10) 
        ? 'critical' 
        : qty < (item.reorderPoint || 30) 
        ? 'low' 
        : 'good';

      return {
        ...item,
        stockStatus,
        supplier: item.supplier || { title: 'N/A' },
        // Format prices for display
        buyingPrice: item.buyingPrice,
        sellingPrice: item.sellingPrice,
      };
    });
  }, [items]);

  // Loading state
  if (loading && items.length === 0) {
    return (
      <div className="space-y-4">
        <FixedHeader title="Items" newLink="/overview/items/new" />
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
            <p className="text-muted-foreground">Loading items...</p>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error && items.length === 0) {
    return (
      <div className="space-y-4">
        <FixedHeader title="Items" newLink="/overview/items/new" />
        <div className="flex items-center justify-center min-h-[400px]">
          <Card className="p-6 max-w-md">
            <div className="text-center">
              <AlertTriangle className="h-12 w-12 text-red-600 mx-auto mb-4" />
              <h2 className="text-xl font-bold mb-2 text-red-600">Error Loading Items</h2>
              <p className="text-sm text-muted-foreground mb-4">{error}</p>
              <Button onClick={handleRetry}>
                <RefreshCw className="mr-2 h-4 w-4" />
                Try Again
              </Button>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <FixedHeader title="Items" newLink="/overview/items/new" />
      
      {error && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="p-4 md:p-8">
        <DataTable
          data={tableData}
          columns={columns}
          resourceName="items"
          loading={loading}
          onDelete={handleDelete}
          onRefresh={handleRetry}
        />
      </div>
    </div>
  );
}
