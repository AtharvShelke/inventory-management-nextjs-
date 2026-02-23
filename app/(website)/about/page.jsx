'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const story = [
  {
    tag: 'Our Story',
    heading: 'Rooted in craft,\ndriven by design.',
    body: 'Founded over 15 years ago, Enrich Studio began with a simple belief — that exceptional furniture should be accessible to every home. What started as a small workshop in Chhatrapati Sambhajinagar has grown into a full-service furniture and interior studio, trusted by hundreds of families across Maharashtra.',
    image: '/downloads/modular-kitchen.jpg',
    imageLeft: false,
  },
  {
    tag: 'Philosophy',
    heading: 'Design with purpose.\nBuild with care.',
    body: 'We don\'t believe in off-the-shelf solutions. Every project begins with your lifestyle — how you move, cook, gather, and rest. We listen first, then design. The result is a home that fits you perfectly, built from premium materials by skilled hands.',
    image: '/downloads/about-catalogue.jpg',
    imageLeft: true,
  },
  {
    tag: 'Craftsmanship',
    heading: 'Every detail,\ndeliberate.',
    body: 'Our in-house production facility means every piece is crafted under full quality control. From material sourcing to final installation, we manage the entire process — delivering consistent precision and finishes that stand the test of time.',
    image: '/downloads/about-installation.jpg',
    imageLeft: false,
  },
];

const categories = [
  { title: 'Modular Kitchens', image: '/downloads/kitchen-10.jpg' },
  { title: 'Wardrobes', image: '/downloads/wardrobe.jpg' },
  { title: 'Dining Islands', image: '/downloads/kitchen-3.jpg' },
  { title: 'Custom Furniture', image: '/downloads/kitchen-20.jpg' },
];

export default function AboutPage() {
  return (
    <div className="bg-[hsl(36,20%,97%)]">
      {/* Page Hero */}
      <div className="relative h-[60vh] min-h-[400px] flex items-end overflow-hidden bg-[hsl(24,15%,10%)]">
        <Image
          src="/image/backgroundproject.jpg"
          alt="Enrich Studio — About the workshop"
          fill
          priority
          className="object-cover object-center opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-14 w-full">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-xs font-semibold uppercase tracking-[0.22em] text-white/55 mb-4"
          >
            About Enrich Studio
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight"
          >
            We shape spaces that<br className="hidden sm:block" /> feel like you.
          </motion.h1>
        </div>
      </div>

      {/* Story Sections */}
      <div>
        {story.map(({ tag, heading, body, image, imageLeft }, i) => (
          <motion.div
            key={tag}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className={`py-20 lg:py-24 ${i % 2 === 0 ? 'bg-[hsl(36,20%,97%)]' : 'bg-[hsl(40,35%,94%)]'}`}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className={`flex flex-col lg:flex-row ${imageLeft ? 'lg:flex-row-reverse' : ''} items-center gap-12 lg:gap-20`}>
                {/* Text */}
                <div className="lg:w-1/2">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary/70 mb-4">{tag}</p>
                  <h2 className="text-3xl lg:text-4xl font-bold text-[hsl(24,15%,12%)] leading-tight tracking-tight mb-6 whitespace-pre-line">
                    {heading}
                  </h2>
                  <p className="text-base text-[hsl(25,10%,40%)] leading-relaxed max-w-lg">
                    {body}
                  </p>
                </div>
                {/* Image */}
                <div className="lg:w-1/2 w-full">
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg">
                    <Image
                      src={image}
                      alt={heading.split('\n')[0]}
                      fill
                      sizes="(max-width:1024px) 100vw, 50vw"
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* What We Create */}
      <section className="py-20 lg:py-24 bg-[hsl(36,20%,97%)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-xs font-semibold uppercase tracking-[0.2em] text-primary/70 mb-3"
            >
              Our Range
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.08 }}
              className="text-3xl lg:text-4xl font-bold text-[hsl(24,15%,12%)] tracking-tight"
            >
              What we create
            </motion.h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {categories.map(({ title, image }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative aspect-[3/4] rounded-2xl overflow-hidden group shadow-sm"
              >
                <Image
                  src={image}
                  alt={title}
                  fill
                  sizes="(max-width:640px) 50vw, 25vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/65 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-white font-semibold text-sm">{title}</h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[hsl(24,15%,10%)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-2xl lg:text-3xl font-bold text-white mb-4"
          >
            Ready to start your project?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-white/50 text-sm mb-8"
          >
            Visit our showroom or schedule a free consultation with our design team.
          </motion.p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[hsl(24,15%,12%)] font-semibold text-sm rounded-full hover:bg-[hsl(36,55%,86%)] transition-colors shadow-sm"
          >
            Get in Touch <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
