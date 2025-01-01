'use client'

import React, { useState } from 'react';

import { ActionCell } from './ActionCell';

const DataTable = ({ data, columns, resourceName }) => {
  const [tableData, setTableData] = useState(data);

  const handleDelete = (id) => {
    setTableData((prevData) => prevData.filter((item) => item.id !== id));
  };

  return (
    <div className="relative overflow-x-auto max-w-full shadow-md sm:rounded-lg">
      <table className="hidden sm:table w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
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
          {tableData.map((item, rowIndex) => (
            <tr key={rowIndex} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
              {columns.map((columnName, colIndex) => (
                <td key={colIndex} className="px-6 py-4">
                  {item[columnName] || '-'}
                </td>
              ))}
              <ActionCell item={item} resourceName={resourceName} onDelete={() => handleDelete(item.id)} isTable={true} />
            </tr>
          ))}
        </tbody>

      </table>

      {/* Responsive Card View */}
      <div className="sm:hidden">
        {tableData.map((item, rowIndex) => (
          <div key={rowIndex} className="mb-6 border border-gray-300 rounded-lg shadow-md dark:border-gray-700 overflow-hidden">
            {columns.map((columnName, colIndex) => (
              <div key={colIndex} className={`flex justify-between items-center px-4 py-3 ${colIndex % 2 === 0 ? 'bg-gray-50 dark:bg-gray-800' : 'bg-white dark:bg-gray-900'}`}>
                <span className="font-medium text-gray-800 dark:text-gray-400">{columnName}</span>
                <span className="text-gray-600 dark:text-gray-300">{item[columnName] || '-'}</span>
              </div>
            ))}
            <div className="flex justify-between items-center px-4 py-3 bg-gray-100 dark:bg-gray-800">
              <span className="font-medium text-gray-800 dark:text-gray-400">Action</span>
              <ActionCell item={item} resourceName={resourceName} onDelete={() => handleDelete(item.id)} isTable={false} />
            </div>
          </div>
        ))}
      </div>


    </div>
  );
};

export default DataTable;
