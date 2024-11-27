'use client';

import { useState, useEffect, useMemo } from 'react';
import DataTable from '@/components/dashboard/DataTable';
import FixedHeader from '@/components/dashboard/FixedHeader';
import { getRequest } from '@/lib/apiRequest';
import { useSession } from 'next-auth/react';

export default function Items() {
  const { data: session } = useSession();  // Fetch session client-side
  const [items, setItems] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [itemsData, suppliersData] = await Promise.all([
          getRequest('items'),
          getRequest('supplier')
        ]);
        setItems(itemsData);
        setSuppliers(suppliersData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const role = session?.user?.role;

  const updatedItems = useMemo(() => {
    return items.map((item) => {
      const supplierDetails = suppliers.find(supplier => supplier.id === item.supplierId);
      return {
        ...item,
        supplier: supplierDetails?.title || 'N/A',  // fallback if supplier not found
      };
    });
  }, [items, suppliers]);

  const adminColumns = ['title', 'qty', 'buyingPrice', 'sellingPrice', 'supplier'];
  const employeeColumns = ['title', 'qty', 'supplier'];

  const columns = useMemo(() => (role === 'USER' ? employeeColumns : adminColumns), [role]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <FixedHeader title={'Items'} newLink={'/overview/items/new'} />
      <div className="my-4 p-8">
        <DataTable data={updatedItems} columns={columns} resourceName={'items'} />
      </div>
    </>
  );
}
