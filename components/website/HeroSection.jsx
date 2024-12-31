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
  };

  return (
    <div className="container mx-auto text-center lg:text-left lg:flex lg:justify-between lg:items-center lg:py-16 py-12 px-6">
      {/* Left Section */}
      <div className="lg:w-1/2 xl:py-12">
        <motion.p
          {...motionSettings}
          variants={titleVariants}
          className="tracking-widest uppercase text-gray-500 text-sm lg:text-base mb-2"
        >
          Offer for the Best Interior
        </motion.p>
        <motion.h1
          {...motionSettings}
          variants={desVariants}
          className="text-4xl lg:text-5xl font-extrabold text-black mb-6 leading-tight"
        >
          Make Your Kitchen a <br /> Piece of Art
        </motion.h1>
        <motion.p
          {...motionSettings}
          variants={tagVariants}
          className="text-gray-600 text-base lg:text-lg leading-relaxed mb-8 xl:mb-10"
        >
          Change your view with the best interior design. We provide the best
          interior design for your kitchen. Make every moment beautiful with the
          best interior design.
        </motion.p>
        <motion.div {...motionSettings} variants={tagVariants}>
          <Button
            onClick={handleRedirect}
            className="inline-flex items-center px-8 py-3 text-white bg-primary rounded-full shadow-md hover:bg-gray-800 transition-transform transform hover:scale-105"
          >
            Book Now <TbArrowUpRight className="w-5 h-5 ml-2" />
          </Button>
        </motion.div>
      </div>
  
      {/* Right Image Section */}
      <motion.div
        {...motionSettings}
        variants={titleVariants}
        className="hidden lg:flex lg:w-1/2 justify-center items-center py-12 lg:py-0"
      >
        <Image
          src="/downloads/kitchen-hero-section-banner-transformed.webp"
          alt="Hero Section"
          width={500}
          height={500}
          quality={80}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 500px"
          className="rounded-lg shadow-lg object-contain"
        />
      </motion.div>
    </div>
  );
};

export default HeroSection;

// older one
 // <div className="container text-center lg:py-0 lg:text-left lg:flex lg:justify-between lg:items-center">
    //   {/* Left Section */}
    //   <div className="lg:w-1/2 xl:py-14 py-8">
    //     <motion.p
    //       {...motionSettings}
    //       variants={titleVariants}
    //       className="tracking-widest uppercase"
    //     >
    //       Offer for the best Interior
    //     </motion.p>
    //     <motion.h1
    //       {...motionSettings}
    //       variants={desVariants}
    //       className="h1"
    //     >
    //       Make your kitchen a <br /> piece of art
    //     </motion.h1>
    //     <motion.p
    //       {...motionSettings}
    //       variants={tagVariants}
    //       className="pb-6 text-muted-foreground xl:pb-10"
    //     >
    //       Change your view with the best interior design. We provide the best
    //       interior design for your Kitchen. Make every moment beautiful with the
    //       best interior design.
    //     </motion.p>
    //     <motion.div {...motionSettings} variants={tagVariants}>
    //       <Button onClick={handleRedirect} className="inline-flex items-center px-8 py-3 text-white rounded-full shadow-lg hover:bg-gray-800 hover:ring-2 hover:ring-gray-950 ring-offset-2">
    //         Book Now <TbArrowUpRight className="w-5 h-5 ml-2" />
    //       </Button>
    //     </motion.div>
    //   </div>

    //   {/* Right Image Section */}
    //   <motion.div
    //     {...motionSettings}
    //     variants={titleVariants}
    //     className="hidden lg:flex lg:w-1/2 py-20 items-center justify-center"
    //   >
    //     {/* <Image
    //       src="/downloads/hero.jpg"
    //       height={200}
    //       width={500}
    //       alt="Hero Section"
    //       className="h-3/5 object-contain"
    //       priority
    //     /> */}
    //     <img
    //      src="/downloads/hero.jpg"
    //       alt=""
    //       className='h-[500px] w-[500px] object-contain' />
    //   </motion.div>
    // </div>


// newer one
 // <div className="relative bg-gray-50">
    //   <div className="container mx-auto flex flex-col-reverse lg:flex-row items-center lg:py-10 py-6 px-6">

    //     {/* Text Section */}
    //     <div className="z-10 lg:w-1/2 text-center lg:text-left">
    //       <motion.p
    //         {...motionSettings}
    //         variants={titleVariants}
    //         className="tracking-widest uppercase text-gray-500 text-sm lg:text-base"
    //       >
    //         Offer for the Best Interior
    //       </motion.p>
    //       <motion.h1
    //         {...motionSettings}
    //         variants={desVariants}
    //         className="text-4xl lg:text-6xl font-extrabold text-gray-800 mt-4 leading-tight"
    //       >
    //         Make Your Kitchen a <br /> Piece of Art
    //       </motion.h1>
    //       <motion.p
    //         {...motionSettings}
    //         variants={tagVariants}
    //         className="text-gray-600 text-base lg:text-lg mt-6 mb-10 lg:mb-14 leading-relaxed"
    //       >
    //         Transform your space with exquisite interior designs. Experience the best
    //         craftsmanship and attention to detail, turning your kitchen into a masterpiece.
    //       </motion.p>
    //       <motion.div {...motionSettings} variants={tagVariants}>
    //         <Button
    //           onClick={handleRedirect}
    //           className="inline-flex items-center px-6 py-3 text-white bg-black rounded-full shadow-md hover:bg-gray-800 transition-all duration-300"
    //         >
    //           Book Now <TbArrowUpRight className="w-5 h-5 ml-2" />
    //         </Button>
    //       </motion.div>
    //     </div>

    //     {/* Image Section */}
    //     <motion.div
    //       {...motionSettings}
    //       variants={titleVariants}
    //       className="lg:w-1/2 w-full mb-8 lg:mb-0 lg:pl-12"
    //     >
    //       <Image
    //         src="/downloads/kitchen-hero-section-banner.jpg"
    //         alt="Kitchen Hero Section Banner"
    //         width={800}
    //         height={500}
    //         className="rounded-lg shadow-lg object-cover"
    //         priority
    //       />
    //     </motion.div>
    //   </div>
    // </div>
