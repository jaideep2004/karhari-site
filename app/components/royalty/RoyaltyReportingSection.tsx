'use client';
import React, { useEffect, useState } from 'react';

/* ═══════════════════════════════════════════
   ROYALTY REPORTING & PAYOUT SECTION — extracted verbatim from
   the pipeline/analytics project (src/app/analytics/page.tsx).
═══════════════════════════════════════════ */
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

const KMIcon = ({ size = 36, glow = '#ffd700' }: { size?: number; glow?: string }) => (
  <img
    src="/assets/images/1608452013412__1_-1786673847726.png"
    alt="Karhari Media"
    style={{ width: size, height: size, objectFit: 'contain', filter: `drop-shadow(0 0 8px ${glow})` }}
  />
);


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


function Card1ArtistVisual({ color }: { color: string }) {
  return (
    <div style={{ position: 'relative', width: '100%', height: 110, display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 6 }}>
      {/* Ambient glow */}
      <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse at 50% 80%, ${color}18 0%, transparent 70%)`, borderRadius: 10 }} />
      {/* Sound wave bars behind artist */}
      {[0,1,2,3,4,5,6].map(i => (
        <div key={i} style={{
          position: 'absolute',
          bottom: 8,
          left: `${14 + i * 11}%`,
          width: 5,
          borderRadius: 3,
          background: `${color}${i % 2 === 0 ? 'cc' : '66'}`,
          animation: `card1-bar-${i % 4} ${0.5 + i * 0.08}s ease-in-out infinite alternate`,
          boxShadow: `0 0 6px ${color}88`,
        }} />
      ))}
      <svg viewBox="0 0 120 90" width={160} height={100} style={{ position: 'relative', zIndex: 2 }}>
        {/* Chair / seat */}
        <rect x="42" y="72" width="36" height="5" rx="2.5" fill={color + '33'} stroke={color + '55'} strokeWidth="1"/>
        <rect x="50" y="77" width="4" height="10" rx="2" fill={color + '44'}/>
        <rect x="66" y="77" width="4" height="10" rx="2" fill={color + '44'}/>
        {/* Body / torso */}
        <rect x="46" y="50" width="28" height="24" rx="8" fill={color + '22'} stroke={color + '55'} strokeWidth="1.2"/>
        {/* Arms */}
        <path d="M46 58 Q34 62 36 72" stroke={color + '88'} strokeWidth="4" strokeLinecap="round" fill="none"/>
        <path d="M74 58 Q86 62 84 72" stroke={color + '88'} strokeWidth="4" strokeLinecap="round" fill="none"/>
        {/* Head */}
        <circle cx="60" cy="38" r="13" fill={color + '22'} stroke={color + '66'} strokeWidth="1.5"/>
        {/* Face */}
        <circle cx="56" cy="37" r="1.5" fill={color + 'cc'}/>
        <circle cx="64" cy="37" r="1.5" fill={color + 'cc'}/>
        <path d="M56 43 Q60 46 64 43" stroke={color + 'aa'} strokeWidth="1.2" strokeLinecap="round" fill="none"/>
        {/* Headphones */}
        <path d="M47 35 Q47 22 60 22 Q73 22 73 35" stroke={color} strokeWidth="2.5" strokeLinecap="round" fill="none" style={{ filter: `drop-shadow(0 0 4px ${color})` }}/>
        <rect x="44" y="33" width="6" height="8" rx="3" fill={color} opacity="0.9"/>
        <rect x="70" y="33" width="6" height="8" rx="3" fill={color} opacity="0.9"/>
        {/* Laptop on lap */}
        <rect x="36" y="68" width="48" height="3" rx="1.5" fill={color + '44'} stroke={color + '66'} strokeWidth="1"/>
        {/* Laptop screen open */}
        <rect x="38" y="44" width="44" height="28" rx="3" fill="#0a0a1a" stroke={color + '88'} strokeWidth="1.5"/>
        <rect x="40" y="46" width="40" height="24" rx="2" fill={color + '0d'}/>
        {/* Music icon on laptop back */}
        <circle cx="60" cy="58" r="7" fill={color + '22'} stroke={color} strokeWidth="1.2" style={{ filter: `drop-shadow(0 0 5px ${color})` }}/>
        <path d="M58 55v5l5-2.5z" fill={color} style={{ filter: `drop-shadow(0 0 3px ${color})` }}/>
        <path d="M62 54 L62 52 L65 51 L65 53z" fill={color + 'cc'}/>
        {/* Screen glow */}
        <rect x="40" y="46" width="40" height="2" rx="1" fill={color + '44'} style={{ animation: 'fp-scan 2s ease-in-out infinite' }}/>
        {/* Music notes floating */}
        <text x="20" y="30" fontSize="8" fill={color + 'aa'} style={{ animation: 'card1-note1 2s ease-in-out infinite' }}>♪</text>
        <text x="92" y="25" fontSize="10" fill={color + '88'} style={{ animation: 'card1-note2 2.5s ease-in-out infinite' }}>♫</text>
        <text x="15" y="55" fontSize="7" fill={color + '66'} style={{ animation: 'card1-note1 3s ease-in-out 0.5s infinite' }}>♩</text>
      </svg>
      <style>{`
        @keyframes card1-bar-0 { from { height: 8px; } to { height: 22px; } }
        @keyframes card1-bar-1 { from { height: 14px; } to { height: 30px; } }
        @keyframes card1-bar-2 { from { height: 6px; } to { height: 18px; } }
        @keyframes card1-bar-3 { from { height: 18px; } to { height: 8px; } }
        @keyframes card1-note1 { 0%,100%{transform:translateY(0) rotate(-5deg);opacity:0.7} 50%{transform:translateY(-8px) rotate(5deg);opacity:1} }
        @keyframes card1-note2 { 0%,100%{transform:translateY(0) rotate(5deg);opacity:0.5} 50%{transform:translateY(-10px) rotate(-5deg);opacity:0.9} }
      `}</style>
    </div>
  );
}

/* ═══════════════════════════════════════════
   CARD 2 — Upload lock + laptop with checkmarks
═══════════════════════════════════════════ */
function Card2UploadVisual({ color }: { color: string }) {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setProgress(p => p >= 100 ? 0 : p + 2), 60);
    return () => clearInterval(t);
  }, []);
  return (
    <div style={{ position: 'relative', width: '100%', height: 110, display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 6 }}>
      <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse at 50% 40%, ${color}15 0%, transparent 70%)` }} />
      <svg viewBox="0 0 120 95" width={155} height={100} style={{ position: 'relative', zIndex: 2 }}>
        {/* Upload lock icon in center-top */}
        <g transform="translate(60,10)">
          {/* Lock body */}
          <rect x="-12" y="0" width="24" height="18" rx="4" fill={color + '22'} stroke={color} strokeWidth="1.5" style={{ filter: `drop-shadow(0 0 6px ${color})` }}/>
          {/* Lock shackle */}
          <path d="M-7 0 Q-7 -10 0 -10 Q7 -10 7 0" stroke={color} strokeWidth="2" fill="none" strokeLinecap="round" style={{ filter: `drop-shadow(0 0 4px ${color})` }}/>
          {/* Keyhole */}
          <circle cx="0" cy="8" r="3" fill={color + '44'} stroke={color} strokeWidth="1"/>
          <rect x="-1.5" y="9" width="3" height="4" rx="1" fill={color + '66'}/>
          {/* Upload arrow on lock */}
          <path d="M0 5 L0 1 M-2 3 L0 1 L2 3" stroke={color + 'cc'} strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
          {/* Pulsing ring */}
          <circle cx="0" cy="9" r="16" fill="none" stroke={color + '33'} strokeWidth="1.5" style={{ animation: 'card2-ring 1.5s ease-out infinite' }}/>
          <circle cx="0" cy="9" r="22" fill="none" stroke={color + '18'} strokeWidth="1" style={{ animation: 'card2-ring 1.5s ease-out 0.5s infinite' }}/>
        </g>
        {/* Laptop below */}
        <g transform="translate(60,62)">
          {/* Laptop base */}
          <rect x="-30" y="0" width="60" height="5" rx="2" fill={color + '33'} stroke={color + '55'} strokeWidth="1"/>
          {/* Laptop screen */}
          <rect x="-28" y="-30" width="56" height="32" rx="3" fill="#080818" stroke={color + '88'} strokeWidth="1.5"/>
          <rect x="-26" y="-28" width="52" height="28" rx="2" fill={color + '08'}/>
          {/* Checkmarks on screen */}
          <text x="-18" y="-16" fontSize="7" fill="#00ff88" fontWeight="bold">✓ Uploading</text>
          <text x="-18" y="-8" fontSize="7" fill="#00ff88" fontWeight="bold">✓ Processing</text>
          <text x="-18" y="0" fontSize="7" fill={color} fontWeight="bold">100%</text>
          {/* Progress bar */}
          <rect x="-18" y="2" width="44" height="3" rx="1.5" fill={color + '22'}/>
          <rect x="-18" y="2" width={`${progress * 0.44}`} height="3" rx="1.5" fill={color} style={{ filter: `drop-shadow(0 0 3px ${color})` }}/>
          {/* Screen scan */}
          <rect x="-26" y="-28" width="52" height="2" rx="1" fill={color + '44'} style={{ animation: 'fp-scan 1.8s ease-in-out infinite' }}/>
        </g>
        {/* Connecting dots from lock to laptop */}
        {[0,1,2].map(i => (
          <circle key={i} cx="60" cy={38 + i * 5} r="1.5" fill={color + '88'} style={{ animation: `card2-dot 0.8s ease-in-out ${i * 0.2}s infinite alternate` }}/>
        ))}
      </svg>
      <style>{`
        @keyframes card2-ring { 0%{transform:scale(0.8);opacity:0.8} 100%{transform:scale(1.4);opacity:0} }
        @keyframes card2-dot { from{opacity:0.3;transform:scale(0.8)} to{opacity:1;transform:scale(1.2)} }
      `}</style>
    </div>
  );
}

/* ═══════════════════════════════════════════
   CARD 3 — Screen with Release list + green icons
═══════════════════════════════════════════ */
function Card3ReleaseVisual({ color }: { color: string }) {
  const releases = ['Midnight Echo', 'Solar Drift', 'Neon Pulse', 'Deep Blue'];
  const [activeIdx, setActiveIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setActiveIdx(i => (i + 1) % releases.length), 900);
    return () => clearInterval(t);
  }, []);
  return (
    <div style={{ position: 'relative', width: '100%', height: 110, display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 6 }}>
      <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse at 50% 50%, ${color}12 0%, transparent 70%)` }} />
      <svg viewBox="0 0 120 90" width={155} height={100} style={{ position: 'relative', zIndex: 2 }}>
        {/* Monitor frame */}
        <rect x="8" y="4" width="104" height="68" rx="5" fill="#080818" stroke={color + '88'} strokeWidth="1.5"/>
        <rect x="10" y="6" width="100" height="64" rx="4" fill={color + '06'}/>
        {/* Monitor stand */}
        <rect x="52" y="72" width="16" height="6" rx="2" fill={color + '33'}/>
        <rect x="44" y="78" width="32" height="3" rx="1.5" fill={color + '44'}/>
        {/* Screen header */}
        <rect x="10" y="6" width="100" height="12" rx="4" fill={color + '18'}/>
        <text x="20" y="15" fontSize="7" fill={color} fontWeight="900" letterSpacing="1">RELEASES</text>
        {/* Green icon next to Release header */}
        <circle cx="100" cy="12" r="5" fill="#00ff88" opacity="0.9" style={{ filter: 'drop-shadow(0 0 4px #00ff88)' }}/>
        <path d="M97.5 12 L99.5 14 L102.5 10" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
        {/* Scan line on header */}
        <rect x="10" y="6" width="100" height="2" rx="1" fill={color + '55'} style={{ animation: 'fp-scan 2s ease-in-out infinite' }}/>
        {/* Release rows */}
        {releases.map((r, i) => (
          <g key={r} transform={`translate(12, ${22 + i * 13})`}>
            <rect x="0" y="0" width="96" height="11" rx="2" fill={i === activeIdx ? color + '18' : 'transparent'} style={{ transition: 'fill 0.3s' }}/>
            {/* Album art placeholder */}
            <rect x="1" y="1" width="9" height="9" rx="2" fill={color + '33'} stroke={color + '44'} strokeWidth="0.5"/>
            <circle cx="5.5" cy="5.5" r="2.5" fill={color + '55'}/>
            <circle cx="5.5" cy="5.5" r="1" fill={color + '99'}/>
            {/* Release name */}
            <text x="14" y="8" fontSize="6.5" fill={i === activeIdx ? color : '#6a6a8a'} fontWeight={i === activeIdx ? '800' : '600'}>{r}</text>
            {/* Green check */}
            <circle cx="88" cy="5.5" r="4.5" fill="#00ff88" opacity={i === activeIdx ? 1 : 0.4} style={{ filter: i === activeIdx ? 'drop-shadow(0 0 4px #00ff88)' : 'none' }}/>
            <path d="M85.5 5.5 L87.5 7.5 L90.5 3.5" stroke="white" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
          </g>
        ))}
      </svg>
    </div>
  );
}

/* ═══════════════════════════════════════════
   CARD 4 — Earth globe with store icons orbit
═══════════════════════════════════════════ */
function Card4GlobeOrbitVisual({ color }: { color: string }) {
  return (
    <div style={{ position: 'relative', width: '100%', height: 120, display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 6 }}>
      <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse at 50% 50%, ${color}15 0%, transparent 70%)` }} />
      <div style={{ position: 'relative', width: 120, height: 120 }}>
        {/* Orbit ring */}
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          width: 110, height: 110,
          marginTop: -55, marginLeft: -55,
          borderRadius: '50%',
          border: `1.5px dashed ${color}44`,
          animation: 'km-ring-cw 12s linear infinite',
        }}>
          {/* Store icons on orbit — positioned at fixed angles, they rotate with the ring */}
          {[
            { Icon: SpotifyIcon, angle: 0 },
            { Icon: AppleMusicIcon, angle: 51 },
            { Icon: AmazonMusicIcon, angle: 103 },
            { Icon: YTMusicIcon, angle: 154 },
            { Icon: TikTokIcon, angle: 205 },
            { Icon: DeezerIcon, angle: 257 },
            { Icon: TidalIcon, angle: 308 },
          ].map(({ Icon, angle }, i) => {
            const rad = (angle * Math.PI) / 180;
            const r = 55;
            const x = 55 + r * Math.cos(rad) - 12;
            const y = 55 + r * Math.sin(rad) - 12;
            return (
              <div key={i} style={{
                position: 'absolute',
                left: x, top: y,
                width: 24, height: 24,
                animation: `km-ring-ccw 12s linear infinite`,
                filter: `drop-shadow(0 0 4px ${color}88)`,
              }}>
                <Icon size={24} />
              </div>
            );
          })}
        </div>
        {/* Earth globe in center */}
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          width: 56, height: 56,
          marginTop: -28, marginLeft: -28,
          borderRadius: '50%',
          overflow: 'hidden',
          boxShadow: `0 0 20px ${color}55, 0 0 40px ${color}22`,
          zIndex: 3,
        }}>
          <svg viewBox="0 0 56 56" width={56} height={56}>
            <defs>
              <radialGradient id="earth-grad" cx="35%" cy="30%" r="70%">
                <stop offset="0%" stopColor="#1a6bb5"/>
                <stop offset="60%" stopColor="#0d4a8a"/>
                <stop offset="100%" stopColor="#061e3a"/>
              </radialGradient>
              <radialGradient id="earth-atm" cx="50%" cy="50%" r="50%">
                <stop offset="80%" stopColor="transparent"/>
                <stop offset="100%" stopColor="#4fc3f755"/>
              </radialGradient>
            </defs>
            <circle cx="28" cy="28" r="28" fill="url(#earth-grad)"/>
            {/* Continents */}
            <path d="M18 14 Q22 10 28 12 Q34 10 38 14 Q40 18 36 20 Q32 22 28 20 Q22 22 18 20 Q14 18 18 14z" fill="#2d8a3e" opacity="0.85"/>
            <path d="M10 24 Q14 20 18 22 Q20 26 16 28 Q12 28 10 24z" fill="#2d8a3e" opacity="0.8"/>
            <path d="M30 24 Q36 22 40 26 Q42 30 38 32 Q34 34 30 30 Q28 28 30 24z" fill="#2d8a3e" opacity="0.85"/>
            <path d="M20 34 Q24 32 28 34 Q30 38 26 40 Q22 40 20 36z" fill="#2d8a3e" opacity="0.75"/>
            <path d="M34 36 Q38 34 42 38 Q42 42 38 42 Q34 42 34 38z" fill="#2d8a3e" opacity="0.7"/>
            {/* Atmosphere glow */}
            <circle cx="28" cy="28" r="27" fill="none" stroke="#4fc3f7" strokeWidth="2" opacity="0.3"/>
            <circle cx="28" cy="28" r="28" fill="url(#earth-atm)"/>
            {/* Latitude lines */}
            <ellipse cx="28" cy="28" rx="28" ry="8" fill="none" stroke="#ffffff18" strokeWidth="0.8"/>
            <ellipse cx="28" cy="28" rx="28" ry="18" fill="none" stroke="#ffffff10" strokeWidth="0.8"/>
            {/* Longitude */}
            <ellipse cx="28" cy="28" rx="10" ry="28" fill="none" stroke="#ffffff10" strokeWidth="0.8"/>
            {/* Shine */}
            <circle cx="20" cy="18" r="6" fill="white" opacity="0.08"/>
          </svg>
        </div>
        {/* Inner orbit ring (counter) */}
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          width: 70, height: 70,
          marginTop: -35, marginLeft: -35,
          borderRadius: '50%',
          border: `1px solid ${color}22`,
          animation: 'km-ring-ccw 8s linear infinite',
          zIndex: 2,
        }}/>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   CARD 5 — Bank building + arrow + store list
═══════════════════════════════════════════ */
function Card5BankVisual({ color }: { color: string }) {
  const stores = ['Spotify', 'Apple Music', 'YouTube Music', 'Amazon Music', 'Deezer', 'TIDAL', 'TikTok Music'];
  const [highlighted, setHighlighted] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setHighlighted(i => (i + 1) % stores.length), 700);
    return () => clearInterval(t);
  }, []);
  return (
    <div style={{ position: 'relative', width: '100%', height: 120, display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 6 }}>
      <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse at 30% 40%, ${color}12 0%, transparent 70%)` }} />
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, width: '100%', padding: '0 6px' }}>
        {/* Bank building SVG */}
        <svg viewBox="0 0 60 70" width={60} height={70} style={{ flexShrink: 0 }}>
          {/* Building base */}
          <rect x="5" y="30" width="50" height="35" rx="2" fill={color + '18'} stroke={color + '66'} strokeWidth="1.5"/>
          {/* Roof / pediment */}
          <polygon points="0,30 30,8 60,30" fill={color + '22'} stroke={color + '88'} strokeWidth="1.5" style={{ filter: `drop-shadow(0 0 6px ${color}44)` }}/>
          {/* Columns */}
          {[12, 22, 32, 42].map(x => (
            <rect key={x} x={x} y="30" width="5" height="30" rx="1" fill={color + '33'} stroke={color + '44'} strokeWidth="0.8"/>
          ))}
          {/* Door */}
          <rect x="24" y="48" width="12" height="17" rx="2" fill={color + '22'} stroke={color + '66'} strokeWidth="1"/>
          {/* Windows */}
          <rect x="8" y="36" width="8" height="8" rx="1" fill={color + '22'} stroke={color + '44'} strokeWidth="0.8"/>
          <rect x="44" y="36" width="8" height="8" rx="1" fill={color + '22'} stroke={color + '44'} strokeWidth="0.8"/>
          {/* Dollar sign on building */}
          <text x="27" y="44" fontSize="9" fill={color} fontWeight="900" style={{ filter: `drop-shadow(0 0 4px ${color})` }}>$</text>
          {/* Glow base */}
          <rect x="5" y="63" width="50" height="3" rx="1.5" fill={color + '33'} style={{ animation: 'pipe-blink 1.5s infinite' }}/>
          {/* Scan beam */}
          <rect x="5" y="30" width="50" height="2" rx="1" fill={color + '55'} style={{ animation: 'fp-scan 2s ease-in-out infinite' }}/>
        </svg>
        {/* Arrow */}
        <svg viewBox="0 0 24 24" width={24} height={24} style={{ flexShrink: 0 }}>
          <path d="M4 12h14M14 8l4 4-4 4" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ filter: `drop-shadow(0 0 4px ${color})`, animation: 'card5-arrow 1s ease-in-out infinite' }}/>
        </svg>
        {/* Store list */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 3 }}>
          {stores.map((s, i) => (
            <div key={s} style={{
              display: 'flex', alignItems: 'center', gap: 4,
              padding: '2px 5px', borderRadius: 4,
              background: i === highlighted ? `${color}18` : 'transparent',
              border: `1px solid ${i === highlighted ? color + '55' : 'transparent'}`,
              transition: 'all 0.3s',
            }}>
              <div style={{ width: 5, height: 5, borderRadius: '50%', background: i === highlighted ? color : color + '44', flexShrink: 0, boxShadow: i === highlighted ? `0 0 4px ${color}` : 'none' }}/>
              <span style={{ fontSize: 6.5, color: i === highlighted ? color : '#5a5a7a', fontWeight: i === highlighted ? 800 : 600, letterSpacing: '0.04em' }}>{s}</span>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        @keyframes card5-arrow { 0%,100%{transform:translateX(0)} 50%{transform:translateX(3px)} }
      `}</style>
    </div>
  );
}

/* ═══════════════════════════════════════════
   CARD 6 — Laptop with analytics telescope graph + checkmark
═══════════════════════════════════════════ */
function Card6AnalyticsVisual({ color }: { color: string }) {
  const [pts, setPts] = useState([80, 70, 75, 60, 65, 50, 55, 40, 42, 30, 32, 20, 22, 12]);
  useEffect(() => {
    const t = setInterval(() => {
      setPts(prev => {
        const last = prev[prev.length - 1];
        const next = Math.max(5, last - Math.random() * 5 - 1);
        return [...prev.slice(1), next];
      });
    }, 300);
    return () => clearInterval(t);
  }, []);
  const w = 90, h = 50;
  const svgPts = pts.map((v, i) => `${(i / (pts.length - 1)) * w},${(v / 100) * h}`).join(' ');
  return (
    <div style={{ position: 'relative', width: '100%', height: 110, display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 6 }}>
      <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse at 50% 60%, ${color}12 0%, transparent 70%)` }} />
      <svg viewBox="0 0 130 95" width={155} height={100} style={{ position: 'relative', zIndex: 2 }}>
        {/* Laptop base */}
        <rect x="15" y="72" width="100" height="7" rx="3" fill={color + '33'} stroke={color + '55'} strokeWidth="1"/>
        {/* Laptop screen */}
        <rect x="18" y="14" width="94" height="60" rx="4" fill="#080818" stroke={color + '88'} strokeWidth="1.5" style={{ filter: `drop-shadow(0 0 8px ${color}33)` }}/>
        <rect x="20" y="16" width="90" height="56" rx="3" fill={color + '06'}/>
        {/* Screen header bar */}
        <rect x="20" y="16" width="90" height="10" rx="3" fill={color + '18'}/>
        <text x="28" y="23.5" fontSize="6" fill={color} fontWeight="800" letterSpacing="1">ANALYTICS</text>
        {/* Telescope graph (going down = upward trend when inverted) */}
        <g transform="translate(20,28)">
          {/* Grid lines */}
          {[0,1,2,3].map(i => (
            <line key={i} x1="0" y1={i * 12} x2={w} y2={i * 12} stroke={color + '18'} strokeWidth="0.5"/>
          ))}
          {/* Fill area */}
          <polygon points={`0,${h} ${svgPts} ${w},${h}`} fill={`url(#card6-fill)`} opacity="0.4"/>
          <defs>
            <linearGradient id="card6-fill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity="0.5"/>
              <stop offset="100%" stopColor={color} stopOpacity="0.02"/>
            </linearGradient>
          </defs>
          {/* Line */}
          <polyline points={svgPts} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ filter: `drop-shadow(0 0 4px ${color})` }}/>
          {/* Tip dot */}
          <circle cx={(pts.length - 1) / (pts.length - 1) * w} cy={(pts[pts.length - 1] / 100) * h} r="3" fill={color} style={{ animation: 'fp-center-pulse 0.8s infinite', filter: `drop-shadow(0 0 6px ${color})` }}/>
          {/* Telescope label */}
          <text x="2" y={h - 2} fontSize="5.5" fill={color + '88'} fontWeight="700">TREND ▼ INVERTED TELESCOPE</text>
        </g>
        {/* Scan beam on screen */}
        <rect x="20" y="16" width="90" height="2" rx="1" fill={color + '55'} style={{ animation: 'fp-scan 2s ease-in-out infinite' }}/>
        {/* Checkmark overlay badge */}
        <g transform="translate(95,20)">
          <circle cx="0" cy="0" r="10" fill="#00ff88" opacity="0.95" style={{ filter: 'drop-shadow(0 0 6px #00ff88)' }}/>
          <path d="M-5 0 L-2 3.5 L5 -4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </g>
      </svg>
    </div>
  );
}

/* ═══════════════════════════════════════════
   CARD 7 — Mobile phone with Payout, OK signs, dollar/money
═══════════════════════════════════════════ */
function Card7PayoutMobileVisual({ color }: { color: string }) {
  const [dollarAnim, setDollarAnim] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setDollarAnim(v => (v + 1) % 4), 600);
    return () => clearInterval(t);
  }, []);
  return (
    <div style={{ position: 'relative', width: '100%', height: 115, display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 6 }}>
      <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse at 50% 50%, ${color}12 0%, transparent 70%)` }} />
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, width: '100%', padding: '0 4px', justifyContent: 'center' }}>
        {/* Left money visuals */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, width: 36 }}>
          {/* Money bills stack */}
          <svg viewBox="0 0 36 28" width={36} height={28}>
            {[2,1,0].map(i => (
              <g key={i} transform={`translate(${i*2},${i*2})`}>
                <rect x="0" y="0" width="32" height="18" rx="2" fill={i === 0 ? '#1a5c2a' : '#145022'} stroke="#2d8a3e" strokeWidth="0.8" opacity={1 - i * 0.2}/>
                <text x="16" y="12" textAnchor="middle" fontSize="9" fill="#4ade80" fontWeight="900">${i === 0 ? '100' : i === 1 ? '50' : '20'}</text>
              </g>
            ))}
          </svg>
          <div style={{ fontSize: 14, color: '#4ade80', fontWeight: 900, animation: `card7-float ${0.8 + dollarAnim * 0.1}s ease-in-out infinite alternate`, textShadow: '0 0 8px #4ade80' }}>$</div>
          <div style={{ fontSize: 10, color: color + 'aa', fontWeight: 900, animation: `card7-float 1.2s ease-in-out 0.3s infinite alternate` }}>💵</div>
        </div>
        {/* Mobile phone */}
        <svg viewBox="0 0 54 90" width={54} height={90} style={{ flexShrink: 0 }}>
          {/* Phone body */}
          <rect x="2" y="2" width="50" height="86" rx="8" fill="#0a0a1a" stroke={color} strokeWidth="2" style={{ filter: `drop-shadow(0 0 8px ${color}55)` }}/>
          {/* Screen */}
          <rect x="5" y="10" width="44" height="65" rx="4" fill={color + '08'} stroke={color + '33'} strokeWidth="1"/>
          {/* Notch */}
          <rect x="18" y="4" width="18" height="5" rx="2.5" fill={color + '44'}/>
          {/* Home bar */}
          <rect x="18" y="82" width="18" height="3" rx="1.5" fill={color + '55'}/>
          {/* Screen content */}
          {/* PAYOUT header */}
          <rect x="5" y="10" width="44" height="12" rx="4" fill={color + '22'}/>
          <text x="27" y="19.5" textAnchor="middle" fontSize="7.5" fill={color} fontWeight="900" letterSpacing="1.5">PAYOUT</text>
          {/* OK green signs */}
          <g transform="translate(10,28)">
            <circle cx="0" cy="0" r="7" fill="#00ff88" opacity="0.9" style={{ filter: 'drop-shadow(0 0 5px #00ff88)' }}/>
            <path d="M-3.5 0 L-1 2.5 L3.5 -2.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <text x="10" y="4" fontSize="6" fill="#00ff88" fontWeight="800">OK</text>
          </g>
          <g transform="translate(10,44)">
            <circle cx="0" cy="0" r="7" fill="#00ff88" opacity="0.9" style={{ filter: 'drop-shadow(0 0 5px #00ff88)', animation: 'pipe-blink 1.2s infinite' }}/>
            <path d="M-3.5 0 L-1 2.5 L3.5 -2.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <text x="10" y="4" fontSize="6" fill="#00ff88" fontWeight="800">OK</text>
          </g>
          {/* Dollar amount */}
          <text x="27" y="62" textAnchor="middle" fontSize="10" fill={color} fontWeight="900" style={{ filter: `drop-shadow(0 0 6px ${color})` }}>$2.71M</text>
          {/* Screen scan */}
          <rect x="5" y="10" width="44" height="2" rx="1" fill={color + '55'} style={{ animation: 'fp-scan 1.8s ease-in-out infinite' }}/>
        </svg>
        {/* Right money visuals */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, width: 36 }}>
          <div style={{ fontSize: 10, color: color + 'aa', fontWeight: 900, animation: `card7-float 1s ease-in-out infinite alternate` }}>💰</div>
          <div style={{ fontSize: 14, color: '#ffd700', fontWeight: 900, animation: `card7-float 0.9s ease-in-out 0.2s infinite alternate`, textShadow: '0 0 8px #ffd700' }}>$</div>
          <svg viewBox="0 0 36 28" width={36} height={28}>
            {[2,1,0].map(i => (
              <g key={i} transform={`translate(${i*2},${i*2})`}>
                <rect x="0" y="0" width="32" height="18" rx="2" fill={i === 0 ? '#5c4a00' : '#4a3a00'} stroke="#ffd700" strokeWidth="0.8" opacity={1 - i * 0.2}/>
                <text x="16" y="12" textAnchor="middle" fontSize="9" fill="#ffd700" fontWeight="900">${i === 0 ? '500' : i === 1 ? '200' : '100'}</text>
              </g>
            ))}
          </svg>
        </div>
      </div>
      <style>{`
        @keyframes card7-float { from{transform:translateY(0)} to{transform:translateY(-5px)} }
      `}</style>
    </div>
  );
}

/* ═══════════════════════════════════════════
   CARD 8 — Rising revenue graph (enhanced)
═══════════════════════════════════════════ */
function RisingRevenueGraph({ color }: { color: string }) {
  const [points, setPoints] = useState<number[]>([10, 18, 14, 25, 22, 35, 30, 42, 38, 55, 50, 68, 62, 78, 74, 90]);
  const [revenue, setRevenue] = useState(4.28);

  useEffect(() => {
    const interval = setInterval(() => {
      setPoints(prev => {
        const last = prev[prev.length - 1];
        const next = Math.min(98, last + Math.random() * 6 + 1);
        return [...prev.slice(1), next];
      });
      setRevenue(v => parseFloat((v + 0.003 + Math.random() * 0.002).toFixed(4)));
    }, 280);
    return () => clearInterval(interval);
  }, []);

  const w = 150, h = 55;
  const pts = points.map((v, i) => `${(i / (points.length - 1)) * w},${h - (v / 100) * h}`).join(' ');
  const fillPts = `0,${h} ${pts} ${w},${h}`;

  return (
    <div style={{ marginTop: 6 }}>
      {/* Screen frame */}
      <div style={{
        background: '#080818',
        border: `1.5px solid ${color}66`,
        borderRadius: 8,
        padding: '6px 8px',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: `0 0 12px ${color}33`,
      }}>
        {/* Screen scan */}
        <div style={{ position: 'absolute', top: 0, left: '-100%', width: '100%', height: '2px', background: `linear-gradient(90deg, transparent, ${color}cc, transparent)`, animation: 'pipe-scan-h 2s linear infinite' }}/>
        {/* Dollar counter above graph */}
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginBottom: 4 }}>
          <span style={{ fontSize: 16, fontWeight: 900, color, fontFamily: 'JetBrains Mono, monospace', textShadow: `0 0 12px ${color}` }}>${revenue.toFixed(2)}M</span>
          <span style={{ fontSize: 7, color: '#00ff88', fontWeight: 800, letterSpacing: '0.1em' }}>▲ RISING</span>
        </div>
        <svg width={w} height={h} style={{ overflow: 'visible', display: 'block' }}>
          <defs>
            <linearGradient id="rev-fill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity="0.35"/>
              <stop offset="100%" stopColor={color} stopOpacity="0.02"/>
            </linearGradient>
          </defs>
          {/* Grid */}
          {[0,1,2,3].map(i => (
            <line key={i} x1="0" y1={i * (h/3)} x2={w} y2={i * (h/3)} stroke={color + '15'} strokeWidth="0.5"/>
          ))}
          <polygon points={fillPts} fill="url(#rev-fill)"/>
          <polyline points={pts} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ filter: `drop-shadow(0 0 4px ${color})` }}/>
          {/* Latest dot */}
          <circle
            cx={(points.length - 1) / (points.length - 1) * w}
            cy={h - (points[points.length - 1] / 100) * h}
            r="3.5" fill={color}
            style={{ filter: `drop-shadow(0 0 8px ${color})`, animation: 'fp-center-pulse 0.8s ease-in-out infinite' }}
          />
        </svg>
        <div style={{ fontSize: 6.5, color: color + '77', letterSpacing: '0.1em', fontWeight: 700, marginTop: 2 }}>REVENUE DASHBOARD — LIVE</div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   ROYALTY REPORTING & PAYOUT SECTION
═══════════════════════════════════════════ */
export default function RoyaltyReportingSection() {
  const ACCENT = '#00f5ff';
  const GOLD = '#ffd700';

  // Live counters
  const liveArtistReleases = useLiveCounter(284.7, 0.014);
  const liveDistributed = useLiveCounter(1089.2, 0.028);
  const liveDelivered = useLiveCounter(1098.5, 0.031);
  const liveStreams = useLiveCounter(3421.8, 0.35);
  const liveStoreRevenue = useLiveCounter(2.87, 0.002);
  const liveValidated = useLiveCounter(2.84, 0.0018);
  const livePayouts = useLiveCounter(2.71, 0.0015);

  const cards = [
    {
      num: '01',
      title: 'CREATE & RELEASE BY ARTISTS & LABELS',
      desc: 'Artists and record labels create original music, finalize production, register copyrights and submit releases with full metadata, artwork and audio files to Karhari Media.',
      color: '#00f5ff',
      liveNum: { value: liveArtistReleases, label: 'RELEASES SUBMITTED' },
      tags: ['ARTISTS', 'LABELS', 'COPYRIGHT', 'METADATA'],
      visual: (c: string) => <Card1ArtistVisual color={c} />,
    },
    {
      num: '02',
      title: 'SUBMIT FOR DISTRIBUTION',
      desc: 'Verified audio files, metadata and artwork are submitted to Karhari Media\'s distribution engine for global delivery to 150+ digital stores and streaming platforms.',
      color: '#a855f7',
      liveNum: { value: liveDistributed, label: 'TRACKS SUBMITTED' },
      tags: ['DISTRIBUTION', 'GLOBAL', '150+ STORES'],
      visual: (c: string) => <Card2UploadVisual color={c} />,
    },
    {
      num: '03',
      title: 'REVIEW & DELIVER TO STORES',
      desc: 'Karhari Media\'s team reviews each release for quality, copyright compliance and store requirements, then delivers approved content to all major digital stores simultaneously.',
      color: '#00ff88',
      liveNum: { value: liveDelivered, label: 'TRACKS DELIVERED' },
      tags: ['REVIEW', 'COMPLIANCE', 'DELIVERY'],
      visual: (c: string) => <Card3ReleaseVisual color={c} />,
    },
    {
      num: '04',
      title: 'STREAMING WORLDWIDE',
      desc: 'Music goes live across all platforms globally — Spotify, Apple Music, YouTube Music, Amazon Music, Deezer, TIDAL and 140+ more stores. Streams accumulate in real-time worldwide.',
      color: '#FF9900',
      liveNum: { value: liveStreams, label: 'TOTAL STREAMS' },
      tags: ['SPOTIFY', 'APPLE MUSIC', 'GLOBAL', 'LIVE'],
      visual: (c: string) => <Card4GlobeOrbitVisual color={c} />,
    },
    {
      num: '05',
      title: 'STORES REPORT & PAY',
      desc: 'Every digital store calculates per-stream royalty rates, compiles earnings reports and sends revenue payments to Karhari Media on a monthly cycle with full transparency.',
      color: '#1DB954',
      liveNum: { value: liveStoreRevenue, label: 'REVENUE RECEIVED', prefix: '$' },
      tags: ['MONTHLY REPORTS', 'ROYALTIES', 'PAYMENTS'],
      visual: (c: string) => <Card5BankVisual color={c} />,
    },
    {
      num: '06',
      title: 'REPORT VALIDATION',
      desc: 'Karhari Media validates all incoming store reports — cross-checking stream counts, revenue figures and royalty calculations to ensure 100% accuracy before processing payouts.',
      color: '#ffd700',
      liveNum: { value: liveValidated, label: 'REPORTS VALIDATED', prefix: '$' },
      tags: ['VALIDATION', 'ACCURACY', 'AUDIT', '100% VERIFIED'],
      visual: (c: string) => <Card6AnalyticsVisual color={c} />,
    },
    {
      num: '07',
      title: 'PAYOUT TO ARTISTS & LABELS',
      desc: 'Karhari Media distributes validated royalty earnings directly to artists and record labels with full breakdown reports — transparent, on-time and 100% accurate every payment cycle.',
      color: '#ff006e',
      liveNum: { value: livePayouts, label: 'TOTAL PAID OUT', prefix: '$' },
      tags: ['ARTISTS PAID', 'LABELS PAID', 'ON-TIME', 'TRANSPARENT'],
      visual: (c: string) => <Card7PayoutMobileVisual color={c} />,
    },
    {
      num: '08',
      title: '100% TRANSPARENT DASHBOARD',
      desc: 'Artists and labels access a real-time analytics dashboard showing streams, revenue, store breakdowns and payout history — complete transparency with live rising revenue data.',
      color: '#7b00ff',
      isGraph: true,
      tags: ['REAL-TIME', 'ANALYTICS', 'LIVE DATA', 'TRANSPARENT'],
      visual: null,
    },
  ];

  return (
    <section id="royalty" className="km-royalty" style={{
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #020208 0%, #04020f 50%, #020208 100%)',
      position: 'relative',
      overflow: 'hidden',
      padding: 'clamp(28px, 5vh, 64px) clamp(12px, 4vw, 72px) 60px',
      borderBottom: '1px solid rgba(255,255,255,0.08)',
      display: 'flex',
      flexDirection: 'column',
    }}>
      {/* Background grid */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'linear-gradient(rgba(0,245,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,215,0,0.012) 1px, transparent 1px)',
        backgroundSize: '80px 80px', pointerEvents: 'none',
      }} />
      <div style={{ position: 'absolute', top: '10%', left: '5%', width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,245,255,0.03) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '10%', right: '5%', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,215,0,0.025) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'linear-gradient(90deg, transparent, #ffd70088, transparent)', animation: 'pipe-global-scan 7s linear infinite', boxShadow: '0 0 16px #ffd700', pointerEvents: 'none', zIndex: 1 }} />

      <div style={{ width: '100%', maxWidth: 1350, margin: '0 auto', position: 'relative', zIndex: 2 }}>

      {/* ── SECTION HEADER ── */}
      <div style={{ textAlign: 'center', marginBottom: 48, position: 'relative', zIndex: 10 }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          background: `${GOLD}0d`, border: `1px solid ${GOLD}44`,
          borderRadius: 20, padding: '5px 18px', marginBottom: 18,
        }}>
          <div style={{ width: 7, height: 7, borderRadius: '50%', background: GOLD, animation: 'pipe-blink 1s infinite', boxShadow: `0 0 8px ${GOLD}` }} />
          <span style={{ fontSize: 'clamp(8px, 1.5vw, 10px)', color: GOLD, letterSpacing: '0.18em', fontWeight: 800 }}>ROYALTY MANAGEMENT SYSTEM</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, marginBottom: 14, flexWrap: 'wrap' }}>
          <KMIcon size={48} glow="#ffd700" />
          <h2 style={{
            fontSize: 'clamp(20px, 4vw, 48px)', fontWeight: 900, margin: 0,
            background: `linear-gradient(135deg, ${GOLD} 0%, #ffffff 40%, ${ACCENT} 70%, ${GOLD}aa 100%)`,
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            letterSpacing: '0.04em', lineHeight: 1.1,
          }}>ROYALTY REPORTING & PAYOUT</h2>
          <KMIcon size={48} glow="#00f5ff" />
        </div>

        <p style={{
          color: '#6a6a8a', fontSize: 'clamp(10px, 1.8vw, 12px)', letterSpacing: '0.1em', margin: '0 auto',
          fontWeight: 600, maxWidth: 700, lineHeight: 1.6,
        }}>
          End-to-end royalty pipeline — from artist creation to transparent payout. Every stream tracked, every dollar validated, every payment delivered on time.
        </p>
      </div>

      {/* ── 8 CARDS GRID — 4 per row ── */}
      <div className="royalty-cards-grid" style={{
        display: 'grid',
        justifyContent: 'center',
        position: 'relative',
        zIndex: 6,
        width: '100%',
      }}>
        {cards.map((card, idx) => (
          <div key={idx} className="royalty-card" style={{
            position: 'relative',
            background: `linear-gradient(145deg, ${card.color}10 0%, #06060f 55%, ${card.color}06 100%)`,
            border: `1px solid ${card.color}44`,
            borderRadius: 16,
            padding: '14px 12px 12px',
            overflow: 'hidden',
            boxShadow: `0 0 28px ${card.color}1a, 0 8px 36px rgba(0,0,0,0.65)`,
            animation: `pipe-card-appear 0.5s cubic-bezier(0.34,1.56,0.64,1) ${idx * 0.08}s both`,
            display: 'flex',
            flexDirection: 'column',
            gap: 0,
          } as React.CSSProperties}>
            {/* Scan beams */}
            <div style={{
              position: 'absolute', top: 0, left: '-100%', width: '100%', height: '2px',
              background: `linear-gradient(90deg, transparent, ${card.color}cc, transparent)`,
              boxShadow: `0 0 8px ${card.color}`,
              animation: `pipe-scan-h 2.5s linear ${idx * 0.15}s infinite`,
              zIndex: 8,
            }} />
            <div style={{
              position: 'absolute', top: '-100%', left: 0, width: '2px', height: '100%',
              background: `linear-gradient(180deg, transparent, ${card.color}88, transparent)`,
              animation: `pipe-scan-v 3.5s linear ${idx * 0.2}s infinite`,
              zIndex: 8,
            }} />

            {/* Card number badge */}
            <div style={{
              position: 'absolute', top: 10, right: 10,
              background: `${card.color}22`, border: `1.5px solid ${card.color}66`,
              borderRadius: 8, padding: '2px 7px',
              fontSize: 9, fontWeight: 900, color: card.color,
              fontFamily: 'JetBrains Mono, monospace',
              boxShadow: `0 0 8px ${card.color}44`,
              letterSpacing: '0.05em',
              zIndex: 9,
            }}>{card.num}</div>

            {/* KM brand logo top-left */}
            <div style={{
              width: 28, height: 28, borderRadius: 7,
              background: `radial-gradient(circle, #ffd70015 0%, transparent 70%)`,
              border: `1px solid #ffd70033`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0, marginBottom: 6,
            }}>
              <KMIcon size={20} glow="#ffd700" />
            </div>

            {/* Title */}
            <div style={{
              fontSize: 9.5, fontWeight: 900, color: card.color,
              letterSpacing: '0.06em', marginBottom: 5,
              textShadow: `0 0 8px ${card.color}66`,
              lineHeight: 1.25,
              paddingRight: 28,
            }}>{card.title}</div>

            {/* Description */}
            <div style={{
              fontSize: 7.5, color: '#5a5a7a', letterSpacing: '0.03em',
              lineHeight: 1.5,
            }}>{card.desc}</div>

            {/* ── CARD VISUAL ILLUSTRATION ── */}
            {card.visual ? card.visual(card.color) : <RisingRevenueGraph color={card.color} />}

            {/* Live number (cards 1-7) */}
            {!card.isGraph && (
              <div style={{
                marginTop: 8, padding: '5px 8px',
                background: `${card.color}0d`, border: `1px solid ${card.color}33`,
                borderRadius: 8, textAlign: 'center',
              }}>
                <div style={{
                  fontSize: 14, fontWeight: 900, color: card.color,
                  fontFamily: 'JetBrains Mono, monospace',
                  textShadow: `0 0 10px ${card.color}`,
                  letterSpacing: '0.05em',
                }}>
                  {(card as { liveNum?: { prefix?: string; value: number; label: string } }).liveNum?.prefix || ''}
                  {formatMillions((card as { liveNum?: { value: number } }).liveNum?.value ?? 0)}
                </div>
                <div style={{ fontSize: 6.5, color: card.color + '88', letterSpacing: '0.1em', fontWeight: 700, marginTop: 1 }}>
                  {(card as { liveNum?: { label: string } }).liveNum?.label}
                </div>
              </div>
            )}

            {/* Tags */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 3, marginTop: 8 }}>
              {card.tags.map(tag => (
                <span key={tag} style={{
                  fontSize: 6.5, fontWeight: 800, color: card.color,
                  background: `${card.color}12`, border: `1px solid ${card.color}30`,
                  borderRadius: 4, padding: '2px 5px', letterSpacing: '0.07em',
                }}>{tag}</span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* ── BOTTOM COUNTER STRIP ── */}
      <div className="bottom-counter-strip" style={{
        display: 'grid',
        gap: 12,
        width: '100%',
        position: 'relative', zIndex: 10,
      }}>
        {[
          { label: 'TOTAL RELEASES', value: liveArtistReleases, color: ACCENT, prefix: '' },
          { label: 'STREAMS TRACKED', value: liveStreams, color: '#FF9900', prefix: '' },
          { label: 'REVENUE VALIDATED', value: liveValidated, color: GOLD, prefix: '$' },
          { label: 'PAYOUTS SENT', value: livePayouts, color: '#ff006e', prefix: '$' },
        ].map(item => (
          <div key={item.label} style={{
            background: `linear-gradient(135deg, ${item.color}0d 0%, #06060f 100%)`,
            border: `1px solid ${item.color}33`,
            borderRadius: 12, padding: '14px 16px', textAlign: 'center',
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
            }}>{item.prefix}{formatMillions(item.value)}</div>
            <div style={{ fontSize: 'clamp(6px, 1.2vw, 8px)', color: '#555', letterSpacing: '0.1em', marginTop: 3, fontWeight: 700 }}>{item.label}</div>
          </div>
        ))}
      </div>

      {/* Footer strip */}
      <div style={{
        marginTop: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
        background: `${GOLD}06`, border: `1px solid ${GOLD}18`,
        borderRadius: 8, padding: '10px 24px', position: 'relative', zIndex: 10,
        width: '100%', flexWrap: 'wrap', textAlign: 'center',
      }}>
        <KMIcon size={20} glow="#ffd700" />
        <span style={{ fontSize: 'clamp(7px, 1.5vw, 9px)', color: `${GOLD}77`, letterSpacing: '0.14em', fontWeight: 700 }}>
          KARHARI MEDIA · 150+ STORES · 100% TRANSPARENT ROYALTY REPORTING · REAL-TIME PAYOUT DASHBOARD
        </span>
        <KMIcon size={20} glow="#00f5ff" />
      </div>
          </div>
    </section>
  );
}
