'use client';

import InventoryAdjustmentAdd from '@/components/dashboard/InventoryAdjustmentAdd';
import TransferInventoryForm from '@/components/dashboard/TransferInventoryForm';
import { Minus, Plus } from 'lucide-react';
import React, { useState, useCallback } from 'react';
import { getRequest } from '@/lib/apiRequest';
import { toast } from 'react-hot-toast';
import { Alert } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';

export default function InventoryAdjustment({ items, warehouses }) {
  const tabs = [
    { title: "Add Stock", icon: Plus, form: 'add' },
    { title: "Transfer Stock", icon: Minus, form: 'transfer' },
  ];

  const [activeForm, setActiveForm] = useState('add');
  const [batchOperation, setBatchOperation] = useState(false);

  const handleTabChange = useCallback((form) => {
    setActiveForm(form);
  }, []);

  const renderForm = () => {
    if (activeForm === 'add') {
      return <InventoryAdjustmentAdd warehouses={warehouses} items={items} />;
    }
    return <TransferInventoryForm warehouse={warehouses} items={items} />;
  };

  // Add validation for stock transfers
  const handleTransfer = useCallback(async (data) => {
    // Get current stock level
    const item = await getRequest(`items/${data.itemId}`);
    if (item.qty < data.transferStockQty) {
      toast.error('Insufficient stock for transfer');
      return false;
    }
    return true;
  }, []);

  return (
    <>
      <div className="border-b border-gray-200 w-full max-w-4xl px-4 bg-white sm:px-6 md:px-8 mx-auto my-3">
        <ul className="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 ">
          {tabs.map((tab) => (
            <li className="me-2" key={tab.form}>
              <button
                onClick={() => handleTabChange(tab.form)}
                className={`inline-flex items-center justify-center p-4 border-b-2 rounded-t-lg ${
                  activeForm === tab.form
                    ? "text-blue-600 border-blue-600"
                    : "border-transparent hover:text-gray-600"
                }`}
                aria-current={activeForm === tab.form ? "page" : undefined}
              >
                <tab.icon className={`${activeForm === tab.form ? "text-blue-600" : "text-gray-400"}`} />
                {tab.title}
              </button>
            </li>
          ))}
        </ul>
      </div>
      {renderForm()}

      <div className="space-y-4">
        {/* Batch Operations */}
        <div className="flex justify-end">
          <Button onClick={() => setBatchOperation(true)}>
            Batch Update
          </Button>
        </div>

        {/* Stock Alerts */}
        <div className="grid gap-2">
          <Alert variant="destructive">
            Critical Stock Level
          </Alert>
          <Alert variant="warning">
            Low Stock Warning
          </Alert>
        </div>

        {/* Enhanced Filter Options */}
        <div className="flex gap-2">
          <select className="form-select">
            <option>Filter by Category</option>
          </select>
          <select className="form-select">
            <option>Sort by Stock Level</option>
          </select>
        </div>
      </div>
    </>
  );
}
