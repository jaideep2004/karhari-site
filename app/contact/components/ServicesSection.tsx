'use client';

import React, { useEffect, useRef, useState } from 'react';
import { CheckCircleIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';

const MUSIC_STORES = [
  'Spotify', 'Apple Music', 'YouTube Music', 'Amazon Music', 'Tidal',
  'Deezer', 'Gaana', 'JioSaavn', 'Wynk Music', 'Hungama',
  'Beatport', 'SoundCloud', 'Pandora', 'iHeartRadio', 'Napster',
  'Boomplay', 'Audiomack', 'Anghami', 'Resso', 'NetEase Music',
  'QQ Music', 'Melon', 'Bugs Music', 'Genie Music', 'Yandex Music',
  'Zvuk', 'Fizy', 'Muud', 'Claro Música', 'Saavn',
  'Shazam', 'Bandcamp', 'Triller', 'Peloton', 'Soundtrack Your Brand',
];

const SCAN_PLATFORMS = [
  { name: 'YouTube Content ID', color: '#FF0000' },
  { name: 'Facebook Rights Manager', color: '#1877F2' },
  { name: 'TikTok', color: '#69C9D0' },
  { name: 'SoundCloud', color: '#FF5500' },
  { name: 'Instagram', color: '#E1306C' },
  { name: 'Dailymotion', color: '#0066DC' },
  { name: 'Twitch', color: '#9146FF' },
];

const CMS_TYPES = [
  { label: 'YouTube Music CMS', color: '#FF0000', bg: 'rgba(255,0,0,0.12)' },
  { label: 'YouTube Entertainment CMS', color: '#FF6B35', bg: 'rgba(255,107,53,0.12)' },
  { label: 'YouTube Kids CMS', color: '#4CAF50', bg: 'rgba(76,175,80,0.12)' },
  { label: 'YouTube Live CMS', color: '#9C27B0', bg: 'rgba(156,39,176,0.12)' },
  { label: 'YouTube Gaming CMS', color: '#00BCD4', bg: 'rgba(0,188,212,0.12)' },
  { label: 'YouTube Channel Content ID', color: '#FFC107', bg: 'rgba(255,193,7,0.12)' },
  { label: 'YouTube MCN Partner', color: '#CCFF00', bg: 'rgba(204,255,0,0.12)' },
  { label: 'Multi-Channel Network', color: '#FF4081', bg: 'rgba(255,64,129,0.12)' },
];

// ── Rotating Globe SVG ────────────────────────────────────────────────────────
function RotatingGlobe() {
  return (
    <div className="relative w-10 h-10 sm:w-12 sm:h-12 flex-shrink-0">
      <svg
        viewBox="0 0 48 48"
        className="w-full h-full"
        style={{ animation: 'globe-spin 8s linear infinite' }}
      >
        <circle cx="24" cy="24" r="20" fill="none" stroke="#CCFF00" strokeWidth="1.5" opacity="0.8" />
        <ellipse cx="24" cy="24" rx="10" ry="20" fill="none" stroke="#CCFF00" strokeWidth="1" opacity="0.5" />
        <ellipse cx="24" cy="24" rx="20" ry="8" fill="none" stroke="#CCFF00" strokeWidth="1" opacity="0.5" />
        <line x1="4" y1="24" x2="44" y2="24" stroke="#CCFF00" strokeWidth="0.8" opacity="0.4" />
        <line x1="24" y1="4" x2="24" y2="44" stroke="#CCFF00" strokeWidth="0.8" opacity="0.4" />
        <circle cx="24" cy="24" r="3" fill="#CCFF00" opacity="0.9" />
      </svg>
    </div>
  );
}

// ── YouTube Official Icon ─────────────────────────────────────────────────────
function YouTubeIcon({ size = 40 }: { size?: number }) {
  return (
    <svg width={size} height={size * 0.7} viewBox="0 0 90 63" fill="none">
      <rect width="90" height="63" rx="14" fill="#FF0000" />
      <polygon points="36,18 36,45 62,31.5" fill="white" />
    </svg>
  );
}

// ── Karhari Media Real Logo ───────────────────────────────────────────────────
function KharhariLogo({ size = 48 }: { size?: number }) {
  return (
    <div
      className="rounded-xl overflow-hidden flex-shrink-0 border border-primary/30"
      style={{ width: size, height: size }}
    >
      <Image
        src="/assets/images/1608452013412__1_-1786328033368.png"
        alt="Karhari Media Logo"
        width={size}
        height={size}
        className="w-full h-full object-contain"
      />
    </div>
  );
}

// ── Small Karhari Badge ───────────────────────────────────────────────────────
function KharhariSmallBadge() {
  return (
    <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-primary/10 border border-primary/20">
      <div className="w-4 h-4 rounded overflow-hidden flex-shrink-0">
        <Image
          src="/assets/images/1608452013412__1_-1786328033368.png"
          alt="Karhari Media"
          width={16}
          height={16}
          className="w-full h-full object-contain"
        />
      </div>
      <span className="text-xs font-semibold text-primary">Karhari Media</span>
    </div>
  );
}

// ── Animated Copyright Icon ───────────────────────────────────────────────────
function AnimatedCopyrightIcon() {
  return (
    <div className="relative w-10 h-10 sm:w-12 sm:h-12 flex-shrink-0">
      {/* Outer pulse ring */}
      <div
        className="absolute inset-0 rounded-full border-2 border-blue-400"
        style={{ animation: 'copyright-ring 1s ease-in-out infinite' }}
      />
      {/* Second ring */}
      <div
        className="absolute inset-0 rounded-full border border-blue-300 opacity-50"
        style={{ animation: 'copyright-ring 1s ease-in-out infinite', animationDelay: '0.3s' }}
      />
      <div className="absolute inset-0 rounded-xl bg-blue-500/15 flex items-center justify-center">
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          className="text-blue-400"
          style={{ animation: 'copyright-pulse 1s ease-in-out infinite' }}
        >
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
          <text x="12" y="16.5" textAnchor="middle" fontSize="11" fontWeight="bold" fill="currentColor">©</text>
        </svg>
      </div>
    </div>
  );
}

// ── Animated Dollar Icon ──────────────────────────────────────────────────────
function AnimatedDollarIcon() {
  return (
    <div className="relative w-10 h-10 sm:w-12 sm:h-12 flex-shrink-0">
      <div
        className="absolute inset-0 rounded-full border-2 border-blue-400"
        style={{ animation: 'dollar-ring 0.8s ease-in-out infinite' }}
      />
      <div className="absolute inset-0 rounded-xl bg-blue-500/15 flex items-center justify-center">
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          className="text-blue-400"
          style={{ animation: 'dollar-bounce 0.8s ease-in-out infinite' }}
        >
          <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    </div>
  );
}

// ── Fingerprint Scan Animation ────────────────────────────────────────────────
function FingerprintScan() {
  const [scanY, setScanY] = useState(0);
  const [activePlatform, setActivePlatform] = useState(0);
  const [scanCount, setScanCount] = useState(0);

  useEffect(() => {
    const scanInterval = setInterval(() => {
      setScanY((y) => {
        if (y >= 100) {
          setScanCount((c) => c + 1);
          return 0;
        }
        return y + 2;
      });
    }, 20);
    const platformInterval = setInterval(() => {
      setActivePlatform((p) => (p + 1) % SCAN_PLATFORMS.length);
    }, 1000);
    return () => {
      clearInterval(scanInterval);
      clearInterval(platformInterval);
    };
  }, []);

  return (
    <div className="mt-3 space-y-2">
      {/* Fingerprint SVG with scan line */}
      <div className="relative h-16 rounded-xl overflow-hidden bg-blue-950/30 border border-blue-500/20">
        {/* Fingerprint lines */}
        <svg className="absolute inset-0 w-full h-full opacity-30" viewBox="0 0 200 64" preserveAspectRatio="none">
          {[8,14,20,26,32,38,44,50,56].map((y, i) => (
            <ellipse key={i} cx="100" cy={y} rx={10 + i * 8} ry="3" fill="none" stroke="#60A5FA" strokeWidth="1.2" />
          ))}
        </svg>
        {/* Scan line */}
        <div
          className="absolute left-0 right-0 h-0.5 pointer-events-none"
          style={{
            top: `${scanY}%`,
            background: 'linear-gradient(90deg, transparent 0%, #60A5FA 30%, #CCFF00 50%, #60A5FA 70%, transparent 100%)',
            boxShadow: '0 0 8px #60A5FA, 0 0 16px #60A5FA44',
            transition: 'top 0.02s linear',
          }}
        />
        {/* Scan count badge */}
        <div className="absolute top-1 right-2 text-xs font-bold text-blue-400 opacity-80">
          #{scanCount + 1}
        </div>
        <div className="absolute bottom-1 left-2 text-xs text-blue-300 font-medium">
          Content ID Scan
        </div>
      </div>

      {/* Active platform */}
      <p className="text-xs text-muted-foreground font-medium">
        Scanning:{' '}
        <span className="font-bold" style={{ color: SCAN_PLATFORMS[activePlatform].color }}>
          {SCAN_PLATFORMS[activePlatform].name}
        </span>
      </p>

      {/* Platform pills */}
      <div className="flex flex-wrap gap-1.5">
        {SCAN_PLATFORMS.map((p, i) => (
          <span
            key={p.name}
            className="text-xs px-2 py-0.5 rounded-full border font-medium transition-all duration-300"
            style={{
              borderColor: i === activePlatform ? p.color : 'rgba(255,255,255,0.1)',
              color: i === activePlatform ? p.color : '#555',
              background: i === activePlatform ? `${p.color}20` : 'transparent',
              transform: i === activePlatform ? 'scale(1.08)' : 'scale(1)',
            }}
          >
            {p.name}
          </span>
        ))}
      </div>
    </div>
  );
}

// ── Music Store Ticker ────────────────────────────────────────────────────────
function MusicStoreTicker() {
  return (
    <div className="overflow-hidden mt-4 relative">
      <div className="flex gap-3" style={{ animation: 'ticker-scroll 30s linear infinite', width: 'max-content' }}>
        {[...MUSIC_STORES, ...MUSIC_STORES].map((store, i) => (
          <span
            key={i}
            className="text-xs font-semibold px-3 py-1.5 rounded-full bg-primary/10 text-primary border border-primary/20 whitespace-nowrap flex-shrink-0"
          >
            {store}
          </span>
        ))}
      </div>
    </div>
  );
}

// ── Animated CMS Badge ────────────────────────────────────────────────────────
function AnimatedCMSBadge({ label, color, bg, delay = 0 }: { label: string; color: string; bg: string; delay?: number }) {
  const [active, setActive] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setActive(true), delay);
    return () => clearTimeout(t);
  }, [delay]);
  return (
    <span
      className="text-xs px-2.5 py-1 rounded-full border font-semibold transition-all duration-500 cursor-default"
      style={{
        borderColor: active ? color : 'rgba(255,255,255,0.1)',
        color: active ? color : '#666',
        background: active ? bg : 'transparent',
        animation: active ? `badge-glow 2s ease-in-out ${delay / 1000}s infinite` : 'none',
        boxShadow: active ? `0 0 8px ${color}44` : 'none',
      }}
    >
      {label}
    </span>
  );
}

// ── Animated Play Button ──────────────────────────────────────────────────────
function AnimatedPlayButton() {
  return (
    <div className="relative w-9 h-9 flex-shrink-0">
      <div
        className="absolute inset-0 rounded-xl bg-red-500/20 border border-red-500/40"
        style={{ animation: 'play-pulse 1.2s ease-in-out infinite' }}
      />
      <div className="absolute inset-0 rounded-xl flex items-center justify-center">
        <svg
          className="w-5 h-5 text-red-400"
          fill="currentColor"
          viewBox="0 0 24 24"
          style={{ animation: 'play-scale 1.2s ease-in-out infinite' }}
        >
          <path d="M8 5v14l11-7z" />
        </svg>
      </div>
    </div>
  );
}

// ── Flowing Dollars (Monetization) ───────────────────────────────────────────
function FlowingDollars() {
  const [dollars, setDollars] = useState<{ id: number; x: number; delay: number }[]>([]);
  useEffect(() => {
    setDollars(
      Array.from({ length: 8 }, (_, i) => ({
        id: i,
        x: Math.random() * 80 + 10,
        delay: i * 0.5,
      }))
    );
  }, []);
  return (
    <div className="relative h-12 overflow-hidden mt-3 rounded-xl bg-blue-950/20 border border-blue-500/15">
      {dollars.map((d) => (
        <span
          key={d.id}
          className="absolute text-sm font-bold text-blue-400"
          style={{
            left: `${d.x}%`,
            animation: `dollar-float 2.5s ease-in-out ${d.delay}s infinite`,
          }}
        >
          $
        </span>
      ))}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <span className="text-xs font-semibold text-blue-400/50 uppercase tracking-widest">Monetization Active</span>
      </div>
    </div>
  );
}

export default function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.section-enter').forEach((el, i) => {
              setTimeout(() => el.classList.add('visible'), i * 120);
            });
          }
        });
      },
      { threshold: 0.1 }
    );
    if (sectionRef?.current) observer?.observe(sectionRef?.current);
    return () => observer?.disconnect();
  }, []);

  return (
    <>
      <style>{`
        @keyframes globe-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes ticker-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @keyframes dollar-float {
          0% { transform: translateY(48px); opacity: 0; }
          25% { opacity: 1; }
          75% { opacity: 1; }
          100% { transform: translateY(-4px); opacity: 0; }
        }
        @keyframes copyright-ring {
          0% { transform: scale(1); opacity: 0.9; }
          50% { transform: scale(1.25); opacity: 0.2; }
          100% { transform: scale(1); opacity: 0.9; }
        }
        @keyframes copyright-pulse {
          0%, 100% { transform: scale(1); filter: brightness(1); }
          50% { transform: scale(1.15); filter: brightness(1.6) drop-shadow(0 0 6px #60A5FA); }
        }
        @keyframes dollar-ring {
          0% { transform: scale(1); opacity: 0.9; }
          50% { transform: scale(1.3); opacity: 0.15; }
          100% { transform: scale(1); opacity: 0.9; }
        }
        @keyframes dollar-bounce {
          0%, 100% { transform: translateY(0) scale(1); filter: brightness(1); }
          50% { transform: translateY(-3px) scale(1.15); filter: brightness(1.7) drop-shadow(0 0 6px #60A5FA); }
        }
        @keyframes play-pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.2); opacity: 0.5; }
        }
        @keyframes play-scale {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.15); filter: drop-shadow(0 0 4px #FF0000); }
        }
        @keyframes badge-glow {
          0%, 100% { box-shadow: 0 0 4px currentColor; }
          50% { box-shadow: 0 0 12px currentColor, 0 0 20px currentColor; }
        }
        @keyframes title-shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes pct-pop {
          0% { transform: scale(0.8); opacity: 0; }
          60% { transform: scale(1.15); }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes monetize-glow {
          0%, 100% { box-shadow: 0 0 8px rgba(96,165,250,0.3); }
          50% { box-shadow: 0 0 20px rgba(96,165,250,0.7), 0 0 40px rgba(96,165,250,0.3); }
        }
      `}</style>

      <section id="services" ref={sectionRef} className="py-10 sm:py-16 relative">
        <div className="absolute top-0 left-0 w-80 h-80 orb-teal opacity-40 pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-80 h-80 orb-pink opacity-30 pointer-events-none" />
        <div className="absolute top-1/2 right-0 w-96 h-96 blob-blue opacity-20 pointer-events-none -translate-y-1/2" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Header */}
          <div className="mb-8 sm:mb-12 section-enter">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
              <div>
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-3 block">
                  What We Do
                </span>
                <h2 className="text-section-title font-extrabold text-foreground">
                  End-to-End Music<br className="hidden sm:block" /> Distribution Services
                </h2>
              </div>
              <p className="text-muted-foreground font-medium max-w-sm text-sm sm:text-base leading-relaxed">
                From metadata handling to copyright protection — we manage every step so you focus on creating.
              </p>
            </div>
          </div>

          {/* Bento grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">

            {/* ── Card 1: Global Music Distribution ── */}
            <div className="section-enter stagger-1 bento-card neon-card md:col-span-2 p-6 sm:p-8 flex flex-col justify-between min-h-[280px] border-primary/20"
              style={{ animationDelay: '0s' }}>
              <div>
                <div className="flex items-start justify-between mb-4 sm:mb-5">
                  <div className="flex items-center gap-3">
                    <RotatingGlobe />
                    <div className="flex flex-col gap-1">
                      <span className="text-xs font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full bg-primary/10 text-primary">
                        Core Service
                      </span>
                      <KharhariSmallBadge />
                    </div>
                  </div>
                  <CheckCircleIcon className="w-6 h-6 text-primary flex-shrink-0" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-foreground mb-2 leading-tight">
                  Global Music Distribution
                </h3>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed font-medium mb-1">
                  Get your music delivered to <strong className="text-primary">35+ digital stores</strong> worldwide. We handle metadata, artwork, ISRC codes, and platform delivery end-to-end.
                </p>
                <p className="text-xs text-muted-foreground mb-3">
                  Spotify · Apple Music · YouTube Music · Amazon Music · Tidal · Deezer · Gaana · JioSaavn · Wynk · Boomplay · Audiomack · Anghami · Resso · NetEase · QQ Music · Melon · Bugs · Genie · Yandex Music · Beatport · Pandora · iHeartRadio · Napster · Shazam · Bandcamp · Claro Música · and more…
                </p>
                {/* Scrolling music store ticker */}
                <MusicStoreTicker />
              </div>
              <div className="mt-5 pt-4 border-t border-border flex items-center justify-between">
                <div>
                  <span className="text-2xl sm:text-3xl font-extrabold text-primary">35+</span>
                  <p className="text-xs text-muted-foreground font-medium mt-0.5">Worldwide Platforms</p>
                </div>
                <div className="w-8 h-8 rounded-full border border-border flex items-center justify-center">
                  <svg className="w-4 h-4 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* ── Card 2: YouTube CMS & Channel Management ── */}
            <div className="section-enter stagger-2 bento-card neon-card md:col-span-1 md:row-span-2 p-6 sm:p-8 flex flex-col justify-between md:min-h-[560px]"
              style={{ animationDelay: '0.3s' }}>
              <div>
                {/* Dual brand icons — real Karhari logo (bigger) + YouTube */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2.5">
                    {/* Karhari Media real logo — larger than YouTube */}
                    <KharhariLogo size={52} />
                    <span className="text-xs text-muted-foreground font-medium">×</span>
                    {/* YouTube icon — slightly smaller */}
                    <YouTubeIcon size={36} />
                  </div>
                  <CheckCircleIcon className="w-6 h-6 text-primary flex-shrink-0" />
                </div>

                {/* Animated play button + MCN tag */}
                <div className="flex items-center gap-2 mb-3">
                  <AnimatedPlayButton />
                  <span className="text-xs font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full bg-red-500/10 text-red-400 border border-red-500/20">
                    YouTube MCN
                  </span>
                  <KharhariSmallBadge />
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-foreground mb-2 leading-tight">
                  YouTube CMS &amp; Channel Management
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed font-medium mb-3">
                  Full YouTube Multi-Channel Network (MCN) access. We manage Content ID, Music CMS, Entertainment CMS, channel growth, metadata optimization, and copyright claims across all content types.
                </p>

                {/* Animated CMS type badges */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {CMS_TYPES.map((cms, i) => (
                    <AnimatedCMSBadge
                      key={cms.label}
                      label={cms.label}
                      color={cms.color}
                      bg={cms.bg}
                      delay={i * 200}
                    />
                  ))}
                </div>

                {/* Rich content list */}
                <div className="space-y-2 text-xs text-muted-foreground">
                  <div className="flex items-start gap-2">
                    <CheckCircleIcon className="w-3.5 h-3.5 text-red-400 mt-0.5 flex-shrink-0" />
                    <span><strong className="text-foreground/80">YouTube Music CMS</strong> — Full music catalog management, Content ID claims, royalty collection</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircleIcon className="w-3.5 h-3.5 text-orange-400 mt-0.5 flex-shrink-0" />
                    <span><strong className="text-foreground/80">YouTube Entertainment CMS</strong> — Movies, web series, short films, comedy &amp; drama channels</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircleIcon className="w-3.5 h-3.5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span><strong className="text-foreground/80">YouTube Kids CMS</strong> — Child-safe content management, COPPA compliance, YouTube Kids platform</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircleIcon className="w-3.5 h-3.5 text-purple-400 mt-0.5 flex-shrink-0" />
                    <span><strong className="text-foreground/80">YouTube Live CMS</strong> — Live stream monetization, Super Chat, memberships, live event management</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircleIcon className="w-3.5 h-3.5 text-cyan-400 mt-0.5 flex-shrink-0" />
                    <span><strong className="text-foreground/80">YouTube Gaming CMS</strong> — Gaming channel management, stream monetization, YouTube Gaming integration</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircleIcon className="w-3.5 h-3.5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span><strong className="text-foreground/80">YouTube Channel Content ID</strong> — Automated fingerprint matching, claim management, revenue redirection</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircleIcon className="w-3.5 h-3.5 text-primary mt-0.5 flex-shrink-0" />
                    <span><strong className="text-foreground/80">Multi-Channel Network</strong> — Audience development, brand deals, cross-channel promotion, analytics</span>
                  </div>
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-border flex items-center justify-between">
                <div>
                  <span className="text-2xl sm:text-3xl font-extrabold text-foreground">800+</span>
                  <p className="text-xs text-muted-foreground font-medium mt-0.5">Channels Managed</p>
                </div>
                <div className="w-8 h-8 rounded-full border border-border flex items-center justify-center">
                  <svg className="w-4 h-4 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* ── Card 3: Music Rights Management ── */}
            <div className="section-enter stagger-3 bento-card neon-card md:col-span-1 p-6 sm:p-8 flex flex-col justify-between min-h-[260px]"
              style={{ animationDelay: '0.6s' }}>
              <div>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <AnimatedCopyrightIcon />
                    <div className="flex flex-col gap-1">
                      <span
                        className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-blue-500/15 text-blue-400 border border-blue-500/30"
                        style={{
                          background: 'linear-gradient(90deg, rgba(96,165,250,0.15) 0%, rgba(204,255,0,0.1) 50%, rgba(96,165,250,0.15) 100%)',
                          backgroundSize: '200% auto',
                          animation: 'title-shimmer 2s linear infinite',
                        }}
                      >
                        Protection
                      </span>
                      <KharhariSmallBadge />
                    </div>
                  </div>
                  <CheckCircleIcon className="w-6 h-6 text-primary flex-shrink-0" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-foreground mb-2 leading-tight">
                  Music Rights Management
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed font-medium mb-2">
                  Comprehensive copyright protection via Content ID &amp; Fingerprint scanning. We monitor, claim, and enforce your rights across all platforms every second.
                </p>
                {/* Fingerprint scan animation */}
                <FingerprintScan />
              </div>
              <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
                <div>
                  <span
                    className="text-2xl sm:text-3xl font-extrabold text-blue-400"
                    style={{ animation: 'pct-pop 0.6s ease-out forwards, copyright-pulse 2s ease-in-out 0.6s infinite' }}
                  >
                    100%
                  </span>
                  <p className="text-xs text-muted-foreground font-medium mt-0.5">Rights Protected</p>
                </div>
                <div className="w-8 h-8 rounded-full border border-border flex items-center justify-center">
                  <svg className="w-4 h-4 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* ── Card 4: Content Monetization ── */}
            <div
              className="section-enter stagger-4 bento-card neon-card md:col-span-1 p-6 sm:p-8 flex flex-col justify-between min-h-[260px]"
              style={{ animation: 'monetize-glow 3s ease-in-out 0.9s infinite' }}
            >
              <div>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <AnimatedDollarIcon />
                    <div className="flex flex-col gap-1">
                      <span
                        className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border border-blue-500/30 text-blue-400"
                        style={{
                          background: 'linear-gradient(90deg, rgba(96,165,250,0.15) 0%, rgba(204,255,0,0.1) 50%, rgba(96,165,250,0.15) 100%)',
                          backgroundSize: '200% auto',
                          animation: 'title-shimmer 1.8s linear infinite',
                        }}
                      >
                        Revenue
                      </span>
                      <KharhariSmallBadge />
                    </div>
                  </div>
                  <CheckCircleIcon className="w-6 h-6 text-primary flex-shrink-0" />
                </div>
                <h3
                  className="text-lg sm:text-xl font-bold mb-2 leading-tight"
                  style={{
                    background: 'linear-gradient(90deg, #60A5FA 0%, #CCFF00 50%, #60A5FA 100%)',
                    backgroundSize: '200% auto',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    animation: 'title-shimmer 2.5s linear infinite',
                  }}
                >
                  Content Monetization
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed font-medium mb-1">
                  Turn every stream, view, and play into income. We handle royalty collection, income reporting, and transparent payouts with detailed analytics.
                </p>
                {/* Flowing dollars animation */}
                <FlowingDollars />
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {[
                    { label: 'YouTube MCN', color: '#FF0000' },
                    { label: 'Streaming', color: '#1DB954' },
                    { label: 'Content ID', color: '#60A5FA' },
                    { label: '800+ Channels', color: '#CCFF00' },
                    { label: 'Direct Payouts', color: '#FFC107' },
                  ].map((tag, i) => (
                    <span
                      key={tag.label}
                      className="text-xs px-2 py-0.5 rounded-full border font-semibold"
                      style={{
                        borderColor: tag.color,
                        color: tag.color,
                        background: `${tag.color}18`,
                        animation: `badge-glow 2s ease-in-out ${i * 0.3}s infinite`,
                      }}
                    >
                      {tag.label}
                    </span>
                  ))}
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
                <div>
                  <span
                    className="text-2xl sm:text-3xl font-extrabold text-blue-400"
                    style={{ animation: 'dollar-bounce 1.5s ease-in-out infinite' }}
                  >
                    80%
                  </span>
                  <p className="text-xs text-muted-foreground font-medium mt-0.5">Revenue to You</p>
                </div>
                <div className="w-8 h-8 rounded-full border border-border flex items-center justify-center">
                  <svg className="w-4 h-4 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}