'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import DataTable from '@/components/dashboard/DataTable';
import FixedHeader from '@/components/dashboard/FixedHeader';
import { Card } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle, Loader2, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export default function Users() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [refetchTrigger, setRefetchTrigger] = useState(0);

    // Fetch users data
    const fetchUsers = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);

            const response = await fetch('/api/user');

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();

            // Handle both old API format (array) and new API format (object with data)
            const data = Array.isArray(result) ? result : (result.data || []);

            setUsers(data);

        } catch (err) {
            console.error('Error fetching users:', err);
            setError(err.message || 'Failed to load users');
            toast.error('Failed to load users');
        } finally {
            setLoading(false);
        }
    }, []);

    // Initial fetch
    useEffect(() => {
        fetchUsers();
    }, [fetchUsers, refetchTrigger]);

    // Handle deletion (if API supports it)
    const handleDelete = useCallback(async (id) => {
        // Implement delete logic if endpoint exists
        toast.error('Delete functionality not implemented yet');
    }, []);

    // Handle retry
    const handleRetry = useCallback(() => {
        setRefetchTrigger((prev) => prev + 1);
    }, []);

    // Columns configuration
    const columns = useMemo(() => [
        { key: 'name', label: 'Name', sortable: true },
        { key: 'email', label: 'Email', sortable: true },
        {
            key: 'role', label: 'Role', sortable: true, render: (user) => (
                <span className={`px-2 py-1 rounded-full text-xs ${user.role === 'ADMIN' ? 'bg-purple-100 text-purple-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                    {user.role}
                </span>
            )
        },
        { key: 'createdAt', label: 'Created At', sortable: true, format: (value) => new Date(value).toLocaleDateString() },
    ], []);

    // Loading state
    if (loading && users.length === 0) {
        return (
            <div className="space-y-4">
                <FixedHeader title="Users" newLink="/user/new" />
                <div className="flex items-center justify-center min-h-[400px]">
                    <div className="text-center">
                        <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
                        <p className="text-muted-foreground">Loading users...</p>
                    </div>
                </div>
            </div>
        );
    }

    // Error state
    if (error && users.length === 0) {
        return (
            <div className="space-y-4">
                <FixedHeader title="Users" newLink="/user/new" />
                <div className="flex items-center justify-center min-h-[400px]">
                    <Card className="p-6 max-w-md">
                        <div className="text-center">
                            <AlertTriangle className="h-12 w-12 text-red-600 mx-auto mb-4" />
                            <h2 className="text-xl font-bold mb-2 text-red-600">Error Loading Users</h2>
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
            <FixedHeader title="Users" newLink="/user/new" />

            {error && (
                <Alert variant="destructive">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            )}

            <div className="p-4 md:p-8">
                <DataTable
                    data={users}
                    columns={columns}
                    resourceName="user"
                    loading={loading}
                    onDelete={handleDelete}
                    onRefresh={handleRetry}
                    showStockStatus={false}
                />
            </div>
        </div>
    );
}
