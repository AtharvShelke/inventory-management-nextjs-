'use client'
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';


export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session, status } = useSession(); 
  const router = useRouter()
  if (status==='loading') {
    return <p>Loading User...</p>
  }
  if (status==='unauthenticated') {
    router.push('/login')
  }
  const username = session?.user?.name??'';
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };


  return (
    <div className="bg-gray-100 h-12 flex items-center justify-between pl-20 border-b border-slate-200">
      <div className="flex justify-center gap-5 w-5/6">
        <h1 className="font-semibold text-2xl">Enrich Kitchen Studio</h1>
      </div>
      <div className="flex">
        {/* plus */}
        <div className="flex flex-row">
          <div className="relative inline-block text-left">
            {/* Dropdown button */}
            <button
              onClick={toggleDropdown}
              className="flex items-center justify-between w-full py-2 px-3 border-l border-gray-300 text-gray-700 rounded hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
            >
              {username}
              <svg
                className="w-4 h-4 ml-2"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Dropdown menu */}
            {isOpen && (
              <div className="absolute right-0 z-10 mt-2 w-44 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg dark:bg-gray-700 dark:divide-gray-600">
                
                  
                <div className="py-1">
                  <button
                    onClick={()=>{signOut()}}
                    className="block px-4 py-2 w-full text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                  >
                    Sign out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
      
  );
}
