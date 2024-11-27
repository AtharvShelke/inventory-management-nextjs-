import { Pencil } from 'lucide-react';
import Link from 'next/link';
import React from 'react'
import RedModal from './RedModal';

export const ActionCell = ({ item, resourceName, onDelete }) => (
    <td className="px-6 py-4 flex items-center space-x-4">
      <Link href={`/overview/${resourceName}/update/${item.id}`} className="font-medium text-blue-600 dark:text-blue-500 flex items-center space-x-1">
        <Pencil className="w-4 h-4" />
        <span>Edit</span>
      </Link>
      <RedModal
        endpoint={`${resourceName}/${item.id}`}
        onDelete={onDelete}
      />
    </td>
  );