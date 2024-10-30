'use client'
import { PlusCircle } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import React from 'react'

export default function CollapsibleLink({title, href}) {
  const pathName = usePathname();
  return (
    <Link
        className={`flex items-center justify-between w-10/12 ml-5 px-3 py-2 transition-colors duration-300 transform rounded-lg ${pathName.includes(`${href}`) ? 'text-gray-100 bg-gray-700' : 'text-gray-300 hover:bg-gray-800 hover:text-gray-200 '}`}
        href={href}
    >
        <span className="text-sm">{title}</span>
        <PlusCircle className='w-4 h-4'/>
    </Link>
  )
}
