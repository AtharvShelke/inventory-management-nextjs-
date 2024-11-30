'use client'
import React, { useEffect, useState } from 'react'
import Logo from './Logo'
import Nav from './Nav'
import MobileNavigation from './MobileNavigation'
import { usePathname } from 'next/navigation'



export default function Header() {
    const [header, setHeader] = useState(false)
    const pathName = usePathname();
    useEffect(()=>{
        const scrollYPos = window.addEventListener('scroll', ()=>{
            window.scrollY>50?setHeader(true):setHeader(false);
        });
        return ()=>window.removeEventListener('scroll', scrollYPos)
    })
  return (
    <header 
    className={`${header ? 'py-4 bg-tertiary shadow-lg':'py-6'} sticky top-0 z-30 transition-all ${pathName === '/' && 'bg-[#fff'}`}>
        <div className='container mx-auto'>
            <div className='flex items-center justify-between'>
                <Logo/>
                <div className='flex items-center gap-x-6'>
                    <Nav
                        containerStyles='hidden lg:flex gap-x-8 items-center'
                        linkStyles='relative hover:text-primary transition-all cursor-pointer'
                        underlineStyles='absolute left-0 top-full h-[2px] bg-primary w-full'
                        />
                    <div className='lg:hidden'><MobileNavigation/></div>
                </div>
            </div>
        </div>
    </header>
  )
}
