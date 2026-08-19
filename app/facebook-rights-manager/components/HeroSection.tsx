'use client';
import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

const FacebookIcon = ({ size = 24, className = '' }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const InstagramIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);

const WhatsAppIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

const AudioWaveVisualizer = () => {
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
      timeRef.current += 0.018;
      const t = timeRef.current;

      ctx.strokeStyle = 'rgba(255,255,255,0.03)';
      ctx.lineWidth = 1;
      for (let x = 0; x < w; x += 40) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke();
      }
      for (let y = 0; y < h; y += 40) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke();
      }

      const waves = [
        { amp: h * 0.28, freq: 0.008, phase: 0, alpha: 0.7, width: 2.5, color: '#e85d26' },
        { amp: h * 0.18, freq: 0.014, phase: 2.1, alpha: 0.4, width: 1.5, color: '#1877F2' },
        { amp: h * 0.10, freq: 0.022, phase: 4.2, alpha: 0.25, width: 1, color: '#ff8c42' },
        { amp: h * 0.06, freq: 0.032, phase: 1.0, alpha: 0.15, width: 1, color: '#4da6ff' },
      ];

      waves.forEach(wave => {
        ctx.beginPath();
        const isOrange = wave.color.startsWith('#e8') || wave.color.startsWith('#ff');
        const grad = ctx.createLinearGradient(0, 0, w, 0);
        grad.addColorStop(0, `rgba(232,93,38,0)`);
        grad.addColorStop(0.15, isOrange ? `rgba(232,93,38,${wave.alpha})` : `rgba(24,119,242,${wave.alpha})`);
        grad.addColorStop(0.5, isOrange ? `rgba(255,140,66,${wave.alpha})` : `rgba(77,166,255,${wave.alpha})`);
        grad.addColorStop(0.85, isOrange ? `rgba(232,93,38,${wave.alpha})` : `rgba(24,119,242,${wave.alpha})`);
        grad.addColorStop(1, `rgba(232,93,38,0)`);
        ctx.strokeStyle = grad;
        ctx.lineWidth = wave.width;
        ctx.shadowBlur = wave.width > 2 ? 14 : 0;
        ctx.shadowColor = isOrange ? 'rgba(232,93,38,0.6)' : 'rgba(24,119,242,0.5)';
        for (let x = 0; x <= w; x += 2) {
          let y = h / 2 + wave.amp * Math.sin(x * wave.freq + t + wave.phase) * Math.sin(t * 0.3 + wave.phase * 0.5);
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
        ctx.shadowBlur = 0;
      });

      const barCount = Math.min(64, Math.floor(w / 8));
      const barW = w / barCount;
      for (let i = 0; i < barCount; i++) {
        const barHeight = (Math.sin(i * 0.3 + t * 2) * 0.5 + 0.5) * h * 0.25 * (Math.sin(i * 0.1 + t) * 0.3 + 0.7);
        const alpha = 0.3 + Math.sin(i * 0.2 + t) * 0.2;
        const useOrange = i % 3 !== 0;
        const grad = ctx.createLinearGradient(0, h, 0, h - barHeight);
        grad.addColorStop(0, useOrange ? `rgba(232,93,38,${alpha})` : `rgba(24,119,242,${alpha})`);
        grad.addColorStop(1, useOrange ? `rgba(255,140,66,${alpha * 0.5})` : `rgba(77,166,255,${alpha * 0.5})`);
        ctx.fillStyle = grad;
        ctx.fillRect(i * barW + 1, h - barHeight, barW - 2, barHeight);
      }

      const scanX = ((t * 60) % w);
      const scanGrad = ctx.createLinearGradient(scanX - 40, 0, scanX + 10, 0);
      scanGrad.addColorStop(0, 'rgba(232,93,38,0)');
      scanGrad.addColorStop(1, 'rgba(232,93,38,0.5)');
      ctx.fillStyle = scanGrad;
      ctx.fillRect(scanX - 40, 0, 50, h);
      ctx.strokeStyle = 'rgba(232,93,38,0.8)';
      ctx.lineWidth = 1.5;
      ctx.shadowBlur = 8;
      ctx.shadowColor = 'rgba(232,93,38,1)';
      ctx.beginPath(); ctx.moveTo(scanX, 0); ctx.lineTo(scanX, h); ctx.stroke();
      ctx.shadowBlur = 0;

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

const ParticleBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const setSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setSize();
    window.addEventListener('resize', setSize);

    const particles: { x: number; y: number; vx: number; vy: number; r: number; alpha: number; color: string }[] = [];
    const colors = ['rgba(232,93,38,', 'rgba(255,140,66,', 'rgba(24,119,242,', 'rgba(77,166,255,'];
    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        r: Math.random() * 2 + 0.5,
        alpha: Math.random() * 0.4 + 0.1,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${p.alpha})`;
        ctx.fill();
      });
      animRef.current = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', setSize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }} />;
};

// Continuously incrementing counter hook
function useIncrementingNumber(base: number, increment: number, interval: number) {
  const [value, setValue] = useState(base);
  useEffect(() => {
    const timer = setInterval(() => {
      setValue(v => v + increment);
    }, interval);
    return () => clearInterval(timer);
  }, [increment, interval]);
  return value;
}

// Navbar dropdown
const NavDropdown = () => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const links = [
    { label: 'Partnership', href: '#partnership' },
    { label: 'Pipeline', href: '#pipeline' },
    { label: 'Platforms', href: '#platforms' },
    { label: 'Fingerprint', href: '#fingerprint' },
    { label: 'Royalties', href: '#royalties' },
    { label: 'Why Free', href: '#whyfree' },
    { label: 'FAQ', href: '#faq' },
    { label: 'Get Started', href: '#contact' },
  ];

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(o => !o)}
        className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-semibold px-3 sm:px-5 py-2 sm:py-2.5 rounded-10 transition-all duration-200"
        style={{
          background: open ? 'linear-gradient(135deg, #1877F2, #4da6ff)' : 'linear-gradient(135deg, #1877F2, #1877F2cc)',
          color: '#fff',
          boxShadow: open ? '0 4px 24px rgba(24,119,242,0.6)' : '0 4px 20px rgba(24,119,242,0.35)',
          border: '1px solid rgba(24,119,242,0.5)',
        }}
      >
        <FacebookIcon size={14} className="text-white" />
        <span className="hidden sm:inline">Facebook Rights Manager</span>
        <span className="sm:hidden">Menu</span>
        <svg
          width="14" height="14" viewBox="0 0 24 24" fill="none"
          style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s ease' }}
        >
          <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      {open && (
        <div
          className="absolute right-0 top-full mt-2 w-52 rounded-16 overflow-hidden z-50"
          style={{
            background: 'rgba(13,13,13,0.97)',
            border: '1px solid rgba(24,119,242,0.3)',
            boxShadow: '0 16px 48px rgba(0,0,0,0.6), 0 0 0 1px rgba(24,119,242,0.1)',
            backdropFilter: 'blur(20px)',
          }}
        >
          {links.map((link, i) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-4 py-3 text-sm font-medium transition-all duration-150"
              style={{ color: '#aaa', borderBottom: i < links.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none' }}
              onMouseEnter={e => {
                e.currentTarget.style.color = '#fff';
                e.currentTarget.style.background = 'rgba(24,119,242,0.12)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.color = '#aaa';
                e.currentTarget.style.background = 'transparent';
              }}
            >
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#1877F2', flexShrink: 0 }} />
              {link.label}
            </a>
          ))}
        </div>
      )}
    </div>
  );
};

// Platform box component with active animation
const PlatformBox = ({ name, icon, color, bg, delay }: { name: string; icon: React.ReactNode; color: string; bg: string; delay: number }) => {
  const [pulse, setPulse] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setPulse(true), delay);
    return () => clearTimeout(t);
  }, [delay]);

  return (
    <div
      className="flex flex-col items-center gap-1.5 sm:gap-2 p-2 sm:p-3 rounded-12 transition-all duration-500"
      style={{
        background: pulse ? `${bg}` : 'rgba(255,255,255,0.02)',
        border: `1px solid ${pulse ? color + '60' : 'rgba(255,255,255,0.08)'}`,
        boxShadow: pulse ? `0 0 20px ${color}30, 0 4px 16px rgba(0,0,0,0.3)` : 'none',
        transform: pulse ? 'scale(1.02)' : 'scale(1)',
      }}
    >
      <div
        className="w-8 h-8 sm:w-10 sm:h-10 rounded-10 flex items-center justify-center"
        style={{
          background: color,
          boxShadow: pulse ? `0 0 16px ${color}80` : 'none',
        }}
      >
        {icon}
      </div>
      <span className="text-xs font-semibold text-white">{name}</span>
      <div className="flex items-center gap-1">
        <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#25D366', animation: 'pulse 1.5s ease-in-out infinite' }} />
        <span className="text-xs" style={{ color: '#25D366', fontSize: '10px' }}>Active</span>
      </div>
    </div>
  );
};

export default function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);

  // Continuously incrementing stats
  const users = useIncrementingNumber(3000000000, 12500, 800);
  const tracks = useIncrementingNumber(2400000000, 8300, 600);
  const accuracy = useIncrementingNumber(9800, 1, 5000);

  // Service numbers always increasing in millions
  const distTracks = useIncrementingNumber(2847000, 1200, 400);
  const fpTracks = useIncrementingNumber(1923000, 900, 350);
  const revAmount = useIncrementingNumber(12400000, 5000, 300);
  const payoutAmount = useIncrementingNumber(9800000, 3800, 350);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const formatBig = (n: number) => {
    if (n >= 1000000000) return (n / 1000000000).toFixed(1) + 'B+';
    if (n >= 1000000) return (n / 1000000).toFixed(2) + 'M+';
    return n.toLocaleString();
  };

  const formatMillions = (n: number) => (n / 1000000).toFixed(2) + 'M';

  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden" style={{ background: 'linear-gradient(160deg, #0d0d0d 0%, #1a0a04 40%, #0d0d0d 100%)' }}>
      <ParticleBackground />

      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 1 }}>
        <div className="glow-orb w-[300px] sm:w-[500px] lg:w-[700px] h-[300px] sm:h-[500px] lg:h-[700px]" style={{ background: 'rgba(232,93,38,0.10)', top: '-100px', right: '-100px' }} />
        <div className="glow-orb w-[200px] sm:w-[350px] lg:w-[500px] h-[200px] sm:h-[350px] lg:h-[500px]" style={{ background: 'rgba(24,119,242,0.08)', bottom: '-80px', left: '-80px' }} />
        <div className="glow-orb w-[200px] sm:w-[300px] lg:w-[400px] h-[200px] sm:h-[300px] lg:h-[400px]" style={{ background: 'rgba(255,140,66,0.06)', top: '40%', left: '30%' }} />
      </div>

      <div className="absolute inset-0 grid-pattern pointer-events-none" style={{ zIndex: 1 }} />
      {/* ── Page section nav — kept below the fixed global navbar ── */}
      <div className="fixed top-[88px] right-4 md:right-6 z-40">
        <NavDropdown />
      </div>

      {/* Hero Content */}
      <div className="relative flex-1 flex items-center" style={{ zIndex: 5 }}>
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-20 py-24 md:py-28">

          {/* Partnership badge */}
          <div className={`inline-flex items-center gap-2 sm:gap-3 mb-6 sm:mb-8 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <div className="flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 sm:py-2.5 rounded-full flex-wrap" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)' }}>
              <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full overflow-hidden flex items-center justify-center" style={{ background: 'rgba(232,93,38,0.2)', border: '1px solid rgba(232,93,38,0.4)' }}>
                <Image src="/assets/images/1608452013412__1_-1786628988863.png" alt="Karhari Media" width={22} height={22} className="object-contain" />
              </div>
              <span className="text-white text-xs font-semibold">Karhari Media</span>
              <span style={{ color: '#555' }} className="text-xs font-bold">×</span>
              <div
                className="w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center"
                style={{
                  background: '#1877F2',
                  boxShadow: '0 0 12px rgba(24,119,242,0.8), 0 0 24px rgba(24,119,242,0.4)',
                  animation: 'fbGlow 2s ease-in-out infinite',
                }}
              >
                <FacebookIcon size={12} className="text-white" />
              </div>
              <span
                className="text-xs font-bold"
                style={{
                  color: '#4da6ff',
                  textShadow: '0 0 8px rgba(24,119,242,0.8)',
                  animation: 'fbTextGlow 2s ease-in-out infinite',
                }}
              >
                Facebook
              </span>
              <span
                className="text-xs font-bold px-2 py-0.5 rounded-full"
                style={{
                  background: 'rgba(24,119,242,0.25)',
                  color: '#4da6ff',
                  border: '1px solid rgba(24,119,242,0.5)',
                  boxShadow: '0 0 10px rgba(24,119,242,0.4)',
                  animation: 'officialPartnerPulse 2.5s ease-in-out infinite',
                }}
              >
                ✓ Official Partner
              </span>
            </div>
          </div>

          {/* Two-column layout — stacks on mobile */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start mb-8 sm:mb-12">
            {/* Left: Text only */}
            <div>
              <p className={`text-sm mb-4 sm:mb-5 transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ color: '#666666' }}>
                <span className="font-semibold text-white">{formatBig(users)}</span> people reached across{' '}
                <span className="font-semibold text-white">Facebook, Instagram & WhatsApp</span>
              </p>

              <h1
                className={`font-black text-white mb-5 sm:mb-6 transition-all duration-700 delay-150 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                style={{ fontSize: 'clamp(26px, 6vw, 64px)', lineHeight: '1.05', letterSpacing: '-0.04em' }}
              >
                Your music deserves
                <br />
                to be heard.
                <br />
                <span style={{ background: 'linear-gradient(135deg, #e85d26 0%, #ff8c42 40%, #1877F2 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                  Get paid for every play.
                </span>
              </h1>

              <p className={`text-base sm:text-lg mb-6 sm:mb-8 max-w-xl transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ color: '#888888', lineHeight: '1.6' }}>
                Karhari Media is an official Facebook Rights Manager partner. We distribute and protect your music catalog across Facebook, Instagram, and WhatsApp — and collect every dollar you earn.
              </p>

              {/* Feature highlights */}
              <div className={`space-y-2.5 sm:space-y-3 transition-all duration-700 delay-250 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                {[
                  { icon: '🎵', text: 'Submit music once — distributed everywhere on Meta' },
                  { icon: '🔒', text: 'Facebook Rights Manager fingerprinting & protection' },
                  { icon: '💰', text: 'Automatic revenue collection & monthly artist payouts' },
                  { icon: '📊', text: '99.8% match accuracy across 3B+ users' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 sm:gap-3">
                    <span className="text-sm sm:text-base">{item.icon}</span>
                    <span className="text-xs sm:text-sm" style={{ color: '#888' }}>{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Platform boxes, partnership card, stat boxes */}
            <div className={`flex flex-col gap-3 sm:gap-4 transition-all duration-700 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>

              {/* Platform boxes */}
              <div className="w-full">
                <div className="grid grid-cols-3 gap-2 mb-2 sm:mb-3">
                  <PlatformBox
                    name="Facebook"
                    icon={<FacebookIcon size={16} className="text-white" />}
                    color="#1877F2"
                    bg="rgba(24,119,242,0.15)"
                    delay={200}
                  />
                  <PlatformBox
                    name="Instagram"
                    icon={<InstagramIcon size={16} />}
                    color="#E1306C"
                    bg="rgba(225,48,108,0.15)"
                    delay={400}
                  />
                  <PlatformBox
                    name="WhatsApp"
                    icon={<WhatsAppIcon size={16} />}
                    color="#25D366"
                    bg="rgba(37,211,102,0.15)"
                    delay={600}
                  />
                </div>

                {/* Stats row */}
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { value: formatBig(users), label: 'Users', color: '#e85d26' },
                    { value: formatBig(tracks), label: 'Track', color: '#1877F2' },
                    { value: (accuracy / 100).toFixed(1) + '%', label: 'Matching', color: '#ff8c42' },
                  ].map(s => (
                    <div key={s.label} className="p-2 sm:p-2.5 rounded-10 text-center" style={{ background: 'rgba(255,255,255,0.03)', border: `1px solid ${s.color}25` }}>
                      <div className="font-black tabular-nums text-xs sm:text-sm" style={{ letterSpacing: '-0.03em', color: s.color }}>{s.value}</div>
                      <div className="text-xs mt-0.5" style={{ color: '#555' }}>{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Partnership card */}
              <div className="relative w-full p-4 sm:p-6 rounded-24" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', backdropFilter: 'blur(20px)' }}>
                <div className="absolute inset-0 rounded-24 pointer-events-none" style={{ background: 'linear-gradient(135deg, rgba(232,93,38,0.08), rgba(24,119,242,0.08))', animation: 'pulseGlow 3s ease-in-out infinite' }} />

                <div className="flex items-center justify-center gap-4 sm:gap-6 mb-3 sm:mb-4">
                  {/* Karhari Media */}
                  <div className="flex flex-col items-center gap-1.5 sm:gap-2">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-20 overflow-hidden flex items-center justify-center" style={{ background: 'rgba(232,93,38,0.15)', border: '2px solid rgba(232,93,38,0.4)', boxShadow: '0 8px 32px rgba(232,93,38,0.3)' }}>
                      <Image src="/assets/images/1608452013412__1_-1786628988863.png" alt="Karhari Media Logo" width={60} height={60} className="object-contain" />
                    </div>
                    <span className="text-white font-bold text-xs text-center">Karhari Media</span>
                    <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: 'rgba(232,93,38,0.15)', color: '#ff8c42', border: '1px solid rgba(232,93,38,0.3)' }}>Distributor</span>
                  </div>

                  <div className="flex flex-col items-center gap-1">
                    <div className="text-xl sm:text-2xl font-black" style={{ color: '#333' }}>×</div>
                    <div className="w-px h-6 sm:h-8 relative overflow-hidden" style={{ background: 'rgba(255,255,255,0.1)' }}>
                      <div className="absolute w-full" style={{ height: '30%', background: 'linear-gradient(180deg, transparent, #1877F2, transparent)', animation: 'scan 2s linear infinite' }} />
                    </div>
                    <span className="text-xs font-bold uppercase tracking-widest" style={{ color: '#555' }}>Partner</span>
                  </div>

                  {/* Facebook */}
                  <div className="flex flex-col items-center gap-1.5 sm:gap-2">
                    <div
                      className="w-12 h-12 sm:w-16 sm:h-16 rounded-20 flex items-center justify-center"
                      style={{
                        background: '#1877F2',
                        border: '2px solid rgba(24,119,242,0.8)',
                        boxShadow: '0 8px 32px rgba(24,119,242,0.6), 0 0 40px rgba(24,119,242,0.3)',
                        animation: 'fbCardGlow 2s ease-in-out infinite',
                      }}
                    >
                      <FacebookIcon size={28} className="text-white" />
                    </div>
                    <span
                      className="text-white font-bold text-xs text-center"
                      style={{ textShadow: '0 0 8px rgba(24,119,242,0.6)', animation: 'fbTextGlow 2s ease-in-out infinite' }}
                    >
                      Facebook
                    </span>
                    <span
                      className="text-xs px-2 py-0.5 rounded-full"
                      style={{
                        background: 'rgba(24,119,242,0.25)',
                        color: '#4da6ff',
                        border: '1px solid rgba(24,119,242,0.6)',
                        boxShadow: '0 0 10px rgba(24,119,242,0.4)',
                        animation: 'officialPartnerPulse 2.5s ease-in-out infinite',
                      }}
                    >
                      ✓ Official Partner
                    </span>
                  </div>
                </div>

                {/* Partnership note */}
                <div className="p-2 sm:p-2.5 rounded-12 text-center" style={{ background: 'rgba(24,119,242,0.08)', border: '1px solid rgba(24,119,242,0.25)' }}>
                  <p className="text-xs font-semibold" style={{ color: '#4da6ff' }}>
                    🤝 Karhari Media × Facebook — Official Rights Manager Partnership
                  </p>
                </div>
              </div>

              {/* ALL 4 stat boxes — 2x2 grid */}
              <div className="grid grid-cols-2 gap-2 sm:gap-3">
                {[
                  {
                    label: 'Music Distribution',
                    icon: (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#e85d26" strokeWidth="1.8">
                        <path d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2z"/>
                      </svg>
                    ),
                    color: '#e85d26',
                    number: formatMillions(distTracks),
                    unit: 'Tracks',
                  },
                  {
                    label: 'Rights Protection',
                    icon: (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1877F2" strokeWidth="1.8">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                      </svg>
                    ),
                    color: '#1877F2',
                    number: formatMillions(fpTracks),
                    unit: 'Fingerprints',
                  },
                  {
                    label: 'Revenue Collection',
                    icon: (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ff8c42" strokeWidth="1.8">
                        <line x1="12" y1="1" x2="12" y2="23"/>
                        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                      </svg>
                    ),
                    color: '#ff8c42',
                    number: '$' + formatMillions(revAmount),
                    unit: 'Revenue',
                  },
                  {
                    label: 'Monthly Payout',
                    icon: (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4da6ff" strokeWidth="1.8">
                        <rect x="2" y="5" width="20" height="14" rx="2"/>
                        <line x1="2" y1="10" x2="22" y2="10"/>
                      </svg>
                    ),
                    color: '#4da6ff',
                    number: '$' + formatMillions(payoutAmount),
                    unit: 'Paid Out',
                  },
                ].map(box => (
                  <div
                    key={box.label}
                    className="p-2.5 sm:p-3 rounded-12 transition-all duration-300"
                    style={{
                      background: 'rgba(255,255,255,0.03)',
                      border: `1px solid ${box.color}30`,
                      boxShadow: `0 0 12px ${box.color}10`,
                    }}
                  >
                    <div className="flex items-center gap-1.5 sm:gap-2 mb-1 sm:mb-1.5">
                      <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-8 flex items-center justify-center flex-shrink-0" style={{ background: `${box.color}18`, border: `1px solid ${box.color}30` }}>
                        {box.icon}
                      </div>
                      <span className="text-xs font-bold text-white leading-tight">{box.label}</span>
                    </div>
                    <div className="flex items-baseline gap-1">
                      <span className="font-black tabular-nums text-xs sm:text-sm" style={{ color: box.color }}>{box.number}</span>
                      <span className="text-xs" style={{ color: '#555' }}>{box.unit}</span>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </div>

          {/* Audio Visualizer */}
          <div
            className={`relative rounded-24 overflow-hidden transition-all duration-700 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            style={{ height: '140px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}
          >
            <AudioWaveVisualizer />
            <div className="absolute top-3 left-3 sm:top-4 sm:left-4 flex items-center gap-2">
              <div className="dot-pulse" style={{ background: '#e85d26', boxShadow: '0 0 0 0 rgba(232,93,38,0.4)' }} />
              <span style={{ color: '#e85d26', fontSize: '10px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Live Audio Fingerprinting</span>
            </div>
            <div className="absolute top-3 right-3 sm:top-4 sm:right-4 hidden sm:flex items-center gap-3">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-8" style={{ background: 'rgba(232,93,38,0.15)', border: '1px solid rgba(232,93,38,0.25)' }}>
                <span style={{ color: '#ff8c42', fontSize: '11px', fontWeight: 600 }}>Asset Audio File Scanner Active</span>
              </div>
            </div>
            <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 flex items-center justify-between">
              <div className="flex items-center gap-2 sm:gap-4">
                {[
                  { label: 'Facebook', color: '#1877F2' },
                  { label: 'Instagram', color: '#E1306C' },
                  { label: 'WhatsApp', color: '#25D366' },
                ].map(p => (
                  <div key={p.label} className="flex items-center gap-1 sm:gap-1.5">
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full" style={{ background: p.color, boxShadow: `0 0 6px ${p.color}` }} />
                    <span style={{ color: '#888', fontSize: '10px' }}>{p.label}</span>
                  </div>
                ))}
              </div>
              <span style={{ color: '#444', fontSize: '10px' }}>99.8% Match</span>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fbGlow {
          0%, 100% { box-shadow: 0 0 12px rgba(24,119,242,0.8), 0 0 24px rgba(24,119,242,0.4); }
          50% { box-shadow: 0 0 20px rgba(24,119,242,1), 0 0 40px rgba(24,119,242,0.7); }
        }
        @keyframes fbCardGlow {
          0%, 100% { box-shadow: 0 8px 32px rgba(24,119,242,0.6), 0 0 40px rgba(24,119,242,0.3); }
          50% { box-shadow: 0 8px 48px rgba(24,119,242,0.9), 0 0 60px rgba(24,119,242,0.5); }
        }
        @keyframes fbTextGlow {
          0%, 100% { text-shadow: 0 0 8px rgba(24,119,242,0.6); }
          50% { text-shadow: 0 0 16px rgba(24,119,242,1), 0 0 24px rgba(24,119,242,0.5); }
        }
        @keyframes officialPartnerPulse {
          0%, 100% { box-shadow: 0 0 10px rgba(24,119,242,0.4); border-color: rgba(24,119,242,0.5); }
          50% { box-shadow: 0 0 20px rgba(24,119,242,0.8), 0 0 30px rgba(24,119,242,0.3); border-color: rgba(24,119,242,0.9); }
        }
      `}</style>
    </section>
  );
}
