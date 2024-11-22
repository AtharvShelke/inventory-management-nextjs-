import DataTable from '@/components/dashboard/DataTable'
import FixedHeader from '@/components/dashboard/FixedHeader'
import FormHeader from '@/components/dashboard/FormHeader'
import { getRequest } from '@/lib/apiRequest'
import React from 'react'

export default async function Warehouse() {
  const warehouse = await getRequest('warehouse');
  
 const columns = ['title','location','warehouseType', 'description']
  return (
    
    <>
      <FixedHeader title={'warehouse'} newLink={'/overview/warehouse/new'} wantButton={false} />
      <div className="my-4 p-8">
        <DataTable data={warehouse} columns={columns}/>
      </div>

    </>
  )
}
