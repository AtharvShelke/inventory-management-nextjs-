import { Plus } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import { Button } from '@/components/ui/button';

// FixedHeader Component
const FixedHeader = ({ newLink, title }) => {
    return (
        <div className="flex justify-between items-center py-5 px-6 mb-4">
            <h2 className="text-2xl font-bold tracking-tight text-slate-800">
                {title === 'Item' ? 'Inventory Items' :
                    title === 'User' ? 'System Users' :
                        `All ${title}s`}
            </h2>
            <div className="flex gap-4">
                {/* Conditionally render the "New" button if newLink is passed */}
                {newLink && (
                    <Link href={newLink}>
                        <Button className="shadow-lg hover:shadow-xl transition-all duration-300 gap-2">
                            <Plus className="w-4 h-4" />
                            <span>New {title}</span>
                        </Button>
                    </Link>
                )}
            </div>
        </div>
    );
}

export default FixedHeader;
