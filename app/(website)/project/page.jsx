'use client';

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const projects = [
  {
    id: 1,
    name: 'Modern Minimalist Kitchen',
    description: 'A sleek, contemporary design with clean lines, neutral tones, and functional spaces...',
    image: '/whatsapp/h1.jpeg',
    additionalImages: [
      '/whatsapp/h1.jpeg',
      '/whatsapp/n1.jpeg',
      '/whatsapp/n2.jpeg',
    ],
  },
  {
    id: 2,
    name: 'Rustic Farmhouse Kitchen',
    description: 'A warm, inviting design featuring earthy wood textures, open shelving, and a cozy ambiance...',
    image: '/downloads/kitchen-11.jpg',
    additionalImages: [
      '/whatsapp/a1.jpeg',
      '/whatsapp/h5.jpeg',
      '/downloads/kitchen-15.jpg',
    ],
  },
  
  {
    id: 3,
    name: 'Luxurious Modular Kitchen',
    description: 'A high-tech kitchen with premium finishes, marble countertops, and custom cabinetry...',
    image: '/whatsapp/a2.jpeg',
    additionalImages: [
      '/whatsapp/a2.jpeg',
      '/whatsapp/h4.jpeg',
      '/whatsapp/n7.jpeg',
    ],
  },
  
];

export default function Page() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [mainImage, setMainImage] = useState("");

  const openModal = (project) => {
    setSelectedProject(project);
    setMainImage(project.image);
  };

  const closeModal = () => {
    setSelectedProject(null);
  };

  return (
    <div className="bg-gray-100">
      {/* Hero Section */}
      <div className="bg-[url('/image/backgroundproject.jpg')] bg-center bg-cover bg-no-repeat h-[50vh] flex items-center justify-center text-center">
        <h1 className="text-5xl sm:text-6xl font-extrabold text-white tracking-widest drop-shadow-md">
          Our Projects
        </h1>
      </div>

      {/* Projects Grid */}
      <div className="container grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 py-16 px-6">
        {projects.map((project) => (
          <div
            key={project.id}
            className="relative group rounded-xl overflow-hidden shadow-lg transform transition-all duration-500 hover:scale-105 hover:shadow-2xl cursor-pointer"
            onClick={() => openModal(project)}
          >
            <div className="relative w-full h-64 sm:h-80">
              <Image
                src={project.image}
                width={600}
                height={450}
                alt={`Project: ${project.name}`}
                className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                priority={project.id === 1}
                loading={project.id !== 1 ? "lazy" : undefined}
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 sm:p-6 flex flex-col justify-end">
              <h2 className="text-2xl font-semibold text-white">{project.name}</h2>
              <p className="text-sm text-gray-300 mt-2">{project.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 flex justify-center items-center z-50 px-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white p-6 rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto relative overflow-x-hidden"
            >
              {/* Close Button */}
              <button
                className="absolute top-1 right-1 bg-white/90 w-10 h-10 flex items-center justify-center rounded-full shadow-lg text-black hover:bg-white transition-all"
                onClick={closeModal}
              >
                ✕
              </button>

              {/* Project Title & Description */}
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {selectedProject.name}
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-4">
                {selectedProject.description}
              </p>

              {/* Main Image */}
              <div className="w-full">
                <Image
                  src={mainImage}
                  width={800}
                  height={500}
                  alt="Main Project Image"
                  className="w-full max-h-[50vh] rounded-lg object-contain shadow-md"
                />
              </div>

              {/* Thumbnail Images */}
              <div className="flex gap-3 mt-4 justify-center">
                {selectedProject.additionalImages.map((img, index) => (
                  <button key={index} onClick={() => setMainImage(img)}>
                    <Image
                      src={img}
                      width={100}
                      height={100}
                      alt={`Thumbnail ${index}`}
                      className={`w-20 h-20 object-contain rounded-lg cursor-pointer border-2 transition-all shadow-md hover:shadow-lg ${mainImage === img ? "border-blue-500 scale-110" : "border-transparent"
                        }`}
                    />
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
