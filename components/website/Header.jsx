'use client';

import React, { useEffect, useState } from 'react';
import Logo from './Logo';
import Nav from './Nav';
import MobileNavigation from './MobileNavigation';
import { usePathname } from 'next/navigation';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathName = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    
    const debounce = (func, wait = 100) => {
      let timeout;
      return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), wait);
      };
    };

    const debouncedHandleScroll = debounce(handleScroll);

    window.addEventListener('scroll', debouncedHandleScroll);
    return () => window.removeEventListener('scroll', debouncedHandleScroll);
  }, []);

  const headerClass = `
    sticky top-0 z-30 transition-all 
    ${isScrolled ? 'py-2 bg-tertiary shadow-lg' : 'py-4'} 
    ${pathName === '/' ? 'bg-white' : ''}
  `;

  return (
    <header className={headerClass}>
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <Logo />
          <div className="flex items-center gap-x-6">
            <Nav
              containerStyles="hidden lg:flex gap-x-8 items-center"
              linkStyles="relative hover:text-primary transition-all cursor-pointer"
              underlineStyles="absolute left-0 top-full h-[2px] bg-primary w-full"
            />
            <div className="lg:hidden">
              <MobileNavigation />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
