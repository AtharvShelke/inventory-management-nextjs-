import HomeNav from '@/components/dashboard/HomeNav'
import React from 'react'

export default function Layout({children}) {
  return (
    <div >
        <HomeNav/>
        {children}
    </div>
  )
}
