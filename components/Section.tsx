"use client";
import { motion } from 'framer-motion';
import { ReactNode } from 'react';

const variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: 0.08 * i, duration: 0.55, ease: [0.25,0.1,0.25,1] } })
};

export default function Section({ children, index = 0, className = '' }: { children: ReactNode; index?: number; className?: string }) {
  return (
    <motion.section
      className={className}
      custom={index}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
      variants={variants}
    >
      {children}
    </motion.section>
  );
}