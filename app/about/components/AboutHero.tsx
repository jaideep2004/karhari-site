'use client';

import React, { useEffect, useRef } from 'react';

export default function AboutHero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Floating orbs with trails
    const orbs: { x: number; y: number; vx: number; vy: number; r: number; color: string; alpha: number }[] = [];
    const orbColors = ['#e8192c', '#ff6b35', '#7c3aed', '#06b6d4', '#f59e0b', '#10b981'];
    for (let i = 0; i < 40; i++) {
      orbs.push({
        x: Math.random() * (canvas.width || 800),
        y: Math.random() * (canvas.height || 600),
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
        r: Math.random() * 3 + 1,
        color: orbColors[Math.floor(Math.random() * orbColors.length)],
        alpha: Math.random() * 0.7 + 0.2,
      });
    }

    // Wave lines
    let waveOffset = 0;

    let animId: number;
    const animate = () => {
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      // Draw subtle wave lines
      waveOffset += 0.008;
      for (let wave = 0; wave < 4; wave++) {
        ctx.beginPath();
        ctx.strokeStyle = `rgba(${wave === 0 ? '232,25,44' : wave === 1 ? '124,58,237' : wave === 2 ? '6,182,212' : '245,158,11'},0.07)`;
        ctx.lineWidth = 1.5;
        for (let x = 0; x <= w; x += 4) {
          const y = h * 0.3 + wave * 60 + Math.sin(x * 0.008 + waveOffset + wave * 1.2) * 40 + Math.cos(x * 0.004 + waveOffset * 0.7) * 20;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      // Draw orb particles
      orbs.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;

        // Glow effect
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 4);
        grad.addColorStop(0, p.color + 'cc');
        grad.addColorStop(1, p.color + '00');
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 4, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color + Math.floor(p.alpha * 255).toString(16).padStart(2, '0');
        ctx.fill();
      });

      animId = requestAnimationFrame(animate);
    };
    animate();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <section
      className="relative pt-24 pb-20 overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #060612 0%, #0d0520 20%, #050d1a 45%, #120520 70%, #060612 100%)',
      }}
    >
      {/* Animated canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />

      {/* Aurora gradient layers */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 90% 70% at 15% 40%, rgba(124,58,237,0.22) 0%, transparent 55%)',
          animation: 'auroraShift1 8s ease-in-out infinite alternate',
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 85% 60%, rgba(232,25,44,0.18) 0%, transparent 55%)',
          animation: 'auroraShift2 10s ease-in-out infinite alternate',
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 50% at 50% 100%, rgba(6,182,212,0.14) 0%, transparent 55%)',
          animation: 'auroraShift3 12s ease-in-out infinite alternate',
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 50% 40% at 70% 10%, rgba(245,158,11,0.10) 0%, transparent 55%)',
          animation: 'auroraShift1 9s ease-in-out infinite alternate-reverse',
        }}
      />

      {/* Animated glowing orbs */}
      <div
        className="absolute top-10 left-8 w-72 h-72 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(124,58,237,0.18) 0%, transparent 70%)',
          animation: 'floatOrb1 6s ease-in-out infinite',
        }}
      />
      <div
        className="absolute bottom-8 right-8 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(232,25,44,0.14) 0%, transparent 70%)',
          animation: 'floatOrb2 8s ease-in-out infinite',
        }}
      />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(6,182,212,0.08) 0%, transparent 70%)',
          animation: 'floatOrb3 7s ease-in-out infinite',
        }}
      />

      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
          {/* Left */}
          <div style={{ animation: 'fadeInLeft 0.9s cubic-bezier(0.22,1,0.36,1) both' }}>
            {/* Badge */}
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6 border"
              style={{ background: 'rgba(232,25,44,0.1)', borderColor: 'rgba(232,25,44,0.3)' }}
            >
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: '#e8192c' }}>
                Our Story
              </span>
            </div>

            <h1
              className="font-extrabold text-white mb-6"
              style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', lineHeight: 1.1 }}
            >
              About{' '}
              <span
                style={{
                  background: 'linear-gradient(135deg, #e8192c 0%, #ff6b35 40%, #7c3aed 80%, #06b6d4 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  animation: 'gradientShift 4s ease-in-out infinite',
                  backgroundSize: '200% 200%',
                }}
              >
                Us
              </span>
            </h1>

            <p className="text-sm sm:text-base leading-relaxed max-w-lg" style={{ color: 'rgba(255,255,255,0.65)' }}>
              Welcome to Karhari Media. We appreciate your interest in learning about our company, our journey, and the
              vision that has shaped us into the organization we are today. Every successful company has a story, and
              ours is built on passion, dedication, continuous learning, and years of hard work.
            </p>

            {/* Decorative line */}
            <div className="mt-8 flex items-center gap-3">
              <div
                className="h-px flex-1 max-w-xs"
                style={{
                  background: 'linear-gradient(to right, rgba(232,25,44,0.8), rgba(124,58,237,0.5), transparent)',
                  animation: 'lineGlow 3s ease-in-out infinite',
                }}
              />
              <div className="w-2 h-2 rounded-full bg-red-500" style={{ animation: 'pulse 2s ease-in-out infinite' }} />
            </div>
          </div>

          {/* Right — Brand logo */}
          <div
            className="flex flex-col items-center lg:items-center gap-6"
            style={{
              animation: 'fadeInRight 0.9s cubic-bezier(0.22,1,0.36,1) 0.2s both',
            }}
          >
            <div className="relative flex items-center justify-center">
              {/* Outer ambient glow */}
              <div
                className="absolute w-48 h-48 sm:w-72 sm:h-72 rounded-full pointer-events-none"
                style={{
                  background: 'radial-gradient(circle, rgba(232,25,44,0.18) 0%, rgba(124,58,237,0.10) 50%, transparent 70%)',
                  animation: 'pulse 3s ease-in-out infinite',
                }}
              />

              {/* Spinning ring 1 — inner bangle */}
              <div
                className="absolute w-36 h-36 sm:w-48 sm:h-48 rounded-full"
                style={{
                  border: '2.5px solid transparent',
                  borderTopColor: '#e8192c',
                  borderRightColor: 'rgba(232,25,44,0.4)',
                  borderBottomColor: 'rgba(232,25,44,0.15)',
                  borderLeftColor: 'rgba(232,25,44,0.4)',
                  boxShadow: '0 0 12px rgba(232,25,44,0.5), inset 0 0 8px rgba(232,25,44,0.15)',
                  animation: 'spinRing 4s linear infinite',
                }}
              />

              {/* Spinning ring 2 — outer bangle */}
              <div
                className="absolute w-48 h-48 sm:w-64 sm:h-64 rounded-full"
                style={{
                  border: '2px solid transparent',
                  borderTopColor: 'rgba(124,58,237,0.9)',
                  borderRightColor: 'rgba(124,58,237,0.35)',
                  borderBottomColor: 'rgba(6,182,212,0.6)',
                  borderLeftColor: 'rgba(6,182,212,0.25)',
                  boxShadow: '0 0 14px rgba(124,58,237,0.4), inset 0 0 10px rgba(6,182,212,0.1)',
                  animation: 'spinRingReverse 6s linear infinite',
                }}
              />

              {/* Logo box */}
              <div
                className="relative z-10 p-3 sm:p-5 rounded-2xl"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(232,25,44,0.3)',
                  backdropFilter: 'blur(14px)',
                  boxShadow: '0 0 30px rgba(232,25,44,0.15), 0 0 60px rgba(124,58,237,0.10)',
                }}
              >
                <img
                  src="/assets/images/1608452013412__1_-1786276249256.png"
                  alt="Karhari Media company logo"
                  className="w-32 sm:w-56 h-auto object-contain"
                  style={{
                    filter:
                      'drop-shadow(0 0 32px rgba(232,25,44,0.6)) drop-shadow(0 0 70px rgba(124,58,237,0.30))',
                  }}
                />
              </div>
            </div>

            <p
              className="text-xs tracking-widest uppercase text-center"
              style={{ color: 'rgba(255,255,255,0.4)' }}
            >
              Global Music Distribution &amp; Rights Management
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInLeft {
          from { opacity: 0; transform: translateX(-40px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes fadeInRight {
          from { opacity: 0; transform: translateX(40px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes spinRing {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes spinRingReverse {
          from { transform: rotate(0deg); }
          to { transform: rotate(-360deg); }
        }
        @keyframes auroraShift1 {
          0% { opacity: 0.8; transform: scale(1) translate(0, 0); }
          100% { opacity: 1; transform: scale(1.1) translate(3%, 2%); }
        }
        @keyframes auroraShift2 {
          0% { opacity: 0.7; transform: scale(1) translate(0, 0); }
          100% { opacity: 1; transform: scale(1.12) translate(-3%, -2%); }
        }
        @keyframes auroraShift3 {
          0% { opacity: 0.6; transform: scale(1) translate(0, 0); }
          100% { opacity: 0.9; transform: scale(1.08) translate(2%, -3%); }
        }
        @keyframes floatOrb1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(20px, -20px) scale(1.08); }
        }
        @keyframes floatOrb2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-15px, 15px) scale(1.06); }
        }
        @keyframes floatOrb3 {
          0%, 100% { transform: translate(-50%, -50%) scale(1); }
          50% { transform: translate(-50%, -50%) scale(1.12); }
        }
        @keyframes gradientShift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes lineGlow {
          0%, 100% { opacity: 0.7; }
          50% { opacity: 1; }
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.7; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.05); }
        }
      `}</style>
    </section>
  );
}