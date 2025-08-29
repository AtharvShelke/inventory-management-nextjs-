'use client'

import React, { useState } from 'react';
import { ActionCell } from './ActionCell';
import { Skeleton } from "@/components/ui/skeleton"

const DataTable = ({ data, columns, resourceName, loading = false }) => {
  const [tableData, setTableData] = useState(data);

  const handleDelete = (id) => {
    setTableData((prevData) => prevData.filter((item) => item.id !== id));
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
      </div>
    );
  }

  if (!tableData.length) {
    return (
      <div className="text-center py-10 text-gray-500">
        No data available
      </div>
    );
  }

  return (
    <div className="relative overflow-x-auto max-w-full shadow-md sm:rounded-lg">
      {/* Table View */}
      <table className="hidden sm:table w-full text-sm text-left rtl:text-right text-gray-600">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
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
          {tableData.map((item, rowIndex) => (
            <tr
              key={rowIndex}
              className="odd:bg-white even:bg-gray-50 border-b border-gray-200"
            >
              {columns.map((columnName, colIndex) => (
                <td key={colIndex} className="px-6 py-4">
                  {item[columnName] || '-'}
                </td>
              ))}
              <ActionCell
                item={item}
                resourceName={resourceName}
                onDelete={() => handleDelete(item.id)}
                isTable={true}
              />
            </tr>
          ))}
        </tbody>
      </table>

      {/* Responsive Card View */}
      <div className="sm:hidden">
        {tableData.map((item, rowIndex) => (
          <div
            key={rowIndex}
            className="mb-6 border border-gray-300 rounded-lg shadow-md overflow-hidden"
          >
            {columns.map((columnName, colIndex) => (
              <div
                key={colIndex}
                className={`flex justify-between items-center px-4 py-3 ${
                  colIndex % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                }`}
              >
                <span className="font-medium text-gray-800">{columnName}</span>
                <span className="text-gray-600">
                  {item[columnName] || '-'}
                </span>
              </div>
            ))}
            <div className="flex justify-between items-center px-4 py-3 bg-gray-100">
              <span className="font-medium text-gray-800">Action</span>
              <ActionCell
                item={item}
                resourceName={resourceName}
                onDelete={() => handleDelete(item.id)}
                isTable={false}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DataTable;
