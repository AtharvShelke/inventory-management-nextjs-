'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { useRef } from 'react'
import { TbArrowUpRight } from 'react-icons/tb'
import { desVariants, tagVariants, titleVariants } from '@/utils/animation'

// Reusable component for long text blocks
const TextBlock = ({ text, highlightText }) => (
  <p className='pb-6 tracking-wide leading-relaxed text-gray-700'>
    {text} <br /><br />
    <span className='text-xl font-extrabold text-primary tracking-tight'>
      {highlightText}
    </span>
  </p>
)

export default function Page() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end end"]
  })
  const scale = useTransform(scrollYProgress, [0, 1], [0.5, 1])

  return (
    <div className='pb-16 bg-gray-50'>
      {/* Hero Section */}
      <div className="py-20 px-9 bg-[url('/image/backgroundproject.jpg')] bg-center bg-cover bg-no-repeat h-[55vh] flex flex-col items-center justify-center text-center">
        <motion.h2
          initial="offscreen"
          whileInView="onscreen"
          variants={titleVariants}
          className='text-4xl font-extrabold text-white drop-shadow-lg lg:text-6xl'
        >
          We Create Elegant Interior Designs
        </motion.h2>

        <motion.p
          initial="offscreen"
          whileInView="onscreen"
          variants={desVariants}
          className='text-lg text-gray-200 font-medium mt-4 px-4 lg:w-2/3'
        >
          Transforming spaces with creativity and precision. We specialize in innovative and functional interior design solutions tailored to your needs.
        </motion.p>
      </div>

      {/* Main Content Section */}
      <div className='container mt-12 px-6 lg:px-12'>

        {/* Flex Layout for Image and Text */}
        <div className='lg:flex items-center gap-x-12'>
          {/* Image with Scroll Animation */}
          <motion.div
            
            ref={ref}
            className='w-full lg:w-1/2'
          >
            <Image
              src='/image/enrich-building.png'
              width={800}
              height={600}
              alt='Kitchen Interior'
              className='rounded-xl shadow-xl transition-transform duration-500 hover:scale-105 object-cover'
              priority
            />
          </motion.div>

          {/* Text Section */}
          <motion.div
            initial="offscreen"
            whileInView="onscreen"
            variants={tagVariants}
            className='mt-8 lg:w-1/2'
          >
            <TextBlock
              text="We are architects and designers who reimagine interior spaces with a blend of functionality and aesthetic appeal. Our studio integrates innovative design principles, emphasizing creativity, precision, and efficiency. Each project is handcrafted with a keen eye for detail, ensuring both form and function are harmoniously balanced."
              highlightText="At Enrich Kitchen Studio, we believe in the transformative power of collaboration and artistic vision."
            />

            <Button className='inline-flex items-center px-8 py-3 shadow-lg bg-primary text-white hover:bg-gray-800 hover:ring-2 hover:ring-gray-950 ring-offset-2 transition-all duration-300'>
              Read More <TbArrowUpRight className='w-5 h-5 ml-2' />
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
