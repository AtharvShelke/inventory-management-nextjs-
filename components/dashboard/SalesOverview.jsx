import { CheckCircle2 } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export default function SalesOverview() {
    const salesActivity = [
        {
            title: 'To be Packed',
            number: 10,
            unit: "Qty",
            href: '',
            color: 'text-blue-600'
        },
        {
            title: 'To be Shipped',
            number: 10,
            unit: "Qty",
            href: '',
            color: 'text-red-600'
        },
        {
            title: 'To be Delivered',
            number: 10,
            unit: "Packages",
            href: '',
            color: 'text-green-600'
        },
        {
            title: 'To be Invoiced',
            number: 10,
            unit: "Qty",
            href: '',
            color: 'text-orange-600'
        },
    ]
    const inventorySummary = [
        {
            title: "Quantity in Hand",
            number: 10
        },
        {
            title: "Quantity to be Recieved",
            number: 10
        },

    ]
    return (
        <div className='bg-blue-100 border-b border-slate-200 p-8 grid grid-cols-12 gap-8'>
            {/* Sales Activity */}
            <div className="col-span-8">
                <h2 className='mb-6 text-xl'>Sales Activity</h2>
                <div className="grid grid-cols-4 gap-4">

                    {
                        salesActivity.map((item, i) => (
                            <Link href={item.href} key={i} className={`rounded-lg bg-white border border-slate-200 hover:border-blue-300 px-3 py-4 cursor-pointer flex items-center flex-col gap-3 transition-all duration-300`}>
                                <h3 className={`font-semibold text-3xl ${item.color}`}>{item.number}</h3>
                                <small className='text-slate-500'>{item.unit}</small>
                                <div className="flex items-center space-x-2">
                                    <CheckCircle2 className='w-4 h-4' />
                                    <span className='uppercase'>{item.title}</span>
                                </div>
                            </Link>
                        ))
                    }


                </div>
            </div>
            {/* Inventory Summary */}
            <div className="col-span-4">
            <h2 className='mb-6 text-xl'>Inventory Summary</h2>
                {
                    inventorySummary.map((item, i) => (
                        
                            
                            <div key={i} className="rounded-lg bg-white  border border-slate-200 hover:border-blue-300 px-8 py-2 cursor-pointer flex items-center justify-between gap-3 transition-all duration-300 text-slate-500 mb-3">
                                <h3 className=''>{item.title}</h3>
                                <h4 className="text-2xl">{item.number}</h4>
                            </div>
                       
                    ))
                }

            </div>
        </div>
    )
}
