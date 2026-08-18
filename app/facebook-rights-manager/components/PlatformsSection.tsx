'use client';
import React, { useEffect, useRef, useState } from 'react';

const platforms = [
  {
    name: 'Facebook',
    color: '#1877F2',
    glowColor: 'rgba(24,119,242,0.4)',
    bg: 'rgba(24,119,242,0.08)',
    border: 'rgba(24,119,242,0.25)',
    baseUsers: 2900000000,
    variance: 80000,
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="#1877F2">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    ),
    features: [
      'Video monetization via Rights Manager',
      'In-stream ads on music videos',
      'Reels audio rights collection',
      'Live stream music licensing',
      'Stories music monetization',
    ],
    trackBase: 1200000,
  },
  {
    name: 'Instagram',
    color: '#E1306C',
    glowColor: 'rgba(225,48,108,0.4)',
    bg: 'rgba(225,48,108,0.08)',
    border: 'rgba(225,48,108,0.25)',
    baseUsers: 2000000000,
    variance: 60000,
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="url(#ig-grad2)">
        <defs>
          <linearGradient id="ig-grad2" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#f09433"/>
            <stop offset="50%" stopColor="#dc2743"/>
            <stop offset="100%" stopColor="#bc1888"/>
          </linearGradient>
        </defs>
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
      </svg>
    ),
    features: [
      'Reels music rights management',
      'Stories audio monetization',
      'IGTV music licensing',
      'Creator content music claims',
      'Branded content music rights',
    ],
    trackBase: 980000,
  },
  {
    name: 'WhatsApp',
    color: '#25D366',
    glowColor: 'rgba(37,211,102,0.4)',
    bg: 'rgba(37,211,102,0.08)',
    border: 'rgba(37,211,102,0.25)',
    baseUsers: 2000000000,
    variance: 50000,
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="#25D366">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
    ),
    features: [
      'Status audio rights tracking',
      'Voice message music detection',
      'Business account music licensing',
      'Broadcast channel music rights',
      'Group audio content monitoring',
    ],
    trackBase: 760000,
  },
];

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

function FingerprintScannerRing({ color, size = 120 }: { color: string; size?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    canvas.width = size;
    canvas.height = size;
    const cx = size / 2;
    const cy = size / 2;
    let t = 0;

    const draw = () => {
      t += 0.03;
      ctx.clearRect(0, 0, size, size);

      // Fingerprint concentric rings
      for (let r = 10; r <= cx - 5; r += 8) {
        const alpha = 0.08 + 0.08 * Math.sin(t * 1.5 + r * 0.2);
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.strokeStyle = color + Math.floor(alpha * 255).toString(16).padStart(2, '0');
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }

      // Rotating scan arc
      ctx.beginPath();
      ctx.arc(cx, cy, cx - 8, t, t + Math.PI * 0.6);
      const arcGrad = ctx.createLinearGradient(0, 0, size, size);
      arcGrad.addColorStop(0, color + '00');
      arcGrad.addColorStop(0.5, color + 'ff');
      arcGrad.addColorStop(1, color + '00');
      ctx.strokeStyle = arcGrad;
      ctx.lineWidth = 3;
      ctx.stroke();

      // Horizontal scan line
      const scanY = cy + Math.sin(t * 2) * (cy - 15);
      const sg = ctx.createLinearGradient(10, scanY, size - 10, scanY);
      sg.addColorStop(0, 'transparent');
      sg.addColorStop(0.5, color + 'aa');
      sg.addColorStop(1, 'transparent');
      ctx.strokeStyle = sg;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(10, scanY);
      ctx.lineTo(size - 10, scanY);
      ctx.stroke();

      // Center dot
      ctx.beginPath();
      ctx.arc(cx, cy, 4, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.shadowBlur = 10;
      ctx.shadowColor = color;
      ctx.fill();
      ctx.shadowBlur = 0;

      // Corner brackets
      const bSize = 12;
      const corners = [[8, 8], [size - 8, 8], [8, size - 8], [size - 8, size - 8]];
      corners.forEach(([bx, by]) => {
        const dx = bx < cx ? 1 : -1;
        const dy = by < cy ? 1 : -1;
        ctx.strokeStyle = color + 'cc';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(bx, by + dy * bSize);
        ctx.lineTo(bx, by);
        ctx.lineTo(bx + dx * bSize, by);
        ctx.stroke();
      });

      animRef.current = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(animRef.current);
  }, [color, size]);

  return <canvas ref={canvasRef} width={size} height={size} />;
}

function PlatformCard({ platform, index }: { platform: typeof platforms[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const users = useLiveCounter(platform.baseUsers, platform.variance, 1000 + index * 300);
  const tracks = useLiveCounter(platform.trackBase, 3000, 900 + index * 200);
  const [prevUsers, setPrevUsers] = useState(users);
  const [flash, setFlash] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (users !== prevUsers) {
      setFlash(true);
      setPrevUsers(users);
      setTimeout(() => setFlash(false), 500);
    }
  }, [users, prevUsers]);

  const displayUsers = (users / 1000000000).toFixed(2) + 'B+';
  const displayTracks = (tracks / 1000000).toFixed(2) + 'M+';

  return (
    <div
      ref={ref}
      className="relative rounded-2xl overflow-hidden flex flex-col"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0) scale(1)' : 'translateY(40px) scale(0.96)',
        transition: `all 0.7s ease-out ${index * 0.15}s`,
        background: `linear-gradient(135deg, rgba(13,13,13,0.95) 0%, rgba(18,18,28,0.95) 100%)`,
        border: `1px solid ${platform.border}`,
        boxShadow: flash
          ? `0 0 40px ${platform.glowColor}, 0 0 80px ${platform.glowColor.replace('0.4', '0.15')}, inset 0 0 40px ${platform.bg}`
          : `0 8px 32px rgba(0,0,0,0.5), 0 0 0px transparent`,
      }}
    >
      {/* Animated top border */}
      <div
        className="absolute top-0 inset-x-0 h-0.5"
        style={{ background: `linear-gradient(90deg, transparent, ${platform.color}, transparent)` }}
      />

      {/* Animated left sidebar */}
      <div
        className="absolute left-0 top-0 bottom-0 w-1"
        style={{
          background: `linear-gradient(180deg, ${platform.color}00, ${platform.color}, ${platform.color}00)`,
          animation: `platformSidebar 2s ease-in-out infinite ${index * 0.5}s`,
        }}
      />

      {/* Scan line */}
      <div
        className="absolute inset-x-0 h-px pointer-events-none"
        style={{
          background: `linear-gradient(90deg, transparent, ${platform.color}50, transparent)`,
          animation: `platformScan 4s linear infinite ${index * 1.3}s`,
        }}
      />

      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: `radial-gradient(ellipse 70% 50% at 50% 30%, ${platform.bg} 0%, transparent 70%)` }}
      />

      <div className="relative z-10 p-7 flex flex-col flex-1">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-4">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center"
              style={{
                background: platform.bg,
                border: `1px solid ${platform.border}`,
                boxShadow: `0 0 20px ${platform.glowColor}`,
              }}
            >
              {platform.icon}
            </div>
            <div>
              <h3 className="font-bold text-white text-2xl mb-1" style={{ letterSpacing: '-0.02em' }}>{platform.name}</h3>
              <div
                className="flex items-center gap-1.5 text-xs font-semibold px-2 py-1 rounded-full"
                style={{ background: platform.bg, color: platform.color, border: `1px solid ${platform.border}` }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: platform.color, boxShadow: `0 0 6px ${platform.color}`, animation: 'pulse 1s ease-in-out infinite' }}
                />
                Live Scanning
              </div>
            </div>
          </div>
          <FingerprintScannerRing color={platform.color} size={80} />
        </div>

        {/* Live user count */}
        <div
          className="rounded-2xl p-5 mb-5 text-center relative overflow-hidden"
          style={{
            background: `linear-gradient(135deg, ${platform.bg}, ${platform.bg.replace('0.08', '0.04')})`,
            border: `1px solid ${platform.border}`,
          }}
        >
          <div
            className="absolute inset-x-0 h-px"
            style={{
              background: `linear-gradient(90deg, transparent, ${platform.color}60, transparent)`,
              animation: `platformScan 3s linear infinite`,
              top: '50%',
            }}
          />
          <div
            className="font-black text-4xl mb-1"
            style={{
              color: flash ? '#ffffff' : platform.color,
              textShadow: flash ? `0 0 20px ${platform.color}` : `0 0 10px ${platform.color}40`,
              letterSpacing: '-0.04em',
              transition: 'all 0.3s ease',
            }}
          >
            {displayUsers}
          </div>
          <div className="text-sm font-semibold" style={{ color: '#888' }}>Monthly Active Users</div>
          <div className="text-xs mt-1" style={{ color: '#555' }}>↑ Always increasing</div>
        </div>

        {/* Tracks counter */}
        <div
          className="rounded-xl p-4 mb-5 flex items-center justify-between"
          style={{
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.06)',
          }}
        >
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: '#555' }}>Tracks Monitored</div>
            <div className="font-black text-xl" style={{ color: platform.color, letterSpacing: '-0.02em' }}>{displayTracks}</div>
          </div>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={platform.color} strokeWidth="1.5" style={{ opacity: 0.6 }}>
            <path d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2z"/>
          </svg>
        </div>

        {/* Features */}
        <ul className="space-y-2.5 flex-1">
          {platform.features.map(feature => (
            <li key={feature} className="flex items-start gap-3">
              <div
                className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                style={{ background: `${platform.color}20`, border: `1px solid ${platform.color}40` }}
              >
                <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                  <path d="M2 6l3 3 5-5" stroke={platform.color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span className="text-sm" style={{ color: '#888' }}>{feature}</span>
            </li>
          ))}
        </ul>

        {/* Bottom accent */}
        <div className="mt-6 h-px" style={{ background: `linear-gradient(90deg, ${platform.color}40, transparent)` }} />
      </div>
    </div>
  );
}

function BgVideoTheme() {
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

    const colors = ['#1877F2', '#E1306C', '#25D366'];
    let t = 0;

    const draw = () => {
      t += 0.012;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Base
      ctx.fillStyle = 'rgba(8,8,18,0.98)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Radial glows for each platform
      colors.forEach((color, i) => {
        const x = canvas.width * (0.2 + i * 0.3);
        const y = canvas.height * 0.5 + Math.sin(t + i * 2) * 50;
        const r = 200 + Math.sin(t * 0.5 + i) * 50;
        const grd = ctx.createRadialGradient(x, y, 0, x, y, r);
        grd.addColorStop(0, color + '15');
        grd.addColorStop(1, 'transparent');
        ctx.fillStyle = grd;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      });

      // Horizontal scan lines
      for (let i = 0; i < 3; i++) {
        const y = ((t * 0.3 + i * 0.33) % 1) * canvas.height;
        const sg = ctx.createLinearGradient(0, y, canvas.width, y);
        sg.addColorStop(0, 'transparent');
        sg.addColorStop(0.3, colors[i] + '20');
        sg.addColorStop(0.7, colors[i] + '20');
        sg.addColorStop(1, 'transparent');
        ctx.fillStyle = sg;
        ctx.fillRect(0, y - 1, canvas.width, 2);
      }

      animRef.current = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" style={{ opacity: 0.7 }} />;
}

export default function PlatformsSection() {
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

  return (
    <section id="platforms" className="py-24 lg:py-32 relative overflow-hidden" style={{ minHeight: '100vh' }}>
      <BgVideoTheme />

      <style>{`
        @keyframes platformSidebar {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }
        @keyframes platformScan {
          0% { top: 0%; opacity: 0; }
          5% { opacity: 1; }
          95% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
      `}</style>

      <div className="section-container relative z-10">
        <div
          ref={headerRef}
          className="text-center mb-16"
          style={{
            opacity: headerVisible ? 1 : 0,
            transform: headerVisible ? 'translateY(0)' : 'translateY(24px)',
            transition: 'all 0.7s ease-out',
          }}
        >
          <div className="section-label mb-5">Meta Platforms</div>
          <h2
            className="font-black text-white mb-5"
            style={{ fontSize: 'clamp(32px, 5vw, 56px)', lineHeight: '1.1', letterSpacing: '-0.03em' }}
          >
            Your music, everywhere
            <br />
            <span className="gradient-text">on Meta.</span>
          </h2>
          <p className="text-lg max-w-[560px] mx-auto" style={{ color: '#888', lineHeight: '1.6' }}>
            Karhari Media manages your music rights across all three Meta platforms — ensuring every use is tracked, claimed, and monetized. Live user counts always increasing.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {platforms.map((platform, i) => (
            <PlatformCard key={platform.name} platform={platform} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
