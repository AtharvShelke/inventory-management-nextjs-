import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function Logo() {
    return (
        <>
            <Link href={'/'}>
                <h1>Enrich Kitchen Studio</h1>
            </Link>
            {/* <Image
        src={logo}
        width={160}
        height={55}
        alt=""/> */}
        </>
    )
}
