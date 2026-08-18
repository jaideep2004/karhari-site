'use client';
import React, { useEffect, useRef, useState } from 'react';

interface Step {
  number: string;
  title: string;
  description: string;
  color: string;
  accentColor: string;
  baseCount: number;
  countLabel: string;
  countSuffix: string;
  variance: number;
  revenueBase: number;
  icon: React.ReactNode;
}

const steps: Step[] = [
  {
    number: '01',
    title: 'Artist Onboarding',
    description: 'Artists and record labels register with Karhari Media. We collect your music catalog, metadata, and rights information to build your digital fingerprint profile.',
    color: '#1877F2',
    accentColor: '#4da6ff',
    baseCount: 1240000,
    countLabel: 'Artists Onboarded',
    countSuffix: 'M+',
    variance: 3000,
    revenueBase: 2800000,
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
  },
  {
    number: '02',
    title: 'Audio Fingerprint',
    description: 'Facebook Rights Manager creates a unique acoustic fingerprint for every track. Content ID fingerprint system identifies your music anywhere across Facebook, Instagram, and WhatsApp.',
    color: '#e85d26',
    accentColor: '#ff8c42',
    baseCount: 8700000,
    countLabel: 'Fingerprints Created',
    countSuffix: 'M+',
    variance: 12000,
    revenueBase: 5600000,
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
        <path d="M12 18c-3.314 0-6-2.686-6-6s2.686-6 6-6 6 2.686 6 6-2.686 6-6 6z"/>
        <path d="M12 14c-1.105 0-2-.895-2-2s.895-2 2-2 2 .895 2 2-.895 2-2 2z"/>
      </svg>
    ),
  },
  {
    number: '03',
    title: 'Content Monitoring',
    description: 'Rights Manager continuously scans billions of videos and posts across Meta platforms. When your music is detected, it is automatically claimed and monetized on your behalf.',
    color: '#25D366',
    accentColor: '#4ade80',
    baseCount: 12400000,
    countLabel: 'Videos Monitored',
    countSuffix: 'M+',
    variance: 20000,
    revenueBase: 7200000,
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
        <circle cx="12" cy="12" r="3"/>
      </svg>
    ),
  },
  {
    number: '04',
    title: 'Revenue Collection',
    description: 'Ad revenue generated from videos using your music is collected by Facebook and reported to Karhari Media. We aggregate earnings across all platforms and prepare transparent royalty reports.',
    color: '#a855f7',
    accentColor: '#c084fc',
    baseCount: 3600000,
    countLabel: 'Revenue Collected',
    countSuffix: 'M+',
    variance: 8000,
    revenueBase: 3600000,
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <line x1="12" y1="1" x2="12" y2="23"/>
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
      </svg>
    ),
  },
  {
    number: '05',
    title: 'Artist Payout',
    description: 'Karhari Media distributes royalties directly to artists and record labels. Payments are processed monthly with full breakdowns by platform, track, and content type.',
    color: '#f59e0b',
    accentColor: '#fbbf24',
    baseCount: 2100000,
    countLabel: 'Artists Paid Out',
    countSuffix: 'M+',
    variance: 5000,
    revenueBase: 2100000,
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="5" width="20" height="14" rx="2"/>
        <line x1="2" y1="10" x2="22" y2="10"/>
      </svg>
    ),
  },
];

function FingerprintScannerMini({ color }: { color: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    canvas.width = 80;
    canvas.height = 80;
    let t = 0;

    const draw = () => {
      t += 0.04;
      ctx.clearRect(0, 0, 80, 80);

      // Fingerprint rings
      for (let r = 8; r <= 36; r += 7) {
        ctx.beginPath();
        ctx.arc(40, 40, r, 0, Math.PI * 2);
        const alpha = 0.15 + 0.1 * Math.sin(t + r * 0.3);
        ctx.strokeStyle = color + Math.floor(alpha * 255).toString(16).padStart(2, '0');
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }

      // Scanner line
      const scanY = 40 + Math.sin(t * 1.5) * 32;
      const sg = ctx.createLinearGradient(8, scanY, 72, scanY);
      sg.addColorStop(0, 'transparent');
      sg.addColorStop(0.5, color + 'cc');
      sg.addColorStop(1, 'transparent');
      ctx.strokeStyle = sg;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(8, scanY);
      ctx.lineTo(72, scanY);
      ctx.stroke();

      // Center dot
      ctx.beginPath();
      ctx.arc(40, 40, 3, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.fill();

      // Corner brackets
      const corners = [[8, 8], [72, 8], [8, 72], [72, 72]];
      corners.forEach(([cx, cy]) => {
        const dx = cx < 40 ? 1 : -1;
        const dy = cy < 40 ? 1 : -1;
        ctx.strokeStyle = color + 'aa';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(cx, cy + dy * 8);
        ctx.lineTo(cx, cy);
        ctx.lineTo(cx + dx * 8, cy);
        ctx.stroke();
      });

      animRef.current = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(animRef.current);
  }, [color]);

  return <canvas ref={canvasRef} width={80} height={80} />;
}

function useLiveCounter(base: number, variance: number, interval = 1000) {
  const [value, setValue] = useState(base);
  useEffect(() => {
    const id = setInterval(() => {
      setValue(base + Math.floor((Math.random() - 0.5) * variance * 2));
    }, interval);
    return () => clearInterval(id);
  }, [base, variance, interval]);
  return value;
}

function StepCard({ step, index }: { step: Step; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const count = useLiveCounter(step.baseCount, step.variance, 800 + index * 200);
  const revenue = useLiveCounter(step.revenueBase, step.variance * 2, 1000 + index * 150);
  const [prevCount, setPrevCount] = useState(count);
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
    if (count !== prevCount) {
      setFlash(true);
      setPrevCount(count);
      setTimeout(() => setFlash(false), 500);
    }
  }, [count, prevCount]);

  const displayCount = (count / 1000000).toFixed(2) + 'M+';
  const displayRevenue = '$' + (revenue / 1000000).toFixed(2) + 'M';

  return (
    <div
      ref={ref}
      className="relative rounded-2xl overflow-hidden"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(40px)',
        transition: `all 0.7s ease-out ${index * 0.12}s`,
        background: `linear-gradient(135deg, rgba(13,13,13,0.95) 0%, rgba(20,20,30,0.95) 100%)`,
        border: `1px solid ${step.color}30`,
        boxShadow: flash ? `0 0 30px ${step.color}30, inset 0 0 30px ${step.color}05` : `0 4px 24px rgba(0,0,0,0.4)`,
      }}
    >
      {/* Animated top border */}
      <div className="absolute top-0 inset-x-0 h-0.5" style={{ background: `linear-gradient(90deg, transparent, ${step.color}, ${step.accentColor}, transparent)` }} />

      {/* Animated left sidebar */}
      <div
        className="absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl"
        style={{
          background: `linear-gradient(180deg, ${step.color}, ${step.accentColor}, ${step.color})`,
          backgroundSize: '100% 200%',
          animation: `sidebarFlow${index} 2s linear infinite`,
        }}
      />

      {/* Scanner background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 80% 60% at 50% 50%, ${step.color}06 0%, transparent 70%)`,
        }}
      />

      {/* Scan line animation */}
      <div
        className="absolute inset-x-0 h-px pointer-events-none"
        style={{
          background: `linear-gradient(90deg, transparent, ${step.color}60, transparent)`,
          animation: `scanLineV 3s linear infinite ${index * 0.6}s`,
        }}
      />

      <div className="relative z-10 p-6">
        {/* Header row */}
        <div className="flex items-start justify-between mb-5">
          <div className="flex items-center gap-3">
            <div
              className="text-4xl font-black"
              style={{
                color: step.color,
                textShadow: `0 0 20px ${step.color}60`,
                letterSpacing: '-0.04em',
                lineHeight: 1,
              }}
            >
              {step.number}
            </div>
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: `${step.color}15`, color: step.color, border: `1px solid ${step.color}30` }}
            >
              {step.icon}
            </div>
          </div>
          <FingerprintScannerMini color={step.color} />
        </div>

        {/* Title */}
        <h3 className="text-white font-bold text-xl mb-2" style={{ letterSpacing: '-0.02em' }}>
          {step.title}
        </h3>

        {/* Description */}
        <p className="text-sm leading-relaxed mb-5" style={{ color: '#888' }}>
          {step.description}
        </p>

        {/* Live counters */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div
            className="rounded-xl p-3 text-center"
            style={{
              background: `${step.color}10`,
              border: `1px solid ${step.color}25`,
              boxShadow: flash ? `0 0 12px ${step.color}30` : 'none',
              transition: 'box-shadow 0.3s ease',
            }}
          >
            <div
              className="font-black text-lg mb-0.5"
              style={{
                color: flash ? step.accentColor : step.color,
                textShadow: flash ? `0 0 10px ${step.color}` : 'none',
                transition: 'all 0.3s ease',
                letterSpacing: '-0.02em',
              }}
            >
              {displayCount}
            </div>
            <div className="text-xs" style={{ color: '#666' }}>{step.countLabel}</div>
          </div>
          <div
            className="rounded-xl p-3 text-center"
            style={{
              background: `${step.accentColor}10`,
              border: `1px solid ${step.accentColor}25`,
            }}
          >
            <div
              className="font-black text-lg mb-0.5"
              style={{ color: step.accentColor, letterSpacing: '-0.02em' }}
            >
              {displayRevenue}
            </div>
            <div className="text-xs" style={{ color: '#666' }}>Revenue</div>
          </div>
        </div>

        {/* Content ID fingerprint tag */}
        <div className="flex items-center gap-2">
          <div
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold"
            style={{
              background: `${step.color}12`,
              border: `1px solid ${step.color}30`,
              color: step.color,
            }}
          >
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
              <circle cx="12" cy="12" r="3" fill="currentColor"/>
            </svg>
            Content ID Fingerprint
          </div>
          <div
            className="flex items-center gap-1 px-2 py-1 rounded-full text-xs"
            style={{ background: 'rgba(255,255,255,0.04)', color: '#555', border: '1px solid rgba(255,255,255,0.06)' }}
          >
            <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ background: step.color, boxShadow: `0 0 4px ${step.color}` }} />
            Scanning
          </div>
        </div>
      </div>

      {/* Bottom accent */}
      <div className="absolute bottom-0 inset-x-0 h-0.5" style={{ background: `linear-gradient(90deg, transparent, ${step.accentColor}40, transparent)` }} />
    </div>
  );
}

function BgVisualizer() {
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

    const colors = ['#1877F2', '#e85d26', '#25D366', '#a855f7', '#f59e0b'];
    let t = 0;

    const draw = () => {
      t += 0.015;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Dark bg
      ctx.fillStyle = 'rgba(10,10,20,0.97)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Grid lines
      ctx.strokeStyle = 'rgba(255,255,255,0.02)';
      ctx.lineWidth = 1;
      for (let x = 0; x < canvas.width; x += 60) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += 60) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); ctx.stroke();
      }

      // Waveforms
      colors.forEach((color, ci) => {
        ctx.beginPath();
        ctx.strokeStyle = color + '30';
        ctx.lineWidth = 1.5;
        for (let x = 0; x < canvas.width; x += 3) {
          const y = canvas.height * (0.2 + ci * 0.15) + Math.sin(x * 0.02 + t + ci) * 20;
          if (x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
        }
        ctx.stroke();
      });

      animRef.current = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" style={{ opacity: 0.5 }} />;
}

export default function HowItWorksSection() {
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
    <section className="py-24 lg:py-32 relative overflow-hidden" style={{ minHeight: '100vh' }}>
      <BgVisualizer />

      {/* Color overlays */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 70% 50% at 50% 50%, rgba(24,119,242,0.06) 0%, transparent 70%)' }} />
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 50% 40% at 80% 20%, rgba(232,93,38,0.05) 0%, transparent 60%)' }} />

      <style>{`
        @keyframes scanLineV {
          0% { top: 0%; opacity: 0; }
          5% { opacity: 1; }
          95% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
        @keyframes sidebarFlow0 { 0% { background-position: 0% 0%; } 100% { background-position: 0% 200%; } }
        @keyframes sidebarFlow1 { 0% { background-position: 0% 0%; } 100% { background-position: 0% 200%; } }
        @keyframes sidebarFlow2 { 0% { background-position: 0% 0%; } 100% { background-position: 0% 200%; } }
        @keyframes sidebarFlow3 { 0% { background-position: 0% 0%; } 100% { background-position: 0% 200%; } }
        @keyframes sidebarFlow4 { 0% { background-position: 0% 0%; } 100% { background-position: 0% 200%; } }
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
          <div className="section-label mb-4">The Process</div>
          <h2
            className="font-black text-white mb-5"
            style={{ fontSize: 'clamp(32px, 5vw, 56px)', lineHeight: '1.1', letterSpacing: '-0.03em' }}
          >
            How Karhari Media
            <br />
            <span className="gradient-text">distributes your music.</span>
          </h2>
          <p className="text-lg max-w-[560px] mx-auto" style={{ color: '#888', lineHeight: '1.6' }}>
            From catalog registration to royalty payout — a fully automated pipeline built on Facebook Rights Manager technology. All numbers in millions, always live.
          </p>
        </div>

        {/* Steps grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {steps.slice(0, 3).map((step, i) => (
            <StepCard key={step.number} step={step} index={i} />
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5 max-w-[840px] mx-auto">
          {steps.slice(3).map((step, i) => (
            <StepCard key={step.number} step={step} index={i + 3} />
          ))}
        </div>
      </div>
    </section>
  );
}
