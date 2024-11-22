
import React from 'react'
import NewItem from '../../new/page'

import { getRequest } from '@/lib/apiRequest';

export default async function UpdatePage({params:{id}}) {
    const data = await getRequest(`items/${id}`);
    
  return (
    <>
        
        <NewItem initialData={data} isUpdate={true}/>

    </>
  )
}
