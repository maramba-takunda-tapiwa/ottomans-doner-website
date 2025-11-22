"use client";
import { useEffect, useRef, useState } from 'react';

export default function BackgroundFriesVideo() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [canPlayVideo, setCanPlayVideo] = useState(true);

  useEffect(() => {
    // Reduced motion respect
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updateRM = () => setReducedMotion(mq.matches);
    updateRM();
    mq.addEventListener('change', updateRM);
    return () => mq.removeEventListener('change', updateRM);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const v = videoRef.current;
      if (!v) return;
      const y = window.scrollY * 0.04; // slightly slower
      v.style.transform = `translate3d(0,${-y}px,0) scale(1.04)`;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (reducedMotion) {
      const v = videoRef.current; if (v) v.pause();
    } else {
      const v = videoRef.current; if (v && v.paused) v.play().catch(() => setCanPlayVideo(false));
    }
  }, [reducedMotion]);

  return (
    <div className="background-fries-video" aria-hidden>
      {canPlayVideo && !reducedMotion ? (
        <video
          ref={videoRef}
          className="background-fries-video__el"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          poster="/fries-prep-poster.jpg"
        >
          <source src="/fries-prep-loop.webm" type="video/webm" />
          <source src="/fries-prep-loop.mp4" type="video/mp4" />
        </video>
      ) : (
        <picture className="background-fries-video__fallback">
          <source srcSet="/fries-prep-poster.avif" type="image/avif" />
          <source srcSet="/fries-prep-poster.webp" type="image/webp" />
          <img src="/images/platters.jpg" alt="Fresh fries preparation" loading="lazy" />
        </picture>
      )}
      <div className="background-fries-video__overlay" />
    </div>
  );
}