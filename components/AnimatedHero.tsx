"use client";
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import { useRef } from 'react';

export function AnimatedHero() {
  const ref = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const yBg = useTransform(scrollYProgress, [0, 1], [0, -160]);
  const scaleGlow = useTransform(scrollYProgress, [0, 1], [1, 1.25]);
  return (
    <section ref={ref} className="relative overflow-hidden py-32 bg-hero-texture" aria-labelledby="hero-heading">
      <motion.div style={{ y: yBg, scale: scaleGlow }} className="absolute inset-0 pointer-events-none opacity-40 mix-blend-screen" aria-hidden="true" />
      <div className="luxury-container relative">
        <motion.h1
          id="hero-heading"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25,0.1,0.25,1] }}
          className="font-serif text-5xl md:text-6xl mb-6 heading-glow"
        >
          Dark Luxury <span className="gold-text">Meets</span> Turkish Soul
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7, ease: [0.25,0.1,0.25,1] }}
          className="max-w-xl text-lg text-luxuryGold/80 leading-relaxed mb-8"
        >
          Premium Döner, artisanal fries & bold curry wurst crafted in Debrecen.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.6, ease: [0.25,0.1,0.25,1] }}
          className="flex gap-4"
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }}>
            <Link href="/menu" className="px-6 py-3 rounded-full border border-luxuryGold/40 hover:border-luxuryGold text-sm tracking-wide hover:bg-luxuryGold hover:text-luxuryBlack transition">View Menu</Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.95 }}>
            <Link href="https://wolt.com/en/hun/debrecen/restaurant/ottomans-doner-fries-curry-wurst" target="_blank" aria-label="Order now on Wolt delivery" className="px-6 py-3 rounded-full bg-gradient-to-r from-scorchedOrange to-scorchedOrangeLight text-white text-sm tracking-wide shadow-[0_0_18px_rgba(232,114,36,0.45)] hover:from-scorchedOrangeLight hover:to-scorchedOrange text-offWhite transition">Order on Wolt</Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
export default AnimatedHero;
