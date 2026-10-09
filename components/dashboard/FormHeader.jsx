import { X } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import { Button } from '@/components/ui/button';

export default function FormHeader({ title, href }) {
  return (
    <div className="flex items-center justify-between bg-white py-3.5 px-4 sm:px-6 rounded-xl border border-slate-200 shadow-sm mb-4">
      <h2 className="text-lg sm:text-xl font-bold text-slate-800 tracking-tight">{title}</h2>
      <Link href={href}>
        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100">
          <X className="h-5 w-5" />
        </Button>
      </Link>
    </div>
  );
}
