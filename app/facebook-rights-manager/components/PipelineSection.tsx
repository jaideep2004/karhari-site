'use client';
import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

/* ─── Platform Icons ─────────────────────────────────────────────── */
const FacebookIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
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

/* ─── Utility Hook ───────────────────────────────────────────────── */
function useIncrementingNumber(base: number, increment: number, interval: number) {
  const [value, setValue] = useState(base);
  useEffect(() => {
    const timer = setInterval(() => setValue(v => v + increment), interval);
    return () => clearInterval(timer);
  }, [increment, interval]);
  return value;
}

/* ─── Animated Background Canvas ────────────────────────────────── */
const PipelineBg = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let t = 0;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const draw = () => {
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);
      t += 0.008;

      const bg = ctx.createLinearGradient(0, 0, w, h);
      bg.addColorStop(0, '#060410');
      bg.addColorStop(0.3, '#0a0618');
      bg.addColorStop(0.6, '#080c1a');
      bg.addColorStop(1, '#060410');
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, w, h);

      // Hex grid
      const hexSize = 36;
      const hexW = hexSize * 2;
      const hexH = Math.sqrt(3) * hexSize;
      ctx.strokeStyle = 'rgba(100,60,255,0.04)';
      ctx.lineWidth = 0.5;
      for (let row = -1; row < h / hexH + 2; row++) {
        for (let col = -1; col < w / hexW + 2; col++) {
          const cx = col * hexW * 0.75 + (row % 2 === 0 ? 0 : hexW * 0.375);
          const cy = row * hexH;
          ctx.beginPath();
          for (let i = 0; i < 6; i++) {
            const angle = (Math.PI / 3) * i - Math.PI / 6;
            const px = cx + hexSize * Math.cos(angle);
            const py = cy + hexSize * Math.sin(angle);
            if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
          }
          ctx.closePath();
          ctx.stroke();
        }
      }

      // Flowing energy lines
      for (let i = 0; i < 6; i++) {
        const phase = t + i * 1.05;
        const x = (Math.sin(phase * 0.7 + i) * 0.5 + 0.5) * w;
        const alpha = 0.04 + Math.sin(phase) * 0.02;
        const grad = ctx.createLinearGradient(x - 200, 0, x + 200, h);
        grad.addColorStop(0, 'rgba(100,60,255,0)');
        grad.addColorStop(0.5, `rgba(100,60,255,${alpha})`);
        grad.addColorStop(1, 'rgba(100,60,255,0)');
        ctx.fillStyle = grad;
        ctx.fillRect(x - 200, 0, 400, h);
      }

      // Floating orbs
      for (let i = 0; i < 5; i++) {
        const ox = (Math.sin(t * 0.3 + i * 1.3) * 0.4 + 0.5) * w;
        const oy = (Math.cos(t * 0.2 + i * 0.9) * 0.4 + 0.5) * h;
        const r = 80 + i * 40;
        const colors = ['rgba(100,60,255,0.06)', 'rgba(24,119,242,0.05)', 'rgba(232,93,38,0.04)', 'rgba(37,211,102,0.03)', 'rgba(225,48,108,0.04)'];
        const orb = ctx.createRadialGradient(ox, oy, 0, ox, oy, r);
        orb.addColorStop(0, colors[i]);
        orb.addColorStop(1, 'transparent');
        ctx.fillStyle = orb;
        ctx.beginPath();
        ctx.arc(ox, oy, r, 0, Math.PI * 2);
        ctx.fill();
      }

      // Scan line
      const scanY = ((t * 0.15) % 1) * h;
      const scanGrad = ctx.createLinearGradient(0, scanY - 60, 0, scanY + 60);
      scanGrad.addColorStop(0, 'transparent');
      scanGrad.addColorStop(0.5, 'rgba(100,60,255,0.04)');
      scanGrad.addColorStop(1, 'transparent');
      ctx.fillStyle = scanGrad;
      ctx.fillRect(0, scanY - 60, w, 120);

      animRef.current = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(animRef.current); window.removeEventListener('resize', resize); };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" style={{ display: 'block' }} />;
};

/* ─── Mini Fingerprint Scanner ───────────────────────────────────── */
const MiniScanner = ({ active, color = '#6432ff', size = 56 }: { active: boolean; color?: string; size?: number }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const tRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const draw = () => {
      const s = size;
      ctx.clearRect(0, 0, s, s);
      tRef.current += 0.04;
      const t = tRef.current;
      const cx = s / 2;
      const cy = s / 2;
      const maxR = s * 0.42;

      // Outer glow
      const glow = ctx.createRadialGradient(cx, cy, 0, cx, cy, maxR);
      glow.addColorStop(0, `${color}20`);
      glow.addColorStop(1, 'transparent');
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(cx, cy, maxR, 0, Math.PI * 2);
      ctx.fill();

      // Fingerprint ridges
      for (let r = 2; r <= 10; r += 2) {
        const radius = (r / 10) * maxR * 0.9;
        const alpha = active ? (0.18 + Math.sin(t * 1.5 - r * 0.4) * 0.1) : 0.07;
        ctx.beginPath();
        const steps = 120;
        for (let step = 0; step <= steps; step++) {
          const angle = (step / steps) * Math.PI * 2;
          const wave = Math.sin(angle * (5 + r * 0.3) + t * 0.8 + r * 0.5) * (r * 0.35);
          const rr = radius + wave;
          const px = cx + rr * Math.cos(angle);
          const py = cy + rr * Math.sin(angle);
          if (step === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
        }
        ctx.closePath();
        ctx.strokeStyle = `${color}${Math.round(alpha * 255).toString(16).padStart(2, '0')}`;
        ctx.lineWidth = active ? 1.2 : 0.7;
        ctx.stroke();
      }

      if (active) {
        // Rotating sweep
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(t * 2.2);
        const sweep = ctx.createLinearGradient(0, 0, maxR, 0);
        sweep.addColorStop(0, `${color}00`);
        sweep.addColorStop(0.6, `${color}30`);
        sweep.addColorStop(1, `${color}90`);
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.arc(0, 0, maxR, -0.45, 0.45);
        ctx.closePath();
        ctx.fillStyle = sweep;
        ctx.fill();
        ctx.restore();

        // Scan line
        const scanY = cy + Math.sin(t * 2.5) * maxR * 0.65;
        const sl = ctx.createLinearGradient(cx - maxR, scanY, cx + maxR, scanY);
        sl.addColorStop(0, 'transparent');
        sl.addColorStop(0.5, `${color}cc`);
        sl.addColorStop(1, 'transparent');
        ctx.fillStyle = sl;
        ctx.fillRect(cx - maxR, scanY - 1, maxR * 2, 2);

        // Center dot
        ctx.beginPath();
        ctx.arc(cx, cy, 3, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.shadowBlur = 8;
        ctx.shadowColor = color;
        ctx.fill();
        ctx.shadowBlur = 0;

        // Corner brackets
        const bSize = maxR * 0.28;
        const bOff = maxR * 0.78;
        [[-1, -1], [1, -1], [1, 1], [-1, 1]].forEach(([sx, sy]) => {
          const bx = cx + sx * bOff;
          const by = cy + sy * bOff;
          ctx.strokeStyle = color;
          ctx.lineWidth = 1.5;
          ctx.shadowBlur = 4;
          ctx.shadowColor = color;
          ctx.beginPath();
          ctx.moveTo(bx, by + sy * bSize);
          ctx.lineTo(bx, by);
          ctx.lineTo(bx + sx * bSize, by);
          ctx.stroke();
          ctx.shadowBlur = 0;
        });
      }

      animRef.current = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(animRef.current);
  }, [active, color, size]);

  return <canvas ref={canvasRef} width={size} height={size} style={{ width: `${size}px`, height: `${size}px` }} />;
};

/* ─── Waveform Visualizer ────────────────────────────────────────── */
const WaveViz = ({ color, active }: { color: string; active: boolean }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const tRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const draw = () => {
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);
      tRef.current += 0.06;
      const t = tRef.current;
      const bars = 16;
      const barW = (w - (bars - 1) * 2) / bars;
      for (let i = 0; i < bars; i++) {
        const amp = active ? (0.2 + Math.abs(Math.sin(t * 2.5 + i * 0.6)) * 0.8) : 0.15;
        const barH = amp * h;
        const x = i * (barW + 2);
        const y = (h - barH) / 2;
        const grad = ctx.createLinearGradient(0, y, 0, y + barH);
        grad.addColorStop(0, `${color}40`);
        grad.addColorStop(0.5, color);
        grad.addColorStop(1, `${color}40`);
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.roundRect(x, y, barW, barH, 2);
        ctx.fill();
      }
      animRef.current = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(animRef.current);
  }, [color, active]);

  return <canvas ref={canvasRef} width={80} height={28} style={{ width: '80px', height: '28px' }} />;
};

/* ─── Zigzag Step Card ───────────────────────────────────────────── */
interface ZigzagCardProps {
  step: number;
  title: string;
  subtitle: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  isActive: boolean;
  isKarhari?: boolean;
  isFacebook?: boolean;
  visible: boolean;
  delay: number;
  revenue?: string;
  tracks?: string;
  side: 'left' | 'right';
}

const ZigzagCard = ({
  step, title, subtitle, description, icon, color, isActive,
  isKarhari, isFacebook, visible, delay, revenue, tracks, side,
}: ZigzagCardProps) => {
  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        justifyContent: side === 'left' ? 'flex-start' : 'flex-end',
      }}
    >
      <div
        style={{
          width: 'calc(50% - 32px)',
          opacity: visible ? 1 : 0,
          transform: visible
            ? 'translateX(0) scale(1)'
            : `translateX(${side === 'left' ? '-40px' : '40px'}) scale(0.95)`,
          transition: `opacity 0.6s ease ${delay}s, transform 0.6s cubic-bezier(0.34,1.56,0.64,1) ${delay}s`,
          background: isActive
            ? `linear-gradient(135deg, ${color}14 0%, ${color}07 100%)`
            : 'rgba(255,255,255,0.025)',
          border: `1.5px solid ${isActive ? color + '55' : 'rgba(255,255,255,0.08)'}`,
          borderRadius: '14px',
          padding: '18px',
          position: 'relative',
          overflow: 'hidden',
          boxShadow: isActive
            ? `0 0 36px ${color}22, 0 8px 28px rgba(0,0,0,0.45), inset 0 1px 0 ${color}18`
            : '0 4px 16px rgba(0,0,0,0.3)',
        }}
      >
        {/* Top color bar */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
          background: isActive
            ? `linear-gradient(90deg, transparent, ${color}, transparent)`
            : 'transparent',
          transition: 'all 0.4s ease',
        }} />

        {/* Corner accent — side indicator */}
        <div style={{
          position: 'absolute',
          top: 0,
          [side === 'left' ? 'left' : 'right']: 0,
          width: '3px',
          height: '100%',
          background: isActive
            ? `linear-gradient(180deg, ${color}, ${color}00)`
            : 'rgba(255,255,255,0.04)',
          borderRadius: side === 'left' ? '14px 0 0 14px' : '0 14px 14px 0',
        }} />

        {/* Step badge row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
          <div style={{
            width: '32px', height: '32px', borderRadius: '8px', flexShrink: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: isActive ? color : 'rgba(255,255,255,0.06)',
            color: isActive ? '#fff' : '#555',
            fontWeight: 900, fontSize: '13px',
            boxShadow: isActive ? `0 4px 14px ${color}55` : 'none',
            border: `1px solid ${isActive ? color : 'rgba(255,255,255,0.08)'}`,
          }}>
            {step}
          </div>

          {/* Icon */}
          <div style={{
            width: '44px', height: '44px', borderRadius: '10px', flexShrink: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: isActive ? `${color}18` : 'rgba(255,255,255,0.04)',
            border: `1px solid ${isActive ? color + '35' : 'rgba(255,255,255,0.07)'}`,
            color: color,
            boxShadow: isActive ? `0 0 18px ${color}28` : 'none',
          }}>
            {isKarhari ? (
              <Image src="/assets/images/1608452013412__1_-1786628988863.png" alt="Karhari Media" width={28} height={28} style={{ objectFit: 'contain' }} />
            ) : icon}
          </div>

          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap', marginBottom: '2px' }}>
              <span style={{ color: '#fff', fontWeight: 800, fontSize: '13px', letterSpacing: '-0.01em' }}>{title}</span>
              {isActive && (
                <span style={{
                  display: 'inline-flex', alignItems: 'center', gap: '4px',
                  padding: '1px 6px', borderRadius: '4px',
                  background: `${color}18`, border: `1px solid ${color}30`,
                }}>
                  <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: color, boxShadow: `0 0 6px ${color}`, display: 'inline-block', animation: 'pipelinePulse 1.2s ease-in-out infinite' }} />
                  <span style={{ fontSize: '9px', color: color, fontWeight: 700 }}>LIVE</span>
                </span>
              )}
            </div>
            <span style={{
              fontSize: '10px', padding: '1px 7px', borderRadius: '4px', fontWeight: 700,
              background: `${color}14`, color: color, border: `1px solid ${color}25`,
            }}>{subtitle}</span>
          </div>

          {/* Mini scanner for Karhari/Facebook */}
          {(isKarhari || isFacebook) && (
            <div style={{ flexShrink: 0 }}>
              <MiniScanner active={isActive} color={color} size={48} />
            </div>
          )}
        </div>

        {/* Description */}
        <p style={{ color: '#5a5a6e', fontSize: '11.5px', lineHeight: '1.55', margin: '0 0 10px', paddingLeft: '42px' }}>
          {description}
        </p>

        {/* Waveform + numbers row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', paddingLeft: '42px', flexWrap: 'wrap' }}>
          <WaveViz color={color} active={isActive} />
          {revenue && (
            <div style={{ padding: '3px 9px', background: `${color}12`, border: `1px solid ${color}22`, borderRadius: '6px' }}>
              <span style={{ fontSize: '9px', color: '#555', display: 'block' }}>Revenue</span>
              <span style={{ fontSize: '12px', fontWeight: 900, color: color, fontVariantNumeric: 'tabular-nums' }}>{revenue}</span>
            </div>
          )}
          {tracks && (
            <div style={{ padding: '3px 9px', background: `${color}12`, border: `1px solid ${color}22`, borderRadius: '6px' }}>
              <span style={{ fontSize: '9px', color: '#555', display: 'block' }}>Tracks</span>
              <span style={{ fontSize: '12px', fontWeight: 900, color: color, fontVariantNumeric: 'tabular-nums' }}>{tracks}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

/* ─── Zigzag Connector ───────────────────────────────────────────── */
const ZigzagConnector = ({ fromSide, active, color }: { fromSide: 'left' | 'right'; active: boolean; color: string }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const pRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const draw = () => {
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      // Static dashed path
      const startX = fromSide === 'left' ? w * 0.25 : w * 0.75;
      const endX = fromSide === 'left' ? w * 0.75 : w * 0.25;
      const midY = h * 0.5;

      ctx.strokeStyle = 'rgba(255,255,255,0.06)';
      ctx.lineWidth = 1.5;
      ctx.setLineDash([4, 6]);
      ctx.beginPath();
      ctx.moveTo(startX, 0);
      ctx.bezierCurveTo(startX, midY, endX, midY, endX, h);
      ctx.stroke();
      ctx.setLineDash([]);

      if (active) {
        pRef.current = (pRef.current + 0.018) % 1;
        const p = pRef.current;

        // Animated particle along bezier
        const t = p;
        const bx = (1 - t) * (1 - t) * (1 - t) * startX
          + 3 * (1 - t) * (1 - t) * t * startX
          + 3 * (1 - t) * t * t * endX
          + t * t * t * endX;
        const by = (1 - t) * (1 - t) * (1 - t) * 0
          + 3 * (1 - t) * (1 - t) * t * midY
          + 3 * (1 - t) * t * t * midY
          + t * t * t * h;

        // Glowing dot
        const dotGlow = ctx.createRadialGradient(bx, by, 0, bx, by, 10);
        dotGlow.addColorStop(0, color);
        dotGlow.addColorStop(0.4, `${color}80`);
        dotGlow.addColorStop(1, 'transparent');
        ctx.fillStyle = dotGlow;
        ctx.beginPath();
        ctx.arc(bx, by, 10, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.arc(bx, by, 3.5, 0, Math.PI * 2);
        ctx.fillStyle = '#fff';
        ctx.shadowBlur = 8;
        ctx.shadowColor = color;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      animRef.current = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(animRef.current);
  }, [fromSide, active, color]);

  return (
    <canvas
      ref={canvasRef}
      width={400}
      height={56}
      style={{ width: '100%', height: '56px', display: 'block' }}
    />
  );
};

/* ─── Pipeline Video Logger — 3-Panel Layout ─────────────────────── */
const PipelineVideoLogger = ({ activeStep, visible }: { activeStep: number; visible: boolean }) => {
  const centerCanvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const tRef = useRef(0);
  const [mounted, setMounted] = useState(false);

  const fbDeliveries = useIncrementingNumber(4820000, 380, 350);
  const igDeliveries = useIncrementingNumber(3640000, 290, 400);
  const waDeliveries = useIncrementingNumber(2910000, 220, 450);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const canvas = centerCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    interface AudioFile {
      x: number; y: number; vy: number; vx: number;
      label: string; scanned: boolean; scanProg: number;
      destColor: string; destName: string; size: number;
      wavePhase: number;
    }

    const files: AudioFile[] = [];
    const fileNames = ['track.mp3', 'beat.wav', 'vocal.mp3', 'remix.wav', 'master.mp3', 'mix.wav', 'audio.mp3'];
    const platforms = [
      { name: 'FB', color: '#1877F2' },
      { name: 'IG', color: '#E1306C' },
      { name: 'WA', color: '#25D366' },
    ];

    const spawn = () => {
      const p = platforms[Math.floor(Math.random() * platforms.length)];
      files.push({
        x: 20 + Math.random() * 30,
        y: 20 + Math.random() * (canvas.offsetHeight - 40),
        vx: 0.8 + Math.random() * 0.6,
        vy: (Math.random() - 0.5) * 0.3,
        label: fileNames[Math.floor(Math.random() * fileNames.length)],
        scanned: false, scanProg: 0,
        destColor: p.color, destName: p.name,
        size: 28 + Math.random() * 12,
        wavePhase: Math.random() * Math.PI * 2,
      });
    };

    for (let i = 0; i < 6; i++) {
      spawn();
      files[i].x = 20 + Math.random() * (canvas.offsetWidth * 0.7);
    }

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
      tRef.current += 0.025;
      const t = tRef.current;

      ctx.fillStyle = 'rgba(4,4,12,0.9)';
      ctx.fillRect(0, 0, w, h);

      ctx.strokeStyle = 'rgba(100,50,255,0.04)';
      ctx.lineWidth = 0.5;
      for (let x = 0; x < w; x += 50) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke(); }
      for (let y = 0; y < h; y += 40) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke(); }

      const scanCX = w * 0.5;
      const scanCY = h * 0.5;
      const scanR = Math.min(w, h) * 0.32;

      const scanGlow = ctx.createRadialGradient(scanCX, scanCY, 0, scanCX, scanCY, scanR * 1.4);
      scanGlow.addColorStop(0, 'rgba(100,50,255,0.15)');
      scanGlow.addColorStop(0.5, 'rgba(100,50,255,0.05)');
      scanGlow.addColorStop(1, 'transparent');
      ctx.fillStyle = scanGlow;
      ctx.beginPath(); ctx.arc(scanCX, scanCY, scanR * 1.4, 0, Math.PI * 2); ctx.fill();

      for (let r = 1; r <= 12; r++) {
        const radius = (r / 12) * scanR * 0.9;
        const alpha = 0.08 + Math.sin(t * 1.2 - r * 0.5) * 0.05;
        ctx.beginPath();
        for (let s = 0; s <= 200; s++) {
          const angle = (s / 200) * Math.PI * 2;
          const wave = Math.sin(angle * (5 + r * 0.3) + t * 0.6 + r * 0.4) * (r * 0.4);
          const rr = radius + wave;
          const px = scanCX + rr * Math.cos(angle);
          const py = scanCY + rr * Math.sin(angle);
          if (s === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
        }
        ctx.closePath();
        ctx.strokeStyle = `rgba(100,50,255,${alpha})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      ctx.save(); ctx.translate(scanCX, scanCY); ctx.rotate(t * 2);
      const sweep = ctx.createLinearGradient(0, 0, scanR, 0);
      sweep.addColorStop(0, 'rgba(100,50,255,0)');
      sweep.addColorStop(0.6, 'rgba(100,50,255,0.2)');
      sweep.addColorStop(1, 'rgba(100,50,255,0.6)');
      ctx.beginPath(); ctx.moveTo(0, 0); ctx.arc(0, 0, scanR, -0.5, 0.5); ctx.closePath();
      ctx.fillStyle = sweep; ctx.fill(); ctx.restore();

      const scanLineY = scanCY + Math.sin(t * 2.5) * scanR * 0.7;
      const sl = ctx.createLinearGradient(scanCX - scanR, scanLineY, scanCX + scanR, scanLineY);
      sl.addColorStop(0, 'transparent'); sl.addColorStop(0.3, 'rgba(100,50,255,0.5)');
      sl.addColorStop(0.5, 'rgba(150,100,255,0.9)'); sl.addColorStop(0.7, 'rgba(100,50,255,0.5)'); sl.addColorStop(1, 'transparent');
      ctx.fillStyle = sl; ctx.fillRect(scanCX - scanR, scanLineY - 1.5, scanR * 2, 3);

      ctx.beginPath(); ctx.arc(scanCX, scanCY, scanR, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(100,50,255,0.3)'; ctx.lineWidth = 1.5; ctx.stroke();

      const bSize = scanR * 0.15;
      [[scanCX - scanR * 0.88, scanCY - scanR * 0.88, 1, 1],
       [scanCX + scanR * 0.88, scanCY - scanR * 0.88, -1, 1],
       [scanCX + scanR * 0.88, scanCY + scanR * 0.88, -1, -1],
       [scanCX - scanR * 0.88, scanCY + scanR * 0.88, 1, -1]].forEach(([bx, by, sx, sy]) => {
        ctx.strokeStyle = '#6432ff'; ctx.lineWidth = 2; ctx.shadowBlur = 6; ctx.shadowColor = '#6432ff';
        ctx.beginPath(); ctx.moveTo(bx as number, (by as number) + (sy as number) * bSize);
        ctx.lineTo(bx as number, by as number); ctx.lineTo((bx as number) + (sx as number) * bSize, by as number); ctx.stroke();
        ctx.shadowBlur = 0;
      });

      ctx.beginPath(); ctx.arc(scanCX, scanCY, 5, 0, Math.PI * 2);
      ctx.fillStyle = '#6432ff'; ctx.shadowBlur = 12; ctx.shadowColor = '#6432ff'; ctx.fill(); ctx.shadowBlur = 0;

      ctx.fillStyle = 'rgba(100,50,255,0.8)'; ctx.font = 'bold 9px monospace'; ctx.textAlign = 'center';
      ctx.fillText('FINGERPRINT SCANNER', scanCX, scanCY + scanR + 16);

      for (let i = files.length - 1; i >= 0; i--) {
        const f = files[i];
        f.x += f.vx;
        f.y += f.vy;
        if (f.y < 10 || f.y > h - 10) f.vy *= -1;

        const fx = f.x;
        const fy = f.y;
        const dx = fx - scanCX;
        const dy = fy - scanCY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < scanR * 1.1 && !f.scanned) f.scanned = true;
        if (f.scanned && f.scanProg < 1) f.scanProg = Math.min(1, f.scanProg + 0.03);

        if (f.x > w + 20) { files.splice(i, 1); spawn(); continue; }

        const fw = f.size + 8;
        const fh = f.size + 16;
        ctx.fillStyle = f.scanned ? `${f.destColor}20` : 'rgba(255,255,255,0.04)';
        ctx.strokeStyle = f.scanned ? f.destColor : 'rgba(255,255,255,0.15)';
        ctx.lineWidth = 1.5;
        if (f.scanned) { ctx.shadowBlur = 8; ctx.shadowColor = f.destColor; }
        ctx.beginPath(); ctx.roundRect(fx - fw / 2, fy - fh / 2, fw, fh, 5); ctx.fill(); ctx.stroke();
        ctx.shadowBlur = 0;

        const barCount = 5;
        for (let b = 0; b < barCount; b++) {
          const bx = fx - fw / 2 + 4 + b * (fw - 8) / (barCount - 1);
          const barH = (3 + Math.sin(t * 4 + f.wavePhase + b * 0.8) * 3) * (f.scanned ? 1.5 : 0.7);
          ctx.fillStyle = f.scanned ? f.destColor : 'rgba(255,255,255,0.3)';
          ctx.fillRect(bx - 1.5, fy - barH / 2, 3, barH);
        }

        ctx.fillStyle = f.scanned ? f.destColor : '#555';
        ctx.font = 'bold 7px monospace'; ctx.textAlign = 'center';
        ctx.fillText(f.label, fx, fy + fh / 2 - 3);

        if (f.scanned && f.scanProg > 0) {
          ctx.fillStyle = 'rgba(0,0,0,0.5)';
          ctx.fillRect(fx - fw / 2, fy + fh / 2 + 2, fw, 3);
          ctx.fillStyle = f.destColor;
          ctx.shadowBlur = 4; ctx.shadowColor = f.destColor;
          ctx.fillRect(fx - fw / 2, fy + fh / 2 + 2, fw * f.scanProg, 3);
          ctx.shadowBlur = 0;
        }

        if (dist < scanR * 2.5 && dist > scanR * 0.9) {
          const la = Math.max(0, 1 - dist / (scanR * 2.5)) * 0.6;
          ctx.beginPath(); ctx.moveTo(fx, fy); ctx.lineTo(scanCX, scanCY);
          ctx.strokeStyle = `rgba(100,50,255,${la})`; ctx.lineWidth = 0.8;
          ctx.setLineDash([3, 6]); ctx.stroke(); ctx.setLineDash([]);
        }
      }

      animRef.current = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(animRef.current); window.removeEventListener('resize', setSize); };
  }, []);

  const formatM = (n: number) => (n / 1000000).toFixed(2) + 'M';

  return (
    <div
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(32px)',
        transition: 'all 0.7s ease-out 0.6s',
        border: '1.5px solid rgba(100,50,255,0.3)',
        borderRadius: '16px',
        overflow: 'hidden',
        background: 'rgba(4,4,12,0.95)',
        boxShadow: '0 0 60px rgba(100,50,255,0.1), 0 24px 64px rgba(0,0,0,0.5)',
      }}
    >
      {/* Header */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: '12px', padding: '14px 24px',
        background: 'rgba(100,50,255,0.08)', borderBottom: '1px solid rgba(100,50,255,0.2)',
      }}>
        <div style={{ display: 'flex', gap: '6px' }}>
          {['#ff5f57', '#febc2e', '#28c840'].map(c => (
            <div key={c} style={{ width: '10px', height: '10px', borderRadius: '50%', background: c }} />
          ))}
        </div>
        <span style={{ color: '#fff', fontWeight: 800, fontSize: '13px', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
          PIPELINE VIDEO LOGGER &amp; VISUALIZER
        </span>
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '4px 10px', background: 'rgba(100,50,255,0.15)', border: '1px solid rgba(100,50,255,0.3)', borderRadius: '6px' }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#6432ff', boxShadow: '0 0 8px #6432ff', animation: 'pipelinePulse 1s ease-in-out infinite', display: 'inline-block' }} />
            <span style={{ color: '#a07aff', fontSize: '11px', fontWeight: 700 }}>LIVE SCANNING</span>
          </div>
        </div>
      </div>

      {/* 3-Panel Layout */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr 1fr', minHeight: '340px' }}>
        {/* LEFT PANEL */}
        <div style={{
          borderRight: '1px solid rgba(100,50,255,0.15)',
          padding: '20px 16px',
          background: 'rgba(255,140,66,0.03)',
          display: 'flex', flexDirection: 'column', gap: '12px',
        }}>
          <div style={{ textAlign: 'center', marginBottom: '4px' }}>
            <div style={{ fontSize: '10px', fontWeight: 700, color: '#ff8c42', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '4px' }}>SOURCE</div>
            <div style={{ fontSize: '12px', fontWeight: 800, color: '#fff' }}>Artists &amp; Record Labels</div>
          </div>
          {[
            { name: 'Artist A', files: '24 tracks', color: '#ff8c42' },
            { name: 'Label B', files: '87 tracks', color: '#e85d26' },
            { name: 'Artist C', files: '12 tracks', color: '#ffb347' },
            { name: 'Label D', files: '156 tracks', color: '#ff6b35' },
          ].map((a, i) => (
            <div key={a.name} style={{
              padding: '8px 10px',
              background: `${a.color}10`,
              border: `1px solid ${a.color}25`,
              borderRadius: '8px',
              display: 'flex', alignItems: 'center', gap: '8px',
              animation: `slideRight 0.5s ease-out ${i * 0.15}s both`,
            }}>
              <div style={{ width: '28px', height: '28px', borderRadius: '6px', background: `${a.color}25`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={a.color} strokeWidth="2">
                  <path d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2z"/>
                </svg>
              </div>
              <div>
                <div style={{ fontSize: '11px', fontWeight: 700, color: '#ddd' }}>{a.name}</div>
                <div style={{ fontSize: '9px', color: a.color }}>{a.files}</div>
              </div>
              <div style={{ marginLeft: 'auto' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={a.color} strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </div>
            </div>
          ))}
          <div style={{ marginTop: 'auto', padding: '8px', background: 'rgba(255,140,66,0.08)', border: '1px solid rgba(255,140,66,0.2)', borderRadius: '8px', textAlign: 'center' }}>
            <div style={{ fontSize: '9px', color: '#888', marginBottom: '2px' }}>Sending to Scanner</div>
            <div style={{ fontSize: '11px', fontWeight: 800, color: '#ff8c42' }}>→ AUDIO FILES →</div>
          </div>
        </div>

        {/* CENTER PANEL */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
          <canvas ref={centerCanvasRef} className="absolute inset-0 w-full h-full" style={{ display: 'block' }} />
          <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', padding: '16px' }}>
            <div style={{ fontSize: '9px', fontWeight: 700, color: '#a07aff', letterSpacing: '0.15em', marginBottom: '8px', textTransform: 'uppercase' }}>
              KARHARI MEDIA FINGERPRINT SYSTEM
            </div>
            <div style={{ fontSize: '10px', color: '#6432ff', fontFamily: 'monospace', marginTop: '8px' }}>
              SCANNING ALL AUDIO FILES...
            </div>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div style={{
          borderLeft: '1px solid rgba(100,50,255,0.15)',
          padding: '20px 16px',
          background: 'rgba(24,119,242,0.03)',
          display: 'flex', flexDirection: 'column', gap: '12px',
        }}>
          <div style={{ textAlign: 'center', marginBottom: '4px' }}>
            <div style={{ fontSize: '10px', fontWeight: 700, color: '#4da6ff', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '4px' }}>DELIVERY</div>
            <div style={{ fontSize: '12px', fontWeight: 800, color: '#fff' }}>Platform Distribution</div>
          </div>
          {[
            { name: 'Facebook', icon: <FacebookIcon size={16} />, color: '#1877F2', count: formatM(fbDeliveries) },
            { name: 'Instagram', icon: <InstagramIcon size={16} />, color: '#E1306C', count: formatM(igDeliveries) },
            { name: 'WhatsApp', icon: <WhatsAppIcon size={16} />, color: '#25D366', count: formatM(waDeliveries) },
          ].map((p, i) => (
            <div key={p.name} style={{
              padding: '10px 12px',
              background: `${p.color}10`,
              border: `1px solid ${p.color}30`,
              borderRadius: '8px',
              boxShadow: `0 0 16px ${p.color}10`,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                <div style={{ width: '28px', height: '28px', borderRadius: '6px', background: p.color, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: `0 4px 12px ${p.color}50` }}>
                  <div style={{ color: '#fff' }}>{p.icon}</div>
                </div>
                <div>
                  <div style={{ fontSize: '11px', fontWeight: 700, color: '#ddd' }}>{p.name}</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: p.color, display: 'inline-block', animation: 'pipelinePulse 1.2s ease-in-out infinite' }} />
                    <span style={{ fontSize: '9px', color: p.color }}>Live</span>
                  </div>
                </div>
              </div>
              <div style={{ fontSize: '14px', fontWeight: 900, color: p.color, fontVariantNumeric: 'tabular-nums' }}>{p.count}</div>
              <div style={{ fontSize: '9px', color: '#555', marginTop: '2px' }}>Total Deliveries</div>
              <div style={{ marginTop: '6px', height: '2px', background: 'rgba(255,255,255,0.05)', borderRadius: '2px', overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${60 + i * 15}%`, background: p.color, borderRadius: '2px', animation: 'scanProgress 2.5s ease-in-out infinite' }} />
              </div>
            </div>
          ))}
          <div style={{ marginTop: 'auto', padding: '8px', background: 'rgba(24,119,242,0.08)', border: '1px solid rgba(24,119,242,0.2)', borderRadius: '8px', textAlign: 'center' }}>
            <div style={{ fontSize: '9px', color: '#888', marginBottom: '2px' }}>Total Delivered</div>
            <div style={{ fontSize: '12px', fontWeight: 900, color: '#4da6ff', fontVariantNumeric: 'tabular-nums' }}>
              {formatM(fbDeliveries + igDeliveries + waDeliveries)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ─── Main Section ───────────────────────────────────────────────── */
export default function PipelineSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

  const fbTracks = useIncrementingNumber(1284000, 340, 380);
  const igTracks = useIncrementingNumber(987000, 260, 420);
  const waTracks = useIncrementingNumber(743000, 200, 470);
  const totalRevenue = useIncrementingNumber(12400000, 5200, 280);
  const artistPayout = useIncrementingNumber(9800000, 3900, 300);
  const fpCount = useIncrementingNumber(8700000, 420, 350);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.05 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;
    const interval = setInterval(() => setActiveStep(prev => (prev + 1) % 7), 1400);
    return () => clearInterval(interval);
  }, [visible]);

  const fmt = (n: number) => (n / 1000000).toFixed(3) + 'M';
  const fmtRev = (n: number) => '$' + (n / 1000000).toFixed(3) + 'M';

  // Zigzag sides: 1=left, 2=right, 3=left, 4=right, 5=left, 6=right, 7=left
  const steps = [
    {
      id: 'artists', step: 1, title: 'Artists & Record Labels', subtitle: 'Music Submission',
      description: 'Artists and record labels submit their complete music catalog — audio files, metadata, and ownership documentation — to Karhari Media for rights management.',
      icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2z"/></svg>,
      color: '#ff8c42', tracks: fmt(fbTracks + igTracks + waTracks), side: 'left' as const,
    },
    {
      id: 'karhari', step: 2, title: 'Karhari Media', subtitle: 'Review & Verification',
      description: 'Karhari Media reviews ownership, verifies audio quality, and runs the Asset Audio File Scanner across every track before distribution.',
      icon: null, color: '#e85d26', isKarhari: true, tracks: fmt(fbTracks + igTracks), side: 'right' as const,
    },
    {
      id: 'facebook', step: 3, title: 'Facebook Rights Manager', subtitle: 'Fingerprinting & Distribution',
      description: 'Facebook Rights Manager generates unique acoustic fingerprints for every track and distributes music across all Meta platforms with full copyright protection.',
      icon: <FacebookIcon size={22} />, color: '#1877F2', isFacebook: true, tracks: fmt(fpCount), side: 'left' as const,
    },
    {
      id: 'platforms', step: 4, title: 'Facebook · Instagram · WhatsApp', subtitle: 'Content Distribution',
      description: 'Music reaches 3 billion+ users. Every use in videos, reels, stories, and status updates is tracked, fingerprinted, and monetized automatically.',
      icon: <div style={{ display: 'flex', gap: '3px' }}><FacebookIcon size={13} /><InstagramIcon size={13} /><WhatsAppIcon size={13} /></div>,
      color: '#4da6ff', tracks: fmt(fbTracks), side: 'right' as const,
    },
    {
      id: 'revenue', step: 5, title: 'Revenue Collection', subtitle: 'Ad Revenue Collected',
      description: 'Facebook collects all ad revenue generated from music usage across Facebook, Instagram, and WhatsApp. Every play is tracked and monetized in real time.',
      icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#25D366" strokeWidth="1.5"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>,
      color: '#25D366', revenue: fmtRev(totalRevenue), side: 'left' as const,
    },
    {
      id: 'karhari2', step: 6, title: 'Karhari Media', subtitle: 'Revenue Distribution',
      description: 'Facebook transfers collected revenue to Karhari Media. Karhari Media processes royalty statements and prepares distributions for all rights holders.',
      icon: null, color: '#e85d26', isKarhari: true, revenue: fmtRev(totalRevenue * 0.85), side: 'right' as const,
    },
    {
      id: 'payout', step: 7, title: 'Artists & Record Labels', subtitle: 'Monthly Royalty Payout',
      description: 'Artists and record labels receive monthly royalty payments with full breakdowns by platform, track, and content type. Transparent, on-time, every month.',
      icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg>,
      color: '#ff8c42', revenue: fmtRev(artistPayout), side: 'left' as const,
    },
  ];

  return (
    <section id="pipeline" ref={sectionRef} style={{ position: 'relative', overflow: 'hidden', padding: '100px 0 120px' }}>
      {/* Animated background */}
      <PipelineBg />

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 1, maxWidth: '960px', margin: '0 auto', padding: '0 24px' }}>

        {/* Header */}
        <div style={{
          textAlign: 'center', marginBottom: '64px',
          opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(28px)',
          transition: 'all 0.7s cubic-bezier(0.34,1.56,0.64,1)',
        }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            padding: '6px 16px', borderRadius: '100px', marginBottom: '20px',
            background: 'rgba(100,50,255,0.12)', border: '1px solid rgba(100,50,255,0.3)',
          }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#6432ff', boxShadow: '0 0 8px #6432ff', animation: 'pipelinePulse 1.2s ease-in-out infinite', display: 'inline-block' }} />
            <span style={{ fontSize: '11px', fontWeight: 700, color: '#a07aff', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Distribution Pipeline</span>
          </div>
          <h2 style={{
            fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: 900, lineHeight: 1.1,
            letterSpacing: '-0.03em', color: '#fff', margin: '0 0 16px',
          }}>
            From Artist to
            <br />
            <span style={{
              background: 'linear-gradient(135deg, #ff8c42 0%, #e85d26 30%, #6432ff 65%, #1877F2 100%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>
              Revenue Pipeline
            </span>
          </h2>
          <p style={{ color: '#666', fontSize: '16px', lineHeight: 1.6, maxWidth: '560px', margin: '0 auto' }}>
            A complete step-by-step animated pipeline showing how Karhari Media distributes music through Facebook Rights Manager and delivers revenue to artists and record labels.
          </p>
        </div>

        {/* Live counters */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '56px',
          opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(20px)',
          transition: 'all 0.6s ease-out 0.2s',
        }}>
          {[
            { label: 'Facebook Tracks', icon: <FacebookIcon size={16} />, color: '#1877F2', count: fmt(fbTracks) },
            { label: 'Instagram Tracks', icon: <InstagramIcon size={16} />, color: '#E1306C', count: fmt(igTracks) },
            { label: 'WhatsApp Tracks', icon: <WhatsAppIcon size={16} />, color: '#25D366', count: fmt(waTracks) },
          ].map(p => (
            <div key={p.label} style={{
              display: 'flex', alignItems: 'center', gap: '12px', padding: '14px 16px',
              background: `${p.color}0a`, border: `1px solid ${p.color}25`, borderRadius: '10px',
              boxShadow: `0 0 24px ${p.color}08`,
            }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: p.color, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: `0 4px 16px ${p.color}50`, color: '#fff' }}>
                {p.icon}
              </div>
              <div>
                <div style={{ fontSize: '16px', fontWeight: 900, color: p.color, fontVariantNumeric: 'tabular-nums' }}>{p.count}</div>
                <div style={{ fontSize: '11px', color: '#555' }}>{p.label}</div>
              </div>
              <div style={{ marginLeft: 'auto', width: '8px', height: '8px', borderRadius: '50%', background: p.color, boxShadow: `0 0 8px ${p.color}`, animation: 'pipelinePulse 1.5s ease-in-out infinite' }} />
            </div>
          ))}
        </div>

        {/* ── ZIGZAG Pipeline Steps ── */}
        <div style={{ position: 'relative' }}>
          {/* Center spine line */}
          <div style={{
            position: 'absolute', left: '50%', top: 0, bottom: 0,
            width: '1px',
            background: 'linear-gradient(180deg, transparent, rgba(100,50,255,0.15) 10%, rgba(100,50,255,0.15) 90%, transparent)',
            transform: 'translateX(-50%)',
            pointerEvents: 'none',
          }} />

          {steps.map((s, i) => (
            <React.Fragment key={s.id}>
              {/* Step card */}
              <ZigzagCard
                step={s.step}
                title={s.title}
                subtitle={s.subtitle}
                description={s.description}
                icon={s.icon}
                color={s.color}
                isActive={activeStep === i}
                isKarhari={s.isKarhari}
                isFacebook={s.isFacebook}
                visible={visible}
                delay={i * 0.09}
                revenue={s.revenue}
                tracks={s.tracks}
                side={s.side}
              />

              {/* Zigzag connector between steps */}
              {i < steps.length - 1 && (
                <ZigzagConnector
                  fromSide={s.side}
                  active={activeStep > i}
                  color={i < 2 ? '#e85d26' : i < 4 ? '#1877F2' : '#25D366'}
                />
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Pipeline Video Logger */}
        <div style={{ marginTop: '64px' }}>
          <PipelineVideoLogger activeStep={activeStep} visible={visible} />
        </div>

        {/* Bottom scanner boxes */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginTop: '24px',
          opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(24px)',
          transition: 'all 0.7s ease-out 0.8s',
        }}>
          {[
            {
              title: 'Asset Audio File Scanner',
              desc: 'Scans every audio file for quality, metadata, and copyright compliance before distribution.',
              icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#e85d26" strokeWidth="1.8"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/><path d="M11 8v6M8 11h6"/></svg>,
              color: '#e85d26', count: fmt(fbTracks + igTracks + waTracks), unit: 'Files Scanned',
            },
            {
              title: 'Copyright Fingerprint Engine',
              desc: 'Facebook Rights Manager creates unique acoustic fingerprints identifying music across billions of videos.',
              icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6432ff" strokeWidth="1.8"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg>,
              color: '#6432ff', count: fmt(fpCount), unit: 'Fingerprints',
            },
            {
              title: 'Revenue Monetization Engine',
              desc: 'Every music use generates ad revenue. Karhari Media collects from all Meta platforms and distributes to rights holders.',
              icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#25D366" strokeWidth="1.8"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>,
              color: '#25D366', count: fmtRev(totalRevenue), unit: 'Revenue',
            },
          ].map((box, bi) => (
            <div key={box.title} style={{
              padding: '18px', background: `${box.color}08`,
              border: `1.5px solid ${box.color}28`, borderRadius: '12px',
              boxShadow: `0 0 24px ${box.color}08`,
            }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', marginBottom: '10px' }}>
                <div style={{ width: '38px', height: '38px', borderRadius: '8px', background: `${box.color}18`, border: `1px solid ${box.color}35`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: `0 0 16px ${box.color}20` }}>
                  {box.icon}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '2px' }}>
                    <span style={{ fontSize: '12px', fontWeight: 800, color: '#ddd' }}>{box.title}</span>
                    <div style={{ width: '18px', height: '18px', borderRadius: '4px', background: box.color, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <svg width="9" height="9" viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-5" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </div>
                  </div>
                  <div style={{ fontSize: '16px', fontWeight: 900, color: box.color, fontVariantNumeric: 'tabular-nums' }}>{box.count}</div>
                  <div style={{ fontSize: '10px', color: '#555' }}>{box.unit}</div>
                </div>
              </div>
              <p style={{ fontSize: '11px', color: '#555', lineHeight: 1.5, margin: '0 0 10px' }}>{box.desc}</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ flex: 1, height: '3px', background: 'rgba(255,255,255,0.05)', borderRadius: '2px', overflow: 'hidden' }}>
                  <div style={{ height: '100%', background: `linear-gradient(90deg, ${box.color}60, ${box.color})`, borderRadius: '2px', animation: `scanProgress ${2 + bi * 0.3}s ease-in-out infinite` }} />
                </div>
                <span style={{ fontSize: '9px', color: box.color, fontWeight: 700, whiteSpace: 'nowrap' }}>● ACTIVE</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes pipelinePulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.3); }
        }
        @keyframes scanProgress {
          0% { width: 15%; }
          50% { width: 100%; }
          100% { width: 15%; }
        }
        @keyframes slideRight {
          from { opacity: 0; transform: translateX(-16px); }
          to { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </section>
  );
}
