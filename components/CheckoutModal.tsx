'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Copy, Phone, ExternalLink, Check } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useState } from 'react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderItems: string;
  onWoltRedirect: () => void;
}

export default function CheckoutModal({ isOpen, onClose, orderItems, onWoltRedirect }: CheckoutModalProps) {
  const { t } = useLanguage();
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(orderItems);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  const handleWoltOrder = () => {
    copyToClipboard();
    setTimeout(() => {
      onWoltRedirect();
      onClose();
    }, 500);
  };

  const handlePhoneOrder = () => {
    window.open('tel:+36302228755');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 z-50 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="bg-luxuryBlack border border-scorchedOrange/30 rounded-2xl p-8 max-w-md w-full shadow-2xl">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-serif text-gold">
                  {t('checkout.title')}
                </h2>
                <button
                  onClick={onClose}
                  className="text-cream/60 hover:text-gold transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Order Summary */}
              <div className="bg-luxuryMaroon/20 rounded-lg p-4 mb-6 border border-luxuryMaroon/30">
                  <h3 className="text-gold font-semibold mb-3">{t('checkout.orderSummary')}</h3>
                  <div className="bg-luxuryBlack/50 rounded-md p-3 border border-scorchedOrange/20">
                  <p className="text-cream text-sm font-mono">{orderItems}</p>
                </div>
                  <button
                    onClick={copyToClipboard}
                    className="flex items-center gap-2 mt-3 text-sm text-scorchedOrange hover:text-luxuryGold transition-colors"
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  {copied ? t('checkout.copied') : t('checkout.copyOrder')}
                </button>
              </div>

              {/* Order Options */}
              <div className="space-y-3">
                <h3 className="text-cream font-semibold mb-4">{t('checkout.howToOrder')}</h3>
                
                {/* Wolt Option */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                    onClick={handleWoltOrder}
                    className="w-full bg-gradient-to-r from-scorchedOrange to-luxuryGold text-luxuryBlack font-semibold py-3 px-4 rounded-lg flex items-center justify-center gap-2 shadow-lg"
                >
                  <ExternalLink className="w-5 h-5" />
                  {t('checkout.orderOnWolt')}
                </motion.button>
                
                <p className="text-cream/60 text-xs text-center px-2">
                  {t('checkout.woltInstructions')}
                </p>

                {/* Phone Option */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handlePhoneOrder}
                  className="w-full bg-luxuryMaroon/30 border border-luxuryMaroon/50 text-offWhite font-semibold py-3 px-4 rounded-lg flex items-center justify-center gap-2 hover:bg-luxuryMaroon/50 transition-colors"
                >
                  <Phone className="w-5 h-5" />
                  {t('checkout.callToOrder')}
                </motion.button>
                
                <p className="text-cream/60 text-xs text-center">
                  +36 30 222 8755
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}