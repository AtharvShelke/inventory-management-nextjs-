'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn, ChevronLeft, ChevronRight } from 'lucide-react';

const images = [
  { src: '/whatsapp/a1.jpeg', alt: 'Modern kitchen interior' },
  { src: '/downloads/kitchen-2.jpg', alt: 'Contemporary kitchen design' },
  { src: '/whatsapp/n1.jpeg', alt: 'Minimalist cabinetry' },
  { src: '/whatsapp/a2.jpeg', alt: 'Luxurious kitchen finish' },
  { src: '/whatsapp/h1.jpeg', alt: 'Kitchen island' },
  { src: '/whatsapp/n2.jpeg', alt: 'Cabinet detail' },
  { src: '/whatsapp/h3.jpeg', alt: 'Open kitchen space' },
  { src: '/whatsapp/n3.jpeg', alt: 'Storage solution' },
  { src: '/whatsapp/h4.jpeg', alt: 'Kitchen design close-up' },
  { src: '/whatsapp/n4.jpeg', alt: 'Dining island' },
  { src: '/whatsapp/h5.jpeg', alt: 'Modular kitchen' },
  { src: '/whatsapp/n5.jpeg', alt: 'Kitchen showroom' },
  { src: '/whatsapp/h6.jpeg', alt: 'Wardrobe interior' },
  { src: '/whatsapp/n6.jpeg', alt: 'Custom furniture' },
  { src: '/whatsapp/n7.jpeg', alt: 'Kitchen appliances' },
  { src: '/whatsapp/n8.jpeg', alt: 'Living space' },
];

export default function GalleryPage() {
  const [selectedIdx, setSelectedIdx] = useState(null);

  // ── Keyboard navigation ──────────────────────────────────────
  const handleKey = useCallback(
    (e) => {
      if (selectedIdx === null) return;
      if (e.key === 'ArrowRight') setSelectedIdx((i) => (i + 1) % images.length);
      if (e.key === 'ArrowLeft') setSelectedIdx((i) => (i - 1 + images.length) % images.length);
      if (e.key === 'Escape') setSelectedIdx(null);
    },
    [selectedIdx]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [handleKey]);

  // ── Touch/swipe navigation ───────────────────────────────────
  const touchStartX = useRef(null);

  const onTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const onTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(delta) > 50) {
      if (delta < 0) setSelectedIdx((i) => (i + 1) % images.length); // swipe left → next
      else setSelectedIdx((i) => (i - 1 + images.length) % images.length); // swipe right → prev
    }
    touchStartX.current = null;
  };

  const current = selectedIdx !== null ? images[selectedIdx] : null;

  return (
    <div className="min-h-screen bg-[hsl(24,15%,10%)]">
      {/* Page Header */}
      <div className="pt-28 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="text-xs font-semibold uppercase tracking-[0.22em] text-white/40 mb-3"
        >
          Visual Portfolio
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight"
        >
          Gallery
        </motion.h1>
      </div>

      {/* Masonry Grid */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pb-20">
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
          {images.map(({ src, alt }, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
              onClick={() => setSelectedIdx(i)}
              className="break-inside-avoid group relative rounded-xl overflow-hidden cursor-zoom-in shadow-sm hover:shadow-xl transition-all duration-300 bg-[hsl(24,15%,14%)]"
            >
              <Image
                src={src}
                alt={alt}
                width={600}
                height={500}
                sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"
                className="w-full h-auto object-cover block transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                <ZoomIn className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-8 h-8 drop-shadow-lg" />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {current && (
          <>
            {/* Backdrop */}
            <motion.div
              key="bg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/90 backdrop-blur-md z-50"
              onClick={() => setSelectedIdx(null)}
            />

            {/* Lightbox container */}
            <motion.div
              key="lightbox"
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-50 flex items-center justify-center"
              onTouchStart={onTouchStart}
              onTouchEnd={onTouchEnd}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Image wrapper */}
              <div className="relative max-w-5xl w-full px-14 sm:px-20">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedIdx}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -30 }}
                    transition={{ duration: 0.22 }}
                  >
                    <Image
                      src={current.src}
                      alt={current.alt}
                      width={1200}
                      height={800}
                      className="w-full max-h-[82vh] h-auto object-contain rounded-xl shadow-2xl"
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Counter badge */}
                <div className="absolute top-3 left-1/2 -translate-x-1/2 text-xs text-white/50 tracking-widest">
                  {selectedIdx + 1} / {images.length}
                </div>

                {/* Prev */}
                <button
                  onClick={(e) => { e.stopPropagation(); setSelectedIdx((i) => (i - 1 + images.length) % images.length); }}
                  aria-label="Previous image"
                  className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 hover:bg-white/25 backdrop-blur-sm flex items-center justify-center transition-colors"
                >
                  <ChevronLeft className="w-5 h-5 text-white" />
                </button>

                {/* Next */}
                <button
                  onClick={(e) => { e.stopPropagation(); setSelectedIdx((i) => (i + 1) % images.length); }}
                  aria-label="Next image"
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 hover:bg-white/25 backdrop-blur-sm flex items-center justify-center transition-colors"
                >
                  <ChevronRight className="w-5 h-5 text-white" />
                </button>

                {/* Close */}
                <button
                  onClick={() => setSelectedIdx(null)}
                  aria-label="Close lightbox"
                  className="absolute -top-4 right-14 sm:right-20 w-9 h-9 rounded-full bg-white/15 hover:bg-white/30 backdrop-blur-sm flex items-center justify-center transition-colors"
                >
                  <X className="w-4 h-4 text-white" />
                </button>
              </div>

              {/* Keyboard hint — desktop only */}
              <div className="hidden sm:flex absolute bottom-5 left-1/2 -translate-x-1/2 items-center gap-3 text-white/30 text-xs">
                <span className="border border-white/20 rounded px-1.5 py-0.5">←</span>
                <span>prev</span>
                <span className="mx-1">·</span>
                <span>next</span>
                <span className="border border-white/20 rounded px-1.5 py-0.5">→</span>
                <span className="mx-2">·</span>
                <span className="border border-white/20 rounded px-1.5 py-0.5">Esc</span>
                <span>close</span>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
