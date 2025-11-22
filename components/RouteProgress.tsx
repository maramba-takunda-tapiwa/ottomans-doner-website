"use client";
import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';

export default function RouteProgress() {
  const pathname = usePathname();
  const [active, setActive] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const timer = useRef<number | null>(null);

  useEffect(() => {
    // Start progress on path change
    setActive(true);
    setProgress(0);
    const start = performance.now();
    const tick = () => {
      const elapsed = performance.now() - start;
      // Ease towards near-completion then wait for mount
      const pct = Math.min(95, elapsed / 10);
      setProgress(pct);
      if (pct < 95) timer.current = window.requestAnimationFrame(tick);
    };
    timer.current = window.requestAnimationFrame(tick);
    return () => { if (timer.current) cancelAnimationFrame(timer.current); };
  }, [pathname]);

  useEffect(() => {
    // After short delay finalize
    if (!active) return;
    const doneTimeout = setTimeout(() => {
      setProgress(100);
      setTimeout(() => setActive(false), 350);
    }, 600);
    return () => clearTimeout(doneTimeout);
  }, [active, pathname]);

  if (!active && progress === 0) return null;
  return (
    <div id="route-progress" style={{ transform: `scaleX(${progress/100})`, opacity: active ? 1 : 0, transition: 'transform 0.2s ease, opacity 0.35s ease' }} />
  );
}