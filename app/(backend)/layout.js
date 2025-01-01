import React from 'react';
import Sidebar from '@/components/dashboard/Sidebar';
import Header from '@/components/dashboard/Header';

export default function Layout({ children }) {
  return (
    <div className="flex min-h-screen ">
      {/* Sidebar */}
      <Sidebar />
      
      {/* Main content */}
      <main className="flex-1 bg-slate-100 md:ml-72">
        <Header />
        <div className="p-4">{children}</div> {/* Wrap children with padding */}
      </main>
    </div>
  );
}
