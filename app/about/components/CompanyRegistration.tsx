'use client';

import React, { useEffect, useRef } from 'react';
import ScrollReveal from '../../components/ScrollReveal';

export default function CompanyRegistration() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const particles: { x: number; y: number; vx: number; vy: number; r: number; color: string; alpha: number; life: number }[] = [];
    const colors = ['#06b6d4', '#10b981', '#2563eb', '#7c3aed', '#e8192c'];

    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
        r: Math.random() * 2 + 0.5,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: Math.random() * 0.5 + 0.2,
        life: Math.random() * 100,
      });
    }

    let animId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.life++;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha * Math.sin((p.life / 60) * Math.PI);
        ctx.fill();
      });
      ctx.globalAlpha = 1;
      animId = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <section className="py-20 relative overflow-hidden" style={{ background: 'linear-gradient(180deg, #0a0a0f 0%, #0a0f14 100%)' }}>
      {/* Animated canvas background */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity: 0.4 }} />

      <style>{`
        @keyframes regBoxGlow {
          0%, 100% { box-shadow: 0 0 30px rgba(6,182,212,0.15), 0 0 60px rgba(6,182,212,0.05); }
          50% { box-shadow: 0 0 60px rgba(6,182,212,0.35), 0 0 120px rgba(16,185,129,0.15); }
        }
        @keyframes regBoxGlowText {
          0%, 100% { box-shadow: 0 0 30px rgba(16,185,129,0.15), 0 0 60px rgba(37,99,235,0.05); }
          50% { box-shadow: 0 0 60px rgba(16,185,129,0.3), 0 0 120px rgba(37,99,235,0.1); }
        }
        @keyframes topBorderSlide {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        @keyframes bottomBorderSlide {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
        @keyframes leftBorderSlide {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
        @keyframes rightBorderSlide {
          0% { transform: translateY(100%); }
          100% { transform: translateY(-100%); }
        }
        @keyframes iconGlow {
          0%, 100% { filter: drop-shadow(0 0 10px rgba(6,182,212,0.6)); }
          50% { filter: drop-shadow(0 0 25px rgba(6,182,212,1)) drop-shadow(0 0 50px rgba(16,185,129,0.5)); }
        }
        @keyframes badgePulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        @keyframes ringGlowTop {
          0%, 100% { box-shadow: 0 -6px 18px 4px rgba(6,182,212,0.7), 0 0 8px 2px rgba(6,182,212,0.4); }
          50% { box-shadow: 0 -10px 28px 8px rgba(6,182,212,1), 0 0 16px 4px rgba(6,182,212,0.6); }
        }
        @keyframes ringGlowBottom {
          0%, 100% { box-shadow: 0 6px 18px 4px rgba(16,185,129,0.7), 0 0 8px 2px rgba(16,185,129,0.4); }
          50% { box-shadow: 0 10px 28px 8px rgba(16,185,129,1), 0 0 16px 4px rgba(16,185,129,0.6); }
        }
        @keyframes ringGlowLeft {
          0%, 100% { box-shadow: -6px 0 18px 4px rgba(232,25,44,0.7), 0 0 8px 2px rgba(232,25,44,0.4); }
          50% { box-shadow: -10px 0 28px 8px rgba(232,25,44,1), 0 0 16px 4px rgba(232,25,44,0.6); }
        }
        @keyframes ringGlowRight {
          0%, 100% { box-shadow: 6px 0 18px 4px rgba(124,58,237,0.7), 0 0 8px 2px rgba(124,58,237,0.4); }
          50% { box-shadow: 10px 0 28px 8px rgba(124,58,237,1), 0 0 16px 4px rgba(124,58,237,0.6); }
        }
      `}</style>

      {/* Background accents */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(6,182,212,0.6), transparent)' }} />
        <div className="absolute -top-10 left-1/4 w-80 h-80 rounded-full" style={{ background: 'radial-gradient(circle, rgba(6,182,212,0.08) 0%, transparent 70%)' }} />
        <div className="absolute -bottom-10 right-1/4 w-80 h-80 rounded-full" style={{ background: 'radial-gradient(circle, rgba(16,185,129,0.08) 0%, transparent 70%)' }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-10 items-center">

          {/* Left — Text content in animated box */}
          <ScrollReveal direction="left">
            <div className="relative rounded-2xl p-8 overflow-hidden" style={{
              background: 'linear-gradient(135deg, rgba(5,12,15,0.98) 0%, rgba(8,15,18,0.98) 100%)',
              border: '1px solid rgba(16,185,129,0.3)',
              animation: 'regBoxGlowText 3s ease-in-out infinite',
            }}>
              {/* Animated 4-side borders */}
              <div className="absolute top-0 left-0 right-0 h-0.5 overflow-hidden rounded-t-2xl">
                <div className="h-full w-1/2" style={{ background: 'linear-gradient(to right, transparent, #10b981, transparent)', animation: 'topBorderSlide 2s linear infinite' }} />
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-0.5 overflow-hidden rounded-b-2xl">
                <div className="h-full w-1/2" style={{ background: 'linear-gradient(to right, transparent, #2563eb, transparent)', animation: 'bottomBorderSlide 2s linear infinite' }} />
              </div>
              <div className="absolute top-0 left-0 bottom-0 w-0.5 overflow-hidden rounded-l-2xl">
                <div className="w-full h-1/2" style={{ background: 'linear-gradient(to bottom, transparent, #06b6d4, transparent)', animation: 'leftBorderSlide 2s linear infinite' }} />
              </div>
              <div className="absolute top-0 right-0 bottom-0 w-0.5 overflow-hidden rounded-r-2xl">
                <div className="w-full h-1/2" style={{ background: 'linear-gradient(to bottom, transparent, #7c3aed, transparent)', animation: 'rightBorderSlide 2s linear infinite' }} />
              </div>

              {/* Corner glow */}
              <div className="absolute top-0 left-0 w-16 h-16 pointer-events-none" style={{ background: 'radial-gradient(circle at top left, rgba(6,182,212,0.2) 0%, transparent 70%)' }} />
              <div className="absolute bottom-0 right-0 w-16 h-16 pointer-events-none" style={{ background: 'radial-gradient(circle at bottom right, rgba(16,185,129,0.2) 0%, transparent 70%)' }} />

              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-5 text-xs font-semibold tracking-widest uppercase" style={{ background: 'rgba(6,182,212,0.12)', border: '1px solid rgba(6,182,212,0.35)', color: '#22d3ee' }}>
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                  Official Registration
                </div>
                <h2 className="text-2xl font-extrabold mb-6" style={{ background: 'linear-gradient(135deg, #06b6d4 0%, #10b981 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                  Company Registration
                </h2>
                <div className="space-y-5">
                  {[
                    <>As our business continued to grow, our founder understood that formally registering the company would strengthen trust among artists, record labels, and business partners while creating a strong foundation for future expansion. Accordingly, in 2022, <strong style={{ color: '#f1f5f9' }}>Karhari Media</strong> was officially incorporated and registered with the Government of India.</>,
                    <>Following the registration, we also secured legal protection for the Karhari Media brand by registering its trademark.</>,
                    <>Although the Karhari Media name was created in 2014 and our online presence developed further around 2020, official company registration was successfully completed in 2022.</>,
                  ]?.map((text, i) => (
                    <div key={i} className="flex gap-3">
                      <div className="flex-shrink-0 mt-2">
                        <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#06b6d4', boxShadow: '0 0 8px rgba(6,182,212,0.8)' }} />
                      </div>
                      <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.65)' }}>{text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Right — Karhari Media icon showcase box with animated borders */}
          <ScrollReveal direction="right">
            <div className="relative rounded-2xl p-8 overflow-hidden" style={{
              background: 'linear-gradient(135deg, rgba(5,10,15,0.98) 0%, rgba(8,14,20,0.98) 100%)',
              border: '1px solid rgba(6,182,212,0.3)',
              animation: 'regBoxGlow 3s ease-in-out infinite',
              minHeight: '380px',
            }}>
              {/* Animated 4-side borders */}
              <div className="absolute top-0 left-0 right-0 h-0.5 overflow-hidden rounded-t-2xl">
                <div className="h-full w-1/2" style={{ background: 'linear-gradient(to right, transparent, #06b6d4, transparent)', animation: 'topBorderSlide 1.8s linear infinite' }} />
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-0.5 overflow-hidden rounded-b-2xl">
                <div className="h-full w-1/2" style={{ background: 'linear-gradient(to right, transparent, #10b981, transparent)', animation: 'bottomBorderSlide 1.8s linear infinite' }} />
              </div>
              <div className="absolute top-0 left-0 bottom-0 w-0.5 overflow-hidden rounded-l-2xl">
                <div className="w-full h-1/2" style={{ background: 'linear-gradient(to bottom, transparent, #e8192c, transparent)', animation: 'leftBorderSlide 1.8s linear infinite' }} />
              </div>
              <div className="absolute top-0 right-0 bottom-0 w-0.5 overflow-hidden rounded-r-2xl">
                <div className="w-full h-1/2" style={{ background: 'linear-gradient(to bottom, transparent, #7c3aed, transparent)', animation: 'rightBorderSlide 1.8s linear infinite' }} />
              </div>

              {/* Corner glow accents */}
              <div className="absolute top-0 right-0 w-24 h-24 pointer-events-none" style={{ background: 'radial-gradient(circle at top right, rgba(6,182,212,0.25) 0%, transparent 70%)' }} />
              <div className="absolute bottom-0 left-0 w-24 h-24 pointer-events-none" style={{ background: 'radial-gradient(circle at bottom left, rgba(16,185,129,0.2) 0%, transparent 70%)' }} />

              {/* Content */}
              <div className="relative z-10 flex flex-col items-center justify-center h-full py-6">
                {/* Fixed centered ring with 4-side glow lighting */}
                <div className="relative flex items-center justify-center mb-8" style={{ width: '180px', height: '180px' }}>
                  {/* Static ring with 4-side glow — fixed in place */}
                  <div
                    className="absolute inset-0 rounded-full"
                    style={{
                      border: '2.5px solid rgba(6,182,212,0.55)',
                      background: 'radial-gradient(circle, rgba(6,182,212,0.08) 0%, transparent 70%)',
                    }}
                  />
                  {/* Top glow segment */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2" style={{
                    width: '60px', height: '4px', borderRadius: '0 0 4px 4px',
                    background: 'rgba(6,182,212,0.9)',
                    animation: 'ringGlowTop 2s ease-in-out infinite',
                  }} />
                  {/* Bottom glow segment */}
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2" style={{
                    width: '60px', height: '4px', borderRadius: '4px 4px 0 0',
                    background: 'rgba(16,185,129,0.9)',
                    animation: 'ringGlowBottom 2s ease-in-out infinite 0.5s',
                  }} />
                  {/* Left glow segment */}
                  <div className="absolute left-0 top-1/2 -translate-y-1/2" style={{
                    width: '4px', height: '60px', borderRadius: '0 4px 4px 0',
                    background: 'rgba(232,25,44,0.9)',
                    animation: 'ringGlowLeft 2s ease-in-out infinite 1s',
                  }} />
                  {/* Right glow segment */}
                  <div className="absolute right-0 top-1/2 -translate-y-1/2" style={{
                    width: '4px', height: '60px', borderRadius: '4px 0 0 4px',
                    background: 'rgba(124,58,237,0.9)',
                    animation: 'ringGlowRight 2s ease-in-out infinite 1.5s',
                  }} />
                  {/* Inner glow */}
                  <div className="absolute inset-4 rounded-full" style={{ background: 'radial-gradient(circle, rgba(6,182,212,0.18) 0%, transparent 70%)' }} />
                  {/* Logo — centered, slightly larger */}
                  <img
                    src="/assets/images/1608452013412__1_-1786276249256.png"
                    alt="Karhari Media official company logo"
                    className="relative z-10 w-24 h-24 object-contain"
                    style={{ animation: 'iconGlow 2s ease-in-out infinite' }}
                  />
                </div>

                {/* Brand name bold */}
                <h3 className="text-3xl font-black text-center mb-2" style={{ background: 'linear-gradient(135deg, #06b6d4 0%, #10b981 50%, #2563eb 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', letterSpacing: '0.02em' }}>
                  Karhari Media
                </h3>
                <p className="text-xs tracking-widest uppercase mb-6" style={{ color: 'rgba(255,255,255,0.4)' }}>Officially Registered · 2022</p>

                {/* Registration badge */}
                <div className="rounded-xl px-6 py-4 text-center" style={{
                  background: 'linear-gradient(135deg, rgba(6,182,212,0.1) 0%, rgba(16,185,129,0.08) 100%)',
                  border: '1px solid rgba(6,182,212,0.3)',
                  animation: 'badgePulse 2.5s ease-in-out infinite',
                }}>
                  <div className="text-xs font-bold mb-1" style={{ color: '#06b6d4' }}>✓ Officially Registered</div>
                  <div className="text-sm font-semibold text-white">Government of India</div>
                  <div className="text-xs mt-1" style={{ color: 'rgba(255,255,255,0.45)' }}>Trademark Registered · 2022</div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}