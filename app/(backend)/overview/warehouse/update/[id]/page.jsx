import React from 'react'
import NewWarehouse from '../../new/page'
import { getRequest } from '@/lib/apiRequest';

export default async function UpdateWarehouse({params:{id}}) {
    const data = await getRequest(`warehouse/${id}`);
  return (
    <>
        <NewWarehouse initialData={data} isUpdate={true}/>
    </>
  )
}
