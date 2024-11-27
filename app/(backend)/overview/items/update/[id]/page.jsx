'use client';

import { useState, useEffect } from 'react';
import NewItem from '../../new/page';
import { getRequest } from '@/lib/apiRequest';

export default function UpdatePage({ params: { id } }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const itemData = await getRequest(`items/${id}`);
        setData(itemData);
      } catch (err) {
        setError('Failed to fetch item data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      {/* Render the NewItem component with data */}
      <NewItem initialData={data} isUpdate={true} />
    </>
  );
}
