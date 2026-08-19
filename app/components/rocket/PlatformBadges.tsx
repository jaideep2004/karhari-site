'use client';

import { useState } from 'react';

const platforms = [
  {
    name: 'Spotify',
    icon: 'https://open.spotifycdn.com/cdn/images/favicon32.8e66b099.png',
    bg: '#1DB954',
    glow: 'rgba(29,185,84,0.7)',
    glowSoft: 'rgba(29,185,84,0.25)',
    border: 'rgba(29,185,84,0.5)',
    initials: 'SP',
    delay: '0s',
  },
  {
    name: 'Apple Music',
    icon: 'https://music.apple.com/assets/favicon/favicon-180.png',
    bg: '#fc3c44',
    glow: 'rgba(252,60,68,0.7)',
    glowSoft: 'rgba(252,60,68,0.25)',
    border: 'rgba(252,60,68,0.5)',
    initials: 'AM',
    delay: '0.12s',
  },
  {
    name: 'YouTube Music',
    icon: 'https://music.youtube.com/img/favicon_144.png',
    bg: '#FF0000',
    glow: 'rgba(255,0,0,0.7)',
    glowSoft: 'rgba(255,0,0,0.22)',
    border: 'rgba(255,0,0,0.45)',
    initials: 'YT',
    delay: '0.24s',
  },
  {
    name: 'Amazon Music',
    icon: '/assets/images/Stacked_Amazon_Music_CyanOnCharcoal_Circle_RGB-1786715172379.png',
    bg: '#00A8E1',
    glow: 'rgba(0,168,225,0.7)',
    glowSoft: 'rgba(0,168,225,0.25)',
    border: 'rgba(0,168,225,0.5)',
    initials: 'AZ',
    delay: '0.36s',
  },
];

export default function PlatformBadges() {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <>
      <div className="flex flex-wrap gap-2 sm:gap-3" role="list" aria-label="Available music platforms">
        {platforms?.map((p, idx) => (
          <div
            key={p?.name}
            className="relative flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-lg cursor-pointer overflow-hidden"
            role="listitem"
            aria-label={`${p?.name} music platform`}
            style={{
              border: `1px solid ${hovered === p.name ? p.border : 'rgba(255,255,255,0.1)'}`,
              background: hovered === p.name ? `${p.glowSoft}` : 'rgba(255,255,255,0.04)',
              backdropFilter: 'blur(8px)',
              boxShadow: hovered === p.name
                ? `0 0 20px ${p.glowSoft}, 0 0 40px ${p.glowSoft}, inset 0 0 16px ${p.glowSoft}`
                : '0 0 0 transparent',
              transform: hovered === p.name ? 'translateY(-3px) scale(1.05)' : 'translateY(0) scale(1)',
              transition: 'all 0.3s cubic-bezier(.22,1,.36,1)',
              animation: `badgeReveal 0.5s cubic-bezier(.22,1,.36,1) both`,
              animationDelay: p.delay,
            }}
            onMouseEnter={() => setHovered(p.name)}
            onMouseLeave={() => setHovered(null)}
          >
            <span
              className="absolute inset-0 pointer-events-none"
              aria-hidden="true"
              style={{
                background: `linear-gradient(105deg, transparent 30%, ${p.glowSoft} 50%, transparent 70%)`,
                animation: hovered === p.name ? 'badgeShimmer 1.4s ease-in-out infinite' : 'none',
                opacity: hovered === p.name ? 1 : 0,
                transition: 'opacity 0.3s',
              }}
            />
            <span
              className="absolute top-0 left-2 right-2 h-px pointer-events-none"
              aria-hidden="true"
              style={{
                background: `linear-gradient(90deg, transparent, ${p.glow}, transparent)`,
                opacity: hovered === p.name ? 1 : 0,
                transition: 'opacity 0.3s',
              }}
            />
            <div
              className="relative w-6 h-6 sm:w-7 sm:h-7 rounded-md flex items-center justify-center flex-shrink-0 overflow-hidden"
              style={{
                backgroundColor: p?.bg,
                boxShadow: hovered === p.name ? `0 0 14px ${p.glow}, 0 0 28px ${p.glowSoft}` : `0 0 6px ${p.glowSoft}`,
                transition: 'box-shadow 0.3s',
                animation: `iconFloat ${2.2 + idx * 0.3}s ease-in-out infinite`,
                animationDelay: `${idx * 0.25}s`,
              }}
            >
              <span
                className="absolute inset-0 rounded-md pointer-events-none"
                aria-hidden="true"
                style={{
                  border: `1px solid ${p.glow}`,
                  animation: hovered === p.name ? 'iconRingSpin 1.2s linear infinite' : 'none',
                  opacity: hovered === p.name ? 0.8 : 0,
                  transition: 'opacity 0.3s',
                }}
              />
              <img
                src={p?.icon}
                alt={`${p?.name} official logo icon`}
                width={20}
                height={20}
                style={{ width: '72%', height: '72%', objectFit: 'contain' }}
                onError={(e) => {
                  const target = e.currentTarget as HTMLImageElement;
                  target.style.display = 'none';
                  const fallback = target.nextElementSibling as HTMLElement;
                  if (fallback) fallback.style.display = 'flex';
                }}
              />
              <span
                style={{
                  display: 'none',
                  position: 'absolute',
                  inset: 0,
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                  fontWeight: 700,
                  fontSize: 9,
                }}
              >
                {p?.initials}
              </span>
            </div>
            <span
              className="text-xs font-semibold whitespace-nowrap relative"
              style={{
                color: hovered === p.name ? '#ffffff' : 'rgba(220,230,245,0.85)',
                textShadow: hovered === p.name ? `0 0 10px ${p.glow}` : 'none',
                transition: 'color 0.3s, text-shadow 0.3s',
                fontSize: 'clamp(9px, 2vw, 12px)',
              }}
            >
              {p?.name?.length > 10 ? p?.name?.slice(0, 9) + '…' : p?.name}
            </span>
            {hovered === p.name && (
              <span className="relative flex-shrink-0" style={{ width: 6, height: 6 }}>
                <span style={{ display: 'block', width: 6, height: 6, borderRadius: '50%', background: p.bg, boxShadow: `0 0 6px ${p.glow}` }} />
                <span style={{ position: 'absolute', inset: -2, borderRadius: '50%', border: `1px solid ${p.glow}`, animation: 'pingRing 1s ease-out infinite' }} />
              </span>
            )}
          </div>
        ))}
      </div>

      <style>{`
        @keyframes badgeReveal {
          from { opacity: 0; transform: translateY(10px) scale(0.95); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes badgeShimmer {
          0%   { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
        @keyframes iconFloat {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-2px); }
        }
        @keyframes iconRingSpin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes pingRing {
          0%   { transform: scale(1); opacity: 0.8; }
          100% { transform: scale(2.5); opacity: 0; }
        }
      `}</style>
    </>
  );
}