'use client';
import React, { useEffect, useRef, useState } from 'react';

interface Metric {
  baseValue: number;
  variance: number;
  multiplier: number;
  unit: string;
  suffix: string;
  label: string;
  sublabel: string;
  color: string;
  accentColor: string;
  icon: React.ReactNode;
}

const metrics: Metric[] = [
  {
    baseValue: 2400,
    variance: 15,
    multiplier: 1000,
    unit: 'M',
    suffix: '+',
    label: 'Tracks Monitored',
    sublabel: 'Across all Meta platforms',
    color: '#1877F2',
    accentColor: '#4da6ff',
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2z"/></svg>,
  },
  {
    baseValue: 998,
    variance: 1,
    multiplier: 0.1,
    unit: '',
    suffix: '%',
    label: 'Match Accuracy',
    sublabel: 'Industry-leading fingerprint precision',
    color: '#e85d26',
    accentColor: '#ff8c42',
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/><circle cx="12" cy="12" r="3" fill="currentColor"/></svg>,
  },
  {
    baseValue: 8700,
    variance: 50,
    multiplier: 1000000,
    unit: 'B',
    suffix: '+',
    label: 'Videos Scanned',
    sublabel: 'Monthly across Facebook & Instagram',
    color: '#25D366',
    accentColor: '#4ade80',
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"/><line x1="7" y1="2" x2="7" y2="22"/><line x1="17" y1="2" x2="17" y2="22"/><line x1="2" y1="12" x2="22" y2="12"/><line x1="2" y1="7" x2="7" y2="7"/><line x1="2" y1="17" x2="7" y2="17"/><line x1="17" y1="17" x2="22" y2="17"/><line x1="17" y1="7" x2="22" y2="7"/></svg>,
  },
  {
    baseValue: 150,
    variance: 2,
    multiplier: 1,
    unit: '',
    suffix: '+',
    label: 'Countries Covered',
    sublabel: 'Global rights enforcement',
    color: '#a855f7',
    accentColor: '#c084fc',
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>,
  },
  {
    baseValue: 48,
    variance: 3,
    multiplier: 1,
    unit: '',
    suffix: 'hr',
    label: 'Avg. Payout Time',
    sublabel: 'From claim to artist account',
    color: '#f59e0b',
    accentColor: '#fbbf24',
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
  },
  {
    baseValue: 100,
    variance: 0,
    multiplier: 1,
    unit: '',
    suffix: '%',
    label: 'Transparent Reporting',
    sublabel: 'Full breakdown per track & platform',
    color: '#06b6d4',
    accentColor: '#22d3ee',
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>,
  },
];

function useLiveCounter(base: number, variance: number, interval = 1100) {
  const [value, setValue] = useState(base);
  useEffect(() => {
    if (variance === 0) return;
    const id = setInterval(() => {
      setValue(base + Math.floor((Math.random() - 0.5) * variance * 2));
    }, interval);
    return () => clearInterval(id);
  }, [base, variance, interval]);
  return value;
}

function FingerprintScannerBox({ color }: { color: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    canvas.width = 60;
    canvas.height = 60;
    let t = 0;

    const draw = () => {
      t += 0.05;
      ctx.clearRect(0, 0, 60, 60);

      // Rings
      for (let r = 6; r <= 26; r += 6) {
        ctx.beginPath();
        ctx.arc(30, 30, r, 0, Math.PI * 2);
        const alpha = 0.1 + 0.12 * Math.sin(t + r * 0.4);
        ctx.strokeStyle = color + Math.floor(alpha * 255).toString(16).padStart(2, '0');
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }

      // Scan line
      const sy = 30 + Math.sin(t * 2) * 24;
      const sg = ctx.createLinearGradient(4, sy, 56, sy);
      sg.addColorStop(0, 'transparent');
      sg.addColorStop(0.5, color + 'cc');
      sg.addColorStop(1, 'transparent');
      ctx.strokeStyle = sg;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(4, sy);
      ctx.lineTo(56, sy);
      ctx.stroke();

      // Center
      ctx.beginPath();
      ctx.arc(30, 30, 3, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.fill();

      animRef.current = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(animRef.current);
  }, [color]);

  return <canvas ref={canvasRef} width={60} height={60} />;
}

function MetricCard({ metric, index }: { metric: Metric; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const rawValue = useLiveCounter(metric.baseValue, metric.variance, 900 + index * 150);
  const [prevValue, setPrevValue] = useState(rawValue);
  const [flash, setFlash] = useState(false);
  const [direction, setDirection] = useState<'up' | 'down'>('up');

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (rawValue !== prevValue) {
      setFlash(true);
      setDirection(rawValue > prevValue ? 'up' : 'down');
      setPrevValue(rawValue);
      setTimeout(() => setFlash(false), 600);
    }
  }, [rawValue, prevValue]);

  // Format display value
  let displayValue: string;
  if (metric.unit === 'B') {
    displayValue = (rawValue / 1000).toFixed(1) + 'B';
  } else if (metric.unit === 'M') {
    displayValue = rawValue.toFixed(1) + 'M';
  } else if (metric.suffix === '%') {
    displayValue = (rawValue * metric.multiplier).toFixed(1);
  } else {
    displayValue = rawValue.toString();
  }

  return (
    <div
      ref={ref}
      className="relative rounded-2xl overflow-hidden"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0) scale(1)' : 'translateY(32px) scale(0.95)',
        transition: `all 0.7s ease-out ${index * 0.1}s`,
        background: `linear-gradient(135deg, rgba(13,13,13,0.95) 0%, rgba(18,18,28,0.95) 100%)`,
        border: `1px solid ${metric.color}25`,
        boxShadow: flash
          ? `0 0 30px ${metric.color}30, inset 0 0 20px ${metric.color}08`
          : `0 4px 20px rgba(0,0,0,0.4)`,
      }}
    >
      {/* Animated top border */}
      <div
        className="absolute top-0 inset-x-0 h-0.5"
        style={{ background: `linear-gradient(90deg, transparent, ${metric.color}, ${metric.accentColor}, transparent)` }}
      />

      {/* Animated left sidebar */}
      <div
        className="absolute left-0 top-0 bottom-0 w-1.5 rounded-l-2xl"
        style={{
          background: `linear-gradient(180deg, ${metric.color}, ${metric.accentColor}, ${metric.color})`,
          backgroundSize: '100% 300%',
          animation: `metricSidebar 2.5s ease-in-out infinite ${index * 0.4}s`,
        }}
      />

      {/* Scan line */}
      <div
        className="absolute inset-x-0 h-px pointer-events-none"
        style={{
          background: `linear-gradient(90deg, transparent, ${metric.color}50, transparent)`,
          animation: `metricScan 3.5s linear infinite ${index * 0.7}s`,
        }}
      />

      {/* Background radial */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: `radial-gradient(ellipse 80% 60% at 50% 50%, ${metric.color}06 0%, transparent 70%)` }}
      />

      <div className="relative z-10 p-6 pl-8">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ background: `${metric.color}15`, color: metric.color, border: `1px solid ${metric.color}30` }}
          >
            {metric.icon}
          </div>
          <FingerprintScannerBox color={metric.color} />
        </div>

        {/* Value */}
        <div className="flex items-end gap-1 mb-2">
          <span
            style={{
              fontSize: '44px',
              fontWeight: 900,
              lineHeight: 1,
              letterSpacing: '-0.04em',
              color: flash ? metric.accentColor : '#ffffff',
              textShadow: flash ? `0 0 20px ${metric.color}` : 'none',
              transition: 'all 0.3s ease',
            }}
          >
            {displayValue}
          </span>
          <span
            style={{
              fontSize: '22px',
              fontWeight: 700,
              lineHeight: 1.3,
              color: metric.color,
              marginBottom: '4px',
              textShadow: `0 0 10px ${metric.color}60`,
            }}
          >
            {metric.suffix}
          </span>
          {metric.variance > 0 && (
            <span
              className="mb-1 ml-1 text-xs font-bold"
              style={{ color: direction === 'up' ? '#4ade80' : '#f87171' }}
            >
              {direction === 'up' ? '↑' : '↓'}
            </span>
          )}
        </div>

        {/* Label */}
        <div className="text-white font-bold text-base mb-1" style={{ letterSpacing: '-0.01em' }}>
          {metric.label}
        </div>
        <div style={{ color: '#666', fontSize: '12px' }}>
          {metric.sublabel}
        </div>

        {/* Progress bar */}
        <div className="mt-4 h-1 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
          <div
            className="h-full rounded-full"
            style={{
              width: metric.suffix === '%' ? `${Math.min(rawValue * metric.multiplier, 100)}%` : '75%',
              background: `linear-gradient(90deg, ${metric.color}, ${metric.accentColor})`,
              boxShadow: `0 0 8px ${metric.color}60`,
              transition: 'width 0.5s ease',
            }}
          />
        </div>

        {/* Bottom accent */}
        <div
          className="mt-4 h-px"
          style={{ background: `linear-gradient(90deg, ${metric.color}40, ${metric.accentColor}20, transparent)` }}
        />
      </div>
    </div>
  );
}

function ColorfulBgVisualizer() {
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

    const colors = ['#1877F2', '#e85d26', '#25D366', '#a855f7', '#f59e0b', '#06b6d4'];
    let t = 0;

    const draw = () => {
      t += 0.01;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Rich dark gradient (NOT black)
      const bg = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      bg.addColorStop(0, '#0a0a1a');
      bg.addColorStop(0.3, '#0d1020');
      bg.addColorStop(0.6, '#0a1218');
      bg.addColorStop(1, '#0a0a1a');
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Colorful radial glows
      colors.forEach((color, i) => {
        const x = canvas.width * ((i + 0.5) / colors.length) + Math.sin(t + i) * 80;
        const y = canvas.height * 0.5 + Math.cos(t * 0.7 + i * 1.2) * 100;
        const r = 180 + Math.sin(t + i * 0.8) * 60;
        const grd = ctx.createRadialGradient(x, y, 0, x, y, r);
        grd.addColorStop(0, color + '18');
        grd.addColorStop(0.5, color + '08');
        grd.addColorStop(1, 'transparent');
        ctx.fillStyle = grd;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      });

      // Waveform bars at bottom
      const bars = 60;
      const barW = canvas.width / bars;
      for (let i = 0; i < bars; i++) {
        const h = (Math.sin(i * 0.25 + t * 1.5) * 0.5 + 0.5) * 60 + 5;
        const colorIdx = Math.floor((i / bars) * colors.length);
        const color = colors[colorIdx % colors.length];
        const gTop = ctx.createLinearGradient(0, canvas.height - h, 0, canvas.height);
        gTop.addColorStop(0, color + '00');
        gTop.addColorStop(1, color + '40');
        ctx.fillStyle = gTop;
        ctx.fillRect(i * barW + 1, canvas.height - h, barW - 2, h);
      }

      // Horizontal scan lines
      for (let i = 0; i < 3; i++) {
        const y = ((t * 0.2 + i * 0.33) % 1) * canvas.height;
        const sg = ctx.createLinearGradient(0, y, canvas.width, y);
        sg.addColorStop(0, 'transparent');
        sg.addColorStop(0.5, colors[i * 2] + '15');
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

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" style={{ opacity: 0.8 }} />;
}

export default function MetricsSection() {
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
      <ColorfulBgVisualizer />

      <style>{`
        @keyframes metricSidebar {
          0% { background-position: 0% 0%; }
          50% { background-position: 0% 100%; }
          100% { background-position: 0% 200%; }
        }
        @keyframes metricScan {
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
          <div className="section-label mb-4">By the Numbers</div>
          <h2
            className="font-black text-white mb-5"
            style={{ fontSize: 'clamp(32px, 5vw, 56px)', lineHeight: '1.1', letterSpacing: '-0.03em' }}
          >
            The scale of
            <br />
            <span className="gradient-text">music rights protection.</span>
          </h2>
          <p className="text-base max-w-[500px] mx-auto" style={{ color: '#888', lineHeight: '1.6' }}>
            Track Monitor · Matching · Video · All in Millions & Billions. Numbers always live — increasing and decreasing in real time.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {metrics.map((metric, i) => (
            <MetricCard key={metric.label} metric={metric} index={i} />
          ))}
        </div>

        {/* Transparent Report Banner */}
        <div
          className="mt-10 rounded-2xl overflow-hidden relative"
          style={{
            background: 'linear-gradient(135deg, rgba(6,182,212,0.08) 0%, rgba(24,119,242,0.08) 50%, rgba(6,182,212,0.08) 100%)',
            border: '1px solid rgba(6,182,212,0.25)',
            opacity: headerVisible ? 1 : 0,
            transform: headerVisible ? 'translateY(0)' : 'translateY(24px)',
            transition: 'all 0.7s ease-out 0.6s',
          }}
        >
          <div className="absolute top-0 inset-x-0 h-0.5" style={{ background: 'linear-gradient(90deg, transparent, #06b6d4, #1877F2, transparent)' }} />
          <div className="p-6 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: 'rgba(6,182,212,0.15)', border: '1px solid rgba(6,182,212,0.3)', color: '#06b6d4' }}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                  <polyline points="14 2 14 8 20 8"/>
                  <line x1="16" y1="13" x2="8" y2="13"/>
                  <line x1="16" y1="17" x2="8" y2="17"/>
                </svg>
              </div>
              <div>
                <div className="text-white font-bold text-lg mb-1">100% Transparent Reporting</div>
                <div style={{ color: '#888', fontSize: '14px' }}>Full breakdown per track, platform, and content type — every month, no hidden fees</div>
              </div>
            </div>
            <div className="flex items-center gap-6">
              {[
                { label: 'Per Track', value: '✓' },
                { label: 'Per Platform', value: '✓' },
                { label: 'Per Month', value: '✓' },
              ].map(item => (
                <div key={item.label} className="text-center">
                  <div className="font-black text-2xl mb-0.5" style={{ color: '#06b6d4' }}>{item.value}</div>
                  <div className="text-xs" style={{ color: '#666' }}>{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
