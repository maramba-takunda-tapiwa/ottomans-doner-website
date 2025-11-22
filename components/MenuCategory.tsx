'use client';

import { MenuCategory } from '../lib/menu';
import Image from 'next/image';
import { useCart } from '@/contexts/CartContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';
import { ShoppingCart } from 'lucide-react';

export function MenuCategoryComponent({ category }: { category: MenuCategory }) {
  const { addToCart } = useCart();
  const { t } = useLanguage();

  return (
    <div>
      <div className='grid gap-5 md:grid-cols-2'>
        {category.items.map((item, i) => (
          <motion.div 
            key={item.id} 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ delay: i * 0.1, duration: 0.6, ease: [0.25,0.1,0.25,1] }}
            whileHover={{ y: -6, scale: 1.02 }}
            className='p-5 rounded-xl bg-luxuryMaroon/30 backdrop-blur border border-luxuryMaroon/40 hover:border-scorchedOrange/60 hover:shadow-xl hover:shadow-scorchedOrange/10 transition-all duration-300 group' 
            aria-label={item.name}
          >
            <div className='flex items-start gap-4'>
              <div className='w-24 h-24 rounded-md overflow-hidden bg-luxuryBlack/40 flex items-center justify-center relative'>
                {item.img ? (
                  <Image src={item.img} alt={`${item.name} dish`} fill sizes='96px' className='object-cover opacity-80 group-hover:opacity-100 transition' />
                ) : (
                  <span className='text-xs text-luxuryGold/40 tracking-wider'>IMG</span>
                )}
              </div>
              <div className='flex-1'>
                <div className='flex items-center justify-between mb-1'>
                  <h4 className='font-serif text-lg gold-text group-hover:heading-glow transition'>{item.name}</h4>
                  <span className='text-sm px-2 py-1 rounded-full bg-luxuryRed/40 text-luxuryGold/90'>{item.price}</span>
                </div>
                <p className='text-xs text-luxuryGold/70 leading-relaxed mb-3'>{item.desc}</p>
                
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => addToCart({ id: item.id, name: item.name, price: item.price })}
                  className='w-full bg-gradient-to-r from-scorched-orange to-gold text-luxury-black font-semibold py-2 px-4 rounded-lg flex items-center justify-center gap-2 text-sm shadow-lg hover:shadow-gold/20 transition-shadow'
                >
                  <ShoppingCart className='w-4 h-4' />
                  {t('cart.addToCart')}
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
export default MenuCategoryComponent;
