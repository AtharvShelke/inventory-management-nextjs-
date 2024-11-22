import DataTable from '@/components/dashboard/DataTable'
import FixedHeader from '@/components/dashboard/FixedHeader'
import FormHeader from '@/components/dashboard/FormHeader'
import { getRequest } from '@/lib/apiRequest'
import React from 'react'

export default async function supplier() {
  const supplier = await getRequest('supplier');
  
 const columns = ['title', 'phone', 'email']
  return (
    
    <>
      <FixedHeader title={'supplier'} newLink={'/overview/supplier/new'} wantButton={false} />
      <div className="my-4 p-8">
        <DataTable data={supplier} columns={columns}/>
      </div>

    </>
  )
}
