"use client";
import { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const [light, setLight] = useState(false);

  useEffect(() => {
    const html = document.documentElement;
    if (light) html.classList.add('light'); else html.classList.remove('light');
  }, [light]);

  return (
    <button
      type="button"
      onClick={() => setLight(l => !l)}
      className="ml-4 text-xs px-3 py-2 rounded-md border border-scorchedOrange/40 hover:border-scorchedOrangeLight bg-luxuryBlack/40 backdrop-blur text-offWhite/90 hover:text-white transition"
    >
      {light ? 'Dark Mode' : 'Light Mode'}
    </button>
  );
}