import { Bell, ChevronDown, Grip, History, Plus, Settings, Users } from 'lucide-react'
import React from 'react'
import SearchInput from './SearchInput'
import Image from 'next/image'

export default function Header() {
  return (
    <div className='bg-gray-100 h-12 flex items-center justify-between pl-20 border-b border-slate-200'>
      <div className="flex justify-center gap-5 w-5/6">
        <h1 className='font-semibold text-2xl'>Enrich Kitchen Studio</h1>
      </div>
      <div className="flex">
        {/* plus */}
        <div className=' flex flex-row'>
          
         

          <div className="pl-2 border-l border-gray-300 flex items-center">
            <button className="rounded-lg flex items-center">
              <span>Atharv</span>
              <ChevronDown className='h-4' />
            </button>

          </div>



        </div>
      </div>
    </div>
  )
}
