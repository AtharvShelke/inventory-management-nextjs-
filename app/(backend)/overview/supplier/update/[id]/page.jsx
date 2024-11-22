import React from 'react'
import NewSupplier from '../../new/page'
import { getRequest } from '@/lib/apiRequest'

export default async function UpdateSupplierPage({params:{id}}) {
    const data = await getRequest(`supplier/${id}`);

  return (
    <>
        <NewSupplier initialData={data} isUpdate={true}/>
    </>
  )
}
