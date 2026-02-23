'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Send, CheckCircle, AlertCircle, Clock } from 'lucide-react';

const contactDetails = [
  {
    Icon: MapPin,
    label: 'Showroom',
    value: '24/39 MIDC Chikalthana, NR Dekson Casting,\nChhatrapati Sambhajinagar',
    href: 'https://maps.app.goo.gl/nGvs73wUCxqi6tf88',
  },
  {
    Icon: Phone,
    label: 'Phone',
    value: '+91 98817 34646',
    href: 'tel:9881734646',
  },
  {
    Icon: Mail,
    label: 'Email',
    value: 'sp@enrichfurniture.com',
    href: 'mailto:sp@enrichfurniture.com',
  },
];

const inputBase =
  'w-full bg-transparent border-0 border-b border-[hsl(32,18%,80%)] focus:border-primary outline-none py-3 text-sm text-[hsl(24,15%,14%)] placeholder:text-[hsl(25,10%,58%)] transition-colors duration-200';

export default function ContactPage() {
  const [formData, setFormData] = useState({ firstname: '', lastname: '', email: '', phone: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | loading | success | error

  const handleChange = (e) => {
    setFormData((p) => ({ ...p, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (status === 'loading') return;
    setStatus('loading');

    const body = {
      ...formData,
      access_key: process.env.NEXT_PUBLIC_CONTACT_FORM_ACCESS_KEY,
    };

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      setStatus(data.success ? 'success' : 'error');
      if (data.success) setFormData({ firstname: '', lastname: '', email: '', phone: '', message: '' });
    } catch {
      setStatus('error');
    }
  };

  return (
    <div className="min-h-screen bg-[hsl(36,20%,97%)]">
      {/* Page Hero */}
      <div className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="text-xs font-semibold uppercase tracking-[0.22em] text-primary/65 mb-3"
        >
          Get in Touch
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[hsl(24,15%,12%)] leading-tight tracking-tight"
        >
          Let&apos;s discuss your<br className="hidden sm:block" /> dream space.
        </motion.h1>
      </div>

      {/* Main content */}
      <section className="pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-20">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.15 }}
            className="lg:col-span-3"
          >
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Name row */}
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="firstname" className="block text-xs font-medium uppercase tracking-[0.12em] text-[hsl(25,10%,52%)] mb-2">
                    First Name <span className="text-primary">*</span>
                  </label>
                  <input
                    id="firstname"
                    name="firstname"
                    value={formData.firstname}
                    onChange={handleChange}
                    required
                    placeholder="Your first name"
                    className={inputBase}
                  />
                </div>
                <div>
                  <label htmlFor="lastname" className="block text-xs font-medium uppercase tracking-[0.12em] text-[hsl(25,10%,52%)] mb-2">
                    Last Name
                  </label>
                  <input
                    id="lastname"
                    name="lastname"
                    value={formData.lastname}
                    onChange={handleChange}
                    placeholder="Your last name"
                    className={inputBase}
                  />
                </div>
              </div>

              {/* Email + Phone */}
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="email" className="block text-xs font-medium uppercase tracking-[0.12em] text-[hsl(25,10%,52%)] mb-2">
                    Email <span className="text-primary">*</span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="your@email.com"
                    className={inputBase}
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-xs font-medium uppercase tracking-[0.12em] text-[hsl(25,10%,52%)] mb-2">
                    Phone
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 00000 00000"
                    className={inputBase}
                  />
                </div>
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-xs font-medium uppercase tracking-[0.12em] text-[hsl(25,10%,52%)] mb-2">
                  Message <span className="text-primary">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  placeholder="Tell us about your project, the space, your timeline, or any questions…"
                  className={`${inputBase} resize-none`}
                />
              </div>

              {/* Submit */}
              <div>
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="inline-flex items-center gap-2.5 px-8 py-4 bg-[hsl(24,15%,12%)] text-white font-semibold text-sm rounded-full hover:bg-primary transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {status === 'loading' ? (
                    <>
                      <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}>
                        <Clock className="w-4 h-4" />
                      </motion.div>
                      Sending…
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Send Message
                    </>
                  )}
                </button>

                {/* Feedback */}
                {status === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-5 flex items-center gap-2 text-sm text-green-700 bg-green-50 border border-green-100 px-4 py-3 rounded-xl"
                  >
                    <CheckCircle className="w-4 h-4 flex-shrink-0" />
                    Thank you! We&apos;ll be in touch within 24 hours.
                  </motion.div>
                )}
                {status === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-5 flex items-center gap-2 text-sm text-red-700 bg-red-50 border border-red-100 px-4 py-3 rounded-xl"
                  >
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    Something went wrong. Please try again or call us directly.
                  </motion.div>
                )}
              </div>
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.28 }}
            className="lg:col-span-2"
          >
            <div className="space-y-10">
              <div>
                <h2 className="text-lg font-semibold text-[hsl(24,15%,12%)] mb-2">Our Studio</h2>
                <p className="text-sm text-[hsl(25,10%,44%)] leading-relaxed">
                  Visit our showroom to experience our craftsmanship firsthand. Our design team is available to discuss your project and help you visualize the possibilities.
                </p>
              </div>

              <div className="space-y-7">
                {contactDetails.map(({ Icon, label, value, href }) => (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith('http') ? '_blank' : undefined}
                    rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="flex items-start gap-4 group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-[hsl(40,35%,92%)] flex items-center justify-center flex-shrink-0 group-hover:bg-primary/10 transition-colors">
                      <Icon className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[hsl(25,10%,55%)] mb-1">{label}</p>
                      <p className="text-sm text-[hsl(24,15%,18%)] leading-relaxed whitespace-pre-line group-hover:text-primary transition-colors">{value}</p>
                    </div>
                  </a>
                ))}
              </div>

              {/* Hours */}
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-[hsl(25,10%,55%)] mb-3">Studio Hours</h3>
                <div className="space-y-1.5 text-sm text-[hsl(24,15%,24%)]">
                  <p>Mon – Sat: 10:00 AM – 7:00 PM</p>
                  <p>Sunday: 11:00 AM – 5:00 PM</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
