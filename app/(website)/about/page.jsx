'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { useRef } from 'react'
import { TbArrowUpRight } from 'react-icons/tb'
import { desVariants, tagVariants, titleVariants } from '@/utils/animation'
import { Factory, CheckCircle, MapPin, Phone, Mail, ArrowRight } from 'lucide-react'

export default function Page() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end end'],
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
      <div className='mt-12'>
        {/* Product Catalogue - Full Width at Top */}
        <div className='container px-6 lg:px-12 mb-16'>
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className='text-center mb-12'
          >
            <h3 className='text-3xl font-bold text-gray-800 mb-4'>What We Create</h3>
            <p className='text-gray-600 max-w-2xl mx-auto'>
              Discover our comprehensive range of modular furniture solutions designed for modern living
            </p>
          </motion.div>

          <div className='grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto'>
            {[
              {
                title: 'Modular Kitchens',
                subtitle: 'Contemporary & Classic Designs',
                image: '/image/kitchen-1.jpg',
                alt: 'Modular Kitchen Design',
              },
              {
                title: 'Wardrobes',
                subtitle: 'Smart Storage Solutions',
                image: '/image/wardrobe-1.jpg',
                alt: 'Wardrobe Design',
              },
              {
                title: 'Dining Islands',
                subtitle: 'Functional Elegance',
                image: '/image/dining-island.jpg',
                alt: 'Dining Island',
              },
              {
                title: 'Custom Furniture',
                subtitle: 'Bespoke Creations',
                image: '/image/custom-furniture.jpg',
                alt: 'Custom Furniture',
              },
            ].map(({ title, subtitle, image, alt }, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className='relative group overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300'
              >
                <Image
                  src={image}
                  width={400}
                  height={300}
                  alt={alt}
                  className='w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110'
                />
                <div className='absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent' />
                <div className='absolute bottom-4 left-4 text-white'>
                  <h4 className='font-bold text-sm mb-1'>{title}</h4>
                  <p className='text-xs opacity-90'>{subtitle}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Full Width Alternating Sections */}
        <div className='space-y-0'>
          {[
            {
              icon: <Factory className='w-6 h-6 text-primary' />,
              title: 'Our In-House Production',
              description:
                'Fully equipped with advanced machinery ensuring consistent quality, timely delivery, and complete customization for all modular requirements.',
              image: '/image/our-in-house-production.jpg',
              imageLeft: false,
              bgColor: 'bg-white',
            },
            {
              icon: <CheckCircle className='w-6 h-6 text-primary' />,
              title: 'Diverse Kitchen Themes',
              description:
                'Contemporary, classic, industrial, and nature-inspired designs that cater to every aesthetic preference and lifestyle need.',
              image: '/image/diverse-kitchen-themes.jpg',
              imageLeft: true,
              bgColor: 'bg-gray-50',
            },
            {
              icon: <CheckCircle className='w-6 h-6 text-primary' />,
              title: 'Expert Carpentry & Installation',
              description: 'Skilled craftsmen with modern hardware expertise delivering precision installation and flawless finishing.',
              image: '/image/expert-carpentry-installation.jpg',
              imageLeft: false,
              bgColor: 'bg-white',
            },
            {
              icon: <CheckCircle className='w-6 h-6 text-primary' />,
              title: 'Free 3D Design Previews',
              description:
                'Visualize your space with detailed 3D renderings before commitment - complete design freedom with no strings attached.',
              image: '/image/3d-design-previews.jpg',
              imageLeft: true,
              bgColor: 'bg-gray-50',
            },
            {
              icon: <CheckCircle className='w-6 h-6 text-primary' />,
              title: 'End-to-End Project Management',
              description: 'Comprehensive project oversight from initial concept through final installation, including dedicated after-sales support.',
              image: '/image/project-management.jpg',
              imageLeft: false,
              bgColor: 'bg-white',
            },
          ].map(({ icon, title, description, image, imageLeft, bgColor }, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className={`${bgColor} py-16 lg:py-20`}
            >
              <div className='container px-6 lg:px-12'>
                <div className={`flex flex-col lg:flex-row ${imageLeft ? 'lg:flex-row-reverse' : ''
                  } items-center gap-12 lg:gap-16`}>

                  {/* Content Side */}
                  <div className='lg:w-1/2'>
                    <div className='max-w-xl'>
                      <div className='flex items-center mb-6'>
                        <div className='w-14 h-14 bg-tertiary border-2 border-primary rounded-xl flex items-center justify-center mr-5'>
                          {icon}
                        </div>
                        <h4 className='font-bold text-gray-900 text-2xl lg:text-3xl'>{title}</h4>
                      </div>
                      <p className='text-gray-700 text-lg leading-relaxed mb-8'>{description}</p>

                      {/* Feature highlights for architects */}
                      <div className='space-y-3'>
                        <div className='flex items-center text-gray-600'>
                          <div className='w-2 h-2 bg-primary rounded-full mr-3'></div>
                          <span className='text-sm'>Professional grade materials and finishes</span>
                        </div>
                        <div className='flex items-center text-gray-600'>
                          <div className='w-2 h-2 bg-primary rounded-full mr-3'></div>
                          <span className='text-sm'>Customizable to architectural specifications</span>
                        </div>
                        <div className='flex items-center text-gray-600'>
                          <div className='w-2 h-2 bg-primary rounded-full mr-3'></div>
                          <span className='text-sm'>Seamless integration with existing designs</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Image Side */}
                  <div className='lg:w-1/2'>
                    <div className='relative'>
                      <Image
                        src={image}
                        alt={title}
                        width={600}
                        height={400}
                        className='rounded-2xl shadow-2xl object-cover w-full hover:shadow-3xl transition-shadow duration-300'
                      />
                      {/* Subtle overlay for depth */}
                      <div className='absolute inset-0 bg-gradient-to-t from-black/10 to-transparent rounded-2xl'></div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Contact Section - Full Width */}
        <div className='bg-gradient-to-br from-primary/5 to-tertiary py-16'>
          <div className='px-6 lg:px-12'>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className='text-center max-w-4xl mx-auto'
            >
              <h3 className='text-3xl font-bold text-gray-800 mb-6'>Ready to Collaborate?</h3>
              <p className='text-gray-600 text-lg mb-8'>
                Visit our showroom to experience our craftsmanship firsthand and discuss your architectural projects with our design team.
              </p>

              <div className='grid md:grid-cols-3 gap-8 mb-8'>
                <div className='flex flex-col items-center p-6 bg-white rounded-xl shadow-sm'>
                  <MapPin className='w-8 h-8 text-primary mb-3' />
                  <h5 className='font-semibold text-gray-800 mb-2'>Visit Our Showroom</h5>
                  <a
                    href='https://maps.app.goo.gl/nGvs73wUCxqi6tf88'
                    target='_blank'
                    rel='noopener noreferrer'
                    className='text-primary hover:underline text-sm'
                  >
                    Get Directions
                  </a>
                </div>

                <div className='flex flex-col items-center p-6 bg-white rounded-xl shadow-sm'>
                  <Phone className='w-8 h-8 text-primary mb-3' />
                  <h5 className='font-semibold text-gray-800 mb-2'>Call Our Team</h5>
                  <div className='text-gray-600 text-sm space-y-1'>
                    <div>8981734646</div>
                    <div>9272112302</div>
                  </div>
                </div>

                <div className='flex flex-col items-center p-6 bg-white rounded-xl shadow-sm'>
                  <Mail className='w-8 h-8 text-primary mb-3' />
                  <h5 className='font-semibold text-gray-800 mb-2'>Email Us</h5>
                  <a href='mailto:enrichacc25@gmail.com' className='text-primary hover:underline text-sm'>
                    enrichacc25@gmail.com
                  </a>
                </div>
              </div>

              <Button className='inline-flex items-center px-8 py-4 bg-primary text-white hover:bg-primary/90 rounded-xl text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300' onClick={() => window.location.href = '/contact'}>
                Schedule Architect Consultation <ArrowRight className='w-5 h-5 ml-2' />
              </Button>
            </motion.div>
          </div>
        </div>
      </div>

    </div>
  )
}
