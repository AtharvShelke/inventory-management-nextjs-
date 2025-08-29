'use client'

import { useState } from 'react'
import { Table } from '@/components/ui/table'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { 
  ChevronLeftIcon, 
  ChevronRightIcon, 
  SearchIcon 
} from 'lucide-react'

export function DataTable({ 
  data,
  columns,
  searchable = true,
  pagination = true,
  pageSize = 10
}) {
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')

  const filteredData = data.filter(item => 
    Object.values(item).some(val => 
      val?.toString().toLowerCase().includes(search.toLowerCase())
    )
  )

  const pageCount = Math.ceil(filteredData.length / pageSize)
  const paginatedData = filteredData.slice(
    (page - 1) * pageSize,
    page * pageSize
  )

  return (
    <div className="space-y-4">
      {searchable && (
        <div className="flex justify-between items-center">
          <div className="relative w-72">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search..."
              className="pl-10"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
      )}

      <div className="rounded-lg border border-gray-200 overflow-hidden">
        <Table>
          <Table.Header>
            {columns.map((column) => (
              <Table.Column key={column.key}>{column.label}</Table.Column>
            ))}
          </Table.Header>
          <Table.Body>
            {paginatedData.map((row, i) => (
              <Table.Row key={i}>
                {columns.map((column) => (
                  <Table.Cell key={column.key}>
                    {column.render ? column.render(row) : row[column.key]}
                  </Table.Cell>
                ))}
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>

      {pagination && (
        <div className="flex justify-between items-center">
          <p className="text-sm text-gray-600">
            Showing {((page - 1) * pageSize) + 1} to {Math.min(page * pageSize, filteredData.length)} of {filteredData.length} entries
          </p>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
            >
              <ChevronLeftIcon className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage(p => Math.min(pageCount, p + 1))}
              disabled={page === pageCount}
            >
              <ChevronRightIcon className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}