import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function Logo() {
    return (
        <Link href={'/'}>
            <Image
                src={'/downloads/enrich-kitchen-studio.jpeg'}
                width={160}  // Default width for larger devices
                height={55}  // Default height for larger devices
                alt="Enrich Kitchen Studio Logo"
                className="w-[160px] h-[55px] sm:w-[140px] sm:h-[50px] md:w-[160px] md:h-[55px] lg:w-[180px] lg:h-[60px]" // Responsive classes
            />
        </Link>
    )
}
