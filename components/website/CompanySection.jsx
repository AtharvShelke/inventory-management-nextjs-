'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

// Parses "15+", "500+", "100%" → { number: 15, suffix: '+' }
function parseValue(str) {
  const match = str.match(/^(\d+)([%+]?)$/);
  if (!match) return { number: 0, suffix: '' };
  return { number: parseInt(match[1], 10), suffix: match[2] };
}

function AnimatedStat({ value, label, delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const [displayed, setDisplayed] = useState(0);
  const { number, suffix } = parseValue(value);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1400; // ms
    const startTime = performance.now();

    const tick = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * number);
      setDisplayed(current);
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }, [inView, number]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="bg-[hsl(40,35%,94%)] px-6 py-8 text-center"
    >
      <p className="text-3xl lg:text-4xl font-bold text-primary tracking-tight">
        {displayed}{suffix}
      </p>
      <p className="text-sm text-[hsl(25,10%,46%)] mt-1">{label}</p>
    </motion.div>
  );
}

const stats = [
  { value: '15+', label: 'Years of Craft' },
  { value: '500+', label: 'Projects Delivered' },
  { value: '100+', label: 'Material Finishes' },
  { value: '100%', label: 'Bespoke Solutions' },
];

const values = [
  {
    title: 'Timeless Design',
    body: 'We believe great furniture transcends trends — each piece is conceived to age beautifully and serve for a lifetime.',
  },
  {
    title: 'Honest Craftsmanship',
    body: 'From material selection to final installation, every stage is handled with meticulous care and full transparency.',
  },
  {
    title: 'Your Vision First',
    body: 'Our process begins with listening. We tailor every design to your lifestyle, space, and aesthetic preferences.',
  },
];

export default function CompanySection() {
  return (
    <section className="py-20 lg:py-28 bg-[hsl(40,35%,94%)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Headline */}
        <div className="max-w-2xl mb-16">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-xs font-semibold uppercase tracking-[0.2em] text-primary/70 mb-3"
          >
            Why Enrich Studio
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.08 }}
            className="text-3xl lg:text-4xl font-bold text-[hsl(24,15%,12%)] leading-tight tracking-tight"
          >
            Built on principles that matter.
          </motion.h2>
        </div>

        {/* Stats row — animated counters */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-[hsl(32,18%,86%)] rounded-2xl overflow-hidden mb-16 shadow-sm">
          {stats.map(({ value, label }, i) => (
            <AnimatedStat key={label} value={value} label={label} delay={i * 0.1} />
          ))}
        </div>

        {/* Values grid */}
        <div className="grid sm:grid-cols-3 gap-8">
          {values.map(({ title, body }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: i * 0.12 }}
              className="space-y-3"
            >
              <div className="w-8 h-px bg-primary" />
              <h3 className="text-base font-semibold text-[hsl(24,15%,14%)]">{title}</h3>
              <p className="text-sm text-[hsl(25,10%,46%)] leading-relaxed">{body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
