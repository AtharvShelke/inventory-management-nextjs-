'use client'
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import {
  History,
  Menu,
  Bell,
  Settings,
  ChevronDown,
  LogOut,
  User,
  LayoutDashboard
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

export default function Header({ onMenuClick, isSidebarOpen }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  const username = session?.user?.name || 'User';
  const role = session?.user?.role || 'Guest';
  const userInitials = username.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);

  return (
    <header className="sticky top-0 z-30 w-full border-b border-slate-200 bg-white/80 backdrop-blur-xl supports-[backdrop-filter]:bg-white/60">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Left: Mobile Menu & Branding */}
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-slate-500 hover:text-slate-900"
            onClick={onMenuClick}
            aria-label="Toggle menu"
          >
            <Menu className="h-5 w-5" />
          </Button>

          <div className="flex flex-col md:hidden">
            <span className="font-semibold text-sm">Inventory</span>
            <span className="text-[10px] text-muted-foreground">Enrich Kitchen</span>
          </div>

          {/* Breadcrumb replacement / Welcome message for Desktop */}
          <div className="hidden md:flex flex-col">
            <h2 className="text-lg font-semibold text-slate-800 tracking-tight">
              Enrich Kitchen Studio
            </h2>
          </div>
        </div>

        {/* Right: Actions & Profile */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Notifications */}
          <Button variant="ghost" size="icon" className="relative text-slate-500 hover:text-slate-900 rounded-full">
            <Bell className="h-5 w-5" />
            <span className="absolute top-2.5 right-2.5 h-2 w-2 rounded-full bg-red-600 border border-white"></span>
          </Button>

          {/* Profile Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-9 w-full md:w-auto rounded-full pl-2 pr-4 hover:bg-slate-100 transition-all border border-slate-200 md:border-transparent md:hover:border-slate-200">
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8 border border-slate-200">
                    <AvatarImage src={session?.user?.image} alt={username} />
                    <AvatarFallback className="bg-blue-600 text-white font-medium text-xs">
                      {userInitials}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex flex-col items-start text-left hidden md:flex">
                    <span className="text-sm font-medium leading-none text-slate-700">{username}</span>
                    <span className="text-[10px] text-slate-500 font-medium mt-0.5">{role}</span>
                  </div>
                  <ChevronDown className="h-3 w-3 text-slate-400 hidden md:block" />
                </div>
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-56 mt-2" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{username}</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {session?.user?.email}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => router.push('/dashboard')}>
                <LayoutDashboard className="mr-2 h-4 w-4" />
                <span>Dashboard</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => router.push('/profile')}>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="text-red-600 focus:text-red-600 cursor-pointer"
                onClick={() => signOut({ callbackUrl: '/login' })}
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
