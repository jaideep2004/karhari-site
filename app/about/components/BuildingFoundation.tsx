'use client';

import React, { useEffect, useRef } from 'react';
import ScrollReveal from '../../components/ScrollReveal';

export default function BuildingFoundation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const lines: { x: number; y: number; len: number; angle: number; speed: number; color: string; alpha: number }[] = [];
    const colors = ['#e8192c', '#f97316', '#2563eb', '#7c3aed'];

    for (let i = 0; i < 30; i++) {
      lines.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        len: Math.random() * 60 + 20,
        angle: Math.random() * Math.PI * 2,
        speed: Math.random() * 0.5 + 0.2,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: Math.random() * 0.3 + 0.1,
      });
    }

    let animId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      lines.forEach((l) => {
        l.x += Math.cos(l.angle) * l.speed;
        l.y += Math.sin(l.angle) * l.speed;
        if (l.x < 0 || l.x > canvas.width || l.y < 0 || l.y > canvas.height) {
          l.x = Math.random() * canvas.width;
          l.y = Math.random() * canvas.height;
        }
        ctx.beginPath();
        ctx.moveTo(l.x, l.y);
        ctx.lineTo(l.x + Math.cos(l.angle) * l.len, l.y + Math.sin(l.angle) * l.len);
        ctx.strokeStyle = l.color;
        ctx.globalAlpha = l.alpha;
        ctx.lineWidth = 1;
        ctx.stroke();
      });
      ctx.globalAlpha = 1;
      animId = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <section className="py-20 relative overflow-hidden" style={{ background: 'linear-gradient(180deg, #0a0a0f 0%, #0a0f1a 100%)' }}>
      {/* Animated canvas background */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity: 0.5 }} />

      <style>{`
        @keyframes borderFlow4 {
          0%, 100% { opacity: 0.4; box-shadow: 0 0 8px currentColor; }
          50% { opacity: 1; box-shadow: 0 0 24px currentColor; }
        }
        @keyframes boxGlow {
          0%, 100% { box-shadow: 0 0 30px rgba(232,25,44,0.15), 0 0 60px rgba(232,25,44,0.05); }
          50% { box-shadow: 0 0 50px rgba(232,25,44,0.3), 0 0 100px rgba(232,25,44,0.1); }
        }
        @keyframes boxGlowBlue {
          0%, 100% { box-shadow: 0 0 30px rgba(37,99,235,0.15), 0 0 60px rgba(37,99,235,0.05); }
          50% { box-shadow: 0 0 50px rgba(37,99,235,0.3), 0 0 100px rgba(37,99,235,0.1); }
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
      `}</style>

      {/* Background accents */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(232,25,44,0.5), transparent)' }} />
        <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full" style={{ background: 'radial-gradient(circle, rgba(232,25,44,0.08) 0%, transparent 70%)' }} />
        <div className="absolute -bottom-20 -left-20 w-96 h-96 rounded-full" style={{ background: 'radial-gradient(circle, rgba(37,99,235,0.08) 0%, transparent 70%)' }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-10 items-start">

          {/* Left — Text box with animated 4-side borders */}
          <ScrollReveal direction="left">
            <div className="relative rounded-2xl p-8 overflow-hidden" style={{
              background: 'linear-gradient(135deg, rgba(15,5,10,0.98) 0%, rgba(20,8,15,0.98) 100%)',
              border: '1px solid rgba(232,25,44,0.3)',
              animation: 'boxGlow 3s ease-in-out infinite',
            }}>
              {/* Animated top border */}
              <div className="absolute top-0 left-0 right-0 h-0.5 overflow-hidden rounded-t-2xl">
                <div className="h-full w-1/2" style={{ background: 'linear-gradient(to right, transparent, #e8192c, transparent)', animation: 'topBorderSlide 2s linear infinite' }} />
              </div>
              {/* Animated bottom border */}
              <div className="absolute bottom-0 left-0 right-0 h-0.5 overflow-hidden rounded-b-2xl">
                <div className="h-full w-1/2" style={{ background: 'linear-gradient(to right, transparent, #f97316, transparent)', animation: 'bottomBorderSlide 2s linear infinite' }} />
              </div>
              {/* Animated left border */}
              <div className="absolute top-0 left-0 bottom-0 w-0.5 overflow-hidden rounded-l-2xl">
                <div className="w-full h-1/2" style={{ background: 'linear-gradient(to bottom, transparent, #7c3aed, transparent)', animation: 'leftBorderSlide 2s linear infinite' }} />
              </div>
              {/* Animated right border */}
              <div className="absolute top-0 right-0 bottom-0 w-0.5 overflow-hidden rounded-r-2xl">
                <div className="w-full h-1/2" style={{ background: 'linear-gradient(to bottom, transparent, #2563eb, transparent)', animation: 'rightBorderSlide 2s linear infinite' }} />
              </div>

              {/* Corner glow accents */}
              <div className="absolute top-0 left-0 w-16 h-16 pointer-events-none" style={{ background: 'radial-gradient(circle at top left, rgba(232,25,44,0.25) 0%, transparent 70%)' }} />
              <div className="absolute bottom-0 right-0 w-16 h-16 pointer-events-none" style={{ background: 'radial-gradient(circle at bottom right, rgba(249,115,22,0.2) 0%, transparent 70%)' }} />

              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-5 text-xs font-semibold tracking-widest uppercase" style={{ background: 'rgba(232,25,44,0.12)', border: '1px solid rgba(232,25,44,0.35)', color: '#f87171' }}>
                  <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
                  2014 – 2020
                </div>
                <h2 className="text-2xl font-extrabold mb-6" style={{ background: 'linear-gradient(135deg, #e8192c 0%, #f97316 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                  Building the Foundation
                </h2>
                <div className="space-y-5">
                  {[
                    <>Between 2014 and 2017, our founder focused on building relationships with independent artists, singers, music producers, and record labels. During this period, <strong style={{ color: '#f1f5f9' }}>Karhari Media</strong> signed agreements with artists and labels while continuing to produce original music. As our network expanded, we partnered with several well-known digital music distribution companies to deliver music to global digital platforms.</>,
                    <>During this journey, we worked with companies such as <strong style={{ color: '#f1f5f9' }}>Believe Music, MusicMaster, Bquate Music</strong>, and other distribution partners.</>,
                    <>From approximately <strong style={{ color: '#f1f5f9' }}>2017 to 2020</strong>, we successfully distributed music for our artists, record labels, and our own catalog through these third-party distribution partners. These years helped us gain valuable industry experience, strengthen our relationships within the music business, and steadily grow our catalogue and artist network.</>,
                  ]?.map((text, i) => (
                    <div key={i} className="flex gap-3">
                      <div className="flex-shrink-0 mt-2">
                        <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#e8192c', boxShadow: '0 0 8px rgba(232,25,44,0.8)', animation: 'borderFlow4 2s ease-in-out infinite' }} />
                      </div>
                      <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.65)' }}>{text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Right — Timeline box with animated 4-side borders */}
          <ScrollReveal direction="right">
            <div className="relative rounded-2xl p-8 overflow-hidden" style={{
              background: 'linear-gradient(135deg, rgba(5,8,20,0.98) 0%, rgba(8,12,25,0.98) 100%)',
              border: '1px solid rgba(37,99,235,0.3)',
              animation: 'boxGlowBlue 3s ease-in-out infinite',
            }}>
              {/* Animated top border */}
              <div className="absolute top-0 left-0 right-0 h-0.5 overflow-hidden rounded-t-2xl">
                <div className="h-full w-1/2" style={{ background: 'linear-gradient(to right, transparent, #2563eb, transparent)', animation: 'topBorderSlide 2.5s linear infinite' }} />
              </div>
              {/* Animated bottom border */}
              <div className="absolute bottom-0 left-0 right-0 h-0.5 overflow-hidden rounded-b-2xl">
                <div className="h-full w-1/2" style={{ background: 'linear-gradient(to right, transparent, #7c3aed, transparent)', animation: 'bottomBorderSlide 2.5s linear infinite' }} />
              </div>
              {/* Animated left border */}
              <div className="absolute top-0 left-0 bottom-0 w-0.5 overflow-hidden rounded-l-2xl">
                <div className="w-full h-1/2" style={{ background: 'linear-gradient(to bottom, transparent, #06b6d4, transparent)', animation: 'leftBorderSlide 2.5s linear infinite' }} />
              </div>
              {/* Animated right border */}
              <div className="absolute top-0 right-0 bottom-0 w-0.5 overflow-hidden rounded-r-2xl">
                <div className="w-full h-1/2" style={{ background: 'linear-gradient(to bottom, transparent, #10b981, transparent)', animation: 'rightBorderSlide 2.5s linear infinite' }} />
              </div>

              {/* Corner glow accents */}
              <div className="absolute top-0 right-0 w-20 h-20 pointer-events-none" style={{ background: 'radial-gradient(circle at top right, rgba(37,99,235,0.25) 0%, transparent 70%)' }} />
              <div className="absolute bottom-0 left-0 w-20 h-20 pointer-events-none" style={{ background: 'radial-gradient(circle at bottom left, rgba(124,58,237,0.2) 0%, transparent 70%)' }} />

              <div className="relative z-10">
                <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-blue-500" style={{ boxShadow: '0 0 10px rgba(37,99,235,0.8)', animation: 'borderFlow4 2s ease-in-out infinite' }} />
                  Our Journey Timeline
                </h3>
                <div className="space-y-5">
                  {[
                    { year: '2014', title: 'The Vision', desc: 'Karhari Media name was created by Mr. Shekh Tabrej.', color: '#e8192c' },
                    { year: '2014–2017', title: 'Building Relationships', desc: 'Signed agreements with artists & labels.', color: '#f97316' },
                    { year: '2017–2020', title: 'Working with Partners', desc: 'Distributed music through Believe Music, MusicMaster, Bquate Music & others.', color: '#7c3aed' },
                  ]?.map((item, i) => (
                    <div key={i} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div
                          className="w-3 h-3 rounded-full flex-shrink-0 mt-0.5"
                          style={{ background: item?.color, boxShadow: `0 0 10px ${item?.color}90`, animation: `borderFlow4 2s ease-in-out infinite ${i * 0.4}s` }}
                        />
                        {i < 2 && <div className="w-px flex-1 mt-1" style={{ background: `linear-gradient(to bottom, ${item?.color}60, transparent)` }} />}
                      </div>
                      <div className="pb-4 flex-1">
                        <div className="rounded-xl p-3" style={{ background: `${item?.color}10`, border: `1px solid ${item?.color}30` }}>
                          <div className="text-xs font-bold mb-0.5" style={{ color: item?.color }}>{item?.year}</div>
                          <div className="text-sm font-semibold text-white mb-1">{item?.title}</div>
                          <div className="text-xs" style={{ color: 'rgba(255,255,255,0.55)' }}>{item?.desc}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}