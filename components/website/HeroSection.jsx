'use client';

import React from 'react';
import { Button } from '../ui/button';
import { TbArrowUpRight } from "react-icons/tb";
import Image from 'next/image';
import { desVariants, tagVariants, titleVariants } from "@/utils/animation";
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

const motionSettings = {
  initial: "offscreen",
  whileInView: "onscreen",
  viewport: { once: true, amount: 0.2 },
};

const HeroSection = () => {
  const router = useRouter();
  const handleRedirect = () => {
    router.push('/contact');
  };

  return (
    <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between py-16 px-6">
      
      {/* Left Section */}
      <div className="lg:w-1/2 text-center lg:text-left space-y-6">
        <motion.p
          {...motionSettings}
          variants={titleVariants}
          className="tracking-widest uppercase text-gray-500 text-sm lg:text-base"
        >
          Offer for the Best Interior
        </motion.p>

        <motion.h1
          {...motionSettings}
          variants={desVariants}
          className="text-4xl lg:text-5xl font-extrabold bg-gradient-to-r from-gray-900 to-gray-600 text-transparent bg-clip-text leading-tight"
        >
          Make Your Kitchen a <br /> Piece of Art
        </motion.h1>

        <motion.p
          {...motionSettings}
          variants={tagVariants}
          className="text-gray-700 text-base lg:text-lg leading-relaxed max-w-lg"
        >
          Change your view with the best interior design. We provide the best
          interior design for your kitchen. Make every moment beautiful with the
          best interior design.
        </motion.p>

        <motion.div {...motionSettings} variants={tagVariants}>
          <Button
            onClick={handleRedirect}
            className="inline-flex items-center px-8 py-3 text-white bg-primary rounded-full shadow-md hover:bg-gray-800 transition-transform transform hover:scale-105 hover:shadow-lg hover:-rotate-2 duration-300"
          >
            Book Now <TbArrowUpRight className="w-5 h-5 ml-2" />
          </Button>
        </motion.div>
      </div>

      {/* Right Image Section */}
      <motion.div
        {...motionSettings}
        variants={titleVariants}
        className="lg:w-1/2 flex justify-center items-center py-12 lg:py-0"
      >
        <Image
          src="/downloads/hero-section.webp"
          alt="Hero Section"
          width={500}
          height={500}
          quality={80}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 500px"
          className="rounded-lg shadow-lg object-cover transition-transform duration-300 hover:scale-105 hover:shadow-xl border border-gray-200 hover:border-gray-400"
        />
      </motion.div>

    </div>
  );
};

export default HeroSection;
