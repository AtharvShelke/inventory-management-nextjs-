'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';

const links = [
    { path: '/', name: 'Home' },
    { path: '/about', name: 'About' },
    { path: '/gallery', name: 'Gallery' },
    { path: '/project', name: 'Projects' },
    { path: '/contact', name: 'Contact' },
];

export default function Nav({ containerStyles = '', linkStyles = '', activeStyles = '' }) {
    const pathName = usePathname();

    return (
        <nav className={containerStyles} aria-label="Main navigation">
            {links.map((link, index) => {
                const isActive = link.path === pathName;
                return (
                    <Link
                        href={link.path}
                        key={index}
                        className={`${linkStyles} ${isActive ? activeStyles : ''}`}
                        aria-current={isActive ? 'page' : undefined}
                    >
                        {link.name}
                        {isActive && (
                            <motion.span
                                layoutId="nav-underline"
                                initial={{ scaleX: 0 }}
                                animate={{ scaleX: 1 }}
                                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                                className="absolute left-0 -bottom-0.5 w-full h-[1.5px] bg-primary origin-left rounded-full"
                            />
                        )}
                    </Link>
                );
            })}
        </nav>
    );
}
