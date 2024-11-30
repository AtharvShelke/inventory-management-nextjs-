'use client'
import Image from "next/image"
import { motion } from "framer-motion"
import { desVariants, tagVariants, titleVariants } from "@/utils/animation"

const AboutComponents = () => {
    return (
        <div className="container py-12 xl:py-24 h-[auto]">
            <div className="grid lg:grid-cols-2 place-items-center">
                <motion.div
                    initial="offscreen"
                    whileInView={"onscreen"}
                    variants={titleVariants}
                >
                    <Image
                        src={"/image/aboutfront.png"}
                        width={900}
                        height={500}
                        alt="About"
                        className="max-md:hidden" />
                </motion.div>
                <div className="items-center">
                    <motion.h2 
                    initial="offscreen"
                    whileInView={"onscreen"}
                    variants={titleVariants}
                    className="px-12 py-4 text-3xl font-extrabold leading-tight lg:text-5xl">
                        Creative solutions by professional designers
                    </motion.h2>
                    <motion.p 
                    initial="offscreen"
                    whileInView={"onscreen"}
                    variants={desVariants}
                    className="px-12 pb-4 mt-4">
                        Our innovative kitchen living concept creates more space for the important things in life.
                    </motion.p>
                    <motion.p 
                    initial="offscreen"
                    whileInView={"onscreen"}
                    variants={tagVariants}
                    className="px-12 pb-4 ">
                        Your kitchen is an expression of who you are, and its design should match your lifestyle. Whether you have traditional tastes or desire a modern feel, we can design your dream kitchen to suit any purpose.
                    </motion.p>
                </div>
            </div>
        </div>
    )
}

export default AboutComponents