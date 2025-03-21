'use client';
import { useState, useMemo, useCallback } from 'react';
import { Package, Warehouse, Menu, WarehouseIcon, Users, Truck, ClipboardCheck, Plus, House } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

export default function Sidebar() {
  const pathName = usePathname();
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  // Toggle sidebar state
  const toggleSidebar = useCallback(() => setSidebarOpen(prev => !prev), []);

  // Define sidebar links with useMemo to avoid recalculating on each render
  const sideBarLinks = useMemo(() => [
    { title: 'Home', icon: <House className="w-5 h-5"/>, href: '/overview/home/dashboard' },
    { title: 'New', icon: <Plus className="w-5 h-5" />, href: '/overview/inventory' },
    { title: 'Items', icon: <Package className="w-5 h-5" />, href: '/overview/items/' },
    { title: 'Adjustments', icon: <Truck className="w-5 h-5" />, href: '/overview/inventoryadjustment' },
    { title: 'Warehouse', icon: <WarehouseIcon className="w-5 h-5" />, href: '/overview/warehouse' },
    { title: 'Supplier', icon: <Users className="w-5 h-5" />, href: '/overview/supplier' },
    { title: 'Client', icon: <ClipboardCheck className="w-5 h-5" />, href: '/overview/invoice' },
  ], []);

  return (
    <>
      {/* Toggle button for smaller screens */}
      <button onClick={toggleSidebar} className={clsx(
        'md:hidden p-1.5 bg-gray-800 text-gray-200 fixed top-2 z-50 rounded-md',
        { 'left-60': isSidebarOpen, 'left-4': !isSidebarOpen }
      )}>
        <Menu className="w-5 h-5" />
      </button>

      {/* Sidebar */}
      <aside className={clsx(
        'min-h-screen fixed inset-y-0 left-0 z-40 w-72 bg-gray-900 text-gray-50 transform transition-transform duration-300',
        { 'translate-x-0': isSidebarOpen, '-translate-x-full': !isSidebarOpen, 'md:translate-x-0': true }
      )}>
        {/* Top */}
        <div className="flex flex-row h-12 items-center gap-2 bg-slate-950 px-5">
          <Warehouse />
          <h1 className='text-xl'>Inventory</h1>
        </div>

        {/* Mid */}
        <nav className="flex-1 -mx-3 space-y-3 px-5 mt-10">
          {sideBarLinks.map((item, i) => (
            <Link href={item.href} key={i} className={clsx(
              'flex items-center px-3 py-2 transition-colors duration-300 transform rounded-lg w-full',
              pathName.includes(item.href) ? 'text-gray-100 bg-gray-700' : 'text-gray-300 hover:bg-gray-800 hover:text-gray-200'
            )}>
              {item.icon}
              <span className="mx-2 text-sm font-medium">{item.title}</span>
            </Link>
          ))}
        </nav>
      </aside>

      {/* Overlay for closing sidebar on smaller screens */}
      {isSidebarOpen && <div onClick={toggleSidebar} className="fixed inset-0 z-30 bg-black opacity-50 md:hidden"></div>}
    </>
  );
}
