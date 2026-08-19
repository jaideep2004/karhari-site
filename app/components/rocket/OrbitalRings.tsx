'use client';

import { useEffect, useRef, useState } from 'react';

// Outer ring — 8 platforms
const orbitingPlatforms = [
  { name: 'Spotify',      angle: 0,   bg: '#1DB954' },
  { name: 'Apple Music',  angle: 45,  bg: '#FA243C' },
  { name: 'YouTube',      angle: 90,  bg: '#FF0000' },
  { name: 'Amazon Music', angle: 135, bg: '#00A8E1' },
  { name: 'TikTok',       angle: 180, bg: '#010101' },
  { name: 'Facebook',     angle: 225, bg: '#1877F2' },
  { name: 'Deezer',       angle: 270, bg: '#A238FF' },
  { name: 'TIDAL',        angle: 315, bg: '#000000' },
];

// Inner ring — 4 platforms
const innerOrbitPlatforms = [
  { name: 'SoundCloud', angle: 0,   bg: '#FF5500' },
  { name: '7digital',   angle: 90,  bg: '#1565C0' },
  { name: 'Gaana',      angle: 180, bg: '#E8000D' },
  { name: 'Hungama',    angle: 270, bg: '#111111' },
];

const brandColors: Record<string, string> = {
  Spotify:       '#1DB954',
  'Apple Music': '#FA243C',
  YouTube:       '#FF0000',
  'Amazon Music':'#00A8E1',
  TikTok:        '#010101',
  Facebook:      '#1877F2',
  Deezer:        '#A238FF',
  TIDAL:         '#000000',
  SoundCloud:    '#FF5500',
  '7digital':    '#1565C0',
  Gaana:         '#E8000D',
  Hungama:       '#111111',
};

const reliableIcons: Record<string, string> = {
  Spotify:       'https://cdn.simpleicons.org/spotify/FFFFFF',
  'Apple Music': 'https://cdn.simpleicons.org/applemusic/FFFFFF',
  YouTube:       'https://cdn.simpleicons.org/youtube/FFFFFF',
  'Amazon Music':'/assets/images/Stacked_Amazon_Music_CyanOnCharcoal_Circle_RGB-1786715172379.png',
  TikTok:        'https://cdn.simpleicons.org/tiktok/FFFFFF',
  Facebook:      'https://cdn.simpleicons.org/facebook/FFFFFF',
  Deezer:        'https://cdn.simpleicons.org/deezer/FFFFFF',
  TIDAL:         'https://cdn.simpleicons.org/tidal/FFFFFF',
  SoundCloud:    'https://cdn.simpleicons.org/soundcloud/FFFFFF',
  '7digital':    '/assets/7digital-icon.svg',
  Gaana:         '/assets/gaana-icon.svg',
  Hungama:       '/assets/hungama-icon.svg',
};

const platformInitials: Record<string, string> = {
  Spotify:       'SP',
  'Apple Music': 'AM',
  YouTube:       'YT',
  'Amazon Music':'AZ',
  TikTok:        'TK',
  Facebook:      'FB',
  Deezer:        'DZ',
  TIDAL:         'TD',
  SoundCloud:    'SC',
  '7digital':    '7D',
  Gaana:         'GA',
  Hungama:       'HG',
};

interface PlatformIconProps {
  name: string;
  size: number;
}

const fullColorLogoPlatforms = new Set<string>(['7digital', 'Gaana', 'Hungama']);

function PlatformIcon({ name, size }: PlatformIconProps) {
  const bg = brandColors[name] || '#333';
  const initials = platformInitials[name] || name.slice(0, 2).toUpperCase();
  const iconUrl = reliableIcons[name];
  const fontSize = size < 32 ? 8 : size < 40 ? 10 : 13;
  const isFullColor = fullColorLogoPlatforms.has(name);

  return (
    <div
      className="w-full h-full rounded-full flex items-center justify-center overflow-hidden relative"
      role="img"
      aria-label={`${name} music platform`}
      style={{
        background: bg,
        border: '2px solid rgba(255,255,255,0.18)',
        boxShadow: `0 0 16px 4px ${bg}55, 0 4px 16px rgba(0,0,0,0.7)`
      }}>
      {iconUrl ? (
        <img
          src={iconUrl}
          alt={`${name} logo`}
          width={size * (isFullColor ? 1.0 : 0.65)}
          height={size * (isFullColor ? 1.0 : 0.65)}
          style={{ width: isFullColor ? '100%' : '65%', height: isFullColor ? '100%' : '65%', objectFit: 'cover', borderRadius: isFullColor ? '50%' : '0' }}
          onError={(e) => {
            const target = e.currentTarget as HTMLImageElement;
            target.style.display = 'none';
            const fallback = target.nextElementSibling as HTMLElement;
            if (fallback) fallback.style.display = 'flex';
          }}
        />
      ) : null}
      <div
        aria-hidden="true"
        style={{
          display: iconUrl ? 'none' : 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '100%',
          position: 'absolute',
          inset: 0,
          color: isFullColor ? bg : '#fff',
          fontWeight: 700,
          fontSize,
          letterSpacing: '0.05em'
        }}>
        {initials}
      </div>
    </div>
  );
}

export default function OrbitalRings() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState(380);

  useEffect(() => {
    const update = () => {
      if (containerRef.current) {
        const w = containerRef.current.offsetWidth;
        setSize(w);
      }
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  // Scale all measurements proportionally based on container size
  const BASE = 520;
  const scale = size / BASE;

  const outerRadius = Math.round(230 * scale);
  const innerRadius = Math.round(155 * scale);
  const iconSize = Math.max(28, Math.round(54 * scale));
  const innerIconSize = Math.max(22, Math.round(46 * scale));
  const center = Math.round(260 * scale);
  const midRingR = Math.round(125 * scale);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0"
      style={{ width: '100%', height: '100%' }}
    >
      <div style={{ position: 'relative', width: size, height: size }}>
        {/* ── Outer orbital ring ── */}
        <div
          className="absolute rounded-full pointer-events-none"
          style={{
            top: center - outerRadius,
            left: center - outerRadius,
            width: outerRadius * 2,
            height: outerRadius * 2,
            border: '1px solid rgba(0,220,255,0.25)',
            boxShadow: '0 0 20px 3px rgba(0,180,255,0.12), inset 0 0 20px 3px rgba(0,180,255,0.05)'
          }}
        />

        {/* ── Inner orbital ring ── */}
        <div
          className="absolute rounded-full pointer-events-none"
          style={{
            top: center - innerRadius,
            left: center - innerRadius,
            width: innerRadius * 2,
            height: innerRadius * 2,
            border: '1px solid rgba(160,0,255,0.25)',
            boxShadow: '0 0 14px 2px rgba(140,0,255,0.1)'
          }}
        />

        {/* ── Mid glow ring ── */}
        <div
          className="absolute rounded-full pointer-events-none glow-ring-pulse-slow"
          style={{
            top: center - midRingR,
            left: center - midRingR,
            width: midRingR * 2,
            height: midRingR * 2,
            border: '1.5px solid rgba(0,200,255,0.35)'
          }}
        />

        {/* ── Outer spinning wrapper ── */}
        <div
          className="absolute"
          style={{
            top: center - outerRadius,
            left: center - outerRadius,
            width: outerRadius * 2,
            height: outerRadius * 2,
            animation: 'orbitSpin 22s linear infinite'
          }}
          role="list"
          aria-label="Music distribution platforms">
          {orbitingPlatforms?.map((platform, i) => {
            const angleRad = platform?.angle * Math.PI / 180;
            const x = outerRadius + outerRadius * Math.sin(angleRad) - iconSize / 2;
            const y = outerRadius - outerRadius * Math.cos(angleRad) - iconSize / 2;
            return (
              <div
                key={`outer-${i}`}
                className="absolute"
                role="listitem"
                style={{
                  left: x,
                  top: y,
                  width: iconSize,
                  height: iconSize,
                  animation: 'iconCounterRotate 22s linear infinite'
                }}>
                <PlatformIcon name={platform.name} size={iconSize} />
              </div>
            );
          })}
        </div>

        {/* ── Inner spinning wrapper (counter-clockwise) ── */}
        <div
          className="absolute"
          style={{
            top: center - innerRadius,
            left: center - innerRadius,
            width: innerRadius * 2,
            height: innerRadius * 2,
            animation: 'orbitSpin 32s linear infinite reverse'
          }}
          role="list"
          aria-label="Additional music streaming platforms">
          {innerOrbitPlatforms?.map((platform, i) => {
            const angleRad = platform?.angle * Math.PI / 180;
            const x = innerRadius + innerRadius * Math.sin(angleRad) - innerIconSize / 2;
            const y = innerRadius - innerRadius * Math.cos(angleRad) - innerIconSize / 2;
            return (
              <div
                key={`inner-${i}`}
                className="absolute"
                role="listitem"
                style={{
                  left: x,
                  top: y,
                  width: innerIconSize,
                  height: innerIconSize,
                  animation: 'iconCounterRotate 32s linear infinite'
                }}>
                <PlatformIcon name={platform.name} size={innerIconSize} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
