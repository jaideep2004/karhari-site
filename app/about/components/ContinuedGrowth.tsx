'use client';

import React, { useEffect, useRef } from 'react';
import ScrollReveal from '../../components/ScrollReveal';

export default function ContinuedGrowth() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const graphCanvasRef = useRef<HTMLCanvasElement>(null);

  const stats = [
    { value: '150,000+', label: 'Songs in Catalogue', color: '#e8192c', glow: 'rgba(232,25,44,0.5)' },
    { value: 'Daily', label: 'New Releases Added', color: '#f97316', glow: 'rgba(249,115,22,0.5)' },
    { value: '1000s', label: 'Artists & Labels', color: '#7c3aed', glow: 'rgba(124,58,237,0.5)' },
    { value: '2022', label: 'Officially Registered', color: '#06b6d4', glow: 'rgba(6,182,212,0.5)' },
  ];

  // Background particle canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const dots: { x: number; y: number; vx: number; vy: number; r: number; color: string; alpha: number }[] = [];
    const colors = ['#10b981', '#06b6d4', '#e8192c', '#7c3aed'];

    for (let i = 0; i < 50; i++) {
      dots.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        r: Math.random() * 2 + 0.5,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: Math.random() * 0.4 + 0.1,
      });
    }

    let animId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      dots.forEach((d) => {
        d.x += d.vx;
        d.y += d.vy;
        if (d.x < 0 || d.x > canvas.width) d.vx *= -1;
        if (d.y < 0 || d.y > canvas.height) d.vy *= -1;
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fillStyle = d.color;
        ctx.globalAlpha = d.alpha;
        ctx.fill();
      });
      ctx.globalAlpha = 1;
      animId = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(animId);
  }, []);

  // Animated graph canvas
  useEffect(() => {
    const canvas = graphCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const bars = [
      { label: '2014', value: 0.15, color: '#e8192c' },
      { label: '2016', value: 0.28, color: '#f97316' },
      { label: '2018', value: 0.42, color: '#7c3aed' },
      { label: '2020', value: 0.58, color: '#2563eb' },
      { label: '2022', value: 0.75, color: '#06b6d4' },
      { label: '2024', value: 0.95, color: '#10b981' },
    ];

    let progress = 0;
    let animId: number;

    const drawGraph = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const padding = 40;
      const chartW = canvas.width - padding * 2;
      const chartH = canvas.height - padding * 2;
      const barW = (chartW / bars.length) * 0.6;
      const gap = (chartW / bars.length) * 0.4;

      // Grid lines
      for (let i = 0; i <= 4; i++) {
        const y = padding + (chartH / 4) * i;
        ctx.beginPath();
        ctx.moveTo(padding, y);
        ctx.lineTo(canvas.width - padding, y);
        ctx.strokeStyle = 'rgba(255,255,255,0.06)';
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // Bars
      bars.forEach((bar, i) => {
        const x = padding + i * (barW + gap) + gap / 2;
        const barH = chartH * bar.value * Math.min(progress, 1);
        const y = padding + chartH - barH;

        // Gradient fill
        const grad = ctx.createLinearGradient(x, y, x, padding + chartH);
        grad.addColorStop(0, bar.color);
        grad.addColorStop(1, bar.color + '20');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.roundRect(x, y, barW, barH, [4, 4, 0, 0]);
        ctx.fill();

        // Glow effect
        ctx.shadowColor = bar.color;
        ctx.shadowBlur = 12;
        ctx.fillStyle = bar.color + '40';
        ctx.beginPath();
        ctx.roundRect(x, y, barW, barH, [4, 4, 0, 0]);
        ctx.fill();
        ctx.shadowBlur = 0;

        // Label
        ctx.fillStyle = 'rgba(255,255,255,0.5)';
        ctx.font = '10px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(bar.label, x + barW / 2, canvas.height - 8);
      });

      // Line chart overlay
      if (progress >= 1) {
        ctx.beginPath();
        bars.forEach((bar, i) => {
          const x = padding + i * (barW + gap) + gap / 2 + barW / 2;
          const y = padding + chartH - chartH * bar.value;
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        });
        ctx.strokeStyle = '#10b981';
        ctx.lineWidth = 2;
        ctx.shadowColor = '#10b981';
        ctx.shadowBlur = 8;
        ctx.stroke();
        ctx.shadowBlur = 0;

        // Dots on line
        bars.forEach((bar, i) => {
          const x = padding + i * (barW + gap) + gap / 2 + barW / 2;
          const y = padding + chartH - chartH * bar.value;
          ctx.beginPath();
          ctx.arc(x, y, 4, 0, Math.PI * 2);
          ctx.fillStyle = '#10b981';
          ctx.shadowColor = '#10b981';
          ctx.shadowBlur = 10;
          ctx.fill();
          ctx.shadowBlur = 0;
        });
      }

      if (progress < 1) {
        progress += 0.015;
        animId = requestAnimationFrame(drawGraph);
      } else {
        // Keep redrawing for glow animation
        animId = requestAnimationFrame(drawGraph);
      }
    };

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        progress = 0;
        drawGraph();
        observer.disconnect();
      }
    }, { threshold: 0.3 });

    observer.observe(canvas);
    return () => {
      cancelAnimationFrame(animId);
      observer.disconnect();
    };
  }, []);

  return (
    <section className="py-20 relative overflow-hidden" style={{ background: 'linear-gradient(180deg, #0a0f14 0%, #0d0a1a 50%, #0a0a0f 100%)' }}>
      {/* Animated particle canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity: 0.35 }} />

      <style>{`
        @keyframes growthBoxGlow {
          0%, 100% { box-shadow: 0 0 30px rgba(16,185,129,0.15), 0 0 60px rgba(16,185,129,0.05); }
          50% { box-shadow: 0 0 60px rgba(16,185,129,0.35), 0 0 120px rgba(6,182,212,0.15); }
        }
        @keyframes statBoxGlow {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.03); }
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
        @keyframes statValueCount {
          0% { opacity: 0; transform: translateY(10px); }
          100% { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* Background accents */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(16,185,129,0.6), transparent)' }} />
        <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(232,25,44,0.5), transparent)' }} />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(16,185,129,0.07) 0%, transparent 70%)' }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 items-start">

          {/* Left — Animated graph box (dark/chocolate mode, no white) */}
          <ScrollReveal direction="left">
            <div className="relative rounded-2xl p-6 overflow-hidden" style={{
              background: 'linear-gradient(135deg, rgba(8,12,10,0.98) 0%, rgba(12,16,14,0.98) 100%)',
              border: '1px solid rgba(16,185,129,0.3)',
              animation: 'growthBoxGlow 3s ease-in-out infinite',
            }}>
              {/* Animated 4-side borders */}
              <div className="absolute top-0 left-0 right-0 h-0.5 overflow-hidden rounded-t-2xl">
                <div className="h-full w-1/2" style={{ background: 'linear-gradient(to right, transparent, #10b981, transparent)', animation: 'topBorderSlide 2s linear infinite' }} />
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-0.5 overflow-hidden rounded-b-2xl">
                <div className="h-full w-1/2" style={{ background: 'linear-gradient(to right, transparent, #06b6d4, transparent)', animation: 'bottomBorderSlide 2s linear infinite' }} />
              </div>
              <div className="absolute top-0 left-0 bottom-0 w-0.5 overflow-hidden rounded-l-2xl">
                <div className="w-full h-1/2" style={{ background: 'linear-gradient(to bottom, transparent, #e8192c, transparent)', animation: 'leftBorderSlide 2s linear infinite' }} />
              </div>
              <div className="absolute top-0 right-0 bottom-0 w-0.5 overflow-hidden rounded-r-2xl">
                <div className="w-full h-1/2" style={{ background: 'linear-gradient(to bottom, transparent, #7c3aed, transparent)', animation: 'rightBorderSlide 2s linear infinite' }} />
              </div>

              {/* Corner glow */}
              <div className="absolute top-0 left-0 w-16 h-16 pointer-events-none" style={{ background: 'radial-gradient(circle at top left, rgba(16,185,129,0.2) 0%, transparent 70%)' }} />
              <div className="absolute bottom-0 right-0 w-16 h-16 pointer-events-none" style={{ background: 'radial-gradient(circle at bottom right, rgba(6,182,212,0.2) 0%, transparent 70%)' }} />

              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-2 h-2 rounded-full bg-emerald-400" style={{ boxShadow: '0 0 8px rgba(16,185,129,0.8)' }} />
                  <span className="text-sm font-bold text-white">Growth Analytics</span>
                  <span className="text-xs ml-auto" style={{ color: 'rgba(255,255,255,0.4)' }}>2014 – 2024</span>
                </div>
                {/* Animated graph canvas */}
                <canvas
                  ref={graphCanvasRef}
                  className="w-full rounded-xl"
                  style={{ height: '220px', background: 'rgba(0,0,0,0.3)' }}
                />
              </div>
            </div>
          </ScrollReveal>

          {/* Right — Stats in animated boxes */}
          <ScrollReveal direction="right">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-5 text-xs font-semibold tracking-widest uppercase" style={{ background: 'rgba(16,185,129,0.12)', border: '1px solid rgba(16,185,129,0.35)', color: '#34d399' }}>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              2022 – 2024
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold mb-6" style={{ background: 'linear-gradient(135deg, #10b981 0%, #06b6d4 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Continued Growth
            </h2>
            <div className="flex gap-3 mb-8">
              <div className="flex-shrink-0 mt-2">
                <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#10b981', boxShadow: '0 0 8px rgba(16,185,129,0.8)' }} />
              </div>
              <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.65)' }}>
                Between 2022 and 2024, we continued operating with trusted third-party distribution partners
                while expanding our artist network and music catalogue. Today, Karhari Media works with thousands of
                artists and record labels and manages a catalogue of more than{' '}
                <strong style={{ color: '#f1f5f9' }}>150,000 songs</strong>, with new releases being added
                every day and every month.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {stats?.map((stat, idx) => (
                <div
                  key={stat?.label}
                  className="relative rounded-xl p-5 overflow-hidden"
                  style={{
                    background: `linear-gradient(135deg, ${stat?.color}12 0%, ${stat?.color}06 100%)`,
                    border: `1px solid ${stat?.color}35`,
                    animation: `statBoxGlow 2.5s ease-in-out infinite ${idx * 0.3}s`,
                  }}
                >
                  {/* Animated 4-side borders */}
                  <div className="absolute top-0 left-0 right-0 h-0.5 overflow-hidden rounded-t-xl">
                    <div className="h-full w-1/2" style={{ background: `linear-gradient(to right, transparent, ${stat?.color}, transparent)`, animation: `topBorderSlide ${1.5 + idx * 0.2}s linear infinite` }} />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 overflow-hidden rounded-b-xl">
                    <div className="h-full w-1/2" style={{ background: `linear-gradient(to right, transparent, ${stat?.color}, transparent)`, animation: `bottomBorderSlide ${1.5 + idx * 0.2}s linear infinite` }} />
                  </div>
                  <div className="absolute top-0 left-0 bottom-0 w-0.5 overflow-hidden rounded-l-xl">
                    <div className="w-full h-1/2" style={{ background: `linear-gradient(to bottom, transparent, ${stat?.color}, transparent)`, animation: `leftBorderSlide ${1.5 + idx * 0.2}s linear infinite` }} />
                  </div>
                  <div className="absolute top-0 right-0 bottom-0 w-0.5 overflow-hidden rounded-r-xl">
                    <div className="w-full h-1/2" style={{ background: `linear-gradient(to bottom, transparent, ${stat?.color}, transparent)`, animation: `rightBorderSlide ${1.5 + idx * 0.2}s linear infinite` }} />
                  </div>

                  <div className="relative z-10 text-center">
                    <div className="text-2xl font-extrabold mb-1" style={{ color: stat?.color, textShadow: `0 0 20px ${stat?.glow}` }}>
                      {stat?.value}
                    </div>
                    <div className="text-xs" style={{ color: 'rgba(255,255,255,0.55)' }}>{stat?.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
