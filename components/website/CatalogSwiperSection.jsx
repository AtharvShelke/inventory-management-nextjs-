'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const projects = [
    {
        id: 1,
        name: 'Modern Minimalist Kitchen',
        tag: 'Kitchen',
        image: '/whatsapp/h1.jpeg',
    },
    {
        id: 2,
        name: 'Rustic Farmhouse Kitchen',
        tag: 'Kitchen',
        image: '/downloads/kitchen-11.jpg',
    },
    {
        id: 3,
        name: 'Luxurious Modular Kitchen',
        tag: 'Modular',
        image: '/whatsapp/a2.jpeg',
    },
];

export default function CatalogSwiperSection() {
    return (
        <section className="py-20 lg:py-28 bg-[hsl(36,20%,97%)]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14">
                    <div>
                        <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            className="text-xs font-semibold uppercase tracking-[0.2em] text-primary/70 mb-3"
                        >
                            Featured Work
                        </motion.p>
                        <motion.h2
                            initial={{ opacity: 0, y: 14 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.55, delay: 0.08 }}
                            className="text-3xl lg:text-4xl font-bold text-[hsl(24,15%,12%)] leading-tight tracking-tight"
                        >
                            Projects we&apos;re proud of
                        </motion.h2>
                    </div>
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <Link
                            href="/project"
                            className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:gap-3 transition-all duration-200"
                        >
                            All projects <ArrowRight className="w-4 h-4" />
                        </Link>
                    </motion.div>
                </div>

                {/* Projects grid */}
                <div className="grid md:grid-cols-3 gap-6">
                    {projects.map(({ id, name, tag, image }, i) => (
                        <motion.div
                            key={id}
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.55, delay: i * 0.12 }}
                        >
                            <Link
                                href="/project"
                                className="group block relative rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 bg-[hsl(36,20%,92%)]"
                            >
                                <div className="relative aspect-[3/4]">
                                    <Image
                                        src={image}
                                        alt={name}
                                        fill
                                        sizes="(max-width:768px) 100vw, 33vw"
                                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
                                    <div className="absolute bottom-0 left-0 right-0 p-6">
                                        <span className="inline-block text-xs font-semibold uppercase tracking-wider text-white/60 mb-2">{tag}</span>
                                        <h3 className="text-white font-semibold text-lg leading-snug group-hover:text-[hsl(36,55%,80%)] transition-colors">{name}</h3>
                                    </div>
                                    <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                                        <ArrowRight className="w-4 h-4 text-white" />
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
