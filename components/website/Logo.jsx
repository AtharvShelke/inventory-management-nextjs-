import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function Logo() {
    return (
        <Link href={'/'}>
           <Image
    src={'/downloads/logo.webp'} // Use WebP format
    width={160}
    height={55}
    alt="Enrich Kitchen Studio Logo"
    className="w-[160px] h-[55px] sm:w-[140px] sm:h-[50px] md:w-[160px] md:h-[55px] lg:w-[180px] lg:h-[60px]"
    priority // Ensure it loads early
/>

        </Link>
    )
}
