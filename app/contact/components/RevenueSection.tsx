'use client';

import React, { useEffect, useRef, useState } from 'react';
import { CheckCircleIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';

// ── Revenue rows with icons ───────────────────────────────────────────────────
function ArtistIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="flex-shrink-0">
      <rect x="9" y="2" width="6" height="11" rx="3" fill="currentColor" opacity="0.9"/>
      <path d="M5 10a7 7 0 0 0 14 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <line x1="12" y1="17" x2="12" y2="21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <line x1="8" y1="21" x2="16" y2="21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}

function RecordLabelIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="flex-shrink-0">
      <path d="M3 21h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <path d="M5 21V7l7-4 7 4v14" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
      <rect x="9" y="13" width="2.5" height="4" rx="0.5" fill="currentColor"/>
      <rect x="12.5" y="13" width="2.5" height="4" rx="0.5" fill="currentColor"/>
      <rect x="9" y="8" width="2.5" height="3" rx="0.5" fill="currentColor"/>
      <rect x="12.5" y="8" width="2.5" height="3" rx="0.5" fill="currentColor"/>
    </svg>
  );
}

function YouTubeIconSmall() {
  return (
    <svg width="22" height="16" viewBox="0 0 90 63" fill="none" className="flex-shrink-0">
      <rect width="90" height="63" rx="14" fill="#FF0000" />
      <polygon points="36,18 36,45 62,31.5" fill="white" />
    </svg>
  );
}

function KharhariLogoSmall() {
  return (
    <div className="w-5 h-5 rounded overflow-hidden flex-shrink-0 border border-primary/30">
      <Image
        src="/assets/images/1608452013412__1_-1786328033368.png"
        alt="Karhari Media"
        width={20}
        height={20}
        className="w-full h-full object-contain"
      />
    </div>
  );
}

function MonetizationIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="flex-shrink-0">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M12 6v12M9 8.5h4.5a1.5 1.5 0 0 1 0 3H10.5a1.5 1.5 0 0 0 0 3H15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

function GlobeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="flex-shrink-0">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5"/>
      <ellipse cx="12" cy="12" rx="4" ry="10" stroke="currentColor" strokeWidth="1" opacity="0.6"/>
      <line x1="2" y1="12" x2="22" y2="12" stroke="currentColor" strokeWidth="1" opacity="0.6"/>
    </svg>
  );
}

const revenueRows = [
  { label: 'Artist', pct: 80, color: '#CCFF00', bar: 'bg-primary', icon: <ArtistIcon /> },
  { label: 'Record Label', pct: 80, color: '#CCFF00', bar: 'bg-primary', icon: <RecordLabelIcon /> },
  { label: 'YouTube Multi-Channel Network', pct: 80, color: '#FF0000', bar: 'bg-red-500', icon: <YouTubeIconSmall /> },
  { label: 'Karhari Media', pct: 20, color: '#888', bar: 'bg-muted-foreground', icon: <KharhariLogoSmall /> },
];

const paymentFeatures = [
  { icon: <YouTubeIconSmall />, label: 'YouTube Multi-Channel Network', sub: '800+ channels monetized', color: '#FF0000' },
  { icon: <MonetizationIcon />, label: 'Content Monetization', sub: 'Every stream counts', color: '#CCFF00' },
  { icon: <GlobeIcon />, label: 'Global Music Distribution', sub: '35+ platforms worldwide', color: '#60A5FA' },
  { icon: '💸', label: '80% Revenue Sharing', sub: 'Industry-leading split', color: '#FFC107' },
  { icon: '🏦', label: 'Direct Bank Transfer', sub: 'Monthly payouts', color: '#4CAF50' },
];

const testimonials = [
  {
    quote: "Karhari Media changed everything for my music career. The 80% revenue share is real — I received my first payout within 30 days.",
    name: "Arjun Sharma",
    role: "Independent Artist, Delhi",
    initials: "AS",
    stars: 5,
  },
  {
    quote: "Managing 200+ tracks was a nightmare before Karhari. Their CMS team handled everything — channels, Content ID, the works.",
    name: "Priya Nair",
    role: "Label Manager, Mumbai",
    initials: "PN",
    stars: 5,
  },
  {
    quote: "The YouTube MCN partnership through Karhari Media doubled our channel revenue in just 3 months. Highly recommended.",
    name: "Rahul Verma",
    role: "YouTube Creator, Pune",
    initials: "RV",
    stars: 5,
  },
  {
    quote: "Transparent reporting, fast payouts, and real support. Karhari Media is the best music partner in India.",
    name: "Sneha Kapoor",
    role: "Record Label Owner, Bangalore",
    initials: "SK",
    stars: 5,
  },
  {
    quote: "My songs are now on Spotify, Apple Music, and 30+ platforms. Karhari Media made it happen in just one week.",
    name: "Vikram Tiwari",
    role: "Singer-Songwriter, Lucknow",
    initials: "VT",
    stars: 5,
  },
  {
    quote: "Content ID protection saved my catalog from being stolen. Karhari\'s rights management is world-class.",
    name: "Meera Joshi",
    role: "Music Producer, Chennai",
    initials: "MJ",
    stars: 5,
  },
  {
    quote: "Our kids\' YouTube channel grew from 10K to 500K subscribers after joining Karhari Media\'s MCN. Incredible support!",
    name: "Deepak Patel",
    role: "Kids Content Creator, Ahmedabad",
    initials: "DP",
    stars: 5,
  },
  {
    quote: "The entertainment CMS management is flawless. Our web series channel now earns 3x more than before.",
    name: "Ananya Singh",
    role: "Entertainment Channel Owner, Hyderabad",
    initials: "AS",
    stars: 5,
  },
  {
    quote: "Karhari Media's global distribution got my music into markets I never imagined — Middle East, Europe, Southeast Asia.",
    name: "Ravi Kumar",
    role: "Bhojpuri Artist, Patna",
    initials: "RK",
    stars: 5,
  },
  {
    quote: "The 80/20 split is honest and transparent. Monthly bank transfers arrive on time, every time. Trust them completely.",
    name: "Fatima Sheikh",
    role: "Sufi Music Artist, Jaipur",
    initials: "FS",
    stars: 5,
  },
  {
    quote: "Joining Karhari Media\'s YouTube MCN was the best business decision I made. Revenue tripled in 6 months.",
    name: "Suresh Reddy",
    role: "Gaming YouTuber, Vizag",
    initials: "SR",
    stars: 5,
  },
  {
    quote: "Professional team, zero hidden fees, and genuine care for artists. Karhari Media is a true partner, not just a distributor.",
    name: "Kavya Menon",
    role: "Classical Musician, Kochi",
    initials: "KM",
    stars: 5,
  },
];

// ── Flowing dollar bills animation ───────────────────────────────────────────
function FlowingRevenue() {
  const [items, setItems] = useState<{ id: number; x: number; delay: number; symbol: string }[]>([]);

  useEffect(() => {
    setItems(
      Array.from({ length: 10 }, (_, i) => ({
        id: i,
        x: 5 + i * 9,
        delay: i * 0.35,
        symbol: i % 3 === 0 ? '💵' : i % 3 === 1 ? '$' : '💰',
      }))
    );
  }, []);

  return (
    <div className="relative h-12 overflow-hidden rounded-xl bg-primary/5 border border-primary/10 mt-4">
      {items.map((item) => (
        <span
          key={item.id}
          className="absolute text-sm font-bold text-primary"
          style={{
            left: `${item.x}%`,
            animation: `rev-float 2.5s ease-in-out ${item.delay}s infinite`,
          }}
        >
          {item.symbol}
        </span>
      ))}
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-xs font-semibold text-primary/60 uppercase tracking-widest">Revenue Flowing</span>
      </div>
    </div>
  );
}

// ── Rotating testimonials — 10+ comments, cycling every 1 second ─────────────
function RotatingTestimonials() {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimating(true);
      setTimeout(() => {
        setCurrent((c) => (c + 1) % testimonials.length);
        setAnimating(false);
      }, 300);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const t = testimonials[current];

  return (
    <div className="flex flex-col gap-4 sm:gap-5">
      {/* Rotating testimonial card */}
      <div
        className="bento-card neon-card p-6 sm:p-8"
        style={{
          opacity: animating ? 0 : 1,
          transform: animating ? 'translateY(6px) scale(0.98)' : 'translateY(0) scale(1)',
          transition: 'opacity 0.3s ease, transform 0.3s ease',
        }}
      >
        {/* Animated stars */}
        <div className="flex gap-1 mb-4">
          {Array.from({ length: 5 }).map((_, si) => (
            <svg
              key={si}
              className="w-4 h-4 text-primary"
              fill="currentColor"
              viewBox="0 0 20 20"
              style={{ animation: `star-pulse 1.5s ease-in-out ${si * 0.15}s infinite` }}
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
          {/* Testimonial counter dots */}
          <div className="ml-auto flex gap-1 items-center flex-wrap max-w-[120px]">
            {testimonials.map((_, i) => (
              <div
                key={i}
                className="rounded-full transition-all duration-300"
                style={{
                  width: i === current ? 12 : 5,
                  height: 5,
                  background: i === current ? '#CCFF00' : 'rgba(255,255,255,0.2)',
                }}
              />
            ))}
          </div>
        </div>
        <p className="text-sm sm:text-base text-foreground/80 italic leading-relaxed mb-5 font-medium">
          &ldquo;{t.quote}&rdquo;
        </p>
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-primary/15 border border-primary/20 flex items-center justify-center text-xs font-bold text-primary">
            {t.initials}
          </div>
          <div>
            <p className="text-sm font-bold text-foreground">{t.name}</p>
            <p className="text-xs text-muted-foreground font-medium">{t.role}</p>
          </div>
          {/* Karhari badge */}
          <div className="ml-auto flex items-center gap-1 px-2 py-1 rounded-full bg-primary/10 border border-primary/20">
            <div className="w-3.5 h-3.5 rounded overflow-hidden">
              <Image src="/assets/images/1608452013412__1_-1786328033368.png" alt="Karhari Media" width={14} height={14} className="w-full h-full object-contain" />
            </div>
            <span className="text-xs text-primary font-semibold">Verified</span>
          </div>
        </div>
      </div>

      {/* CTA card with animations */}
      <div
        className="glass-card-lime neon-card rounded-2xl p-6 sm:p-8 border border-primary/20 relative overflow-hidden"
        style={{ animation: 'cta-glow 3s ease-in-out infinite' }}
      >
        {/* Animated background orb */}
        <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-primary/10 pointer-events-none" style={{ animation: 'orb-float 4s ease-in-out infinite' }} />

        {/* Karhari Media Est. 2014 badge */}
        <div
          className="flex items-center gap-2 mb-4 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/30 w-fit"
          style={{ animation: 'badge-shine 2s ease-in-out infinite' }}
        >
          <div className="w-5 h-5 rounded overflow-hidden">
            <Image src="/assets/images/1608452013412__1_-1786328033368.png" alt="Karhari Media" width={20} height={20} className="w-full h-full object-contain" />
          </div>
          <span className="text-xs font-bold text-primary">Karhari Media · Est. 2014</span>
        </div>

        {/* Partner logos row */}
        <div className="flex items-center gap-3 mb-4 flex-wrap">
          {/* YouTube */}
          <div
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-red-500/10 border border-red-500/30"
            style={{ animation: 'partner-pop 2s ease-in-out infinite', animationDelay: '0s' }}
          >
            <svg width="20" height="14" viewBox="0 0 90 63" fill="none">
              <rect width="90" height="63" rx="14" fill="#FF0000" />
              <polygon points="36,18 36,45 62,31.5" fill="white" />
            </svg>
            <span className="text-xs font-semibold text-red-400">YouTube</span>
          </div>
          {/* Apple Music */}
          <div
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-pink-500/10 border border-pink-500/30"
            style={{ animation: 'partner-pop 2s ease-in-out infinite', animationDelay: '0.3s' }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2z" fill="#FC3C44"/>
              <path d="M16 8.5l-5 1.5V15a2 2 0 1 1-1-1.732V10.5l4-1.2V14a2 2 0 1 1-1-1.732V9.5l3-1z" fill="white"/>
            </svg>
            <span className="text-xs font-semibold text-pink-400">Apple Music</span>
          </div>
          {/* Spotify */}
          <div
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-green-500/10 border border-green-500/30"
            style={{ animation: 'partner-pop 2s ease-in-out infinite', animationDelay: '0.6s' }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="#1DB954">
              <circle cx="12" cy="12" r="10"/>
              <path d="M8 15.5c2.5-1 5.5-1 8 0M7 12.5c3-1.2 7-1.2 10 0M8 9.5c2.5-.8 5.5-.8 8 0" stroke="white" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
            </svg>
            <span className="text-xs font-semibold text-green-400">Spotify</span>
          </div>
          {/* Amazon Music */}
          <div
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-blue-500/10 border border-blue-500/30"
            style={{ animation: 'partner-pop 2s ease-in-out infinite', animationDelay: '0.9s' }}
          >
            <span className="text-xs font-bold text-blue-400">Amazon</span>
          </div>
        </div>

        <p className="text-sm sm:text-base font-semibold text-foreground mb-4 leading-relaxed">
          Ready to start earning 80% of your music revenue? Join 800+ channels already on Karhari Media.
        </p>
        <a
          href="#contact"
          className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-bold text-sm px-5 py-3 rounded-full hover:bg-primary/90 transition-all duration-200 group"
          style={{ animation: 'cta-pulse 2s ease-in-out infinite' }}
        >
          Start Your Application
          <svg className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </a>
      </div>
    </div>
  );
}

export default function RevenueSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [barsVisible, setBarsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.section-enter').forEach((el, i) => {
              setTimeout(() => el.classList.add('visible'), i * 100);
            });
            setBarsVisible(true);
          }
        });
      },
      { threshold: 0.2 }
    );
    if (sectionRef?.current) observer?.observe(sectionRef?.current);
    return () => observer?.disconnect();
  }, []);

  return (
    <>
      <style>{`
        @keyframes rev-float {
          0% { transform: translateY(48px); opacity: 0; }
          20% { opacity: 1; }
          80% { opacity: 1; }
          100% { transform: translateY(-4px); opacity: 0; }
        }
        @keyframes star-pulse {
          0%, 100% { transform: scale(1); filter: brightness(1); }
          50% { transform: scale(1.2); filter: brightness(1.4); }
        }
        @keyframes cta-glow {
          0%, 100% { box-shadow: 0 0 10px rgba(204,255,0,0.2); }
          50% { box-shadow: 0 0 25px rgba(204,255,0,0.5), 0 0 50px rgba(204,255,0,0.2); }
        }
        @keyframes cta-pulse {
          0%, 100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(204,255,0,0.4); }
          50% { transform: scale(1.02); box-shadow: 0 0 0 6px rgba(204,255,0,0); }
        }
        @keyframes partner-pop {
          0%, 100% { transform: scale(1) translateY(0); }
          50% { transform: scale(1.05) translateY(-2px); }
        }
        @keyframes badge-shine {
          0% { box-shadow: 0 0 4px rgba(204,255,0,0.3); }
          50% { box-shadow: 0 0 12px rgba(204,255,0,0.7), 0 0 20px rgba(204,255,0,0.3); }
          100% { box-shadow: 0 0 4px rgba(204,255,0,0.3); }
        }
        @keyframes orb-float {
          0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.5; }
          50% { transform: translate(-8px, -8px) scale(1.1); opacity: 0.8; }
        }
        @keyframes pct-glow {
          0%, 100% { filter: brightness(1); }
          50% { filter: brightness(1.5) drop-shadow(0 0 6px currentColor); }
        }
      `}</style>

      <section id="revenue" ref={sectionRef} className="py-8 sm:py-12 lg:py-16 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 blob-bg opacity-30 pointer-events-none" />
        <div className="absolute top-1/3 right-0 w-80 h-80 orb-blue opacity-35 pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-72 h-72 orb-pink opacity-25 pointer-events-none" />
        <div className="absolute top-1/2 left-0 w-64 h-64 orb-teal opacity-30 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Header */}
          <div className="text-center mb-6 sm:mb-10 lg:mb-12 section-enter">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-3 block">
              Revenue Model
            </span>
            <h2 className="text-section-title font-extrabold text-foreground mb-4">
              You Keep What You Earn
            </h2>
            <p className="text-muted-foreground font-medium max-w-xl mx-auto text-sm sm:text-base">
              We believe artists deserve the majority of their work. Our transparent 80/20 model means you always know what you&apos;re getting.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-start">
            {/* Left: Revenue split visual */}
            <div className="section-enter stagger-2">
              <div className="bento-card neon-card p-5 sm:p-7 lg:p-10" style={{ animationDelay: '0.3s' }}>
                {/* Revenue bars */}
                <div className="space-y-4 sm:space-y-5 mb-6 sm:mb-8">
                  {revenueRows.map((row, i) => (
                    <div key={row.label}>
                      <div className="flex items-center justify-between mb-1.5 sm:mb-2">
                        <div className="flex items-center gap-2 min-w-0" style={{ color: row.color }}>
                          {row.icon}
                          <span className="text-xs sm:text-sm font-semibold text-foreground truncate">{row.label}</span>
                        </div>
                        <span
                          className="text-lg sm:text-xl lg:text-2xl font-extrabold flex-shrink-0 ml-2"
                          style={{
                            color: row.color,
                            animation: `pct-glow 2s ease-in-out ${i * 0.4}s infinite`,
                          }}
                        >
                          {row.pct}%
                        </span>
                      </div>
                      <div className="revenue-bar">
                        <div
                          className={`revenue-bar-fill ${row.bar}`}
                          style={{
                            width: barsVisible ? `${row.pct}%` : '0%',
                            transition: `width 1.5s cubic-bezier(0.22,1,0.36,1) ${i * 0.2}s`,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Flowing revenue animation */}
                <FlowingRevenue />

                {/* Payment features */}
                <div className="mt-4 sm:mt-6 space-y-2 sm:space-y-2.5">
                  {paymentFeatures.map((feat, i) => (
                    <div key={feat.label} className="flex items-center gap-2 sm:gap-3">
                      <span
                        className="flex-shrink-0"
                        style={{ color: feat.color, animation: `partner-pop 2s ease-in-out ${i * 0.2}s infinite` }}
                      >
                        {typeof feat.icon === 'string' ? (
                          <span className="text-base sm:text-lg">{feat.icon}</span>
                        ) : (
                          feat.icon
                        )}
                      </span>
                      <div className="flex-1 min-w-0">
                        <span className="text-xs sm:text-sm font-semibold text-foreground">{feat.label}</span>
                        <span className="text-xs text-muted-foreground ml-1 sm:ml-2 hidden sm:inline">{feat.sub}</span>
                      </div>
                      <CheckCircleIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary flex-shrink-0" />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Rotating testimonials */}
            <RotatingTestimonials />
          </div>
        </div>
      </section>
    </>
  );
}