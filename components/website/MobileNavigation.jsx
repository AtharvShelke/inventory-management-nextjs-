'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { X, AlignJustify } from 'lucide-react';

const links = [
  { path: '/', name: 'Home' },
  { path: '/about', name: 'About' },
  { path: '/gallery', name: 'Gallery' },
  { path: '/project', name: 'Projects' },
  { path: '/contact', name: 'Contact' },
];

export default function MobileNavigation({ isLight = false }) {
  const [open, setOpen] = useState(false);
  const pathName = usePathname();

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        aria-label="Open navigation menu"
        className="p-2 rounded-md transition-colors"
      >
        <AlignJustify
          className={`w-6 h-6 ${isLight ? 'text-white' : 'text-[hsl(24,15%,18%)]'}`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
              onClick={() => setOpen(false)}
            />

            {/* Drawer */}
            <motion.aside
              key="drawer"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.32, ease: [0.32, 0, 0.24, 1] }}
              className="fixed top-0 right-0 bottom-0 w-72 bg-[hsl(36,20%,97%)] z-50 flex flex-col shadow-2xl"
            >
              {/* Drawer Header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-[hsl(32,18%,88%)]">
                <Link href="/" onClick={() => setOpen(false)} className="flex items-center gap-1">
                  <span className="text-lg font-bold tracking-tight text-[hsl(24,15%,12%)]">ENRICH</span>
                  <span className="text-lg font-light tracking-[0.12em] text-primary">STUDIO</span>
                </Link>
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Close navigation menu"
                  className="p-2 rounded-full hover:bg-[hsl(36,25%,90%)] transition-colors"
                >
                  <X className="w-5 h-5 text-[hsl(24,15%,28%)]" />
                </button>
              </div>

              {/* Nav Links */}
              <nav className="flex flex-col flex-1 px-6 py-8 gap-1" aria-label="Mobile navigation">
                {links.map((link, i) => {
                  const isActive = link.path === pathName;
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.06 + 0.1, duration: 0.25 }}
                    >
                      <Link
                        href={link.path}
                        onClick={() => setOpen(false)}
                        className={`
                          block px-4 py-3.5 rounded-xl text-base font-medium transition-all duration-200
                          ${isActive
                            ? 'bg-primary/10 text-primary'
                            : 'text-[hsl(24,15%,20%)] hover:bg-[hsl(36,25%,91%)] hover:text-primary'
                          }
                        `}
                      >
                        {link.name}
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>

              {/* CTA */}
              <div className="px-6 pb-8">
                <Link
                  href="/contact"
                  onClick={() => setOpen(false)}
                  className="block w-full text-center py-3.5 rounded-xl bg-primary text-white font-medium text-sm tracking-wide hover:bg-primary/90 transition-colors shadow-sm"
                >
                  Book a Consultation
                </Link>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
