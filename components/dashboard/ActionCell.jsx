import { Pencil } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import RedModal from './RedModal';
import { Button } from '@/components/ui/button';

export const ActionCell = ({ item, resourceName, onDelete, isTable }) => {
  const actions = (
    <div className="flex items-center gap-2">
      <Button variant="ghost" size="sm" asChild>
        <Link
          href={`/${resourceName}/update/${item.id}`}
          className="text-blue-600 hover:text-blue-700"
        >
          <Pencil className="h-4 w-4 mr-1" />
          <span>Edit</span>
        </Link>
      </Button>
      <RedModal endpoint={`${resourceName}/${item.id}`} onDelete={onDelete} />
    </div>
  );

  if (isTable) {
    return <td className="px-6 py-4">{actions}</td>;
  }

  return actions;
};
