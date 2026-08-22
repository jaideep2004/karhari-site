'use client';
import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

/* ─── Endless incrementing counter (never stops) ───────────────────────────── */
function useEndlessCounter(start: number, incrementPerSecond: number) {
  const [count, setCount] = useState(start);
  useEffect(() => {
    const interval = 50;
    const step = (incrementPerSecond * interval) / 1000;
    const id = setInterval(() => {
      setCount(c => c + step);
    }, interval);
    return () => clearInterval(id);
  }, [incrementPerSecond]);
  return Math.floor(count);
}

/* ─── Stable number formatter ──────────────────────────────────────────────── */
function fmtNum(n: number): string {
  const s = Math.floor(n).toString();
  let result = '';
  for (let i = 0; i < s.length; i++) {
    if (i > 0 && (s.length - i) % 3 === 0) result += ',';
    result += s[i];
  }
  return result;
}

/* ─── Gear SVG ─────────────────────────────────────────────────────────────── */
function Gear({ size, color, speed, reverse, children, glow }: {
  size: number; color: string; speed: number; reverse?: boolean; children?: React.ReactNode; glow?: boolean;
}) {
  const teeth = 14;
  const r = size / 2 - 5;
  const innerR = r * 0.70;
  const toothH = size * 0.10;
  const points: string[] = [];
  for (let i = 0; i < teeth; i++) {
    const a1 = (i / teeth) * 2 * Math.PI - Math.PI / 2;
    const a2 = a1 + (Math.PI / teeth) * 0.55;
    const a3 = a1 + (Math.PI / teeth) * 1.0;
    const a4 = a1 + (Math.PI / teeth) * 1.45;
    points.push(
      `${(innerR * Math.cos(a1)).toFixed(2)},${(innerR * Math.sin(a1)).toFixed(2)}`,
      `${((innerR + toothH) * Math.cos(a1 + (Math.PI / teeth) * 0.08)).toFixed(2)},${((innerR + toothH) * Math.sin(a1 + (Math.PI / teeth) * 0.08)).toFixed(2)}`,
      `${((innerR + toothH) * Math.cos(a2)).toFixed(2)},${((innerR + toothH) * Math.sin(a2)).toFixed(2)}`,
      `${((innerR + toothH) * Math.cos(a3)).toFixed(2)},${((innerR + toothH) * Math.sin(a3)).toFixed(2)}`,
      `${((innerR + toothH) * Math.cos(a4)).toFixed(2)},${((innerR + toothH) * Math.sin(a4)).toFixed(2)}`,
      `${(innerR * Math.cos(a4 + (Math.PI / teeth) * 0.08)).toFixed(2)},${(innerR * Math.sin(a4 + (Math.PI / teeth) * 0.08)).toFixed(2)}`
    );
  }
  const cx = size / 2, cy = size / 2;
  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      {glow && <div className="absolute inset-0 rounded-full" style={{ boxShadow: `0 0 ${size * 0.4}px ${color}60, 0 0 ${size * 0.8}px ${color}20` }} />}
      <svg width={size} height={size}
        style={{ animation: `${reverse ? 'yt-spin-r' : 'yt-spin'} ${speed}s linear infinite`, position: 'absolute', top: 0, left: 0 }}>
        <defs>
          <radialGradient id={`gearGrad-${size}-${color.replace('#','')}`} cx="40%" cy="35%" r="60%">
            <stop offset="0%" stopColor={color} stopOpacity="1" />
            <stop offset="100%" stopColor={color} stopOpacity="0.5" />
          </radialGradient>
        </defs>
        <polygon
          points={points.map(p => { const [x, y] = p.split(','); return `${parseFloat(x) + cx},${parseFloat(y) + cy}`; }).join(' ')}
          fill={`url(#gearGrad-${size}-${color.replace('#','')})`}
        />
        <circle cx={cx} cy={cy} r={innerR * 0.42} fill="#060610" />
        <circle cx={cx} cy={cy} r={innerR * 0.30} fill={color} opacity="0.15" />
        <circle cx={cx} cy={cy} r={innerR * 0.15} fill={color} opacity="0.4" />
      </svg>
      {children && (
        <div className="absolute inset-0 flex items-center justify-center z-10">{children}</div>
      )}
    </div>
  );
}

/* ─── YouTube Logo ─────────────────────────────────────────────────────────── */
function YTLogo({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={Math.round(size * 0.7)} viewBox="0 0 90 63" fill="none">
      <rect width="90" height="63" rx="13" fill="#FF0000" />
      <polygon points="36,16 36,47 62,31.5" fill="white" />
    </svg>
  );
}

/* ─── Karhari Logo ─────────────────────────────────────────────────────────── */
function KMLogo({ size = 32 }: { size?: number }) {
  return (
    <Image src="/assets/images/1608452013412__1_-1786434023986.png"
      alt="Karhari Media" width={Math.round(size * 2.6)} height={size} className="object-contain" />
  );
}

/* ─── Original Artist Icon SVG ─────────────────────────────────────────────── */
function ArtistIcon({ size = 40, color = '#D4F000' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
      {/* Head */}
      <circle cx="32" cy="14" r="9" fill={color} opacity="0.95" />
      {/* Shoulders / body */}
      <path d="M14 54 C14 40 50 40 50 54" fill={color} opacity="0.85" />
      {/* Microphone stand */}
      <rect x="29.5" y="32" width="5" height="11" rx="2.5" fill={color} opacity="0.8" />
      {/* Mic head */}
      <ellipse cx="32" cy="30" rx="4" ry="5" fill={color} opacity="0.9" />
      {/* Mic grille lines */}
      <line x1="28" y1="29" x2="36" y2="29" stroke="#060610" strokeWidth="1" opacity="0.5" />
      <line x1="28" y1="31" x2="36" y2="31" stroke="#060610" strokeWidth="1" opacity="0.5" />
      {/* Mic stand base */}
      <line x1="32" y1="43" x2="32" y2="48" stroke={color} strokeWidth="2" opacity="0.7" />
      <line x1="27" y1="48" x2="37" y2="48" stroke={color} strokeWidth="2.5" strokeLinecap="round" opacity="0.7" />
      {/* Music notes */}
      <text x="3" y="20" fontSize="9" fill={color} opacity="0.7">&#9834;</text>
      <text x="51" y="16" fontSize="8" fill={color} opacity="0.6">&#9835;</text>
      <text x="5" y="38" fontSize="7" fill={color} opacity="0.5">&#9833;</text>
    </svg>
  );
}

/* ─── Original Record Label / Music Company Icon SVG ───────────────────────── */
function RecordLabelIcon({ size = 40, color = '#8b00ff' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
      {/* Building facade */}
      <rect x="8" y="22" width="48" height="34" rx="2" fill={color} opacity="0.2" stroke={color} strokeWidth="1.5" />
      {/* Roof / pediment */}
      <polygon points="4,22 32,6 60,22" fill={color} opacity="0.55" />
      {/* Columns */}
      <rect x="14" y="30" width="4" height="26" rx="1" fill={color} opacity="0.4" />
      <rect x="30" y="30" width="4" height="26" rx="1" fill={color} opacity="0.4" />
      <rect x="46" y="30" width="4" height="26" rx="1" fill={color} opacity="0.4" />
      {/* Door */}
      <rect x="27" y="44" width="10" height="12" rx="1" fill={color} opacity="0.65" />
      {/* Vinyl record on building */}
      <circle cx="32" cy="36" r="7" stroke={color} strokeWidth="2" fill="none" opacity="0.8" />
      <circle cx="32" cy="36" r="4" stroke={color} strokeWidth="1.5" fill="none" opacity="0.6" />
      <circle cx="32" cy="36" r="1.5" fill={color} opacity="0.9" />
      {/* Sound waves */}
      <path d="M6 38 Q4 36 6 34" stroke={color} strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.5" />
      <path d="M58 38 Q60 36 58 34" stroke={color} strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.5" />
    </svg>
  );
}

/* ─── Original Business / Organization Icon SVG ────────────────────────────── */
function BusinessIcon({ size = 40, color = '#8b00ff' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
      {/* Main building */}
      <rect x="6" y="20" width="52" height="38" rx="3" fill={color} opacity="0.18" stroke={color} strokeWidth="1.8" />
      {/* Roof line */}
      <rect x="6" y="20" width="52" height="5" rx="2" fill={color} opacity="0.4" />
      {/* Windows row 1 */}
      <rect x="12" y="30" width="8" height="7" rx="1.5" fill={color} opacity="0.55" />
      <rect x="28" y="30" width="8" height="7" rx="1.5" fill={color} opacity="0.55" />
      <rect x="44" y="30" width="8" height="7" rx="1.5" fill={color} opacity="0.55" />
      {/* Windows row 2 */}
      <rect x="12" y="42" width="8" height="7" rx="1.5" fill={color} opacity="0.45" />
      <rect x="44" y="42" width="8" height="7" rx="1.5" fill={color} opacity="0.45" />
      {/* Door */}
      <rect x="26" y="46" width="12" height="12" rx="1.5" fill={color} opacity="0.7" />
      <circle cx="35" cy="52" r="1" fill="#060610" opacity="0.8" />
      {/* Flag / sign on top */}
      <line x1="32" y1="6" x2="32" y2="20" stroke={color} strokeWidth="2" opacity="0.7" />
      <polygon points="32,6 44,10 32,14" fill={color} opacity="0.8" />
      {/* Stars / org dots */}
      <circle cx="20" cy="14" r="1.5" fill={color} opacity="0.6" />
      <circle cx="32" cy="11" r="1.5" fill={color} opacity="0.6" />
      <circle cx="44" cy="14" r="1.5" fill={color} opacity="0.6" />
    </svg>
  );
}

/* ─── Approved Check Icon ──────────────────────────────────────────────────── */
function ApprovedIcon({ size = 48, color = '#00ff88' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
      <circle cx="32" cy="32" r="28" fill={color} opacity="0.15" stroke={color} strokeWidth="2.5" />
      <circle cx="32" cy="32" r="20" fill={color} opacity="0.1" />
      {/* Shield shape */}
      <path d="M32 10 L50 18 L50 34 C50 44 32 54 32 54 C32 54 14 44 14 34 L14 18 Z" fill={color} opacity="0.25" stroke={color} strokeWidth="1.5" />
      {/* Checkmark */}
      <path d="M22 32 L29 40 L44 24" stroke={color} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      {/* Sparkles */}
      <circle cx="10" cy="12" r="2" fill={color} opacity="0.7" />
      <circle cx="54" cy="16" r="1.5" fill={color} opacity="0.6" />
      <circle cx="8" cy="50" r="1.5" fill={color} opacity="0.5" />
      <circle cx="56" cy="48" r="2" fill={color} opacity="0.6" />
    </svg>
  );
}

/* ─── Under Review Clock Icon ──────────────────────────────────────────────── */
function ReviewIcon({ size = 48, color = '#ff6b00' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
      <circle cx="32" cy="32" r="28" fill={color} opacity="0.12" stroke={color} strokeWidth="2.5" />
      {/* Clock face */}
      <circle cx="32" cy="32" r="18" fill={color} opacity="0.15" stroke={color} strokeWidth="2" />
      {/* Clock ticks */}
      {[0,1,2,3,4,5,6,7,8,9,10,11].map(i => {
        const a = (i / 12) * Math.PI * 2 - Math.PI / 2;
        const r1 = i % 3 === 0 ? 13 : 15;
        const r2 = 17;
        return <line key={i} x1={32 + r1 * Math.cos(a)} y1={32 + r1 * Math.sin(a)} x2={32 + r2 * Math.cos(a)} y2={32 + r2 * Math.sin(a)} stroke={color} strokeWidth={i % 3 === 0 ? 2 : 1} opacity="0.7" />;
      })}
      {/* Hour hand */}
      <line x1="32" y1="32" x2="32" y2="20" stroke={color} strokeWidth="3" strokeLinecap="round" />
      {/* Minute hand */}
      <line x1="32" y1="32" x2="42" y2="32" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
      {/* Center dot */}
      <circle cx="32" cy="32" r="2.5" fill={color} />
      {/* Magnifier overlay */}
      <circle cx="46" cy="46" r="8" fill={color} opacity="0.2" stroke={color} strokeWidth="1.5" />
      <circle cx="46" cy="46" r="5" stroke={color} strokeWidth="1.5" fill="none" opacity="0.8" />
      <line x1="50" y1="50" x2="54" y2="54" stroke={color} strokeWidth="2" strokeLinecap="round" opacity="0.8" />
    </svg>
  );
}

/* ─── Rejected X Icon ──────────────────────────────────────────────────────── */
function RejectedIcon({ size = 48, color = '#FF0000' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
      <circle cx="32" cy="32" r="28" fill={color} opacity="0.12" stroke={color} strokeWidth="2.5" />
      <circle cx="32" cy="32" r="20" fill={color} opacity="0.1" />
      {/* Warning triangle */}
      <path d="M32 14 L52 48 L12 48 Z" fill={color} opacity="0.2" stroke={color} strokeWidth="1.5" strokeLinejoin="round" />
      {/* X mark */}
      <line x1="24" y1="26" x2="40" y2="42" stroke={color} strokeWidth="4" strokeLinecap="round" />
      <line x1="40" y1="26" x2="24" y2="42" stroke={color} strokeWidth="4" strokeLinecap="round" />
      {/* Corner dots */}
      <circle cx="10" cy="10" r="2" fill={color} opacity="0.6" />
      <circle cx="54" cy="10" r="2" fill={color} opacity="0.6" />
      <circle cx="10" cy="54" r="2" fill={color} opacity="0.5" />
      <circle cx="54" cy="54" r="2" fill={color} opacity="0.5" />
    </svg>
  );
}

/* ─── Invalid Reference Icon ───────────────────────────────────────────────── */
function InvalidIcon({ size = 48, color = '#FF0000' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
      <circle cx="32" cy="32" r="26" fill={color} opacity="0.12" stroke={color} strokeWidth="2" />
      {/* Warning triangle */}
      <path d="M32 12 L54 50 L10 50 Z" fill={color} opacity="0.2" stroke={color} strokeWidth="2" strokeLinejoin="round" />
      {/* Exclamation */}
      <rect x="29.5" y="24" width="5" height="14" rx="2.5" fill={color} opacity="0.9" />
      <circle cx="32" cy="44" r="3" fill={color} opacity="0.9" />
    </svg>
  );
}

/* ─── Ownership Conflict Icon ──────────────────────────────────────────────── */
function OwnershipIcon({ size = 48, color = '#ff6b00' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
      <circle cx="32" cy="32" r="26" fill={color} opacity="0.12" stroke={color} strokeWidth="2" />
      {/* Two overlapping circles (conflict) */}
      <circle cx="24" cy="32" r="12" fill={color} opacity="0.2" stroke={color} strokeWidth="1.5" />
      <circle cx="40" cy="32" r="12" fill={color} opacity="0.2" stroke={color} strokeWidth="1.5" />
      {/* Overlap highlight */}
      <path d="M32 22 Q38 27 38 32 Q38 37 32 42 Q26 37 26 32 Q26 27 32 22 Z" fill={color} opacity="0.35" />
      {/* Swords / conflict lines */}
      <line x1="20" y1="20" x2="44" y2="44" stroke={color} strokeWidth="2.5" strokeLinecap="round" opacity="0.8" />
      <line x1="44" y1="20" x2="20" y2="44" stroke={color} strokeWidth="2.5" strokeLinecap="round" opacity="0.8" />
    </svg>
  );
}

/* ─── Original / Clean Icon ────────────────────────────────────────────────── */
function OriginalIcon({ size = 48, color = '#00ff88' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
      <circle cx="32" cy="32" r="26" fill={color} opacity="0.12" stroke={color} strokeWidth="2" />
      {/* Star burst */}
      {[0,1,2,3,4,5,6,7].map(i => {
        const a = (i / 8) * Math.PI * 2;
        return <line key={i} x1={32 + 14 * Math.cos(a)} y1={32 + 14 * Math.sin(a)} x2={32 + 22 * Math.cos(a)} y2={32 + 22 * Math.sin(a)} stroke={color} strokeWidth="2" opacity="0.5" strokeLinecap="round" />;
      })}
      {/* Inner circle */}
      <circle cx="32" cy="32" r="12" fill={color} opacity="0.2" stroke={color} strokeWidth="2" />
      {/* Big checkmark */}
      <path d="M22 32 L29 40 L44 22" stroke={color} strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
      {/* Crown on top */}
      <path d="M20 18 L24 24 L32 18 L40 24 L44 18" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.8" />
    </svg>
  );
}

/* ─── Monetized Icon (Content ID + dollar) ─────────────────────────────────── */
function MonetizedIcon({ size = 48, color = '#00ff88' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
      <circle cx="32" cy="32" r="28" fill={color} opacity="0.12" stroke={color} strokeWidth="2.5" />
      <circle cx="32" cy="32" r="20" fill={color} opacity="0.08" />
      {/* Dollar sign */}
      <text x="22" y="40" fontSize="22" fontWeight="900" fill={color} opacity="0.95">$</text>
      {/* Outer ring rays */}
      {[0,1,2,3,4,5].map(i => {
        const a = (i / 6) * Math.PI * 2;
        return <line key={i} x1={32 + 22 * Math.cos(a)} y1={32 + 22 * Math.sin(a)} x2={32 + 26 * Math.cos(a)} y2={32 + 26 * Math.sin(a)} stroke={color} strokeWidth="2" opacity="0.5" strokeLinecap="round" />;
      })}
      {/* Content ID mark */}
      <text x="8" y="58" fontSize="7" fill={color} opacity="0.6">CID</text>
    </svg>
  );
}

/* ─── Blocked Icon (shield + ban) ──────────────────────────────────────────── */
function BlockedIcon({ size = 48, color = '#ff0055' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
      <circle cx="32" cy="32" r="28" fill={color} opacity="0.12" stroke={color} strokeWidth="2.5" />
      {/* Shield */}
      <path d="M32 10 L50 18 L50 34 C50 44 32 54 32 54 C32 54 14 44 14 34 L14 18 Z" fill={color} opacity="0.2" stroke={color} strokeWidth="1.8" strokeLinejoin="round" />
      {/* Ban slash */}
      <line x1="18" y1="18" x2="46" y2="46" stroke={color} strokeWidth="4" strokeLinecap="round" opacity="0.9" />
      {/* Corner dots */}
      <circle cx="8" cy="8" r="2" fill={color} opacity="0.5" />
      <circle cx="56" cy="8" r="2" fill={color} opacity="0.5" />
      <circle cx="8" cy="56" r="2" fill={color} opacity="0.5" />
      <circle cx="56" cy="56" r="2" fill={color} opacity="0.5" />
    </svg>
  );
}

/* ─── Unmonetized Icon (chart + pause) ─────────────────────────────────────── */
function UnmonetizedIcon({ size = 48, color = '#6b7280' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
      <circle cx="32" cy="32" r="28" fill={color} opacity="0.12" stroke={color} strokeWidth="2.5" />
      {/* Bar chart */}
      <rect x="14" y="36" width="8" height="14" rx="2" fill={color} opacity="0.5" />
      <rect x="26" y="28" width="8" height="22" rx="2" fill={color} opacity="0.6" />
      <rect x="38" y="20" width="8" height="30" rx="2" fill={color} opacity="0.7" />
      {/* Pause overlay */}
      <rect x="22" y="10" width="6" height="16" rx="2" fill={color} opacity="0.85" />
      <rect x="32" y="10" width="6" height="16" rx="2" fill={color} opacity="0.85" />
      {/* Pending dots */}
      <circle cx="20" cy="56" r="2" fill={color} opacity="0.6" />
      <circle cx="32" cy="56" r="2" fill={color} opacity="0.6" />
      <circle cx="44" cy="56" r="2" fill={color} opacity="0.6" />
    </svg>
  );
}

/* ─── Audio Waveform ───────────────────────────────────────────────────────── */
function Wave({ color, bars = 14 }: { color: string; bars?: number }) {
  return (
    <div className="flex items-center gap-[2px]" style={{ height: 32 }}>
      {Array.from({ length: bars }).map((_, i) => (
        <div key={i} className="w-[3px] rounded-full"
          style={{ background: color, height: `${16 + Math.sin(i * 0.9) * 12}px`, animation: `yt-wave ${0.55 + (i % 5) * 0.12}s ${i * 0.04}s ease-in-out infinite alternate` }} />
      ))}
    </div>
  );
}

/* ─── Scan Ring ────────────────────────────────────────────────────────────── */
function ScanRing({ color, size = 64 }: { color: string; size?: number }) {
  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      {[0, 1, 2].map(i => (
        <div key={i} className="absolute rounded-full border"
          style={{ width: size - i * 14, height: size - i * 14, borderColor: color, opacity: 0.7 - i * 0.2, animation: `yt-scan ${1.8 + i * 0.5}s ${i * 0.4}s ease-out infinite` }} />
      ))}
      <div className="rounded-full flex items-center justify-center"
        style={{ width: size * 0.44, height: size * 0.44, background: `${color}25`, border: `2px solid ${color}` }}>
        <svg width={size * 0.22} height={size * 0.22} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5">
          <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
        </svg>
      </div>
    </div>
  );
}

/* ─── Vertical Pipe ────────────────────────────────────────────────────────── */
function VPipe({ color = '#FF0000', height = 80 }: { color?: string; height?: number }) {
  return (
    <div className="flex flex-col items-center" style={{ height }}>
      <div className="w-[3px] flex-1 relative overflow-hidden rounded-full" style={{ background: `${color}25` }}>
        <div className="absolute top-0 left-0 w-full rounded-full"
          style={{ height: '35%', background: `linear-gradient(180deg, transparent, ${color}, transparent)`, animation: 'yt-flow-v 1.4s linear infinite' }} />
      </div>
      <svg width="12" height="10" viewBox="0 0 12 10"><polygon points="6,10 0,0 12,0" fill={color} opacity="0.8" /></svg>
    </div>
  );
}

/* ─── Horizontal Pipe ──────────────────────────────────────────────────────── */
function HPipe({ color = '#D4F000', width = 60, reverse }: { color?: string; width?: number; reverse?: boolean }) {
  return (
    <div className="flex items-center" style={{ width }}>
      {!reverse && <div className="flex-1 h-[3px] relative overflow-hidden rounded-full" style={{ background: `${color}25` }}>
        <div className="absolute top-0 left-0 h-full rounded-full"
          style={{ width: '35%', background: `linear-gradient(90deg, transparent, ${color}, transparent)`, animation: 'yt-flow-h 1.2s linear infinite' }} />
      </div>}
      {!reverse && <svg width="10" height="12" viewBox="0 0 10 12"><polygon points="10,6 0,0 0,12" fill={color} opacity="0.8" /></svg>}
      {reverse && <svg width="10" height="12" viewBox="0 0 10 12"><polygon points="0,6 10,0 10,12" fill={color} opacity="0.8" /></svg>}
      {reverse && <div className="flex-1 h-[3px] relative overflow-hidden rounded-full" style={{ background: `${color}25` }}>
        <div className="absolute top-0 right-0 h-full rounded-full"
          style={{ width: '35%', background: `linear-gradient(270deg, transparent, ${color}, transparent)`, animation: 'yt-flow-h-rev 1.2s linear infinite' }} />
      </div>}
    </div>
  );
}

/* ─── YT Revenue Particle (replaces dollar rain) ───────────────────────────── */
function YTRevenueBubble({ count = 10 }: { count?: number }) {
  const items = Array.from({ length: count });
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {items.map((_, i) => {
        const isYT = i % 3 !== 2;
        const left = 4 + i * 9;
        const delay = i * 0.32;
        const dur = 1.6 + (i % 4) * 0.4;
        return (
          <div key={i} className="absolute flex items-center justify-center"
            style={{ left: `${left}%`, animation: `yt-dollar ${dur}s ${delay}s linear infinite`, opacity: 0.85 }}>
            {isYT
              ? <YTLogo size={10} />
              : <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="#D4F000" strokeWidth="2"/><path d="M12 6v12M9 9.5c0-1.38 1.34-2.5 3-2.5s3 1.12 3 2.5-1.34 2.5-3 2.5-3 1.12-3 2.5 1.34 2.5 3 2.5 3-1.12 3-2.5" stroke="#D4F000" strokeWidth="2" strokeLinecap="round"/></svg>
            }
          </div>
        );
      })}
    </div>
  );
}

/* ─── Live Dot ─────────────────────────────────────────────────────────────── */
function LiveDot({ color = '#00ff88' }: { color?: string }) {
  return <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: color, animation: 'yt-blink 1.1s ease-in-out infinite', boxShadow: `0 0 6px ${color}` }} />;
}

/* ─── Pipeline Stage Box ───────────────────────────────────────────────────── */
function StageBox({ children, color, glow, className = '' }: { children: React.ReactNode; color: string; glow?: boolean; className?: string }) {
  return (
    <div className={`rounded-2xl border-2 relative overflow-hidden ${className}`}
      style={{ borderColor: `${color}50`, background: `${color}0d`, boxShadow: glow ? `0 0 40px ${color}35, 0 0 80px ${color}12` : undefined }}>
      <div className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{ background: `radial-gradient(ellipse at 30% 20%, ${color}18, transparent 65%)` }} />
      <div className="relative z-10">{children}</div>
    </div>
  );
}

/* ─── Fingerprint SVG ──────────────────────────────────────────────────────── */
function FingerprintIcon({ size = 40, color }: { size?: number; color: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      <path d="M50 10 C28 10 10 28 10 50" stroke={color} strokeWidth="4" strokeLinecap="round" opacity="0.9" />
      <path d="M50 20 C33 20 20 33 20 50 C20 62 26 72 35 79" stroke={color} strokeWidth="4" strokeLinecap="round" opacity="0.85" />
      <path d="M50 30 C38 30 30 38 30 50 C30 60 36 68 45 73" stroke={color} strokeWidth="4" strokeLinecap="round" opacity="0.8" />
      <path d="M50 40 C44 40 40 44 40 50 C40 56 44 61 50 63" stroke={color} strokeWidth="4" strokeLinecap="round" opacity="0.75" />
      <path d="M50 10 C72 10 90 28 90 50" stroke={color} strokeWidth="4" strokeLinecap="round" opacity="0.9" />
      <path d="M50 20 C67 20 80 33 80 50 C80 62 74 72 65 79" stroke={color} strokeWidth="4" strokeLinecap="round" opacity="0.85" />
      <path d="M50 30 C62 30 70 38 70 50 C70 60 64 68 55 73" stroke={color} strokeWidth="4" strokeLinecap="round" opacity="0.8" />
      <circle cx="50" cy="50" r="4" fill={color} opacity="0.9" />
    </svg>
  );
}

/* ─── Music Note Icon ──────────────────────────────────────────────────────── */
function MusicIcon({ size = 28, color }: { size?: number; color: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M9 18V5l12-2v13" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="6" cy="18" r="3" fill={color} opacity="0.9"/>
      <circle cx="18" cy="16" r="3" fill={color} opacity="0.9"/>
    </svg>
  );
}

/* ─── Dollar/Revenue Icon ──────────────────────────────────────────────────── */
function RevenueIcon({ size = 28, color }: { size?: number; color: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="2"/>
      <path d="M12 6v12M9 9.5c0-1.38 1.34-2.5 3-2.5s3 1.12 3 2.5-1.34 2.5-3 2.5-3 1.12-3 2.5 1.34 2.5 3 2.5 3-1.12 3-2.5" stroke={color} strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}

/* ─── Copyright Icon ───────────────────────────────────────────────────────── */
function CopyrightIcon({ size = 28, color }: { size?: number; color: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="2"/>
      <path d="M15 9.354a4 4 0 1 0 0 5.292" stroke={color} strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}

/* ─── Block/Shield Icon ────────────────────────────────────────────────────── */
function BlockIcon({ size = 28, color }: { size?: number; color: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="2"/>
      <path d="M4.93 4.93l14.14 14.14" stroke={color} strokeWidth="2.5" strokeLinecap="round"/>
    </svg>
  );
}

/* ─── Bangle/Ring gear child ───────────────────────────────────────────────── */
function GearRing({ size, color }: { size: number; color: string }) {
  const r = size * 0.32;
  const r2 = size * 0.22;
  const r3 = size * 0.12;
  return (
    <svg width={size * 0.7} height={size * 0.7} viewBox={`0 0 ${size} ${size}`} fill="none">
      <circle cx={size/2} cy={size/2} r={r} stroke={color} strokeWidth="3" opacity="0.9"/>
      <circle cx={size/2} cy={size/2} r={r2} stroke={color} strokeWidth="2" opacity="0.6"/>
      <circle cx={size/2} cy={size/2} r={r3} fill={color} opacity="0.5"/>
    </svg>
  );
}

/* ─── Border Laser Animation ───────────────────────────────────────────────── */
function LaserBorder({ color }: { color: string }) {
  return (
    <div className="absolute inset-0 rounded-2xl pointer-events-none overflow-hidden">
      {/* Top laser */}
      <div className="absolute top-0 left-0 h-[2px] w-full" style={{ background: `linear-gradient(90deg, transparent 0%, ${color} 50%, transparent 100%)`, animation: 'yt-laser-h 2s linear infinite' }} />
      {/* Bottom laser */}
      <div className="absolute bottom-0 left-0 h-[2px] w-full" style={{ background: `linear-gradient(90deg, transparent 0%, ${color} 50%, transparent 100%)`, animation: 'yt-laser-h-rev 2.3s linear infinite' }} />
      {/* Left laser */}
      <div className="absolute top-0 left-0 w-[2px] h-full" style={{ background: `linear-gradient(180deg, transparent 0%, ${color} 50%, transparent 100%)`, animation: 'yt-laser-v 1.8s linear infinite' }} />
      {/* Right laser */}
      <div className="absolute top-0 right-0 w-[2px] h-full" style={{ background: `linear-gradient(180deg, transparent 0%, ${color} 50%, transparent 100%)`, animation: 'yt-laser-v-rev 2.1s linear infinite' }} />
      {/* Corner sparks */}
      <div className="absolute top-0 left-0 w-3 h-3 rounded-full" style={{ background: color, opacity: 0.8, animation: 'yt-corner-spark 2s linear infinite', boxShadow: `0 0 8px ${color}` }} />
      <div className="absolute top-0 right-0 w-3 h-3 rounded-full" style={{ background: color, opacity: 0.8, animation: 'yt-corner-spark 2.3s 0.5s linear infinite', boxShadow: `0 0 8px ${color}` }} />
      <div className="absolute bottom-0 left-0 w-3 h-3 rounded-full" style={{ background: color, opacity: 0.8, animation: 'yt-corner-spark 1.8s 1s linear infinite', boxShadow: `0 0 8px ${color}` }} />
      <div className="absolute bottom-0 right-0 w-3 h-3 rounded-full" style={{ background: color, opacity: 0.8, animation: 'yt-corner-spark 2.1s 1.5s linear infinite', boxShadow: `0 0 8px ${color}` }} />
    </div>
  );
}

/* ─── Audio File Scanner Bar — YouTube Content ID Scanning Style ──────────── */
function AudioScannerBar({ tick }: { tick: number }) {
  const fileNames = [
    'YT-CID: track_001_master.wav', 'YT-CID: audio_fingerprint_A.mp3', 'YT-CID: content_id_scan_B.flac',
    'YT-CID: karhari_media_001.wav', 'YT-CID: yt_content_002.mp3', 'YT-CID: rights_verified_003.wav',
    'YT-CID: audio_scan_004.flac', 'YT-CID: fingerprint_005.mp3', 'YT-CID: master_track_006.wav',
    'YT-CID: content_007.flac', 'YT-CID: audio_008.mp3', 'YT-CID: scan_009.wav',
  ];
  const currentFile = fileNames[tick % fileNames.length];
  // Slower scan progress — cycles every 30 ticks instead of 20
  const scanProgress = (tick % 30) / 30;
  // Barcode-style scan segments
  const barcodeWidths = [3,1,2,1,4,1,2,3,1,2,1,3,2,1,4,2,1,3,1,2,4,1,2,1,3,2,1,4,1,2,3,1,2,1,4,2,1,3,2,1];

  return (
    <div className="w-full rounded-xl border border-red-500/40 bg-black/70 overflow-hidden" style={{ boxShadow: '0 0 24px #FF000030' }}>
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-white/5 bg-black/40">
        <div className="flex items-center gap-2">
          <YTLogo size={14} />
          <LiveDot color="#FF0000" />
          <span className="text-red-400 text-xs font-mono font-bold">YOUTUBE CONTENT ID SCANNING</span>
        </div>
        <div className="flex items-center gap-2">
          <LiveDot color="#00d4ff" />
          <span className="text-cyan-400 text-[10px] font-mono">{currentFile}</span>
        </div>
      </div>

      {/* Scanner track — YouTube Content ID barcode/fingerprint style */}
      <div className="relative h-16 bg-black/80 overflow-hidden">
        {/* Horizontal scan grid */}
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="absolute left-0 right-0 h-px opacity-8"
            style={{ top: `${i * 25}%`, background: '#FF0000' }} />
        ))}

        {/* YouTube Content ID barcode-style fingerprint bars */}
        <div className="absolute inset-0 flex items-center px-2 gap-[1px]">
          {barcodeWidths.map((w, i) => {
            const scanned = i / barcodeWidths.length < scanProgress;
            const active = Math.abs(i / barcodeWidths.length - scanProgress) < 0.08;
            const h = active ? 56 : (scanned ? 28 + (i % 3) * 8 : 16 + (i % 4) * 6);
            return (
              <div key={i} className="rounded-sm flex-shrink-0"
                style={{
                  width: `${w * 2}px`,
                  height: `${h}px`,
                  background: active
                    ? `linear-gradient(180deg, #ffffff, #FF0000, #ffffff)`
                    : scanned
                      ? `linear-gradient(180deg, #00ff88, #00d4ff)`
                      : `linear-gradient(180deg, #FF000080, #ff6b0060)`,
                  opacity: active ? 1 : scanned ? 0.85 : 0.45,
                  transition: 'height 0.15s ease, background 0.15s ease',
                  boxShadow: active ? '0 0 8px #FF0000' : 'none',
                }} />
            );
          })}
        </div>

        {/* YouTube Content ID scanner laser — slower sweep */}
        <div className="absolute top-0 bottom-0 w-[3px] rounded-full"
          style={{
            left: `${scanProgress * 100}%`,
            background: 'linear-gradient(180deg, transparent, #FF0000, #ffffff, #FF0000, transparent)',
            boxShadow: '0 0 10px #FF0000, 0 0 20px #FF000080',
          }} />

        {/* YT Content ID label overlay */}
        <div className="absolute bottom-1 left-2 flex items-center gap-1">
          <span className="text-[9px] font-mono text-green-400 opacity-80">
            {Math.floor(scanProgress * 100)}% scanned
          </span>
        </div>

        {/* File counter */}
        <div className="absolute bottom-1 right-2">
          <span className="text-[9px] font-mono text-cyan-400 opacity-80">
            FILE #{(tick % 12) + 1}/12
          </span>
        </div>
      </div>

      {/* Bottom status bar — YouTube Content ID stages */}
      <div className="flex items-center gap-3 px-4 py-1.5 bg-black/40 border-t border-white/5 overflow-hidden">
        {['YT-CID MATCH', 'FINGERPRINT DB', 'RIGHTS VERIFY', 'CONTENT REGISTER'].map((label, i) => (
          <div key={i} className="flex items-center gap-1 flex-shrink-0">
            <div className="w-1.5 h-1.5 rounded-full"
              style={{ background: tick % 4 === i ? '#FF0000' : '#ffffff30', boxShadow: tick % 4 === i ? '0 0 6px #FF0000' : 'none' }} />
            <span className="text-[9px] font-mono" style={{ color: tick % 4 === i ? '#FF0000' : '#ffffff40' }}>{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── ID Card with scanning animation ─────────────────────────────────────── */
function IDCard({ label, color, tick, index }: { label: string; color: string; tick: number; index: number }) {
  const idNumbers = [
    ['YT-AUD-2847391', 'YT-AUD-1938472', 'YT-AUD-3847291', 'YT-AUD-9283741'],
    ['YT-VID-8473920', 'YT-VID-2938471', 'YT-VID-7483920', 'YT-VID-1928374'],
    ['YT-MUS-3847201', 'YT-MUS-9283741', 'YT-MUS-4738291', 'YT-MUS-8374920'],
    ['YT-RGT-1928374', 'YT-RGT-8374920', 'YT-RGT-2938471', 'YT-RGT-7483920'],
    ['YT-CLM-4738291', 'YT-CLM-1928374', 'YT-CLM-8374920', 'YT-CLM-3847201'],
  ];
  const nums = idNumbers[index % idNumbers.length];
  const currentId = nums[(tick + index) % nums.length];
  const isActive = tick % 5 === index;

  return (
    <div className="flex flex-col items-center gap-2 relative"
      style={{ minWidth: 90 }}>
      {/* Scan ring around fingerprint */}
      <div className="relative flex items-center justify-center" style={{ width: 64, height: 64 }}>
        {/* Outer scan ring */}
        <div className="absolute rounded-full border-2"
          style={{
            width: 64, height: 64,
            borderColor: color,
            opacity: isActive ? 0.9 : 0.3,
            animation: `yt-scan ${1.5 + index * 0.3}s ${index * 0.2}s ease-out infinite`,
          }} />
        {/* Inner scan ring */}
        <div className="absolute rounded-full border"
          style={{
            width: 48, height: 48,
            borderColor: color,
            opacity: isActive ? 0.7 : 0.2,
            animation: `yt-scan ${2 + index * 0.3}s ${index * 0.3}s ease-out infinite`,
          }} />
        {/* Fingerprint */}
        <div style={{ animation: isActive ? `yt-icon-pulse 0.8s ease-in-out infinite` : 'none' }}>
          <FingerprintIcon size={36} color={color} />
        </div>
        {/* Laser scan line across fingerprint */}
        {isActive && (
          <div className="absolute left-0 right-0 h-[2px] rounded-full"
            style={{
              background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
              boxShadow: `0 0 8px ${color}`,
              animation: 'yt-fp-scan 1.8s linear infinite',
            }} />
        )}
      </div>

      {/* Label */}
      <span className="text-[10px] font-black tracking-wider" style={{ color }}>{label}</span>

      {/* Running ID number */}
      <div className="px-2 py-0.5 rounded bg-black/60 border text-center w-full"
        style={{ borderColor: `${color}40` }}>
        <span className="text-[8px] font-mono" style={{ color, animation: isActive ? 'yt-blink 0.4s ease-in-out infinite' : 'none' }}>
          {currentId}
        </span>
      </div>

      {/* Running numbers below */}
      <div className="flex flex-col gap-0.5 w-full">
        {[0, 1, 2].map(j => (
          <div key={j} className="text-[7px] font-mono text-center opacity-50"
            style={{ color, animation: `yt-data-stream ${1 + j * 0.3}s ${j * 0.2 + index * 0.1}s linear infinite` }}>
            {nums[(tick + j + index) % nums.length].slice(-8)}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════════
   MAIN PAGE
══════════════════════════════════════════════════════════════════════════════ */
export default function YouTubeContentIDPage() {
  const [tick, setTick] = useState(0);
  const [scanTick, setScanTick] = useState(0); // slow tick for navbar label
  const [fastTick, setFastTick] = useState(0); // fast tick for scanner bar

  // All counters start above 1 million and increment endlessly
  const tracksCount  = useEndlessCounter(1_284_739, 47);
  const revenueCount = useEndlessCounter(9_847_650, 183);
  const claimsCount  = useEndlessCounter(1_048_293, 31);
  const blockedCount = useEndlessCounter(1_003_847, 19);

  // Step 2 counters
  const approvedCount    = useEndlessCounter(2_184_739, 73);   // 2M+, always increasing fast
  const underReviewCount = useEndlessCounter(584_293, 29);      // 500K+
  const rejectedCount    = useEndlessCounter(1_047_382, 41);    // 1M+

  // Step 3 scan stats — millions
  const queuedCount     = useEndlessCounter(2_847_391, 89);
  const scanningCount   = useEndlessCounter(1_143_820, 53);
  const matchedCount    = useEndlessCounter(1_891_047, 67);
  const registeredCount = useEndlessCounter(3_203_847, 97);

  // Step 4 counters
  const originalCount   = useEndlessCounter(2_384_739, 83);    // 2M+
  const ownershipCount  = useEndlessCounter(847_293, 37);       // less
  const invalidCount    = useEndlessCounter(284_739, 19);       // least

  // Step 5 counters — millions scale, always running
  const monetizedCount   = useEndlessCounter(3_847_291, 127);  // 2-5M range, fast
  const blockedStep5Count = useEndlessCounter(847_293, 61);    // 10-20% range number
  const unmonetizedCount = useEndlessCounter(384_739, 43);     // 10-15% range number

  useEffect(() => {
    // Fast tick for scanner bar (moderate speed)
    const fastId = setInterval(() => setFastTick(t => t + 1), 180);
    // Slow tick for general animations
    const id = setInterval(() => setTick(t => t + 1), 300);
    // Very slow tick for navbar scan label (readable)
    const scanId = setInterval(() => setScanTick(t => t + 1), 2500);
    return () => { clearInterval(id); clearInterval(fastId); clearInterval(scanId); };
  }, []);

  const scanLabels = ['Scanning Audio...', 'Fingerprinting...', 'Matching Database...', 'Verifying Rights...', 'Processing Claims...', 'Registering...'];
  const currentScan = scanLabels[scanTick % scanLabels.length];

  // Global revenue node positions for the visualizer
  const globalNodes = [
    { x: 50, y: 50, label: 'CENTER', big: true },
    { x: 10, y: 15, label: 'USA' },
    { x: 30, y: 8, label: 'UK' },
    { x: 55, y: 5, label: 'EU' },
    { x: 75, y: 12, label: 'JP' },
    { x: 88, y: 25, label: 'KR' },
    { x: 92, y: 50, label: 'AU' },
    { x: 82, y: 72, label: 'IN' },
    { x: 65, y: 85, label: 'BR' },
    { x: 42, y: 90, label: 'MX' },
    { x: 20, y: 80, label: 'ZA' },
    { x: 8, y: 60, label: 'CA' },
    { x: 15, y: 40, label: 'FR' },
    { x: 38, y: 20, label: 'DE' },
    { x: 70, y: 35, label: 'CN' },
    { x: 60, y: 65, label: 'ID' },
    { x: 25, y: 55, label: 'NG' },
    { x: 48, y: 72, label: 'AR' },
  ];

  return (
    <div className="min-h-screen bg-[#060610] text-white overflow-x-hidden" style={{ fontFamily: "'DM Sans','Manrope',sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,600;0,9..40,700;0,9..40,800;0,9..40,900&display=swap');
        @keyframes yt-spin    { from { transform: rotate(0deg);   } to { transform: rotate(360deg);  } }
        @keyframes yt-spin-r  { from { transform: rotate(360deg); } to { transform: rotate(0deg);    } }
        @keyframes yt-flow-h  { 0%   { transform: translateX(-100%); } 100% { transform: translateX(350%); } }
        @keyframes yt-flow-h-rev { 0% { transform: translateX(350%); } 100% { transform: translateX(-100%); } }
        @keyframes yt-flow-v  { 0%   { transform: translateY(-100%); } 100% { transform: translateY(350%); } }
        @keyframes yt-wave    { from { transform: scaleY(0.35); } to { transform: scaleY(1); } }
        @keyframes yt-scan    { 0%   { transform: scale(0.75); opacity: 0.9; } 100% { transform: scale(1.7); opacity: 0; } }
        @keyframes yt-blink   { 0%,100% { opacity: 1; } 50% { opacity: 0.15; } }
        @keyframes yt-float   { 0%,100% { transform: translateY(0px); } 50% { transform: translateY(-10px); } }
        @keyframes yt-dollar  { 0% { top: -24px; opacity: 0; } 8% { opacity: 0.9; } 92% { opacity: 0.9; } 100% { top: 110%; opacity: 0; } }
        @keyframes yt-orbit   { from { transform: rotate(0deg) translateX(72px) rotate(0deg); } to { transform: rotate(360deg) translateX(72px) rotate(-360deg); } }
        @keyframes yt-orbit-s { from { transform: rotate(0deg) translateX(48px) rotate(0deg); } to { transform: rotate(360deg) translateX(48px) rotate(-360deg); } }
        @keyframes yt-pulse-border {
          0%,100% { box-shadow: 0 0 20px #FF000040, 0 0 40px #FF000015; }
          50%      { box-shadow: 0 0 40px #FF000070, 0 0 80px #FF000030; }
        }
        @keyframes yt-shimmer {
          0%   { background-position: -200% center; }
          100% { background-position:  200% center; }
        }
        @keyframes yt-grid-move { from { transform: translateY(0); } to { transform: translateY(60px); } }
        @keyframes yt-glow-text {
          0%,100% { text-shadow: 0 0 20px #FF000060; }
          50%      { text-shadow: 0 0 40px #FF0000, 0 0 80px #FF000060; }
        }
        @keyframes yt-data-stream {
          0%   { transform: translateY(-100%); opacity: 0; }
          10%  { opacity: 1; }
          90%  { opacity: 1; }
          100% { transform: translateY(100vh); opacity: 0; }
        }
        @keyframes yt-count-pulse {
          0%,100% { transform: scale(1); }
          50%      { transform: scale(1.04); }
        }
        @keyframes yt-box-glow-gold {
          0%,100% { box-shadow: 0 0 18px #D4F00040, 0 0 36px #D4F00015; }
          50%      { box-shadow: 0 0 32px #D4F00080, 0 0 64px #D4F00030; }
        }
        @keyframes yt-box-glow-purple {
          0%,100% { box-shadow: 0 0 18px #8b00ff40, 0 0 36px #8b00ff15; }
          50%      { box-shadow: 0 0 32px #8b00ff80, 0 0 64px #8b00ff30; }
        }
        @keyframes yt-box-glow-red {
          0%,100% { box-shadow: 0 0 18px #FF000040, 0 0 36px #FF000015; }
          50%      { box-shadow: 0 0 32px #FF000080, 0 0 64px #FF000030; }
        }
        @keyframes yt-box-glow-green {
          0%,100% { box-shadow: 0 0 18px #00ff8840, 0 0 36px #00ff8815, inset 0 0 20px #00ff8808; }
          50%      { box-shadow: 0 0 40px #00ff8880, 0 0 80px #00ff8830, inset 0 0 30px #00ff8815; }
        }
        @keyframes yt-box-glow-orange {
          0%,100% { box-shadow: 0 0 18px #ff6b0040, 0 0 36px #ff6b0015, inset 0 0 20px #ff6b0008; }
          50%      { box-shadow: 0 0 40px #ff6b0080, 0 0 80px #ff6b0030, inset 0 0 30px #ff6b0015; }
        }
        @keyframes yt-box-glow-pink {
          0%,100% { box-shadow: 0 0 18px #ff005540, 0 0 36px #ff005515; }
          50%      { box-shadow: 0 0 32px #ff005580, 0 0 64px #ff005530; }
        }
        @keyframes yt-box-glow-gray {
          0%,100% { box-shadow: 0 0 12px #6b728040, 0 0 24px #6b728015; }
          50%      { box-shadow: 0 0 24px #6b728060, 0 0 48px #6b728025; }
        }
        @keyframes yt-icon-pulse {
          0%,100% { transform: scale(1); filter: drop-shadow(0 0 6px currentColor); }
          50%      { transform: scale(1.12); filter: drop-shadow(0 0 14px currentColor); }
        }
        @keyframes yt-slide-in-left {
          0%   { transform: translateX(40px); opacity: 0; }
          100% { transform: translateX(0px); opacity: 1; }
        }
        @keyframes yt-laser-h {
          0%   { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        @keyframes yt-laser-h-rev {
          0%   { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
        @keyframes yt-laser-v {
          0%   { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
        @keyframes yt-laser-v-rev {
          0%   { transform: translateY(100%); }
          100% { transform: translateY(-100%); }
        }
        @keyframes yt-corner-spark {
          0%,100% { opacity: 0.9; transform: scale(1); }
          50%      { opacity: 0.3; transform: scale(0.5); }
        }
        @keyframes yt-fp-scan {
          0%   { top: 10%; }
          100% { top: 90%; }
        }
        @keyframes yt-num-roll {
          0%   { transform: translateY(0); opacity: 1; }
          45%  { transform: translateY(-100%); opacity: 0; }
          46%  { transform: translateY(100%); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
        @keyframes yt-review-spin {
          0%   { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes yt-revenue-flow {
          0%   { stroke-dashoffset: 200; opacity: 0.2; }
          50%  { opacity: 0.9; }
          100% { stroke-dashoffset: 0; opacity: 0.2; }
        }
        @keyframes yt-node-pulse {
          0%,100% { transform: scale(1) translate(-50%,-50%); opacity: 0.8; }
          50%      { transform: scale(1.3) translate(-38%,-38%); opacity: 1; }
        }
        @keyframes yt-globe-spin {
          0%   { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes yt-particle-fly {
          0%   { transform: translate(0,0) scale(1); opacity: 1; }
          100% { transform: translate(var(--tx), var(--ty)) scale(0); opacity: 0; }
        }
        @keyframes yt-cid-glow {
          0%,100% { box-shadow: 0 0 30px #FF000060, 0 0 60px #FF000030; }
          50%      { box-shadow: 0 0 60px #FF0000, 0 0 120px #FF000060; }
        }
        .yt-glow-red   { box-shadow: 0 0 30px #FF000050, 0 0 60px #FF000020; }
        .yt-glow-green { box-shadow: 0 0 30px #00ff8850, 0 0 60px #00ff8820; }
        .yt-glow-gold  { box-shadow: 0 0 30px #D4F00050, 0 0 60px #D4F00020; }
        .yt-glow-purple{ box-shadow: 0 0 30px #8b00ff50, 0 0 60px #8b00ff20; }
        .yt-shimmer-text {
          background: linear-gradient(90deg, #FF0000 0%, #ff6b00 25%, #D4F000 50%, #ff6b00 75%, #FF0000 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: yt-shimmer 3s linear infinite;
        }
        .yt-pipe-h {
          background: linear-gradient(90deg, transparent, #FF0000 40%, #D4F000 60%, transparent);
          background-size: 200% 100%;
          animation: yt-shimmer 2s linear infinite;
        }
        .yt-pipe-v {
          background: linear-gradient(180deg, transparent, #FF0000 40%, #D4F000 60%, transparent);
          background-size: 100% 200%;
          animation: yt-shimmer 2s linear infinite;
        }
        .yt-stat-num {
          animation: yt-count-pulse 1.8s ease-in-out infinite;
        }
        .yt-artist-box {
          animation: yt-box-glow-gold 2.5s ease-in-out infinite;
        }
        .yt-record-box {
          animation: yt-box-glow-purple 2.8s ease-in-out infinite;
        }
        .yt-km-center-box {
          animation: yt-box-glow-red 2s ease-in-out infinite;
        }

        /* ── RESPONSIVE GEAR VISUALIZER ── */
        .gear-visualizer {
          width: 300px;
          height: 300px;
        }
        @media (max-width: 480px) {
          .gear-visualizer {
            width: 220px;
            height: 220px;
            transform: scale(0.73);
            transform-origin: center center;
          }
        }
        @media (min-width: 481px) and (max-width: 767px) {
          .gear-visualizer {
            width: 260px;
            height: 260px;
          }
        }

        /* ── RESPONSIVE GLOBAL REVENUE VISUALIZER ── */
        .global-viz {
          height: 480px;
        }
        @media (max-width: 480px) {
          .global-viz {
            height: 320px;
          }
        }
        @media (min-width: 481px) and (max-width: 767px) {
          .global-viz {
            height: 380px;
          }
        }
        @media (min-width: 768px) and (max-width: 1023px) {
          .global-viz {
            height: 420px;
          }
        }

        /* ── STEP 1 PIPELINE — stack on mobile ── */
        .step1-pipeline {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
        }
        @media (min-width: 768px) {
          .step1-pipeline {
            flex-direction: row;
            justify-content: center;
            gap: 0;
          }
        }

        /* ── HIDE PIPES ON MOBILE ── */
        .pipe-connector {
          display: none;
        }
        @media (min-width: 768px) {
          .pipe-connector {
            display: flex;
          }
        }

        /* ── STEP 3 SCAN RINGS — wrap on small screens ── */
        .scan-rings-row {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 16px;
        }

        /* ── ID CARDS ROW — scroll on mobile ── */
        .id-cards-row {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 12px;
        }

        /* ── STEP 6 REVENUE FLOW — stack on mobile ── */
        .revenue-flow-row {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
        }
        @media (min-width: 768px) {
          .revenue-flow-row {
            flex-direction: row;
            justify-content: center;
            gap: 0;
          }
        }

        /* ── SCANNER BAR — overflow safe ── */
        .scanner-bar-wrap {
          overflow: hidden;
          width: 100%;
        }

        /* ── NAVBAR SCAN TEXT — hide on very small ── */
        @media (max-width: 360px) {
          .nav-scan-text { display: none; }
        }

        /* ── HERO BRAND ROW — stack on mobile ── */
        .hero-brand-row {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          align-items: center;
          gap: 12px;
        }

        /* ── PIPELINE SUMMARY STEPS — wrap ── */
        .pipeline-steps-wrap {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 6px;
        }

        /* ── POLICY CARDS — single col on mobile ── */
        .policy-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 16px;
        }
        @media (min-width: 768px) {
          .policy-grid {
            grid-template-columns: 1fr 1fr;
          }
        }

        /* ── STATS GRID — 2 col on mobile, 4 on desktop ── */
        .stats-grid-4 {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }
        @media (min-width: 768px) {
          .stats-grid-4 {
            grid-template-columns: repeat(4, 1fr);
          }
        }

        /* ── REVIEW GRID — 1 col mobile, 3 desktop ── */
        .review-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 16px;
        }
        @media (min-width: 640px) {
          .review-grid {
            grid-template-columns: 1fr 1fr;
          }
        }
        @media (min-width: 1024px) {
          .review-grid {
            grid-template-columns: 1fr 1fr 1fr;
          }
        }

        /* ── STEP 3 HEADER — stack on mobile ── */
        .step3-header {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
        }
        @media (min-width: 768px) {
          .step3-header {
            flex-direction: row;
          }
        }

        /* ── GLOBAL REVENUE HEADER — stack on mobile ── */
        .global-header {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
          text-align: center;
        }
        @media (min-width: 768px) {
          .global-header {
            flex-direction: row;
            flex-wrap: wrap;
            text-align: left;
          }
        }

        /* ── SUBMIT SECTION CARDS ── */
        .submit-cards-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 12px;
        }
        @media (min-width: 640px) {
          .submit-cards-grid {
            grid-template-columns: 1fr 1fr;
          }
        }
        @media (min-width: 1024px) {
          .submit-cards-grid {
            grid-template-columns: 1fr 1fr 1fr;
          }
        }

        /* ── INVALID REFS GRID ── */
        .invalid-refs-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 12px;
        }
        @media (min-width: 768px) {
          .invalid-refs-grid {
            grid-template-columns: 1fr 1fr 1fr;
          }
        }

        /* ── CHANNEL POLICY GRID ── */
        .channel-policy-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 16px;
        }
        @media (min-width: 768px) {
          .channel-policy-grid {
            grid-template-columns: 1fr 1fr;
          }
        }

        /* ── CONTENT ELIGIBILITY GRID ── */
        .eligibility-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 16px;
        }
        @media (min-width: 768px) {
          .eligibility-grid {
            grid-template-columns: 1fr 1fr;
          }
        }

        /* ── PARTNER BANNER — stack on mobile ── */
        .partner-banner {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
          text-align: center;
        }
        @media (min-width: 768px) {
          .partner-banner {
            flex-direction: row;
            text-align: left;
          }
        }

        /* ── SUBMIT CTA ROW ── */
        .submit-cta-row {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        @media (min-width: 768px) {
          .submit-cta-row {
            flex-direction: row;
            align-items: center;
          }
        }

        /* ── REVENUE FLOW ARROWS — hide on mobile ── */
        .revenue-arrow {
          display: none;
        }
        @media (min-width: 768px) {
          .revenue-arrow {
            display: flex;
          }
        }

        /* ── REVENUE FLOW LABELS — stack ── */
        .revenue-labels {
          display: flex;
          flex-direction: row;
          gap: 12px;
        }
        @media (max-width: 480px) {
          .revenue-labels {
            flex-direction: column;
            align-items: center;
          }
        }

        /* ── HERO GEAR PAIR — stack on mobile ── */
        .hero-gear-pair {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 24px;
          width: 100%;
        }
        @media (min-width: 768px) {
          .hero-gear-pair {
            flex-direction: row;
            justify-content: center;
            gap: 24px;
          }
        }

        /* ── GENERAL TEXT SCALING ── */
        @media (max-width: 480px) {
          .hero-title-text { font-size: 0.9rem !important; }
          .hero-shimmer-text { font-size: 1rem !important; }
          .step-label-text { font-size: 0.65rem !important; }
        }

        /* ── OVERFLOW PROTECTION ── */
        * { box-sizing: border-box; }
        .overflow-safe { overflow-x: hidden; max-width: 100%; }
      `}</style>

      {/* ══════════════════════════════════════════════════════════════════════
          HERO — IMMERSIVE GEAR VISUALIZER
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="relative min-h-screen flex flex-col items-center justify-center pt-14 overflow-hidden"
        style={{ background: 'radial-gradient(ellipse 120% 80% at 50% -10%, #1f0000 0%, #0a0010 45%, #060610 100%)' }}>

        {/* Animated grid background */}
        <div className="absolute inset-0 opacity-[0.07]"
          style={{ backgroundImage: 'linear-gradient(#FF0000 1px, transparent 1px), linear-gradient(90deg, #FF0000 1px, transparent 1px)', backgroundSize: '50px 50px', animation: 'yt-grid-move 8s linear infinite' }} />

        {/* Ambient orbs */}
        <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] rounded-full blur-[120px] opacity-15 pointer-events-none"
          style={{ background: 'radial-gradient(circle, #FF0000, transparent 70%)' }} />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full blur-[100px] opacity-10 pointer-events-none"
          style={{ background: 'radial-gradient(circle, #D4F000, transparent 70%)' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full blur-[150px] opacity-8 pointer-events-none"
          style={{ background: 'radial-gradient(circle, #8b00ff, transparent 70%)' }} />

        {/* Data stream lines */}
        {[15, 35, 55, 75, 90].map((left, i) => (
          <div key={i} className="absolute top-0 w-px opacity-20 pointer-events-none"
            style={{ left: `${left}%`, height: '100%', background: `linear-gradient(180deg, transparent, ${['#FF0000','#D4F000','#00ff88','#8b00ff','#00d4ff'][i]}, transparent)`, animation: `yt-data-stream ${4 + i * 1.2}s ${i * 0.8}s linear infinite` }} />
        ))}

        <div className="relative z-10 w-full max-w-6xl mx-auto px-3 sm:px-4 text-center">

          {/* ── BRAND ROW ── */}
          <div className="hero-brand-row mb-6 sm:mb-8 mt-2">
            <div className="flex-shrink-0 flex flex-col items-center gap-2">
              <div style={{ filter: 'drop-shadow(0 0 18px #FF000088)' }}>
                <YTLogo size={60} />
              </div>
            </div>
            <div className="flex flex-col items-center gap-1 px-3 sm:px-5 py-2 sm:py-3 rounded-xl border border-red-500/40 bg-red-900/15 backdrop-blur-sm"
              style={{ boxShadow: '0 0 24px #FF000030' }}>
              <span className="text-white text-xs sm:text-sm md:text-base font-black tracking-[0.12em] sm:tracking-[0.18em] uppercase text-center">Karhari Media YouTube Content ID</span>
            </div>
            <div className="flex-shrink-0 flex flex-col items-center gap-2">
              <div style={{ filter: 'drop-shadow(0 0 18px #FF000066)' }}>
                <KMLogo size={46} />
              </div>
            </div>
          </div>

          {/* ── TWO HERO TEXT BOXES + GEAR VISUALIZERS ── */}
          <div className="hero-gear-pair mb-6 sm:mb-8 max-w-5xl mx-auto">

            {/* LEFT: KARHARI MEDIA CONTENT ID PIPELINE box + KM gear below */}
            <div className="flex flex-col items-center gap-3 w-full sm:w-auto">
              <div className="w-full sm:w-auto px-4 sm:px-6 py-4 sm:py-5 rounded-2xl border border-red-500/40 bg-red-900/15 backdrop-blur-sm flex flex-col items-center justify-center gap-2 relative"
                style={{ boxShadow: '0 0 30px #FF000025' }}>
                <div className="absolute top-3 right-3 opacity-70">
                  <KMLogo size={18} />
                </div>
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-1.5 h-6 sm:h-8 rounded-full bg-red-500" style={{ boxShadow: '0 0 8px #FF0000' }} />
                  <span className="text-white text-lg sm:text-xl md:text-2xl font-black leading-tight tracking-tight hero-title-text">KARHARI MEDIA</span>
                </div>
                <span className="yt-shimmer-text text-base sm:text-lg md:text-xl font-black tracking-widest uppercase hero-shimmer-text">CONTENT ID PIPELINE</span>
              </div>

              {/* KM Gear Visualizer */}
              <div className="gear-visualizer relative flex items-center justify-center">
                <div className="absolute rounded-full border-2 border-red-500/30" style={{ width: '92%', height: '92%', animation: 'yt-spin 50s linear infinite' }} />
                <div className="absolute rounded-full border border-orange-400/20" style={{ width: '76%', height: '76%', animation: 'yt-spin-r 35s linear infinite' }} />
                <div className="absolute rounded-full border border-white/8" style={{ width: '59%', height: '59%', animation: 'yt-spin 22s linear infinite' }} />
                <div className="absolute rounded-full" style={{ width: '87%', height: '87%', border: '3px solid transparent', backgroundImage: 'linear-gradient(#060610,#060610), conic-gradient(#FF0000, #ff6b00, #D4F000, #ff6b00, #FF0000)', backgroundOrigin: 'border-box', backgroundClip: 'padding-box, border-box', animation: 'yt-spin-r 18s linear infinite' }} />
                <div className="absolute" style={{ top: '1.5%', left: '50%', transform: 'translateX(-50%)' }}>
                  <Gear size={52} color="#FF0000" speed={5} reverse glow><GearRing size={52} color="#FF0000" /></Gear>
                </div>
                <div className="absolute" style={{ bottom: '1.5%', left: '50%', transform: 'translateX(-50%)' }}>
                  <Gear size={52} color="#FF0000" speed={5} glow><GearRing size={52} color="#FF0000" /></Gear>
                </div>
                <div className="absolute" style={{ left: '1.5%', top: '50%', transform: 'translateY(-50%)' }}>
                  <Gear size={44} color="#ff6b00" speed={6} reverse><GearRing size={44} color="#ff6b00" /></Gear>
                </div>
                <div className="absolute" style={{ right: '1.5%', top: '50%', transform: 'translateY(-50%)' }}>
                  <Gear size={44} color="#ff6b00" speed={6}><GearRing size={44} color="#ff6b00" /></Gear>
                </div>
                <div className="absolute" style={{ top: '9%', left: '9%' }}>
                  <Gear size={36} color="#D4F000" speed={7} reverse><GearRing size={36} color="#D4F000" /></Gear>
                </div>
                <div className="absolute" style={{ top: '9%', right: '9%' }}>
                  <Gear size={36} color="#ff6b00" speed={7}><GearRing size={36} color="#ff6b00" /></Gear>
                </div>
                <div className="absolute" style={{ bottom: '9%', left: '9%' }}>
                  <Gear size={36} color="#ff6b00" speed={8} reverse><GearRing size={36} color="#ff6b00" /></Gear>
                </div>
                <div className="absolute" style={{ bottom: '9%', right: '9%' }}>
                  <Gear size={36} color="#D4F000" speed={8}><GearRing size={36} color="#D4F000" /></Gear>
                </div>
                <div className="relative z-20">
                  <Gear size={128} color="#FF0000" speed={15} glow>
                    <div className="flex items-center justify-center">
                      <KMLogo size={30} />
                    </div>
                  </Gear>
                </div>
                <div className="absolute bottom-1 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/70 border border-white/10 backdrop-blur-sm whitespace-nowrap">
                  <LiveDot />
                  <span className="text-green-400 text-[10px] font-mono font-bold">KM PIPELINE</span>
                </div>
              </div>
            </div>

            {/* RIGHT: Pipeline Overview box + YouTube gear below */}
            <div className="flex flex-col items-center gap-3 w-full sm:w-auto">
              <div className="w-full sm:w-auto px-4 sm:px-6 py-4 sm:py-5 rounded-2xl border border-yellow-400/30 bg-yellow-900/10 backdrop-blur-sm flex flex-col items-center justify-center gap-2 relative"
                style={{ boxShadow: '0 0 30px #D4F00015' }}>
                <div className="absolute top-3 right-3 opacity-80">
                  <YTLogo size={22} />
                </div>
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-1.5 h-6 sm:h-8 rounded-full bg-yellow-400" style={{ boxShadow: '0 0 8px #D4F000' }} />
                  <span className="text-[#D4F000] text-xs font-bold tracking-widest uppercase">Pipeline Overview</span>
                </div>
                <p className="text-gray-300 text-xs sm:text-sm leading-relaxed text-center">
                  Every audio file fingerprinted, scanned, and monetized through YouTube&apos;s Content ID system — from artist submission to revenue distribution.
                </p>
              </div>

              {/* YouTube Gear Visualizer */}
              <div className="gear-visualizer relative flex items-center justify-center">
                <div className="absolute rounded-full border-2 border-red-500/30" style={{ width: '92%', height: '92%', animation: 'yt-spin 50s linear infinite' }} />
                <div className="absolute rounded-full border border-cyan-400/20" style={{ width: '76%', height: '76%', animation: 'yt-spin-r 35s linear infinite' }} />
                <div className="absolute rounded-full border border-white/8" style={{ width: '59%', height: '59%', animation: 'yt-spin 22s linear infinite' }} />
                <div className="absolute rounded-full" style={{ width: '87%', height: '87%', border: '3px solid transparent', backgroundImage: 'linear-gradient(#060610,#060610), conic-gradient(#FF0000, #00d4ff, #ffffff, #00d4ff, #FF0000)', backgroundOrigin: 'border-box', backgroundClip: 'padding-box, border-box', animation: 'yt-spin-r 18s linear infinite' }} />
                <div className="absolute" style={{ top: '1.5%', left: '50%', transform: 'translateX(-50%)' }}>
                  <Gear size={52} color="#FF0000" speed={5} reverse glow><GearRing size={52} color="#FF0000" /></Gear>
                </div>
                <div className="absolute" style={{ bottom: '1.5%', left: '50%', transform: 'translateX(-50%)' }}>
                  <Gear size={52} color="#FF0000" speed={5} glow><GearRing size={52} color="#FF0000" /></Gear>
                </div>
                <div className="absolute" style={{ left: '1.5%', top: '50%', transform: 'translateY(-50%)' }}>
                  <Gear size={44} color="#00d4ff" speed={6} reverse><GearRing size={44} color="#00d4ff" /></Gear>
                </div>
                <div className="absolute" style={{ right: '1.5%', top: '50%', transform: 'translateY(-50%)' }}>
                  <Gear size={44} color="#00d4ff" speed={6}><GearRing size={44} color="#00d4ff" /></Gear>
                </div>
                <div className="absolute" style={{ top: '9%', left: '9%' }}>
                  <Gear size={36} color="#00d4ff" speed={7} reverse><GearRing size={36} color="#00d4ff" /></Gear>
                </div>
                <div className="absolute" style={{ top: '9%', right: '9%' }}>
                  <Gear size={36} color="#ffffff" speed={7}><GearRing size={36} color="#ffffff" /></Gear>
                </div>
                <div className="absolute" style={{ bottom: '9%', left: '9%' }}>
                  <Gear size={36} color="#ffffff" speed={8} reverse><GearRing size={36} color="#ffffff" /></Gear>
                </div>
                <div className="absolute" style={{ bottom: '9%', right: '9%' }}>
                  <Gear size={36} color="#00d4ff" speed={8}><GearRing size={36} color="#00d4ff" /></Gear>
                </div>
                <div className="relative z-20">
                  <Gear size={128} color="#FF0000" speed={15} glow>
                    <div className="flex items-center justify-center">
                      <YTLogo size={36} />
                    </div>
                  </Gear>
                </div>
                <div className="absolute bottom-1 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/70 border border-white/10 backdrop-blur-sm whitespace-nowrap">
                  <LiveDot color="#FF0000" />
                  <span className="text-red-400 text-[10px] font-mono font-bold">VIEW PIPELINE</span>
                </div>
              </div>
            </div>

          </div>

          {/* ── STATS BOXES ── */}
          <div className="stats-grid-4 max-w-3xl mx-auto mt-8 sm:mt-10">
            <div className="p-3 sm:p-4 rounded-xl border relative overflow-hidden"
              style={{ borderColor: '#00ff8840', background: '#00ff880d', boxShadow: '0 0 20px #00ff8820' }}>
              <div className="absolute inset-0 opacity-30 pointer-events-none"
                style={{ background: 'radial-gradient(circle at 30% 30%, #00ff8820, transparent 70%)' }} />
              <div className="flex items-center justify-center mb-2"><MusicIcon size={24} color="#00ff88" /></div>
              <div className="yt-stat-num text-lg sm:text-xl md:text-2xl font-black" style={{ color: '#00ff88' }}>{fmtNum(tracksCount)}</div>
              <div className="text-gray-500 text-[9px] sm:text-[10px] mt-0.5 font-medium">Tracks Registered</div>
            </div>
            <div className="p-3 sm:p-4 rounded-xl border relative overflow-hidden"
              style={{ borderColor: '#D4F00040', background: '#D4F0000d', boxShadow: '0 0 20px #D4F00020' }}>
              <div className="absolute inset-0 opacity-30 pointer-events-none"
                style={{ background: 'radial-gradient(circle at 30% 30%, #D4F00020, transparent 70%)' }} />
              <div className="flex items-center justify-center mb-2"><RevenueIcon size={24} color="#D4F000" /></div>
              <div className="yt-stat-num text-lg sm:text-xl md:text-2xl font-black" style={{ color: '#D4F000' }}>${fmtNum(revenueCount)}</div>
              <div className="text-gray-500 text-[9px] sm:text-[10px] mt-0.5 font-medium">Revenue Collected</div>
            </div>
            <div className="p-3 sm:p-4 rounded-xl border relative overflow-hidden"
              style={{ borderColor: '#FF000040', background: '#FF00000d', boxShadow: '0 0 20px #FF000020' }}>
              <div className="absolute inset-0 opacity-30 pointer-events-none"
                style={{ background: 'radial-gradient(circle at 30% 30%, #FF000020, transparent 70%)' }} />
              <div className="flex items-center justify-center mb-2"><CopyrightIcon size={24} color="#FF0000" /></div>
              <div className="yt-stat-num text-lg sm:text-xl md:text-2xl font-black" style={{ color: '#FF0000' }}>{fmtNum(claimsCount)}</div>
              <div className="text-gray-500 text-[9px] sm:text-[10px] mt-0.5 font-medium">Claims Processed</div>
            </div>
            <div className="p-3 sm:p-4 rounded-xl border relative overflow-hidden"
              style={{ borderColor: '#8b00ff40', background: '#8b00ff0d', boxShadow: '0 0 20px #8b00ff20' }}>
              <div className="absolute inset-0 opacity-30 pointer-events-none"
                style={{ background: 'radial-gradient(circle at 30% 30%, #8b00ff20, transparent 70%)' }} />
              <div className="flex items-center justify-center mb-2"><BlockIcon size={24} color="#8b00ff" /></div>
              <div className="yt-stat-num text-lg sm:text-xl md:text-2xl font-black" style={{ color: '#8b00ff' }}>{fmtNum(blockedCount)}</div>
              <div className="text-gray-500 text-[9px] sm:text-[10px] mt-0.5 font-medium">Blocked Violations</div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          PIPELINE SECTION
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="relative py-6 sm:py-8 overflow-hidden" style={{ background: 'linear-gradient(180deg, #060610 0%, #0a0018 100%)' }}>

        <div className="absolute left-0 top-0 bottom-0 w-1 opacity-60" style={{ background: 'linear-gradient(180deg, transparent, #FF0000, transparent)' }} />
        <div className="absolute right-0 top-0 bottom-0 w-1 opacity-60" style={{ background: 'linear-gradient(180deg, transparent, #D4F000, transparent)' }} />

        <div className="max-w-5xl mx-auto px-3 sm:px-4">

          {/* ── STEP 1 LABEL ── */}
          <div className="flex flex-col items-center mb-4">
            <div className="px-4 sm:px-5 py-1.5 rounded-full border border-yellow-400/30 bg-yellow-400/8 text-yellow-400 text-[10px] sm:text-xs font-bold tracking-widest uppercase step-label-text">
              STEP 1 — SUBMISSION
            </div>
          </div>

          {/* STEP 1 PIPELINE */}
          <div className="step1-pipeline mb-2">

            {/* ── ARTIST BOX ── */}
            <StageBox color="#D4F000" glow className="p-4 sm:p-5 w-full sm:w-52 flex flex-col items-center gap-3 yt-artist-box">
              <LaserBorder color="#D4F000" />
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center border-2 border-yellow-400/60 bg-yellow-400/10 relative"
                style={{ boxShadow: '0 0 20px #D4F00050' }}>
                <div className="absolute inset-0 rounded-full border-2 border-dashed border-yellow-400/30"
                  style={{ animation: 'yt-spin 8s linear infinite' }} />
                <div style={{ animation: 'yt-icon-pulse 2s ease-in-out infinite' }}>
                  <ArtistIcon size={36} color="#D4F000" />
                </div>
              </div>
              <div className="text-center">
                <p className="text-[#D4F000] font-black text-sm tracking-wider">ARTIST</p>
                <p className="text-gray-400 text-xs">Independent Creator</p>
              </div>
              <div className="flex justify-center w-full">
                <Wave color="#D4F000" bars={12} />
              </div>
              <div className="w-full py-1.5 rounded-lg bg-yellow-400/15 text-center border border-yellow-400/30 flex items-center justify-center gap-1.5"
                style={{ animation: 'yt-box-glow-gold 2.5s ease-in-out infinite' }}>
                <MusicIcon size={12} color="#D4F000" />
                <p className="text-[#D4F000] text-[10px] font-bold">Submits Audio File</p>
              </div>
            </StageBox>

            {/* Arrow: Artist → Karhari */}
            <div className="pipe-connector"><HPipe color="#D4F000" width={60} /></div>

            {/* Merge node */}
            <div className="hidden md:flex flex-col items-center gap-1">
              <div className="w-12 h-12 rounded-full border-2 border-white/20 bg-white/5 flex items-center justify-center"
                style={{ animation: 'yt-spin 6s linear infinite' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#D4F000" strokeWidth="2.5"><path d="M12 5v14M5 12h14" /></svg>
              </div>
              <p className="text-gray-600 text-[9px] font-bold tracking-widest">MERGE</p>
            </div>

            <div className="pipe-connector"><HPipe color="#FF0000" width={60} /></div>

            {/* ── KARHARI MEDIA CENTER BOX ── */}
            <StageBox color="#FF0000" glow className="p-4 sm:p-6 w-full sm:w-64 flex flex-col items-center gap-3 yt-km-center-box">
              <LaserBorder color="#FF0000" />
              <div className="flex flex-col items-center gap-2">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center border-2 border-red-500/60 bg-red-500/10 relative"
                  style={{ boxShadow: '0 0 30px #FF000060' }}>
                  <div className="absolute inset-0 rounded-full border-2 border-dashed border-red-400/30"
                    style={{ animation: 'yt-spin 10s linear infinite' }} />
                  <div className="absolute inset-0 rounded-full border border-red-500/20"
                    style={{ animation: 'yt-scan 2s ease-out infinite' }} />
                  <KMLogo size={36} />
                </div>
                <div className="text-center">
                  <p className="text-red-400 font-black text-sm sm:text-base tracking-wider">KARHARI MEDIA</p>
                  <p className="text-gray-400 text-xs">Private Limited — India</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <LiveDot />
                <span className="text-green-400 text-xs font-semibold">Receiving Submissions</span>
              </div>
              <div className="w-full grid grid-cols-2 gap-1.5">
                {['Audio Review','Ownership Check','Metadata Verify','Rights Docs'].map((t, i) => (
                  <div key={i} className="flex items-center gap-1 px-2 py-1 rounded-lg bg-red-500/10 border border-red-500/20">
                    <LiveDot color="#ff6b00" />
                    <span className="text-orange-300 text-[9px] font-semibold">{t}</span>
                  </div>
                ))}
              </div>
            </StageBox>

            {/* Arrow: Record Label → Karhari */}
            <div className="pipe-connector items-center" style={{ width: 60 }}>
              <svg width="10" height="12" viewBox="0 0 10 12"><polygon points="0,6 10,0 10,12" fill="#8b00ff" opacity="0.8" /></svg>
              <div className="flex-1 h-[3px] relative overflow-hidden rounded-full" style={{ background: '#8b00ff25' }}>
                <div className="absolute top-0 right-0 h-full rounded-full"
                  style={{ width: '35%', background: 'linear-gradient(270deg, transparent, #8b00ff, transparent)', animation: 'yt-flow-h-rev 1.2s linear infinite' }} />
              </div>
            </div>

            {/* Merge node 2 */}
            <div className="hidden md:flex flex-col items-center gap-1">
              <div className="w-12 h-12 rounded-full border-2 border-white/20 bg-white/5 flex items-center justify-center"
                style={{ animation: 'yt-spin-r 6s linear infinite' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#8b00ff" strokeWidth="2.5"><path d="M12 5v14M5 12h14" /></svg>
              </div>
              <p className="text-gray-600 text-[9px] font-bold tracking-widest">MERGE</p>
            </div>

            {/* Arrow: Record Label → merge node */}
            <div className="pipe-connector items-center" style={{ width: 60 }}>
              <svg width="10" height="12" viewBox="0 0 10 12"><polygon points="0,6 10,0 10,12" fill="#8b00ff" opacity="0.8" /></svg>
              <div className="flex-1 h-[3px] relative overflow-hidden rounded-full" style={{ background: '#8b00ff25' }}>
                <div className="absolute top-0 right-0 h-full rounded-full"
                  style={{ width: '35%', background: 'linear-gradient(270deg, transparent, #8b00ff, transparent)', animation: 'yt-flow-h-rev 1.2s linear infinite' }} />
              </div>
            </div>

            {/* ── RECORD LABEL BOX ── */}
            <StageBox color="#8b00ff" glow className="p-4 sm:p-5 w-full sm:w-52 flex flex-col items-center gap-3 yt-record-box">
              <LaserBorder color="#8b00ff" />
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center border-2 border-purple-500/60 bg-purple-500/10 relative"
                style={{ boxShadow: '0 0 20px #8b00ff50' }}>
                <div className="absolute inset-0 rounded-full border-2 border-dashed border-purple-400/30"
                  style={{ animation: 'yt-spin-r 8s linear infinite' }} />
                <div style={{ animation: 'yt-icon-pulse 2.2s ease-in-out infinite' }}>
                  <BusinessIcon size={36} color="#8b00ff" />
                </div>
              </div>
              <div className="text-center">
                <p className="text-purple-400 font-black text-sm tracking-wider">RECORD LABEL</p>
                <p className="text-gray-400 text-xs">Music Company</p>
              </div>
              <div className="flex justify-center w-full">
                <Wave color="#8b00ff" bars={12} />
              </div>
              <div className="w-full py-1.5 rounded-lg bg-purple-500/15 text-center border border-purple-500/30 flex items-center justify-center gap-1.5"
                style={{ animation: 'yt-box-glow-purple 2.8s ease-in-out infinite' }}>
                <BusinessIcon size={12} color="#8b00ff" />
                <p className="text-purple-400 text-[10px] font-bold">Submits Catalogue</p>
              </div>
            </StageBox>
          </div>

          {/* Pipe down */}
          <div className="flex justify-center my-2"><VPipe color="#FF0000" height={70} /></div>

          {/* ── STEP 2 LABEL ── */}
          <div className="flex flex-col items-center mb-4">
            <div className="px-4 sm:px-5 py-1.5 rounded-full border border-orange-400/30 bg-orange-400/8 text-orange-400 text-[10px] sm:text-xs font-bold tracking-widest uppercase step-label-text">
              STEP 2 — KARHARI MEDIA REVIEW
            </div>
          </div>

          {/* STEP 2 REVIEW OUTCOMES */}
          <div className="review-grid mb-4">

            {/* ── APPROVED ── */}
            <div className="rounded-2xl border-2 relative overflow-hidden p-4 sm:p-5 flex flex-col items-center gap-3"
              style={{ borderColor: '#00ff8850', background: '#00ff880d', animation: 'yt-box-glow-green 2.2s ease-in-out infinite' }}>
              <LaserBorder color="#00ff88" />
              <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 30% 20%, #00ff8818, transparent 65%)' }} />
              <div className="relative z-10 flex flex-col items-center gap-3 w-full">
                <div style={{ animation: 'yt-icon-pulse 2s ease-in-out infinite' }}><ApprovedIcon size={52} color="#00ff88" /></div>
                <p className="text-green-400 font-black text-base">APPROVED</p>
                <div className="text-center">
                  <div className="yt-stat-num text-xl sm:text-2xl font-black" style={{ color: '#00ff88' }}>{fmtNum(approvedCount)}</div>
                  <div className="text-green-600 text-[10px] font-bold">Approved Track File Number</div>
                </div>
                <p className="text-gray-400 text-xs text-center">Ownership confirmed. Audio quality passed. Forwarded to YouTube Content ID.</p>
                <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
                  <div className="h-full rounded-full bg-green-400" style={{ width: '78%', animation: 'yt-flow-h 3s linear infinite' }} />
                </div>
                <span className="text-green-400 text-xs font-bold">78% Approval Rate</span>
              </div>
            </div>

            {/* ── UNDER REVIEW ── */}
            <div className="rounded-2xl border-2 relative overflow-hidden p-4 sm:p-5 flex flex-col items-center gap-3"
              style={{ borderColor: '#ff6b0050', background: '#ff6b000d', animation: 'yt-box-glow-orange 2.5s ease-in-out infinite' }}>
              <LaserBorder color="#ff6b00" />
              <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 30% 20%, #ff6b0018, transparent 65%)' }} />
              <div className="relative z-10 flex flex-col items-center gap-3 w-full">
                <div style={{ animation: 'yt-review-spin 4s linear infinite' }}><ReviewIcon size={52} color="#ff6b00" /></div>
                <p className="text-orange-400 font-black text-base">UNDER REVIEW</p>
                <div className="text-center">
                  <div className="yt-stat-num text-xl sm:text-2xl font-black" style={{ color: '#ff6b00' }}>{fmtNum(underReviewCount)}</div>
                  <div className="text-orange-600 text-[10px] font-bold">Under Review File Number</div>
                </div>
                <p className="text-gray-400 text-xs text-center">Complex cases requiring additional verification. 24–48 hour review window.</p>
                <Gear size={48} color="#ff6b00" speed={6}><KMLogo size={12} /></Gear>
              </div>
            </div>

            {/* ── REJECTED ── */}
            <div className="rounded-2xl border-2 relative overflow-hidden p-4 sm:p-5 flex flex-col items-center gap-3"
              style={{ borderColor: '#FF000050', background: '#FF00000d', animation: 'yt-box-glow-red 2.8s ease-in-out infinite' }}>
              <LaserBorder color="#FF0000" />
              <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 30% 20%, #FF000018, transparent 65%)' }} />
              <div className="relative z-10 flex flex-col items-center gap-3 w-full">
                <div style={{ animation: 'yt-icon-pulse 1.8s ease-in-out infinite' }}><RejectedIcon size={52} color="#FF0000" /></div>
                <p className="text-red-400 font-black text-base">REJECTED</p>
                <div className="text-center">
                  <div className="yt-stat-num text-xl sm:text-2xl font-black" style={{ color: '#FF0000' }}>{fmtNum(rejectedCount)}</div>
                  <div className="text-red-600 text-[10px] font-bold">Rejected File Number</div>
                </div>
                <p className="text-gray-400 text-xs text-center">Incomplete docs, poor quality, or duplicate. Artist notified with reason code.</p>
                <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
                  <div className="h-full rounded-full bg-red-400" style={{ width: '22%' }} />
                </div>
                <span className="text-red-400 text-xs font-bold">22% Rejection Rate</span>
              </div>
            </div>
          </div>

          {/* Pipe down */}
          <div className="flex justify-center my-2"><VPipe color="#00ff88" height={70} /></div>

          {/* ── STEP 3 LABEL ── */}
          <div className="flex flex-col items-center mb-4">
            <div className="px-4 sm:px-5 py-1.5 rounded-full border border-red-500/30 bg-red-500/8 text-red-400 text-[10px] sm:text-xs font-bold tracking-widest uppercase flex items-center gap-2 step-label-text">
              <YTLogo size={14} /> STEP 3 — YOUTUBE CONTENT ID DELIVERY
            </div>
          </div>

          {/* STEP 3 */}
          <StageBox color="#FF0000" glow className="p-4 sm:p-8 mb-4 yt-glow-red">
            <LaserBorder color="#FF0000" />
            <div className="flex flex-col items-center gap-4 sm:gap-6">
              {/* Header */}
              <div className="step3-header w-full">
                <div className="flex items-center gap-3 px-4 py-3 rounded-xl border border-red-500/30 bg-red-900/20">
                  <KMLogo size={24} />
                  <div>
                    <p className="text-white font-bold text-sm">Karhari Media</p>
                    <p className="text-gray-400 text-xs">Approved Audio Batch</p>
                  </div>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <HPipe color="#FF0000" width={60} />
                  <span className="text-red-400 text-[9px] font-bold tracking-widest">DELIVERS TO</span>
                </div>
                <div className="flex items-center gap-3 px-4 py-3 rounded-xl border-2 border-red-500/60 bg-red-900/25"
                  style={{ boxShadow: '0 0 30px #FF000040' }}>
                  <YTLogo size={28} />
                  <div>
                    <p className="text-red-400 font-black text-sm sm:text-base">YouTube Content ID</p>
                    <p className="text-gray-400 text-xs">Global Fingerprint Database</p>
                  </div>
                </div>
              </div>

              {/* Fingerprint scanning engine */}
              <div className="w-full p-4 sm:p-6 rounded-2xl border border-red-500/20 bg-black/40">
                <div className="flex items-center justify-between mb-4 sm:mb-5 flex-wrap gap-3">
                  <div className="flex items-center gap-2">
                    <YTLogo size={20} />
                    <p className="text-red-400 font-black text-base sm:text-lg">FINGERPRINT SCANNING ENGINE</p>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/15 border border-green-500/30">
                    <LiveDot />
                    <span className="text-green-400 text-xs font-mono font-bold">{currentScan}</span>
                  </div>
                </div>

                {/* Scan rings row */}
                <div className="scan-rings-row mb-4 sm:mb-5">
                  {[
                    { label: 'Queued', count: queuedCount, color: '#00d4ff' },
                    { label: 'Scanning', count: scanningCount, color: '#D4F000' },
                    { label: 'Matched', count: matchedCount, color: '#ff6b00' },
                    { label: 'Registered', count: registeredCount, color: '#00ff88' },
                  ].map((item, i) => (
                    <div key={i} className="flex flex-col items-center gap-2">
                      <ScanRing color={item.color} size={56} />
                      <p className="yt-stat-num text-lg sm:text-xl font-black" style={{ color: item.color }}>{fmtNum(item.count)}</p>
                      <p className="text-gray-400 text-[10px] text-center">{item.label}</p>
                    </div>
                  ))}
                </div>

                {/* Audio Fingerprint Analyzing */}
                <div className="scanner-bar-wrap">
                  <AudioScannerBar tick={fastTick} />
                </div>
              </div>

              {/* ID Cards row */}
              <div className="w-full">
                <div className="id-cards-row px-1 sm:px-2">
                  {[
                    { label: 'AUDIO ID', color: '#FF0000' },
                    { label: 'VIDEO ID', color: '#D4F000' },
                    { label: 'MUSIC ID', color: '#00ff88' },
                    { label: 'RIGHTS ID', color: '#8b00ff' },
                    { label: 'CLAIM ID', color: '#00d4ff' },
                  ].map((item, i) => (
                    <IDCard key={i} label={item.label} color={item.color} tick={fastTick} index={i} />
                  ))}
                </div>
              </div>
            </div>
          </StageBox>

          {/* Pipe down */}
          <div className="flex justify-center my-2"><VPipe color="#FF0000" height={70} /></div>

          {/* ── STEP 4 LABEL ── */}
          <div className="flex flex-col items-center mb-4">
            <div className="px-4 sm:px-5 py-1.5 rounded-full border border-cyan-400/30 bg-cyan-400/8 text-cyan-400 text-[10px] sm:text-xs font-bold tracking-widest uppercase step-label-text">
              STEP 4 — SCAN RESULTS &amp; OUTCOMES
            </div>
          </div>

          {/* STEP 4 SCAN OUTCOMES */}
          <div className="review-grid mb-4">

            {/* ── INVALID REFERENCE ── */}
            <div className="rounded-2xl border-2 relative overflow-hidden p-4 sm:p-5 flex flex-col items-center gap-3"
              style={{ borderColor: '#FF000050', background: '#FF00000d', animation: 'yt-box-glow-red 2.5s ease-in-out infinite' }}>
              <LaserBorder color="#FF0000" />
              <div className="absolute bottom-3 left-3 opacity-60 z-20"><KMLogo size={14} /></div>
              <div className="absolute bottom-3 right-3 opacity-60 z-20"><YTLogo size={14} /></div>
              <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 30% 20%, #FF000018, transparent 65%)' }} />
              <div className="relative z-10 flex flex-col items-center gap-3 w-full">
                <div style={{ animation: 'yt-icon-pulse 2s ease-in-out infinite' }}><InvalidIcon size={52} color="#FF0000" /></div>
                <p className="text-red-400 font-black text-base">INVALID REFERENCE</p>
                <div className="text-center">
                  <div className="yt-stat-num text-xl sm:text-2xl font-black" style={{ color: '#FF0000' }}>{fmtNum(invalidCount)}</div>
                  <div className="text-red-600 text-[10px] font-bold">Invalid Claims Detected</div>
                </div>
                <p className="text-gray-400 text-xs text-center">Audio matches an existing Content ID reference. Flagged as invalid claim requiring dispute resolution.</p>
                <div className="w-full p-2 rounded-lg bg-red-500/10 border border-red-500/20">
                  <div className="flex items-center gap-2 mb-1"><LiveDot color="#FF0000" /><span className="text-red-300 text-[10px] font-bold">FLAGGED FOR REVIEW</span></div>
                  <Wave color="#FF0000" bars={10} />
                </div>
              </div>
            </div>

            {/* ── OWNERSHIP CONFLICT ── */}
            <div className="rounded-2xl border-2 relative overflow-hidden p-4 sm:p-5 flex flex-col items-center gap-3"
              style={{ borderColor: '#ff6b0050', background: '#ff6b000d', animation: 'yt-box-glow-orange 2.8s ease-in-out infinite' }}>
              <LaserBorder color="#ff6b00" />
              <div className="absolute bottom-3 left-3 opacity-60 z-20"><KMLogo size={14} /></div>
              <div className="absolute bottom-3 right-3 opacity-60 z-20"><YTLogo size={14} /></div>
              <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 30% 20%, #ff6b0018, transparent 65%)' }} />
              <div className="relative z-10 flex flex-col items-center gap-3 w-full">
                <div style={{ animation: 'yt-icon-pulse 2.2s ease-in-out infinite' }}><OwnershipIcon size={52} color="#ff6b00" /></div>
                <p className="text-orange-400 font-black text-base">OWNERSHIP CONFLICT</p>
                <div className="text-center">
                  <div className="yt-stat-num text-xl sm:text-2xl font-black" style={{ color: '#ff6b00' }}>{fmtNum(ownershipCount)}</div>
                  <div className="text-orange-600 text-[10px] font-bold">Ownership Disputes Active</div>
                </div>
                <p className="text-gray-400 text-xs text-center">Multiple parties claiming ownership. Content ID dispute process initiated between claimants.</p>
                <div className="w-full p-2 rounded-lg bg-orange-500/10 border border-orange-500/20">
                  <div className="flex items-center gap-2 mb-1"><LiveDot color="#ff6b00" /><span className="text-orange-300 text-[10px] font-bold">DISPUTE INITIATED</span></div>
                  <Wave color="#ff6b00" bars={10} />
                </div>
              </div>
            </div>

            {/* ── CLEAN & ORIGINAL ── */}
            <div className="rounded-2xl border-2 relative overflow-hidden p-4 sm:p-5 flex flex-col items-center gap-3"
              style={{ borderColor: '#00ff8850', background: '#00ff880d', animation: 'yt-box-glow-green 2s ease-in-out infinite' }}>
              <LaserBorder color="#00ff88" />
              <div className="absolute bottom-3 left-3 opacity-60 z-20"><KMLogo size={14} /></div>
              <div className="absolute bottom-3 right-3 opacity-60 z-20"><YTLogo size={14} /></div>
              <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 30% 20%, #00ff8818, transparent 65%)' }} />
              <div className="relative z-10 flex flex-col items-center gap-3 w-full">
                <div style={{ animation: 'yt-icon-pulse 1.8s ease-in-out infinite' }}><OriginalIcon size={52} color="#00ff88" /></div>
                <p className="text-green-400 font-black text-base">CLEAN &amp; ORIGINAL</p>
                <div className="text-center">
                  <div className="yt-stat-num text-xl sm:text-2xl font-black" style={{ color: '#00ff88' }}>{fmtNum(originalCount)}</div>
                  <div className="text-green-600 text-[10px] font-bold">Original Tracks Verified</div>
                </div>
                <p className="text-gray-400 text-xs text-center">No conflicts found. Audio is verified original. Registered in YouTube Content ID fingerprint database.</p>
                <div className="w-full p-2 rounded-lg bg-green-500/10 border border-green-500/20">
                  <div className="flex items-center gap-2 mb-1"><LiveDot /><span className="text-green-300 text-[10px] font-bold">FINGERPRINT REGISTERED</span></div>
                  <Wave color="#00ff88" bars={10} />
                </div>
              </div>
            </div>
          </div>

          {/* Pipe down */}
          <div className="flex justify-center my-2"><VPipe color="#00ff88" height={70} /></div>

          {/* STEP 5 LABEL */}
          <div className="flex flex-col items-center mb-4">
            <div className="px-4 sm:px-5 py-1.5 rounded-full border border-purple-400/30 bg-purple-400/8 text-purple-400 text-[10px] sm:text-xs font-bold tracking-widest uppercase step-label-text">
              STEP 5 — FINGERPRINT REGISTRATION &amp; MONETIZATION STATUS
            </div>
          </div>

          <div className="review-grid mb-4">

            {/* ── MONETIZED BOX ── */}
            <div className="rounded-2xl border-2 relative overflow-hidden p-4 sm:p-5 flex flex-col items-center gap-3"
              style={{ borderColor: '#00ff8860', background: '#00ff880d', animation: 'yt-box-glow-green 2s ease-in-out infinite' }}>
              <LaserBorder color="#00ff88" />
              <YTRevenueBubble count={10} />
              <div className="absolute top-3 left-3 opacity-70 z-20"><KMLogo size={16} /></div>
              <div className="absolute top-3 right-3 opacity-80 z-20"><YTLogo size={16} /></div>
              <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 50% 30%, #00ff8820, transparent 70%)' }} />
              <div className="relative z-10 flex flex-col items-center gap-3 w-full mt-4">
                <div className="relative flex items-center justify-center">
                  <div className="absolute rounded-full" style={{ width: 80, height: 80, background: '#00ff8815', animation: 'yt-scan 2.5s ease-out infinite' }} />
                  <div className="w-16 h-16 rounded-full flex items-center justify-center border-2 border-green-500/60 bg-green-500/15 relative"
                    style={{ boxShadow: '0 0 24px #00ff8860', animation: 'yt-box-glow-green 2s ease-in-out infinite' }}>
                    <div className="absolute inset-0 rounded-full border border-dashed border-green-400/30" style={{ animation: 'yt-spin 12s linear infinite' }} />
                    <MonetizedIcon size={40} color="#00ff88" />
                  </div>
                </div>
                <p className="text-green-400 font-black text-base tracking-wider">MONETIZED</p>
                <div className="text-center">
                  <div className="yt-stat-num text-2xl sm:text-3xl font-black" style={{ color: '#00ff88' }}>{fmtNum(monetizedCount)}</div>
                  <div className="text-green-600 text-[10px] font-bold tracking-wider">CONTENT ID ACTIVE — EARNING</div>
                </div>
                <div className="w-full">
                  <div className="flex justify-between mb-1">
                    <span className="text-green-400 text-[10px] font-bold">Monetization Rate</span>
                    <span className="text-green-400 text-[10px] font-bold">{Math.min(20, 10 + Math.floor((monetizedCount % 1000000) / 100000))}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: `${Math.min(20, 10 + Math.floor((monetizedCount % 1000000) / 100000))}%`, background: 'linear-gradient(90deg, #00ff88, #00d4ff)', animation: 'yt-flow-h 2s linear infinite' }} />
                  </div>
                  <p className="text-[9px] text-gray-500 mt-1 text-center">10–20% monetization range</p>
                </div>
                <p className="text-gray-400 text-xs text-center z-10">Content ID active. YouTube ads running. Revenue being collected and tracked in real-time.</p>
                <div className="w-full p-2 rounded-lg bg-green-500/10 border border-green-500/20 z-10">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-1"><LiveDot /><span className="text-green-300 text-[10px] font-bold">EARNING LIVE</span></div>
                    <div className="flex items-center gap-1"><YTLogo size={10} /><span className="text-green-400 text-[9px] font-mono">CID ACTIVE</span></div>
                  </div>
                  <Wave color="#00ff88" bars={14} />
                </div>
              </div>
            </div>

            {/* ── MONETIZE BLOCK BOX ── */}
            <div className="rounded-2xl border-2 relative overflow-hidden p-4 sm:p-5 flex flex-col items-center gap-3"
              style={{ borderColor: '#ff005560', background: '#ff00550d', animation: 'yt-box-glow-pink 2.3s ease-in-out infinite' }}>
              <LaserBorder color="#ff0055" />
              <YTRevenueBubble count={6} />
              <div className="absolute top-3 left-3 opacity-70 z-20"><KMLogo size={16} /></div>
              <div className="absolute top-3 right-3 opacity-80 z-20"><YTLogo size={16} /></div>
              <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 50% 30%, #ff005520, transparent 70%)' }} />
              <div className="relative z-10 flex flex-col items-center gap-3 w-full mt-4">
                <div className="relative flex items-center justify-center">
                  <div className="absolute rounded-full" style={{ width: 80, height: 80, background: '#ff005515', animation: 'yt-scan 3s ease-out infinite' }} />
                  <div className="w-16 h-16 rounded-full flex items-center justify-center border-2 border-pink-500/60 bg-pink-500/15 relative"
                    style={{ boxShadow: '0 0 24px #ff005560', animation: 'yt-box-glow-pink 2.3s ease-in-out infinite' }}>
                    <div className="absolute inset-0 rounded-full border border-dashed border-pink-400/30" style={{ animation: 'yt-spin-r 10s linear infinite' }} />
                    <BlockedIcon size={40} color="#ff0055" />
                  </div>
                </div>
                <p className="text-pink-400 font-black text-base tracking-wider">MONETIZE BLOCK</p>
                <div className="text-center">
                  <div className="yt-stat-num text-2xl sm:text-3xl font-black" style={{ color: '#ff0055' }}>{fmtNum(blockedStep5Count)}</div>
                  <div className="text-pink-600 text-[10px] font-bold tracking-wider">BLOCKED GLOBALLY</div>
                </div>
                <div className="w-full">
                  <div className="flex justify-between mb-1">
                    <span className="text-pink-400 text-[10px] font-bold">Block Rate</span>
                    <span className="text-pink-400 text-[10px] font-bold">{Math.min(20, 10 + Math.floor((blockedStep5Count % 500000) / 50000))}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: `${Math.min(20, 10 + Math.floor((blockedStep5Count % 500000) / 50000))}%`, background: 'linear-gradient(90deg, #ff0055, #ff6b00)', animation: 'yt-flow-h 2.5s linear infinite' }} />
                  </div>
                  <p className="text-[9px] text-gray-500 mt-1 text-center">10–20% block range</p>
                </div>
                <p className="text-gray-400 text-xs text-center z-10">Video blocked globally or in specific regions due to Content ID match. No revenue generated.</p>
                <div className="w-full p-2 rounded-lg bg-pink-500/10 border border-pink-500/20 z-10">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-1"><LiveDot color="#ff0055" /><span className="text-pink-300 text-[10px] font-bold">CONTENT BLOCKED</span></div>
                    <div className="flex items-center gap-1"><YTLogo size={10} /><span className="text-pink-400 text-[9px] font-mono">CID BLOCK</span></div>
                  </div>
                  <Wave color="#ff0055" bars={14} />
                </div>
              </div>
            </div>

            {/* ── UNMONETIZED BOX ── */}
            <div className="rounded-2xl border-2 relative overflow-hidden p-4 sm:p-5 flex flex-col items-center gap-3"
              style={{ borderColor: '#6b728060', background: '#6b72800d', animation: 'yt-box-glow-gray 2.6s ease-in-out infinite' }}>
              <LaserBorder color="#9ca3af" />
              <YTRevenueBubble count={5} />
              <div className="absolute top-3 left-3 opacity-70 z-20"><KMLogo size={16} /></div>
              <div className="absolute top-3 right-3 opacity-80 z-20"><YTLogo size={16} /></div>
              <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 50% 30%, #6b728018, transparent 70%)' }} />
              <div className="relative z-10 flex flex-col items-center gap-3 w-full mt-4">
                <div className="relative flex items-center justify-center">
                  <div className="absolute rounded-full" style={{ width: 80, height: 80, background: '#6b728015', animation: 'yt-scan 3.5s ease-out infinite' }} />
                  <div className="w-16 h-16 rounded-full flex items-center justify-center border-2 border-gray-500/60 bg-gray-500/15 relative"
                    style={{ boxShadow: '0 0 20px #6b728050', animation: 'yt-box-glow-gray 2.6s ease-in-out infinite' }}>
                    <div className="absolute inset-0 rounded-full border border-dashed border-gray-400/30" style={{ animation: 'yt-spin 14s linear infinite' }} />
                    <UnmonetizedIcon size={40} color="#9ca3af" />
                  </div>
                </div>
                <p className="text-gray-400 font-black text-base tracking-wider">UNMONETIZED</p>
                <div className="text-center">
                  <div className="yt-stat-num text-2xl sm:text-3xl font-black" style={{ color: '#9ca3af' }}>{fmtNum(unmonetizedCount)}</div>
                  <div className="text-gray-600 text-[10px] font-bold tracking-wider">PENDING RESOLUTION</div>
                </div>
                <div className="w-full">
                  <div className="flex justify-between mb-1">
                    <span className="text-gray-400 text-[10px] font-bold">Unmonetized Rate</span>
                    <span className="text-gray-400 text-[10px] font-bold">{Math.min(15, 10 + Math.floor((unmonetizedCount % 300000) / 60000))}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: `${Math.min(15, 10 + Math.floor((unmonetizedCount % 300000) / 60000))}%`, background: 'linear-gradient(90deg, #6b7280, #9ca3af)', animation: 'yt-flow-h 3s linear infinite' }} />
                  </div>
                  <p className="text-[9px] text-gray-500 mt-1 text-center">10–15% unmonetized range</p>
                </div>
                <p className="text-gray-400 text-xs text-center z-10">Tracked but not monetized. Dispute pending or rights not fully cleared. Under investigation.</p>
                <div className="w-full p-2 rounded-lg bg-gray-500/10 border border-gray-500/20 z-10">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-1"><LiveDot color="#6b7280" /><span className="text-gray-400 text-[10px] font-bold">PENDING RESOLUTION</span></div>
                    <div className="flex items-center gap-1"><YTLogo size={10} /><span className="text-gray-400 text-[9px] font-mono">CID PENDING</span></div>
                  </div>
                  <Wave color="#9ca3af" bars={14} />
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center my-2"><VPipe color="#D4F000" height={70} /></div>

          {/* GLOBAL REVENUE LABEL */}
          <div className="flex flex-col items-center mb-4">
            <div className="px-4 sm:px-5 py-1.5 rounded-full border border-red-500/40 bg-red-500/8 text-red-400 text-[10px] sm:text-xs font-bold tracking-widest uppercase flex items-center gap-2 step-label-text">
              <YTLogo size={14} /> GLOBAL YOUTUBE REVENUE COLLECTION
            </div>
          </div>

          <div className="rounded-2xl border-2 relative overflow-hidden mb-4"
            style={{ borderColor: '#FF000040', background: 'linear-gradient(135deg, #0a0010 0%, #060610 50%, #0a0010 100%)', boxShadow: '0 0 60px #FF000025, 0 0 120px #FF000010' }}>
            <LaserBorder color="#FF0000" />
            <div className="absolute inset-0 opacity-[0.04]"
              style={{ backgroundImage: 'linear-gradient(#FF0000 1px, transparent 1px), linear-gradient(90deg, #FF0000 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[400px] h-[300px] sm:h-[400px] rounded-full blur-[100px] opacity-15"
                style={{ background: 'radial-gradient(circle, #FF0000, transparent 70%)' }} />
            </div>

            <div className="relative z-10 p-4 sm:p-6">
              {/* Header row */}
              <div className="global-header mb-4 sm:mb-6">
                <div className="flex items-center gap-3 px-3 sm:px-4 py-2 sm:py-3 rounded-xl border border-red-500/30 bg-red-900/20">
                  <KMLogo size={28} />
                  <div>
                    <p className="text-white font-black text-sm">KARHARI MEDIA</p>
                    <p className="text-gray-400 text-[10px]">Global Revenue Collector</p>
                    <div className="flex items-center gap-1 mt-0.5"><LiveDot /><span className="text-green-400 text-[9px] font-bold">COLLECTING WORLDWIDE</span></div>
                  </div>
                </div>
                <div className="text-center flex-1 px-2">
                  <p className="text-white font-black text-lg sm:text-xl md:text-2xl" style={{ textShadow: '0 0 30px #FF000080' }}>WORLDWIDE REVENUE NETWORK</p>
                  <p className="text-gray-400 text-xs mt-1">Karhari Media collects revenue worldwide through YouTube&apos;s global Content ID partnerships</p>
                </div>
                <div className="flex items-center gap-3 px-3 sm:px-4 py-2 sm:py-3 rounded-xl border-2 border-red-500/50 bg-red-900/25" style={{ boxShadow: '0 0 20px #FF000040' }}>
                  <YTLogo size={28} />
                  <div>
                    <p className="text-red-400 font-black text-sm">YOUTUBE</p>
                    <p className="text-gray-400 text-[10px]">Content ID Partner</p>
                    <div className="flex items-center gap-1 mt-0.5"><LiveDot color="#FF0000" /><span className="text-red-400 text-[9px] font-bold">GLOBAL NETWORK</span></div>
                  </div>
                </div>
              </div>

              {/* Main visualizer */}
              <div className="relative w-full global-viz">
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <defs>
                    <filter id="glow-line">
                      <feGaussianBlur stdDeviation="0.3" result="coloredBlur"/>
                      <feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge>
                    </filter>
                  </defs>
                  {globalNodes.slice(1).map((node, i) => {
                    const colors = ['#FF0000','#D4F000','#00ff88','#00d4ff','#8b00ff','#ff6b00','#FF0000','#D4F000','#00ff88','#00d4ff','#8b00ff','#ff6b00','#FF0000','#D4F000','#00ff88','#00d4ff','#8b00ff'];
                    const c = colors[i % colors.length];
                    return (
                      <line key={i} x1={`${node.x}`} y1={`${node.y}`} x2="50" y2="50"
                        stroke={c} strokeWidth="0.3" opacity="0.5" strokeDasharray="2 1"
                        filter="url(#glow-line)"
                        style={{ animation: `yt-revenue-flow ${1.5 + i * 0.2}s ${i * 0.15}s linear infinite` }} />
                    );
                  })}
                  {globalNodes.slice(1, 8).map((node, i) => {
                    const next = globalNodes[(i + 2) % (globalNodes.length - 1) + 1];
                    return (
                      <line key={`cross-${i}`} x1={`${node.x}`} y1={`${node.y}`} x2={`${next.x}`} y2={`${next.y}`}
                        stroke="#FF000030" strokeWidth="0.2" opacity="0.3" strokeDasharray="1 2"
                        style={{ animation: `yt-revenue-flow ${2 + i * 0.3}s ${i * 0.2}s linear infinite` }} />
                    );
                  })}
                </svg>

                {/* Large YouTube icon — center */}
                <div className="absolute z-20" style={{ left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}>
                  <div className="relative flex items-center justify-center">
                    {[0,1,2,3].map(i => (
                      <div key={i} className="absolute rounded-full border border-red-500/30"
                        style={{ width: 80 + i * 30, height: 80 + i * 30, animation: `yt-scan ${2 + i * 0.6}s ${i * 0.4}s ease-out infinite` }} />
                    ))}
                    <div className="absolute w-32 h-32 rounded-full blur-2xl opacity-40" style={{ background: 'radial-gradient(circle, #FF0000, transparent 70%)' }} />
                    <div className="relative z-10 p-3 sm:p-5 rounded-full border-2 border-red-500/50 bg-black/60 backdrop-blur-sm"
                      style={{ boxShadow: '0 0 50px #FF000090, 0 0 100px #FF000040', animation: 'yt-cid-glow 2s ease-in-out infinite' }}>
                      <YTLogo size={60} />
                    </div>
                  </div>
                </div>

                {/* Satellite YouTube icons */}
                {globalNodes.slice(1).map((node, i) => {
                  const colors = ['#FF0000','#D4F000','#00ff88','#00d4ff','#8b00ff','#ff6b00','#FF0000','#D4F000','#00ff88','#00d4ff','#8b00ff','#ff6b00','#FF0000','#D4F000','#00ff88','#00d4ff','#8b00ff'];
                  const c = colors[i % colors.length];
                  const delay = i * 0.18;
                  return (
                    <div key={i} className="absolute z-10 flex flex-col items-center gap-0.5"
                      style={{ left: `${node.x}%`, top: `${node.y}%`, transform: 'translate(-50%, -50%)', animation: `yt-node-pulse ${1.8 + (i % 4) * 0.4}s ${delay}s ease-in-out infinite` }}>
                      <div className="relative">
                        <div className="absolute -inset-1 rounded-lg opacity-40 blur-sm" style={{ background: c }} />
                        <div className="relative p-1 sm:p-1.5 rounded-lg border"
                          style={{ borderColor: `${c}60`, background: `${c}15`, boxShadow: `0 0 12px ${c}50` }}>
                          <YTLogo size={14} />
                        </div>
                      </div>
                      <span className="text-[6px] sm:text-[7px] font-black tracking-wider" style={{ color: c }}>{node.label}</span>
                      <div className="w-1 h-1 rounded-full" style={{ background: c, animation: `yt-blink ${0.8 + i * 0.1}s ease-in-out infinite`, boxShadow: `0 0 4px ${c}` }} />
                    </div>
                  );
                })}

                {/* Floating particles */}
                {Array.from({ length: 16 }).map((_, i) => {
                  const startX = 3 + i * 6;
                  const startY = 8 + (i % 6) * 15;
                  const ytSize = 8 + (i % 3) * 4;
                  return (
                    <div key={`particle-${i}`} className="absolute z-5 pointer-events-none"
                      style={{ left: `${startX}%`, top: `${startY}%`, animation: `yt-float ${1.8 + i * 0.25}s ${i * 0.2}s ease-in-out infinite`, opacity: 0.6 + (i % 3) * 0.15 }}>
                      {i % 5 === 4
                        ? <div className="w-2 h-2 rounded-full" style={{ background: '#D4F000', boxShadow: '0 0 6px #D4F000' }} />
                        : <YTLogo size={ytSize} />
                      }
                    </div>
                  );
                })}
              </div>

              {/* Bottom stats row */}
              <div className="stats-grid-4 mt-4 sm:mt-6">
                {[
                  { label: 'Countries Collecting', value: '195+', color: '#FF0000', sub: 'Global reach' },
                  { label: 'Revenue Collected', value: `$${fmtNum(revenueCount)}`, color: '#D4F000', sub: 'All territories' },
                  { label: 'Active CID Claims', value: fmtNum(claimsCount), color: '#00ff88', sub: 'Worldwide' },
                  { label: 'YT Partner Networks', value: '50+', color: '#00d4ff', sub: 'Global MCN' },
                ].map((s, i) => (
                  <div key={i} className="p-2 sm:p-3 rounded-xl border text-center relative overflow-hidden"
                    style={{ borderColor: `${s.color}30`, background: `${s.color}0a` }}>
                    <div className="absolute inset-0 pointer-events-none" style={{ background: `radial-gradient(circle at 50% 0%, ${s.color}15, transparent 70%)` }} />
                    <div className="relative z-10">
                      <div className="yt-stat-num text-base sm:text-xl font-black" style={{ color: s.color }}>{s.value}</div>
                      <div className="text-gray-400 text-[9px] sm:text-[10px] mt-0.5 font-semibold">{s.label}</div>
                      <div className="text-gray-600 text-[9px]">{s.sub}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Description strip */}
              <div className="mt-4 p-3 sm:p-4 rounded-xl border border-red-500/20 bg-red-900/10 flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
                <div className="flex items-center gap-3 flex-shrink-0">
                  <KMLogo size={22} />
                  <span className="text-white text-xs font-black">x</span>
                  <YTLogo size={22} />
                </div>
                <p className="text-gray-300 text-xs leading-relaxed text-center sm:text-left">
                  <span className="text-red-400 font-black">Karhari Media</span> collects revenue worldwide through YouTube&apos;s global Content ID partnerships. Every registered track generates revenue from all 195+ countries where YouTube operates — automatically tracked, claimed, and distributed through our certified Content ID pipeline.
                </p>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <LiveDot color="#FF0000" />
                  <span className="text-red-400 text-[10px] font-black whitespace-nowrap">LIVE GLOBAL COLLECTION</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center my-2"><VPipe color="#D4F000" height={70} /></div>

          {/* ── STEP 6 LABEL ── */}
          <div className="flex flex-col items-center mb-4">
            <div className="px-4 sm:px-5 py-1.5 rounded-full border border-yellow-400/30 bg-yellow-400/8 text-yellow-400 text-[10px] sm:text-xs font-bold tracking-widest uppercase flex items-center gap-2 step-label-text">
              <YTLogo size={14} /> STEP 6 — REVENUE FLOW
            </div>
          </div>

          {/* STEP 6 REVENUE FLOW */}
          <StageBox color="#D4F000" glow className="p-4 sm:p-8 mb-4 yt-glow-gold relative overflow-hidden">
            <YTRevenueBubble count={14} />
            <div className="relative z-10">
              <div className="text-center mb-4 sm:mb-6">
                <p className="text-[#D4F000] font-black text-xl sm:text-2xl mb-1">REVENUE DISTRIBUTION PIPELINE</p>
                <p className="text-gray-400 text-sm">YouTube Content ID revenue flows through the complete chain</p>
              </div>

              <div className="revenue-flow-row">
                <div className="flex flex-col items-center gap-2 p-3 sm:p-4 rounded-2xl border-2 border-red-500/50 bg-red-900/20 w-full sm:w-44"
                  style={{ boxShadow: '0 0 30px #FF000040' }}>
                  <YTLogo size={32} />
                  <p className="text-red-400 font-black text-sm">YOUTUBE</p>
                  <p className="text-gray-400 text-[10px] text-center">Collects ad revenue from Content ID claims</p>
                  <div className="text-green-400 font-black text-lg">$$$</div>
                </div>

                <div className="revenue-arrow flex-col items-center gap-1 mx-3">
                  <HPipe color="#D4F000" width={70} />
                  <span className="text-[#D4F000] text-[9px] font-bold tracking-widest">SENDS REVENUE</span>
                </div>

                <div className="flex flex-col items-center gap-2 p-3 sm:p-4 rounded-2xl border-2 border-yellow-400/50 bg-yellow-900/20 w-full sm:w-52 relative"
                  style={{ boxShadow: '0 0 30px #D4F00040' }}>
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-[#D4F000] text-black text-[9px] font-black">REVENUE HUB</div>
                  <KMLogo size={32} />
                  <p className="text-[#D4F000] font-black text-sm">KARHARI MEDIA</p>
                  <p className="text-gray-400 text-[10px] text-center">Receives, verifies, and distributes revenue</p>
                  <div className="flex items-center gap-2">
                    <LiveDot color="#D4F000" />
                    <span className="text-yellow-400 text-[10px] font-bold">Processing Payouts</span>
                  </div>
                </div>

                <div className="revenue-labels mx-3">
                  <div className="flex flex-col items-center gap-1">
                    <HPipe color="#00ff88" width={50} />
                    <span className="text-green-400 text-[9px] font-bold">TO ARTISTS</span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <HPipe color="#8b00ff" width={50} />
                    <span className="text-purple-400 text-[9px] font-bold">TO LABELS</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                  <div className="flex items-center gap-3 p-3 rounded-xl border border-green-500/30 bg-green-900/15 w-full sm:w-44">
                    <div className="w-10 h-10 rounded-full bg-green-500/20 border border-green-500 flex items-center justify-center flex-shrink-0">
                      <ArtistIcon size={24} color="#00ff88" />
                    </div>
                    <div>
                      <p className="text-green-400 font-black text-xs">ARTISTS</p>
                      <p className="text-gray-400 text-[10px]">Royalty payout</p>
                      <p className="text-green-400 font-bold text-sm">Paid</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-xl border border-purple-500/30 bg-purple-900/15 w-full sm:w-44">
                    <div className="w-10 h-10 rounded-full bg-purple-500/20 border border-purple-500 flex items-center justify-center flex-shrink-0">
                      <BusinessIcon size={24} color="#8b00ff" />
                    </div>
                    <div>
                      <p className="text-purple-400 font-black text-xs">RECORD LABELS</p>
                      <p className="text-gray-400 text-[10px]">Label share</p>
                      <p className="text-purple-400 font-bold text-sm">Paid</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="stats-grid-4 mt-4 sm:mt-6">
                {[
                  { label: 'Total Revenue Collected', value: `$${fmtNum(revenueCount)}`, color: '#D4F000' },
                  { label: 'Paid to Artists', value: `$${fmtNum(Math.floor(revenueCount * 0.4))}`, color: '#00ff88' },
                  { label: 'Paid to Labels', value: `$${fmtNum(Math.floor(revenueCount * 0.25))}`, color: '#8b00ff' },
                  { label: 'Active Monetized Tracks', value: fmtNum(tracksCount), color: '#FF0000' },
                ].map((s, i) => (
                  <div key={i} className="p-2 sm:p-3 rounded-xl border text-center"
                    style={{ borderColor: `${s.color}30`, background: `${s.color}0a` }}>
                    <div className="text-base sm:text-lg font-black" style={{ color: s.color }}>{s.value}</div>
                    <div className="text-gray-500 text-[9px] sm:text-[10px] mt-0.5">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </StageBox>

          <div className="flex justify-center my-2"><VPipe color="#00ff88" height={70} /></div>

          {/* PIPELINE SUMMARY LABEL */}
          <div className="flex flex-col items-center mb-4">
            <div className="px-4 sm:px-5 py-1.5 rounded-full border border-green-400/30 bg-green-400/8 text-green-400 text-[10px] sm:text-xs font-bold tracking-widest uppercase step-label-text">
              PIPELINE COMPLETE — SUMMARY
            </div>
          </div>

          {/* PIPELINE SUMMARY */}
          <StageBox color="#00ff88" glow className="p-4 sm:p-8 mb-6 sm:mb-8">
            <div className="text-center mb-4 sm:mb-6">
              <div className="flex items-center justify-center gap-3 mb-3">
                <KMLogo size={28} />
                <span className="text-white text-xl sm:text-2xl font-black">×</span>
                <YTLogo size={28} />
              </div>
              <p className="text-green-400 font-black text-lg sm:text-xl">FULL PIPELINE OPERATIONAL</p>
              <p className="text-gray-400 text-sm mt-1">End-to-end YouTube Content ID fingerprinting system by Karhari Media</p>
            </div>

            <div className="pipeline-steps-wrap mb-4 sm:mb-6">
              {[
                { step: '1', label: 'Artist/Label Submits', color: '#D4F000' },
                { step: '2', label: 'Karhari Reviews', color: '#ff6b00' },
                { step: '3', label: 'YouTube Delivery', color: '#FF0000' },
                { step: '4', label: 'Fingerprint Scan', color: '#00d4ff' },
                { step: '5', label: 'Outcome Detected', color: '#8b00ff' },
                { step: '6', label: 'Monetization', color: '#00ff88' },
                { step: '7', label: 'Revenue Collected', color: '#D4F000' },
                { step: '8', label: 'Paid to Artists', color: '#00ff88' },
              ].map((s, i) => (
                <div key={i} className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 rounded-xl border"
                  style={{ borderColor: `${s.color}40`, background: `${s.color}10` }}>
                  <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full flex items-center justify-center text-[9px] sm:text-[10px] font-black text-black flex-shrink-0"
                    style={{ background: s.color }}>{s.step}</div>
                  <span className="text-white text-[10px] sm:text-xs font-semibold">{s.label}</span>
                  {i < 7 && <span style={{ color: s.color }} className="text-xs">→</span>}
                </div>
              ))}
            </div>

            <div className="stats-grid-4">
              {[
                { label: 'Tracks in System', value: fmtNum(tracksCount), color: '#00ff88', icon: <MusicIcon size={28} color="#00ff88" /> },
                { label: 'Revenue Distributed', value: `$${fmtNum(revenueCount)}`, color: '#D4F000', icon: <RevenueIcon size={28} color="#D4F000" /> },
                { label: 'Claims Processed', value: fmtNum(claimsCount), color: '#FF0000', icon: <CopyrightIcon size={28} color="#FF0000" /> },
                { label: 'Violations Blocked', value: fmtNum(blockedCount), color: '#8b00ff', icon: <BlockIcon size={28} color="#8b00ff" /> },
              ].map((s, i) => (
                <div key={i} className="p-3 sm:p-4 rounded-xl border text-center relative overflow-hidden"
                  style={{ borderColor: `${s.color}40`, background: `${s.color}0d`, boxShadow: `0 0 20px ${s.color}25` }}>
                  <LaserBorder color={s.color} />
                  <div className="relative z-10">
                    <div className="flex justify-center mb-2" style={{ animation: 'yt-icon-pulse 2s ease-in-out infinite' }}>{s.icon}</div>
                    <div className="yt-stat-num text-base sm:text-xl font-black" style={{ color: s.color }}>{s.value}</div>
                    <div className="text-gray-500 text-[9px] sm:text-[10px] mt-0.5">{s.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </StageBox>

          {/* YOUTUBE MONETIZATION POLICY SECTION */}
          <div className="flex justify-center my-2"><VPipe color="#FF0000" height={70} /></div>

          <div className="flex flex-col items-center mb-4 sm:mb-6">
            <div className="flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2 rounded-full border border-red-500/50 bg-red-900/20 mb-3 flex-wrap justify-center"
              style={{ boxShadow: '0 0 20px #FF000030' }}>
              <YTLogo size={16} />
              <span className="text-red-400 text-[10px] sm:text-xs font-black tracking-widest uppercase text-center">YouTube Monetization Policy &amp; Compliance</span>
              <KMLogo size={16} />
            </div>
            <p className="text-gray-400 text-xs sm:text-sm text-center max-w-2xl px-2">
              Karhari Media strictly follows all YouTube partner policies. As an official YouTube Content ID partner, we enforce every regulation with full strength and zero compromise.
            </p>
          </div>

          {/* Partner Commitment Banner */}
          <div className="rounded-2xl border-2 border-red-500/50 bg-gradient-to-r from-red-900/20 via-black/40 to-red-900/20 p-4 sm:p-6 mb-4 sm:mb-6 relative overflow-hidden"
            style={{ boxShadow: '0 0 40px #FF000030' }}>
            <LaserBorder color="#FF0000" />
            <div className="partner-banner relative z-10">
              <div className="flex items-center gap-3 sm:gap-4 flex-shrink-0">
                <div className="p-2 sm:p-3 rounded-xl border-2 border-red-500/60 bg-red-900/30" style={{ boxShadow: '0 0 20px #FF000050' }}>
                  <YTLogo size={36} />
                </div>
                <div className="w-px h-10 sm:h-12 bg-white/20" />
                <div className="p-2 sm:p-3 rounded-xl border border-white/20 bg-white/5">
                  <KMLogo size={36} />
                </div>
              </div>
              <div className="flex-1">
                <p className="text-white font-black text-base sm:text-lg mb-1" style={{ textShadow: '0 0 20px #FF000060' }}>
                  Karhari Media — Official YouTube Content ID Partner
                </p>
                <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">
                  We follow the policies of our YouTube partners very strictly and with great strength. Every artist, record label, and creator working with us must comply with all YouTube regulations. We are a certified YouTube partner and enforce all rules without exception.
                </p>
                <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-2 sm:mt-3">
                  {['YouTube Certified Partner', 'Content ID Licensed', 'MCN Compliant', 'CMS Managed', 'Policy Enforced'].map((tag, i) => (
                    <span key={i} className="px-2 py-0.5 rounded-full text-[9px] sm:text-[10px] font-bold border border-red-500/40 text-red-400 bg-red-900/20"
                      style={{ animation: `yt-blink ${2 + i * 0.3}s ease-in-out infinite` }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex flex-col items-center gap-2 flex-shrink-0">
                <LiveDot color="#FF0000" />
                <span className="text-red-400 text-[10px] font-black tracking-widest text-center">POLICY ACTIVE</span>
              </div>
            </div>
          </div>

          {/* Policy Cards Grid */}
          <div className="policy-grid mb-4 sm:mb-6">

            {/* 1. YouTube Monetization Policy */}
            <div className="rounded-2xl border border-red-500/40 bg-red-900/10 p-4 sm:p-5 relative overflow-hidden"
              style={{ animation: 'yt-box-glow-red 3s ease-in-out infinite' }}>
              <LaserBorder color="#FF0000" />
              <div className="relative z-10">
                <div className="flex items-start gap-3 mb-3">
                  <div className="p-2 rounded-lg border border-red-500/40 bg-red-900/30 flex-shrink-0"><YTLogo size={18} /></div>
                  <div className="min-w-0">
                    <p className="text-red-400 font-black text-sm">YouTube Monetization Policy</p>
                    <a href="https://support.google.com/youtube/answer/72857" target="_blank" rel="noopener noreferrer"
                      className="text-[10px] text-blue-400 hover:text-blue-300 underline font-mono transition-colors break-all">
                      support.google.com/youtube/answer/72857 ↗
                    </a>
                  </div>
                </div>
                <ul className="space-y-2">
                  {['Channel must meet YouTube Partner Program (YPP) requirements','Content must comply with YouTube Community Guidelines','Advertiser-friendly content guidelines must be followed','No re-uploaded or third-party content without rights','Original content ownership must be fully documented'].map((point, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-gray-300">
                      <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 flex-shrink-0" style={{ boxShadow: '0 0 4px #FF0000' }} />{point}
                    </li>
                  ))}
                </ul>
                <div className="mt-3 p-2 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center gap-2">
                  <LiveDot color="#FF0000" />
                  <span className="text-red-300 text-[10px] font-bold">Karhari Media enforces all YPP monetization rules strictly</span>
                </div>
              </div>
            </div>

            {/* 2. YouTube Content ID Policy */}
            <div className="rounded-2xl border border-orange-500/40 bg-orange-900/10 p-4 sm:p-5 relative overflow-hidden"
              style={{ animation: 'yt-box-glow-orange 3.2s ease-in-out infinite' }}>
              <LaserBorder color="#ff6b00" />
              <div className="relative z-10">
                <div className="flex items-start gap-3 mb-3">
                  <div className="p-2 rounded-lg border border-orange-500/40 bg-orange-900/30 flex-shrink-0"><YTLogo size={18} /></div>
                  <div className="min-w-0">
                    <p className="text-orange-400 font-black text-sm">YouTube Content ID Policy</p>
                    <a href="https://support.google.com/youtube/answer/2797370" target="_blank" rel="noopener noreferrer"
                      className="text-[10px] text-blue-400 hover:text-blue-300 underline font-mono transition-colors break-all">
                      support.google.com/youtube/answer/2797370 ↗
                    </a>
                  </div>
                </div>
                <ul className="space-y-2">
                  {['Only exclusive rights holders may submit to Content ID','Reference files must be original, owned audio/video','Invalid references result in immediate removal from CID','Misuse of Content ID leads to permanent partner termination','All claims must be accurate — false claims are prohibited'].map((point, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-gray-300">
                      <div className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-1.5 flex-shrink-0" style={{ boxShadow: '0 0 4px #ff6b00' }} />{point}
                    </li>
                  ))}
                </ul>
                <div className="mt-3 p-2 rounded-lg bg-orange-500/10 border border-orange-500/20 flex items-center gap-2">
                  <LiveDot color="#ff6b00" />
                  <span className="text-orange-300 text-[10px] font-bold">Only verified rights holders accepted into Karhari Media CID</span>
                </div>
              </div>
            </div>

            {/* 3. YouTube MCN Policy */}
            <div className="rounded-2xl border border-purple-500/40 bg-purple-900/10 p-4 sm:p-5 relative overflow-hidden"
              style={{ animation: 'yt-box-glow-purple 3.4s ease-in-out infinite' }}>
              <LaserBorder color="#8b00ff" />
              <div className="relative z-10">
                <div className="flex items-start gap-3 mb-3">
                  <div className="p-2 rounded-lg border border-purple-500/40 bg-purple-900/30 flex-shrink-0"><YTLogo size={18} /></div>
                  <div className="min-w-0">
                    <p className="text-purple-400 font-black text-sm">YouTube Multi-Channel Network (MCN) Policy</p>
                    <a href="https://support.google.com/youtube/answer/2737059" target="_blank" rel="noopener noreferrer"
                      className="text-[10px] text-blue-400 hover:text-blue-300 underline font-mono transition-colors break-all">
                      support.google.com/youtube/answer/2737059 ↗
                    </a>
                  </div>
                </div>
                <ul className="space-y-2">
                  {['MCN partners must comply with all YouTube Terms of Service','Channels under MCN are managed through YouTube CMS','MCN is responsible for all channels in its network','Karhari Media manages Artist, Label & Creator channels in CMS','MCN must ensure all affiliated channels follow YouTube policies','Channels violating policies may be removed from the MCN'].map((point, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-gray-300">
                      <div className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-1.5 flex-shrink-0" style={{ boxShadow: '0 0 4px #8b00ff' }} />{point}
                    </li>
                  ))}
                </ul>
                <div className="mt-3 p-2 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center gap-2">
                  <LiveDot color="#8b00ff" />
                  <span className="text-purple-300 text-[10px] font-bold">Karhari Media MCN manages all channels via YouTube CMS</span>
                </div>
              </div>
            </div>

            {/* 4. YouTube CMS Channel Management */}
            <div className="rounded-2xl border border-cyan-500/40 bg-cyan-900/10 p-4 sm:p-5 relative overflow-hidden"
              style={{ animation: 'yt-box-glow-green 3.6s ease-in-out infinite' }}>
              <LaserBorder color="#00d4ff" />
              <div className="relative z-10">
                <div className="flex items-start gap-3 mb-3">
                  <div className="p-2 rounded-lg border border-cyan-500/40 bg-cyan-900/30 flex-shrink-0"><KMLogo size={18} /></div>
                  <div className="min-w-0">
                    <p className="text-cyan-400 font-black text-sm">YouTube CMS Channel Management</p>
                    <a href="https://support.google.com/youtube/answer/6301625" target="_blank" rel="noopener noreferrer"
                      className="text-[10px] text-blue-400 hover:text-blue-300 underline font-mono transition-colors break-all">
                      support.google.com/youtube/answer/6301625 ↗
                    </a>
                  </div>
                </div>
                <ul className="space-y-2">
                  {['Karhari Media manages Artist, Record Label & Creator channels in CMS','All channel policies are enforced through YouTube Content Manager','Revenue tracking and claims managed via YouTube CMS dashboard','Channel ownership transfers require official YouTube verification','All YouTube Channel Policies apply to every managed channel'].map((point, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-gray-300">
                      <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 mt-1.5 flex-shrink-0" style={{ boxShadow: '0 0 4px #00d4ff' }} />{point}
                    </li>
                  ))}
                </ul>
                <div className="mt-3 p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center gap-2">
                  <LiveDot color="#00d4ff" />
                  <span className="text-cyan-300 text-[10px] font-bold">All channels managed with full YouTube CMS compliance</span>
                </div>
              </div>
            </div>
          </div>

          {/* Content Eligibility Section */}
          <div className="rounded-2xl border border-yellow-400/40 bg-yellow-900/10 p-4 sm:p-6 mb-4 sm:mb-6 relative overflow-hidden"
            style={{ animation: 'yt-box-glow-gold 3s ease-in-out infinite' }}>
            <LaserBorder color="#D4F000" />
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-3 sm:mb-4 flex-wrap">
                <YTLogo size={20} />
                <p className="text-yellow-400 font-black text-sm sm:text-base">Content Eligibility for YouTube Content ID</p>
                <KMLogo size={20} />
              </div>
              <div className="eligibility-grid">
                <div className="p-3 sm:p-4 rounded-xl border border-yellow-400/30 bg-yellow-900/15">
                  <div className="flex items-center gap-2 mb-3">
                    <MusicIcon size={16} color="#D4F000" />
                    <p className="text-yellow-400 font-black text-xs sm:text-sm">Valid Audio Files for Content ID</p>
                  </div>
                  <ul className="space-y-1.5">
                    {[{fmt:'WAV',desc:'Uncompressed — Preferred master format'},{fmt:'FLAC',desc:'Lossless — High quality reference'},{fmt:'MP3',desc:'320kbps minimum — Standard submission'},{fmt:'AAC',desc:'256kbps minimum — YouTube native'},{fmt:'AIFF',desc:'Uncompressed — Studio master'}].map((item, i) => (
                      <li key={i} className="flex items-center gap-2 text-xs">
                        <span className="px-1.5 py-0.5 rounded bg-yellow-400/20 text-yellow-400 font-black text-[9px] font-mono flex-shrink-0">{item.fmt}</span>
                        <span className="text-gray-300">{item.desc}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-3 p-2 rounded-lg bg-red-500/10 border border-red-500/20">
                    <p className="text-red-300 text-[10px] font-bold">⚠ Audio must be 100% original — no samples, covers, or licensed music without clearance</p>
                  </div>
                </div>
                <div className="p-3 sm:p-4 rounded-xl border border-yellow-400/30 bg-yellow-900/15">
                  <div className="flex items-center gap-2 mb-3">
                    <YTLogo size={16} />
                    <p className="text-yellow-400 font-black text-xs sm:text-sm">Valid Video Files for Content ID</p>
                  </div>
                  <ul className="space-y-1.5">
                    {[{fmt:'MP4',desc:'H.264/H.265 — Standard YouTube format'},{fmt:'MOV',desc:'ProRes — High quality master'},{fmt:'AVI',desc:'Uncompressed — Studio reference'},{fmt:'MKV',desc:'H.264 — Open container format'},{fmt:'WebM',desc:'VP9 — YouTube optimized'}].map((item, i) => (
                      <li key={i} className="flex items-center gap-2 text-xs">
                        <span className="px-1.5 py-0.5 rounded bg-yellow-400/20 text-yellow-400 font-black text-[9px] font-mono flex-shrink-0">{item.fmt}</span>
                        <span className="text-gray-300">{item.desc}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-3 p-2 rounded-lg bg-red-500/10 border border-red-500/20">
                    <p className="text-red-300 text-[10px] font-bold">⚠ Video must be original production — no clips from other channels or copyrighted footage</p>
                  </div>
                </div>
              </div>
              <div className="mt-4 p-3 sm:p-4 rounded-xl border border-yellow-400/20 bg-black/30">
                <p className="text-yellow-400 font-black text-xs mb-2 flex items-center gap-2">
                  <YTLogo size={14} /> Which Content Eras Are Eligible for YouTube Monetization?
                </p>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {[{era:'New Releases (2020–Present)',eligible:true},{era:'Back Catalog (2000–2019)',eligible:true},{era:'Classic Era (1990–1999)',eligible:true,note:'With full rights docs'},{era:'Vintage (Pre-1990)',eligible:true,note:'Public domain check required'},{era:'Covers / Remixes',eligible:false,note:'Original license required'},{era:'Samples Without Clearance',eligible:false}].map((item, i) => (
                    <div key={i} className={`flex items-center gap-1.5 px-2 py-1 rounded-lg border text-[9px] sm:text-[10px] font-semibold ${item.eligible ? 'border-green-500/30 bg-green-900/15 text-green-400' : 'border-red-500/30 bg-red-900/15 text-red-400'}`}>
                      <span>{item.eligible ? '✓' : '✗'}</span>
                      <span>{item.era}</span>
                      {item.note && <span className="text-gray-500 text-[8px] sm:text-[9px]">({item.note})</span>}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Invalid References Warning */}
          <div className="rounded-2xl border-2 border-red-500/60 bg-red-900/15 p-4 sm:p-6 mb-4 sm:mb-6 relative overflow-hidden"
            style={{ boxShadow: '0 0 40px #FF000030', animation: 'yt-box-glow-red 2.5s ease-in-out infinite' }}>
            <LaserBorder color="#FF0000" />
            <div className="relative z-10">
              <div className="flex items-start gap-3 mb-3 sm:mb-4">
                <div className="flex-shrink-0"><InvalidIcon size={28} color="#FF0000" /></div>
                <div className="min-w-0">
                  <p className="text-red-400 font-black text-sm sm:text-base">YouTube Content ID Invalid References — WARNING</p>
                  <a href="https://support.google.com/youtube/answer/4352063" target="_blank" rel="noopener noreferrer"
                    className="text-[10px] text-blue-400 hover:text-blue-300 underline font-mono break-all">
                    support.google.com/youtube/answer/4352063 ↗
                  </a>
                </div>
              </div>
              <div className="invalid-refs-grid">
                {[
                  { title: 'Artists', color: '#D4F000', icon: <ArtistIcon size={24} color="#D4F000" />, warnings: ['Only submit music you 100% own','No covers without mechanical license','No samples without clearance','No beats purchased non-exclusively'] },
                  { title: 'Record Labels', color: '#8b00ff', icon: <BusinessIcon size={24} color="#8b00ff" />, warnings: ['Only submit catalog you fully own','Distribution deals ≠ Content ID rights','Verify all artist contracts before submission','Legacy catalog requires full rights audit'] },
                  { title: 'YouTube Creators', color: '#FF0000', icon: <YTLogo size={24} />, warnings: ['Only upload videos you created yourself','No clips from other YouTube channels','No copyrighted music in background','Gaming/reaction content has restrictions'] },
                ].map((group, i) => (
                  <div key={i} className="p-3 rounded-xl border" style={{ borderColor: `${group.color}30`, background: `${group.color}0a` }}>
                    <div className="flex items-center gap-2 mb-2">
                      <div style={{ animation: 'yt-icon-pulse 2s ease-in-out infinite' }}>{group.icon}</div>
                      <p className="font-black text-sm" style={{ color: group.color }}>{group.title}</p>
                    </div>
                    <ul className="space-y-1">
                      {group.warnings.map((w, j) => (
                        <li key={j} className="flex items-start gap-1.5 text-[10px] text-gray-300">
                          <span className="text-red-400 mt-0.5 flex-shrink-0">⚠</span>{w}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Channel & Upload Policy Warning */}
          <div className="rounded-2xl border border-orange-500/40 bg-orange-900/10 p-4 sm:p-6 mb-4 sm:mb-6 relative overflow-hidden"
            style={{ animation: 'yt-box-glow-orange 3s ease-in-out infinite' }}>
            <LaserBorder color="#ff6b00" />
            <div className="relative z-10">
              <div className="flex items-start gap-3 mb-3 sm:mb-4">
                <div className="flex-shrink-0"><YTLogo size={20} /></div>
                <div className="min-w-0">
                  <p className="text-orange-400 font-black text-sm sm:text-base">Channel &amp; Upload Policy — CMS &amp; MCN Members</p>
                  <a href="https://support.google.com/youtube/answer/2801895" target="_blank" rel="noopener noreferrer"
                    className="text-[10px] text-blue-400 hover:text-blue-300 underline font-mono break-all">
                    support.google.com/youtube/answer/2801895 ↗
                  </a>
                </div>
              </div>
              <div className="channel-policy-grid">
                <div>
                  <p className="text-orange-400 font-bold text-xs mb-2">If your channel is in Karhari Media CMS/MCN:</p>
                  <ul className="space-y-1.5">
                    {['You may ONLY upload videos you fully own the rights to','Background music must be licensed or royalty-free','No re-uploads of other creators\' content','No unauthorized use of copyrighted footage','All uploads are subject to Content ID scanning','Policy violations may result in channel removal from MCN'].map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-[10px] text-gray-300">
                        <span className="text-orange-400 flex-shrink-0 mt-0.5">→</span>{item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-orange-400 font-bold text-xs mb-2">Audio Content Warning:</p>
                  <ul className="space-y-1.5">
                    {['Audio tracks in videos must be original or licensed','Music used in videos must not be in Content ID database unless you own it','Podcast/voiceover content must be original','Live performance recordings require venue/artist clearance','Remixes require written permission from original rights holder','AI-generated music must disclose AI origin per YouTube policy'].map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-[10px] text-gray-300">
                        <span className="text-orange-400 flex-shrink-0 mt-0.5">→</span>{item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="mt-4 p-3 rounded-xl border border-red-500/40 bg-red-900/20 flex items-start gap-3">
                <div className="flex-shrink-0"><InvalidIcon size={22} color="#FF0000" /></div>
                <p className="text-red-300 text-xs leading-relaxed">
                  <span className="font-black text-red-400">STRICT WARNING:</span> Karhari Media follows all YouTube partner policies with zero tolerance. Any channel or creator found violating YouTube&apos;s policies will be immediately removed from our MCN and CMS network. We report all violations to YouTube directly. Work with us as per YouTube regulations — no exceptions.
                </p>
              </div>
            </div>
          </div>

          {/* Submit Music to Karhari Media */}
          <div className="rounded-2xl border-2 border-green-500/50 bg-green-900/10 p-4 sm:p-6 mb-4 sm:mb-6 relative overflow-hidden"
            style={{ boxShadow: '0 0 40px #00ff8820', animation: 'yt-box-glow-green 2.5s ease-in-out infinite' }}>
            <LaserBorder color="#00ff88" />
            <YTRevenueBubble count={8} />
            <div className="relative z-10">
              <div className="flex items-start gap-3 mb-3 sm:mb-4 flex-wrap">
                <KMLogo size={24} />
                <div className="flex-1 min-w-0">
                  <p className="text-green-400 font-black text-base sm:text-lg">Submit Your Music to Karhari Media for Content ID Monetization</p>
                  <p className="text-gray-400 text-xs">Artists, Record Labels &amp; YouTube Music Creators</p>
                </div>
                <YTLogo size={24} />
              </div>
              <p className="text-gray-300 text-xs sm:text-sm leading-relaxed mb-3 sm:mb-4">
                Karhari Media accepts music submissions from <span className="text-green-400 font-bold">independent artists</span>, <span className="text-purple-400 font-bold">record labels</span>, and <span className="text-red-400 font-bold">YouTube music creators</span> for YouTube Content ID monetization. All submissions are reviewed against YouTube&apos;s Content ID policy. Only original, rights-cleared content is accepted into our pipeline.
              </p>
              <div className="submit-cards-grid mb-3 sm:mb-4">
                {[
                  { title: 'Independent Artists', color: '#D4F000', desc: 'Submit your original music for global Content ID protection and monetization across all YouTube territories.', icon: <ArtistIcon size={24} color="#D4F000" /> },
                  { title: 'Record Labels', color: '#8b00ff', desc: 'Submit your full catalog for Content ID registration. We manage rights, claims, and revenue distribution for your entire roster.', icon: <BusinessIcon size={24} color="#8b00ff" /> },
                  { title: 'YouTube Creators', color: '#FF0000', desc: 'Music creators and composers can submit original soundtracks and compositions for Content ID monetization through our certified pipeline.', icon: <YTLogo size={24} /> },
                ].map((item, i) => (
                  <div key={i} className="p-3 sm:p-4 rounded-xl border relative overflow-hidden"
                    style={{ borderColor: `${item.color}40`, background: `${item.color}0a` }}>
                    <div className="flex items-center gap-2 mb-2">
                      {item.icon}
                      <p className="font-black text-sm" style={{ color: item.color }}>{item.title}</p>
                    </div>
                    <p className="text-gray-400 text-[10px] leading-relaxed">{item.desc}</p>
                    <div className="mt-2 flex items-center gap-1">
                      <LiveDot color={item.color} />
                      <span className="text-[9px] font-bold" style={{ color: item.color }}>Accepting Submissions</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="submit-cta-row">
                <a href="/contact"
                  className="flex-1 py-3 rounded-xl font-black text-black text-sm tracking-wider text-center transition-all duration-200 hover:scale-105"
                  style={{ background: 'linear-gradient(135deg, #00ff88, #00d4ff)', boxShadow: '0 0 20px #00ff8840' }}>
                  SUBMIT YOUR MUSIC TO KARHARI MEDIA
                </a>
                <a href="/youtube-policies" target="_blank"
                  className="flex items-center justify-center gap-2 px-4 sm:px-5 py-3 rounded-xl font-bold text-white text-sm border border-red-500/40 hover:border-red-500/80 transition-all duration-200"
                  style={{ background: 'rgba(255,0,0,0.1)' }}>
                  <YTLogo size={16} />
                  View All YouTube Policies
                </a>
              </div>
            </div>
          </div>

          <div className="flex justify-center my-2"><VPipe color="#00ff88" height={70} /></div>

          {/* ── CTA ── */}
          <div id="submit" className="text-center py-8 sm:py-12 px-3 sm:px-4">
            <div className="inline-block p-5 sm:p-8 rounded-3xl border border-red-500/30 bg-red-900/10 max-w-xl w-full"
              style={{ boxShadow: '0 0 60px #FF000025' }}>
              <div className="flex items-center justify-center gap-3 mb-4">
                <YTLogo size={24} />
                <KMLogo size={24} />
              </div>
              <h2 className="text-lg sm:text-2xl font-black text-white mb-2">Ready to Connect Your YouTube Channel and Monetize Your Content and Music and Submit?</h2>
              <p className="text-gray-400 text-xs sm:text-sm mb-4 sm:mb-6">Submit your audio to Karhari Media and let YouTube Content ID fingerprinting protect and monetize your work globally.</p>
              <button
                onClick={() => { window.location.href = '/contact'; }}
                className="w-full py-3 sm:py-4 rounded-xl font-black text-black text-sm sm:text-base tracking-wider transition-all duration-200 hover:scale-105 hover:shadow-2xl"
                style={{ background: 'linear-gradient(135deg, #FF0000 0%, #ff6b00 50%, #D4F000 100%)', boxShadow: '0 0 30px #FF000060' }}>
                SUBMIT APPLICATION
              </button>
              <p className="text-gray-600 text-xs mt-3">Karhari Media PVT. LTD. — Official YouTube Content ID Partner</p>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
