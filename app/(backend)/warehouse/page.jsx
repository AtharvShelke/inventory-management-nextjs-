'use client';

import { useEffect, useState, useCallback, useMemo } from 'react';
import DataTable from '@/components/dashboard/DataTable';
import FixedHeader from '@/components/dashboard/FixedHeader';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle, Loader2, RefreshCw, Warehouse as WarehouseIcon, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

export default function WarehousePage() {
  const [warehouses, setWarehouses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch warehouse data
  const fetchWarehouses = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch('/api/warehouse');

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      // Handle both array and object response formats
      const data = Array.isArray(result) ? result : result.data || [];

      if (!Array.isArray(data)) {
        throw new Error('Invalid data format received');
      }

      setWarehouses(data);
    } catch (err) {
      console.error('Error fetching warehouses:', err);
      setError(err.message || 'Failed to load warehouse data');
      toast.error('Failed to load warehouses');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      fetchWarehouses();
    }

    return () => {
      isMounted = false;
    };
  }, [fetchWarehouses]);

  // Handle warehouse deletion
  const handleDelete = useCallback((id) => {
    setWarehouses((prev) => prev.filter((warehouse) => warehouse.id !== id));
    toast.success('Warehouse deleted successfully');
  }, []);

  // Calculate statistics
  const statistics = useMemo(() => {
    const totalWarehouses = warehouses.length;
    const totalItems = warehouses.reduce((sum, wh) => sum + (wh._count?.Item || 0), 0);
    const warehouseTypes = [...new Set(warehouses.map((wh) => wh.warehouseType))];
    const locations = [...new Set(warehouses.map((wh) => wh.location).filter(Boolean))];

    return {
      totalWarehouses,
      totalItems,
      warehouseTypes: warehouseTypes.length,
      locations: locations.length,
    };
  }, [warehouses]);

  // Column configuration
  const columns = useMemo(
    () => [
      {
        key: 'title',
        label: 'Warehouse Name',
        sortable: true,
      },
      {
        key: 'location',
        label: 'Location',
        sortable: true,
        render: (warehouse) => warehouse.location || 'N/A',
      },
      {
        key: 'warehouseType',
        label: 'Type',
        sortable: true,
        render: (warehouse) => (
          <Badge variant="outline" className="capitalize">
            {warehouse.warehouseType}
          </Badge>
        ),
      },
      {
        key: 'itemCount',
        label: 'Items',
        sortable: true,
        render: (warehouse) => (
          <div className="flex items-center gap-2">
            <Package className="h-4 w-4 text-muted-foreground" />
            <span className="font-medium">{warehouse._count?.Item || 0}</span>
          </div>
        ),
      },
      {
        key: 'description',
        label: 'Description',
        sortable: false,
        render: (warehouse) => (
          <span className="text-sm text-muted-foreground line-clamp-2">
            {warehouse.description || 'No description'}
          </span>
        ),
      },
      {
        key: 'createdAt',
        label: 'Created',
        sortable: true,
        format: (value) => new Date(value).toLocaleDateString('en-IN'),
      },
    ],
    []
  );

  // Loading state
  if (loading) {
    return (
      <div className="space-y-4">
        <FixedHeader title="Warehouses" newLink="/warehouse/new" />
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
            <p className="text-muted-foreground">Loading warehouses...</p>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="space-y-4">
        <FixedHeader title="Warehouses" newLink="/warehouse/new" />
        <div className="flex items-center justify-center min-h-[400px]">
          <Card className="p-6 max-w-md">
            <div className="text-center">
              <AlertTriangle className="h-12 w-12 text-red-600 mx-auto mb-4" />
              <h2 className="text-xl font-bold mb-2 text-red-600">Error Loading Warehouses</h2>
              <p className="text-sm text-muted-foreground mb-4">{error}</p>
              <Button onClick={fetchWarehouses}>
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
    <div className="space-y-6">
      <FixedHeader title="Warehouses" newLink="/warehouse/new" />

      {/* Statistics Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 p-4 md:p-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Warehouses</CardTitle>
            <WarehouseIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{statistics.totalWarehouses}</div>
            <p className="text-xs text-muted-foreground">Active locations</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Items</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{statistics.totalItems}</div>
            <p className="text-xs text-muted-foreground">Across all warehouses</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Warehouse Types</CardTitle>
            <WarehouseIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{statistics.warehouseTypes}</div>
            <p className="text-xs text-muted-foreground">Different types</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Locations</CardTitle>
            <WarehouseIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{statistics.locations}</div>
            <p className="text-xs text-muted-foreground">Unique locations</p>
          </CardContent>
        </Card>
      </div>

      {/* Warehouse Table */}
      <div className="p-4 md:p-8">
        <Card>
          <CardHeader>
            <CardTitle>Warehouse Management</CardTitle>
            <CardDescription>Manage your warehouse locations and inventory distribution</CardDescription>
          </CardHeader>
          <CardContent>
            <DataTable
              data={warehouses}
              columns={columns}
              resourceName="warehouse"
              loading={loading}
              onDelete={handleDelete}
              onRefresh={fetchWarehouses}
              showStockStatus={false}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
