import './globals.css';
import type { ReactNode } from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import PageTransition from '../components/PageTransition';
import RouteProgress from '../components/RouteProgress';
import { LanguageProvider } from '../contexts/LanguageContext';
import { CartProvider } from '../contexts/CartContext';
import CartButton from '../components/CartButton';
import { Playfair_Display, Inter } from 'next/font/google';

const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' });
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata = {
  title: "Ottoman's Döner, Fries & Curry Wurst – Debrecen",
  description: 'Dark luxury Turkish cuisine in Debrecen. Premium Döner, fries, curry wurst.',
  openGraph: {
    title: "Ottoman's Döner – Debrecen",
    description: 'Premium Döner, fries & curry wurst. Dark luxury meets Turkish soul.',
    url: 'https://example.com',
    siteName: "Ottoman's Döner",
    images: [
      { url: '/images/doner.jpg', width: 1200, height: 630, alt: 'Signature Döner' }
    ],
    locale: 'en_US',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: "Ottoman's Döner – Debrecen",
    description: 'Premium Döner, fries & curry wurst.',
    images: ['/images/doner.jpg']
  }
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="font-sans bg-luxuryBlack text-offWhite selection:bg-scorchedOrange/40">
        <LanguageProvider>
          <CartProvider>
            <RouteProgress />
            {/* Restaurant structured data */}
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                  '@context': 'https://schema.org',
                  '@type': 'Restaurant',
                  name: "Ottoman's Döner, Fries & Curry Wurst",
                  address: {
                    '@type': 'PostalAddress',
                    streetAddress: 'Péterfia u. 2',
                    addressLocality: 'Debrecen',
                    postalCode: '4026',
                    addressCountry: 'HU'
                  },
                  servesCuisine: ['Turkish', 'Street Food'],
                  url: 'https://example.com',
                  telephone: '+36 30 222 8755',
                  openingHours: [
                    'Mo-Th 11:00-23:00',
                    'Fr 11:00-24:00',
                    'Sa 11:00-24:00',
                    'Su 11:00-23:00'
                  ]
                })
              }}
            />
            <Navbar />
            <PageTransition>{children}</PageTransition>
            <Footer />
            <CartButton />
          </CartProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
