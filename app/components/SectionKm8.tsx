'use client';

import { useRef } from 'react';
import './styles/km8.css';
import { useGsapSection } from './hooks/useGsapSection';
import { runKm8 } from './scripts/km8';

export default function SectionKm8() {
  const ref = useRef<HTMLDivElement>(null);
  useGsapSection(runKm8, ref);

  return (
    <div className="km8-section" ref={ref}>
      <section className="royalty-section"><div className="header-wrap"><h1 className="main-title"><span style={{ color: '#fff' }}>ROYALTY </span><span className="grad">REPORTING &amp; PAYOUT</span></h1><div className="sub-tagline"><span style={{ color: '#fff' }}>Transparent</span><span className="dot">•</span><span style={{ color: '#60a5fa' }}>Accurate</span><span className="dot">•</span><span style={{ color: '#c084fc' }}>Timely</span><span className="dot">•</span><span style={{ color: '#f472b6' }}>Trusted</span></div><p className="sub-line">From Music Creation to Payout – We Handle Everything, <span className="hl">You Create the Music</span></p></div><div className="slider-outer"><div className="slider-track" id="km8-sliderTrack"></div></div><div className="features-strip"><div className="feature-item"><div className="f-icon" style={{ color: '#a855f7' }}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2l8 4v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6l8-4z" /></svg></div><div><h4 style={{ color: '#c084fc' }}>100% TRANSPARENT</h4><p>No hidden fees, no surprises.</p></div></div><div className="feature-item"><div className="f-icon" style={{ color: '#60a5fa' }}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 3" /></svg></div><div><h4 style={{ color: '#60a5fa' }}>ON-TIME PAYOUTS</h4><p>We respect your time and pay on time.</p></div></div><div className="feature-item"><div className="f-icon" style={{ color: '#22c55e' }}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="5" y="10" width="14" height="10" rx="2" /><path d="M8 10V7a4 4 0 018 0v3" /></svg></div><div><h4 style={{ color: '#4ade80' }}>SECURE &amp; RELIABLE</h4><p>Your music &amp; data are always safe.</p></div></div><div className="feature-item"><div className="f-icon" style={{ color: '#facc15' }}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 19V9M10 19V5M16 19v-7M22 19v-3" /></svg></div><div><h4 style={{ color: '#facc15' }}>ACCURATE REPORTING</h4><p>Real numbers, real performance.</p></div></div><div className="feature-item"><div className="f-icon" style={{ color: '#38bdf8' }}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3a15 15 0 010 18 15 15 0 010-18z" /></svg></div><div><h4 style={{ color: '#38bdf8' }}>GLOBAL REACH</h4><p>Delivering to 100+ stores worldwide.</p></div></div><div className="feature-item"><div className="f-icon" style={{ color: '#fb923c' }}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 15v-3a8 8 0 0116 0v3" /><path d="M4 15a2 2 0 002 2h1v-5H6a2 2 0 00-2 2zM20 15a2 2 0 01-2 2h-1v-5h1a2 2 0 012 2z" /></svg></div><div><h4 style={{ color: '#fb923c' }}>DEDICATED SUPPORT</h4><p>We&apos;re here for you, whenever you need.</p></div></div></div></section>
    </div>
  );
}
