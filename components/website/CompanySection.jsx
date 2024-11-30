'use client'
import Badge from './Badge'
import React from 'react'
import { motion } from 'framer-motion'
import { desVariants, tagVariants, titleVariants } from '@/utils/animation'

const CompanySection = () => {
    return (
        <div className='bg-primary py-24 sm:py-32'>
            <div className='mx-auto max-w-7xl px-6 lg:px-8'>
                <dl className='grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-3'>
                    {/* Badge 1 */}
                    <motion.div 
                    initial="offscreen"
                    whileInView={"onscreen"}
                    variants={titleVariants}
                    className='mx-auto flex max-w-xs flex-col gap-y-4'>
                        <dt className='text-white leading-7'>
                        Trusted by numerous satisfied clients
                        </dt>
                        <dd className='order-first text-3xl font-semibold tracking-tight text-white sm:text-5xl'>
                            <Badge
                                endCountNum={50}
                                endCountText='+ Clients' />
                        </dd>
                    </motion.div>
                    {/* Badge 2 */}
                    <motion.div
                    initial="offscreen"
                    whileInView={"onscreen"}
                    variants={titleVariants}
                    className='mx-auto flex max-w-xs flex-col gap-y-4'>
                        <dt className='text-white leading-7'>
                        Delivering innovative and creative designs
                        </dt>
                        <dd className='order-first text-3xl font-semibold tracking-tight text-white sm:text-5xl'>
                            <Badge
                                endCountNum={100}
                                endCountText='+ Designs' />
                        </dd>
                    </motion.div>
                    {/* Badge 3 */}
                    <motion.div 
                    initial="offscreen"
                    whileInView={"onscreen"}
                    variants={titleVariants}
                    className='mx-auto flex max-w-xs flex-col gap-y-4'>
                        <dt className='text-white leading-7'>
                           Of Experience and Excellence
                        </dt>
                        <dd className='order-first text-3xl font-semibold tracking-tight text-white sm:text-5xl'>
                            <Badge
                                endCountNum={10}
                                endCountText='+ Years' />
                        </dd>
                    </motion.div>
                </dl>
            </div>
        </div>
    )
}

export default CompanySection