'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const collections = [
  {
    title: 'Modular Kitchens',
    subtitle: 'Sleek, functional, bespoke',
    image: '/downloads/kitchen-10.jpg',
    href: '/project',
  },
  {
    title: 'Wardrobes',
    subtitle: 'Smart storage, refined design',
    image: '/downloads/wardrobe.jpg',
    href: '/project',
  },
  {
    title: 'Dining Islands',
    subtitle: 'Where comfort meets craft',
    image: '/downloads/kitchen-3.jpg',
    href: '/project',
  },
  {
    title: 'Custom Furniture',
    subtitle: 'Tailored to your vision',
    image: '/downloads/kitchen-20.jpg',
    href: '/project',
  },
];

export default function CatalogueSection() {
  return (
    <section className="py-20 lg:py-28 bg-[hsl(36,20%,97%)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-xs font-semibold uppercase tracking-[0.2em] text-primary/70 mb-3"
            >
              Collections
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.08 }}
              className="text-3xl lg:text-4xl font-bold text-[hsl(24,15%,12%)] leading-tight tracking-tight"
            >
              Curated for every space
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.18 }}
          >
            <Link
              href="/gallery"
              className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:gap-3 transition-all duration-200"
            >
              View all <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {collections.map(({ title, subtitle, image, href }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: i * 0.1 }}
            >
              <Link href={href} className="group block relative rounded-2xl overflow-hidden bg-[hsl(36,20%,92%)] shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="relative aspect-[4/5]">
                  <Image
                    src={image}
                    alt={title}
                    fill
                    sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                  {/* Text */}
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <h3 className="text-white font-semibold text-base leading-snug">{title}</h3>
                    <p className="text-white/65 text-xs mt-1">{subtitle}</p>
                  </div>

                  {/* Arrow badge */}
                  <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-x-2 group-hover:translate-x-0">
                    <ArrowRight className="w-3.5 h-3.5 text-white" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
