'use client';

import Image from "next/image";
import { motion } from "framer-motion";
import { desVariants, tagVariants, titleVariants } from "@/utils/animation";

const AboutComponents = () => {
  const motionSettings = {
    initial: "offscreen",
    whileInView: "onscreen",
  };

  return (
    <div className="container py-12 xl:py-24">
      <div className="grid lg:grid-cols-2 gap-6 place-items-center">
        {/* Image Section */}
        <motion.div {...motionSettings} variants={titleVariants}>
          <Image
            src="/downloads/aboutKitchen.jpg"
            width={736}
            height={736}
            alt="About"
            className="hidden lg:block h-[500px] object-contain"
          />
        </motion.div>

        {/* Text Section */}
        <div className="items-center">
          <motion.h2
            {...motionSettings}
            variants={titleVariants}
            className="px-12 py-4 text-3xl font-extrabold leading-tight lg:text-5xl"
          >
            Creative solutions by professional designers
          </motion.h2>
          <motion.p
            {...motionSettings}
            variants={desVariants}
            className="px-12 pb-4 mt-4"
          >
            Our innovative kitchen living concept creates more space for the important things in life.
          </motion.p>
          <motion.p
            {...motionSettings}
            variants={tagVariants}
            className="px-12 pb-4"
          >
            Your kitchen is an expression of who you are, and its design should match your lifestyle. Whether you have traditional tastes or desire a modern feel, we can design your dream kitchen to suit any purpose.
          </motion.p>
        </div>
      </div>
    </div>
  );
};

export default AboutComponents;
