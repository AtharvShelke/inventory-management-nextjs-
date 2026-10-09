'use client';

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Sidebar from '@/components/dashboard/Sidebar';
import Header from '@/components/dashboard/Header';
import { cn } from '@/lib/utils';

export default function Layout({ children }) {
  const { data: session, status } = useSession();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Handle responsive behavior
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile) {
        setIsSidebarOpen(false);
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Prevent body scroll when mobile sidebar is open
  useEffect(() => {
    if (isMobile && isSidebarOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobile, isSidebarOpen]);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className="flex h-screen w-screen max-w-full overflow-hidden bg-slate-50/50">
      {/* Sidebar */}
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={closeSidebar}
        isMobile={isMobile}
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
      />

      {/* Overlay for mobile */}
      {isMobile && isSidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 backdrop-blur-sm transition-opacity md:hidden"
          onClick={closeSidebar}
          aria-hidden="true"
        />
      )}

      {/* Main content wrapper - dynamically adjusts with collapsed state, never overflows screen */}
      <div
        className={cn(
          'flex-1 flex flex-col h-screen min-w-0 max-w-full overflow-hidden transition-all duration-300',
          isCollapsed ? 'md:ml-20' : 'md:ml-72'
        )}
      >
        {/* Header */}
        <Header onMenuClick={toggleSidebar} isSidebarOpen={isSidebarOpen} />

        {/* Main scrollable content */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden min-w-0 w-full">
          <div className="w-full max-w-7xl mx-auto p-3 sm:p-5 md:p-6 lg:p-8 space-y-6">
            {children}
          </div>
        </main>

        {/* Footer */}
        <footer className="flex-shrink-0 py-2.5 px-6 border-t bg-white/80 backdrop-blur-sm text-center text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} Enrich Furniture & Kitchen Studio. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}
