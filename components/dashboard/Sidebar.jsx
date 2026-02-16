'use client';

import { useState, useMemo, useCallback, useEffect } from 'react';
import {
  Package,
  Warehouse,
  Menu,
  Users,
  Truck,
  ClipboardCheck,
  Plus,
  House,
  ChevronDown,
  Settings,
  LogOut,
  X,
  BarChart3,
  FileText,
  Bell,
  Search,
  Circle,
  ChevronRight,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useSession, signOut } from 'next-auth/react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function Sidebar({ isOpen, onClose, isMobile }) {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [expandedSections, setExpandedSections] = useState({
    Overview: true,
    Inventory: true,
    Management: true,
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Auto-close sidebar on route change (mobile only)
  useEffect(() => {
    if (isMobile && isOpen) {
      onClose();
    }
  }, [pathname, isMobile, isOpen, onClose]);

  // Define sidebar navigation structure
  const sidebarSections = useMemo(
    () => [
      {
        title: 'Overview',
        icon: <BarChart3 className="w-4 h-4" />,
        items: [
          {
            title: 'Dashboard',
            icon: <House className="w-5 h-5" />,
            href: '/dashboard',
            badge: null,
            description: 'Main overview',
          },
          {
            title: 'Analytics',
            icon: <BarChart3 className="w-5 h-5" />,
            href: '/analytics',
            badge: 'New',
            badgeVariant: 'success',
            description: 'Insights & reports',
          },
        ],
      },
      {
        title: 'Inventory',
        icon: <Package className="w-4 h-4" />,
        items: [
          {
            title: 'Items',
            icon: <Package className="w-5 h-5" />,
            href: '/items',
            badge: null,
            description: 'All inventory items',
          },
          {
            title: 'Add New',
            icon: <Plus className="w-5 h-5" />,
            href: '/inventory',
            badge: null,
            description: 'Create new item',
          },
          {
            title: 'Adjustments',
            icon: <Truck className="w-5 h-5" />,
            href: '/inventoryadjustment',
            badge: null,
            description: 'Stock movements',
          },
        ],
      },
      {
        title: 'Management',
        icon: <Settings className="w-4 h-4" />,
        items: [
          {
            title: 'Warehouses',
            icon: <Warehouse className="w-5 h-5" />,
            href: '/warehouse',
            badge: null,
            description: 'Storage locations',
          },
          {
            title: 'Suppliers',
            icon: <Users className="w-5 h-5" />,
            href: '/supplier',
            badge: null,
            description: 'Vendor management',
          },
          {
            title: 'Users',
            icon: <Users className="w-5 h-5" />,
            href: '/user',
            badge: null,
            description: 'System users',
          },
          {
            title: 'Invoices',
            icon: <FileText className="w-5 h-5" />,
            href: '/invoice',
            badge: null,
            description: 'Sales documents',
          },
        ],
      },
    ],
    []
  );

  // Filter items based on search
  const filteredSections = useMemo(() => {
    if (!searchQuery) return sidebarSections;

    return sidebarSections
      .map((section) => ({
        ...section,
        items: section.items.filter(
          (item) =>
            item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.description.toLowerCase().includes(searchQuery.toLowerCase())
        ),
      }))
      .filter((section) => section.items.length > 0);
  }, [sidebarSections, searchQuery]);

  // Check if route is active
  const isActiveRoute = useCallback(
    (href) => {
      if (href === '/dashboard') {
        return pathname === href;
      }
      return pathname.startsWith(href);
    },
    [pathname]
  );

  // Toggle section expansion
  const toggleSection = useCallback((sectionTitle) => {
    setExpandedSections((prev) => ({
      ...prev,
      [sectionTitle]: !prev[sectionTitle],
    }));
  }, []);

  // Handle sign out
  const handleSignOut = useCallback(async () => {
    await signOut({ callbackUrl: '/login' });
  }, []);

  // Get badge variant styles
  const getBadgeStyles = (variant) => {
    const styles = {
      success: 'bg-green-500/20 text-green-400 border-green-500/30',
      warning: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
      info: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      default: 'bg-gray-500/20 text-gray-400 border-gray-500/30',
    };
    return styles[variant] || styles.default;
  };

  return (
    <aside
      className={cn(
        'fixed inset-y-0 left-0 z-40 flex flex-col bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-gray-50 transform transition-all duration-300 ease-in-out shadow-2xl border-r border-slate-800/50',
        isOpen ? 'translate-x-0' : '-translate-x-full',
        'md:translate-x-0',
        isCollapsed ? 'w-20' : 'w-72'
      )}
      aria-label="Sidebar navigation"
    >
      {/* Header with Glassmorphism */}
      <div className="relative h-20 px-4 flex items-center justify-between backdrop-blur-xl bg-slate-950/80 border-b border-slate-800/50">
        <Link href="/dashboard" className="flex items-center gap-3 group">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-xl blur opacity-75 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative p-2.5 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-xl group-hover:scale-110 transition-transform">
              <Warehouse className="w-6 h-6 text-white" />
            </div>
          </div>
          {!isCollapsed && (
            <div className="flex flex-col">
              <h1 className="text-lg font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Inventory
              </h1>
              <p className="text-xs text-slate-400">Management System</p>
            </div>
          )}
        </Link>

        {/* Close/Toggle button */}
        {isMobile ? (
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-slate-800 transition-colors md:hidden"
            aria-label="Close sidebar"
          >
            <X className="w-5 h-5" />
          </button>
        ) : (
          !isMobile && (
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="hidden md:flex p-2 rounded-lg hover:bg-slate-800 transition-colors"
              aria-label="Toggle sidebar"
            >
              <ChevronRight
                className={cn('w-5 h-5 transition-transform', isCollapsed && 'rotate-180')}
              />
            </button>
          )
        )}
      </div>

      {/* Search Bar */}
      {!isCollapsed && (
        <div className="px-4 py-3 border-b border-slate-800/50">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-slate-800/50 border-slate-700/50 text-slate-200 placeholder:text-slate-500 focus:border-blue-500/50 focus:ring-blue-500/20"
            />
          </div>
        </div>
      )}

      {/* Navigation */}
      <ScrollArea className="flex-1 px-3 py-4">
        <nav className="space-y-1">
          {filteredSections.map((section, sectionIndex) => (
            <div key={sectionIndex} className="mb-6">
              {/* Section Header */}
              {!isCollapsed && (
                <button
                  onClick={() => toggleSection(section.title)}
                  className="flex items-center justify-between w-full px-3 py-2 mb-2 text-xs font-semibold text-slate-400 uppercase tracking-wider hover:text-slate-200 transition-colors group"
                >
                  <div className="flex items-center gap-2">
                    {section.icon}
                    <span>{section.title}</span>
                  </div>
                  <ChevronDown
                    className={cn(
                      'w-4 h-4 transition-transform',
                      !expandedSections[section.title] && '-rotate-90'
                    )}
                  />
                </button>
              )}

              {/* Section Items */}
              {(isCollapsed || expandedSections[section.title]) && (
                <div className="space-y-1">
                  {section.items.map((item, itemIndex) => {
                    const isActive = isActiveRoute(item.href);
                    return (
                      <Link
                        key={itemIndex}
                        href={item.href}
                        className={cn(
                          'relative flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group',
                          isActive
                            ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg shadow-blue-500/30'
                            : 'text-slate-300 hover:bg-slate-800/50 hover:text-white'
                        )}
                        title={isCollapsed ? item.title : ''}
                      >
                        {/* Active indicator */}
                        {isActive && (
                          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-white rounded-r-full"></div>
                        )}

                        {/* Icon */}
                        <div
                          className={cn(
                            'flex-shrink-0 transition-transform',
                            isActive ? 'scale-110' : 'group-hover:scale-110'
                          )}
                        >
                          {item.icon}
                        </div>

                        {/* Text and Badge */}
                        {!isCollapsed && (
                          <div className="flex items-center justify-between flex-1 min-w-0">
                            <div className="flex flex-col min-w-0">
                              <span className="text-sm font-medium truncate">{item.title}</span>
                              {!isActive && (
                                <span className="text-xs text-slate-500 group-hover:text-slate-400 truncate">
                                  {item.description}
                                </span>
                              )}
                            </div>
                            {item.badge && (
                              <Badge
                                variant="outline"
                                className={cn(
                                  'ml-2 text-xs border',
                                  isActive
                                    ? 'bg-white/20 text-white border-white/30'
                                    : getBadgeStyles(item.badgeVariant)
                                )}
                              >
                                {item.badge}
                              </Badge>
                            )}
                          </div>
                        )}

                        {/* Tooltip indicator for collapsed state */}
                        {isCollapsed && item.badge && (
                          <Circle className="w-2 h-2 fill-green-400 text-green-400 absolute top-2 right-2" />
                        )}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          ))}
        </nav>
      </ScrollArea>

      {/* Quick Actions (Collapsed State) */}
      {isCollapsed && (
        <div className="px-3 py-4 border-t border-slate-800/50">
          <Button
            variant="ghost"
            size="icon"
            className="w-full hover:bg-slate-800"
            title="Settings"
          >
            <Settings className="w-5 h-5" />
          </Button>
        </div>
      )}

      

  
      
    </aside>
  );
}
