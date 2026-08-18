'use client';

import React from 'react';
import ScrollReveal from '../../components/ScrollReveal';

export default function OurJourneySection() {
  return (
    <section className="py-20 relative overflow-hidden" style={{ background: 'linear-gradient(180deg, #0a0a0f 0%, #0d0a1a 50%, #0a0d1a 100%)' }}>

      {/* Static background accents — no moving elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(124,58,237,0.6), transparent)' }} />
        <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(232,25,44,0.5), transparent)' }} />
        <div className="absolute top-1/2 left-0 w-[500px] h-[500px] -translate-y-1/2 rounded-full" style={{ background: 'radial-gradient(circle, rgba(124,58,237,0.08) 0%, transparent 70%)' }} />
        <div className="absolute top-1/2 right-0 w-[500px] h-[500px] -translate-y-1/2 rounded-full" style={{ background: 'radial-gradient(circle, rgba(232,25,44,0.08) 0%, transparent 70%)' }} />
        {/* Static dot grid */}
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.3) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      </div>

      <style>{`
        /* Snake border animation — a single glowing dot traces all 4 sides of the photo frame */
        @keyframes snakeTrace {
          0%   { stroke-dashoffset: 0; }
          100% { stroke-dashoffset: -1000; }
        }
        @keyframes snakeTrace2 {
          0%   { stroke-dashoffset: -250; }
          100% { stroke-dashoffset: -1250; }
        }
        @keyframes snakeTrace3 {
          0%   { stroke-dashoffset: -500; }
          100% { stroke-dashoffset: -1500; }
        }
        @keyframes snakeTrace4 {
          0%   { stroke-dashoffset: -750; }
          100% { stroke-dashoffset: -1750; }
        }
        @keyframes glowPulse {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }
        @keyframes cornerFlash {
          0%, 100% { opacity: 0.5; box-shadow: 0 0 8px currentColor; }
          50% { opacity: 1; box-shadow: 0 0 20px currentColor; }
        }
        @keyframes scanLine {
          0% { top: 0%; }
          100% { top: 100%; }
        }
        @keyframes textGlow {
          0%, 100% { text-shadow: 0 0 10px rgba(124,58,237,0.4); }
          50% { text-shadow: 0 0 25px rgba(232,25,44,0.7), 0 0 40px rgba(124,58,237,0.4); }
        }
        .snake-svg {
          position: absolute;
          inset: -3px;
          width: calc(100% + 6px);
          height: calc(100% + 6px);
          pointer-events: none;
          z-index: 20;
          border-radius: 18px;
          overflow: visible;
        }
        .snake-svg rect {
          fill: none;
          stroke-width: 1.5;
          stroke-linecap: round;
          stroke-dasharray: 20 980;
        }
      `}</style>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left — Founder photo with snake border animation only */}
          <ScrollReveal direction="left">
            <div className="relative flex items-center justify-center">

              {/* Photo frame */}
              <div className="relative rounded-2xl overflow-hidden" style={{
                border: '2px solid rgba(232,25,44,0.4)',
                boxShadow: '0 0 40px rgba(232,25,44,0.25), 0 0 80px rgba(124,58,237,0.15), inset 0 0 30px rgba(232,25,44,0.04)',
                background: 'linear-gradient(135deg, rgba(232,25,44,0.06) 0%, rgba(124,58,237,0.06) 100%)'
              }}>
                {/* Snake border SVG — 4 colored segments tracing the frame like a snake */}
                <svg className="snake-svg" viewBox="0 0 100 100" preserveAspectRatio="none">
                  {/* Segment 1 — red */}
                  <rect x="1.5" y="1.5" width="97" height="97" rx="8"
                  stroke="#e8192c"
                  style={{ strokeDashoffset: 0, animation: 'snakeTrace 9s linear infinite' }} />

                  {/* Segment 2 — violet */}
                  <rect x="1.5" y="1.5" width="97" height="97" rx="8"
                  stroke="#7c3aed"
                  style={{ strokeDashoffset: -250, animation: 'snakeTrace2 9s linear infinite' }} />

                  {/* Segment 3 — blue */}
                  <rect x="1.5" y="1.5" width="97" height="97" rx="8"
                  stroke="#2563eb"
                  style={{ strokeDashoffset: -500, animation: 'snakeTrace3 9s linear infinite' }} />

                  {/* Segment 4 — cyan */}
                  <rect x="1.5" y="1.5" width="97" height="97" rx="8"
                  stroke="#06b6d4"
                  style={{ strokeDashoffset: -750, animation: 'snakeTrace4 9s linear infinite' }} />

                </svg>

                {/* Animated scan line */}
                <div className="absolute left-0 right-0 h-0.5 z-10 pointer-events-none" style={{
                  background: 'linear-gradient(to right, transparent, rgba(232,25,44,0.8), transparent)',
                  animation: 'scanLine 3s linear infinite'
                }} />

                {/* Corner accents */}
                <div className="absolute top-3 left-3 w-8 h-8 border-t-2 border-l-2 z-10" style={{ borderColor: '#e8192c', animation: 'cornerFlash 2s ease-in-out infinite', borderRadius: '4px 0 0 0' }} />
                <div className="absolute top-3 right-3 w-8 h-8 border-t-2 border-r-2 z-10" style={{ borderColor: '#7c3aed', animation: 'cornerFlash 2s ease-in-out infinite 0.5s', borderRadius: '0 4px 0 0' }} />
                <div className="absolute bottom-3 left-3 w-8 h-8 border-b-2 border-l-2 z-10" style={{ borderColor: '#2563eb', animation: 'cornerFlash 2s ease-in-out infinite 1s', borderRadius: '0 0 0 4px' }} />
                <div className="absolute bottom-3 right-3 w-8 h-8 border-b-2 border-r-2 z-10" style={{ borderColor: '#06b6d4', animation: 'cornerFlash 2s ease-in-out infinite 1.5s', borderRadius: '0 0 4px 0' }} />

                {/* Actual photo */}
                <img
                  src="/assets/images/1786350541870.jpg-1786350685027.jpeg"
                  alt="Mr. Shekh Tabrej, Founder and CEO of Karhari Media"
                  className="w-full object-cover"
                  style={{ display: 'block', maxHeight: '420px', objectPosition: 'top center' }} />


                {/* Lighting overlay */}
                <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(135deg, rgba(232,25,44,0.12) 0%, transparent 40%, rgba(124,58,237,0.08) 100%)' }} />

                {/* Bottom glow bar */}
                <div className="absolute bottom-0 left-0 right-0 h-1" style={{ background: 'linear-gradient(to right, #e8192c, #7c3aed, #2563eb)', animation: 'glowPulse 2s ease-in-out infinite' }} />
              </div>
            </div>
          </ScrollReveal>

          {/* Right — text in animated frame */}
          <ScrollReveal direction="right">
            <div className="relative rounded-2xl p-8" style={{
              background: 'linear-gradient(135deg, rgba(10,10,20,0.95) 0%, rgba(13,10,26,0.95) 100%)',
              border: '1px solid rgba(124,58,237,0.35)',
              boxShadow: '0 0 50px rgba(124,58,237,0.15), 0 0 100px rgba(232,25,44,0.08)'
            }}>
              {/* Animated border glow */}
              <div className="absolute inset-0 rounded-2xl pointer-events-none" style={{ background: 'linear-gradient(135deg, rgba(124,58,237,0.08) 0%, rgba(232,25,44,0.05) 100%)', animation: 'glowPulse 3s ease-in-out infinite' }} />

              {/* Corner accents */}
              <div className="absolute top-3 left-3 w-6 h-6 border-t-2 border-l-2" style={{ borderColor: 'rgba(124,58,237,0.8)', animation: 'cornerFlash 2s ease-in-out infinite' }} />
              <div className="absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2" style={{ borderColor: 'rgba(232,25,44,0.8)', animation: 'cornerFlash 2s ease-in-out infinite 0.7s' }} />
              <div className="absolute bottom-3 left-3 w-6 h-6 border-b-2 border-l-2" style={{ borderColor: 'rgba(37,99,235,0.8)', animation: 'cornerFlash 2s ease-in-out infinite 1.4s' }} />
              <div className="absolute bottom-3 right-3 w-6 h-6 border-b-2 border-r-2" style={{ borderColor: 'rgba(6,182,212,0.8)', animation: 'cornerFlash 2s ease-in-out infinite 2.1s' }} />

              <div className="relative z-10">
                {/* Section label */}
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-5 text-xs font-semibold tracking-widest uppercase" style={{ background: 'rgba(124,58,237,0.15)', border: '1px solid rgba(124,58,237,0.4)', color: '#a78bfa' }}>
                  <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
                  Since 2014
                </div>

                <div className="flex items-center gap-3 mb-6">
                  <img
                    src="/assets/images/1608452013412__1_-1786276249256.png"
                    alt="Karhari Media logo icon"
                    className="w-10 h-10 object-contain"
                    style={{ filter: 'drop-shadow(0 0 10px rgba(232,25,44,0.7))' }} />

                  <h2 className="text-2xl font-extrabold" style={{ background: 'linear-gradient(135deg, #e8192c 0%, #ff6b35 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', animation: 'textGlow 3s ease-in-out infinite' }}>
                    Our Journey
                  </h2>
                </div>

                <div className="space-y-5">
                  {[
                  <>Before 2014, no one knew the name Karhari Media because the company did not yet exist. It all began with a vision. In 2014, our founder, <strong style={{ color: '#f1f5f9' }}>Mr. Shekh Tabrej</strong>, introduced the name <strong style={{ color: '#f1f5f9' }}>Karhari Media</strong>. At that time, it was not a registered company, there was no official brand registration, no registered trademark, no website, and no domain name. It was simply a dream supported by a clear vision for building a successful business in the music industry.</>,
                  <>From the very beginning, Mr. Shekh Tabrej was passionate about music. He wrote, composed, produced, and performed his own songs while continuously learning about the music business. Alongside creating original music, he explored how digital music distribution worked and began releasing his music through third-party digital music distribution companies.</>,
                  <>As his knowledge and experience grew, so did his ambition. He realized that music distribution had enormous potential, not only for his own music but also for helping other artists and record labels reach audiences worldwide.</>]?.
                  map((text, i) =>
                  <div key={i} className="flex gap-3">
                      <div className="flex-shrink-0 mt-1.5">
                        <div className="w-1.5 h-1.5 rounded-full" style={{ background: i % 2 === 0 ? '#e8192c' : '#7c3aed', boxShadow: `0 0 8px ${i % 2 === 0 ? 'rgba(232,25,44,0.8)' : 'rgba(124,58,237,0.8)'}`, animation: 'glowPulse 2s ease-in-out infinite' }} />
                      </div>
                      <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.65)' }}>{text}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>);

}