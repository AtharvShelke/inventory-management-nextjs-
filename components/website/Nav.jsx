'use client'
import Link from 'next/link';
import { usePathname } from 'next/navigation'
import React from 'react'
import { motion } from 'framer-motion'; 
export default function ({ containerStyles, linkStyles, underlineStyles }) {
    const pathName = usePathname();
    console.log(pathName)
    const links = [
        {path:'/', name:'home'},
        {path:'/about', name:'about'},
        {path:'/gallery', name:'gallery'},
        {path:'/project', name:'project'},
        {path:'/contact', name:'contact'},
        {path:'/overview/home/dashboard', name:'dashboard'},
    ]

  return (
    <nav className={`${containerStyles}`}>
        {
            links.map((link, index)=>{
                return (
                    <Link href={link.path} key={index} className={`uppercase ${linkStyles}`}>
                        {link.path === pathName && (
                            <motion.span
                             initial={{ y:'-100%' }}
                             animate={{ y:0 }}
                             transition={{ type:'tween' }}
                             layoutId='underline'
                             className={`${underlineStyles}`}
                             />
                             
                        )}{link.name}
                    </Link>
                )
            })
        }
    </nav>
  )
}
