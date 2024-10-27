import { Bell, ChevronDown, Grip, History, Plus, Settings, Users } from 'lucide-react'
import React from 'react'
import SearchInput from './SearchInput'
import Image from 'next/image'

export default function Header() {
  return (
    <div className='bg-gray-100 h-12 flex items-center justify-between px-8 border-b border-slate-200'>
      <div className="flex gap-5">
        {/* recent activities */}
        <button>
          <History className='w-5 h-5 ' />
        </button>
        
        <SearchInput />
      </div>
      <div className="flex">
        {/* plus */}
        <div className=' flex flex-row'>
          <div className="px-2 border-r border-gray-300 flex items-center">
            <button className="p-1 bg-blue-600 rounded-lg">
              <Plus className='text-slate-50 w-4 h-4' />
            </button>
          </div>
          <div className="px-2 border-r border-gray-300 flex items-center">
            <button className="mx-1 rounded-lg">
              <Users className='text-slate-900 w-4 h-4' />
            </button>
            <button className="mx-1 rounded-lg">
              <Bell className='text-slate-900 w-4 h-4' />
            </button>
            <button className="mx-1 rounded-lg">
              <Settings className='text-slate-900 w-4 h-4' />
            </button>
          </div>
          <div className="pl-2 border-r border-gray-300 flex items-center">
            <button className="rounded-lg flex items-center">
              <span>Atharv</span>
              <ChevronDown className='h-4'/>
            </button>
            
          </div>
          <div className="px-2 border-r border-gray-300 flex items-center">
            <button className="mx-1 rounded-lg flex items-center">
              <Image 
                src='/user.png'
                height={225}
                width={227}
                className='w-8 h-8 rounded-full border border-slate-900'
                alt='user png'
              />
            </button>
            
          </div>
          <div className="pl-2  flex items-center">
            <button className="mx-1 rounded-lg flex items-center">
            <Grip className='w-6 h-6'/>
            </button>
            
          </div>

        </div>
      </div>
    </div>
  )
}
