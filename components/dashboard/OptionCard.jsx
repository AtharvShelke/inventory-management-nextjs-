import React from 'react'
import Link from 'next/link'

export default function OptionCard({ optionData }) {
    const { title, Icon, description, href, linkTitle, enabled } = optionData;
    return (
        <div className="shadow-md bg-white flex flex-col items-center justify-center gap-4 py-4 rounded">
            <h2 className='text-xl font-semibold'>{title}</h2>
            <div>
            <Icon strokeWidth={'0.5px'} className='w-28 h-28' />
            </div>
            <p className="line-clamp-1">
                {description}
            </p>
            {enabled ? (
                <Link href={href} className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200  hover:bg-blue-800">

                    {linkTitle}
                </Link>
            ) : (
                <button className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200  hover:bg-blue-800">
                    Enable
                </button>
            )}


        </div>

    )
}
