'use client';

import Image from "next/image";
import { motion } from "framer-motion";
import { desVariants, tagVariants, titleVariants } from "@/utils/animation";
import React from 'react';

const posts = [
    {
        id: 1,
        title: "Transform Your Kitchen into a Culinary Haven",
        href: '#',
        description: 'Enrich Kitchen Studio offers an exceptional range of designs to transform your kitchen into a space that reflects your culinary passion.',
        date: 'Dec 01, 2024',
        datetime: '2024-12-01',
        category: { title: '5.0', href: '#' },
        author: { name: 'Aarav Kumar', location: 'Mumbai' },
    },
    {
        id: 2,
        title: "Innovative Storage Solutions for Every Kitchen",
        href: '#',
        description: 'At Enrich Kitchen Studio, we specialize in designing storage solutions that optimize space without compromising on style.',
        date: 'Dec 05, 2024',
        datetime: '2024-12-05',
        category: { title: '4.8', href: '#' },
        author: { name: 'Isha Patel', location: 'Chh. Sambhajinagar' },
    },
    {
        id: 3,
        title: "Luxury Designs for Your Dream Kitchen",
        href: '#',
        description: 'With Enrich Kitchen Studio, you can bring your dream kitchen to life. We provide a range of luxurious design options, from premium finishes to custom cabinetry.',
        date: 'Dec 10, 2024',
        datetime: '2024-12-10',
        category: { title: '4.9', href: '#' },
        author: { name: 'Ravi Sharma', location: 'Jalna' },
    },
];

// Post component to avoid repetition and improve readability
const Post = React.memo(({ post }) => {
    return (
        <article key={post.id} className="flex max-w-xl flex-col items-start justify-between">
            <div className="flex items-center gap-x-4 text-xs">
                <time dateTime={post.datetime}>
                    <Image src='/image/star.svg' alt="star icon" width={80} height={5} />
                </time>
                <a href={post.category.href} className="relative z-10 bg-primary rounded-full text-white px-3 py-1.5 font-medium hover:bg-gray-100 hover:text-black transition-all">
                    {post.category.title}
                </a>
            </div>
            <div className="group relative">
                <h3 className="mt-3 text-lg font-semibold leading-6 group-hover:text-gray-600">
                    <a href={post.href}>
                        <span>{post.title}</span>
                    </a>
                </h3>
                <p className="mt-5 line-clamp-3 text-sm leading-6 text-muted-foreground">
                    {post.description}
                </p>
            </div>
            <div className="relative mt-8 flex items-center gap-x-4 font-semibold">
                <span>{post.author.name}</span>
                <p className="text-muted-foreground">{post.author.location}</p>
            </div>
        </article>
    );
});

export default function ContactSection() {
    return (
        <div className="pt-12">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <motion.h2
                    initial="offscreen"
                    whileInView="onscreen"
                    variants={titleVariants}
                    className="text-3xl font-bold tracking-tight sm:text-4xl">
                    Customer Review
                </motion.h2>
                <motion.p
                    initial="offscreen"
                    whileInView="onscreen"
                    variants={desVariants}
                    className="mt-2 text-lg leading-8 text-muted-foreground"></motion.p>
                <motion.div
                    initial="offscreen"
                    whileInView="onscreen"
                    variants={tagVariants}
                    className="mx-auto mt-10 grid lg:grid-cols-3 grid-cols-1 gap-x-8 lg:max-w-none lg:mx-0 sm:py-16 sm:mt-16 py-10 border-b border-gray-200 border-t gap-y-16">
                    {posts.map(post => (
                        <Post key={post.id} post={post} />
                    ))}
                </motion.div>
            </div>
        </div>
    );
}
