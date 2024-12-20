"use client";

import { TbArrowUpRight } from 'react-icons/tb';
import { Button } from '../ui/button';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Autoplay } from 'swiper/modules';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { desVariants, tagVariants, titleVariants } from '@/utils/animation';

const swiperImages = [
    "/downloads/kitchen-5.jpg",
    "/downloads/kitchen-2.jpg",
    "/downloads/kitchen-13.jpg",
    "/downloads/kitchen-18.jpg",
    "/downloads/kitchen-19.jpg",
    "/downloads/kitchen-20.jpg",
];

export default function CatalogSwiperSection() {
    return (
        <div className='py-8'>
            <div className='container grid pb-14 lg:grid-cols-1'>
                <div className='text-left'>
                    <motion.h1
                        initial="offscreen"
                        whileInView="onscreen"
                        variants={titleVariants}
                        className='py-4 text-4xl font-medium lg:text-6xl lg:py-0'>
                        Modern Classic
                    </motion.h1>
                    <motion.h2
                        initial="offscreen"
                        whileInView="onscreen"
                        variants={desVariants}
                        className='pb-6 text-xl font-bold tracking-wider mt-5'>
                        LUXURY DECOR TO CREATE COMFORT IN OUR HOME
                    </motion.h2>
                </div>
                <motion.div
                    initial="offscreen"
                    whileInView="onscreen"
                    variants={tagVariants}
                    className='grid sm:grid-cols-1 md:grid-cols-2 text-gray-500 gap-x-8'>
                    <p>
                        Our kitchen interior solutions are designed with your lifestyle in mind, whether you're a home chef or a busy family. We prioritize layouts that maximize space, efficiency, and comfort, blending innovative storage solutions with modern aesthetics. From high-end materials to state-of-the-art appliances, every detail is carefully selected to enhance both functionality and elegance. We work closely with you to ensure every element— from cabinetry to lighting—complements your vision, creating a kitchen that is as beautiful as it is highly functional.
                    </p>
                    <p>
                        At our studio, we believe the kitchen is the heart of the home, and we aim to create spaces that foster both creativity and relaxation. Our designs seamlessly integrate modern technology with timeless aesthetics, giving you a space that's inviting and practical. Whether you're looking for a contemporary design or a cozy, traditional kitchen, we specialize in custom cabinetry, unique lighting, and innovative storage solutions that elevate your kitchen's style and functionality. Our focus is always on crafting a space that perfectly suits your needs and lifestyle.
                    </p>
                </motion.div>
                <a href="/gallery">
                    <Button className='inline-flex items-center px-8 py-3 mt-4 text-white rounded-full shadow-lg hover:bg-gray-800 hover:ring-2 hover:ring-gray-950 ring-offset-2'>
                        View Gallery <TbArrowUpRight className='w-5 h-5 ml-2' />
                    </Button>
                </a>
            </div>

            <Swiper
                slidesPerView={1}
                breakpoints={{
                    640: {
                        slidesPerView: 2,
                        spaceBetween: 20,
                    },
                    1024: {
                        slidesPerView: 3,
                        spaceBetween: 50,
                    },
                }}
                autoplay={{ delay: 2500, disableOnInteraction: false }}
                modules={[Autoplay]}
            >
                {swiperImages.map((image, index) => (
                    <SwiperSlide key={index}>
                        <Image
                            src={image}
                            alt={`Swiper Image ${index + 1}`}
                            width={520}
                            height={220}
                            className='h-[300px] object-cover'
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}
