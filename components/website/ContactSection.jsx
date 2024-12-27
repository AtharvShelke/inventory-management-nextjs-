'use client';

import Image from "next/image";
import { motion } from "framer-motion";
import { desVariants, tagVariants, titleVariants } from "@/utils/animation";
import React, { useState } from 'react';

// Sample of more reviews
const posts = [
    // More reviews with added details
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
    {
        id: 4,
        title: "Expert Craftsmanship for Timeless Kitchens",
        href: '#',
        description: 'Enrich Kitchen Studio is known for its craftsmanship and attention to detail. Our kitchens are built to last with timeless appeal.',
        date: 'Dec 15, 2024',
        datetime: '2024-12-15',
        category: { title: '4.7', href: '#' },
        author: { name: 'Rajesh Yadav', location: 'Pune' },
    },
    {
        id: 5,
        title: "Customizable Kitchen Designs to Suit Every Need",
        href: '#',
        description: 'Our customizable kitchen designs ensure that every inch of your space is optimized, creating a kitchen that meets your exact needs and preferences.',
        date: 'Dec 20, 2024',
        datetime: '2024-12-20',
        category: { title: '4.9', href: '#' },
        author: { name: 'Anita Sharma', location: 'Nagpur' },
    },
    {
        id: 6,
        title: "Seamless Integration of Modern Technology in Kitchens",
        href: '#',
        description: 'Experience the future of kitchen design with our seamless integration of modern technology that enhances both function and aesthetics.',
        date: 'Dec 25, 2024',
        datetime: '2024-12-25',
        category: { title: '5.0', href: '#' },
        author: { name: 'Suresh Deshmukh', location: 'Kolhapur' },
    },
];


// Post component for rendering each review
const Post = React.memo(({ post }) => {
    return (
        <article key={post.id} className="flex max-w-xl flex-col items-start justify-between bg-white rounded-lg shadow-md transition-transform hover:scale-105 hover:shadow-xl p-6">
            <div className="flex items-center gap-x-4 text-xs text-gray-600">
                <time dateTime={post.datetime}>
                    <Image src='/image/star.svg' alt="star icon" width={80} height={16} />
                </time>
                <a href={post.category.href} className="bg-primary text-white px-3 py-1.5 rounded-full text-sm font-semibold hover:bg-gray-700 transition-all duration-200">
                    {post.category.title}
                </a>
            </div>
            <div className="group relative mt-4">
                <h3 className="text-lg font-semibold leading-6 text-gray-900 group-hover:text-primary">
                    <a href={post.href}>
                        <span>{post.title}</span>
                    </a>
                </h3>
                <p className="mt-3 text-sm text-gray-500 line-clamp-3">{post.description}</p>
            </div>
            <div className="mt-6 flex items-center gap-x-4 font-semibold text-gray-600">
                <span>{post.author.name}</span>
                <p className="text-sm">{post.author.location}</p>
            </div>
        </article>
    );
});

export default function ContactSection() {
    const [visiblePosts, setVisiblePosts] = useState(3); // Initially, show 3 posts

    // Handle load more functionality
    const loadMorePosts = () => {
        setVisiblePosts(prev => Math.min(prev + 3, posts.length)); // Increase by 3 reviews
    };

    return (
        <div className="py-12 ">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <motion.h2
                    initial="offscreen"
                    whileInView="onscreen"
                    variants={titleVariants}
                    className="text-3xl font-extrabold tracking-tight sm:text-4xl text-gray-900">
                    Customer Reviews
                </motion.h2>
                
                <motion.p
                    initial="offscreen"
                    whileInView="onscreen"
                    variants={desVariants}
                    className="mt-2 text-lg text-gray-600">
                    Hear from our happy customers about their experiences with our services.
                </motion.p>

                <motion.div
                    initial="offscreen"
                    whileInView="onscreen"
                    variants={tagVariants}
                    className="mx-auto mt-10 grid lg:grid-cols-3 gap-x-8 lg:max-w-none sm:grid-cols-1 gap-y-16 sm:py-16 py-10 border-b border-gray-200">
                    {posts.slice(0, visiblePosts).map(post => (
                        <Post key={post.id} post={post} />
                    ))}
                </motion.div>

                {/* Load more button */}
                {visiblePosts < posts.length && (
                    <div className="text-center mt-8">
                        <button
                            onClick={loadMorePosts}
                            className="bg-primary text-white px-6 py-2 rounded-full text-lg font-medium hover:bg-gray-700 transition-all">
                            Load More Reviews
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
