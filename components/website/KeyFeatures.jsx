'use client';

import { motion } from "framer-motion";
import { desVariants, titleVariants } from "@/utils/animation";

const KeyFeatures = () => {
  const features = [
    {
      icon: "🏭",
      title: "In-House Production",
      description: "Advanced machinery ensuring consistent quality and timely delivery"
    },
    {
      icon: "🎨",
      title: "Free 3D Designs",
      description: "Detailed previews before confirmation - no strings attached"
    },
    {
      icon: "🔧",
      title: "Expert Installation",
      description: "Skilled carpenters with modern hardware expertise"
    },
    {
      icon: "🏪",
      title: "Live Showroom",
      description: "Touch, see, and experience our designs firsthand"
    },
    {
      icon: "♻️",
      title: "Eco-Friendly Options",
      description: "Sustainable materials for conscious living"
    },
    {
      icon: "🎯",
      title: "Complete Customization",
      description: "Tailored solutions for your unique requirements"
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto">
        <motion.div
          initial="offscreen"
          whileInView="onscreen"
          variants={titleVariants}
          className="text-center mb-12"
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            What Sets Us Apart
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            From concept to completion, we deliver excellence at every step
          </p>
        </motion.div>

        <motion.div
          initial="offscreen"
          whileInView="onscreen"
          variants={desVariants}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default KeyFeatures;
