import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function Logo() {
    return (
        <Link href={'/'}>
           <Image
  src="/downloads/logo.webp"
  alt="Enrich Kitchen Studio Logo"
  width={160}
  height={49} 
  priority
  className="rounded-lg shadow-lg"
/>


        </Link>
    )
}
