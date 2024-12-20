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
    <span className='text-xl font-extrabold tracking-tight'>
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
  const scale = useTransform(scrollYProgress, [0, 1], [0.6, 1])

  return (
    <div>
      <div className="bg-[url('/downloads/aboutBanner1.jpg')] bg-center bg-cover bg-no-repeat">
        <h1 className='container py-32 text-6xl font-semibold text-white tracking-widest text-center lg:py-56'>
          Who are we?
        </h1>
      </div>
      <div className='container'>
        <div className='pt-8'>
          <motion.h2 
            initial="offscreen"
            whileInView="onscreen"
            variants={titleVariants}
            className='text-3xl font-semibold text-center lg:p-10 lg:text-5xl'
          >
            We have great idea & Interior Design
          </motion.h2>
          <motion.p 
            initial="offscreen"
            whileInView="onscreen"
            variants={desVariants}
            className='text-2xl text-center font-medium pb-4 mt-5'
          >
            Our interior design company is a company that provides interior design services for homes, offices, apartments and others. We provide the best interior design services for you. We have a team that is experienced in the field of interior.
          </motion.p>
        </div>

        <div className='items-center lg:flex gap-x-8'>
          <motion.div 
            style={{ scale }}
            ref={ref}
            className='w-full'
          >
            <Image
              src='/downloads/kitchen-5.jpg'
              width={700}
              height={700}
              alt='Kitchen Interior'
              className='h-full'
              priority
            />
          </motion.div>

          <motion.div
            initial="offscreen"
            whileInView="onscreen"
            variants={tagVariants}
            className='pb-14'
          >
            <TextBlock
              text="We are Architects. We believe that today it is fundamental to totally rethink architectural education. Confluence not only integrates new visions on society but also incorporates new methods and contemporary tools linked to creativity, production, and communication. Designed and handcrafted to hold and showcase my year two architecture portfolio, the unfolding box allows portfolio sheets..."
              highlightText="At Enrich Kitchen Studio, we share a belief in the transformational power of people united in a common purpose."
            />
            <Button className='inline-flex items-center px-8 py-3 shadow-lg hover:bg-gray-800 hover:ring-2 hover:ring-gray-950 ring-offset-2'>
              Read More <TbArrowUpRight className='w-5 h-5 ml-2' />
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
