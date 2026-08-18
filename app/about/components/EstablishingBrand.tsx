'use client';

import React, { useEffect, useRef } from 'react';
import ScrollReveal from '../../components/ScrollReveal';

export default function EstablishingBrand() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const rings: { x: number; y: number; r: number; maxR: number; color: string; alpha: number; speed: number }[] = [];
    const colors = ['#7c3aed', '#2563eb', '#e8192c', '#06b6d4'];

    for (let i = 0; i < 8; i++) {
      rings.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 30,
        maxR: 60 + Math.random() * 80,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: 0.4,
        speed: 0.4 + Math.random() * 0.4,
      });
    }

    let animId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      rings.forEach((ring) => {
        ring.r += ring.speed;
        ring.alpha = (1 - ring.r / ring.maxR) * 0.4;
        if (ring.r > ring.maxR) {
          ring.r = 0;
          ring.x = Math.random() * canvas.width;
          ring.y = Math.random() * canvas.height;
        }
        ctx.beginPath();
        ctx.arc(ring.x, ring.y, ring.r, 0, Math.PI * 2);
        ctx.strokeStyle = ring.color;
        ctx.globalAlpha = ring.alpha;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      });
      ctx.globalAlpha = 1;
      animId = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <section className="py-20 relative overflow-hidden" style={{ background: 'linear-gradient(180deg, #0a0f1a 0%, #0d0a1a 50%, #0a0a0f 100%)' }}>
      {/* Animated canvas background */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity: 0.5 }} />

      <style>{`
        @keyframes urlBarGlow {
          0%, 100% { box-shadow: 0 0 8px rgba(124,58,237,0.3); border-color: rgba(124,58,237,0.3); }
          50% { box-shadow: 0 0 20px rgba(124,58,237,0.7), 0 0 40px rgba(37,99,235,0.4); border-color: rgba(124,58,237,0.8); }
        }
        @keyframes dotBlink {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.3); }
        }
        @keyframes brandBoxGlow {
          0%, 100% { box-shadow: 0 0 40px rgba(124,58,237,0.15), 0 0 80px rgba(37,99,235,0.08); }
          50% { box-shadow: 0 0 60px rgba(124,58,237,0.3), 0 0 120px rgba(37,99,235,0.15); }
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
        @keyframes logoFloat {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        @keyframes logoGlow {
          0%, 100% { filter: drop-shadow(0 0 8px rgba(124,58,237,0.5)) drop-shadow(0 0 16px rgba(232,25,44,0.3)); }
          50% { filter: drop-shadow(0 0 20px rgba(124,58,237,0.9)) drop-shadow(0 0 40px rgba(232,25,44,0.6)); }
        }
        @keyframes textTyping {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
      `}</style>

      {/* Background accents */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(124,58,237,0.6), transparent)' }} />
        <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(37,99,235,0.5), transparent)' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(124,58,237,0.06) 0%, transparent 70%)' }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left — Brand showcase box with animated 4-side borders */}
          <ScrollReveal direction="left">
            <div className="relative rounded-2xl p-6 overflow-hidden" style={{
              background: 'linear-gradient(135deg, rgba(8,5,20,0.98) 0%, rgba(12,8,25,0.98) 100%)',
              border: '1px solid rgba(124,58,237,0.3)',
              animation: 'brandBoxGlow 3s ease-in-out infinite',
            }}>
              {/* Animated 4-side borders */}
              <div className="absolute top-0 left-0 right-0 h-0.5 overflow-hidden rounded-t-2xl">
                <div className="h-full w-1/2" style={{ background: 'linear-gradient(to right, transparent, #7c3aed, transparent)', animation: 'topBorderSlide 2s linear infinite' }} />
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-0.5 overflow-hidden rounded-b-2xl">
                <div className="h-full w-1/2" style={{ background: 'linear-gradient(to right, transparent, #2563eb, transparent)', animation: 'bottomBorderSlide 2s linear infinite' }} />
              </div>
              <div className="absolute top-0 left-0 bottom-0 w-0.5 overflow-hidden rounded-l-2xl">
                <div className="w-full h-1/2" style={{ background: 'linear-gradient(to bottom, transparent, #e8192c, transparent)', animation: 'leftBorderSlide 2s linear infinite' }} />
              </div>
              <div className="absolute top-0 right-0 bottom-0 w-0.5 overflow-hidden rounded-r-2xl">
                <div className="w-full h-1/2" style={{ background: 'linear-gradient(to bottom, transparent, #06b6d4, transparent)', animation: 'rightBorderSlide 2s linear infinite' }} />
              </div>

              {/* Corner glow */}
              <div className="absolute top-0 left-0 w-20 h-20 pointer-events-none" style={{ background: 'radial-gradient(circle at top left, rgba(124,58,237,0.25) 0%, transparent 70%)' }} />
              <div className="absolute bottom-0 right-0 w-20 h-20 pointer-events-none" style={{ background: 'radial-gradient(circle at bottom right, rgba(37,99,235,0.2) 0%, transparent 70%)' }} />

              {/* Logo + Brand name display */}
              <div className="relative z-10 flex flex-col items-center py-8">
                {/* Karhari Media Logo Icon */}
                <div className="relative mb-6">
                  <div className="absolute inset-0 rounded-full" style={{ background: 'radial-gradient(circle, rgba(232,25,44,0.3) 0%, transparent 70%)', transform: 'scale(1.5)', animation: 'brandBoxGlow 2s ease-in-out infinite' }} />
                  <img
                    src="/assets/images/1608452013412__1_-1786276249256.png"
                    alt="Karhari Media logo icon"
                    className="relative z-10 w-28 h-28 object-contain"
                    style={{ animation: 'logoFloat 3s ease-in-out infinite, logoGlow 2s ease-in-out infinite' }}
                  />
                </div>

                {/* Brand name */}
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-extrabold mb-1" style={{ background: 'linear-gradient(135deg, #e8192c 0%, #7c3aed 50%, #2563eb 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                    Karhari Media
                  </h3>
                  <p className="text-xs tracking-widest uppercase" style={{ color: 'rgba(255,255,255,0.4)' }}>Music Distribution & Technology</p>
                </div>

                {/* Browser bar mockup with animated glow */}
                <div className="w-full rounded-xl p-3" style={{ background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(124,58,237,0.2)' }}>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#e8192c', boxShadow: '0 0 6px rgba(232,25,44,0.8)', animation: 'dotBlink 2s ease-in-out infinite' }} />
                    <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#f59e0b', boxShadow: '0 0 6px rgba(245,158,11,0.8)', animation: 'dotBlink 2s ease-in-out infinite 0.3s' }} />
                    <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#10b981', boxShadow: '0 0 6px rgba(16,185,129,0.8)', animation: 'dotBlink 2s ease-in-out infinite 0.6s' }} />
                  </div>
                  <div className="rounded-lg px-4 py-2 text-sm font-mono flex items-center gap-2" style={{ background: 'rgba(124,58,237,0.08)', border: '1px solid rgba(124,58,237,0.3)', animation: 'urlBarGlow 2.5s ease-in-out infinite' }}>
                    <span style={{ color: '#10b981', fontSize: '10px' }}>🔒</span>
                    <span style={{ color: 'rgba(255,255,255,0.7)', animation: 'textTyping 3s ease-in-out infinite' }}>karharimedia.com</span>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Right — Text content */}
          <ScrollReveal direction="right">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-5 text-xs font-semibold tracking-widest uppercase" style={{ background: 'rgba(124,58,237,0.12)', border: '1px solid rgba(124,58,237,0.35)', color: '#a78bfa' }}>
              <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
              2020 Milestone
            </div>
            <h2 className="text-2xl font-extrabold mb-6" style={{ background: 'linear-gradient(135deg, #7c3aed 0%, #2563eb 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Establishing the Karhari Media Brand
            </h2>
            <div className="space-y-5">
              {[
                <>As the company continued to grow, our founder recognized the importance of creating a professional online presence. We secured the <strong style={{ color: '#f1f5f9' }}>karharimedia.com</strong> domain name and launched our official website, making Karhari Media more accessible to artists, record labels, and business partners around the world.</>,
                <>We continued working with trusted third-party distribution partners while expanding our services and supporting more artists and labels. The website launch in 2020 marked a significant milestone — it gave Karhari Media a professional, credible face in the global music industry.</>,
              ]?.map((text, i) => (
                <div key={i} className="flex gap-3">
                  <div className="flex-shrink-0 mt-2">
                    <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#7c3aed', boxShadow: '0 0 8px rgba(124,58,237,0.8)' }} />
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.65)' }}>{text}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}