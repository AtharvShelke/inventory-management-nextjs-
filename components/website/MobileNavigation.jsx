import { AlignJustify } from 'lucide-react';
import React from 'react';
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet';
import Logo from './Logo';
import Nav from './Nav';

export default function MobileNavigation() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <AlignJustify className="cursor-pointer" />
      </SheetTrigger>
      <SheetContent>
        <div className="flex flex-col items-center justify-between h-full py-8">
          <div className="flex flex-col items-center gap-y-32">
            <Logo />
            <Nav
              containerStyles="flex flex-col items-center gap-y-6"
              linkStyles="text-xl font-semibold" // Corrected "text-1xl" to "text-xl"
            />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
