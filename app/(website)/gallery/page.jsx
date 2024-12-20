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
    <div className='container py-10 grid grid-cols-2 md:grid-cols-4 gap-4'>
      {Array.from({ length: 5 }).map((_, index) => (
        <div key={index} className='flex flex-col gap-4'>
          {imageSources.slice(index * 4, (index + 1) * 4).map((src, i) => (
            <div key={i}>
              <Image
                className='h-auto max-w-full rounded-lg hover:scale-90 transition-all'
                src={src}
                alt={`Kitchen Image ${index * 4 + i + 1}`}
                width={500} // Set width for better layout performance
                height={500} // Set height for better layout performance
                priority={i === 0} // Set priority for the first image in each set for better loading
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
