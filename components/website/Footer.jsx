'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Instagram, Facebook } from 'lucide-react';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/project', label: 'Projects' },
  { href: '/contact', label: 'Contact' },
];

const contactItems = [
  {
    Icon: MapPin,
    label: 'ENRICH MODULAR FURNITURE\n24/39 MIDC Chikalthana, NR Dekson Casting,\nChhatrapati Sambhajinagar',
    href: 'https://maps.app.goo.gl/nGvs73wUCxqi6tf88',
  },
  { Icon: Phone, label: '+91 98817 34646', href: 'tel:9881734646' },
  { Icon: Mail, label: 'sp@enrichfurniture.com', href: 'mailto:sp@enrichfurniture.com' },
];

export default function Footer() {
  return (
    <footer className="bg-[hsl(24,20%,10%)] text-white">
      {/* Main grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-10">
        <div className="grid lg:grid-cols-12 gap-12">

          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-4"
          >
            <Link href="/" className="inline-flex items-center gap-1.5 mb-6">
              <span className="text-xl font-bold tracking-tight text-white">ENRICH</span>
              <span className="text-xl font-light tracking-[0.14em] text-[hsl(36,55%,70%)]">STUDIO</span>
            </Link>
            <p className="text-[hsl(36,12%,62%)] text-sm leading-relaxed max-w-xs">
              Crafting premium modular furniture with timeless design and exceptional quality for discerning homes.
            </p>
            {/* Social */}
            <div className="flex items-center gap-4 mt-6">
              {[
                { href: 'https://instagram.com/enrichkitchenstudio', Icon: Instagram, label: 'Instagram' },
                { href: 'https://facebook.com/enrichkitchenstudio', Icon: Facebook, label: 'Facebook' },
              ].map(({ href, Icon, label }) => (
                <Link
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center text-white/50 hover:text-white hover:border-white/40 transition-all duration-300"
                >
                  <Icon className="w-4 h-4" />
                </Link>
              ))}
            </div>
          </motion.div>

          {/* Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-2 lg:col-start-6"
          >
            <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-white/35 mb-5">Pages</h3>
            <ul className="space-y-3">
              {navLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-[hsl(36,12%,62%)] hover:text-white transition-colors duration-200"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-4 lg:col-start-9"
          >
            <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-white/35 mb-5">Get in Touch</h3>
            <ul className="space-y-4">
              {contactItems.map(({ Icon, label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    target={href.startsWith('http') ? '_blank' : undefined}
                    rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="flex items-start gap-3 group"
                  >
                    <Icon className="w-4 h-4 mt-0.5 flex-shrink-0 text-primary/70 group-hover:text-primary transition-colors" />
                    <span className="text-sm text-[hsl(36,12%,62%)] leading-relaxed group-hover:text-white/80 transition-colors whitespace-pre-line">
                      {label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>

      {/* Map */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10">
        <div className="rounded-xl overflow-hidden opacity-70 hover:opacity-90 transition-opacity">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d28999.725227555075!2d75.36096095162843!3d19.8828125!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bdba30039c6aac1%3A0x5dea8c66d61bc474!2sENRICH%20MODULAR%20FURNITURE!5e1!3m2!1sen!2sin!4v1735317422331!5m2!1sen!2sin"
            width="100%"
            height="240"
            style={{ border: 0, display: 'block' }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Enrich Studio Location Map"
          />
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-white/30">
            &copy; {new Date().getFullYear()} Enrich Studio. All rights reserved.
          </p>
          <Link
            href="https://atharv-shelke-portfolio.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-white/25 hover:text-white/50 transition-colors"
          >
            Designed &amp; Developed by Atharv Shelke
          </Link>
        </div>
      </div>
    </footer>
  );
}
