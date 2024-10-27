'use client';
import { Building2} from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

export default function InventoryNav() {
    const pathName = usePathname();

    const navLinks = [
        {
            title:'Items',
            href:'/overview/inventory/items/new'
        },
        {
            title:'Categories',
            href:'/overview/inventory/categories/new'
        },
        {
            title:'Inventory Adjustments',
            href:'/overview/inventory/inventoryadjustment'
        },
        {
            title:'Brands',
            href:'/overview/inventory/brands/new'
        },
        {
            title:'Units',
            href:'/overview/inventory/units/new'
        },
        {
            title:'Warehouse',
            href:'/overview/inventory/warehouse/new'
        },
        
    ]
    return (
        <div className="flex flex-col justify-between pt-4 pl-5">

            
            <nav className='sticky bottom-0 flex flex-row w-full gap-10 '>
                {
                    navLinks.map((item, i)=>(
                        <Link key={i} href={item.href} className={`${pathName===item.href?'pb-3 border-b-2 border-blue-600':'pb-3'}`}>{item.title}</Link>
                    ))
                }
                
            </nav>
        </div>
    )
}
