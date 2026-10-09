import { Plus } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import { Button } from '@/components/ui/button';

const FixedHeader = ({ newLink, title }) => {
  return (
    <div className="flex flex-wrap gap-3 justify-between items-center py-2 px-0.5 mb-2">
      <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-800">
        {title === 'Item' ? 'Inventory Items' :
          title === 'User' ? 'System Users' :
          title === 'Consolidated Inventory Hub' ? 'Consolidated Inventory Hub' :
          title === 'Invoices & Billing' ? 'Invoices & Billing' :
          `All ${title}s`}
      </h2>
      {newLink && (
        <Link href={newLink}>
          <Button className="shadow-md hover:shadow-lg transition-all duration-200 gap-2 text-sm bg-blue-600 hover:bg-blue-500 text-white">
            <Plus className="w-4 h-4" />
            <span>New {title === 'Item' ? 'Item' : title === 'Consolidated Inventory Hub' ? 'Item' : title === 'Invoices & Billing' ? 'Invoice' : title}</span>
          </Button>
        </Link>
      )}
    </div>
  );
};

export default FixedHeader;
