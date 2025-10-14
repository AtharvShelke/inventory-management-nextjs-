'use client';

import { useEffect, useState, useCallback, useMemo } from 'react';
import DataTable from '@/components/dashboard/DataTable';
import FixedHeader from '@/components/dashboard/FixedHeader';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  AlertTriangle,
  Loader2,
  RefreshCw,
  Users,
  Package,
  Phone,
  Mail,
  Building,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

export default function SupplierPage() {
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch suppliers
  const fetchSuppliers = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch('/api/supplier');

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

      setSuppliers(data);
    } catch (err) {
      console.error('Error fetching suppliers:', err);
      setError(err.message || 'Failed to load supplier data');
      toast.error('Failed to load suppliers');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      fetchSuppliers();
    }

    return () => {
      isMounted = false;
    };
  }, [fetchSuppliers]);

  // Handle supplier deletion
  const handleDelete = useCallback((id) => {
    setSuppliers((prev) => prev.filter((supplier) => supplier.id !== id));
    toast.success('Supplier deleted successfully');
  }, []);

  // Calculate statistics
  const statistics = useMemo(() => {
    const totalSuppliers = suppliers.length;
    const totalItems = suppliers.reduce((sum, supplier) => sum + (supplier._count?.Item || 0), 0);
    const suppliersWithEmail = suppliers.filter((s) => s.email).length;
    const suppliersWithPhone = suppliers.filter((s) => s.phone).length;

    return {
      totalSuppliers,
      totalItems,
      suppliersWithEmail,
      suppliersWithPhone,
    };
  }, [suppliers]);

  // Column configuration
  const columns = useMemo(
    () => [
      {
        key: 'title',
        label: 'Supplier Name',
        sortable: true,
        render: (supplier) => (
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100">
              <Building className="h-4 w-4 text-blue-600" />
            </div>
            <div>
              <p className="font-medium">{supplier.title}</p>
              {supplier.supplierCode && (
                <p className="text-xs text-muted-foreground">{supplier.supplierCode}</p>
              )}
            </div>
          </div>
        ),
      },
      {
        key: 'contactPerson',
        label: 'Contact Person',
        sortable: true,
        render: (supplier) => supplier.contactPerson || 'N/A',
      },
      {
        key: 'phone',
        label: 'Phone',
        sortable: true,
        render: (supplier) =>
          supplier.phone ? (
            <div className="flex items-center gap-2">
              <Phone className="h-3 w-3 text-muted-foreground" />
              <span>{supplier.phone}</span>
            </div>
          ) : (
            'N/A'
          ),
      },
      {
        key: 'email',
        label: 'Email',
        sortable: true,
        render: (supplier) =>
          supplier.email ? (
            <div className="flex items-center gap-2">
              <Mail className="h-3 w-3 text-muted-foreground" />
              <span className="text-sm">{supplier.email}</span>
            </div>
          ) : (
            'N/A'
          ),
      },
      {
        key: 'itemCount',
        label: 'Items',
        sortable: true,
        render: (supplier) => (
          <div className="flex items-center gap-2">
            <Package className="h-4 w-4 text-muted-foreground" />
            <span className="font-medium">{supplier._count?.Item || 0}</span>
          </div>
        ),
      },
      {
        key: 'paymentTerms',
        label: 'Payment Terms',
        sortable: true,
        render: (supplier) =>
          supplier.paymentTerms ? (
            <Badge variant="outline">{supplier.paymentTerms}</Badge>
          ) : (
            'N/A'
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
        <FixedHeader title="Suppliers" newLink="/overview/supplier/new" />
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
            <p className="text-muted-foreground">Loading suppliers...</p>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="space-y-4">
        <FixedHeader title="Suppliers" newLink="/overview/supplier/new" />
        <div className="flex items-center justify-center min-h-[400px]">
          <Card className="p-6 max-w-md">
            <div className="text-center">
              <AlertTriangle className="h-12 w-12 text-red-600 mx-auto mb-4" />
              <h2 className="text-xl font-bold mb-2 text-red-600">Error Loading Suppliers</h2>
              <p className="text-sm text-muted-foreground mb-4">{error}</p>
              <Button onClick={fetchSuppliers}>
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
      <FixedHeader title="Suppliers" newLink="/overview/supplier/new" />

      {/* Statistics Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 p-4 md:p-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Suppliers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{statistics.totalSuppliers}</div>
            <p className="text-xs text-muted-foreground">Active suppliers</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Items</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{statistics.totalItems}</div>
            <p className="text-xs text-muted-foreground">From all suppliers</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">With Email</CardTitle>
            <Mail className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{statistics.suppliersWithEmail}</div>
            <p className="text-xs text-muted-foreground">Email contacts</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">With Phone</CardTitle>
            <Phone className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{statistics.suppliersWithPhone}</div>
            <p className="text-xs text-muted-foreground">Phone contacts</p>
          </CardContent>
        </Card>
      </div>

      {/* Supplier Table */}
      <div className="p-4 md:p-8">
        <Card>
          <CardHeader>
            <CardTitle>Supplier Management</CardTitle>
            <CardDescription>
              Manage your suppliers and track item relationships
            </CardDescription>
          </CardHeader>
          <CardContent>
            {suppliers.length > 0 ? (
              <DataTable
                data={suppliers}
                columns={columns}
                resourceName="supplier"
                loading={loading}
                onDelete={handleDelete}
                onRefresh={fetchSuppliers}
                showStockStatus={false}
              />
            ) : (
              <div className="text-center py-10 border border-dashed rounded-lg">
                <Users className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-lg font-medium mb-2">No suppliers found</p>
                <p className="text-sm text-muted-foreground mb-4">
                  Get started by adding your first supplier
                </p>
                <Button onClick={() => (window.location.href = '/overview/supplier/new')}>
                  <Users className="mr-2 h-4 w-4" />
                  Add Supplier
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
