import FixedHeader from '@/components/dashboard/FixedHeader'

import OptionCard from '@/components/dashboard/OptionCard'
import { Archive, Boxes, Group, HandCoins, Package, Package2, PackageOpen, ReceiptIndianRupee, Shirt, Truck, User2, Users, WarehouseIcon } from 'lucide-react'
import React from 'react'
import Warehouse from '../warehouse/page'

export default function Inventory() {
  const itemsCardOptions = [
    {
      title: 'Items',
      Icon: Package,
      description: 'New Item',

      href: '/overview/items/new',
      linkTitle: 'New Item',
      enabled: true,
    },  {
      title: 'Warehouse',
      Icon: WarehouseIcon,
      description: 'New Warehouse',

      href: '/overview/warehouse/new',
      linkTitle: 'New Warehouse',
      enabled: true,
    },
    {
      title: 'Suppliers',
      Icon: Users,
      description: 'New Supplier',

      href: '/overview/supplier/new',
      linkTitle: 'New Supplier',
      enabled: true,
    },
    {
      title: 'Adjustments',
      Icon: Truck,
      description: 'Transfer Stock from the main warehouse',

      href: '/overview/inventoryadjustment/new',
      linkTitle: 'New Adjustment',
      enabled: true,
    }

  ]
  return (
    <>
      <FixedHeader newLink={"/overview/items/new"} title={'Item'}/>
      <div className='grid grid-col-1 md:grid-cols-2 m-6 gap-6'>

        {itemsCardOptions.map((item, i) => (
          <OptionCard key={i} optionData={item} />
        ))}

      </div>

    </>


  )
}
