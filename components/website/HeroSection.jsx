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
    <div className="relative container mx-auto flex flex-col lg:flex-row items-center justify-between py-20 px-4 sm:px-6 lg:px-8">
      {/* Background Decorative Elements */}
      <div className="absolute -z-10 inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-primary/5 to-transparent"></div>
        <div className="absolute bottom-0 right-0 w-1/2 h-1/2 rounded-full bg-primary/5 blur-3xl"></div>
      </div>
      
      {/* Left Section */}
      <div className="lg:w-1/2 text-center lg:text-left space-y-8 lg:pr-10">
        <motion.p
          {...motionSettings}
          variants={titleVariants}
          className="tracking-widest uppercase text-primary font-medium text-sm lg:text-base"
        >
          Crafting Timeless Spaces
        </motion.p>

        <motion.h1
          {...motionSettings}
          variants={desVariants}
          className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight"
        >
          Elevate Your Kitchen <br className="hidden sm:block" /> Into a <span className="text-primary">Masterpiece</span>
        </motion.h1>

        <motion.p
          {...motionSettings}
          variants={tagVariants}
          className="text-gray-600 text-lg lg:text-xl leading-relaxed max-w-lg"
        >
          Transform your cooking space with our bespoke interior designs. We blend functionality with artistry to create kitchens that inspire creativity and bring people together.
        </motion.p>

        <motion.div 
          {...motionSettings} 
          variants={tagVariants}
          className="flex flex-col sm:flex-row gap-4 pt-4"
        >
          <Button
            onClick={handleRedirect}
            className="px-8 py-6 text-white bg-primary rounded-full hover:bg-primary-dark transition-all duration-300 hover:shadow-xl"
          >
            <span className="flex items-center">
              Book Consultation <TbArrowUpRight className="w-5 h-5 ml-2" />
            </span>
          </Button>
          <Button
            onClick={() => router.push('/project')}
            variant="outline"
            className="px-8 py-6 text-gray-900 border-gray-300 rounded-full hover:bg-gray-50 transition-all duration-300 hover:shadow-xl"
          >
            View Portfolio
          </Button>
        </motion.div>

        
      </div>

      {/* Right Image Section */}
      <motion.div
        {...motionSettings}
        variants={titleVariants}
        className="lg:w-1/2 mt-12 lg:mt-0 relative"
      >
        <div className="relative aspect-square w-full max-w-2xl mx-auto">
          <Image
            src="/image/eb-1.png"
            alt="Luxury Kitchen Design"
            fill
            priority
            quality={90}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
            className="rounded-2xl object-cover shadow-2xl border-8 border-white"
          />
          <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-2xl shadow-lg hidden lg:block">
            <div className="text-primary font-bold text-2xl">15+ Years</div>
            <div className="text-gray-600">Of Excellence</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default HeroSection;