"use client";
import { useEffect, useRef } from 'react';

interface FryPiece {
  x: number; y: number; w: number; h: number; vx: number; vy: number; rot: number; vr: number; life: number; cut: boolean;
}
interface SauceParticle { x: number; y: number; vx: number; vy: number; life: number; maxLife: number; }

export default function FriesPrepAnimation() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const friesRef = useRef<FryPiece[]>([]);
  const sauceRef = useRef<SauceParticle[]>([]);
  const knifeRef = useRef({ x: 80, y: 50, w: 140, h: 28, t: 0 });
  const lastTimeRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let running = true;

    const resize = () => {
      const ratio = window.devicePixelRatio || 1;
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      canvas.width = w * ratio;
      canvas.height = h * ratio;
      ctx.scale(ratio, ratio);
    };
    resize();
    window.addEventListener('resize', resize);

    // Seed initial fries stack
    if (friesRef.current.length === 0) {
      for (let i = 0; i < 10; i++) {
        friesRef.current.push({
          x: 260 + i * 16,
          y: 110 - i * 6,
          w: 12,
          h: 44,
          vx: 0,
          vy: 0,
          rot: Math.random() * 0.2,
          vr: 0,
          life: 1,
          cut: false
        });
      }
    }

    const spawnCutFries = () => {
      // Select a piece near left side
      const targets = friesRef.current.filter(f => !f.cut && f.x < 340);
      if (!targets.length) return;
      const target = targets[Math.floor(Math.random() * targets.length)];
      target.cut = true;
      // Create two halves
      for (let i = 0; i < 2; i++) {
        friesRef.current.push({
          x: target.x + (i === 0 ? -4 : 4),
          y: target.y + 4,
          w: target.w,
            h: target.h / 2,
          vx: (Math.random() * 1.2 + 0.4) * (i === 0 ? -1 : 1),
          vy: -Math.random() * 4 - 2,
          rot: Math.random() * 0.6,
          vr: (Math.random() - 0.5) * 0.05,
          life: 1,
          cut: true
        });
      }
    };

    const spawnSauceDrizzle = () => {
      for (let i = 0; i < 18; i++) {
        sauceRef.current.push({
          x: 150 + i * 12,
          y: 70 + Math.sin(i * 0.4) * 8,
          vx: (Math.random() - 0.5) * 0.4,
          vy: Math.random() * 0.6 + 0.3,
          life: 0,
          maxLife: 220 + Math.random() * 80
        });
      }
    };

    const drawKnife = () => {
      const k = knifeRef.current;
      ctx.save();
      ctx.translate(k.x, k.y);
      const sway = Math.sin(k.t * 0.002) * 16;
      ctx.translate(sway, 0);
      ctx.rotate(Math.sin(k.t * 0.003) * 0.05);
      // Blade
      ctx.fillStyle = '#d9d9d9';
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.roundRect(0, 0, k.w, k.h, 6);
      ctx.fill();
      ctx.stroke();
      // Handle
      ctx.fillStyle = '#44261c';
      ctx.beginPath();
      ctx.roundRect(k.w - 34, 0, 34, k.h, 4);
      ctx.fill();
      ctx.restore();
    };

    const updateFries = (dt: number) => {
      for (const f of friesRef.current) {
        if (f.cut) {
          f.vy += 0.015 * dt;
          f.x += f.vx * dt * 0.06;
          f.y += f.vy * dt * 0.06;
          f.rot += f.vr * dt;
          if (f.y > 140) {
            f.vy *= -0.38;
            f.vx *= 0.76;
            f.y = 140;
            f.rot *= 0.9;
          }
        }
      }
      // Trim excessive pieces
      if (friesRef.current.length > 120) friesRef.current.splice(0, friesRef.current.length - 120);
    };

    const drawFries = () => {
      for (const f of friesRef.current) {
        ctx.save();
        ctx.translate(f.x, f.y);
        ctx.rotate(f.rot);
        const grd = ctx.createLinearGradient(0, 0, 0, f.h);
        grd.addColorStop(0, '#ffcf4d');
        grd.addColorStop(1, '#f4b637');
        ctx.fillStyle = grd;
        ctx.strokeStyle = '#ffb02e';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.roundRect(-f.w / 2, -f.h / 2, f.w, f.h, 4);
        ctx.fill();
        ctx.stroke();
        ctx.restore();
      }
    };

    const updateSauce = (dt: number) => {
      for (const p of sauceRef.current) {
        p.life += dt;
        p.x += p.vx * dt * 0.05;
        p.y += p.vy * dt * 0.05 + Math.sin((p.x + p.life) * 0.02) * 0.2;
      }
      sauceRef.current = sauceRef.current.filter(p => p.life < p.maxLife);
    };

    const drawSauce = () => {
      ctx.lineCap = 'round';
      for (const p of sauceRef.current) {
        const alpha = 1 - p.life / p.maxLife;
        ctx.strokeStyle = `rgba(255,60,0,${alpha})`;
        ctx.lineWidth = 10 * (alpha * 0.7 + 0.3);
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(p.x - 1, p.y - 1);
        ctx.stroke();
      }
    };

    const drawBoard = () => {
      ctx.save();
      ctx.fillStyle = '#3b1f14';
      ctx.beginPath();
      ctx.roundRect(60, 120, canvas.clientWidth - 120, 44, 12);
      ctx.fill();
      ctx.restore();
    };

    let sliceTimer = 0;
    let sauceTimer = 0;

    const loop = (time: number) => {
      if (!running) return;
      const dt = lastTimeRef.current ? time - lastTimeRef.current : 16;
      lastTimeRef.current = time;
      knifeRef.current.t += dt;
      sliceTimer += dt;
      sauceTimer += dt;

      if (sliceTimer > 1400) { // every 1.4s cut
        spawnCutFries();
        sliceTimer = 0;
      }
      if (sauceTimer > 2600) { // every ~2.6s drizzle
        spawnSauceDrizzle();
        sauceTimer = 0;
      }

      ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
      // Background gradient & subtle noise
      const bg = ctx.createLinearGradient(0, 0, canvas.clientWidth, canvas.clientHeight);
      bg.addColorStop(0, '#1a0f0b');
      bg.addColorStop(1, '#2a1610');
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight);

      drawBoard();
      updateFries(dt);
      drawFries();
      updateSauce(dt);
      drawSauce();
      drawKnife();

      // Glow overlay
      ctx.save();
      ctx.globalCompositeOperation = 'lighter';
      const radial = ctx.createRadialGradient(canvas.clientWidth * 0.5, canvas.clientHeight * 0.5, 60, canvas.clientWidth * 0.5, canvas.clientHeight * 0.5, canvas.clientHeight * 0.9);
      radial.addColorStop(0, 'rgba(255,90,0,0.18)');
      radial.addColorStop(1, 'rgba(255,90,0,0)');
      ctx.fillStyle = radial;
      ctx.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight);
      ctx.restore();

      requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);

    return () => {
      running = false;
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <div className="mx-auto max-w-5xl mt-20 mb-28 relative">
      <div className="aspect-[3/1] w-full rounded-xl border border-luxuryRed/40 bg-black/40 overflow-hidden shadow-[0_0_70px_-12px_rgba(255,80,0,0.45)]">
        <canvas ref={canvasRef} className="w-full h-full" />
      </div>
      <div className="mt-7 text-center">
        <h3 className="text-3xl font-semibold tracking-wide heading-glow">Cinematic Fry Prep & Sauce Flair</h3>
        <p className="mt-3 text-sm text-offWhite/70 max-w-xl mx-auto">Live physics-inspired canvas animation: knife cycles, fries split & tumble, signature sauce particles drizzle with glow. Upgrade to 3D or Lottie later.</p>
      </div>
    </div>
  );
}