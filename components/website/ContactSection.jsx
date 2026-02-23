'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Star } from 'lucide-react';

const testimonials = [
    {
        rating: 5,
        quote: 'Exceptional craftsmanship. The kitchen they designed for us has completely transformed how our family uses the space — functional and gorgeous.',
        name: 'Aarav Kumar',
        location: 'Mumbai',
    },
    {
        rating: 5,
        quote: 'The 3D preview process gave us total confidence before committing. The final result exceeded our expectations in every way.',
        name: 'Isha Patel',
        location: 'Chh. Sambhajinagar',
    },
    {
        rating: 5,
        quote: 'From consultation to installation, the team was professional and attentive. Truly bespoke furniture that fits our home perfectly.',
        name: 'Ravi Sharma',
        location: 'Jalna',
    },
];

export default function ContactSection() {
    return (
        <section className="py-20 lg:py-28 bg-[hsl(40,35%,94%)]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="max-w-lg mb-14">
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="text-xs font-semibold uppercase tracking-[0.2em] text-primary/70 mb-3"
                    >
                        Testimonials
                    </motion.p>
                    <motion.h2
                        initial={{ opacity: 0, y: 14 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.55, delay: 0.08 }}
                        className="text-3xl lg:text-4xl font-bold text-[hsl(24,15%,12%)] leading-tight tracking-tight"
                    >
                        Trusted by homeowners
                    </motion.h2>
                </div>

                {/* Reviews grid */}
                <div className="grid md:grid-cols-3 gap-6 mb-14">
                    {testimonials.map(({ rating, quote, name, location }, i) => (
                        <motion.div
                            key={name}
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.55, delay: i * 0.12 }}
                            className="bg-white rounded-2xl p-7 shadow-sm border border-[hsl(32,18%,88%)] flex flex-col gap-5"
                        >
                            {/* Stars */}
                            <div className="flex items-center gap-1">
                                {Array.from({ length: rating }).map((_, j) => (
                                    <Star key={j} className="w-3.5 h-3.5 fill-primary text-primary" />
                                ))}
                            </div>
                            <p className="text-sm text-[hsl(24,12%,30%)] leading-relaxed flex-1">
                                &ldquo;{quote}&rdquo;
                            </p>
                            <div className="pt-4 border-t border-[hsl(32,18%,91%)]">
                                <p className="text-sm font-semibold text-[hsl(24,15%,14%)]">{name}</p>
                                <p className="text-xs text-[hsl(25,10%,52%)] mt-0.5">{location}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* CTA Banner */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="bg-[hsl(24,15%,10%)] rounded-2xl px-8 py-10 flex flex-col sm:flex-row items-center justify-between gap-6"
                >
                    <div>
                        <h3 className="text-xl font-bold text-white mb-1">Ready to design your dream space?</h3>
                        <p className="text-sm text-white/50">Schedule a free consultation and 3D design preview.</p>
                    </div>
                    <Link
                        href="/contact"
                        className="flex-shrink-0 inline-flex items-center gap-2 px-7 py-3.5 bg-white text-[hsl(24,15%,12%)] font-semibold text-sm rounded-full hover:bg-[hsl(36,55%,86%)] transition-colors shadow-sm"
                    >
                        Get in Touch <ArrowRight className="w-4 h-4" />
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
