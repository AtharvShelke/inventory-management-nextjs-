'use client'

import Image from 'next/image'

const imageSources = [
  '/downloads/kitchen-1.jpg', '/downloads/kitchen-2.jpg', '/downloads/kitchen-3.jpg', '/downloads/kitchen-10.jpg',
  '/downloads/kitchen-5.jpg', '/downloads/kitchen-6.jpg', '/downloads/kitchen-7.jpg', '/downloads/kitchen-11.jpg',
  '/downloads/kitchen-12.jpg', '/downloads/kitchen-13.jpg', '/downloads/kitchen-15.jpg', '/downloads/kitchen-14.jpg',
  '/downloads/kitchen-17.jpg', '/downloads/kitchen-18.jpg', '/downloads/kitchen-20.jpg', '/downloads/kitchen-16.jpg',
]

const ImageGrid = () => {
  return (
    <div className='container py-10 grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8'>
      {Array.from({ length: 5 }).map((_, index) => (
        <div key={index} className='flex flex-col gap-6'>
          {imageSources.slice(index * 4, (index + 1) * 4).map((src, i) => (
            <div key={i} className='group relative'>
              <Image
                className='h-auto max-w-full rounded-xl shadow-lg group-hover:scale-105 transition-all duration-300 ease-in-out'
                src={src}
                alt={`Kitchen Image ${index * 4 + i + 1}`}
                width={500}
                height={500}
                priority={i === 0}
              />
              
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

export default function Page() {
  return <ImageGrid />
}
