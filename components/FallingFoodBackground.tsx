'use client';

import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  rotation: number;
  rotationSpeed: number;
  opacity: number;
  type: 'fry' | 'tomato' | 'onion' | 'meat';
  blur: number;
}

export default function FallingFoodBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const particles: Particle[] = [];
    const particleCount = 12; // Reduced from 25 for better performance

    // Create realistic particles with depth
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height - height,
        z: Math.random() * 100,
        vx: (Math.random() - 0.5) * 0.3,
        vy: 0.3 + Math.random() * 0.8,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.02,
        opacity: 0.3 + Math.random() * 0.4,
        type: ['fry', 'tomato', 'onion', 'meat'][Math.floor(Math.random() * 4)] as Particle['type'],
        blur: 1 + Math.random() * 2
      });
    }

    const drawRealisticParticle = (p: Particle) => {
      const scale = 1 + p.z / 50;
      const size = 15 * scale;

      ctx.save();
      ctx.globalAlpha = p.opacity * (0.5 + p.z / 200);
      // Removed blur filter for performance
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);

      // More realistic rendering
      const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, size);

      switch (p.type) {
        case 'fry':
          // Realistic french fry with highlights
          gradient.addColorStop(0, '#FFE082');
          gradient.addColorStop(0.5, '#FFC107');
          gradient.addColorStop(1, '#E65100');
          ctx.fillStyle = gradient;
          ctx.fillRect(-size * 0.15, -size * 0.5, size * 0.3, size);
          // Shadow
          ctx.fillStyle = 'rgba(101, 31, 0, 0.3)';
          ctx.fillRect(-size * 0.12, -size * 0.48, size * 0.24, size * 0.95);
          break;

        case 'tomato':
          // Juicy tomato slice with seeds
          gradient.addColorStop(0, '#FF8A80');
          gradient.addColorStop(0.6, '#FF5252');
          gradient.addColorStop(1, '#D32F2F');
          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(0, 0, size * 0.5, 0, Math.PI * 2);
          ctx.fill();
          // Seeds
          ctx.fillStyle = 'rgba(200, 40, 40, 0.4)';
          for (let i = 0; i < 3; i++) {
            ctx.beginPath();
            ctx.arc(
              Math.cos(i * 2) * size * 0.15,
              Math.sin(i * 2) * size * 0.15,
              size * 0.08,
              0,
              Math.PI * 2
            );
            ctx.fill();
          }
          break;

        case 'onion':
          // Translucent onion ring
          ctx.strokeStyle = 'rgba(255, 248, 220, 0.6)';
          ctx.lineWidth = size * 0.2;
          ctx.beginPath();
          ctx.arc(0, 0, size * 0.4, 0, Math.PI * 2);
          ctx.stroke();
          ctx.strokeStyle = 'rgba(245, 222, 179, 0.3)';
          ctx.lineWidth = size * 0.1;
          ctx.stroke();
          break;

        case 'meat':
          // Döner meat piece with char marks
          gradient.addColorStop(0, '#D4A574');
          gradient.addColorStop(0.5, '#8B4513');
          gradient.addColorStop(1, '#5D3A1A');
          ctx.fillStyle = gradient;
          ctx.fillRect(-size * 0.4, -size * 0.3, size * 0.8, size * 0.6);
          // Char marks
          ctx.fillStyle = 'rgba(40, 20, 0, 0.5)';
          ctx.fillRect(-size * 0.35, -size * 0.1, size * 0.7, size * 0.08);
          break;
      }

      ctx.restore();
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.y += p.vy;
        p.x += p.vx;
        p.rotation += p.rotationSpeed;

        // Add slight horizontal drift
        p.vx += (Math.random() - 0.5) * 0.01;
        p.vx *= 0.99;

        if (p.y > height + 50) {
          p.y = -50;
          p.x = Math.random() * width;
        }

        drawRealisticParticle(p);
      });

      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      const newWidth = window.innerWidth;
      // Only resize if width changes (to avoid reset on mobile address bar toggle)
      if (newWidth !== width) {
        width = newWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ opacity: 0.2, willChange: 'transform' }}
    />
  );
}
