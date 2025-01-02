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
    "/downloads/kitchen-16.jpg",
    "/downloads/kitchen-17.jpg",
    "/downloads/kitchen-10.jpg",
];

export default function CatalogSwiperSection() {
    return (
        <div className="py-16">
            <div className="container grid gap-12 pb-14 lg:grid-cols-1">
                {/* Text Section */}
                <div className="text-left">
                    <motion.h1
                        initial="offscreen"
                        whileInView="onscreen"
                        variants={titleVariants}
                        className="py-4 text-4xl font-extrabold text-black lg:text-6xl lg:py-0"
                    >
                        Modern Classic
                    </motion.h1>
                    <motion.h2
                        initial="offscreen"
                        whileInView="onscreen"
                        variants={desVariants}
                        className="md:pb-6 text-lg font-semibold tracking-wide text-gray-600 lg:text-xl mt-5 leading-relaxed"
                    >
                        Luxury Decor to Create Comfort in Your Home
                    </motion.h2>
                </div>

                {/* Description Section */}
                <motion.div
                    initial="offscreen"
                    whileInView="onscreen"
                    variants={tagVariants}
                    className=" text-gray-700 leading-relaxed"
                >
                    <p>
                        Our kitchen interior solutions are designed with your lifestyle in mind, whether you're a home chef or a busy family. We prioritize layouts that maximize space, efficiency, and comfort, blending innovative storage solutions with modern aesthetics. From high-end materials to state-of-the-art appliances, every detail is carefully selected to enhance both functionality and elegance.
                    </p>
                </motion.div>

                {/* Button */}
                <div className="text-center lg:text-left">
                    <a href="/gallery">
                        <Button className="inline-flex items-center px-8 py-3 mt-6 text-white bg-primary rounded-full shadow-md hover:bg-gray-800 transition-transform transform hover:scale-105">
                            View Gallery <TbArrowUpRight className="w-5 h-5 ml-2" />
                        </Button>
                    </a>
                </div>
            </div>

            {/* Swiper Section */}
            <div className="container">
                <Swiper
                    slidesPerView={1}
                    breakpoints={{
                        640: {
                            slidesPerView: 2,
                            spaceBetween: 20,
                        },
                        1024: {
                            slidesPerView: 3,
                            spaceBetween: 40,
                        },
                    }}
                    autoplay={{ delay: 1500, disableOnInteraction: false }}
                    modules={[Autoplay]}
                    className="py-8"
                >
                    {swiperImages.map((image, index) => (
                        <SwiperSlide key={index} className="p-4">
                            <div className="overflow-hidden rounded-lg shadow-lg transition-transform transform hover:scale-105">
                                <Image
                                    src={image}
                                    alt={`Swiper Image ${index + 1}`}
                                    width={564}
                                    height={564}
                                    quality={75}
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 500px"
                                    
                                    
                                    className="w-full h-[400px] md:h-[300px] lg:h-[400px] object-cover"
                                />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
}
