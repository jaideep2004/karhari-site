'use client';

import { useEffect, useRef, useState } from 'react';
import PlatformBadges from './PlatformBadges';

/* ── Typewriter hook ── */
function useTypewriter(text: string, speed = 38, startDelay = 600) {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);
  useEffect(() => {
    setDisplayed('');
    setDone(false);
    let i = 0;
    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        i++;
        setDisplayed(text.slice(0, i));
        if (i >= text.length) { clearInterval(interval); setDone(true); }
      }, speed);
      return () => clearInterval(interval);
    }, startDelay);
    return () => clearTimeout(timeout);
  }, [text, speed, startDelay]);
  return { displayed, done };
}

/* ── Animated counter ── */
function Counter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    let start = 0;
    const step = Math.ceil(target / 60);
    const id = setInterval(() => {
      start += step;
      if (start >= target) { setVal(target); clearInterval(id); }
      else setVal(start);
    }, 22);
    return () => clearInterval(id);
  }, [target]);
  return <>{val}{suffix}</>;
}

export default function HeroContent() {
  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);
  const [card1Visible, setCard1Visible] = useState(false);
  const [card2Visible, setCard2Visible] = useState(false);
  const [glitch, setGlitch] = useState(false);

  const titleText = 'Karhari Media Global Music Distribution & Digital Rights Management';
  const { displayed: typedTitle, done: titleDone } = useTypewriter(titleText, 32, 900);

  /* Intersection observers */
  useEffect(() => {
    const obs1 = new IntersectionObserver(([e]) => { if (e.isIntersecting) setCard1Visible(true); }, { threshold: 0.2 });
    const obs2 = new IntersectionObserver(([e]) => { if (e.isIntersecting) setCard2Visible(true); }, { threshold: 0.2 });
    if (card1Ref.current) obs1.observe(card1Ref.current);
    if (card2Ref.current) obs2.observe(card2Ref.current);
    return () => { obs1.disconnect(); obs2.disconnect(); };
  }, []);

  /* Glitch pulse */
  useEffect(() => {
    const id = setInterval(() => {
      setGlitch(true);
      setTimeout(() => setGlitch(false), 180);
    }, 4200);
    return () => clearInterval(id);
  }, []);

  const stats = [
    { label: 'Platforms', value: 150, suffix: '+' },
    { label: 'Artists', value: 10000, suffix: '+' },
    { label: 'Countries', value: 180, suffix: '+' },
  ];

  // Card 1: Deep violet-indigo with gold accent
  const c1 = {
    primary: '#7c3aed',
    secondary: '#f59e0b',
    border: 'rgba(124,58,237,0.55)',
    glow: 'rgba(124,58,237,0.18)',
  };

  // Card 2: Deep teal-emerald with cyan accent
  const c2 = {
    primary: '#10b981',
    secondary: '#06b6d4',
    border: 'rgba(16,185,129,0.5)',
    glow: 'rgba(16,185,129,0.16)',
  };

  return (
    <div className="flex flex-col gap-4 lg:gap-5 fade-in-up">

      {/* ── Eyebrow ── */}
      <div className="flex items-center gap-2 fade-in-up-delay-1">
        <span className="dot-pulse w-2 h-2 rounded-full flex-shrink-0"
          style={{ background: `linear-gradient(135deg, ${c1.primary}, ${c1.secondary})` }} />
        <span className="text-xs font-bold tracking-[0.35em] uppercase"
          style={{
            background: `linear-gradient(90deg, ${c1.primary}, ${c1.secondary})`,
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
          }}>
          Global Music Distribution
        </span>
      </div>

      {/* ══════════════════════════════════════════
          CARD 1 — Violet-Gold HUD Panel
      ══════════════════════════════════════════ */}
      <div
        ref={card1Ref}
        className="relative overflow-hidden rounded-xl"
        style={{
          opacity: card1Visible ? 1 : 0,
          transform: card1Visible ? 'translateY(0) scale(1)' : 'translateY(24px) scale(0.97)',
          transition: 'opacity 0.7s cubic-bezier(.22,1,.36,1), transform 0.7s cubic-bezier(.22,1,.36,1)',
          background: 'rgba(10,8,24,0.72)',
          border: `1px solid ${c1.border}`,
          boxShadow: `0 0 0 1px rgba(124,58,237,0.08), 0 0 32px ${c1.glow}`,
        }}
      >
        {/* ── Side edge lighting ── */}
        <div className="absolute top-0 bottom-0 left-0 w-px pointer-events-none" aria-hidden="true"
          style={{ background: `linear-gradient(180deg, transparent 0%, rgba(124,58,237,0.9) 30%, rgba(245,158,11,0.85) 70%, transparent 100%)`, boxShadow: `0 0 6px rgba(124,58,237,0.6)`, animation: 'edgeGlow 3s ease-in-out infinite alternate' }} />
        <div className="absolute top-0 bottom-0 right-0 w-px pointer-events-none" aria-hidden="true"
          style={{ background: `linear-gradient(180deg, transparent 0%, rgba(245,158,11,0.85) 30%, rgba(124,58,237,0.85) 70%, transparent 100%)`, boxShadow: `0 0 6px rgba(245,158,11,0.5)`, animation: 'edgeGlow 3s ease-in-out infinite alternate 1.5s' }} />

        {/* Top holographic bar */}
        <div className="absolute top-0 left-0 right-0 h-px pointer-events-none" aria-hidden="true"
          style={{ background: `linear-gradient(90deg, transparent 0%, ${c1.primary} 20%, ${c1.secondary} 50%, ${c1.primary} 80%, transparent 100%)`, boxShadow: `0 0 8px rgba(245,158,11,0.7)`, animation: 'btnShimmer 3s ease-in-out infinite' }} />

        {/* Corner brackets */}
        {[
          { top: 0, left: 0, borderTop: `2px solid rgba(124,58,237,0.95)`, borderLeft: `2px solid rgba(124,58,237,0.95)`, filter: `drop-shadow(0 0 4px rgba(124,58,237,0.9))` },
          { top: 0, right: 0, borderTop: `2px solid rgba(245,158,11,0.95)`, borderRight: `2px solid rgba(245,158,11,0.95)`, filter: `drop-shadow(0 0 4px rgba(245,158,11,0.9))` },
          { bottom: 0, left: 0, borderBottom: `2px solid rgba(245,158,11,0.95)`, borderLeft: `2px solid rgba(245,158,11,0.95)`, filter: `drop-shadow(0 0 4px rgba(245,158,11,0.9))` },
          { bottom: 0, right: 0, borderBottom: `2px solid rgba(124,58,237,0.95)`, borderRight: `2px solid rgba(124,58,237,0.95)`, filter: `drop-shadow(0 0 4px rgba(124,58,237,0.9))` },
        ].map((s, i) => (
          <div key={i} className="absolute w-4 h-4 pointer-events-none" aria-hidden="true" style={s as React.CSSProperties} />
        ))}

        <div className="relative px-4 py-3.5 lg:px-5 lg:py-4">
          {/* Header row */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2.5">
              <div className="relative w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{
                  background: `rgba(124,58,237,0.1)`,
                  border: `1px solid rgba(124,58,237,0.45)`,
                  boxShadow: `0 0 12px rgba(124,58,237,0.22)`,
                }}>
                <div className="absolute inset-0 rounded-lg pointer-events-none" aria-hidden="true"
                  style={{ border: `1px solid rgba(245,158,11,0.25)`, animation: 'spin 4s linear infinite' }} />
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M9 19V6l12-3v13" stroke={c1.primary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <circle cx="6" cy="19" r="3" stroke={c1.primary} strokeWidth="2" />
                  <circle cx="18" cy="16" r="3" stroke={c1.secondary} strokeWidth="2" />
                </svg>
              </div>
              <div>
                <div className="text-[8px] font-bold tracking-[0.4em] uppercase mb-0.5"
                  style={{ color: `rgba(245,158,11,0.9)` }}>
                  DISTRIBUTION KARHARI MEDIA
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full" style={{ background: c1.primary, boxShadow: `0 0 6px ${c1.primary}`, animation: 'pulse 1.5s ease-in-out infinite' }} />
                  <span className="text-[8px] font-bold tracking-widest uppercase" style={{ color: `rgba(124,58,237,0.7)` }}>LIVE SYSTEM</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full"
              style={{ border: `1px solid rgba(245,158,11,0.25)`, background: `rgba(245,158,11,0.06)` }}>
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: c1.secondary, animation: 'pulse 1s ease-in-out infinite' }} />
              <span className="text-[8px] font-bold tracking-widest uppercase" style={{ color: c1.secondary }}>ACTIVE</span>
            </div>
          </div>

          {/* Typewriter title */}
          <h2
            className="font-black leading-tight mb-3"
            style={{
              fontSize: 'clamp(0.9rem, 1.8vw, 1.25rem)',
              background: `linear-gradient(90deg, #ffffff 0%, ${c1.primary} 40%, ${c1.secondary} 75%, #ffffff 100%)`,
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              filter: glitch ? `drop-shadow(2px 0 0 rgba(124,58,237,0.9)) drop-shadow(-2px 0 0 rgba(245,158,11,0.9))` : `drop-shadow(0 0 10px rgba(124,58,237,0.35))`,
              letterSpacing: '-0.01em',
              minHeight: '2.8rem',
              transition: 'filter 0.05s',
            }}
          >
            {typedTitle}
            {!titleDone && (
              <span style={{ borderRight: `2px solid ${c1.secondary}`, marginLeft: 2, animation: 'blink 0.7s step-end infinite' }}>&nbsp;</span>
            )}
          </h2>

          {/* Stats row */}
          <div className="grid grid-cols-3 gap-1.5">
            {stats.map((s, i) => (
              <div key={i} className="relative rounded-lg px-2 py-2 text-center overflow-hidden"
                style={{
                  background: `rgba(124,58,237,0.06)`,
                  border: `1px solid rgba(124,58,237,0.18)`,
                }}>
                <div className="relative">
                  <div className="text-sm font-black" style={{ color: i === 1 ? c1.secondary : c1.primary, textShadow: `0 0 8px ${i === 1 ? 'rgba(245,158,11,0.7)' : 'rgba(124,58,237,0.7)'}` }}>
                    {card1Visible && <Counter target={s.value} suffix={s.suffix} />}
                  </div>
                  <div className="text-[8px] font-bold tracking-widest uppercase mt-0.5" style={{ color: 'rgba(180,200,220,0.55)' }}>{s.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom data bar */}
        <div className="relative px-4 py-1.5 lg:px-5 flex items-center gap-2 overflow-hidden"
          style={{ borderTop: `1px solid rgba(124,58,237,0.12)` }}>
          <div className="flex items-center gap-1 flex-1 overflow-hidden">
            {['DIST', 'PROT', 'MON', 'EARN', 'SYNC'].map((tag, i) => (
              <span key={i} className="text-[7px] font-bold tracking-widest px-1 py-0.5 rounded flex-shrink-0"
                style={{
                  color: `rgba(245,158,11,0.65)`,
                  border: `1px solid rgba(245,158,11,0.18)`,
                  animation: `fadeInTag 0.4s ease forwards`,
                  animationDelay: `${1.2 + i * 0.15}s`,
                  opacity: 0,
                }}>
                {tag}
              </span>
            ))}
          </div>
          <div className="text-[7px] font-bold tracking-widest flex-shrink-0" style={{ color: `rgba(124,58,237,0.45)` }}>
            SYS v2.4.1
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════
          CARD 2 — Emerald-Teal Neural Panel
      ══════════════════════════════════════════ */}
      <div
        ref={card2Ref}
        className="relative overflow-hidden rounded-xl"
        style={{
          opacity: card2Visible ? 1 : 0,
          transform: card2Visible ? 'translateY(0) rotateX(0deg)' : 'translateY(20px) rotateX(6deg)',
          transition: 'opacity 0.8s cubic-bezier(.22,1,.36,1) 0.15s, transform 0.8s cubic-bezier(.22,1,.36,1) 0.15s',
          background: 'rgba(8,20,16,0.72)',
          border: `1px solid ${c2.border}`,
          boxShadow: `0 0 0 1px rgba(16,185,129,0.08), 0 0 32px ${c2.glow}`,
          perspective: '800px',
        }}
      >
        {/* ── Side edge lighting ── */}
        <div className="absolute top-0 bottom-0 left-0 w-px pointer-events-none" aria-hidden="true"
          style={{ background: `linear-gradient(180deg, transparent 0%, rgba(16,185,129,0.9) 30%, rgba(6,182,212,0.85) 70%, transparent 100%)`, boxShadow: `0 0 6px rgba(16,185,129,0.6)`, animation: 'edgeGlow 3.5s ease-in-out infinite alternate' }} />
        <div className="absolute top-0 bottom-0 right-0 w-px pointer-events-none" aria-hidden="true"
          style={{ background: `linear-gradient(180deg, transparent 0%, rgba(6,182,212,0.85) 30%, rgba(16,185,129,0.85) 70%, transparent 100%)`, boxShadow: `0 0 6px rgba(6,182,212,0.5)`, animation: 'edgeGlow 3.5s ease-in-out infinite alternate 1.75s' }} />

        {/* Top bar */}
        <div className="absolute top-0 left-0 right-0 h-px pointer-events-none" aria-hidden="true"
          style={{ background: `linear-gradient(90deg, transparent 0%, ${c2.primary} 30%, ${c2.secondary} 60%, ${c2.primary} 80%, transparent 100%)`, boxShadow: `0 0 8px rgba(16,185,129,0.7)`, animation: 'btnShimmer 4s ease-in-out infinite 1s' }} />

        {/* Corner brackets */}
        {[
          { top: 0, left: 0, borderTop: `2px solid rgba(16,185,129,0.95)`, borderLeft: `2px solid rgba(16,185,129,0.95)`, filter: `drop-shadow(0 0 4px rgba(16,185,129,0.9))` },
          { top: 0, right: 0, borderTop: `2px solid rgba(6,182,212,0.95)`, borderRight: `2px solid rgba(6,182,212,0.95)`, filter: `drop-shadow(0 0 4px rgba(6,182,212,0.9))` },
          { bottom: 0, left: 0, borderBottom: `2px solid rgba(6,182,212,0.95)`, borderLeft: `2px solid rgba(6,182,212,0.95)`, filter: `drop-shadow(0 0 4px rgba(6,182,212,0.9))` },
          { bottom: 0, right: 0, borderBottom: `2px solid rgba(16,185,129,0.95)`, borderRight: `2px solid rgba(16,185,129,0.95)`, filter: `drop-shadow(0 0 4px rgba(16,185,129,0.9))` },
        ].map((s, i) => (
          <div key={i} className="absolute w-4 h-4 pointer-events-none" aria-hidden="true" style={s as React.CSSProperties} />
        ))}

        <div className="relative px-4 py-3.5 lg:px-5 lg:py-4">
          {/* Header */}
          <div className="flex items-center gap-2.5 mb-3">
            <div className="relative w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{
                background: `rgba(16,185,129,0.09)`,
                border: `1px solid rgba(16,185,129,0.45)`,
                boxShadow: `0 0 12px rgba(16,185,129,0.22)`,
              }}>
              <div className="absolute inset-0 rounded-lg pointer-events-none" aria-hidden="true"
                style={{ border: `1px solid rgba(6,182,212,0.25)`, animation: 'spin 6s linear infinite reverse' }} />
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <circle cx="12" cy="12" r="10" stroke={c2.primary} strokeWidth="2" />
                <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" stroke={c2.secondary} strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </div>
            <div>
              <div className="text-[8px] font-bold tracking-[0.4em] uppercase" style={{ color: `rgba(16,185,129,0.9)` }}>
                GLOBAL REACH · NEURAL NETWORK
              </div>
              <div className="flex items-center gap-1.5 mt-0.5">
                {['DIST', 'RIGHTS', 'SYNC'].map((t, i) => (
                  <span key={i} className="text-[7px] font-bold tracking-widest px-1 py-0.5 rounded"
                    style={{ color: `rgba(6,182,212,0.75)`, border: `1px solid rgba(6,182,212,0.22)` }}>
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Description */}
          <p className="text-xs lg:text-[0.8rem] leading-relaxed mb-3"
            style={{ color: 'rgba(200,215,235,0.82)', fontWeight: 400 }}>
            Empowering artists and record labels worldwide with seamless music distribution to{' '}
            <span style={{ color: '#1DB954', fontWeight: 600 }}>YouTube Music</span>,{' '}
            <span style={{ color: '#1DB954', fontWeight: 600 }}>Spotify</span>,{' '}
            <span style={{ color: '#fc3c44', fontWeight: 600 }}>Apple Music</span>,{' '}
            <span style={{ color: c2.secondary, fontWeight: 600 }}>TikTok</span>, and more. Manage releases, protect copyrights, and grow globally.
          </p>

          {/* Feature pills — spinning globe icon */}
          <div className="flex flex-wrap gap-1.5">
            {[
              { label: 'Music Distribution', color: c2.primary },
              { label: 'Rights Management', color: c2.secondary },
              { label: 'Analytics', color: c2.primary },
              { label: 'Royalty Collection', color: c2.secondary },
            ].map((f, i) => (
              <span key={i}
                className="inline-flex items-center gap-1.5 text-[9px] font-bold tracking-wide px-2.5 py-1 rounded-full"
                style={{
                  color: f.color,
                  background: `${f.color}0d`,
                  border: `1px solid ${f.color}38`,
                  animation: `fadeInTag 0.4s ease forwards`,
                  animationDelay: `${0.8 + i * 0.12}s`,
                  opacity: 0,
                }}>
                {/* Spinning globe icon */}
                <span className="relative inline-flex items-center justify-center flex-shrink-0" style={{ width: 12, height: 12 }}>
                  <svg
                    width="12" height="12" viewBox="0 0 24 24" fill="none"
                    style={{ position: 'absolute', top: 0, left: 0, animation: 'globeSpin 2.4s linear infinite', filter: `drop-shadow(0 0 3px ${f.color})` }}
                    aria-hidden="true"
                  >
                    <circle cx="12" cy="12" r="10" stroke={f.color} strokeWidth="2" strokeOpacity="0.9" />
                    <path d="M2 12h20" stroke={f.color} strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.7" />
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" stroke={f.color} strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.9" />
                  </svg>
                  <svg
                    width="6" height="6" viewBox="0 0 24 24" fill="none"
                    style={{ position: 'absolute', top: 3, left: 3, animation: 'globeSpinReverse 3.6s linear infinite', filter: `drop-shadow(0 0 2px ${f.color})` }}
                    aria-hidden="true"
                  >
                    <circle cx="12" cy="12" r="5" fill={f.color} fillOpacity="0.85" />
                  </svg>
                </span>
                {f.label}
              </span>
            ))}
          </div>
        </div>

        {/* Progress bar footer */}
        <div className="relative px-4 py-2 lg:px-5"
          style={{ borderTop: `1px solid rgba(16,185,129,0.12)` }}>
          <div className="flex items-center justify-between mb-1">
            <span className="text-[7px] font-bold tracking-widest uppercase" style={{ color: `rgba(16,185,129,0.65)` }}>DISTRIBUTION REACH</span>
            <span className="text-[7px] font-bold" style={{ color: `rgba(6,182,212,0.85)` }}>150+ PLATFORMS WORLDWIDE</span>
          </div>
          <div className="h-0.5 rounded-full overflow-hidden" style={{ background: `rgba(16,185,129,0.14)` }}>
            <div className="h-full rounded-full"
              style={{
                width: card2Visible ? '92%' : '0%',
                background: `linear-gradient(90deg, ${c2.primary}, ${c2.secondary})`,
                boxShadow: `0 0 5px rgba(16,185,129,0.5)`,
                transition: 'width 1.8s cubic-bezier(.22,1,.36,1) 0.5s',
              }} />
          </div>
        </div>
      </div>

      {/* ── CTA Buttons ── */}
      <div className="flex flex-wrap gap-4 fade-in-up-delay-4" role="group" aria-label="Call to action buttons">
        {/* ── START DISTRIBUTION ── */}
        <button
          className="group relative overflow-hidden font-bold text-sm tracking-widest px-7 py-4 rounded-xl focus:outline-none"
          aria-label="Start music distribution across 150+ platforms"
          style={{
            background: 'linear-gradient(135deg, rgba(124,58,237,0.18) 0%, rgba(245,158,11,0.1) 100%)',
            border: '1.5px solid rgba(124,58,237,0.6)',
            color: '#c4b5fd',
            boxShadow: '0 0 24px rgba(124,58,237,0.28), 0 0 50px rgba(124,58,237,0.08)',
            transition: 'box-shadow 0.3s, border-color 0.3s, transform 0.2s, color 0.2s',
          }}
          onMouseEnter={e => {
            const el = e.currentTarget as HTMLButtonElement;
            el.style.boxShadow = '0 0 44px rgba(124,58,237,0.55), 0 0 80px rgba(245,158,11,0.15)';
            el.style.borderColor = 'rgba(245,158,11,0.8)';
            el.style.transform = 'translateY(-3px) scale(1.03)';
            el.style.color = '#fde68a';
          }}
          onMouseLeave={e => {
            const el = e.currentTarget as HTMLButtonElement;
            el.style.boxShadow = '0 0 24px rgba(124,58,237,0.28), 0 0 50px rgba(124,58,237,0.08)';
            el.style.borderColor = 'rgba(124,58,237,0.6)';
            el.style.transform = 'translateY(0) scale(1)';
            el.style.color = '#c4b5fd';
          }}
          onFocus={e => {
            const el = e.currentTarget as HTMLButtonElement;
            el.style.boxShadow = '0 0 44px rgba(124,58,237,0.55), 0 0 0 3px rgba(245,158,11,0.5)';
          }}
          onBlur={e => {
            const el = e.currentTarget as HTMLButtonElement;
            el.style.boxShadow = '0 0 24px rgba(124,58,237,0.28), 0 0 50px rgba(124,58,237,0.08)';
          }}
        >
          {/* Animated shimmer sweep */}
          <span className="absolute inset-0 pointer-events-none" aria-hidden="true"
            style={{ background: 'linear-gradient(105deg, transparent 30%, rgba(245,158,11,0.18) 50%, transparent 70%)', animation: 'btnShimmer 2.4s ease-in-out infinite' }} />
          {/* Top highlight line */}
          <span className="absolute top-0 left-4 right-4 h-px pointer-events-none" aria-hidden="true"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(245,158,11,0.75), transparent)', animation: 'btnShimmer 2.4s ease-in-out infinite 0.4s' }} />
          {/* Bottom glow line */}
          <span className="absolute bottom-0 left-6 right-6 h-px pointer-events-none" aria-hidden="true"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(124,58,237,0.5), transparent)' }} />
          {/* Orbiting ring */}
          <span className="absolute inset-0 rounded-xl pointer-events-none" aria-hidden="true"
            style={{ border: '1px solid rgba(245,158,11,0.12)', animation: 'orbitPulse 3s ease-in-out infinite' }} />
          {/* Particle dots */}
          {[0, 1, 2].map(i => (
            <span key={i} className="absolute pointer-events-none" aria-hidden="true"
              style={{
                width: 3, height: 3, borderRadius: '50%',
                background: i % 2 === 0 ? 'rgba(245,158,11,0.8)' : 'rgba(124,58,237,0.8)',
                top: `${20 + i * 25}%`,
                right: 8,
                animation: `floatDot ${1.5 + i * 0.5}s ease-in-out infinite`,
                animationDelay: `${i * 0.4}s`,
              }} />
          ))}
          <span className="relative flex items-center gap-2">
            <span className="relative flex-shrink-0" style={{ width: 10, height: 10 }}>
              <span style={{ display: 'block', width: 10, height: 10, borderRadius: '50%', background: 'linear-gradient(135deg, #7c3aed, #f59e0b)', boxShadow: '0 0 8px rgba(245,158,11,0.85)', animation: 'pulse 1.2s ease-in-out infinite' }} />
              <span style={{ position: 'absolute', inset: -3, borderRadius: '50%', border: '1px solid rgba(245,158,11,0.4)', animation: 'pingRing 1.5s ease-out infinite' }} />
            </span>
            START DISTRIBUTION
            <span className="text-base transition-transform duration-200 group-hover:translate-x-1.5" aria-hidden="true"
              style={{ animation: 'arrowBounce 1.8s ease-in-out infinite' }}>→</span>
          </span>
        </button>

        <button
          className="group relative overflow-hidden font-bold text-sm tracking-widest px-7 py-4 rounded-xl transition-all duration-300 focus:outline-none"
          aria-label="Book a consultation with our music distribution team"
          style={{
            background: 'linear-gradient(135deg, rgba(16,185,129,0.14) 0%, rgba(6,182,212,0.09) 100%)',
            border: '1.5px solid rgba(16,185,129,0.5)',
            color: '#6ee7b7',
            boxShadow: '0 0 20px rgba(16,185,129,0.2)',
            transition: 'box-shadow 0.3s, border-color 0.3s, transform 0.2s',
          }}
          onMouseEnter={e => {
            const el = e.currentTarget as HTMLButtonElement;
            el.style.boxShadow = '0 0 36px rgba(16,185,129,0.45)';
            el.style.borderColor = 'rgba(6,182,212,0.9)';
            el.style.transform = 'translateY(-2px) scale(1.02)';
          }}
          onMouseLeave={e => {
            const el = e.currentTarget as HTMLButtonElement;
            el.style.boxShadow = '0 0 20px rgba(16,185,129,0.2)';
            el.style.borderColor = 'rgba(16,185,129,0.5)';
            el.style.transform = 'translateY(0) scale(1)';
          }}
          onFocus={e => {
            const el = e.currentTarget as HTMLButtonElement;
            el.style.boxShadow = '0 0 36px rgba(16,185,129,0.45), 0 0 0 3px rgba(6,182,212,0.5)';
          }}
          onBlur={e => {
            const el = e.currentTarget as HTMLButtonElement;
            el.style.boxShadow = '0 0 20px rgba(16,185,129,0.2)';
          }}
        >
          <span className="absolute inset-0 pointer-events-none" aria-hidden="true"
            style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(16,185,129,0.12) 50%, transparent 100%)', animation: 'btnShimmer 3.4s ease-in-out infinite 1s' }} />
          <span className="absolute top-0 left-4 right-4 h-px pointer-events-none" aria-hidden="true"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(6,182,212,0.65), transparent)' }} />
          <span className="relative flex items-center gap-2">
            <span style={{ display: 'inline-block', width: 8, height: 8, borderRadius: '50%', background: '#10b981', boxShadow: '0 0 7px rgba(16,185,129,0.9)', flexShrink: 0 }} />
            BOOK CONSULTATION
          </span>
        </button>
      </div>

      {/* Platform badges */}
      <div className="fade-in-up-delay-4">
        <PlatformBadges />
      </div>

      {/* ── Keyframes ── */}
      <style>{`
        @keyframes fadeInTag {
          from { opacity: 0; transform: translateY(4px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0; }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes globeSpin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes globeSpinReverse {
          from { transform: rotate(0deg); }
          to   { transform: rotate(-360deg); }
        }
        @keyframes edgeGlow {
          0%   { opacity: 0.5; }
          100% { opacity: 1; }
        }
        @keyframes orbitPulse {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50%       { opacity: 0.65; transform: scale(1.02); }
        }
        @keyframes floatDot {
          0%, 100% { transform: translateY(0); opacity: 0.6; }
          50%       { transform: translateY(-4px); opacity: 1; }
        }
        @keyframes pingRing {
          0%   { transform: scale(1); opacity: 0.8; }
          100% { transform: scale(2.2); opacity: 0; }
        }
        @keyframes arrowBounce {
          0%, 100% { transform: translateX(0); }
          50%       { transform: translateX(3px); }
        }
      `}</style>
    </div>
  );
}
