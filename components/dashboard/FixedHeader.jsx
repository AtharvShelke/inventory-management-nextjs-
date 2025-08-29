
import { Plus } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

// FixedHeader Component
const FixedHeader = ({ newLink, title }) => {
    return (
        <div className="flex justify-between items-center py-4 px-5 bg-white shadow">
            <button className="text-xl font-semibold">All {title}</button>
            <div className="flex gap-4">
                {/* Conditionally render the "New" button if newLink is passed */}
                {newLink && (
                    <Link
                        href={newLink}
                        className="py-1 px-2 bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 hover:bg-blue-800 flex items-center space-x-2 text-white font-semibold"
                    >
                        <Plus className="w-4 h-4" />
                        <span>New</span>
                    </Link>
                )}
            </div>
        </div>
    );
}

export default FixedHeader;
