'use client';
import React, { useEffect, useRef, useState } from 'react';

const FacebookIcon = ({ size = 18, className = '' }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const CTAWaveVisualizer = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const timeRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const setSize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      ctx.scale(dpr, dpr);
    };
    setSize();
    window.addEventListener('resize', setSize);

    const draw = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      ctx.clearRect(0, 0, w, h);
      timeRef.current += 0.012;
      const t = timeRef.current;

      const waveConfigs = [
        { amp: 28, freq: 0.012, phase: 0, alpha: 0.6, width: 2, color1: '24,119,242', color2: '167,139,250' },
        { amp: 18, freq: 0.018, phase: 1.5, alpha: 0.35, width: 1.5, color1: '56,189,248', color2: '52,211,153' },
        { amp: 12, freq: 0.025, phase: 3, alpha: 0.2, width: 1, color1: '24,119,242', color2: '24,119,242' },
        { amp: 7, freq: 0.035, phase: 4.5, alpha: 0.12, width: 1, color1: '167,139,250', color2: '167,139,250' },
      ];

      waveConfigs.forEach(cfg => {
        ctx.beginPath();
        const grad = ctx.createLinearGradient(0, 0, w, 0);
        grad.addColorStop(0, `rgba(${cfg.color1},0)`);
        grad.addColorStop(0.3, `rgba(${cfg.color1},${cfg.alpha})`);
        grad.addColorStop(0.7, `rgba(${cfg.color2},${cfg.alpha})`);
        grad.addColorStop(1, `rgba(${cfg.color2},0)`);
        ctx.strokeStyle = grad;
        ctx.lineWidth = cfg.width;
        ctx.shadowBlur = cfg.width > 1.5 ? 12 : 0;
        ctx.shadowColor = `rgba(${cfg.color1},0.5)`;

        for (let x = 0; x <= w; x += 2) {
          const y = h / 2 + cfg.amp * Math.sin(x * cfg.freq + t + cfg.phase);
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
        ctx.shadowBlur = 0;
      });

      animRef.current = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', setSize);
    };
  }, []);

  return <canvas ref={canvasRef} className="w-full h-full" style={{ display: 'block' }} />;
};

const trustItems = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        <path d="M9 12l2 2 4-4"/>
      </svg>
    ),
    text: 'Rights Protected',
    color: '#1877F2',
    glow: 'rgba(24,119,242,0.25)',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="5" width="20" height="14" rx="2"/>
        <line x1="2" y1="10" x2="22" y2="10"/>
        <path d="M6 15h4"/>
      </svg>
    ),
    text: 'Monthly Payouts',
    color: '#34d399',
    glow: 'rgba(52,211,153,0.25)',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <line x1="18" y1="20" x2="18" y2="10"/>
        <line x1="12" y1="20" x2="12" y2="4"/>
        <line x1="6" y1="20" x2="6" y2="14"/>
        <path d="M2 20h20"/>
      </svg>
    ),
    text: 'Fully Transparent',
    color: '#a78bfa',
    glow: 'rgba(167,139,250,0.25)',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="10"/>
        <line x1="2" y1="12" x2="22" y2="12"/>
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
      </svg>
    ),
    text: '150+ Countries',
    color: '#38bdf8',
    glow: 'rgba(56,189,248,0.25)',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
      </svg>
    ),
    text: '99.8% Accuracy',
    color: '#f59e0b',
    glow: 'rgba(245,158,11,0.25)',
  },
];

export default function CTASection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [hoverPrimary, setHoverPrimary] = useState(false);
  const [hoverSecondary, setHoverSecondary] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-16 sm:py-24 lg:py-32 relative overflow-hidden" style={{ background: 'linear-gradient(180deg, #050510 0%, #080808 100%)' }}>
      <style>{`
        @keyframes ctaPulse {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.15); }
        }
        @keyframes ctaFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
        @keyframes ctaShimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        @keyframes ctaIconSpin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>

      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(24,119,242,0.1) 0%, transparent 70%)' }} />
      <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(24,119,242,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(24,119,242,0.03) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />

      <div className="section-container relative z-10">
        <div
          className="max-w-[800px] mx-auto text-center"
          style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(32px)', transition: 'all 0.7s ease-out' }}
        >
          {/* Wave visualizer */}
          <div className="relative rounded-2xl overflow-hidden mb-8 sm:mb-12 mx-auto" style={{ height: '100px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', maxWidth: '600px' }}>
            <CTAWaveVisualizer />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex items-center gap-2 sm:gap-3">
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#1877F2', animation: 'ctaPulse 2s ease-in-out infinite' }} />
                <span style={{ color: '#1877F2', fontSize: '11px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Your music is being monitored right now</span>
              </div>
            </div>
          </div>

          {/* Headline */}
          <h2 className="font-black text-white mb-5 sm:mb-6" style={{ fontSize: 'clamp(28px, 5vw, 60px)', lineHeight: '1.05', letterSpacing: '-0.04em' }}>
            Your music deserves
            <br />
            <span style={{ background: 'linear-gradient(135deg, #1877F2, #a78bfa, #34d399)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>every dollar it earns.</span>
          </h2>

          <p className="text-base sm:text-lg mb-8 sm:mb-10 max-w-[520px] mx-auto" style={{ color: '#8892b0', lineHeight: '1.6' }}>
            Register your catalog with Karhari Media today and let Facebook Rights Manager handle everything — from fingerprinting to monthly royalty payouts.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-10 sm:mb-14">
            {/* Primary: Submit Application */}
            <button
              className="relative overflow-hidden flex items-center gap-3 px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl font-black text-white text-sm sm:text-base w-full sm:w-auto justify-center"
              onMouseEnter={() => setHoverPrimary(true)}
              onMouseLeave={() => setHoverPrimary(false)}
              style={{
                background: hoverPrimary
                  ? 'linear-gradient(135deg, #2d8cf0, #1877F2, #0d6efd)'
                  : 'linear-gradient(135deg, #1877F2, #0d6efd)',
                boxShadow: hoverPrimary
                  ? '0 0 40px rgba(24,119,242,0.7), 0 8px 32px rgba(24,119,242,0.5), 0 0 0 2px rgba(24,119,242,0.4)'
                  : '0 0 24px rgba(24,119,242,0.5), 0 4px 16px rgba(24,119,242,0.3)',
                border: '1px solid rgba(255,255,255,0.2)',
                transform: hoverPrimary ? 'scale(1.04) translateY(-2px)' : 'scale(1)',
                transition: 'all 0.3s cubic-bezier(0.34,1.56,0.64,1)',
                letterSpacing: '-0.01em',
              }}
            >
              {hoverPrimary && (
                <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)', animation: 'ctaShimmer 0.8s ease-in-out' }} />
              )}
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.15)' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                  <polyline points="17 8 12 3 7 8"/>
                  <line x1="12" y1="3" x2="12" y2="15"/>
                </svg>
              </div>
              Submit Application
            </button>

            {/* Secondary: Talk to Our Team */}
            <button
              className="relative overflow-hidden flex items-center gap-3 px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl font-black text-white text-sm sm:text-base w-full sm:w-auto justify-center"
              onMouseEnter={() => setHoverSecondary(true)}
              onMouseLeave={() => setHoverSecondary(false)}
              style={{
                background: hoverSecondary ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.05)',
                boxShadow: hoverSecondary
                  ? '0 0 30px rgba(167,139,250,0.4), 0 4px 20px rgba(167,139,250,0.2), 0 0 0 2px rgba(167,139,250,0.3)'
                  : '0 0 0 1px rgba(255,255,255,0.12)',
                border: `1px solid ${hoverSecondary ? 'rgba(167,139,250,0.6)' : 'rgba(255,255,255,0.15)'}`,
                transform: hoverSecondary ? 'scale(1.04) translateY(-2px)' : 'scale(1)',
                transition: 'all 0.3s cubic-bezier(0.34,1.56,0.64,1)',
                letterSpacing: '-0.01em',
              }}
            >
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center" style={{ background: hoverSecondary ? 'rgba(167,139,250,0.2)' : 'rgba(255,255,255,0.08)', transition: 'background 0.3s ease' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={hoverSecondary ? '#a78bfa' : 'currentColor'} strokeWidth="2" style={{ transition: 'stroke 0.3s ease' }}>
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                </svg>
              </div>
              <span style={{ color: hoverSecondary ? '#a78bfa' : '#fff', transition: 'color 0.3s ease' }}>Talk to Our Team</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={hoverSecondary ? '#a78bfa' : 'currentColor'} strokeWidth="2" style={{ transition: 'stroke 0.3s ease, transform 0.3s ease', transform: hoverSecondary ? 'translateX(3px)' : 'translateX(0)' }}>
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </button>
          </div>

          {/* Trust indicators — responsive wrap */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4">
            {trustItems.map((item, i) => (
              <div
                key={item.text}
                className="flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl"
                style={{
                  background: `${item.glow}`,
                  border: `1px solid ${item.color}30`,
                  animation: `ctaFloat ${3 + i * 0.4}s ease-in-out infinite ${i * 0.3}s`,
                  boxShadow: `0 4px 16px ${item.glow}`,
                }}
              >
                <div
                  className="flex items-center justify-center"
                  style={{ color: item.color, filter: `drop-shadow(0 0 6px ${item.color})` }}
                >
                  {item.icon}
                </div>
                <span style={{ color: '#ccd6f6', fontSize: '12px', fontWeight: 600, letterSpacing: '-0.01em' }}>{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
