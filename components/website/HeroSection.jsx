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
    router.push('/contact')
  }
  return (
    <div className="container text-center lg:py-0 lg:text-left lg:flex lg:justify-between lg:items-center">
      {/* Left Section */}
      <div className="lg:w-1/2 xl:py-14 py-8">
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
          <Button onClick={handleRedirect} className="inline-flex items-center px-8 py-3 text-white rounded-full shadow-lg hover:bg-gray-800 hover:ring-2 hover:ring-gray-950 ring-offset-2">
            Book Now <TbArrowUpRight className="w-5 h-5 ml-2" />
          </Button>
        </motion.div>
      </div>

      {/* Right Image Section */}
      <motion.div
        {...motionSettings}
        variants={titleVariants}
        className="hidden lg:flex lg:w-1/2 py-20 items-center justify-center"
      >
        {/* <Image
          src="/downloads/hero.jpg"
          height={200}
          width={500}
          alt="Hero Section"
          className="h-3/5 object-contain"
          priority
        /> */}
        <img
         src="/downloads/hero.jpg"
          alt=""
          className='h-[500px] w-[500px] object-contain' />
      </motion.div>
    </div>
  );
};

export default HeroSection;
