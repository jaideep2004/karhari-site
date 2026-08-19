'use client';
import React, { useEffect, useRef, useState } from 'react';

const FB_POLICY_URLS = {
  rightsOwnership: 'https://www.facebook.com/legal/music_guidelines',
  contentMonitoring: 'https://www.facebook.com/help/rightsmanager',
  revenuePolicy: 'https://www.facebook.com/creators/tools/rights-manager',
  disputeResolution: 'https://www.facebook.com/help/contact/1409697672616547',
  globalCoverage: 'https://www.facebook.com/legal/terms',
  dataPrivacy: 'https://www.facebook.com/privacy/policy/',
  musicDistribution: 'https://www.facebook.com/legal/music_guidelines',
  royaltyPayment: 'https://www.facebook.com/creators/tools/rights-manager',
};

const policyItems = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        <path d="M9 12l2 2 4-4"/>
      </svg>
    ),
    title: 'Rights Ownership',
    content: 'Artists and record labels retain full ownership of their music. Karhari Media acts as an authorized distributor and rights administrator on your behalf. You can withdraw your catalog at any time.',
    color: '#1877F2',
    glow: 'rgba(24,119,242,0.2)',
    url: FB_POLICY_URLS.rightsOwnership,
    urlLabel: 'Facebook Music Guidelines',
    badge: 'VERIFIED',
    stat: '100%',
    statLabel: 'Rights Retained',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="11" cy="11" r="8"/>
        <path d="M21 21l-4.35-4.35"/>
        <path d="M11 8v3l2 2"/>
      </svg>
    ),
    title: 'Content Monitoring',
    content: 'Facebook Rights Manager continuously scans all content uploaded to Facebook, Instagram, and WhatsApp. When your music is detected, it is automatically claimed and monetized according to your rights policy.',
    color: '#38bdf8',
    glow: 'rgba(56,189,248,0.2)',
    url: FB_POLICY_URLS.contentMonitoring,
    urlLabel: 'Rights Manager Help',
    badge: '24/7 ACTIVE',
    stat: '99.8%',
    statLabel: 'Detection Rate',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <line x1="12" y1="1" x2="12" y2="23"/>
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
      </svg>
    ),
    title: 'Revenue Policy',
    content: 'Ad revenue generated from content using your music is collected by Meta and reported to Karhari Media. We deduct our distribution fee and pay the remainder directly to rights holders on a monthly basis.',
    color: '#34d399',
    glow: 'rgba(52,211,153,0.2)',
    url: FB_POLICY_URLS.revenuePolicy,
    urlLabel: 'Creator Revenue Tools',
    badge: 'MONTHLY PAYOUT',
    stat: '$2.4M+',
    statLabel: 'Paid Monthly',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
        <polyline points="14 2 14 8 20 8"/>
        <path d="M9 13h6M9 17h4"/>
      </svg>
    ),
    title: 'Dispute Resolution',
    content: 'If a content creator disputes a rights claim, Karhari Media reviews the claim within 48 hours. We provide documentation of rights ownership and work with Meta to resolve disputes fairly and transparently.',
    color: '#f59e0b',
    glow: 'rgba(245,158,11,0.2)',
    url: FB_POLICY_URLS.disputeResolution,
    urlLabel: 'Submit a Dispute',
    badge: '48H RESOLUTION',
    stat: '48h',
    statLabel: 'Avg. Resolution',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="10"/>
        <line x1="2" y1="12" x2="22" y2="12"/>
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
      </svg>
    ),
    title: 'Global Coverage',
    content: 'Rights protection and revenue collection is active in 150+ countries. Revenue is collected in local currencies and converted to USD or your preferred currency for payout, with full exchange rate transparency.',
    color: '#a78bfa',
    glow: 'rgba(167,139,250,0.2)',
    url: FB_POLICY_URLS.globalCoverage,
    urlLabel: 'Facebook Terms of Service',
    badge: '150+ COUNTRIES',
    stat: '150+',
    statLabel: 'Countries Active',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
        <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
        <circle cx="12" cy="16" r="1" fill="currentColor"/>
      </svg>
    ),
    title: 'Data Privacy',
    content: 'All artist and label data is stored securely and never shared with third parties. Karhari Media complies with GDPR, CCPA, and all applicable data protection regulations across all operating territories.',
    color: '#fb7185',
    glow: 'rgba(251,113,133,0.2)',
    url: FB_POLICY_URLS.dataPrivacy,
    urlLabel: 'Facebook Privacy Policy',
    badge: 'GDPR COMPLIANT',
    stat: 'GDPR',
    statLabel: 'Fully Compliant',
  },
];

function ScanLine() {
  return (
    <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '2px',
        background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)',
        animationName: 'policyScan',
        animationDuration: '3s',
        animationIterationCount: 'infinite',
        animationTimingFunction: 'linear',
      }} />
    </div>
  );
}

function PolicyCard({ item, index }: { item: typeof policyItems[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="relative overflow-hidden rounded-2xl p-6 group cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered
          ? `linear-gradient(135deg, rgba(255,255,255,0.05) 0%, ${item.glow} 100%)`
          : `linear-gradient(135deg, rgba(255,255,255,0.02) 0%, rgba(255,255,255,0.01) 100%)`,
        border: `1px solid ${hovered ? item.color + '50' : item.color + '20'}`,
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0) scale(1)' : 'translateY(24px) scale(0.97)',
        transition: `opacity 0.6s ease-out ${index * 0.08}s, transform 0.6s ease-out ${index * 0.08}s, background 0.3s ease, border-color 0.3s ease`,
        boxShadow: hovered ? `0 8px 40px ${item.glow}, 0 0 0 1px ${item.color}20` : 'none',
      }}
    >
      <ScanLine />

      {/* Top colored bar */}
      <div className="absolute top-0 left-0 right-0 h-0.5 rounded-t-2xl" style={{ background: `linear-gradient(90deg, transparent, ${item.color}, transparent)`, opacity: hovered ? 1 : 0.4, transition: 'opacity 0.3s ease' }} />

      {/* Badge */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2 px-2.5 py-1 rounded-full" style={{ background: `${item.glow}`, border: `1px solid ${item.color}30` }}>
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: item.color, animation: 'policyPulse 2s ease-in-out infinite' }} />
          <span style={{ color: item.color, fontSize: '9px', fontWeight: 800, letterSpacing: '0.12em' }}>{item.badge}</span>
        </div>
        {/* Checkmark */}
        <div className="w-7 h-7 rounded-full flex items-center justify-center" style={{ background: `${item.glow}`, border: `1px solid ${item.color}40` }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={item.color} strokeWidth="2.5">
            <path d="M20 6L9 17l-5-5"/>
          </svg>
        </div>
      </div>

      {/* Icon */}
      <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ background: `${item.glow}`, border: `1px solid ${item.color}30`, color: item.color, boxShadow: hovered ? `0 0 20px ${item.glow}` : 'none', transition: 'box-shadow 0.3s ease' }}>
        {item.icon}
      </div>

      <h3 className="font-black text-white text-base mb-3" style={{ letterSpacing: '-0.02em' }}>{item.title}</h3>
      <p className="text-sm leading-relaxed mb-4" style={{ color: '#8892b0' }}>{item.content}</p>

      {/* Stat */}
      <div className="flex items-center justify-between pt-4 mb-4" style={{ borderTop: `1px solid ${item.color}15` }}>
        <div>
          <div className="font-black text-xl" style={{ color: item.color, letterSpacing: '-0.03em' }}>{item.stat}</div>
          <div style={{ color: '#4a5568', fontSize: '10px', marginTop: '1px' }}>{item.statLabel}</div>
        </div>
        <div className="flex items-end gap-0.5" style={{ height: '24px' }}>
          {Array.from({ length: 8 }).map((_, j) => (
            <div key={j} style={{ width: '3px', borderRadius: '1px', background: item.color, height: `${Math.random() * 16 + 8}px`, opacity: 0.6 + j * 0.05 }} />
          ))}
        </div>
      </div>

      {/* Policy URL */}
      <a
        href={item.url}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 text-xs font-semibold group/link"
        style={{ color: item.color, textDecoration: 'none' }}
        onClick={e => e.stopPropagation()}
      >
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
          <polyline points="15 3 21 3 21 9"/>
          <line x1="10" y1="14" x2="21" y2="3"/>
        </svg>
        <span style={{ borderBottom: `1px solid ${item.color}40`, paddingBottom: '1px' }}>{item.urlLabel} ↗</span>
      </a>
    </div>
  );
}

export default function PolicySection() {
  const headerRef = useRef<HTMLDivElement>(null);
  const [headerVisible, setHeaderVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setHeaderVisible(true); },
      { threshold: 0.2 }
    );
    if (headerRef.current) observer.observe(headerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="policy" className="py-16 sm:py-24 lg:py-32 relative overflow-hidden" style={{ background: 'linear-gradient(180deg, #050510 0%, #080818 50%, #050510 100%)' }}>
      <style>{`
        @keyframes policyScan {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        @keyframes policyPulse {
          0%, 100% { opacity: 0.6; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.3); }
        }
      `}</style>

      {/* Background */}
      <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(24,119,242,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(24,119,242,0.03) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(24,119,242,0.06) 0%, transparent 70%)' }} />

      <div className="section-container relative z-10">
        {/* Header */}
        <div
          ref={headerRef}
          className="text-center mb-10 sm:mb-16"
          style={{ opacity: headerVisible ? 1 : 0, transform: headerVisible ? 'translateY(0)' : 'translateY(24px)', transition: 'all 0.6s ease-out' }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4 sm:mb-5" style={{ background: 'rgba(24,119,242,0.12)', border: '1px solid rgba(24,119,242,0.3)' }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#1877F2', animation: 'policyPulse 2s ease-in-out infinite' }} />
            <span style={{ color: '#1877F2', fontSize: '12px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase' }}>Facebook Music Policy</span>
          </div>
          <h2 className="font-black text-white mb-4 sm:mb-5" style={{ fontSize: 'clamp(28px, 5vw, 56px)', lineHeight: '1.1', letterSpacing: '-0.03em' }}>
            How Facebook Rights Manager
            <br />
            <span style={{ background: 'linear-gradient(135deg, #1877F2, #38bdf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>protects your music.</span>
          </h2>
          <p className="text-base sm:text-lg max-w-[560px] mx-auto" style={{ color: '#8892b0', lineHeight: '1.6' }}>
            Comprehensive rights management policies ensuring your music is protected, monetized, and fairly compensated across all Meta platforms.
          </p>

          {/* Policy quick-links */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mt-6 sm:mt-8">
            {[
              { label: 'Music Distribution Policy', url: 'https://www.facebook.com/legal/music_guidelines' },
              { label: 'Monetization Policy', url: 'https://www.facebook.com/creators/tools/rights-manager' },
              { label: 'Royalty Payment Policy', url: 'https://www.facebook.com/creators/tools/rights-manager' },
              { label: 'Rights Manager Help', url: 'https://www.facebook.com/help/rightsmanager' },
            ].map(link => (
              <a
                key={link.label}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold"
                style={{ background: 'rgba(24,119,242,0.1)', border: '1px solid rgba(24,119,242,0.25)', color: '#4da6ff', textDecoration: 'none', transition: 'all 0.2s ease' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(24,119,242,0.2)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(24,119,242,0.1)'; }}
              >
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                  <polyline points="15 3 21 3 21 9"/>
                  <line x1="10" y1="14" x2="21" y2="3"/>
                </svg>
                {link.label}
              </a>
            ))}
          </div>
        </div>

        {/* Policy cards grid — responsive */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5"
          style={{ opacity: headerVisible ? 1 : 0, transition: 'all 0.6s ease-out 0.2s' }}
        >
          {policyItems.map((item, index) => (
            <PolicyCard key={item.title} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
