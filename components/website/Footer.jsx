'use client'

import Link from "next/link";
import { Input } from "../ui/input";
import { motion } from "framer-motion";
import { desVariants, titleVariants } from "@/utils/animation";

// Reusable component for the link sections
const FooterLinkSection = ({ title, links, variants }) => (
  <motion.div initial="offscreen" whileInView="onscreen" variants={variants}>
    <h2 className="pb-4 text-xl font-semibold uppercase">{title}</h2>
    <div className="flex flex-col">
      {links.map((link, index) => (
        <Link key={index} href={link.href} className="py-1 hover:underline">
          {link.text}
        </Link>
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
    { href: '/', text: 'Facebook' },
    { href: '/', text: 'Instagram' },
    { href: '/', text: 'X' },
    { href: '/', text: 'Contact' },
  ];

  return (
    <div className="bg-tertiary">
      <div className="container lg:grid lg:grid-cols-2 py-14">
        <div className="grid gap-4 pb-4 text-left lg:pb-0 lg:grid-cols-3">
          <FooterLinkSection
            title="Company"
            links={companyLinks}
            variants={titleVariants}
          />
          <FooterLinkSection
            title="Connect"
            links={connectLinks}
            variants={titleVariants}
          />
        </div>
        <motion.div
          initial="offscreen"
          whileInView="onscreen"
          variants={titleVariants}
        >
          <p className="pb-4 text-xl font-semibold">Stay Connected</p>
          <div className="relative lg:max-w-sm">
            <Input type="email" id="email" placeholder="Email Address" />
            <button className="absolute bg-black text-white rounded-full h-10 px-3 text-sm top-2 right-2 hover:border-2 hover:border-black hover:bg-white hover:text-black">
              Contact
            </button>
          </div>
        </motion.div>
      </div>
      <motion.div
        initial="offscreen"
        whileInView="onscreen"
        variants={desVariants}
        className="py-10 bg-black"
      >
        <div className="container text-white text-center lg:justify-between lg:flex">
          <div className="pb-4 lg:pb-0 w-full flex justify-between">
            <p>&copy; 2024. All rights reserved</p>
            <p>~ Atharv Shelke</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
