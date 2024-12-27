import Image from 'next/image';
import React from 'react';
import { TbArrowNarrowRight } from 'react-icons/tb';

const items = [
  {
    id: "01",
    category: "KITCHEN INTERIOR",
    title: "Modern Kitchen Setup",
    image: "/downloads/kitchen-17.jpg",
    description: "Transform your kitchen into a modern masterpiece with sleek designs and premium finishes.",
  },
  {
    id: "02",
    category: "KITCHEN INTERIOR",
    title: "Elegant Kitchen Design",
    image: "/downloads/kitchen-15.jpg",
    description: "Experience elegance in your kitchen with designs tailored to perfection for every family.",
  },
  {
    id: "03",
    category: "KITCHEN INTERIOR",
    title: "Functional Kitchen Layout",
    image: "/downloads/kitchen-3.jpg",
    description: "Maximize functionality with an ergonomic kitchen layout designed for efficiency and style.",
  },
  {
    id: "04",
    category: "KITCHEN INTERIOR",
    title: "Luxurious Kitchen Setup",
    image: "/downloads/kitchen-12.jpg",
    description: "Indulge in luxury with a kitchen setup that blends comfort and sophistication effortlessly.",
  },
];

export default function CatalogueSection() {
  return (
    <div className='grid gap-8 lg:grid-cols-4 md:grid-cols-2 lg:gap-0 divide-gray-300 lg:divide-x'>
      {items.map((item) => (
        <div key={item.id} className='relative overflow-hidden group'>
          {/* Image Section */}
          <Image
            src={item.image}
            width={720}
            height={1024}
            alt={item.title}
            className='w-full sm:h-[400px] md:h-[600px]' 
          />
          
          {/* Overlay Section */}
          <div className='absolute top-0 p-8 bg-white text-black bg-opacity-60 backdrop-blur m-12'>
            <div className='flex justify-between pb-4'>
              <p className='text-sm'>{item.category}</p>
              <span className='text-sm'>{item.id}</span>
            </div>
            <a href="#" className='block text-xl font-semibold'>{item.title}</a>
            <p className='py-4'>{item.description}</p>
            <a href="#" className='inline-flex items-center font-medium'>
              See Details <TbArrowNarrowRight className='ml-2' />
            </a>
          </div>

          {/* Category and ID Hover Section */}
          <div className='absolute inset-0 bg-tertiary flex-col items-center justify-end md:flex gap-32 pb-16 text-xl transition duration-300 ease-in-out border-b-2 group-hover:translate-y-full md:border-b-0 hidden'>
            <p className='tracking-wider -rotate-90'>{item.category}</p>
            <span>{item.id}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
