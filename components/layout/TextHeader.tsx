'use client'

import { motion } from "framer-motion";

interface IProps {
    title: string
    description: string
}

const TextHeader = ({ title, description }: IProps) => {
    return <>
        <div className="mb-4 text-start lg:w-9/12 lg:mx-auto">
            <motion.h1
                className="font-bold text-2xl md:text-4xl mb-2"
                initial="hidden"
                animate="visible"
                variants={{
                    hidden: { opacity: 0, y: -20, filter: "blur(5px)" },
                    visible: { opacity: 1, y: 0, filter: "blur(0px)" },
                }}
                transition={{ duration: 0.5, ease: "linear" }}
            >
                {title}
            </motion.h1>
            <motion.p
                initial="hidden"
                animate="visible"
                variants={{
                    hidden: { opacity: 0, y: -20, filter: "blur(5px)" },
                    visible: { opacity: 1, y: 0, filter: "blur(0px)" },
                }}
                transition={{ duration: 0.5, ease: "linear", delay: 0.2 }}
                className="text-xs md:text-sm text-default-500 font-medium ">{description}</motion.p>
        </div>
    </>;
};

export default TextHeader;