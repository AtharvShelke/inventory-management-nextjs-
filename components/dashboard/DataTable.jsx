'use client'

import React, { useState } from 'react';

import { ActionCell } from './ActionCell';



const DataTable = ({ data, columns, resourceName }) => {
  const [tableData, setTableData] = useState(data);

  const handleDelete = (id) => {
    setTableData(prevData => prevData.filter(item => item.id !== id));
  };

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
          {tableData.map((item, rowIndex) => (
            <tr
              key={rowIndex}
              className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
            >
              {columns.map((columnName, colIndex) => (
                <td key={colIndex} className="px-6 py-4">
                  {item[columnName] || '-'}  {/* Handle undefined or null values */}
                </td>
              ))}
              <ActionCell item={item} resourceName={resourceName} onDelete={() => handleDelete(item.id)} />
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
