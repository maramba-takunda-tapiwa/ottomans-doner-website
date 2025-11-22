"use client";
import { useEffect } from 'react';

export default function ErrorPage({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => { console.error(error); }, [error]);
  return (
    <div className="luxury-container py-32 text-center space-y-6">
      <h1 className="font-serif text-4xl heading-glow">Unexpected <span className="gold-text">Error</span></h1>
      <p className="text-luxuryGold/70 max-w-md mx-auto">Something went wrong while rendering this page. You can retry or return home.</p>
      <div className="flex justify-center gap-4">
        <button onClick={reset} className="px-6 py-3 rounded-full bg-scorchedOrange text-white text-sm hover:bg-scorchedOrangeLight transition">Try Again</button>
        <a href="/" className="px-6 py-3 rounded-full border border-luxuryGold/40 hover:border-luxuryGold text-sm transition">Home</a>
      </div>
    </div>
  );
}