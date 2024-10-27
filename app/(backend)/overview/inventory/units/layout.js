import InventoryNav from '@/components/dashboard/InventoryNav'
import React from 'react'

export default function Layout({children}) {
  return (
    <div >
      <InventoryNav/>
      
        {children}
    </div>
  )
}