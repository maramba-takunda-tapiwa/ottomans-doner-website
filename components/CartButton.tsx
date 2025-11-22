'use client';

import { useCart } from '@/contexts/CartContext';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, X, Plus, Minus } from 'lucide-react';
import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import CheckoutModal from './CheckoutModal';

export default function CartButton() {
  const { cart, removeFromCart, updateQuantity, getTotalItems, showCheckoutModal, openCheckoutModal, closeCheckoutModal, redirectToWolt } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useLanguage();

  const totalItems = getTotalItems();
  
  const orderItems = cart
    .map(item => `${item.quantity}x ${item.name}`)
    .join(', ');

  return (
    <>
      {/* Cart Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 bg-gradient-to-r from-scorched-orange to-gold text-luxury-black p-4 rounded-full shadow-2xl flex items-center gap-2"
      >
        <ShoppingCart className="w-6 h-6" />
        {totalItems > 0 && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-2 -right-2 bg-red-600 text-white w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold"
          >
            {totalItems}
          </motion.span>
        )}
      </motion.button>

      {/* Cart Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/80 z-40 backdrop-blur-sm"
            />

            {/* Sidebar */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30 }}
              className="fixed right-0 top-0 h-full w-full md:w-[450px] bg-luxury-black border-l border-scorched-orange/30 z-50 flex flex-col"
            >
              {/* Header */}
              <div className="p-6 border-b border-scorched-orange/30">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gold">
                    {t('cart.title')}
                  </h2>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-cream hover:text-gold transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
                <p className="text-cream/60 mt-2">
                  {totalItems} {t('cart.items')}
                </p>
              </div>

              {/* Cart Items */}
              <div className="flex-1 overflow-y-auto p-6">
                {cart.length === 0 ? (
                  <div className="text-center py-12">
                    <ShoppingCart className="w-16 h-16 text-cream/30 mx-auto mb-4" />
                    <p className="text-cream/60">{t('cart.empty')}</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cart.map(item => (
                      <motion.div
                        key={item.id}
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: 100 }}
                        className="bg-luxury-maroon/30 rounded-lg p-4 border border-scorched-orange/20"
                      >
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h3 className="text-cream font-semibold">{item.name}</h3>
                            <p className="text-gold text-sm mt-1">{item.price}</p>
                          </div>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-cream/60 hover:text-red-500 transition-colors"
                          >
                            <X className="w-5 h-5" />
                          </button>
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="bg-scorched-orange/20 hover:bg-scorched-orange/30 text-cream w-8 h-8 rounded-lg flex items-center justify-center transition-colors"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="text-cream font-semibold w-8 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="bg-scorched-orange/20 hover:bg-scorched-orange/30 text-cream w-8 h-8 rounded-lg flex items-center justify-center transition-colors"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>

              {/* Checkout Button */}
              {cart.length > 0 && (
                <div className="p-6 border-t border-scorched-orange/30">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      setIsOpen(false);
                      openCheckoutModal();
                    }}
                    className="w-full bg-gradient-to-r from-scorched-orange to-gold text-luxury-black font-bold py-4 rounded-lg flex items-center justify-center gap-2 shadow-lg hover:shadow-gold/20 transition-shadow"
                  >
                    {t('cart.checkout')}
                  </motion.button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={showCheckoutModal}
        onClose={closeCheckoutModal}
        orderItems={orderItems}
        onWoltRedirect={redirectToWolt}
      />
    </>
  );
}
