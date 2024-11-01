import FixedHeader from '@/components/dashboard/FixedHeader'

import OptionCard from '@/components/dashboard/OptionCard'
import { Archive, Boxes, Group, HandCoins, Package, Package2, PackageOpen, ReceiptIndianRupee, Shirt, Truck, User2, Users, WarehouseIcon } from 'lucide-react'
import React from 'react'
import Warehouse from './warehouse/page'

export default function Inventory() {
  const itemsCardOptions = [
    {
      title: 'Items',
      Icon: Package,
      description: 'New Item',

      href: '/overview/inventory/items/new',
      linkTitle: 'New Item',
      enabled: true,
    }, {
      title: 'Categories',
      Icon: Boxes,
      description: 'New Category',

      href: '/overview/inventory/categories/new',
      linkTitle: 'New Category',
      enabled: true,
    }, {
      title: 'Brands',
      Icon: Group,
      description: 'New Brand',

      href: '/overview/inventory/brands/new',
      linkTitle: 'New Brand',
      enabled: true,
    }, {
      title: 'Warehouse',
      Icon: WarehouseIcon,
      description: 'New Warehouse',

      href: '/overview/inventory/warehouse/new',
      linkTitle: 'New Warehouse',
      enabled: true,
    },
    {
      title: 'Units',
      Icon: PackageOpen,
      description: 'New Unit',

      href: '/overview/inventory/units/new',
      linkTitle: 'New Unit',
      enabled: true,
    },
    {
      title: 'Suppliers',
      Icon: Users,
      description: 'New Supplier',

      href: '/overview/inventory/supplier/new',
      linkTitle: 'New Supplier',
      enabled: true,
    },
    {
      title: 'Inventory Adjustments',
      Icon: Truck,
      description: 'Transfer Stock from the main warehouse',

      href: '/overview/inventory/inventoryadjustment/new',
      linkTitle: 'New Adjustment',
      enabled: true,
    }

  ]
  return (
    <>
      <FixedHeader newLink={"/overview/inventory/items/new"} />
      <div className='grid grid-col-1 lg:grid-cols-3 md:grid-cols-2 m-6 gap-6'>

        {itemsCardOptions.map((item, i) => (
          <OptionCard key={i} optionData={item} />
        ))}

      </div>

    </>


  )
}
