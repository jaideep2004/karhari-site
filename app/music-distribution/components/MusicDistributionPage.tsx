'use client';
import React, { useEffect, useState } from 'react';

/*
  Music Distribution — live pipeline visualization.
  Ported from the Karhari pipeline analytics reference (first section: MusicDistributionPipeline).
*/
const SpotifyIcon = ({ size = 32 }: { size?: number }) => (
  <svg viewBox="0 0 24 24" width={size} height={size}>
    <circle cx="12" cy="12" r="12" fill="#1DB954"/>
    <path d="M17.5 16.5c-.2 0-.4-.1-.5-.2-2.5-1.5-5.6-1.8-9.3-1-.4.1-.8-.2-.9-.6-.1-.4.2-.8.6-.9 4.1-.9 7.6-.5 10.4 1.1.4.2.5.6.3 1-.1.4-.4.6-.6.6z" fill="white"/>
    <path d="M18.8 13.5c-.2 0-.4-.1-.6-.2-2.9-1.8-7.3-2.3-10.7-1.3-.4.1-.9-.1-1-.5-.1-.4.1-.9.5-1 3.9-1.2 8.7-.6 12 1.5.4.2.5.7.3 1.1-.2.3-.4.4-.5.4z" fill="white"/>
    <path d="M20.1 10.3c-3.5-2.1-9.3-2.3-12.6-1.3-.5.2-1.1-.1-1.3-.6-.2-.5.1-1.1.6-1.3 3.9-1.2 10.3-.9 14.3 1.5.5.3.6.9.3 1.4-.2.3-.8.5-1.3.3z" fill="white"/>
  </svg>
);
const AppleMusicIcon = ({ size = 32 }: { size?: number }) => (
  <svg viewBox="0 0 24 24" width={size} height={size}>
    <defs><linearGradient id="am1" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#fc3c44"/><stop offset="100%" stopColor="#ff6b6b"/></linearGradient></defs>
    <circle cx="12" cy="12" r="12" fill="url(#am1)"/>
    <path d="M15.5 6.5c.3 0 .5.2.5.5v8c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2c.4 0 .7.1 1 .3V9.2l-5 1.3V17c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2c.4 0 .7.1 1 .3V8c0-.3.2-.5.5-.5l6-1z" fill="white"/>
  </svg>
);
const AmazonMusicIcon = ({ size = 32 }: { size?: number }) => (
  <svg viewBox="0 0 24 24" width={size} height={size}>
    <circle cx="12" cy="12" r="12" fill="#FF9900"/>
    <text x="12" y="15" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#232F3E" fontFamily="Arial">a</text>
    <path d="M6.5 17c3 1.3 6.5 1.3 9.5 0" stroke="#232F3E" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
    <path d="M15.2 16.3l1.3 1.2-1.3.5" stroke="#232F3E" strokeWidth="1" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const YTMusicIcon = ({ size = 32 }: { size?: number }) => (
  <svg viewBox="0 0 24 24" width={size} height={size}>
    <circle cx="12" cy="12" r="12" fill="#FF0000"/>
    <circle cx="12" cy="12" r="5" fill="white"/>
    <circle cx="12" cy="12" r="2.5" fill="#FF0000"/>
    <polygon points="10.5,10.5 14.5,12 10.5,13.5" fill="white"/>
  </svg>
);
const DeezerIcon = ({ size = 32 }: { size?: number }) => (
  <svg viewBox="0 0 24 24" width={size} height={size}>
    <circle cx="12" cy="12" r="12" fill="#A238FF"/>
    <rect x="5" y="14" width="2" height="3" rx="1" fill="#FF6B35"/>
    <rect x="8.5" y="12" width="2" height="5" rx="1" fill="#FF6B35"/>
    <rect x="12" y="10" width="2" height="7" rx="1" fill="#FF6B35"/>
    <rect x="15.5" y="8" width="2" height="9" rx="1" fill="#FF6B35"/>
  </svg>
);
const TidalIcon = ({ size = 32 }: { size?: number }) => (
  <svg viewBox="0 0 24 24" width={size} height={size}>
    <circle cx="12" cy="12" r="12" fill="#000000"/>
    <path d="M8 10l4-4 4 4-4 4z" fill="white"/>
    <path d="M4 14l4-4 4 4-4 4z" fill="white" opacity="0.6"/>
    <path d="M12 14l4-4 4 4-4 4z" fill="white" opacity="0.6"/>
  </svg>
);
const TikTokIcon = ({ size = 32 }: { size?: number }) => (
  <svg viewBox="0 0 24 24" width={size} height={size}>
    <circle cx="12" cy="12" r="12" fill="#010101"/>
    <path d="M16.5 7.5c-.8-.5-1.4-1.3-1.6-2.2h-2v9.5c0 1-.8 1.7-1.7 1.7s-1.7-.8-1.7-1.7.8-1.7 1.7-1.7c.2 0 .3 0 .5.1V11c-.2 0-.3 0-.5 0-2.1 0-3.7 1.7-3.7 3.7s1.7 3.7 3.7 3.7 3.7-1.7 3.7-3.7V9.8c.8.5 1.7.8 2.7.8V8.4c-.4 0-.8-.1-1.1-.3z" fill="white"/>
  </svg>
);
const SoundCloudIcon = ({ size = 32 }: { size?: number }) => (
  <svg viewBox="0 0 24 24" width={size} height={size}>
    <circle cx="12" cy="12" r="12" fill="#FF5500"/>
    <path d="M4 14.5c0 .8.6 1.5 1.5 1.5h13c.8 0 1.5-.7 1.5-1.5 0-.7-.5-1.3-1.2-1.5.1-.3.2-.6.2-.9 0-1.7-1.3-3-3-3-.4 0-.8.1-1.1.2C14.5 7.7 13.1 7 11.5 7c-2.2 0-4 1.8-4 4 0 .1 0 .2 0 .3C6.6 11.5 5 12.8 5 14.5z" fill="white"/>
  </svg>
);
const PandoraIcon = ({ size = 32 }: { size?: number }) => (
  <svg viewBox="0 0 24 24" width={size} height={size}>
    <circle cx="12" cy="12" r="12" fill="#005483"/>
    <text x="12" y="16.5" textAnchor="middle" fontSize="12" fontWeight="bold" fill="white" fontFamily="Georgia, serif">P</text>
  </svg>
);
const BeatportIcon = ({ size = 32 }: { size?: number }) => (
  <svg viewBox="0 0 24 24" width={size} height={size}>
    <circle cx="12" cy="12" r="12" fill="#01FF95"/>
    <text x="12" y="16" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#000" fontFamily="Arial">BP</text>
  </svg>
);
const BoomplayIcon = ({ size = 32 }: { size?: number }) => (
  <svg viewBox="0 0 24 24" width={size} height={size}>
    <circle cx="12" cy="12" r="12" fill="#E8192C"/>
    <circle cx="12" cy="12" r="4.5" fill="white"/>
    <circle cx="12" cy="12" r="2" fill="#E8192C"/>
  </svg>
);
const NapsterIcon = ({ size = 32 }: { size?: number }) => (
  <svg viewBox="0 0 24 24" width={size} height={size}>
    <circle cx="12" cy="12" r="12" fill="#1F1F1F"/>
    <text x="12" y="15" textAnchor="middle" fontSize="7" fontWeight="bold" fill="#00BFFF" fontFamily="Arial">NAP</text>
    <text x="12" y="19" textAnchor="middle" fontSize="5" fontWeight="bold" fill="#00BFFF44" fontFamily="Arial">STER</text>
  </svg>
);
const AnghamiIcon = ({ size = 32 }: { size?: number }) => (
  <svg viewBox="0 0 24 24" width={size} height={size}>
    <circle cx="12" cy="12" r="12" fill="#FF4B77"/>
    <text x="12" y="15" textAnchor="middle" fontSize="7" fontWeight="bold" fill="white" fontFamily="Arial">ANG</text>
    <text x="12" y="19.5" textAnchor="middle" fontSize="5" fontWeight="bold" fill="white" fontFamily="Arial">HAMI</text>
  </svg>
);
const YouTubeIcon = ({ size = 36 }: { size?: number }) => (
  <svg viewBox="0 0 24 24" width={size} height={size}>
    <path d="M23.5 6.2c-.3-1-1-1.8-2-2.1C19.7 3.5 12 3.5 12 3.5s-7.7 0-9.5.6c-1 .3-1.7 1.1-2 2.1C0 8 0 12 0 12s0 4 .5 5.8c.3 1 1 1.8 2 2.1C4.3 20.5 12 20.5 12 20.5s7.7 0 9.5-.6c1-.3 1.7-1.1 2-2.1C24 16 24 12 24 12s0-4-.5-5.8z" fill="#FF0000"/>
    <polygon points="9.5,15.5 15.8,12 9.5,8.5" fill="white"/>
  </svg>
);

/* ── NEW: Facebook Icon ── */
const FacebookIcon = ({ size = 32 }: { size?: number }) => (
  <svg viewBox="0 0 24 24" width={size} height={size}>
    <circle cx="12" cy="12" r="12" fill="#1877F2"/>
    <path d="M15.5 8H13.5C13.2 8 13 8.2 13 8.5V10H15.5L15.2 12.5H13V19H10.5V12.5H9V10H10.5V8.5C10.5 6.6 11.8 5.5 13.5 5.5C14.3 5.5 15 5.6 15.5 5.7V8Z" fill="white"/>
  </svg>
);

/* ── NEW: Instagram Icon ── */
const InstagramIcon = ({ size = 32 }: { size?: number }) => (
  <svg viewBox="0 0 24 24" width={size} height={size}>
    <defs>
      <linearGradient id="ig-grad" x1="0%" y1="100%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#FFDC80"/>
        <stop offset="25%" stopColor="#FCAF45"/>
        <stop offset="50%" stopColor="#F77737"/>
        <stop offset="75%" stopColor="#C13584"/>
        <stop offset="100%" stopColor="#833AB4"/>
      </linearGradient>
    </defs>
    <circle cx="12" cy="12" r="12" fill="url(#ig-grad)"/>
    <rect x="7" y="7" width="10" height="10" rx="3" fill="none" stroke="white" strokeWidth="1.5"/>
    <circle cx="12" cy="12" r="2.5" fill="none" stroke="white" strokeWidth="1.5"/>
    <circle cx="15.5" cy="8.5" r="0.8" fill="white"/>
  </svg>
);

/* ── NEW: Apple (iOS/iPhone) Icon ── */
const AppleIcon = ({ size = 32 }: { size?: number }) => (
  <svg viewBox="0 0 24 24" width={size} height={size}>
    <circle cx="12" cy="12" r="12" fill="#555555"/>
    <path d="M15.5 12.5c0-1.7 1.4-2.5 1.4-2.5s-.8-1.1-2-1.1c-.8 0-1.5.5-1.9.5-.4 0-1-.5-1.7-.5-1.3 0-2.6 1.1-2.6 3.1 0 1.9 1.3 4 2.3 4 .5 0 1-.4 1.7-.4.7 0 1.1.4 1.8.4 1.1 0 2.2-2 2.2-2s-1.2-.5-1.2-1.5zM13.8 7.5c.4-.5.7-1.2.6-1.9-.6 0-1.3.4-1.7.9-.4.4-.7 1.1-.6 1.8.6.1 1.3-.3 1.7-.8z" fill="white"/>
  </svg>
);

const KMIcon = ({ size = 36, glow = '#ffd700' }: { size?: number; glow?: string }) => (
  <img
    src="/assets/images/1608452013412__1_-1786673847726.png"
    alt="Karhari Media"
    style={{ width: size, height: size, objectFit: 'contain', filter: `drop-shadow(0 0 8px ${glow})` }}
  />
);

/* ── NEW: Business/Company/Organization Icon (SVG) ── */
const BusinessIcon = ({ size = 28, color = '#00f5ff' }: { size?: number; color?: string }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none">
    <rect x="3" y="7" width="18" height="14" rx="2" stroke={color} strokeWidth="1.5" fill={color + '18'}/>
    <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    <line x1="12" y1="12" x2="12" y2="12" stroke={color} strokeWidth="2" strokeLinecap="round"/>
    <rect x="10" y="11" width="4" height="3" rx="0.5" stroke={color} strokeWidth="1.2" fill={color + '22'}/>
    <line x1="3" y1="12" x2="21" y2="12" stroke={color} strokeWidth="1" strokeOpacity="0.4"/>
  </svg>
);

/* ── NEW: Approval / Checkmark Shield Icon (SVG) ── */
const ApprovalIcon = ({ size = 28, color = '#a855f7' }: { size?: number; color?: string }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none">
    <path d="M12 2L4 5v6c0 5 3.5 9.7 8 11 4.5-1.3 8-6 8-11V5L12 2z" stroke={color} strokeWidth="1.5" fill={color + '18'}/>
    <path d="M8.5 12l2.5 2.5 4.5-4.5" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

/* ── NEW: Store / Shop Icon (SVG) ── */
const StoreIcon = ({ size = 28, color = '#00ff88' }: { size?: number; color?: string }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none">
    <path d="M3 9l1-5h16l1 5" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M3 9c0 1.1.9 2 2 2s2-.9 2-2 .9 2 2 2 2-.9 2-2 .9 2 2 2 2-.9 2-2" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    <rect x="5" y="13" width="14" height="8" rx="1" stroke={color} strokeWidth="1.5" fill={color + '18'}/>
    <rect x="9" y="16" width="6" height="5" rx="0.5" stroke={color} strokeWidth="1.2" fill={color + '22'}/>
  </svg>
);

/* ── NEW: Real Play Icon (SVG) ── */
const PlayIcon = ({ size = 28, color = '#1DB954' }: { size?: number; color?: string }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none">
    <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="1.5" fill={color + '18'}/>
    <polygon points="10,8 18,12 10,16" fill={color} stroke={color} strokeWidth="0.5" strokeLinejoin="round"/>
  </svg>
);

/* ── NEW: Dollar Sign Icon (SVG) ── */
const DollarIcon = ({ size = 28, color = '#FF9900' }: { size?: number; color?: string }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none">
    <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="1.5" fill={color + '18'}/>
    <path d="M12 6v12M9.5 9.5c0-1.1.9-2 2.5-2s2.5.9 2.5 2-.9 1.5-2.5 2-2.5.9-2.5 2 .9 2 2.5 2 2.5-.9 2.5-2" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

/* ── NEW: Payout / Bank Transfer Icon (SVG) ── */
const PayoutIcon = ({ size = 28, color = '#ff006e' }: { size?: number; color?: string }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none">
    <rect x="2" y="6" width="20" height="14" rx="2" stroke={color} strokeWidth="1.5" fill={color + '18'}/>
    <path d="M2 10h20" stroke={color} strokeWidth="1.5"/>
    <rect x="5" y="13" width="5" height="3" rx="0.5" stroke={color} strokeWidth="1.2" fill={color + '22'}/>
    <path d="M14 14.5h5" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M2 6l10-4 10 4" stroke={color} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

/* ═══════════════════════════════════════════
   LIVE COUNTER HOOK — updates 3-4x per second
═══════════════════════════════════════════ */
function useLiveCounter(baseMillions: number, incrementPerTick: number = 0.003) {
  const [value, setValue] = useState(baseMillions);
  useEffect(() => {
    // Update 3-4 times per second at medium speed
    const interval = setInterval(() => {
      setValue(v => parseFloat((v + incrementPerTick).toFixed(4)));
    }, 280); // ~3.5 times per second
    return () => clearInterval(interval);
  }, [incrementPerTick]);
  return value;
}

function formatMillions(n: number): string {
  if (n >= 1000) return (n / 1000).toFixed(2) + 'B';
  if (n >= 1) return n.toFixed(2) + 'M';
  return (n * 1000).toFixed(1) + 'K';
}

/* ═══════════════════════════════════════════
   ANIMATED COUNTER HOOK
═══════════════════════════════════════════ */
function useCounter(target: number, duration: number = 3000, increment: number = 1) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    let current = 0;
    const steps = Math.floor(duration / 50);
    const step = target / steps;
    const timer = setInterval(() => {
      current += step;
      if (current >= target) { setValue(target); clearInterval(timer); }
      else { setValue(Math.floor(current)); }
    }, 50);
    const slowTimer = setTimeout(() => {
      const slow = setInterval(() => { setValue(v => v + increment); }, 900);
      return () => clearInterval(slow);
    }, duration + 200);
    return () => { clearInterval(timer); clearTimeout(slowTimer); };
  }, []);
  return value;
}

function formatNum(n: number): string {
  if (n >= 1_000_000_000) return (n / 1_000_000_000).toFixed(1) + 'B';
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(2) + 'M';
  if (n >= 1_000) return (n / 1_000).toFixed(1) + 'K';
  return n.toLocaleString();
}

/* ═══════════════════════════════════════════
   ANIMATED PIPELINE CONNECTOR
═══════════════════════════════════════════ */
function PipeConnector({ color, vertical = false, label }: { color: string; vertical?: boolean; label?: string }) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: vertical ? 'column' : 'row',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
      position: 'relative',
      zIndex: 10,
      ...(vertical ? { width: 2, minHeight: 40, margin: '0 auto' } : { height: 2, minWidth: 40, margin: 'auto 0' }),
    }}>
      <div style={{
        ...(vertical ? { width: 2, flex: 1 } : { height: 2, flex: 1 }),
        background: `linear-gradient(${vertical ? '180deg' : '90deg'}, ${color}33, ${color}88, ${color}33)`,
        boxShadow: `0 0 6px ${color}44`,
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute',
          ...(vertical ? { left: '-50%', top: 0, width: '200%', height: 8 } : { top: '-50%', left: 0, height: '200%', width: 8 }),
          background: `linear-gradient(${vertical ? '180deg' : '90deg'}, transparent, ${color}, transparent)`,
          boxShadow: `0 0 8px ${color}`,
          animation: `conn-travel-${vertical ? 'v' : 'h'} 1.5s linear infinite`,
        }} />
      </div>
      <div style={{
        width: 0, height: 0,
        ...(vertical ? {
          borderLeft: '6px solid transparent',
          borderRight: '6px solid transparent',
          borderTop: `8px solid ${color}88`,
          filter: `drop-shadow(0 0 4px ${color})`,
        } : {
          borderTop: '6px solid transparent',
          borderBottom: '6px solid transparent',
          borderLeft: `8px solid ${color}88`,
          filter: `drop-shadow(0 0 4px ${color})`,
        }),
      }} />
      {label && (
        <div style={{
          position: 'absolute',
          top: vertical ? '50%' : -18,
          left: vertical ? 8 : '50%',
          transform: vertical ? 'translateY(-50%)' : 'translateX(-50%)',
          fontSize: 7, color, fontWeight: 800, letterSpacing: '0.1em',
          whiteSpace: 'nowrap', background: '#020208', padding: '1px 4px',
        }}>{label}</div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════
   CORNER BRACKETS OVERLAY
═══════════════════════════════════════════ */
function CornerBrackets({ color }: { color: string }) {
  // Removed — corner dots/brackets removed per user request
  return null;
}

/* ═══════════════════════════════════════════
   FINGERPRINT SCANNER ANIMATION
═══════════════════════════════════════════ */
function FingerprintScanner({ color, size = 52 }: { color: string; size?: number }) {
  return (
    <div style={{ position: 'relative', width: size, height: size, flexShrink: 0 }}>
      <svg viewBox="0 0 52 52" width={size} height={size} style={{ position: 'absolute', top: 0, left: 0 }}>
        <circle cx="26" cy="26" r="22" fill="none" stroke={color + '22'} strokeWidth="1"/>
        <path d="M26 10 C17 10 11 17 11 26 C11 35 17 42 26 42" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeDasharray="60" style={{ animation: `fp-draw 2s linear infinite` }}/>
        <path d="M26 15 C19 15 15 20 15 26 C15 32 19 37 26 37" fill="none" stroke={color + 'cc'} strokeWidth="1.8" strokeLinecap="round" strokeDasharray="50" style={{ animation: `fp-draw 2s linear 0.3s infinite` }}/>
        <path d="M26 20 C22 20 19 22.5 19 26 C19 29.5 22 32 26 32" fill="none" stroke={color + '99'} strokeWidth="1.8" strokeLinecap="round" strokeDasharray="35" style={{ animation: `fp-draw 2s linear 0.6s infinite` }}/>
        <path d="M26 10 C35 10 41 17 41 26 C41 35 35 42 26 42" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeDasharray="60" style={{ animation: `fp-draw 2s linear 0.15s infinite` }}/>
        <path d="M26 15 C33 15 37 20 37 26 C37 32 33 37 26 37" fill="none" stroke={color + 'cc'} strokeWidth="1.8" strokeLinecap="round" strokeDasharray="50" style={{ animation: `fp-draw 2s linear 0.45s infinite` }}/>
        <path d="M26 20 C30 20 33 22.5 33 26 C33 29.5 30 32 26 32" fill="none" stroke={color + '99'} strokeWidth="1.8" strokeLinecap="round" strokeDasharray="35" style={{ animation: `fp-draw 2s linear 0.75s infinite` }}/>
        <circle cx="26" cy="26" r="2.5" fill={color} style={{ animation: 'fp-center-pulse 1s ease-in-out infinite' }}/>
      </svg>
      <div style={{
        position: 'absolute', top: 4, left: 4, right: 4, height: 2,
        background: `linear-gradient(90deg, transparent, ${color}cc, transparent)`,
        boxShadow: `0 0 8px ${color}`,
        animation: 'fp-scan 1.5s ease-in-out infinite',
      }} />
    </div>
  );
}

/* ═══════════════════════════════════════════
   UNIFORM PIPELINE STEP CARD — Fixed 220×260px
═══════════════════════════════════════════ */
interface StepCardProps {
  step: number;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  color: string;
  tags?: string[];
  scanning?: boolean;
  contentIdScan?: boolean;
  storeGrid?: React.ReactNode;
  delay?: number;
  liveNumber?: { value: number; label: string; prefix?: string };
}

function StepCard({ step, title, subtitle, icon, color, tags, scanning, contentIdScan, storeGrid, delay = 0, liveNumber }: StepCardProps) {
  // New glassmorphism card design with warm gradient palette
  const accentGlow = `${color}55`;
  const cardBg = `linear-gradient(135deg, ${color}18 0%, #0d0a1a 40%, ${color}0a 70%, #12081e 100%)`;
  return (
    <div className="pipeline-card" style={{
      position: 'relative',
      background: cardBg,
      border: `1.5px solid ${color}55`,
      borderRadius: 20,
      padding: '16px 14px 12px',
      overflow: 'hidden',
      boxShadow: `0 0 32px ${color}22, 0 8px 40px rgba(0,0,0,0.7), inset 0 1px 0 ${color}22`,
      animation: `mdp-card-rise 0.6s cubic-bezier(0.22,1,0.36,1) ${delay}s both`,
      flexShrink: 0,
      display: 'flex',
      flexDirection: 'column',
      gap: 0,
      backdropFilter: 'blur(12px)',
    } as React.CSSProperties}>

      {/* Shimmer sweep animation */}
      <div style={{
        position: 'absolute', top: 0, left: '-120%', width: '80%', height: '100%',
        background: `linear-gradient(105deg, transparent 30%, ${color}18 50%, transparent 70%)`,
        animation: `mdp-shimmer 3.5s ease-in-out ${delay}s infinite`,
        zIndex: 2, pointerEvents: 'none',
      }} />

      {/* Top glowing border line */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 2,
        background: `linear-gradient(90deg, transparent, ${color}cc, ${color}, ${color}cc, transparent)`,
        boxShadow: `0 0 12px ${color}`,
        animation: `mdp-top-glow 2s ease-in-out ${delay}s infinite`,
        zIndex: 8,
      }} />

      {/* Floating orb background */}
      <div style={{
        position: 'absolute', bottom: -20, right: -20, width: 80, height: 80,
        borderRadius: '50%',
        background: `radial-gradient(circle, ${color}18 0%, transparent 70%)`,
        animation: `mdp-orb-float 4s ease-in-out ${delay * 0.5}s infinite`,
        zIndex: 1, pointerEvents: 'none',
      }} />

      {/* Step badge — new pill design */}
      <div style={{
        position: 'absolute', top: 10, right: 10,
        background: `linear-gradient(135deg, ${color}33, ${color}55)`,
        border: `1px solid ${color}88`,
        borderRadius: 8,
        padding: '2px 7px',
        fontSize: 9, fontWeight: 900, color,
        fontFamily: 'JetBrains Mono, monospace',
        boxShadow: `0 0 10px ${color}44, inset 0 1px 0 ${color}44`,
        zIndex: 9, letterSpacing: '0.05em',
      }}>0{step}</div>

      {/* Icon area — hexagonal glow ring */}
      <div style={{
        width: 54, height: 54, borderRadius: 16,
        background: `linear-gradient(135deg, ${color}22 0%, ${color}0a 100%)`,
        border: `1.5px solid ${color}44`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        marginBottom: 10, flexShrink: 0,
        boxShadow: `0 0 20px ${color}33, inset 0 1px 0 ${color}33`,
        position: 'relative', overflow: 'hidden',
        animation: `mdp-icon-pulse 2.5s ease-in-out ${delay}s infinite`,
        zIndex: 5,
      }}>
        {icon}
        {/* Icon inner shimmer */}
        <div style={{
          position: 'absolute', top: '-100%', left: 0, width: '100%', height: '100%',
          background: `linear-gradient(180deg, transparent, ${color}44, transparent)`,
          animation: `pipe-scan-v 2.2s linear ${delay}s infinite`,
        }} />
      </div>

      {/* Title */}
      <div style={{
        fontSize: 10.5, fontWeight: 900, color,
        letterSpacing: '0.06em', marginBottom: 5,
        textShadow: `0 0 12px ${color}88`,
        lineHeight: 1.25, flexShrink: 0,
        position: 'relative', zIndex: 5,
      }}>{title}</div>

      {/* Subtitle */}
      <div style={{
        fontSize: 8.5, color: '#7a6a9a', letterSpacing: '0.03em',
        lineHeight: 1.5, flexShrink: 0,
        flex: storeGrid ? '0 0 auto' : 1,
        position: 'relative', zIndex: 5,
      }}>{subtitle}</div>

      {/* Live number display — new frosted pill */}
      {liveNumber && (
        <div style={{
          marginTop: 8, padding: '7px 10px',
          background: `linear-gradient(135deg, ${color}15, ${color}08)`,
          border: `1px solid ${color}44`,
          borderRadius: 10, textAlign: 'center', flexShrink: 0,
          boxShadow: `0 0 12px ${color}18, inset 0 1px 0 ${color}22`,
          position: 'relative', zIndex: 5,
        }}>
          <div style={{
            fontSize: 17, fontWeight: 900, color,
            fontFamily: 'JetBrains Mono, monospace',
            textShadow: `0 0 14px ${color}`,
            letterSpacing: '0.04em',
            animation: `mdp-num-tick 0.15s ease-out`,
          }}>{liveNumber.prefix || ''}{formatMillions(liveNumber.value)}</div>
          <div style={{ fontSize: 7, color: color + '99', letterSpacing: '0.12em', fontWeight: 700, marginTop: 2 }}>{liveNumber.label}</div>
        </div>
      )}

      {/* Store grid */}
      {storeGrid && (
        <div style={{ marginTop: 8, flex: 1, position: 'relative', zIndex: 5 }}>
          {storeGrid}
        </div>
      )}

      {/* Tags — new rounded pill style */}
      {tags && !storeGrid && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 3, marginTop: 8, flexShrink: 0, position: 'relative', zIndex: 5 }}>
          {tags.map(tag => (
            <span key={tag} style={{
              fontSize: 7, fontWeight: 800, color,
              background: `linear-gradient(135deg, ${color}18, ${color}0a)`,
              border: `1px solid ${color}44`,
              borderRadius: 6, padding: '2px 6px', letterSpacing: '0.07em',
              boxShadow: `0 0 6px ${color}18`,
            }}>{tag}</span>
          ))}
        </div>
      )}

      {/* Scanning animation */}
      {scanning && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 8, flexShrink: 0, position: 'relative', zIndex: 5 }}>
          <FingerprintScanner color={color} size={36} />
          <div style={{ fontSize: 7.5, color, letterSpacing: '0.12em', fontWeight: 800, animation: 'pipe-blink 0.9s infinite' }}>
            SCANNING...<br/>
            <span style={{ color: color + '88', fontWeight: 600 }}>VERIFYING</span>
          </div>
        </div>
      )}

      {/* Content ID fingerprint scanner */}
      {contentIdScan && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 8, flexShrink: 0, position: 'relative', zIndex: 5 }}>
          <FingerprintScanner color={color} size={40} />
          <div style={{ fontSize: 7.5, color, letterSpacing: '0.1em', fontWeight: 800 }}>
            <div style={{ animation: 'pipe-blink 0.7s infinite' }}>CONTENT ID</div>
            <div style={{ color: color + '88', fontWeight: 600 }}>FINGERPRINT</div>
            <div style={{ color: '#00ff88', fontWeight: 800, animation: 'pipe-blink 1.2s infinite' }}>MATCHED ✓</div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════
   DUAL INPUT CARDS — Artist + Record Label side by side
   Uses BusinessIcon for both cards
═══════════════════════════════════════════ */
function DualInputCards({ color, delay = 0, liveArtistTracks, liveLabelSongs }: { color: string; delay?: number; liveArtistTracks?: number; liveLabelSongs?: number }) {
  // New design: warm amber for Artist, violet for Record Label
  const artistColor = '#f59e0b';
  const labelColor = '#c084fc';
  return (
    <div className="dual-input-cards" style={{ display: 'flex', flexDirection: 'column', gap: 10, flexShrink: 0 }}>
      {/* Artist Card — amber/gold */}
      <div className="dual-card" style={{
        position: 'relative',
        background: `linear-gradient(135deg, ${artistColor}18 0%, #0d0a1a 50%, ${artistColor}0a 100%)`,
        border: `1.5px solid ${artistColor}55`,
        borderRadius: 18,
        padding: '12px 14px',
        overflow: 'hidden',
        boxShadow: `0 0 28px ${artistColor}22, 0 4px 28px rgba(0,0,0,0.6), inset 0 1px 0 ${artistColor}22`,
        animation: `mdp-card-rise 0.6s cubic-bezier(0.22,1,0.36,1) ${delay}s both`,
        flexShrink: 0,
        backdropFilter: 'blur(10px)',
      }}>
        {/* Top glow line */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, transparent, ${artistColor}cc, transparent)`, boxShadow: `0 0 10px ${artistColor}`, animation: `mdp-top-glow 2.2s ease-in-out ${delay}s infinite`, zIndex: 8 }} />
        {/* Shimmer */}
        <div style={{ position: 'absolute', top: 0, left: '-120%', width: '80%', height: '100%', background: `linear-gradient(105deg, transparent 30%, ${artistColor}14 50%, transparent 70%)`, animation: `mdp-shimmer 3.8s ease-in-out ${delay}s infinite`, zIndex: 2, pointerEvents: 'none' }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, position: 'relative', zIndex: 5 }}>
          <div style={{
            width: 42, height: 42, borderRadius: 12,
            background: `linear-gradient(135deg, ${artistColor}22, ${artistColor}0a)`,
            border: `1.5px solid ${artistColor}44`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0, boxShadow: `0 0 16px ${artistColor}33`,
            animation: `mdp-icon-pulse 2.5s ease-in-out ${delay}s infinite`,
          }}>
            <BusinessIcon size={24} color={artistColor} />
          </div>
          <div>
            <div style={{ fontSize: 10, fontWeight: 900, color: artistColor, letterSpacing: '0.07em', marginBottom: 3, textShadow: `0 0 10px ${artistColor}88` }}>ARTIST</div>
            <div style={{ fontSize: 8, color: '#7a6a9a', lineHeight: 1.4 }}>Uploads audio file, metadata &amp; artwork</div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 3, marginTop: 6, position: 'relative', zIndex: 5 }}>
          {['AUDIO', 'METADATA', 'ART'].map(t => (
            <span key={t} style={{ fontSize: 6.5, fontWeight: 800, color: artistColor, background: `linear-gradient(135deg, ${artistColor}18, ${artistColor}0a)`, border: `1px solid ${artistColor}44`, borderRadius: 5, padding: '1px 5px', letterSpacing: '0.06em', boxShadow: `0 0 5px ${artistColor}18` }}>{t}</span>
          ))}
        </div>
        {liveArtistTracks !== undefined && (
          <div style={{ marginTop: 7, padding: '5px 8px', background: `linear-gradient(135deg, ${artistColor}15, ${artistColor}08)`, border: `1px solid ${artistColor}44`, borderRadius: 9, textAlign: 'center', position: 'relative', zIndex: 5, boxShadow: `0 0 10px ${artistColor}18` }}>
            <div style={{ fontSize: 14, fontWeight: 900, color: artistColor, fontFamily: 'JetBrains Mono, monospace', textShadow: `0 0 10px ${artistColor}`, letterSpacing: '0.05em' }}>{formatMillions(liveArtistTracks)}</div>
            <div style={{ fontSize: 6.5, color: artistColor + '99', letterSpacing: '0.1em', fontWeight: 700 }}>TRACKS UPLOADED</div>
          </div>
        )}
      </div>

      {/* Record Label Card — violet/purple */}
      <div className="dual-card" style={{
        position: 'relative',
        background: `linear-gradient(135deg, ${labelColor}18 0%, #0d0a1a 50%, ${labelColor}0a 100%)`,
        border: `1.5px solid ${labelColor}55`,
        borderRadius: 18,
        padding: '12px 14px',
        overflow: 'hidden',
        boxShadow: `0 0 28px ${labelColor}22, 0 4px 28px rgba(0,0,0,0.6), inset 0 1px 0 ${labelColor}22`,
        animation: `mdp-card-rise 0.6s cubic-bezier(0.22,1,0.36,1) ${delay + 0.12}s both`,
        flexShrink: 0,
        backdropFilter: 'blur(10px)',
      }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, transparent, ${labelColor}cc, transparent)`, boxShadow: `0 0 10px ${labelColor}`, animation: `mdp-top-glow 2.4s ease-in-out ${delay + 0.2}s infinite`, zIndex: 8 }} />
        <div style={{ position: 'absolute', top: 0, left: '-120%', width: '80%', height: '100%', background: `linear-gradient(105deg, transparent 30%, ${labelColor}14 50%, transparent 70%)`, animation: `mdp-shimmer 4s ease-in-out ${delay + 0.3}s infinite`, zIndex: 2, pointerEvents: 'none' }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, position: 'relative', zIndex: 5 }}>
          <div style={{
            width: 42, height: 42, borderRadius: 12,
            background: `linear-gradient(135deg, ${labelColor}22, ${labelColor}0a)`,
            border: `1.5px solid ${labelColor}44`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0, boxShadow: `0 0 16px ${labelColor}33`,
            animation: `mdp-icon-pulse 2.8s ease-in-out ${delay + 0.1}s infinite`,
          }}>
            <BusinessIcon size={24} color={labelColor} />
          </div>
          <div>
            <div style={{ fontSize: 10, fontWeight: 900, color: labelColor, letterSpacing: '0.07em', marginBottom: 3, textShadow: `0 0 10px ${labelColor}88` }}>RECORD LABEL</div>
            <div style={{ fontSize: 8, color: '#7a6a9a', lineHeight: 1.4 }}>Sends songs, album releases &amp; catalog</div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 3, marginTop: 6, position: 'relative', zIndex: 5 }}>
          {['SONGS', 'ALBUMS', 'CATALOG'].map(t => (
            <span key={t} style={{ fontSize: 6.5, fontWeight: 800, color: labelColor, background: `linear-gradient(135deg, ${labelColor}18, ${labelColor}0a)`, border: `1px solid ${labelColor}44`, borderRadius: 5, padding: '1px 5px', letterSpacing: '0.06em', boxShadow: `0 0 5px ${labelColor}18` }}>{t}</span>
          ))}
        </div>
        {liveLabelSongs !== undefined && (
          <div style={{ marginTop: 7, padding: '5px 8px', background: `linear-gradient(135deg, ${labelColor}15, ${labelColor}08)`, border: `1px solid ${labelColor}44`, borderRadius: 9, textAlign: 'center', position: 'relative', zIndex: 5, boxShadow: `0 0 10px ${labelColor}18` }}>
            <div style={{ fontSize: 14, fontWeight: 900, color: labelColor, fontFamily: 'JetBrains Mono, monospace', textShadow: `0 0 10px ${labelColor}`, letterSpacing: '0.05em' }}>{formatMillions(liveLabelSongs)}</div>
            <div style={{ fontSize: 6.5, color: labelColor + '99', letterSpacing: '0.1em', fontWeight: 700 }}>SONGS SUBMITTED</div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   STORE GRID — Popular stores with real icons
   Includes: Spotify, Apple Music, Amazon Music, YouTube Music,
   YouTube, Facebook, Instagram, Apple/iPhone, Deezer, TIDAL, TikTok, SoundCloud
═══════════════════════════════════════════ */
function StoreIconGrid({ color }: { color: string }) {
  const stores = [
    { icon: <SpotifyIcon size={22} />, name: 'Spotify', c: '#1DB954' },
    { icon: <AppleMusicIcon size={22} />, name: 'Apple Music', c: '#fc3c44' },
    { icon: <AmazonMusicIcon size={22} />, name: 'Amazon Music', c: '#FF9900' },
    { icon: <YTMusicIcon size={22} />, name: 'YouTube Music', c: '#FF0000' },
    { icon: <YouTubeIcon size={22} />, name: 'YouTube', c: '#FF0000' },
    { icon: <FacebookIcon size={22} />, name: 'Facebook', c: '#1877F2' },
    { icon: <InstagramIcon size={22} />, name: 'Instagram', c: '#C13584' },
    { icon: <AppleIcon size={22} />, name: 'Apple / iPhone', c: '#888888' },
    { icon: <DeezerIcon size={22} />, name: 'Deezer', c: '#A238FF' },
    { icon: <TidalIcon size={22} />, name: 'TIDAL', c: '#ffffff' },
    { icon: <TikTokIcon size={22} />, name: 'TikTok', c: '#69C9D0' },
    { icon: <SoundCloudIcon size={22} />, name: 'SoundCloud', c: '#FF5500' },
  ];
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 4 }}>
      {stores.map((s, i) => (
        <div key={i} title={s.name} style={{
          width: 36, height: 36, borderRadius: 10,
          background: `linear-gradient(135deg, ${s.c}20, ${s.c}08)`,
          border: `1.5px solid ${s.c}55`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: `0 0 8px ${s.c}28, inset 0 1px 0 ${s.c}22`,
          animation: `mdp-store-pop 0.45s cubic-bezier(0.34,1.56,0.64,1) ${i * 0.045}s both`,
          cursor: 'default',
          transition: 'transform 0.2s ease',
        }}>
          {s.icon}
        </div>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════
   REVENUE STORE GRID — stores sending revenue back
═══════════════════════════════════════════ */
function RevenueStoreGrid({ color }: { color: string }) {
  const stores = [
    { icon: <SpotifyIcon size={20} />, name: 'Spotify', c: '#1DB954' },
    { icon: <AppleMusicIcon size={20} />, name: 'Apple Music', c: '#fc3c44' },
    { icon: <AmazonMusicIcon size={20} />, name: 'Amazon Music', c: '#FF9900' },
    { icon: <YTMusicIcon size={20} />, name: 'YouTube Music', c: '#FF0000' },
    { icon: <YouTubeIcon size={20} />, name: 'YouTube', c: '#FF0000' },
    { icon: <FacebookIcon size={20} />, name: 'Facebook', c: '#1877F2' },
    { icon: <InstagramIcon size={20} />, name: 'Instagram', c: '#C13584' },
    { icon: <AppleIcon size={20} />, name: 'Apple / iPhone', c: '#888888' },
  ];
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 3 }}>
      {stores.map((s, i) => (
        <div key={i} title={s.name} style={{
          width: 32, height: 32, borderRadius: 9,
          background: `linear-gradient(135deg, ${s.c}20, ${s.c}08)`,
          border: `1.5px solid ${s.c}55`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: `0 0 7px ${s.c}28, inset 0 1px 0 ${s.c}22`,
          animation: `mdp-store-pop 0.45s cubic-bezier(0.34,1.56,0.64,1) ${i * 0.055}s both`,
        }}>
          {s.icon}
        </div>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════
   PHASE LABEL DIVIDER
═══════════════════════════════════════════ */
function PhaseDivider({ label, color }: { label: string; color: string }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 12,
      margin: '20px auto 16px', position: 'relative', zIndex: 10,
      width: '100%', maxWidth: 1400,
    }}>
      <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg, transparent, ${color}44)` }} />
      <div style={{
        display: 'flex', alignItems: 'center', gap: 8,
        background: `${color}0a`, border: `1px solid ${color}33`,
        borderRadius: 20, padding: '5px 16px',
      }}>
        <div style={{ width: 6, height: 6, borderRadius: '50%', background: color, animation: 'pipe-blink 0.8s infinite', boxShadow: `0 0 6px ${color}` }} />
        <span style={{ fontSize: 'clamp(7px, 1.5vw, 9px)', color, letterSpacing: '0.15em', fontWeight: 800 }}>{label}</span>
      </div>
      <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg, ${color}44, transparent)` }} />
    </div>
  );
}

/* ═══════════════════════════════════════════
   PIPELINE ROW — horizontal with connectors
═══════════════════════════════════════════ */
function PipelineRow({ children, color }: { children: React.ReactNode; color: string }) {
  return (
    <div className="pipeline-row" style={{
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 0,
      flexWrap: 'wrap',
      paddingBottom: 8,
      paddingTop: 4,
      position: 'relative',
      zIndex: 6,
      width: '100%',
    }}>
      {children}
    </div>
  );
}

/* ═══════════════════════════════════════════
   COUNTER STRIP
═══════════════════════════════════════════ */
function CounterStrip({ items }: { items: Array<{ label: string; value: number; color: string; prefix?: string; suffix?: string }> }) {
  return (
    <div className="counter-strip" style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: 10,
      marginTop: 24,
      position: 'relative', zIndex: 10,
    }}>
      {items.map(item => (
        <div key={item.label} style={{
          background: `linear-gradient(135deg, ${item.color}0d 0%, #06060f 100%)`,
          border: `1px solid ${item.color}33`,
          borderRadius: 12, padding: '12px 16px', textAlign: 'center',
          position: 'relative', overflow: 'hidden',
          boxShadow: `0 0 14px ${item.color}14`,
        }}>
          <div style={{
            position: 'absolute', top: 0, left: '-100%', width: '100%', height: 2,
            background: `linear-gradient(90deg, transparent, ${item.color}, transparent)`,
            animation: 'pipe-scan-h 3s linear infinite',
          }} />
          <div style={{
            fontSize: 'clamp(14px, 2.5vw, 20px)', fontWeight: 900, color: item.color,
            fontFamily: 'JetBrains Mono, monospace',
            textShadow: `0 0 12px ${item.color}`,
          }}>{item.prefix}{formatNum(item.value)}{item.suffix}</div>
          <div style={{ fontSize: 'clamp(6px, 1.2vw, 8px)', color: '#555', letterSpacing: '0.1em', marginTop: 3, fontWeight: 700 }}>{item.label}</div>
        </div>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════
   SECTION HEADER
═══════════════════════════════════════════ */
function SectionHeader({ title, subtitle, badge, badgeColor, icon }: {
  title: string; subtitle: string; badge: string; badgeColor: string; icon: React.ReactNode;
}) {
  return (
    <div style={{ textAlign: 'center', marginBottom: 28, position: 'relative', zIndex: 10 }}>
      <div style={{
        display: 'inline-flex', alignItems: 'center', gap: 8,
        background: `${badgeColor}0d`, border: `1px solid ${badgeColor}44`,
        borderRadius: 20, padding: '5px 16px', marginBottom: 14,
      }}>
        <div style={{ width: 7, height: 7, borderRadius: '50%', background: badgeColor, animation: 'pipe-blink 1s infinite', boxShadow: `0 0 8px ${badgeColor}` }} />
        <span style={{ fontSize: 'clamp(8px, 1.5vw, 10px)', color: badgeColor, letterSpacing: '0.18em', fontWeight: 800 }}>{badge}</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14, marginBottom: 10, flexWrap: 'wrap' }}>
        {icon}
        <h2 style={{
          fontSize: 'clamp(16px, 3vw, 32px)', fontWeight: 900, margin: 0,
          background: `linear-gradient(135deg, ${badgeColor} 0%, #ffffff 50%, ${badgeColor}aa 100%)`,
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          letterSpacing: '0.04em', lineHeight: 1.1,
          textAlign: 'center',
        }}>{title}</h2>
      </div>
      <p style={{ color: '#4a4a6a', fontSize: 'clamp(8px, 1.5vw, 10px)', letterSpacing: '0.1em', margin: '0 auto', fontWeight: 600, maxWidth: 700, lineHeight: 1.5 }}>{subtitle}</p>
    </div>
  );
}

/* ═══════════════════════════════════════════
   SECTION 1: MUSIC DISTRIBUTION PIPELINE
═══════════════════════════════════════════ */
function MusicDistributionPipeline() {
  const streams = useCounter(2847392, 3000, 47);
  const revenue = useCounter(1247832, 3500, 23);
  const artists = useCounter(847, 2500, 1);
  const labels = useCounter(156, 2000, 1);

  // Live counters for Music Distribution pipeline cards — update 3-4x per second
  const liveArtistTracks = useLiveCounter(284.7, 0.012);
  const liveLabelSongs = useLiveCounter(847.3, 0.025);
  const liveKMReceives = useLiveCounter(1132.0, 0.037);
  const liveReviewed = useLiveCounter(1098.5, 0.031);
  const liveDistributed = useLiveCounter(1089.2, 0.028);
  const liveSongPlays = useLiveCounter(3421.8, 0.35);
  const liveStoreRevenue = useLiveCounter(2.87, 0.002);
  const liveStoresReport = useLiveCounter(2.87, 0.002);
  const liveKMPays = useLiveCounter(2.71, 0.0015);

  // New warm color palette for Music Distribution Pipeline
  const COLOR = '#f59e0b'; // amber primary
  const PHASE2_COLOR = '#f43f5e'; // rose for phase 2

  return (
    <section style={{
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #0a0612 0%, #0d0820 40%, #120a1e 70%, #0a0612 100%)',
      position: 'relative',
      overflow: 'hidden',
      padding: 'clamp(28px, 5vh, 64px) clamp(12px, 4vw, 72px) 40px',
      display: 'flex',
      flexDirection: 'column',
    }}>
      {/* New background: subtle purple/amber mesh */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'linear-gradient(rgba(245,158,11,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(245,158,11,0.015) 1px, transparent 1px)',
        backgroundSize: '60px 60px', pointerEvents: 'none',
      }} />
      {/* Ambient glow orbs */}
      <div style={{ position: 'absolute', top: '10%', left: '8%', width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle, rgba(245,158,11,0.04) 0%, transparent 65%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '10%', right: '8%', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(244,63,94,0.04) 0%, transparent 65%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 700, height: 700, borderRadius: '50%', background: 'radial-gradient(circle, rgba(192,132,252,0.025) 0%, transparent 65%)', pointerEvents: 'none' }} />

      {/* Top scan beam — amber */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'linear-gradient(90deg, transparent, #f59e0b88, transparent)', animation: 'pipe-global-scan 6s linear infinite', boxShadow: '0 0 16px #f59e0b', pointerEvents: 'none', zIndex: 1 }} />

      <SectionHeader
        title="MUSIC DISTRIBUTION PIPELINE"
        subtitle="ARTIST & RECORD LABEL → KARHARI MEDIA → DIGITAL STORES → REVENUE → PAYOUT"
        badge="LIVE DISTRIBUTION PIPELINE"
        badgeColor={COLOR}
        icon={<KMIcon size={40} glow="#f59e0b" />}
      />

      {/* ── PHASE 1 LABEL ── */}
      <PhaseDivider label="PHASE 1 — UPLOAD · SCAN · APPROVE · DISTRIBUTE" color={COLOR} />

      {/* ── PHASE 1 ROW ── */}
      <PipelineRow color={COLOR}>
        {/* STEP 1a+1b: Dual input (Artist + Record Label) — with live counters */}
        <DualInputCards color={COLOR} delay={0} liveArtistTracks={liveArtistTracks} liveLabelSongs={liveLabelSongs} />

        <PipeConnector color={COLOR} label="SEND AUDIO" />

        {/* STEP 2: Karhari Media Receives & Scans */}
        <StepCard
          step={2}
          title="KARHARI MEDIA RECEIVES & SCANS"
          subtitle="Karhari Media collects audio files, scans for quality, checks metadata & initiates fingerprint verification"
          icon={<KMIcon size={30} glow="#f59e0b" />}
          color="#f59e0b"
          scanning={true}
          delay={0.2}
          liveNumber={{ value: liveKMReceives, label: 'FILES RECEIVED' }}
        />

        <PipeConnector color="#c084fc" label="REVIEW" />

        {/* STEP 3: Review & Approval */}
        <StepCard
          step={3}
          title="REVIEW & APPROVAL"
          subtitle="Content ID check, copyright clearance, quality assurance & final approval by Karhari Media team"
          icon={<ApprovalIcon size={30} color="#c084fc" />}
          color="#c084fc"
          tags={['CONTENT ID', 'COPYRIGHT', 'QUALITY CHECK', 'APPROVED']}
          delay={0.35}
          liveNumber={{ value: liveReviewed, label: 'SONGS REVIEWED & APPROVED' }}
        />

        <PipeConnector color="#34d399" label="DISTRIBUTE" />

        {/* STEP 4: Distribute to Stores */}
        <StepCard
          step={4}
          title="DISTRIBUTE TO ALL STORES"
          subtitle="Karhari Media pushes music to 12+ digital stores worldwide simultaneously"
          icon={<StoreIcon size={28} color="#34d399" />}
          color="#34d399"
          storeGrid={<StoreIconGrid color="#34d399" />}
          delay={0.5}
          liveNumber={{ value: liveDistributed, label: 'TRACKS SENT TO STORES' }}
        />
      </PipelineRow>

      {/* ── PHASE 2 LABEL ── */}
      <PhaseDivider label="PHASE 2 — STREAM · REVENUE · REPORT · PAYOUT" color={PHASE2_COLOR} />

      {/* ── PHASE 2 ROW ── */}
      <PipelineRow color={PHASE2_COLOR}>
        {/* STEP 5: Song Plays on Stores */}
        <StepCard
          step={5}
          title="SONG PLAYS ON STORES"
          subtitle="Listeners stream the track across all 12+ platforms globally — streams accumulate in real-time"
          icon={<PlayIcon size={30} color="#1DB954" />}
          color="#1DB954"
          tags={['STREAMING', 'PLAYS', 'LISTENERS', 'GLOBAL']}
          delay={0}
          liveNumber={{ value: liveSongPlays, label: 'TOTAL STREAMS' }}
        />

        <PipeConnector color="#1DB954" label="REVENUE" />

        {/* STEP 6: Store Revenue */}
        <StepCard
          step={6}
          title="STORES GENERATE REVENUE"
          subtitle="Each stream generates royalty revenue. All stores calculate per-stream rates & compile earnings"
          icon={<DollarIcon size={30} color="#fb923c" />}
          color="#fb923c"
          storeGrid={<RevenueStoreGrid color="#fb923c" />}
          delay={0.15}
          liveNumber={{ value: liveStoreRevenue, label: 'REVENUE GENERATED', prefix: '$' }}
        />

        <PipeConnector color="#fb923c" label="REPORT" />

        {/* STEP 7: Stores Report to Karhari Media */}
        <StepCard
          step={7}
          title="STORES REPORT TO KARHARI MEDIA"
          subtitle="All stores send streaming analytics, play counts & revenue data to Karhari Media hub"
          icon={<KMIcon size={30} glow="#f59e0b" />}
          color="#f59e0b"
          scanning={true}
          delay={0.3}
          liveNumber={{ value: liveStoresReport, label: 'REVENUE RECEIVED BY KARHARI MEDIA', prefix: '$' }}
        />

        <PipeConnector color="#f43f5e" label="PAYOUT" />

        {/* STEP 8: Karhari Media Pays Artists & Labels */}
        <StepCard
          step={8}
          title="KARHARI MEDIA PAYS ARTISTS & LABELS"
          subtitle="Karhari Media distributes revenue transparently to artists, record labels & users with full analytics"
          icon={<PayoutIcon size={30} color="#f43f5e" />}
          color="#f43f5e"
          tags={['ARTISTS PAID', 'LABELS PAID', 'TRANSPARENT', '100% ACCURATE']}
          delay={0.45}
          liveNumber={{ value: liveKMPays, label: 'TOTAL PAYOUTS SENT', prefix: '$' }}
        />
      </PipelineRow>

      {/* Counter strip */}
      <CounterStrip items={[
        { label: 'STREAMS PROCESSED', value: streams, color: '#1DB954' },
        { label: 'REVENUE DISTRIBUTED', value: revenue, color: '#f59e0b', prefix: '$' },
        { label: 'ARTISTS PAID', value: artists, color: '#c084fc' },
        { label: 'RECORD LABELS', value: labels, color: '#f43f5e' },
      ]} />

      {/* Footer strip */}
      <div style={{
        marginTop: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
        background: `${COLOR}06`, border: `1px solid ${COLOR}22`,
        borderRadius: 10, padding: '8px 20px', position: 'relative', zIndex: 10,
        flexWrap: 'wrap', textAlign: 'center',
      }}>
        <span style={{ fontSize: 9, color: `${COLOR}88`, letterSpacing: '0.14em', fontWeight: 700 }}>
          12+ STORES CONNECTED · 50+ TERRITORIES · 100% TRANSPARENT ROYALTY PIPELINE · REAL-TIME ANALYTICS
        </span>
      </div>
    </section>
  );
}

export default function MusicDistributionPage() {
  return (
    <>
      <style>{`
        @keyframes pipe-scan-h {
          0%   { transform: translateX(-110%); }
          100% { transform: translateX(210%); }
        }
        @keyframes pipe-scan-v {
          0%   { transform: translateY(-110%); }
          100% { transform: translateY(210%); }
        }
        @keyframes pipe-global-scan {
          0%   { transform: translateY(-100vh); opacity: 0; }
          5%   { opacity: 1; }
          95%  { opacity: 0.6; }
          100% { transform: translateY(200vh); opacity: 0; }
        }
        @keyframes pipe-blink {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.2; }
        }
        @keyframes pipe-card-appear {
          0%   { opacity: 0; transform: translateY(18px) scale(0.93); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes pipe-store-pop {
          0%   { opacity: 0; transform: scale(0.4); }
          100% { opacity: 1; transform: scale(1); }
        }
        /* ── MUSIC DISTRIBUTION PIPELINE — NEW CARD ANIMATIONS ── */
        @keyframes mdp-card-rise {
          0%   { opacity: 0; transform: translateY(24px) scale(0.9) rotateX(8deg); filter: blur(4px); }
          60%  { opacity: 1; filter: blur(0); }
          100% { opacity: 1; transform: translateY(0) scale(1) rotateX(0deg); filter: blur(0); }
        }
        @keyframes mdp-shimmer {
          0%   { left: -120%; }
          60%  { left: 120%; }
          100% { left: 120%; }
        }
        @keyframes mdp-top-glow {
          0%, 100% { opacity: 0.5; box-shadow: none; }
          50%       { opacity: 1; }
        }
        @keyframes mdp-icon-pulse {
          0%, 100% { box-shadow: 0 0 14px var(--icon-color, #f59e0b33); transform: scale(1); }
          50%       { box-shadow: 0 0 28px var(--icon-color, #f59e0b55); transform: scale(1.04); }
        }
        @keyframes mdp-orb-float {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50%       { transform: translate(-8px, -12px) scale(1.1); }
        }
        @keyframes mdp-store-pop {
          0%   { opacity: 0; transform: scale(0.3) rotate(-10deg); }
          70%  { transform: scale(1.08) rotate(2deg); }
          100% { opacity: 1; transform: scale(1) rotate(0deg); }
        }
        @keyframes mdp-num-tick {
          0%   { transform: scale(1.08); }
          100% { transform: scale(1); }
        }
        @keyframes fp-draw {
          0%   { stroke-dashoffset: 100; opacity: 0.2; }
          50%  { stroke-dashoffset: 0; opacity: 1; }
          100% { stroke-dashoffset: -100; opacity: 0.2; }
        }
        @keyframes fp-scan {
          0%   { top: 4px; opacity: 0.9; }
          50%  { top: calc(100% - 6px); opacity: 1; }
          100% { top: 4px; opacity: 0.9; }
        }
        @keyframes fp-center-pulse {
          0%, 100% { opacity: 0.6; transform: scale(1); }
          50%       { opacity: 1; transform: scale(1.4); }
        }
        @keyframes conn-travel-h {
          0%   { left: -8px; opacity: 0; }
          10%  { opacity: 1; }
          90%  { opacity: 1; }
          100% { left: calc(100% + 8px); opacity: 0; }
        }
        @keyframes conn-travel-v {
          0%   { top: -8px; opacity: 0; }
          10%  { opacity: 1; }
          90%  { opacity: 1; }
          100% { top: calc(100% + 8px); opacity: 0; }
        }
        @keyframes km-ring-cw  { to { transform: rotate(360deg); } }
        @keyframes km-ring-ccw { to { transform: rotate(-360deg); } }

        /* ═══════════════════════════════════════════
           RESPONSIVE LAYOUT RULES
        ═══════════════════════════════════════════ */

        /* Pipeline cards — fluid width */
        .pipeline-card {
          width: clamp(180px, 22vw, 240px);
          min-height: 260px;
        }

        /* Dual input cards — fluid width */
        .dual-input-cards {
          flex-shrink: 0;
        }
        .dual-card {
          width: clamp(160px, 20vw, 220px);
          min-height: 110px;
        }

        /* Pipeline row — wrap on small screens */
        .pipeline-row {
          row-gap: 12px;
          column-gap: 0;
        }

        /* Hide connectors when pipeline wraps */
        @media (max-width: 900px) {
          .pipe-connector {
            display: none !important;
          }
          .pipeline-row {
            gap: 12px !important;
            justify-content: center;
          }
          .pipeline-card {
            width: clamp(160px, 44vw, 220px) !important;
          }
          .dual-card {
            width: clamp(150px, 44vw, 210px) !important;
          }
        }

        @media (max-width: 600px) {
          .pipeline-card {
            width: calc(100vw - 40px) !important;
            max-width: 360px !important;
          }
          .dual-card {
            width: calc(100vw - 40px) !important;
            max-width: 360px !important;
          }
          .dual-input-cards {
            width: 100%;
          }
        }

        /* Counter strip — responsive columns */
        .counter-strip {
          grid-template-columns: repeat(2, 1fr) !important;
        }
        @media (min-width: 640px) {
          .counter-strip {
            grid-template-columns: repeat(4, 1fr) !important;
          }
        }

        /* Royalty cards grid */
        .royalty-cards-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
          justify-content: center;
          position: relative;
          z-index: 6;
          width: 100%;
        }
        .royalty-card {
          min-height: 360px;
        }

        @media (max-width: 1200px) {
          .royalty-cards-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }
        @media (max-width: 900px) {
          .royalty-cards-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 12px;
          }
        }
        @media (max-width: 520px) {
          .royalty-cards-grid {
            grid-template-columns: 1fr;
            gap: 12px;
          }
          .royalty-card {
            min-height: auto;
          }
        }

        /* Bottom counter strip */
        .bottom-counter-strip {
          grid-template-columns: repeat(2, 1fr) !important;
        }
        @media (min-width: 640px) {
          .bottom-counter-strip {
            grid-template-columns: repeat(4, 1fr) !important;
          }
        }
      `}</style>
      <div style={{ background: '#020208', minHeight: '100vh' }}>
        <MusicDistributionPipeline />
      </div>
    </>
  );
}
