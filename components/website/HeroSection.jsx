'use client';

import React from 'react';
import { Button } from '../ui/button';
import { TbArrowUpRight } from "react-icons/tb";
import Image from 'next/image';
import { desVariants, tagVariants, titleVariants } from "@/utils/animation";
import { motion } from 'framer-motion';

const motionSettings = {
  initial: "offscreen",
  whileInView: "onscreen",
  viewport: { once: true, amount: 0.2 },
};

const HeroSection = () => {
  return (
    <div className="container py-12 xl:py-24 text-center lg:py-0 lg:text-left lg:flex lg:justify-between">
      {/* Left Section */}
      <div className="lg:w-1/2 xl:py-14 lg:py-8">
        <motion.p
          {...motionSettings}
          variants={titleVariants}
          className="tracking-widest uppercase"
        >
          Offer for the best Interior
        </motion.p>
        <motion.h1
          {...motionSettings}
          variants={desVariants}
          className="h1"
        >
          Make your kitchen a <br /> piece of art
        </motion.h1>
        <motion.p
          {...motionSettings}
          variants={tagVariants}
          className="pb-6 text-muted-foreground xl:pb-10"
        >
          Change your view with the best interior design. We provide the best
          interior design for your Kitchen. Make every moment beautiful with the
          best interior design.
        </motion.p>
        <motion.div {...motionSettings} variants={tagVariants}>
          <Button className="inline-flex items-center px-8 py-3 text-white rounded-full shadow-lg hover:bg-gray-800 hover:ring-2 hover:ring-gray-950 ring-offset-2">
            Book Now <TbArrowUpRight className="w-5 h-5 ml-2" />
          </Button>
        </motion.div>
      </div>

      {/* Right Image Section */}
      <motion.div
        {...motionSettings}
        variants={titleVariants}
        className="hidden lg:flex lg:w-1/2 items-center justify-center"
      >
        <Image
          src="/downloads/hero.jpg"
          width={448}
          height={600}
          alt="Hero Section"
          className="w-[448px] h-[600px] object-contain"
          priority
        />
      </motion.div>
    </div>
  );
};

export default HeroSection;
