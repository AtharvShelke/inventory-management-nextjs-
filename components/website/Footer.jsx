'use client'

import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { desVariants, titleVariants } from "@/utils/animation";

const FooterLinkSection = ({ title, links, variants }) => (
  <motion.div 
    initial="offscreen" 
    whileInView="onscreen" 
    variants={variants} 
    className="space-y-3"
  >
    <h2 className="pb-2 text-lg font-semibold uppercase text-gray-800">{title}</h2>
    <div className="flex flex-col space-y-2">
      {links.map((link, index) => (
        <motion.div key={index} whileHover={{ scale: 1.05 }}>
          <Link href={link.href} className="text-gray-600 hover:text-gray-900 transition">
            {link.text}
          </Link>
        </motion.div>
      ))}
    </div>
  </motion.div>
);

export default function Footer() {
  const companyLinks = [
    { href: '/', text: 'About Us' },
    { href: '/', text: 'Gallery' },
    { href: '/', text: 'Project' },
    { href: '/', text: 'Contact' },
  ];

  const connectLinks = [
    { href: 'https://facebook.com/enrichkitchenstudio', text: 'Facebook' },
    { href: 'https://instagram.com/enrichkitchenstudio', text: 'Instagram' },
    { href: 'https://twitter.com/enrichkitchen', text: 'X' },
    { href: '/contact', text: 'Contact' },
  ];

  return (
    <div className="bg-tertiary">
      <div className="container grid lg:grid-cols-3 gap-12 py-14 px-8">
        
        {/* Logo Section */}
        <motion.div 
          initial="offscreen" 
          whileInView="onscreen" 
          variants={titleVariants} 
          className='flex flex-col items-start space-y-4'
        >
          <Link href="/">
            <Image
              src="/downloads/logo.webp"
              alt="Enrich Kitchen Studio Logo"
              width={240}
              height={73.5}
              priority
              className="rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
            />
          </Link>
        </motion.div>

        {/* Links Section */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <FooterLinkSection title="Company" links={companyLinks} variants={titleVariants} />
          <FooterLinkSection title="Connect" links={connectLinks} variants={titleVariants} />
        </div>

        {/* Contact Info Section */}
        <motion.div
          initial="offscreen"
          whileInView="onscreen"
          variants={titleVariants}
          className="flex flex-col gap-4 justify-center bg-gray-100 p-6 rounded-2xl"
        >
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Contact Us</h3>
          <div className="flex items-start gap-2">
            <span role="img" aria-label="address">📍</span>
            <span className="text-gray-700">ENRICH MODULAR FURNITURE 24/39 MIDC CHIKALTHANA NR Dekson Casting Chhatrapati Sambhajinagar</span>
          </div>
          <div className="flex items-center gap-2">
            <span role="img" aria-label="phone">📞</span>
            <a href="tel:9881734646" className="text-gray-700 hover:text-primary">9881734646</a>
          </div>
          <div className="flex items-center gap-2">
            <span role="img" aria-label="email">✉️</span>
            <a href="mailto:sp@enrichfurniture.com" className="text-gray-700 hover:text-primary">sp@enrichfurniture.com</a>
          </div>
        </motion.div>

        {/* Google Maps Section */}
        <motion.div 
          initial="offscreen" 
          whileInView="onscreen" 
          variants={titleVariants} 
          className='w-full md:w-auto mt-5 flex justify-center lg:justify-start'
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d28999.725227555075!2d75.36096095162843!3d19.8828125!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bdba30039c6aac1%3A0x5dea8c66d61bc474!2sENRICH%20MODULAR%20FURNITURE!5e1!3m2!1sen!2sin!4v1735317422331!5m2!1sen!2sin"
            width="100%"
            height="250"
            style={{ border: 0, borderRadius: '12px', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </motion.div>
      </div>

      {/* Bottom Footer Bar */}
      <motion.div
        initial="offscreen"
        whileInView="onscreen"
        variants={desVariants}
        className="py-6 bg-gray-900 text-white text-center border-t border-gray-700"
      >
        <div className="container flex flex-col md:flex-row justify-between items-center opacity-80">
          <p>&copy; {new Date().getFullYear()}. All rights reserved</p>
          <Link href={"https://atharv-portfolio-ivory.vercel.app/"} className="mt-2 md:mt-0 font-medium">~ Atharv Shelke</Link>
        </div>
      </motion.div>
    </div>
  );
}
