'use client';

import { ExternalLink, Pencil, Trash2 } from 'lucide-react';
import Link from 'next/link';
import React, { useCallback } from 'react';
import RedModal from './RedModal';

// Memoizing the table row to avoid unnecessary re-renders
const TableRow = React.memo(({ item, columns, resourceName, onDelete }) => {
  return (
    <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
      {columns.map((columnName, colIndex) => (
        <td key={colIndex} className="px-6 py-4">
          {item[columnName]}
        </td>
      ))}
      <td className="px-6 py-4 flex items-center space-x-4">
        <Link href={`invoice/${item.id}`} className="font-medium text-blue-600 dark:text-blue-500 flex items-center space-x-1">
          <ExternalLink className="w-4 h-4" />
          <span>Open</span>
        </Link>
        <RedModal
          endpoint={`${resourceName}/${item.id}`}
          onDelete={onDelete(item.id)}  // Avoid inline function definition here
        />
      </td>
    </tr>
  );
});

export default function InvoiceTable({ data, columns, resourceName, setData }) {
  // Memoizing the delete handler to prevent re-creation on each render
  const handleDelete = useCallback(
    (id) => () => {
      setData((prevData) => prevData.filter((i) => i.id !== id));
    },
    [setData]
  );

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            {columns.map((item, i) => (
              <th key={i} scope="col" className="px-6 py-3">
                {item}
              </th>
            ))}
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <TableRow
              key={item.id}  // Using item.id as the unique key for each row
              item={item}
              columns={columns}
              resourceName={resourceName}
              onDelete={handleDelete}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
