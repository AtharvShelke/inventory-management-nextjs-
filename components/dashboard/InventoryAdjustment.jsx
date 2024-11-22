'use client';

import InventoryAdjustmentAdd from '@/components/dashboard/InventoryAdjustmentAdd';
import TransferInventoryForm from '@/components/dashboard/TransferInventoryForm';
import { Minus, Plus } from 'lucide-react';
import React, { useState } from 'react';

export default function InventoryAdjustment({items, warehouses}) {
    const tabs = [
        { title: "Add Stock", icon: Plus, form: 'add' },
        { title: "Transfer Stock", icon: Minus, form: 'transfer' },
    ];

    const [activeForm, setActiveForm] = useState('add');
    // console.log('items in inventory adjustments:', items)
    return (
        <>
            
            <div className="border-b border-gray-200 w-full max-w-4xl px-4 bg-white sm:px-6 md:px-8 mx-auto my-3">
                <ul className="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400">
                    {tabs.map((tab, i) => (
                        <li className="me-2" key={i}>
                            <button 
                                onClick={() => setActiveForm(tab.form)} 
                                className={`${activeForm === tab.form ? "inline-flex items-center justify-center p-4 text-blue-600 border-b-2 border-blue-600 rounded-t-lg" : "inline-flex items-center justify-center p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600"}`}
                                aria-current={activeForm === tab.form ? "page" : undefined}
                            >
                                <tab.icon className={`${activeForm === tab.form ? "text-blue-600" : "text-gray-400"}`} />
                                {tab.title}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
            {activeForm === "add" ? <InventoryAdjustmentAdd warehouses={warehouses} items={items} /> : <TransferInventoryForm warehouse={warehouses} items={items} />}
        </>
    );
}
