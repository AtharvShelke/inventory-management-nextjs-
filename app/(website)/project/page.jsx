'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const projects = [
  {
    id: 1,
    name: 'Modern Minimalist Kitchen',
    tag: 'Kitchen',
    description: 'A sleek, contemporary design with clean lines, neutral tones, and highly functional layout optimized for daily use.',
    materials: ['Matte Lacquered MDF', 'Quartz Countertop', 'Stainless Steel Hardware'],
    image: '/whatsapp/h1.jpeg',
    gallery: ['/whatsapp/h1.jpeg', '/whatsapp/n1.jpeg', '/whatsapp/n2.jpeg'],
  },
  {
    id: 2,
    name: 'Rustic Farmhouse Kitchen',
    tag: 'Kitchen',
    description: 'A warm, inviting design featuring earthy wood textures, open shelving, and a cozy ambiance perfect for family gatherings.',
    materials: ['Natural Oak Veneer', 'Granite Countertop', 'Brushed Brass Accents'],
    image: '/downloads/kitchen-11.jpg',
    gallery: ['/whatsapp/a1.jpeg', '/whatsapp/h5.jpeg', '/downloads/kitchen-15.jpg'],
  },
  {
    id: 3,
    name: 'Luxurious Modular Kitchen',
    tag: 'Modular',
    description: 'A high-end kitchen with premium finishes, marble-effect countertops, and custom cabinetry for maximum elegance.',
    materials: ['High-Gloss Acrylic', 'Marble Countertop', 'Soft-Close Hinges'],
    image: '/whatsapp/a2.jpeg',
    gallery: ['/whatsapp/a2.jpeg', '/whatsapp/h4.jpeg', '/whatsapp/n7.jpeg'],
  },
  {
    id: 4,
    name: 'Contemporary Island Kitchen',
    tag: 'Kitchen',
    description: 'An open-plan social kitchen centred around a large functional island — designed for both cooking and entertaining.',
    materials: ['Textured Vinyl Wrap', 'Porcelain Slab', 'Matt Black Hardware'],
    image: '/downloads/kitchen-2.jpg',
    gallery: ['/downloads/kitchen-2.jpg', '/whatsapp/n3.jpeg', '/whatsapp/h3.jpeg'],
  },
  {
    id: 5,
    name: 'Walnut Wardrobe Suite',
    tag: 'Wardrobe',
    description: 'A floor-to-ceiling wardrobe system in warm walnut with integrated lighting and bespoke internal organisation.',
    materials: ['Walnut Veneer', 'LED Strip Lighting', 'Soft-Touch Handles'],
    image: '/downloads/wardrobe.jpg',
    gallery: ['/downloads/wardrobe.jpg', '/whatsapp/n4.jpeg', '/whatsapp/h6.jpeg'],
  },
  {
    id: 6,
    name: 'Compact Studio Kitchen',
    tag: 'Modular',
    description: 'A smart, space-efficient modular kitchen designed for studio apartments without compromising on style or functionality.',
    materials: ['Foil MDF', 'Compact Laminate', 'Concealed Handles'],
    image: '/downloads/kitchen-20.jpg',
    gallery: ['/downloads/kitchen-20.jpg', '/whatsapp/n5.jpeg', '/whatsapp/h6.jpeg'],
  },
];

export default function ProjectsPage() {
  const [selected, setSelected] = useState(null);
  const [imgIdx, setImgIdx] = useState(0);

  const openProject = (p) => { setSelected(p); setImgIdx(0); };
  const close = () => setSelected(null);
  const prev = () => setImgIdx(i => (i - 1 + selected.gallery.length) % selected.gallery.length);
  const next = () => setImgIdx(i => (i + 1) % selected.gallery.length);

  return (
    <div className="min-h-screen bg-[hsl(36,20%,97%)]">
      {/* Page Hero */}
      <div className="relative h-[55vh] min-h-[360px] flex items-end overflow-hidden bg-[hsl(24,15%,10%)]">
        <Image
          src="/image/backgroundproject.jpg"
          alt="Our projects"
          fill
          priority
          className="object-cover object-center opacity-55"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-14 w-full">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="text-xs font-semibold uppercase tracking-[0.22em] text-white/50 mb-4"
          >
            Our Work
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.65 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight"
          >
            Projects
          </motion.h1>
        </div>
      </div>

      {/* Projects Grid */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, i) => (
              <motion.button
                key={project.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: i * 0.08 }}
                onClick={() => openProject(project)}
                className="group relative rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 text-left bg-[hsl(36,20%,92%)] block w-full"
              >
                <div className="relative aspect-[4/3]">
                  <Image
                    src={project.image}
                    alt={project.name}
                    fill
                    sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <span className="text-xs font-semibold uppercase tracking-wider text-white/55 mb-1 block">{project.tag}</span>
                    <h2 className="text-white font-semibold text-base leading-snug group-hover:text-[hsl(36,55%,80%)] transition-colors">{project.name}</h2>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Project Modal */}
      <AnimatePresence>
        {selected && (
          <>
            <motion.div
              key="overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
              onClick={close}
            />
            <motion.div
              key="modal"
              initial={{ opacity: 0, scale: 0.96, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 20 }}
              transition={{ duration: 0.3, ease: [0.32, 0, 0.24, 1] }}
              className="fixed inset-4 sm:inset-8 lg:inset-16 bg-[hsl(36,20%,97%)] rounded-2xl z-50 overflow-hidden shadow-2xl flex flex-col"
            >
              {/* Close */}
              <button
                onClick={close}
                aria-label="Close project"
                className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/10 hover:bg-black/20 flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4 text-[hsl(24,15%,20%)]" />
              </button>

              <div className="flex flex-col lg:flex-row h-full overflow-auto">
                {/* Image carousel */}
                <div className="lg:w-3/5 relative bg-[hsl(24,15%,10%)] flex-shrink-0">
                  <div className="relative aspect-[4/3] lg:aspect-auto lg:h-full">
                    <Image
                      src={selected.gallery[imgIdx]}
                      alt={selected.name}
                      fill
                      className="object-cover"
                    />
                    {/* Nav */}
                    {selected.gallery.length > 1 && (
                      <>
                        <button onClick={prev} className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/35 transition-colors">
                          <ChevronLeft className="w-4 h-4 text-white" />
                        </button>
                        <button onClick={next} className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/35 transition-colors">
                          <ChevronRight className="w-4 h-4 text-white" />
                        </button>
                        {/* Dots */}
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
                          {selected.gallery.map((_, j) => (
                            <button key={j} onClick={() => setImgIdx(j)} className={`w-1.5 h-1.5 rounded-full transition-all duration-200 ${j === imgIdx ? 'bg-white w-4' : 'bg-white/40'}`} />
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {/* Info */}
                <div className="lg:w-2/5 flex flex-col justify-between p-7 lg:p-10 overflow-y-auto">
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-[0.18em] text-primary/70">{selected.tag}</span>
                    <h2 className="mt-2 text-2xl lg:text-3xl font-bold text-[hsl(24,15%,12%)] leading-tight">{selected.name}</h2>
                    <p className="mt-4 text-sm text-[hsl(25,10%,40%)] leading-relaxed">{selected.description}</p>

                    <div className="mt-8">
                      <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-[hsl(25,10%,52%)] mb-3">Materials Used</h3>
                      <ul className="space-y-2">
                        {selected.materials.map((m) => (
                          <li key={m} className="flex items-center gap-2 text-sm text-[hsl(24,15%,20%)]">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary/70 flex-shrink-0" />
                            {m}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
