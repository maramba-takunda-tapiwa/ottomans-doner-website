"use client";
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LanguageToggle from './LanguageToggle';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/contexts/LanguageContext';

const navItems = [
  { href: '/', labelKey: 'nav.home' },
  { href: '/menu', labelKey: 'nav.menu' },
  { href: '/about', labelKey: 'nav.about' },
  { href: '/contact', labelKey: 'nav.contact' },
  { href: '/admin', labelKey: 'nav.admin' }
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { t } = useLanguage();
  return (
    <header className="sticky top-0 z-40 backdrop-blur bg-luxuryBlack/80 border-b border-luxuryMaroon/40">
      <div className="luxury-container flex items-center justify-between py-4">
        <Link href="/" className="font-serif text-2xl tracking-wide flex items-center gap-3">
          <Image
            src="/images/Title.jpg"
            alt="Ottoman&apos;s Döner Logo"
            width={60}
            height={60}
            className="rounded-lg shadow-lg"
          />
          <div className="flex items-center gap-2">
            <span className="gold-text">Ottoman&apos;s</span>
            <span className="orange-text">Döner</span>
          </div>
        </Link>
        <nav className="hidden md:flex gap-6 items-center" aria-label="Primary navigation">
          {navItems.map(item => {
            const active = pathname === item.href;
            return (
              <div key={item.href} className="relative group">
                <a
                  href={item.href}
                  className={`text-sm uppercase tracking-wider transition-colors ${active ? 'text-scorchedOrangeLight' : 'group-hover:text-orange-text'}`}
                >
                  {t(item.labelKey)}
                </a>
                <motion.span
                  className="absolute -bottom-1 left-0 h-[2px] bg-scorchedOrange pointer-events-none"
                  initial={false}
                  animate={{ width: active ? '100%' : 0 }}
                  transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
                />
              </div>
            );
          })}
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link href="https://wolt.com/en/hun/debrecen/restaurant/ottomans-doner-fries-curry-wurst" target="_blank" rel="noopener" className="px-5 py-2 rounded-full bg-scorchedOrange hover:bg-scorchedOrangeLight text-white text-sm font-medium shadow-[0_0_12px_rgba(232,114,36,0.4)] transition-colors">
              {t('nav.order')}
            </Link>
          </motion.div>
          <LanguageToggle />
        </nav>
        <button aria-label="Toggle navigation menu" onClick={() => setOpen(prev => !prev)} className="md:hidden text-scorchedOrange focus:outline-none focus:ring-2 focus:ring-scorchedOrange/60 rounded">
          <span className="font-medium">Menu</span>
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden border-t border-luxuryMaroon/40 bg-luxuryBlack"
          >
            <div className="luxury-container flex flex-col py-4 gap-4">
              {navItems.map(item => {
                const active = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    aria-current={active ? 'page' : undefined}
                    className={`text-sm uppercase tracking-wider transition-colors ${active ? 'text-scorchedOrangeLight' : 'hover:text-luxuryGold'}`}
                  >
                    {t(item.labelKey)}
                  </Link>
                );
              })}
              <Link href="https://wolt.com/en/hun/debrecen/restaurant/ottomans-doner-fries-curry-wurst" target="_blank" rel="noopener" className="px-4 py-2 rounded-full bg-luxuryRed hover:bg-luxuryGold text-white hover:text-luxuryBlack transition-colors text-center text-sm font-medium">
                {t('nav.order')}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
export default Navbar;
