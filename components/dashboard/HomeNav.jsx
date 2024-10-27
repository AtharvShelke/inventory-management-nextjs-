'use client';
import { Building2} from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

export default function HomeNav() {
    const pathName = usePathname();

    const navLinks = [
        {
            title:'Dashboard',
            href:'/overview/home/dashboard'
        },
        {
            title:'Getting Started',
            href:'/overview/home/getting-started'
        },
        {
            title:'Announcements',
            href:'/overview/home/announcements'
        },
        {
            title:'Recent Updates',
            href:'/overview/home/updates'
        },
    ]
    return (
        <div className=" h-32 flex flex-col justify-between pt-4 pl-5">

            <div className="flex space-x-3">
                <div className="flex w-12 h-12 rounded-lg bg-white items-center justify-center ">
                    <Building2 />
                </div>
                <div className="flex items-center">
                    <p className='font-semibold'>Hello, Atharv</p>
                </div>
            </div>
            <nav className='sticky bottom-0 flex flex-row w-full gap-10 '>
                {
                    navLinks.map((item, i)=>(
                        <Link key={i} href={item.href} className={` ${pathName===item.href?'pb-3 border-b-2 border-blue-600':'pb-3'} transition-all duration-300`}>{item.title}</Link>
                    ))
                }
                
            </nav>
        </div>
    )
}
