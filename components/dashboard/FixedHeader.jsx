import { HelpCircle, LayoutGrid, List, MoreHorizontal, Plus } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export default function FixedHeader({newLink}) {
  return (
    <div className="flex justify-between items-center py-4 px-5 bg-white shadow">
        <button className='text-xl font-semibold'>All Items</button>
        <div className="flex gap-4">
            {/* New */}
            
            <Link href={newLink} className="py-1 px-2 bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800  flex items-center space-x-2 text-white font-semibold ">
              <Plus className='w-4 h-4' />
              <span>New</span>
            </Link>
          
            {/* Layout */}
            <div className="flex rounded-md overflow-hidden">
                <button className='bg-gray-300 p-2 border-r border-gray-400'>
                    <List className='w-4 h-4 '/>
                </button>
                <button className='bg-gray-100 p-2'>
                    <LayoutGrid className='w-4 h-4 '/>
                </button>
            </div>
            <button className='bg-gray-100 p-2 rounded-md'>
                <MoreHorizontal className='w-4 h-4 '/>
            </button>
            <button className='bg-gray-100 p-2 rounded-md'>
                <HelpCircle className='w-4 h-4 '/>
            </button>
            
        </div>
    </div>
  )
}
