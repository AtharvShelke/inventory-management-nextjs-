import FixedHeader from '@/components/dashboard/FixedHeader'

import OptionCard from '@/components/dashboard/OptionCard'
import { Archive, Boxes, Group, HandCoins, Package, Package2, PackageOpen, ReceiptIndianRupee, Shirt, WarehouseIcon } from 'lucide-react'
import React from 'react'
import Warehouse from './warehouse/page'

export default function Inventory() {
  const itemsCardOptions = [
    {
      title:'Items',
      icon: <Package strokeWidth={'0.5px'} className='w-28 h-28' />,
      description:'New Item',
      
      href:'/overview/inventory/items/new',
      linkTitle:'New Item',
      enabled:true,
  },{
      title:'Categories',
      icon: <Boxes strokeWidth={'0.5px'} className='w-28 h-28' />,
      description:'New Category',
      
      href:'/overview/inventory/categories/new',
      linkTitle:'New Category',
      enabled:true,
  },{
    title:'Brands',
    icon: <Group strokeWidth={'0.5px'} className='w-28 h-28' />,
    description:'New Brand',
    
    href:'/overview/inventory/brands/new',
    linkTitle:'New Brand',
    enabled:true,
},{
  title:'Warehouse',
  icon: <WarehouseIcon strokeWidth={'0.5px'} className='w-28 h-28' />,
  description:'New Warehouse',
  
  href:'/overview/inventory/warehouse/new',
  linkTitle:'New Warehouse',
  enabled:true,
},
{
  title:'Units',
  icon: <PackageOpen strokeWidth={'0.5px'} className='w-28 h-28' />,
  description:'New Unit',
  
  href:'/overview/inventory/units/new',
  linkTitle:'New Unit',
  enabled:true,
},
    
]
  return (
    <>
    <FixedHeader newLink={"/overview/inventory/items/new"}/>
    <div className='grid grid-col-1 lg:grid-cols-2 m-6 gap-6'>
      
      {itemsCardOptions.map((item,i)=>(
        <OptionCard key={i} optionData={item}/>
      ))}
      
    </div>
    
    </>
    
    
  )
}
