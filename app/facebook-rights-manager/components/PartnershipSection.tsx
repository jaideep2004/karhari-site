'use client';
import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

const FacebookIcon = ({ size = 20, className = '' }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

function VideoVisualizerCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);

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

    const bars = 80;
    const particles: { x: number; y: number; vx: number; vy: number; life: number; color: string }[] = [];
    const colors = ['#1877F2', '#e85d26', '#ff8c42', '#4da6ff', '#25D366', '#E1306C'];
    let t = 0;

    const addParticle = () => {
      if (particles.length < 60) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.8,
          vy: (Math.random() - 0.5) * 0.8,
          life: Math.random(),
          color: colors[Math.floor(Math.random() * colors.length)],
        });
      }
    };

    const draw = () => {
      t += 0.02;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Dark gradient base
      const grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      grad.addColorStop(0, 'rgba(10,10,20,0.97)');
      grad.addColorStop(0.5, 'rgba(12,16,32,0.97)');
      grad.addColorStop(1, 'rgba(10,10,20,0.97)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Waveform bars
      const barW = canvas.width / bars;
      for (let i = 0; i < bars; i++) {
        const h = (Math.sin(i * 0.2 + t) * 0.5 + 0.5) * canvas.height * 0.35 + 8;
        const h2 = (Math.sin(i * 0.15 + t * 1.3 + 1) * 0.5 + 0.5) * canvas.height * 0.2 + 4;
        const x = i * barW;
        const cy = canvas.height / 2;
        const colorIdx = Math.floor((i / bars) * colors.length);
        const color = colors[colorIdx % colors.length];

        const gTop = ctx.createLinearGradient(0, cy - h, 0, cy);
        gTop.addColorStop(0, color + '00');
        gTop.addColorStop(1, color + 'cc');
        ctx.fillStyle = gTop;
        ctx.fillRect(x + 1, cy - h, barW - 2, h);

        const gBot = ctx.createLinearGradient(0, cy, 0, cy + h2);
        gBot.addColorStop(0, color + '88');
        gBot.addColorStop(1, color + '00');
        ctx.fillStyle = gBot;
        ctx.fillRect(x + 1, cy, barW - 2, h2);
      }

      // Center line
      ctx.strokeStyle = 'rgba(255,255,255,0.06)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, canvas.height / 2);
      ctx.lineTo(canvas.width, canvas.height / 2);
      ctx.stroke();

      // Particles
      addParticle();
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 0.003;
        if (p.life <= 0) { particles.splice(i, 1); continue; }
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = p.color + Math.floor(p.life * 255).toString(16).padStart(2, '0');
        ctx.fill();
      }

      // Horizontal scan line
      const scanY = ((Math.sin(t * 0.5) * 0.5 + 0.5)) * canvas.height;
      const scanGrad = ctx.createLinearGradient(0, scanY - 2, 0, scanY + 2);
      scanGrad.addColorStop(0, 'transparent');
      scanGrad.addColorStop(0.5, 'rgba(24,119,242,0.4)');
      scanGrad.addColorStop(1, 'transparent');
      ctx.fillStyle = scanGrad;
      ctx.fillRect(0, scanY - 2, canvas.width, 4);

      animRef.current = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ opacity: 0.65 }}
    />
  );
}

function useLiveCounter(base: number, variance: number, interval = 1200) {
  const [value, setValue] = useState(base);
  useEffect(() => {
    const id = setInterval(() => {
      setValue(base + Math.floor((Math.random() - 0.5) * variance * 2));
    }, interval);
    return () => clearInterval(id);
  }, [base, variance, interval]);
  return value;
}

function AnimatedStat({ label, base, suffix, variance, color, icon }: {
  label: string; base: number; suffix: string; variance: number; color: string; icon: React.ReactNode;
}) {
  const value = useLiveCounter(base, variance);
  const [prev, setPrev] = useState(value);
  const [flash, setFlash] = useState(false);

  useEffect(() => {
    if (value !== prev) {
      setFlash(true);
      setPrev(value);
      setTimeout(() => setFlash(false), 400);
    }
  }, [value, prev]);

  const display = value >= 1000000 ? (value / 1000000).toFixed(2) + 'M' : value.toLocaleString();

  return (
    <div
      className="flex flex-col items-center p-5 rounded-2xl relative overflow-hidden"
      style={{
        background: `linear-gradient(135deg, ${color}12, ${color}06)`,
        border: `1px solid ${color}30`,
        boxShadow: flash ? `0 0 20px ${color}40` : `0 0 0px transparent`,
        transition: 'box-shadow 0.3s ease',
      }}
    >
      {/* Scanner line */}
      <div
        className="absolute inset-x-0 h-px pointer-events-none"
        style={{
          background: `linear-gradient(90deg, transparent, ${color}80, transparent)`,
          animation: 'statScanLine 2.5s linear infinite',
        }}
      />
      <div className="mb-2" style={{ color }}>{icon}</div>
      <div
        className="font-black text-white text-2xl mb-1"
        style={{
          letterSpacing: '-0.03em',
          color: flash ? color : '#ffffff',
          transition: 'color 0.3s ease',
          textShadow: flash ? `0 0 12px ${color}` : 'none',
        }}
      >
        {display}{suffix}
      </div>
      <div className="text-xs font-semibold uppercase tracking-wider text-center" style={{ color: color + 'cc' }}>{label}</div>
    </div>
  );
}

export default function PartnershipSection() {
  const headerRef = useRef<HTMLDivElement>(null);
  const [headerVisible, setHeaderVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setHeaderVisible(true); },
      { threshold: 0.1 }
    );
    if (headerRef.current) observer.observe(headerRef.current);
    return () => observer.disconnect();
  }, []);

  const users3B = useLiveCounter(3000000000, 50000, 1500);
  const tracks = useLiveCounter(2400000, 5000, 1200);
  const accuracy = useLiveCounter(9980, 10, 3000);

  return (
    <section id="partnership" className="py-16 sm:py-24 lg:py-32 relative overflow-hidden">
      {/* Video Visualizer Background */}
      <VideoVisualizerCanvas />

      {/* Color overlay gradients */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(24,119,242,0.08) 0%, transparent 70%)' }} />
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 60% 40% at 20% 80%, rgba(232,93,38,0.06) 0%, transparent 60%)' }} />

      <style>{`
        @keyframes statScanLine {
          0% { top: 0%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
        @keyframes partnerPulse {
          0%, 100% { box-shadow: 0 0 20px rgba(24,119,242,0.3), 0 0 40px rgba(24,119,242,0.1); }
          50% { box-shadow: 0 0 40px rgba(24,119,242,0.6), 0 0 80px rgba(24,119,242,0.2); }
        }
        @keyframes karharPulse {
          0%, 100% { box-shadow: 0 0 20px rgba(232,93,38,0.3), 0 0 40px rgba(232,93,38,0.1); }
          50% { box-shadow: 0 0 40px rgba(232,93,38,0.6), 0 0 80px rgba(232,93,38,0.2); }
        }
        @keyframes xSpin {
          0% { transform: rotate(0deg) scale(1); }
          50% { transform: rotate(180deg) scale(1.2); }
          100% { transform: rotate(360deg) scale(1); }
        }
        @keyframes floatUp {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        @keyframes borderGlow {
          0%, 100% { border-color: rgba(24,119,242,0.3); }
          50% { border-color: rgba(24,119,242,0.7); }
        }
        @keyframes colorShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>

      <div className="section-container relative z-10">
        {/* Header */}
        <div
          ref={headerRef}
          className="text-center mb-10 sm:mb-16"
          style={{
            opacity: headerVisible ? 1 : 0,
            transform: headerVisible ? 'translateY(0)' : 'translateY(24px)',
            transition: 'all 0.7s ease-out',
          }}
        >
          <div className="section-label mb-4 sm:mb-5">The Partnership</div>
          <h2
            className="font-black text-white mb-4 sm:mb-5"
            style={{ fontSize: 'clamp(28px, 5vw, 56px)', lineHeight: '1.1', letterSpacing: '-0.03em' }}
          >
            Content.
            <br />
            <span className="gradient-text">Karhari Media × Facebook Rights Manager</span>
          </h2>
          <p className="text-base sm:text-lg max-w-[600px] mx-auto" style={{ color: '#888888', lineHeight: '1.6' }}>
            As an official Facebook Rights Manager partner, Karhari Media manages and monetizes music catalogs for artists and record labels across all Meta platforms.
          </p>
        </div>

        {/* MAIN PARTNERSHIP BOX */}
        <div
          className="relative rounded-3xl overflow-hidden mb-8 sm:mb-12"
          style={{
            background: 'linear-gradient(135deg, rgba(13,13,13,0.92) 0%, rgba(15,20,40,0.92) 50%, rgba(13,13,13,0.92) 100%)',
            border: '1px solid rgba(24,119,242,0.3)',
            animation: 'borderGlow 3s ease-in-out infinite',
            backdropFilter: 'blur(20px)',
            opacity: headerVisible ? 1 : 0,
            transform: headerVisible ? 'translateY(0) scale(1)' : 'translateY(32px) scale(0.97)',
            transition: 'opacity 0.8s ease-out 0.2s, transform 0.8s ease-out 0.2s',
          }}
        >
          <div className="absolute top-0 inset-x-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(24,119,242,0.8), rgba(232,93,38,0.8), transparent)' }} />
          <div className="absolute bottom-0 inset-x-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(232,93,38,0.5), rgba(24,119,242,0.5), transparent)' }} />

          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(270deg, rgba(24,119,242,0.05), rgba(232,93,38,0.05), rgba(37,211,102,0.03), rgba(24,119,242,0.05))',
                backgroundSize: '400% 400%',
                animation: 'colorShift 8s ease infinite',
              }}
            />
          </div>

          <div className="relative z-10 p-5 sm:p-8 md:p-12">
            {/* Logos row — responsive sizing */}
            <div className="flex items-center justify-center gap-4 sm:gap-6 md:gap-12 mb-6 sm:mb-10">
              {/* Karhari Media */}
              <div className="flex flex-col items-center gap-2 sm:gap-3" style={{ animation: 'floatUp 3s ease-in-out infinite' }}>
                <div
                  className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-2xl overflow-hidden flex items-center justify-center"
                  style={{
                    background: 'rgba(232,93,38,0.15)',
                    border: '2px solid rgba(232,93,38,0.5)',
                    animation: 'karharPulse 2.5s ease-in-out infinite',
                  }}
                >
                  <Image src="/assets/images/1608452013412__1_-1786628988863.png" alt="Karhari Media Logo" width={80} height={80} className="object-contain" />
                </div>
                <span className="text-white font-bold text-xs sm:text-sm tracking-wide">Karhari Media</span>
                <span className="text-xs px-2 sm:px-3 py-1 rounded-full font-semibold" style={{ background: 'rgba(232,93,38,0.15)', color: '#e85d26', border: '1px solid rgba(232,93,38,0.3)' }}>Music Distributor</span>
              </div>

              {/* X connector */}
              <div className="flex flex-col items-center gap-2">
                <div
                  className="w-9 h-9 sm:w-12 sm:h-12 rounded-full flex items-center justify-center font-black text-xl sm:text-2xl"
                  style={{
                    background: 'linear-gradient(135deg, rgba(232,93,38,0.2), rgba(24,119,242,0.2))',
                    border: '1px solid rgba(255,255,255,0.1)',
                    color: '#ffffff',
                    animation: 'xSpin 6s linear infinite',
                  }}
                >
                  ×
                </div>
                <span className="text-xs uppercase tracking-widest font-semibold hidden sm:block" style={{ color: '#555' }}>Official Partner</span>
              </div>

              {/* Facebook */}
              <div className="flex flex-col items-center gap-2 sm:gap-3" style={{ animation: 'floatUp 3s ease-in-out infinite 1.5s' }}>
                <div
                  className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-2xl flex items-center justify-center"
                  style={{
                    background: '#1877F2',
                    animation: 'partnerPulse 2.5s ease-in-out infinite',
                  }}
                >
                  <FacebookIcon size={36} className="text-white" />
                </div>
                <span className="text-white font-bold text-xs sm:text-sm tracking-wide">Facebook</span>
                <span className="text-xs px-2 sm:px-3 py-1 rounded-full font-semibold" style={{ background: 'rgba(24,119,242,0.15)', color: '#1877F2', border: '1px solid rgba(24,119,242,0.3)' }}>Rights Manager</span>
              </div>
            </div>

            {/* 3B+ users live counter */}
            <div className="text-center mb-6 sm:mb-10">
              <div
                className="inline-flex flex-col items-center px-5 sm:px-8 py-3 sm:py-4 rounded-2xl"
                style={{
                  background: 'linear-gradient(135deg, rgba(24,119,242,0.1), rgba(232,93,38,0.1))',
                  border: '1px solid rgba(255,255,255,0.1)',
                }}
              >
                <div
                  className="font-black mb-1"
                  style={{
                    fontSize: 'clamp(28px, 5vw, 48px)',
                    background: 'linear-gradient(135deg, #1877F2, #e85d26)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    letterSpacing: '-0.04em',
                  }}
                >
                  {(users3B / 1000000000).toFixed(2)}B+
                </div>
                <div className="text-xs sm:text-sm font-semibold" style={{ color: '#888' }}>Combined Meta Platform Users</div>
              </div>
            </div>

            {/* 4 feature stats — responsive */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
              <AnimatedStat
                label="Music Distribution"
                base={2400000}
                suffix="+"
                variance={8000}
                color="#1877F2"
                icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2z"/></svg>}
              />
              <AnimatedStat
                label="Rights Protection"
                base={8700000}
                suffix="+"
                variance={15000}
                color="#4da6ff"
                icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/><circle cx="12" cy="12" r="3" fill="currentColor"/></svg>}
              />
              <AnimatedStat
                label="Revenue Collection"
                base={1250000}
                suffix="+"
                variance={5000}
                color="#25D366"
                icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>}
              />
              <AnimatedStat
                label="Monthly Payout"
                base={980000}
                suffix="+"
                variance={4000}
                color="#e85d26"
                icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg>}
              />
            </div>
          </div>
        </div>

        {/* Stats row — responsive */}
        <div
          className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4"
          style={{
            opacity: headerVisible ? 1 : 0,
            transform: headerVisible ? 'translateY(0)' : 'translateY(24px)',
            transition: 'all 0.6s ease-out 0.5s',
          }}
        >
          {[
            { value: (users3B / 1000000000).toFixed(2) + 'B+', label: 'Users Reached', color: '#1877F2' },
            { value: (tracks / 1000000).toFixed(2) + 'M+', label: 'Tracks Protected', color: '#4da6ff' },
            { value: '150+', label: 'Countries', color: '#25D366' },
            { value: (accuracy / 1000).toFixed(1) + '%', label: 'Match Accuracy', color: '#e85d26' },
          ].map(stat => (
            <div
              key={stat.label}
              className="glass-card p-4 sm:p-6 text-center relative overflow-hidden"
              style={{ border: `1px solid ${stat.color}20` }}
            >
              <div
                className="absolute inset-x-0 bottom-0 h-0.5"
                style={{ background: `linear-gradient(90deg, transparent, ${stat.color}, transparent)` }}
              />
              <div
                className="font-black text-white mb-1"
                style={{
                  fontSize: 'clamp(18px, 3vw, 28px)',
                  letterSpacing: '-0.04em',
                  color: stat.color,
                  textShadow: `0 0 20px ${stat.color}60`,
                }}
              >
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm" style={{ color: '#666' }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
