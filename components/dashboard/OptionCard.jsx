import React from 'react'
import Link from 'next/link'

export default function OptionCard({ optionData }) {
    const { title, icon, description, href, linkTitle, enabled } = optionData;
    return (
        <div className="shadow-md bg-white flex flex-col items-center justify-center gap-4 py-4 rounded">
            <h2 className='text-xl font-semibold'>{title}</h2>
            <div>
                {icon}
            </div>
            <p className="line-clamp-1">
                {description}
            </p>
            {enabled ? (
                <Link href={href} className="py-1 px-2 bg-blue-500 rounded-sm inline-flex items-center space-x-2 text-slate-50 ">

                {linkTitle}
            </Link>
        ) : (
        <button className="py-1 rounded-sm bg-blue-500 px-3 inline-flex text-white">
                Enable
            </button>
        )}


        </div>

    )
}
