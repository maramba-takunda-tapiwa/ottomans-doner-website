"use client";
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowDown } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import FallingFoodBackground from './FallingFoodBackground';

export function FeaturedItems() {
  const { t, language } = useLanguage();

  const heading = language === 'en'
    ? { part1: 'Hungry?', part2: "We've Got You Covered!" }
    : { part1: 'Éhes vagy?', part2: 'Mi megoldást adunk!' };

  const subtitle = language === 'en'
    ? "Authentic Turkish döner, crispy fries, and bold flavors waiting for you."
    : "Autentikus török döner, ropogós sültkrumpli és merész ízek várnak rád.";

  const subtitle2 = language === 'en'
    ? "Check out what's cooking!"
    : "Nézd meg mit főzünk!";

  const buttonText = language === 'en'
    ? "Menu"
    : "Menü";

  return (
    <section className='py-32 relative overflow-hidden'>
      <FallingFoodBackground />
      <div className='luxury-container relative z-10'>
        <div className='max-w-4xl mx-auto text-center'>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className='font-serif text-5xl md:text-6xl mb-6 heading-glow'>
              <span className='gold-text'>{heading.part1}</span> {heading.part2}
            </h2>
            <p className='text-xl md:text-2xl text-cream/80 mb-12 leading-relaxed'>
              {subtitle} <br />
              <span className='text-gold'>{subtitle2}</span>
            </p>
          </motion.div>

          <div className='flex flex-col items-center gap-8'>
            {/* Animated Arrow */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              animate={{
                y: [0, 10, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{
                delay: 0.5,
                duration: 2,
                ease: "easeInOut",
                repeat: Infinity
              }}
              className='text-scorchedOrange'
            >
              <ArrowDown size={48} strokeWidth={1.5} />
            </motion.div>

            {/* Menu Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <a
                href="/menu"
                className='inline-block px-16 py-4 text-2xl font-bold bg-offWhite/80 text-scorchedOrange border-2 border-scorchedOrange rounded-lg shadow-lg hover:bg-scorchedOrange hover:text-offWhite transition-all duration-300'
              >
                {buttonText}
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
export default FeaturedItems;
