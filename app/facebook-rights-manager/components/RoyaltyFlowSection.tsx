'use client';
import React, { useEffect, useRef, useState } from 'react';

const flowNodes = [
  {
    id: 'artist',
    label: 'Artist / Label',
    sublabel: 'Submits catalog',
    color: '#a78bfa',
    glow: 'rgba(167,139,250,0.35)',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2z"/>
      </svg>
    ),
  },
  {
    id: 'karhari',
    label: 'Karhari Media',
    sublabel: 'Registers & distributes',
    color: '#1877F2',
    glow: 'rgba(24,119,242,0.4)',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1877F2" strokeWidth="1.5">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
      </svg>
    ),
  },
  {
    id: 'rights',
    label: 'Rights Manager',
    sublabel: 'Fingerprints & monitors',
    color: '#38bdf8',
    glow: 'rgba(56,189,248,0.35)',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth="1.5">
        <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
        <path d="M12 17c-2.761 0-5-2.239-5-5s2.239-5 5-5 5 2.239 5 5-2.239 5-5 5z"/>
        <circle cx="12" cy="12" r="2" fill="#38bdf8"/>
      </svg>
    ),
  },
  {
    id: 'meta',
    label: 'Meta Platforms',
    sublabel: 'Detects & claims',
    color: '#60a5fa',
    glow: 'rgba(96,165,250,0.35)',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="#60a5fa">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    ),
  },
  {
    id: 'revenue',
    label: 'Ad Revenue',
    sublabel: 'Collected & reported',
    color: '#34d399',
    glow: 'rgba(52,211,153,0.35)',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="1.5">
        <line x1="12" y1="1" x2="12" y2="23"/>
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
      </svg>
    ),
  },
  {
    id: 'payout',
    label: 'Artist Payout',
    sublabel: 'Monthly royalties',
    color: '#f59e0b',
    glow: 'rgba(245,158,11,0.35)',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="1.5">
        <rect x="2" y="5" width="20" height="14" rx="2"/>
        <line x1="2" y1="10" x2="22" y2="10"/>
        <path d="M6 15h4"/>
      </svg>
    ),
  },
];

const revenueCards = [
  {
    title: 'Video Ad Revenue',
    desc: 'Ads shown on videos using your music generate CPM-based revenue. Karhari Media collects and distributes this to rights holders.',
    color: '#1877F2',
    glow: 'rgba(24,119,242,0.25)',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#1877F2" strokeWidth="1.5">
        <rect x="2" y="3" width="20" height="14" rx="2"/>
        <path d="M8 21h8M12 17v4"/>
        <polygon points="10 8 16 11 10 14 10 8" fill="#1877F2" stroke="none"/>
      </svg>
    ),
    stat: '$2.4M+',
    statLabel: 'Monthly collected',
  },
  {
    title: 'Reels & Sharing Revenue',
    desc: 'Short-form content on Instagram and Facebook generates engagement-based royalties tracked per play and impression.',
    color: '#e879f9',
    glow: 'rgba(232,121,249,0.25)',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#e879f9" strokeWidth="1.5">
        <rect x="2" y="2" width="20" height="20" rx="5"/>
        <circle cx="12" cy="12" r="3"/>
        <circle cx="17.5" cy="6.5" r="1.5" fill="#e879f9" stroke="none"/>
        <path d="M8.5 2.5v3M15.5 2.5v3M2.5 8.5h3M2.5 15.5h3"/>
      </svg>
    ),
    stat: '890K+',
    statLabel: 'Reels tracked/day',
  },
  {
    title: 'Streaming Royalties',
    desc: 'Music used in WhatsApp Status and shared media generates performance royalties collected through Meta\'s rights infrastructure.',
    color: '#34d399',
    glow: 'rgba(52,211,153,0.25)',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="1.5">
        <path d="M9 18V5l12-2v13"/>
        <circle cx="6" cy="18" r="3"/>
        <circle cx="18" cy="16" r="3"/>
        <path d="M3 9l18-3"/>
      </svg>
    ),
    stat: '1.2B+',
    statLabel: 'Streams monitored',
  },
];

function WaveBar({ color, delay }: { color: string; delay: number }) {
  return (
    <div
      style={{
        width: '3px',
        borderRadius: '2px',
        background: color,
        animationName: 'royaltyWave',
        animationDuration: '1.2s',
        animationDelay: `${delay}s`,
        animationIterationCount: 'infinite',
        animationTimingFunction: 'ease-in-out',
        animationDirection: 'alternate',
        minHeight: '4px',
      }}
    />
  );
}

export default function RoyaltyFlowSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;
    const interval = setInterval(() => {
      setActiveStep(s => (s + 1) % flowNodes.length);
      setPulse(true);
      setTimeout(() => setPulse(false), 300);
    }, 900);
    return () => clearInterval(interval);
  }, [visible]);

  const activeNode = flowNodes[activeStep];

  return (
    <section ref={sectionRef} className="py-16 sm:py-24 lg:py-32 relative overflow-hidden" style={{ background: 'linear-gradient(180deg, #0a0a1a 0%, #0d1020 50%, #0a0a1a 100%)' }}>
      <style>{`
        @keyframes royaltyWave {
          from { height: 8px; }
          to { height: 32px; }
        }
        @keyframes royaltyPulseRing {
          0% { transform: scale(1); opacity: 0.7; }
          100% { transform: scale(1.8); opacity: 0; }
        }
        @keyframes royaltyFloat {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        @keyframes royaltyGlow {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
        @keyframes royaltySlide {
          0% { transform: translateX(-100%); opacity: 0; }
          20% { opacity: 1; }
          80% { opacity: 1; }
          100% { transform: translateX(100%); opacity: 0; }
        }
        @keyframes royaltyCountUp {
          0% { opacity: 0; transform: translateY(10px); }
          100% { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* Animated background grid */}
      <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(24,119,242,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(24,119,242,0.04) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(24,119,242,0.08) 0%, transparent 70%)' }} />

      {/* Floating orbs */}
      <div className="absolute top-20 left-10 w-48 sm:w-64 h-48 sm:h-64 rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(167,139,250,0.06) 0%, transparent 70%)', animation: 'royaltyFloat 6s ease-in-out infinite' }} />
      <div className="absolute bottom-20 right-10 w-56 sm:w-80 h-56 sm:h-80 rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(52,211,153,0.06) 0%, transparent 70%)', animation: 'royaltyFloat 8s ease-in-out infinite 2s' }} />

      <div className="section-container relative z-10">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-16" style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(24px)', transition: 'all 0.6s ease-out' }}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4 sm:mb-5" style={{ background: 'rgba(24,119,242,0.12)', border: '1px solid rgba(24,119,242,0.3)' }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#1877F2', animation: 'royaltyGlow 2s ease-in-out infinite' }} />
            <span style={{ color: '#1877F2', fontSize: '12px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase' }}>Royalty Payment Flow</span>
          </div>
          <h2 className="font-black text-white mb-4 sm:mb-5" style={{ fontSize: 'clamp(28px, 5vw, 56px)', lineHeight: '1.1', letterSpacing: '-0.03em' }}>
            From stream to
            <br />
            <span style={{ background: 'linear-gradient(135deg, #1877F2, #a78bfa, #34d399)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>your bank account.</span>
          </h2>
          <p className="text-base sm:text-lg max-w-[560px] mx-auto" style={{ color: '#8892b0', lineHeight: '1.6' }}>
            A transparent, automated pipeline that turns every use of your music into real revenue — with full reporting at every step.
          </p>
        </div>

        {/* Active step indicator */}
        <div className="flex justify-center mb-6 sm:mb-8" style={{ opacity: visible ? 1 : 0, transition: 'all 0.6s ease-out 0.1s' }}>
          <div className="flex items-center gap-2 px-4 py-2 rounded-full" style={{ background: `${activeNode.glow}`, border: `1px solid ${activeNode.color}50`, transition: 'all 0.4s ease' }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: activeNode.color, boxShadow: `0 0 8px ${activeNode.color}`, animation: 'royaltyGlow 1s ease-in-out infinite' }} />
            <span style={{ color: activeNode.color, fontSize: '12px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', transition: 'color 0.4s ease' }}>
              Active: {activeNode.label}
            </span>
          </div>
        </div>

        {/* Flow nodes — desktop horizontal, mobile vertical */}
        <div className="hidden lg:flex items-center justify-center gap-0 mb-16" style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(32px)', transition: 'all 0.7s ease-out 0.2s' }}>
          {flowNodes.map((node, i) => {
            const isActive = activeStep === i;
            const isPassed = activeStep > i;
            return (
              <React.Fragment key={node.id}>
                <div className="relative flex flex-col items-center gap-3 px-4 py-4 rounded-2xl" style={{
                  background: isActive ? `linear-gradient(135deg, ${node.glow}, rgba(255,255,255,0.03))` : isPassed ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.02)',
                  border: `1px solid ${isActive ? node.color + '60' : isPassed ? node.color + '25' : 'rgba(255,255,255,0.07)'}`,
                  minWidth: '110px',
                  transform: isActive ? 'scale(1.08) translateY(-6px)' : 'scale(1)',
                  boxShadow: isActive ? `0 12px 40px ${node.color}30, 0 0 0 1px ${node.color}20` : 'none',
                  transition: 'all 0.4s cubic-bezier(0.34,1.56,0.64,1)',
                }}>
                  {isActive && (
                    <div className="absolute inset-0 rounded-2xl pointer-events-none" style={{ border: `2px solid ${node.color}`, animation: 'royaltyPulseRing 1.2s ease-out infinite', opacity: 0 }} />
                  )}
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{
                    background: isActive ? `${node.glow}` : 'rgba(255,255,255,0.04)',
                    border: `1px solid ${isActive ? node.color + '50' : 'rgba(255,255,255,0.08)'}`,
                    color: node.color,
                    boxShadow: isActive ? `0 0 20px ${node.color}40` : 'none',
                    transition: 'all 0.4s ease',
                  }}>
                    {node.icon}
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-xs" style={{ color: isActive ? '#fff' : '#ccd6f6', letterSpacing: '-0.01em', transition: 'color 0.4s ease' }}>{node.label}</div>
                    <div style={{ color: isActive ? node.color : '#4a5568', fontSize: '10px', marginTop: '2px', transition: 'color 0.4s ease' }}>{node.sublabel}</div>
                  </div>
                  <div className="absolute -top-2 -right-2 w-5 h-5 rounded-full flex items-center justify-center text-xs font-black" style={{ background: isActive ? node.color : '#1a1a2e', border: `1px solid ${isActive ? node.color : 'rgba(255,255,255,0.1)'}`, color: isActive ? '#fff' : '#555', fontSize: '9px', transition: 'all 0.4s ease' }}>
                    {i + 1}
                  </div>
                </div>
                {i < flowNodes.length - 1 && (
                  <div className="flex items-center justify-center w-8 flex-shrink-0">
                    <div style={{ position: 'relative', width: '28px', height: '2px', background: activeStep > i ? `linear-gradient(90deg, ${flowNodes[i].color}, ${flowNodes[i+1].color})` : 'rgba(255,255,255,0.08)', borderRadius: '1px', transition: 'background 0.4s ease' }}>
                      {activeStep > i && (
                        <div style={{ position: 'absolute', top: '-3px', right: '-4px', width: '8px', height: '8px', borderRadius: '50%', background: flowNodes[i+1].color, boxShadow: `0 0 8px ${flowNodes[i+1].color}` }} />
                      )}
                    </div>
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* Mobile flow — vertical */}
        <div className="lg:hidden space-y-2 mb-10" style={{ opacity: visible ? 1 : 0, transition: 'all 0.7s ease-out 0.2s' }}>
          {flowNodes.map((node, i) => {
            const isActive = activeStep === i;
            return (
              <div key={node.id}>
                <div className="flex items-center gap-3 p-3 rounded-xl" style={{
                  background: isActive ? `${node.glow}` : 'rgba(255,255,255,0.02)',
                  border: `1px solid ${isActive ? node.color + '50' : 'rgba(255,255,255,0.06)'}`,
                  transition: 'all 0.4s ease',
                  boxShadow: isActive ? `0 8px 24px ${node.color}20` : 'none',
                }}>
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(255,255,255,0.04)', color: node.color }}>
                    {node.icon}
                  </div>
                  <div className="flex-1">
                    <div className="font-bold text-sm" style={{ color: isActive ? '#fff' : '#ccd6f6' }}>{node.label}</div>
                    <div style={{ color: isActive ? node.color : '#4a5568', fontSize: '11px' }}>{node.sublabel}</div>
                  </div>
                  {isActive && <div style={{ width: 8, height: 8, borderRadius: '50%', background: node.color, boxShadow: `0 0 8px ${node.color}`, animation: 'royaltyGlow 1s ease-in-out infinite' }} />}
                </div>
                {i < flowNodes.length - 1 && (
                  <div className="flex justify-center py-1">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path d="M12 5v14M5 12l7 7 7-7" stroke={activeStep > i ? node.color : '#2d3748'} strokeWidth="1.5" strokeLinecap="round" style={{ transition: 'stroke 0.4s ease' }}/>
                    </svg>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Revenue breakdown cards — responsive grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {revenueCards.map((card, i) => (
            <div
              key={card.title}
              className="relative overflow-hidden rounded-2xl p-5 sm:p-6 group"
              style={{
                background: `linear-gradient(135deg, rgba(255,255,255,0.03) 0%, ${card.glow} 100%)`,
                border: `1px solid ${card.color}30`,
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(24px)',
                transition: `all 0.6s ease-out ${0.4 + i * 0.12}s`,
                boxShadow: `0 4px 24px ${card.glow}`,
              }}
            >
              <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background: `linear-gradient(90deg, transparent, ${card.color}, transparent)`, animation: 'royaltyGlow 2s ease-in-out infinite' }} />

              <div className="flex items-end gap-0.5 mb-4 sm:mb-5" style={{ height: '32px' }}>
                {Array.from({ length: 16 }).map((_, j) => (
                  <WaveBar key={j} color={card.color} delay={j * 0.08} />
                ))}
              </div>

              <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-3 sm:mb-4" style={{ background: `${card.glow}`, border: `1px solid ${card.color}40`, boxShadow: `0 0 20px ${card.glow}` }}>
                {card.icon}
              </div>

              <h4 className="text-white font-black text-base sm:text-lg mb-2" style={{ letterSpacing: '-0.02em' }}>{card.title}</h4>
              <p className="text-sm mb-4 sm:mb-5" style={{ color: '#8892b0', lineHeight: '1.6' }}>{card.desc}</p>

              <div className="flex items-end gap-2 pt-3 sm:pt-4" style={{ borderTop: `1px solid ${card.color}20` }}>
                <span className="font-black text-xl sm:text-2xl" style={{ color: card.color, letterSpacing: '-0.03em' }}>{card.stat}</span>
                <span className="text-xs mb-1" style={{ color: '#4a5568' }}>{card.statLabel}</span>
              </div>

              <div className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100" style={{ background: `radial-gradient(circle at 50% 0%, ${card.glow} 0%, transparent 60%)`, transition: 'opacity 0.4s ease' }} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
