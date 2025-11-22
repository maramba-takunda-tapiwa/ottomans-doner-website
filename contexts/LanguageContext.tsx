'use client';

import { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'hu';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  en: {
    // Navigation
    'nav.home': 'HOME',
    'nav.menu': 'MENU',
    'nav.about': 'ABOUT',
    'nav.contact': 'CONTACT',
    'nav.admin': 'ADMIN',
    'nav.order': 'Order on Wolt',

    // Hero
    'hero.title1': 'Dark Luxury',
    'hero.title2': 'Meets',
    'hero.title3': 'Turkish Soul',
    'hero.subtitle': 'Premium Döner, artisanal fries & bold curry wurst crafted in Debrecen.',
    'hero.viewMenu': 'View Menu',
    'hero.orderNow': 'Order on Wolt',

    // Featured Craft
    'featured.title': 'Featured Craft',
    'featured.doner.title': 'Signature Döner',
    'featured.doner.desc': 'Slow-roasted perfection with golden crisp edges and authentic Turkish spices.',
    'featured.durum.title': 'Classic Dürüm',
    'featured.durum.desc': 'Hand-wrapped in fresh lavash with crisp vegetables and signature sauce.',

    // Home - About Section
    'home.about.title': 'Elevated Street Tradition',
    'home.about.desc1': 'We fuse authentic Turkish flavors with a modern dark luxury aesthetic. Every slice of Döner, every crisp fry and each bold curry wurst celebrates craftsmanship and heritage in Debrecen.',
    'home.about.desc2': 'Late hours, premium sourcing, consistent execution. Your cravings deserve more than ordinary.',
    'home.hours.title': 'Opening Hours',

    // Opening Hours
    'hours.monday': 'Monday',
    'hours.tuesday': 'Tuesday',
    'hours.wednesday': 'Wednesday',
    'hours.thursday': 'Thursday',
    'hours.friday': 'Friday',
    'hours.saturday': 'Saturday',
    'hours.sunday': 'Sunday',
    'hours.closed': 'Closed',
    'hours.open': 'Open',
    'hours.now': 'now',

    // Menu Page
    'menu.title': 'Our Menu',
    'menu.subtitle': 'Crafted selection blending Turkish tradition and elevated street gastronomy.',
    'menu.doner': 'Döner',
    'menu.menu': 'Menü',
    'menu.sides': 'Sides',

    // Menu Items
    'menu.durum': 'Dürüm',
    'menu.durum.desc': 'Tortilla with chicken or beef, veggies & chosen sauces.',
    'menu.doner.item': 'Döner',
    'menu.doner.desc': 'Fresh Turkish bread with chicken or beef, veggies & sauces.',
    'menu.doner.tal': 'Döner tál',
    'menu.doner.tal.desc': 'Plate with chicken or beef, veggies & sauces.',
    'menu.doner.box': 'Döner box',
    'menu.doner.box.desc': 'Box with chicken or beef, veggies & sauces.',
    'menu.currywurst': 'Currywurst + Fries',
    'menu.currywurst.desc': 'German sausage with fries & house currywurst sauce.',
    'menu.durum.menu': 'Dürüm menü',
    'menu.durum.menu.desc': 'With fries & 330ml drink.',
    'menu.doner.menu': 'Döner menü',
    'menu.doner.menu.desc': 'With fries & 330ml drink.',
    'menu.curry.menu': 'Curry wurst menü',
    'menu.curry.menu.desc': 'Fries + 330ml drink combo.',
    'menu.fries': 'Belga Fries',
    'menu.fries.desc': 'Belgian style crispy fries.',

    // About Page
    'about.title': 'About Us',
    'about.subtitle': 'Where tradition meets bold execution in the heart of Debrecen.',
    'about.story.title': 'Our Story',
    'about.story.desc': 'Ottoman\'s Döner represents the fusion of authentic Turkish street food with modern culinary craft. We honor traditional techniques while delivering a refined experience for late-night cravings.',
    'about.quality.title': 'Quality & Craft',
    'about.quality.desc': 'Premium ingredients, artisanal preparation, bold flavor. We source locally where possible and import key spices directly to maintain authenticity.',

    // Contact Page
    'contact.title': 'Contact',
    'contact.subtitle': 'Find us in Debrecen or order online via Wolt.',
    'contact.address': 'Address',
    'contact.phone': 'Phone',
    'contact.hours': 'Opening Hours',

    // Footer
    'footer.rights': 'All rights reserved.',

    // Cart
    'cart.title': 'Your Cart',
    'cart.items': 'items',
    'cart.empty': 'Your cart is empty',
    'cart.checkout': 'Checkout on Wolt',
    'cart.woltRedirect': 'You\'ll be redirected to Wolt to complete your order',
    'cart.addToCart': 'Add to Cart',

    // Checkout
    'checkout.title': 'Complete Your Order',
    'checkout.orderSummary': 'Order Summary',
    'checkout.copyOrder': 'Copy Order',
    'checkout.copied': 'Copied!',
    'checkout.howToOrder': 'How would you like to order?',
    'checkout.orderOnWolt': 'Order on Wolt',
    'checkout.woltInstructions': 'Your order is copied. Paste it in special instructions on Wolt.',
    'checkout.callToOrder': 'Call to Order',
  },
  hu: {
    // Navigation
    'nav.home': 'FŐOLDAL',
    'nav.menu': 'MENÜ',
    'nav.about': 'RÓLUNK',
    'nav.contact': 'KAPCSOLAT',
    'nav.admin': 'ADMIN',
    'nav.order': 'Rendelés Wolt-on',

    // Hero
    'hero.title1': 'Sötét Luxus',
    'hero.title2': 'Találkozik',
    'hero.title3': 'Török Lélekkel',
    'hero.subtitle': 'Prémium Döner, kézműves sültkrumpli és merész currywurst Debrecenben.',
    'hero.viewMenu': 'Menü Megtekintése',
    'hero.orderNow': 'Rendelés Wolt-on',

    // Featured Craft
    'featured.title': 'Kiemelt Ételek',
    'featured.doner.title': 'Különleges Döner',
    'featured.doner.desc': 'Lassan sült tökéletesség aranybarna ropogós szélekkel és autentikus török fűszerekkel.',
    'featured.durum.title': 'Klasszikus Dürüm',
    'featured.durum.desc': 'Kézzel tekert friss lavashban ropogós zöldségekkel és különleges szósszal.',

    // Home - About Section
    'home.about.title': 'Magasabb Szintű Utcai Hagyomány',
    'home.about.desc1': 'Ötvözzük az autentikus török ízeket egy modern, sötét luxus esztétikával. Minden Döner szelet, minden ropogós sült krumpli és minden merész currywurst a mesterséget és az örökséget ünnepli Debrecenben.',
    'home.about.desc2': 'Késői nyitvatartás, prémium alapanyagok, következetes kivitelezés. A vágyaid többet érdemelnek, mint az átlagos.',
    'home.hours.title': 'Nyitvatartás',

    // Opening Hours
    'hours.monday': 'Hétfő',
    'hours.tuesday': 'Kedd',
    'hours.wednesday': 'Szerda',
    'hours.thursday': 'Csütörtök',
    'hours.friday': 'Péntek',
    'hours.saturday': 'Szombat',
    'hours.sunday': 'Vasárnap',
    'hours.closed': 'Zárva',
    'hours.open': 'Nyitva',
    'hours.now': 'most',

    // Menu Page
    'menu.title': 'Menü',
    'menu.subtitle': 'Válogatott kínálat, amely ötvözi a török hagyományt és a magas szintű utcai gasztronómiát.',
    'menu.doner': 'Döner',
    'menu.menu': 'Menü',
    'menu.sides': 'Köretek',

    // Menu Items
    'menu.durum': 'Dürüm',
    'menu.durum.desc': 'Tortilla csirkével vagy marhával, zöldségekkel és választható szószokkal.',
    'menu.doner.item': 'Döner',
    'menu.doner.desc': 'Friss Török pita csirkével vagy marhával, zöldségekkel és szószokkal.',
    'menu.doner.tal': 'Döner tál',
    'menu.doner.tal.desc': 'Egy tányér étel csirkével vagy marhával, zöldségekkel és választható szószokkal.',
    'menu.doner.box': 'Döner box',
    'menu.doner.box.desc': 'Doboz étel csirkével vagy marhával, zöldségekkel és választható szószokkal.',
    'menu.currywurst': 'Currywurst + Sültkrumpli',
    'menu.currywurst.desc': 'Német kolbász sült krumplival és házi currywurst szósszal.',
    'menu.durum.menu': 'Dürüm menü',
    'menu.durum.menu.desc': 'Sült krumplival és 330ml üdítővel.',
    'menu.doner.menu': 'Döner menü',
    'menu.doner.menu.desc': 'Sült krumplival és 330ml üdítővel.',
    'menu.curry.menu': 'Curry wurst menü',
    'menu.curry.menu.desc': 'Sültkrumpli + 330ml ital kombó.',
    'menu.fries': 'Belga Sültkrumpli',
    'menu.fries.desc': 'Belga stílusú ropogós sültkrumpli.',

    // About Page
    'about.title': 'Rólunk',
    'about.subtitle': 'Ahol a hagyomány találkozik a merész kivitelezéssel Debrecen szívében.',
    'about.story.title': 'Történetünk',
    'about.story.desc': 'Az Ottoman\'s Döner az autentikus török utcai ételek és a modern kulináris mesterség fúzióját képviseli. Tiszteletben tartjuk a hagyományos technikákat, miközben kifinomult élményt nyújtunk az éjszakai vágyakhoz.',
    'about.quality.title': 'Minőség és Mesterség',
    'about.quality.desc': 'Prémium alapanyagok, kézműves elkészítés, merész ízek. Ahol lehet, helyben beszerzünk, és a kulcsfontosságú fűszereket közvetlenül importáljuk az autenticitás megőrzése érdekében.',

    // Contact Page
    'contact.title': 'Kapcsolat',
    'contact.subtitle': 'Találj meg minket Debrecenben vagy rendelj online a Wolt-on keresztül.',
    'contact.address': 'Cím',
    'contact.phone': 'Telefon',
    'contact.hours': 'Nyitvatartás',

    // Footer
    'footer.rights': 'Minden jog fenntartva.',

    // Cart
    'cart.title': 'Kosár',
    'cart.items': 'termék',
    'cart.empty': 'A kosár üres',
    'cart.checkout': 'Rendelés a Wolton',
    'cart.woltRedirect': 'A Woltra leszel átirányítva a rendelés befejezéséhez',
    'cart.addToCart': 'Kosárba',

    // Checkout
    'checkout.title': 'Rendelés Leadása',
    'checkout.orderSummary': 'Rendelés Összegzése',
    'checkout.copyOrder': 'Rendelés Másolása',
    'checkout.copied': 'Másolva!',
    'checkout.howToOrder': 'Hogyan szeretnél rendelni?',
    'checkout.orderOnWolt': 'Rendelés a Wolton',
    'checkout.woltInstructions': 'A rendelésedet kimásoltuk. Illeszd be a Wolt speciális megjegyzések részébe.',
    'checkout.callToOrder': 'Telefonos Rendelés',
  }
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  // Load saved language from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('language') as Language;
    if (saved && (saved === 'en' || saved === 'hu')) {
      setLanguage(saved);
    }
  }, []);

  // Save language to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.en] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
}
