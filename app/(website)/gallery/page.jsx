'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

const imageSources = [
  '/whatsapp/a1.jpeg', '/downloads/kitchen-2.jpg', '/whatsapp/n1.jpeg', '/whatsapp/a2.jpeg',
  '/whatsapp/h1.jpeg', '/whatsapp/n2.jpeg', '/whatsapp/h3.jpeg', '/whatsapp/n3.jpeg',
  '/whatsapp/h4.jpeg', '/whatsapp/n4.jpeg', '/whatsapp/h5.jpeg', '/whatsapp/n5.jpeg',
  '/whatsapp/h6.jpeg', '/whatsapp/n6.jpeg', '/whatsapp/n7.jpeg', '/whatsapp/n8.jpeg',
];

const ImageGrid = ({ onImageClick }) => {
  return (
    <div className='container py-10 grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8'>
      {Array.from({ length: 5 }).map((_, index) => (
        <div key={index} className='flex flex-col gap-6'>
          {imageSources.slice(index * 4, (index + 1) * 4).map((src, i) => (
            <div key={i} className='group relative cursor-pointer' onClick={() => onImageClick(src)}>
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
  );
};

const ImageModal = ({ src, onClose }) => {
  if (!src) return null;

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        exit={{ opacity: 0 }} 
        className="fixed inset-0 bg-black/80 backdrop-blur-md flex justify-center items-center z-50"
        onClick={onClose}
      >
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }} 
          animate={{ scale: 1, opacity: 1 }} 
          exit={{ scale: 0.8, opacity: 0 }} 
          transition={{ duration: 0.3 }}
          className="relative"
          onClick={(e) => e.stopPropagation()} // Prevent closing when clicking the image itself
        >
          <Image 
            src={src} 
            alt="Enlarged Kitchen Image" 
            width={900} 
            height={900} 
            className="max-w-[90vw] max-h-[90vh] rounded-xl shadow-2xl object-contain"
          />
          {/* Close Button */}
          <button 
  className="absolute -top-5 -right-5 bg-white/90 w-10 h-10 flex items-center justify-center rounded-full shadow-lg text-black hover:bg-white transition-all"
  onClick={onClose}
>
  ✕
</button>

        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default function Page() {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <>
      <ImageGrid onImageClick={setSelectedImage} />
      <ImageModal src={selectedImage} onClose={() => setSelectedImage(null)} />
    </>
  );
}
