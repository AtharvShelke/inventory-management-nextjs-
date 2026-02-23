'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: [0.25, 0.46, 0.45, 0.94], delay },
  }),
};

export default function HeroSection() {
  return (
    <section className="relative w-full min-h-screen overflow-hidden bg-[hsl(24,15%,10%)]">
      {/* Hero Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/downloads/kitchen-10.jpg"
          alt="Modern furniture in a bright, airy living space — Enrich Studio"
          fill
          priority
          quality={90}
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* Gradient overlays — stronger left-side vignette so text is always legible */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/45 to-black/15" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/25" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-center min-h-screen max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <div className="max-w-2xl">
          {/* Eyebrow label */}
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.15}
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-white/70 mb-6"
          >
            <span className="w-6 h-px bg-white/50" />
            Premium Furniture Studio
          </motion.p>

          {/* Headline */}
          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.28}
            className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-[1.08] tracking-tight mb-6"
          >
            Crafted for the
            <br />
            <span className="text-[hsl(36,55%,80%)]">way you live.</span>
          </motion.h1>

          {/* Sub-headline — boosted opacity for dark-bg legibility */}
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.42}
            className="text-base sm:text-lg text-white/85 leading-relaxed mb-10 max-w-xl"
          >
            Bespoke furniture and interior solutions designed with precision — where warmth meets contemporary form.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.55}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link
              href="/contact"
              className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-[hsl(24,15%,12%)] font-semibold text-sm tracking-wide rounded-full hover:bg-[hsl(36,55%,86%)] transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            >
              Book a Consultation
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
            <Link
              href="/project"
              className="inline-flex items-center justify-center px-8 py-4 border border-white/40 text-white font-medium text-sm tracking-wide rounded-full hover:bg-white/10 transition-all duration-300 hover:-translate-y-0.5"
            >
              View Our Projects
            </Link>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-white/40 text-xs uppercase tracking-[0.15em]">Scroll</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            className="w-px h-8 bg-gradient-to-b from-white/40 to-transparent"
          />
        </motion.div>
      </div>
    </section>
  );
}
