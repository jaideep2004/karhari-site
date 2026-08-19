'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

/* ─── SVG Social Icons ─────────────────────────────────────────── */
function YouTubeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
    </svg>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
    </svg>
  );
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  );
}

function TwitterXIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  );
}

/* ─── Animated Company Name ────────────────────────────────────── */
function AnimatedCompanyName() {
  const fullName = 'Karhari Media Industry Private Limited';
  const [displayed, setDisplayed] = useState('');
  const [phase, setPhase] = useState<'typing' | 'hold' | 'erasing'>('typing');
  const indexRef = useRef(0);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    if (phase === 'typing') {
      if (indexRef.current < fullName.length) {
        timeout = setTimeout(() => {
          setDisplayed(fullName.slice(0, indexRef.current + 1));
          indexRef.current += 1;
        }, 55);
      } else {
        timeout = setTimeout(() => setPhase('hold'), 2800);
      }
    } else if (phase === 'hold') {
      timeout = setTimeout(() => setPhase('erasing'), 500);
    } else {
      if (indexRef.current > 0) {
        timeout = setTimeout(() => {
          indexRef.current -= 1;
          setDisplayed(fullName.slice(0, indexRef.current));
        }, 28);
      } else {
        timeout = setTimeout(() => setPhase('typing'), 600);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayed, phase]);

  return (
    <span
      className="font-black tracking-tight"
      style={{
        background: 'linear-gradient(135deg, #ffffff 0%, #00e5ff 45%, #a855f7 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        fontSize: '1.1rem',
        lineHeight: 1.2,
      }}
    >
      {displayed}
      <span
        style={{
          display: 'inline-block',
          width: '2px',
          height: '1em',
          background: '#00e5ff',
          marginLeft: '2px',
          verticalAlign: 'text-bottom',
          animation: 'cursorBlink 0.8s step-end infinite',
        }}
      />
    </span>
  );
}

/* ─── Address Card with advanced animation ─────────────────────── */
function AddressCard({
  city,
  state,
  address,
  pincode,
  accentColor,
  accentGlow,
  delay = 0,
  inView,
}: {
  city: string;
  state: string;
  address: string;
  pincode: string;
  accentColor: string;
  accentGlow: string;
  delay?: number;
  inView: boolean;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="relative rounded-xl overflow-hidden"
      style={{
        background: `linear-gradient(135deg, ${accentGlow.replace('0.45','0.07')} 0%, rgba(13,11,30,0.95) 100%)`,
        border: `1px solid ${accentGlow.replace('0.45','0.2')}`,
        padding: '1rem 1.25rem',
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0) scale(1)' : 'translateY(18px) scale(0.97)',
        transition: `opacity 0.6s cubic-bezier(0.22,1,0.36,1) ${delay}ms, transform 0.6s cubic-bezier(0.22,1,0.36,1) ${delay}ms, box-shadow 0.3s ease`,
        boxShadow: hovered
          ? `0 0 28px ${accentGlow.replace('0.45','0.25')}, 0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 ${accentGlow.replace('0.45','0.15')}`
          : `0 0 0px transparent, 0 4px 16px rgba(0,0,0,0.3)`,
        cursor: 'default',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Animated top border sweep */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px] pointer-events-none"
        style={{
          background: `linear-gradient(90deg, transparent 0%, ${accentColor} 50%, transparent 100%)`,
          opacity: hovered ? 1 : 0.4,
          transition: 'opacity 0.3s ease',
          animation: 'addressBorderSweep 3s ease-in-out infinite',
        }}
      />

      {/* Floating particle dots */}
      {hovered && (
        <>
          <div className="absolute top-2 right-4 w-1 h-1 rounded-full pointer-events-none"
            style={{ background: accentColor, animation: 'addressParticle1 2s ease-in-out infinite', opacity: 0.7 }} />
          <div className="absolute bottom-3 right-8 w-1.5 h-1.5 rounded-full pointer-events-none"
            style={{ background: accentColor, animation: 'addressParticle2 2.5s ease-in-out infinite 0.5s', opacity: 0.5 }} />
        </>
      )}

      {/* Corner accent */}
      <div className="absolute top-0 left-0 w-8 h-8 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-[1.5px]" style={{ background: `linear-gradient(90deg, ${accentColor}, transparent)` }} />
        <div className="absolute top-0 left-0 h-full w-[1.5px]" style={{ background: `linear-gradient(180deg, ${accentColor}, transparent)` }} />
      </div>
      <div className="absolute bottom-0 right-0 w-8 h-8 overflow-hidden pointer-events-none">
        <div className="absolute bottom-0 right-0 h-full w-[1.5px]" style={{ background: `linear-gradient(270deg, ${accentColor}, transparent)` }} />
        <div className="absolute bottom-0 right-0 h-full w-[1.5px]" style={{ background: `linear-gradient(0deg, ${accentColor}, transparent)` }} />
      </div>

      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-2">
          <span
            className="text-sm font-bold"
            style={{
              color: accentColor,
              textShadow: hovered ? `0 0 12px ${accentColor}` : 'none',
              transition: 'text-shadow 0.3s ease',
            }}
          >
            📍 {city}
          </span>
          <span className="text-xs font-medium" style={{ color: 'rgba(136,146,164,0.6)' }}>{state}</span>
        </div>
        <p className="text-sm font-bold text-white mb-1.5">Karhari Media Industry Private Limited</p>
        <p className="text-sm leading-relaxed" style={{ color: 'rgba(136,146,164,0.8)' }}>{address}</p>
        <p
          className="text-sm mt-1.5 font-semibold"
          style={{
            color: accentColor,
            opacity: 0.85,
            transition: 'opacity 0.3s ease',
          }}
        >
          {pincode}
        </p>
      </div>
    </div>
  );
}

/* ─── Service Link Button with rich animation ──────────────────── */
function ServiceButton({ label, href, colorConfig }: { label: string; href: string; colorConfig: { base: string; glow: string; grad: string } }) {
  const [hovered, setHovered] = useState(false);
  const c = colorConfig;

  return (
    <a
      href={href}
      className="relative overflow-hidden text-sm font-bold px-4 py-2 rounded-lg inline-flex items-center gap-1.5"
      style={{
        color: hovered ? c.base : 'rgba(200,210,230,0.9)',
        border: `1px solid ${hovered ? c.base : 'rgba(255,255,255,0.12)'}`,
        background: hovered ? c.grad : 'rgba(255,255,255,0.04)',
        boxShadow: hovered ? `0 0 18px ${c.glow}, 0 4px 12px rgba(0,0,0,0.3), inset 0 1px 0 ${c.glow.replace('0.35','0.2')}` : 'none',
        transform: hovered ? 'translateY(-2px) scale(1.04)' : 'translateY(0) scale(1)',
        transition: 'all 0.22s cubic-bezier(0.34,1.56,0.64,1)',
        cursor: 'pointer',
        letterSpacing: '0.01em',
        textDecoration: 'none',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Shimmer on hover */}
      {hovered && (
        <span
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `linear-gradient(105deg, transparent 40%, ${c.glow.replace('0.35','0.25')} 50%, transparent 60%)`,
            animation: 'btnShimmer 0.6s ease-out forwards',
          }}
        />
      )}
      {/* Dot indicator */}
      <span
        className="w-1.5 h-1.5 rounded-full flex-shrink-0"
        style={{
          background: hovered ? c.base : 'rgba(255,255,255,0.25)',
          boxShadow: hovered ? `0 0 6px ${c.base}` : 'none',
          transition: 'all 0.22s ease',
        }}
      />
      <span className="relative z-10">{label}</span>
    </a>
  );
}

/* ─── Social Icon with enhanced animation ──────────────────────── */
function SocialIcon({
  name,
  icon,
  color,
  glow,
  href,
}: {
  name: string;
  icon: React.ReactNode;
  color: string;
  glow: string;
  href: string;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={name}
      className="relative w-10 h-10 rounded-xl flex items-center justify-center overflow-hidden"
      style={{
        background: hovered ? glow.replace('0.45', '0.18') : 'rgba(255,255,255,0.05)',
        border: `1px solid ${hovered ? color : 'rgba(255,255,255,0.1)'}`,
        color: hovered ? color : 'rgba(160,170,185,0.85)',
        boxShadow: hovered ? `0 0 20px ${glow}, 0 4px 16px rgba(0,0,0,0.3)` : 'none',
        transform: hovered ? 'translateY(-3px) scale(1.15)' : 'translateY(0) scale(1)',
        transition: 'all 0.25s cubic-bezier(0.34,1.56,0.64,1)',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Ripple ring on hover */}
      {hovered && (
        <span
          className="absolute inset-0 rounded-xl pointer-events-none"
          style={{
            border: `2px solid ${color}`,
            animation: 'socialRipple 0.6s ease-out forwards',
            opacity: 0.7,
          }}
        />
      )}
      {/* Icon with spin-in on hover */}
      <span
        style={{
          display: 'flex',
          transform: hovered ? 'rotate(0deg) scale(1.1)' : 'rotate(0deg) scale(1)',
          transition: 'transform 0.3s cubic-bezier(0.34,1.56,0.64,1)',
          filter: hovered ? `drop-shadow(0 0 6px ${color})` : 'none',
        }}
      >
        {icon}
      </span>
    </a>
  );
}

/* ─── Main Footer ──────────────────────────────────────────────── */
export default function CopyrightFooter() {
  const footerRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.05 }
    );
    if (footerRef.current) observer.observe(footerRef.current);
    return () => observer.disconnect();
  }, []);

  // Each button gets its own unique, distinct color + destination
  const serviceLinks: { label: string; href: string; colorConfig: { base: string; glow: string; grad: string } }[] = [
    { label: 'Services',                          href: '/#music-cms',        colorConfig: { base: '#10b981', glow: 'rgba(16,185,129,0.35)',  grad: 'linear-gradient(135deg, rgba(16,185,129,0.15), rgba(16,185,129,0.05))' } },
    { label: 'YouTube Content ID',                href: '/youtube-content-id', colorConfig: { base: '#22c55e', glow: 'rgba(34,197,94,0.35)',   grad: 'linear-gradient(135deg, rgba(34,197,94,0.15), rgba(34,197,94,0.05))' } },
    { label: 'YouTube Policies',                  href: '/youtube-policies',  colorConfig: { base: '#f43f5e', glow: 'rgba(244,63,94,0.35)',   grad: 'linear-gradient(135deg, rgba(244,63,94,0.15), rgba(244,63,94,0.05))' } },
    { label: 'Facebook Rights Manager',           href: '/facebook-rights-manager', colorConfig: { base: '#1877F2', glow: 'rgba(24,119,242,0.35)',  grad: 'linear-gradient(135deg, rgba(24,119,242,0.15), rgba(24,119,242,0.05))' } },
    { label: 'Contact Us',                        href: '/contact',           colorConfig: { base: '#f59e0b', glow: 'rgba(245,158,11,0.35)',  grad: 'linear-gradient(135deg, rgba(245,158,11,0.15), rgba(245,158,11,0.05))' } },
    { label: 'YouTube MCN',                       href: '/youtube-content-id', colorConfig: { base: '#ef4444', glow: 'rgba(239,68,68,0.35)',   grad: 'linear-gradient(135deg, rgba(239,68,68,0.15), rgba(239,68,68,0.05))' } },
    { label: 'Music Distribution',                href: '/music-distribution', colorConfig: { base: '#a855f7', glow: 'rgba(168,85,247,0.35)',  grad: 'linear-gradient(135deg, rgba(168,85,247,0.15), rgba(168,85,247,0.05))' } },
    { label: 'YouTube Pipeline',                  href: '/youtube-mcn-pipeline', colorConfig: { base: '#00e5ff', glow: 'rgba(0,229,255,0.35)',   grad: 'linear-gradient(135deg, rgba(0,229,255,0.15), rgba(0,229,255,0.05))' } },
    { label: 'Music Distribution Pipeline',       href: '/music-distribution', colorConfig: { base: '#ec4899', glow: 'rgba(236,72,153,0.35)',  grad: 'linear-gradient(135deg, rgba(236,72,153,0.15), rgba(236,72,153,0.05))' } },
    { label: 'YouTube Network Music CMS',         href: '/#music-cms',        colorConfig: { base: '#f97316', glow: 'rgba(249,115,22,0.35)',  grad: 'linear-gradient(135deg, rgba(249,115,22,0.15), rgba(249,115,22,0.05))' } },
    { label: 'YouTube Network Entertainment CMS', href: '/#entertainment-cms', colorConfig: { base: '#8b5cf6', glow: 'rgba(139,92,246,0.35)',  grad: 'linear-gradient(135deg, rgba(139,92,246,0.15), rgba(139,92,246,0.05))' } },
    { label: 'Digital Rights Management',         href: '/#rights-protection', colorConfig: { base: '#06b6d4', glow: 'rgba(6,182,212,0.35)',   grad: 'linear-gradient(135deg, rgba(6,182,212,0.15), rgba(6,182,212,0.05))' } },
    { label: 'Royalty Collection',                href: '/#royalty',          colorConfig: { base: '#eab308', glow: 'rgba(234,179,8,0.35)',   grad: 'linear-gradient(135deg, rgba(234,179,8,0.15), rgba(234,179,8,0.05))' } },
    { label: 'Artist Onboarding',                 href: '/music-distribution', colorConfig: { base: '#84cc16', glow: 'rgba(132,204,22,0.35)',  grad: 'linear-gradient(135deg, rgba(132,204,22,0.15), rgba(132,204,22,0.05))' } },
    { label: 'Content Monetization',              href: '/#royalty',          colorConfig: { base: '#14b8a6', glow: 'rgba(20,184,166,0.35)',  grad: 'linear-gradient(135deg, rgba(20,184,166,0.15), rgba(20,184,166,0.05))' } },
    { label: 'Privacy Policy',                    href: '/privacy-policy',    colorConfig: { base: '#64748b', glow: 'rgba(100,116,139,0.35)', grad: 'linear-gradient(135deg, rgba(100,116,139,0.15), rgba(100,116,139,0.05))' } },
    { label: 'Terms of Service',                  href: '/terms-and-conditions', colorConfig: { base: '#6366f1', glow: 'rgba(99,102,241,0.35)',  grad: 'linear-gradient(135deg, rgba(99,102,241,0.15), rgba(99,102,241,0.05))' } },
    { label: 'Our Team',                          href: '/team',              colorConfig: { base: '#0ea5e9', glow: 'rgba(14,165,233,0.35)',  grad: 'linear-gradient(135deg, rgba(14,165,233,0.15), rgba(14,165,233,0.05))' } },
    { label: 'About Us',                          href: '/about',             colorConfig: { base: '#d946ef', glow: 'rgba(217,70,239,0.35)',  grad: 'linear-gradient(135deg, rgba(217,70,239,0.15), rgba(217,70,239,0.05))' } },
  ];

  const socialLinks = [
    { name: 'YouTube', icon: <YouTubeIcon className="w-5 h-5" />, color: '#FF0000', glow: 'rgba(255,0,0,0.45)', href: 'https://www.youtube.com/channel/UC1cVSpkmEXnZ4I9IKyoLPbw' },
    { name: 'Facebook', icon: <FacebookIcon className="w-5 h-5" />, color: '#1877F2', glow: 'rgba(24,119,242,0.45)', href: 'https://www.facebook.com/KarhariMedia/' },
    { name: 'Instagram', icon: <InstagramIcon className="w-5 h-5" />, color: '#E1306C', glow: 'rgba(225,48,108,0.45)', href: 'https://www.instagram.com/karharimediaMUSIC/' },
    { name: 'X (Twitter)', icon: <TwitterXIcon className="w-5 h-5" />, color: '#FFFFFF', glow: 'rgba(255,255,255,0.35)', href: 'https://x.com/karharimedia51' },
    { name: 'LinkedIn', icon: <LinkedInIcon className="w-5 h-5" />, color: '#0A66C2', glow: 'rgba(10,102,194,0.45)', href: 'https://www.linkedin.com/in/karhari-media-music/' },
  ];

  return (
    <>
      <style>{`
        @keyframes cursorBlink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        @keyframes footerRingRotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes footerGlow {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
        @keyframes ping {
          75%, 100% { transform: scale(2); opacity: 0; }
        }
        @keyframes shimmerSlide {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(400%); }
        }
        @keyframes nameGlow {
          0%, 100% { filter: drop-shadow(0 0 4px rgba(0,229,255,0.4)); }
          50% { filter: drop-shadow(0 0 10px rgba(168,85,247,0.7)); }
        }
        @keyframes addressBorderSweep {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes addressParticle1 {
          0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0.7; }
          50% { transform: translateY(-8px) translateX(4px); opacity: 0.3; }
        }
        @keyframes addressParticle2 {
          0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0.5; }
          50% { transform: translateY(-6px) translateX(-3px); opacity: 0.2; }
        }
        @keyframes btnShimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
        @keyframes socialRipple {
          0% { transform: scale(1); opacity: 0.7; }
          100% { transform: scale(1.6); opacity: 0; }
        }
        @keyframes socialPulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(255,255,255,0.1); }
          50% { box-shadow: 0 0 0 4px rgba(255,255,255,0.05); }
        }
      `}</style>

      <footer
        ref={footerRef}
        className="km-rocket-footer relative w-full"
        style={{
          background: 'linear-gradient(180deg, #0d0b1e 0%, #080616 100%)',
          borderTop: '1px solid rgba(0,229,255,0.1)',
          padding: '20px 12px 16px',
        }}
      >
        {/* Top glow line */}
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{
            background: 'linear-gradient(90deg, transparent 0%, rgba(0,229,255,0.6) 30%, rgba(168,85,247,0.8) 50%, rgba(0,229,255,0.6) 70%, transparent 100%)',
            animation: 'footerGlow 3s ease-in-out infinite',
          }}
        />

        <div className="relative z-10 w-full">
          {/* ── Single Full-Width Card ── */}
          <div
            className="relative rounded-2xl overflow-hidden w-full"
            style={{
              background: 'linear-gradient(135deg, rgba(19,16,42,0.97) 0%, rgba(13,11,30,0.99) 100%)',
              border: '1px solid rgba(0,229,255,0.2)',
              boxShadow: '0 0 40px rgba(0,229,255,0.06), 0 0 80px rgba(168,85,247,0.04), inset 0 1px 0 rgba(255,255,255,0.04)',
              opacity: inView ? 1 : 0,
              transform: inView ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 0.7s cubic-bezier(0.22,1,0.36,1), transform 0.7s cubic-bezier(0.22,1,0.36,1)',
            }}
          >
            {/* Shimmer sweep */}
            <div className="absolute inset-0 pointer-events-none" style={{ overflow: 'hidden' }}>
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '25%',
                  height: '100%',
                  background: 'linear-gradient(90deg, transparent, rgba(0,229,255,0.04), transparent)',
                  animation: 'shimmerSlide 6s ease-in-out infinite 1s',
                }}
              />
            </div>

            {/* Corner accents */}
            <div className="absolute top-0 left-0 w-10 h-10 overflow-hidden pointer-events-none">
              <div className="absolute top-0 left-0 w-full h-[2px]" style={{ background: 'linear-gradient(90deg, #00e5ff, transparent)' }} />
              <div className="absolute top-0 left-0 h-full w-[2px]" style={{ background: 'linear-gradient(180deg, #00e5ff, transparent)' }} />
            </div>
            <div className="absolute top-0 right-0 w-10 h-10 overflow-hidden pointer-events-none">
              <div className="absolute top-0 right-0 w-full h-[2px]" style={{ background: 'linear-gradient(270deg, #a855f7, transparent)' }} />
              <div className="absolute top-0 right-0 h-full w-[2px]" style={{ background: 'linear-gradient(180deg, #a855f7, transparent)' }} />
            </div>
            <div className="absolute bottom-0 left-0 w-10 h-10 overflow-hidden pointer-events-none">
              <div className="absolute bottom-0 left-0 w-full h-[2px]" style={{ background: 'linear-gradient(90deg, #a855f7, transparent)' }} />
              <div className="absolute bottom-0 left-0 h-full w-[2px]" style={{ background: 'linear-gradient(0deg, #a855f7, transparent)' }} />
            </div>
            <div className="absolute bottom-0 right-0 w-10 h-10 overflow-hidden pointer-events-none">
              <div className="absolute bottom-0 right-0 w-full h-[2px]" style={{ background: 'linear-gradient(270deg, #00e5ff, transparent)' }} />
              <div className="absolute bottom-0 right-0 h-full w-[2px]" style={{ background: 'linear-gradient(0deg, #00e5ff, transparent)' }} />
            </div>

            <div className="relative z-10 p-5 md:p-7">

              {/* ── Row 1: Brand + Name ── */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-5">
                {/* Brand */}
                <div className="flex items-center gap-3 flex-shrink-0">
                  {/* Company logo image with rotating ring */}
                  <div className="relative w-14 h-14 flex-shrink-0">
                    <div
                      className="absolute inset-0 rounded-full border-2 border-transparent"
                      style={{
                        background: 'linear-gradient(#13102a, #13102a) padding-box, linear-gradient(135deg, #00e5ff, #a855f7, #00e5ff) border-box',
                        animation: 'footerRingRotate 6s linear infinite',
                      }}
                    />
                    <div className="absolute inset-1 rounded-full overflow-hidden flex items-center justify-center"
                      style={{ background: 'rgba(13,11,30,0.8)' }}
                    >
                      <Image
                        src="/assets/images/1608452013412__1_-1786701462621.png"
                        alt="Karhari Media Industry Private Limited company logo"
                        width={44}
                        height={44}
                        className="object-contain rounded-full"
                        style={{ width: '100%', height: '100%' }}
                      />
                    </div>
                    {/* Ping dot */}
                    <span className="absolute top-0 right-0 w-2.5 h-2.5">
                      <span className="absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" style={{ animation: 'ping 2s cubic-bezier(0,0,0.2,1) infinite' }} />
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-400" />
                    </span>
                  </div>

                  {/* Animated company name */}
                  <div style={{ animation: 'nameGlow 3s ease-in-out infinite' }}>
                    <AnimatedCompanyName />
                    <p className="text-xs mt-0.5 font-medium tracking-widest uppercase" style={{ color: 'rgba(0,229,255,0.55)' }}>
                      Global Music Distribution &amp; Digital Rights
                    </p>
                  </div>
                </div>

                {/* Contact info */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                  <a
                    href="mailto:support@karharimedia.com"
                    className="flex items-center gap-2.5 group px-4 py-2.5 rounded-xl transition-all duration-200"
                    style={{
                      background: 'rgba(0,229,255,0.06)',
                      border: '1px solid rgba(0,229,255,0.18)',
                    }}
                    onMouseEnter={e => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.background = 'rgba(0,229,255,0.12)';
                      el.style.borderColor = 'rgba(0,229,255,0.4)';
                      el.style.boxShadow = '0 0 16px rgba(0,229,255,0.2)';
                    }}
                    onMouseLeave={e => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.background = 'rgba(0,229,255,0.06)';
                      el.style.borderColor = 'rgba(0,229,255,0.18)';
                      el.style.boxShadow = 'none';
                    }}
                  >
                    <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="#00e5ff" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'rgba(0,229,255,0.7)' }}>Email</p>
                      <p className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">support@karharimedia.com</p>
                    </div>
                  </a>

                  <a
                    href="tel:+919832703698"
                    className="flex items-center gap-2.5 group px-4 py-2.5 rounded-xl transition-all duration-200"
                    style={{
                      background: 'rgba(168,85,247,0.06)',
                      border: '1px solid rgba(168,85,247,0.18)',
                    }}
                    onMouseEnter={e => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.background = 'rgba(168,85,247,0.12)';
                      el.style.borderColor = 'rgba(168,85,247,0.4)';
                      el.style.boxShadow = '0 0 16px rgba(168,85,247,0.2)';
                    }}
                    onMouseLeave={e => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.background = 'rgba(168,85,247,0.06)';
                      el.style.borderColor = 'rgba(168,85,247,0.18)';
                      el.style.boxShadow = 'none';
                    }}
                  >
                    <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="#a855f7" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'rgba(168,85,247,0.7)' }}>Phone</p>
                      <p className="text-sm font-bold text-white group-hover:text-purple-300 transition-colors">+91 9832703698</p>
                    </div>
                  </a>
                </div>
              </div>

              {/* ── Thin divider ── */}
              <div className="w-full h-px mb-5" style={{ background: 'linear-gradient(90deg, transparent, rgba(0,229,255,0.15) 30%, rgba(168,85,247,0.2) 50%, rgba(0,229,255,0.15) 70%, transparent)' }} />

              {/* ── Row 2: Addresses with advanced animations ── */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
                <AddressCard
                  city="Kolkata"
                  state="West Bengal, India"
                  address="Shop No. 3, Market Area, Patharghata Behind Shapoorji Complex New Town, Action Area 3, Rajarhat"
                  pincode="Kolkata – 700135"
                  accentColor="#00e5ff"
                  accentGlow="rgba(0,229,255,0.45)"
                  delay={100}
                  inView={inView}
                />
                <AddressCard
                  city="Mumbai"
                  state="Maharashtra, India"
                  address="WeWork NESCO IT Park, 10th Floor, Building 4, Western Express Highway, Goregaon (East)"
                  pincode="Mumbai – 400063"
                  accentColor="#a855f7"
                  accentGlow="rgba(168,85,247,0.45)"
                  delay={220}
                  inView={inView}
                />
              </div>

              {/* ── Thin divider ── */}
              <div className="w-full h-px mb-4" style={{ background: 'linear-gradient(90deg, transparent, rgba(0,229,255,0.12) 30%, rgba(168,85,247,0.15) 50%, rgba(0,229,255,0.12) 70%, transparent)' }} />

              {/* ── Row 3: Service Links with rich animations ── */}
              <div className="flex flex-wrap gap-2 mb-5">
                {serviceLinks.map(({ label, href, colorConfig }) => (
                  <ServiceButton key={label} label={label} href={href} colorConfig={colorConfig} />
                ))}
              </div>

              {/* ── Thin divider ── */}
              <div className="w-full h-px mb-4" style={{ background: 'linear-gradient(90deg, transparent, rgba(0,229,255,0.1) 50%, transparent)' }} />

              {/* ── Row 4: Copyright bar with social icons centered ── */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                {/* Left: copyright text */}
                <p className="text-sm font-medium" style={{ color: 'rgba(136,146,164,0.6)' }}>
                  © 2027 Karhari Media Industry Private Limited. All rights reserved.
                </p>

                {/* Center: Social icons — enhanced */}
                <div className="flex items-center gap-3">
                  {socialLinks.map((social) => (
                    <SocialIcon
                      key={social.name}
                      name={social.name}
                      icon={social.icon}
                      color={social.color}
                      glow={social.glow}
                      href={social.href}
                    />
                  ))}
                </div>

                {/* Right: Registered info — bolder CIN */}
                <div className="flex items-center gap-1.5">
                  <div
                    className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                    style={{ background: '#00e5ff', boxShadow: '0 0 6px #00e5ff', animation: 'footerGlow 2s ease-in-out infinite' }}
                  />
                  <p className="text-xs" style={{ color: 'rgba(136,146,164,0.6)' }}>
                    Registered in India ·{' '}
                    <span className="font-black tracking-wide" style={{ color: 'rgba(200,215,235,0.85)', letterSpacing: '0.03em' }}>
                      CIN: U59200BR2022OPC058395
                    </span>
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
