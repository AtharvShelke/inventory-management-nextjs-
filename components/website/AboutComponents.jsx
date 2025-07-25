'use client';

import Image from "next/image";
import { motion } from "framer-motion";
import { desVariants, tagVariants, titleVariants } from "@/utils/animation";

const AboutComponents = () => {
  const motionSettings = {
    initial: "offscreen",
    whileInView: "onscreen",
    viewport: { once: true },
  };

  return (
    <section className="container py-16 xl:py-24" aria-labelledby="about-heading">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        
        {/* Image Section */}
        <motion.div 
          {...motionSettings} 
          variants={titleVariants} 
          className="relative flex justify-center"
        >
          <div className="relative rounded-xl overflow-hidden shadow-xl transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
            <Image
              src="/whatsapp/h1.jpeg"
              width={736}
              height={736}
              alt="Creative kitchen design solutions"
              className="h-[300px] sm:h-[400px] lg:h-[500px] w-auto object-cover rounded-xl"
              priority
            />
            {/* Glassmorphism Overlay */}
            
          </div>
        </motion.div>

        {/* Text Section */}
        <div className="lg:pl-10">
          <motion.h2
            {...motionSettings}
            variants={titleVariants}
            id="about-heading"
            className="text-4xl lg:text-5xl font-extrabold bg-gradient-to-r from-gray-900 to-gray-600 text-transparent bg-clip-text leading-tight mb-6"
          >
            Creative Solutions by <br /> Professional Designers
          </motion.h2>

          <motion.p
            {...motionSettings}
            variants={desVariants}
            className="text-lg text-gray-600 leading-relaxed mb-6"
          >
            Our innovative <strong>kitchen living concept</strong> creates more space for the <strong>important things in life</strong>.
          </motion.p>

          <motion.p
            {...motionSettings}
            variants={tagVariants}
            className="text-lg text-gray-600 leading-relaxed"
          >
            Your <strong>kitchen is an expression of who you are</strong>, and its design should match your <strong>lifestyle</strong>. Whether you prefer <strong>traditional elegance</strong> or a <strong>modern aesthetic</strong>, we create kitchens that suit your <strong>purpose & personality</strong>.
          </motion.p>
        </div>
        
      </div>
    </section>
  );
};

export default AboutComponents;
