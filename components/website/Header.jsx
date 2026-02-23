'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Nav from './Nav';
import MobileNavigation from './MobileNavigation';
import { usePathname } from 'next/navigation';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathName = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 60);
    const debounced = (...args) => {
      clearTimeout(debounced._t);
      debounced._t = setTimeout(() => handleScroll(...args), 80);
    };
    window.addEventListener('scroll', debounced);
    return () => window.removeEventListener('scroll', debounced);
  }, []);

  const isHome = pathName === '/';

  return (
    <header
      className={`
        fixed top-0 left-0 right-0 z-50 transition-all duration-500
        ${isScrolled
          ? 'bg-[hsl(36,20%,97%)]/95 backdrop-blur-sm shadow-[0_1px_24px_rgba(0,0,0,0.06)] py-3'
          : isHome
            ? 'bg-transparent py-5'
            : 'bg-[hsl(36,20%,97%)]/95 backdrop-blur-sm py-4'
        }
      `}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 group"
            aria-label="Enrich Furniture Studio — Home"
          >
            <span
              className={`
                text-xl font-bold tracking-tight transition-colors duration-300
                ${isScrolled || !isHome ? 'text-[hsl(24,15%,12%)]' : 'text-white'}
              `}
            >
              ENRICH
            </span>
            <span
              className={`
                text-xl font-light tracking-[0.15em] transition-colors duration-300
                ${isScrolled || !isHome ? 'text-primary' : 'text-white/80'}
              `}
            >
              STUDIO
            </span>
          </Link>

          {/* Desktop Nav */}
          <Nav
            containerStyles="hidden lg:flex items-center gap-x-10"
            linkStyles={`
              relative text-sm font-medium tracking-wide transition-colors duration-300 link-underline
              ${isScrolled || !isHome ? 'text-[hsl(24,15%,28%)] hover:text-primary' : 'text-white/90 hover:text-white'}
            `}
            activeStyles={`text-primary`}
          />

          {/* Mobile Nav */}
          <div className="lg:hidden">
            <MobileNavigation isLight={!isScrolled && isHome} />
          </div>
        </div>
      </div>
    </header>
  );
}
