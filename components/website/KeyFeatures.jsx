'use client';

import { motion } from 'framer-motion';

const features = [
  {
    number: '01',
    title: 'In-House Production',
    description: 'Advanced machinery and skilled artisans working under one roof — ensuring consistent quality and on-schedule delivery.',
  },
  {
    number: '02',
    title: 'Free 3D Design Previews',
    description: 'Visualize your space in photorealistic detail before a single piece is made. No commitment, complete confidence.',
  },
  {
    number: '03',
    title: 'Expert Installation',
    description: 'Our trained carpenters handle every detail of fitting and finishing — so your space looks exactly as designed.',
  },
  {
    number: '04',
    title: 'Complete Customization',
    description: 'Every dimension, material, and finish is tailored to your space and personal taste. Nothing off-the-shelf.',
  },
];

export default function KeyFeatures() {
  return (
    <section className="py-20 lg:py-28 bg-[hsl(24,15%,10%)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-xl mb-14">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-xs font-semibold uppercase tracking-[0.2em] text-[hsl(36,55%,70%)] mb-3"
          >
            Our Process
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.08 }}
            className="text-3xl lg:text-4xl font-bold text-white leading-tight tracking-tight"
          >
            What sets us apart
          </motion.h2>
        </div>

        {/* Features grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map(({ number, title, description }, i) => (
            <motion.div
              key={number}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: i * 0.1 }}
              className="group relative pt-8 border-t border-white/12"
            >
              <span className="text-4xl font-bold text-white/8 absolute top-6 right-0 leading-none">
                {number}
              </span>
              <div className="w-6 h-px bg-primary mb-5 group-hover:w-10 transition-all duration-300" />
              <h3 className="text-base font-semibold text-white mb-3">{title}</h3>
              <p className="text-sm text-white/45 leading-relaxed">{description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
