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
    <div className="relative mx-auto py-6 sm:py-12 lg:py-10 px-4 sm:px-6 lg:px-8">
      {/* Background Decorative Elements */}
      <div className="absolute -z-10 inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-primary/5 to-transparent"></div>
        <div className="absolute bottom-0 right-0 w-1/2 h-1/2 rounded-full bg-primary/5 blur-3xl"></div>
      </div>
      
      {/* Mobile: Stack Layout, Desktop: Side by Side */}
      <div className="flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-10">
        
        {/* Content Section */}
        <div className="w-full lg:w-1/2 text-center lg:text-left space-y-4 lg:space-y-8 order-2 lg:order-1">
          <motion.p
            {...motionSettings}
            variants={titleVariants}
            className="tracking-widest uppercase text-primary font-medium text-xs lg:text-base"
          >
            Crafting Timeless Spaces
          </motion.p>

          <motion.h1
            {...motionSettings}
            variants={desVariants}
            className="text-2xl sm:text-3xl lg:text-5xl xl:text-6xl font-bold text-gray-900 leading-tight"
          >
            Elevate Your Kitchen Into a <span className="text-primary">Masterpiece</span>
          </motion.h1>

          <motion.p
            {...motionSettings}
            variants={tagVariants}
            className="text-gray-600 text-sm lg:text-xl leading-relaxed"
          >
            Transform your cooking space with our bespoke interior designs. We blend functionality with artistry to create kitchens that inspire creativity.
          </motion.p>

          <motion.div 
            {...motionSettings} 
            variants={tagVariants}
            className="flex flex-col sm:flex-row gap-3 pt-4 justify-center lg:justify-start"
          >
            <Button
              onClick={handleRedirect}
              className="px-6 py-3 lg:px-8 lg:py-6 text-white bg-primary rounded-full hover:bg-primary-dark transition-all duration-300 hover:shadow-xl text-sm lg:text-base"
            >
              <span className="flex items-center justify-center">
                Book Consultation <TbArrowUpRight className="w-4 h-4 lg:w-5 lg:h-5 ml-2" />
              </span>
            </Button>
            <Button
              onClick={() => router.push('/project')}
              variant="outline"
              className="px-6 py-3 lg:px-8 lg:py-6 text-gray-900 border-gray-300 rounded-full hover:bg-gray-50 transition-all duration-300 hover:shadow-xl text-sm lg:text-base"
            >
              View Portfolio
            </Button>
          </motion.div>
        </div>

        {/* Image Section */}
        <motion.div
          {...motionSettings}
          variants={titleVariants}
          className="w-full lg:w-1/2 max-w-xs sm:max-w-sm lg:max-w-2xl relative order-1 lg:order-2"
        >
          <div className="relative aspect-square w-full">
            <Image
              src="/image/eb-1.png"
              alt="Luxury Kitchen Design"
              fill
              priority
              quality={90}
              sizes="(max-width: 640px) 75vw, (max-width: 1024px) 50vw, 800px"
              className="rounded-2xl object-cover shadow-2xl border-4 lg:border-8 border-white"
            />
            {/* Badge - Always visible but responsive */}
            <div className="absolute -bottom-2 -right-2 lg:-bottom-6 lg:-right-6 bg-white p-2 lg:p-6 rounded-xl lg:rounded-2xl shadow-lg">
              <div className="text-primary font-bold text-sm lg:text-2xl">15+ Years</div>
              <div className="text-gray-600 text-xs lg:text-base">Of Excellence</div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HeroSection;
