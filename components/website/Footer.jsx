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
    className="space-y-4"
  >
    <h3 className="text-sm font-medium uppercase tracking-wider text-gray-400 mb-6">{title}</h3>
    <div className="flex flex-col space-y-3">
      {links.map((link, index) => (
        <motion.div key={index} whileHover={{ x: 4 }}>
          <Link href={link.href} className="text-gray-300 hover:text-white transition-all duration-300 text-sm">
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
    { href: '/', text: 'Projects' },
    { href: '/', text: 'Contact' },
  ];

  const connectLinks = [
    { href: 'https://facebook.com/enrichkitchenstudio', text: 'Facebook' },
    { href: 'https://instagram.com/enrichkitchenstudio', text: 'Instagram' },
    { href: 'https://twitter.com/enrichkitchen', text: 'Twitter' },
    { href: '/contact', text: 'Contact' },
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-8">
        
        {/* Main Footer Content */}
        <div className="grid lg:grid-cols-12 gap-12 py-16">
          
          {/* Brand Section */}
          <motion.div 
            initial="offscreen" 
            whileInView="onscreen" 
            variants={titleVariants} 
            className='lg:col-span-4 space-y-6'
          >
            <Link href="/">
              <Image
                src="/logo.webp"
                alt="Enrich Kitchen Studio Logo"
                width={200}
                height={60}
                priority
                className="hover:scale-105 transition-transform duration-300 rounded-lg shadow-lg"
              />
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              Crafting luxury modular furniture with exceptional design and premium quality for discerning clients.
            </p>
          </motion.div>

          {/* Navigation Links */}
          <div className="lg:col-span-4 grid grid-cols-2 gap-8">
            <FooterLinkSection title="Company" links={companyLinks} variants={titleVariants} />
            <FooterLinkSection title="Connect" links={connectLinks} variants={titleVariants} />
          </div>

          {/* Contact Information */}
          <motion.div
            initial="offscreen"
            whileInView="onscreen"
            variants={titleVariants}
            className="lg:col-span-4 space-y-6"
          >
            <h3 className="text-sm font-medium uppercase tracking-wider text-gray-400 mb-6">Get in Touch</h3>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 mt-1 flex-shrink-0">
                  <svg className="w-full h-full text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed">
                  ENRICH MODULAR FURNITURE<br />
                  24/39 MIDC CHIKALTHANA<br />
                  NR Dekson Casting<br />
                  Chhatrapati Sambhajinagar
                </p>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 flex-shrink-0">
                  <svg className="w-full h-full text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                </div>
                <a href="tel:9881734646" className="text-gray-300 hover:text-white transition-colors text-sm">
                  +91 9881734646
                </a>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 flex-shrink-0">
                  <svg className="w-full h-full text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                </div>
                <a href="mailto:sp@enrichfurniture.com" className="text-gray-300 hover:text-white transition-colors text-sm">
                  sp@enrichfurniture.com
                </a>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Map Section */}
        <motion.div 
          initial="offscreen" 
          whileInView="onscreen" 
          variants={titleVariants} 
          className='pb-16'
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d28999.725227555075!2d75.36096095162843!3d19.8828125!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bdba30039c6aac1%3A0x5dea8c66d61bc474!2sENRICH%20MODULAR%20FURNITURE!5e1!3m2!1sen!2sin!4v1735317422331!5m2!1sen!2sin"
            width="100%"
            height="300"
            style={{ 
              border: 0, 
              borderRadius: '12px', 
              
              opacity: 1
            }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          initial="offscreen"
          whileInView="onscreen"
          variants={desVariants}
          className="py-8 border-t border-gray-800"
        >
          {/* <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
            <p>&copy; {new Date().getFullYear()} Enrich Kitchen Studio. All rights reserved.</p>
            <Link 
              href="https://atharv-portfolio-ivory.vercel.app/" 
              className="mt-4 md:mt-0 hover:text-white transition-colors"
            >
              Designed by Atharv Shelke
            </Link>
          </div> */}
        </motion.div>
      </div>
    </footer>
  );
}
