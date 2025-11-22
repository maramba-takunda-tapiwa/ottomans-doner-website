"use client";
import { useLanguage } from '@/contexts/LanguageContext';

export default function LanguageToggle() {
  const { language, setLanguage } = useLanguage();
  
  return (
    <select
      aria-label="Select language"
      value={language}
      onChange={e => setLanguage(e.target.value as 'en' | 'hu')}
      className="text-xs bg-luxuryBlack/40 border border-scorchedOrange/40 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-scorchedOrangeLight transition"
    >
      {['en','hu'].map(l => (
        <option key={l} value={l}>{l.toUpperCase()}</option>
      ))}
    </select>
  );
}