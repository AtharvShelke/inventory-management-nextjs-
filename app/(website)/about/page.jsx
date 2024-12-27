'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { useRef } from 'react'
import { TbArrowUpRight } from 'react-icons/tb'
import { desVariants, tagVariants, titleVariants } from '@/utils/animation'

// Reusable component for long text blocks
const TextBlock = ({ text, highlightText }) => (
  <p className='pb-8 tracking-wide mt-6'>
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
  const scale = useTransform(scrollYProgress, [0, 1], [0.4, 1])

  return (
    <div className='pb-12'>
      {/* Header Section
      <div className="bg-[url('/downloads/aboutBanner-transformed.jpeg')] bg-center bg-cover bg-no-repeat">
        <h1 className='container py-32 text-6xl font-semibold text-white tracking-widest text-center lg:py-56'>
          Who are we?
        </h1>
      </div> */}
<div className="py-8 px-9 bg-[url('/image/backgroundproject.jpg')] bg-center bg-cover bg-no-repeat h-[60vh] flex items-center justify-center text-center">
          <motion.h2 
            initial="offscreen"
            whileInView="onscreen"
            variants={titleVariants}
            className='text-3xl font-semibold text-center lg:p-10 lg:text-5xl text-white '
          >
            We Have Great Ideas & Interior Design
          </motion.h2>

          <motion.p 
            initial="offscreen"
            whileInView="onscreen"
            variants={desVariants}
            className='text-2xl text-center font-medium pb-4 mt-5 mx-auto text-gray-50 w-1/2'
          >
            {/* Our interior design company offers tailored services for homes, offices, apartments, and more. We provide the best design solutions through a highly skilled and experienced team. */}
          </motion.p>
        </div>
      {/* Main Content Section */}
      <div className='container mt-8'>
        

        {/* Flex Layout for Image and Text */}
        <div className='items-center lg:flex gap-x-8'>
          {/* Image with Scroll Animation */}
          <motion.div 
            style={{ scale }}
            ref={ref}
            className='w-full lg:w-1/3'
          >
            <Image
              src='/downloads/kitchen-5.jpg'
              width={700}
              height={700}
              alt='Kitchen Interior'
              className='h-full rounded-xl shadow-lg transition-transform hover:scale-105'
              priority
            />
          </motion.div>

          {/* Text Section */}
          <motion.div
            initial="offscreen"
            whileInView="onscreen"
            variants={tagVariants}
            className='pb-14 lg:w-1/2'
          >
            <TextBlock
              text="We are architects who believe in rethinking the future of architectural education. Our studio integrates innovative visions of society, alongside contemporary tools and methods focused on creativity, production, and communication. Each project is designed and handcrafted, combining vision and practical solutions."
              highlightText="At Enrich Kitchen Studio, we share a belief in the transformational power of collaboration and creativity."
            />

            <Button className='inline-flex items-center px-8 py-3 shadow-lg bg-primary text-white hover:bg-gray-800 hover:ring-2 hover:ring-gray-950 ring-offset-2'>
              Read More <TbArrowUpRight className='w-5 h-5 ml-2' />
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
