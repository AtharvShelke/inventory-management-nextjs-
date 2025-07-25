'use client';


import Badge from './Badge';
import { motion } from 'framer-motion';
import { titleVariants } from '@/utils/animation';

const CompanySection = () => {
  const badges = [
    {
      title: "Trusted by numerous satisfied clients",
      count: 1000,
      text: "+ Clients",
    },
    {
      title: "Delivering innovative and creative designs",
      count: 5000,
      text: "+ Designs",
    },
    {
      title: "Of Experience and Excellence",
      count: 15,
      text: "+ Years",
    },
  ];

  return (
    <section className="bg-primary py-24 my-10" aria-labelledby="company-heading">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <h2 id="company-heading" className="sr-only">Our Company</h2>
        <dl className="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-3">
          {badges.map((badge, index) => (
            <motion.div
              key={index}
              initial="offscreen"
              whileInView="onscreen"
              variants={titleVariants}
              className="mx-auto flex max-w-xs flex-col gap-y-4"
              transition={{ delay: 0.5 }}
            >
              <dt className="text-white leading-7">{badge.title}</dt>
              <dd className="order-first text-3xl font-semibold tracking-tight text-white sm:text-5xl">
                <Badge endCountNum={badge.count} endCountText={badge.text} />
              </dd>
            </motion.div>
          ))}
        </dl>
      </div>
    </section>
  );
};

export default CompanySection;
