'use client';

import { ExternalLink } from 'lucide-react';
import Link from 'next/link';
import React, { useCallback } from 'react';
import RedModal from './RedModal';

// Memoizing the table row to avoid unnecessary re-renders
const TableRow = React.memo(({ item, columns, resourceName, onDelete }) => {
  return (
    <tr className="odd:bg-white  even:bg-gray-50  border-b ">
      {columns.map((columnName, colIndex) => (
        <td key={colIndex} className="px-6 py-4">
          {item[columnName]}
        </td>
      ))}
      <td className="px-6 py-4 flex items-center space-x-4">
        <Link href={`invoice/${item.id}`} className="font-medium text-blue-600  flex items-center space-x-1">
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
    <div className="relative overflow-x-auto max-w-full shadow-md sm:rounded-lg">
      {/* Desktop Table View */}
      <table className="hidden sm:table w-full text-sm text-left rtl:text-right text-gray-500 ">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50  ">
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

      {/* Mobile View - Card Layout */}
      <div className="sm:hidden">
        {data.map((item) => (
          <div key={item.id} className="mb-4 bg-white border border-gray-200 rounded-lg ">
            {columns.map((columnName, colIndex) => (
              <div key={colIndex} className="flex justify-between px-4 py-2 text-sm border-b ">
                <span className="font-medium text-gray-700 ">{columnName}</span>
                <span className="text-gray-500 ">{item[columnName]}</span>
              </div>
            ))}
            <div className="flex justify-between px-4 py-2">
              <span className="font-medium text-gray-700 ">Action</span>
              <div className="flex items-center space-x-4">
                <Link href={`invoice/${item.id}`} className="font-medium text-blue-600  flex items-center space-x-1">
                  <ExternalLink className="w-4 h-4" />
                  <span>Open</span>
                </Link>
                <RedModal
                  endpoint={`${resourceName}/${item.id}`}
                  onDelete={handleDelete(item.id)}  // Avoid inline function definition here
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
