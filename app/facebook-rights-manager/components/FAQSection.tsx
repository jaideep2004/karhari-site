'use client';
import React, { useEffect, useRef, useState } from 'react';

const FB_FAQ_URLS = {
  rightsManager: 'https://www.facebook.com/help/rightsmanager',
  musicGuidelines: 'https://www.facebook.com/legal/music_guidelines',
  monetization: 'https://www.facebook.com/creators/tools/rights-manager',
  dispute: 'https://www.facebook.com/help/contact/1409697672616547',
  dashboard: 'https://www.facebook.com/creators/tools/rights-manager',
  registration: 'https://www.facebook.com/legal/music_guidelines',
  reels: 'https://www.facebook.com/help/rightsmanager',
  artists: 'https://www.facebook.com/creators/tools/rights-manager',
};

const faqs = [
  {
    q: 'What is Facebook Rights Manager?',
    a: "Facebook Rights Manager is Meta's content identification and rights management system. It allows rights holders like Karhari Media to register their music catalog and automatically identify, claim, and monetize content across Facebook, Instagram, and WhatsApp.",
    url: FB_FAQ_URLS.rightsManager,
    urlLabel: 'Learn about Rights Manager',
    color: '#1877F2',
  },
  {
    q: 'How does Karhari Media distribute music on Facebook?',
    a: 'Karhari Media registers your complete music catalog with Facebook Rights Manager. We create acoustic fingerprints for every track, which are then used to automatically identify your music whenever it appears in videos, Reels, Stories, or other content across Meta platforms.',
    url: FB_FAQ_URLS.musicGuidelines,
    urlLabel: 'Facebook Music Guidelines',
    color: '#38bdf8',
  },
  {
    q: 'How is revenue collected and paid to artists?',
    a: 'When your music is detected in content that runs ads, Meta collects the ad revenue and reports it to Karhari Media. We aggregate earnings across all platforms, deduct our distribution fee, and pay the remainder directly to artists and record labels on a monthly basis with full transparent reporting.',
    url: FB_FAQ_URLS.monetization,
    urlLabel: 'Creator Monetization Tools',
    color: '#34d399',
  },
  {
    q: 'What happens when someone uses my music without permission?',
    a: 'Facebook Rights Manager automatically detects unauthorized use of your music. Depending on your rights policy, the content can be monetized (revenue redirected to you), blocked, or tracked. Karhari Media manages this process on your behalf.',
    url: FB_FAQ_URLS.dispute,
    urlLabel: 'Submit a Dispute',
    color: '#f59e0b',
  },
  {
    q: 'Can I see how much my music is earning?',
    a: 'Yes. Karhari Media provides full transparent reporting with monthly statements showing earnings broken down by platform (Facebook, Instagram, WhatsApp), track, content type, and territory. You can access your dashboard at any time.',
    url: FB_FAQ_URLS.dashboard,
    urlLabel: 'Rights Manager Dashboard',
    color: '#a78bfa',
  },
  {
    q: 'How long does it take to register my catalog?',
    a: 'After submitting your catalog to Karhari Media, the registration and fingerprinting process typically takes 5–10 business days. Once registered, your music is actively monitored and monetized across all Meta platforms.',
    url: FB_FAQ_URLS.registration,
    urlLabel: 'Registration Guidelines',
    color: '#fb7185',
  },
  {
    q: 'Does this cover Instagram Reels and WhatsApp Status?',
    a: 'Yes. Facebook Rights Manager covers all Meta platforms including Facebook videos, Facebook Reels, Instagram Reels, Instagram Stories, IGTV, and WhatsApp Status. Any use of your music across these platforms is tracked and monetized.',
    url: FB_FAQ_URLS.reels,
    urlLabel: 'Platform Coverage Details',
    color: '#e879f9',
  },
  {
    q: 'What types of artists and labels does Karhari Media work with?',
    a: 'Karhari Media works with independent artists, signed artists, independent record labels, and major label subsidiaries. Whether you have 10 tracks or 10,000, we can manage your catalog and ensure you earn from every use on Meta platforms.',
    url: FB_FAQ_URLS.artists,
    urlLabel: 'Artist Eligibility Info',
    color: '#60a5fa',
  },
];

function FAQCard({ item, index, side }: { item: typeof faqs[0]; index: number; side: 'left' | 'right' }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.05 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="relative overflow-hidden rounded-2xl p-5"
      style={{
        background: 'linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)',
        border: `1px solid ${item.color}25`,
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateX(0)' : `translateX(${side === 'left' ? '-24px' : '24px'})`,
        transition: `all 0.55s ease-out ${index * 0.07}s`,
        boxShadow: `0 2px 20px ${item.color}10`,
      }}
    >
      {/* Left color accent */}
      <div className="absolute left-0 top-0 bottom-0 w-0.5 rounded-l-2xl" style={{ background: `linear-gradient(180deg, transparent, ${item.color}, transparent)` }} />

      {/* Number badge */}
      <div className="flex items-start gap-3 mb-3">
        <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 font-black text-xs" style={{ background: `${item.color}18`, border: `1px solid ${item.color}30`, color: item.color }}>
          {String(index + 1).padStart(2, '0')}
        </div>
        <h3 className="font-bold text-white text-sm leading-snug" style={{ letterSpacing: '-0.01em' }}>{item.q}</h3>
      </div>

      <p className="text-sm leading-relaxed mb-4 pl-10" style={{ color: '#8892b0' }}>{item.a}</p>

      {/* Policy URL */}
      <div className="pl-10">
        <a
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full"
          style={{ background: `${item.color}12`, border: `1px solid ${item.color}30`, color: item.color, textDecoration: 'none', transition: 'all 0.2s ease' }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = `${item.color}25`; }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = `${item.color}12`; }}
        >
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
            <polyline points="15 3 21 3 21 9"/>
            <line x1="10" y1="14" x2="21" y2="3"/>
          </svg>
          {item.urlLabel} ↗
        </a>
      </div>
    </div>
  );
}

export default function FAQSection() {
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

  const leftItems = faqs.filter((_, i) => i % 2 === 0);
  const rightItems = faqs.filter((_, i) => i % 2 === 1);

  return (
    <section id="faq" className="py-16 sm:py-24 lg:py-32 relative overflow-hidden" style={{ background: 'linear-gradient(180deg, #080818 0%, #050510 100%)' }}>
      <style>{`
        @keyframes faqGlow {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.8; }
        }
      `}</style>

      <div className="absolute top-1/2 right-0 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(24,119,242,0.04) 0%, transparent 70%)', transform: 'translateY(-50%)' }} />
      <div className="absolute top-1/2 left-0 w-[250px] sm:w-[400px] h-[250px] sm:h-[400px] pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(167,139,250,0.04) 0%, transparent 70%)', transform: 'translateY(-50%)' }} />

      <div className="section-container relative z-10">
        <div
          ref={headerRef}
          className="text-center mb-10 sm:mb-14"
          style={{ opacity: headerVisible ? 1 : 0, transform: headerVisible ? 'translateY(0)' : 'translateY(24px)', transition: 'all 0.6s ease-out' }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4 sm:mb-5" style={{ background: 'rgba(24,119,242,0.12)', border: '1px solid rgba(24,119,242,0.3)' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1877F2" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/>
              <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
              <line x1="12" y1="17" x2="12.01" y2="17"/>
            </svg>
            <span style={{ color: '#1877F2', fontSize: '12px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase' }}>FAQ</span>
          </div>
          <h2 className="font-black text-white mb-4 sm:mb-5" style={{ fontSize: 'clamp(28px, 5vw, 56px)', lineHeight: '1.1', letterSpacing: '-0.03em' }}>
            Everything you need
            <br />
            <span style={{ background: 'linear-gradient(135deg, #1877F2, #a78bfa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>to know.</span>
          </h2>
          <p className="text-base sm:text-lg max-w-[560px] mx-auto" style={{ color: '#8892b0', lineHeight: '1.6' }}>
            Common questions about Karhari Media, Facebook Rights Manager, and how music monetization works across Meta platforms.
          </p>
        </div>

        {/* Single outer box containing all FAQs */}
        <div
          className="rounded-3xl p-4 sm:p-6 lg:p-8"
          style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.02) 0%, rgba(24,119,242,0.04) 100%)',
            border: '1px solid rgba(24,119,242,0.15)',
            opacity: headerVisible ? 1 : 0,
            transition: 'all 0.6s ease-out 0.2s',
          }}
        >
          {/* Two-column zigzag layout on desktop */}
          <div className="hidden lg:grid grid-cols-2 gap-4">
            <div className="space-y-4">
              {leftItems.map((item, i) => (
                <FAQCard key={item.q} item={item} index={i * 2} side="left" />
              ))}
            </div>
            <div className="space-y-4 mt-8">
              {rightItems.map((item, i) => (
                <FAQCard key={item.q} item={item} index={i * 2 + 1} side="right" />
              ))}
            </div>
          </div>

          {/* Mobile/tablet: single column */}
          <div className="lg:hidden space-y-3">
            {faqs.map((item, i) => (
              <FAQCard key={item.q} item={item} index={i} side="left" />
            ))}
          </div>

          {/* Bottom policy links */}
          <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 flex flex-wrap items-center justify-center gap-2 sm:gap-3" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
            <span style={{ color: '#4a5568', fontSize: '12px' }}>Official Facebook Policies:</span>
            {[
              { label: 'Music Guidelines', url: 'https://www.facebook.com/legal/music_guidelines' },
              { label: 'Rights Manager', url: 'https://www.facebook.com/help/rightsmanager' },
              { label: 'Terms of Service', url: 'https://www.facebook.com/legal/terms' },
              { label: 'Privacy Policy', url: 'https://www.facebook.com/privacy/policy/' },
            ].map(link => (
              <a
                key={link.label}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#1877F2', fontSize: '12px', textDecoration: 'underline', textUnderlineOffset: '2px' }}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
