'use client';

import React from 'react';
import ScrollReveal from '../../components/ScrollReveal';

export default function OurCommitment() {
  return (
    <section className="py-20 relative overflow-hidden" style={{ background: 'linear-gradient(180deg, #050508 0%, #0a0514 40%, #050810 70%, #050508 100%)' }}>
      <style>{`
        @keyframes oc-topSlide {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
        @keyframes oc-bottomSlide {
          0% { transform: translateX(200%); }
          100% { transform: translateX(-100%); }
        }
        @keyframes oc-leftSlide {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(200%); }
        }
        @keyframes oc-rightSlide {
          0% { transform: translateY(200%); }
          100% { transform: translateY(-100%); }
        }
        @keyframes oc-bgPulse {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(1.1); }
        }
        @keyframes oc-cornerPulse {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
        @keyframes oc-dotGlow {
          0%, 100% { opacity: 0.6; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.4); }
        }
        @keyframes oc-particleFloat {
          0% { transform: translateY(100vh); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(-100px); opacity: 0; }
        }
        @keyframes oc-shimmer {
          0% { backgroundPosition: -200% center; }
          100% { backgroundPosition: 200% center; }
        }
        @keyframes oc-outerGlow {
          0%, 100% { box-shadow: 0 0 20px rgba(232,25,44,0.2), 0 0 50px rgba(124,58,237,0.1); }
          50% { box-shadow: 0 0 40px rgba(232,25,44,0.4), 0 0 80px rgba(124,58,237,0.2); }
        }
        @keyframes oc-rightGlow {
          0%, 100% { box-shadow: 0 0 20px rgba(37,99,235,0.2), 0 0 50px rgba(6,182,212,0.1); }
          50% { box-shadow: 0 0 40px rgba(37,99,235,0.4), 0 0 80px rgba(6,182,212,0.2); }
        }
      `}</style>
      {/* Animated background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(232,25,44,0.5), rgba(124,58,237,0.5), transparent)' }} />
        <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(6,182,212,0.5), rgba(37,99,235,0.4), transparent)' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] rounded-full" style={{ background: 'radial-gradient(ellipse, rgba(124,58,237,0.07) 0%, transparent 70%)', animation: 'oc-bgPulse 8s ease-in-out infinite' }} />
        <div className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(232,25,44,0.05) 0%, transparent 70%)', animation: 'oc-bgPulse 10s ease-in-out infinite 2s' }} />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(6,182,212,0.05) 0%, transparent 70%)', animation: 'oc-bgPulse 9s ease-in-out infinite 4s' }} />
        {/* Floating particles */}
        {[...Array(10)]?.map((_, i) => (
          <div key={i} className="absolute w-1 h-1 rounded-full" style={{
            left: `${5 + i * 9}%`,
            bottom: '0',
            background: ['#e8192c','#f97316','#7c3aed','#2563eb','#06b6d4','#10b981','#f59e0b','#ec4899','#8b5cf6','#14b8a6']?.[i],
            boxShadow: `0 0 4px ${['#e8192c','#f97316','#7c3aed','#2563eb','#06b6d4','#10b981','#f59e0b','#ec4899','#8b5cf6','#14b8a6']?.[i]}`,
            animation: `oc-particleFloat ${7 + i * 1.1}s linear infinite`,
            animationDelay: `${i * 0.7}s`,
          }} />
        ))}
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section header */}
        <ScrollReveal>
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-5 text-xs font-semibold tracking-widest uppercase" style={{ background: 'rgba(124,58,237,0.12)', border: '1px solid rgba(124,58,237,0.35)', color: '#a78bfa' }}>
              <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
              Our Promise
            </div>
            <h2 className="text-3xl font-extrabold" style={{ background: 'linear-gradient(135deg, #e8192c 0%, #7c3aed 50%, #2563eb 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Our Commitment
            </h2>
          </div>
        </ScrollReveal>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">

          {/* LEFT BOX */}
          <ScrollReveal direction="left">
            <div className="relative rounded-2xl overflow-hidden h-full" style={{ animation: 'oc-outerGlow 4s ease-in-out infinite' }}>
              {/* Animated border lights */}
              <div className="absolute top-0 left-0 right-0 h-0.5 overflow-hidden z-10">
                <div className="h-full w-1/2" style={{ background: 'linear-gradient(to right, transparent, #e8192c, #f97316, transparent)', animation: 'oc-topSlide 2.5s linear infinite' }} />
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-0.5 overflow-hidden z-10">
                <div className="h-full w-1/2" style={{ background: 'linear-gradient(to right, transparent, #7c3aed, #e8192c, transparent)', animation: 'oc-bottomSlide 2.5s linear infinite' }} />
              </div>
              <div className="absolute top-0 left-0 bottom-0 w-0.5 overflow-hidden z-10">
                <div className="w-full h-1/2" style={{ background: 'linear-gradient(to bottom, transparent, #e8192c, #7c3aed, transparent)', animation: 'oc-leftSlide 2.5s linear infinite' }} />
              </div>
              <div className="absolute top-0 right-0 bottom-0 w-0.5 overflow-hidden z-10">
                <div className="w-full h-1/2" style={{ background: 'linear-gradient(to bottom, transparent, #f97316, #e8192c, transparent)', animation: 'oc-rightSlide 2.5s linear infinite' }} />
              </div>
              {/* Corner accents */}
              <div className="absolute top-3 left-3 w-7 h-7 border-t-2 border-l-2 z-20" style={{ borderColor: '#e8192c', animation: 'oc-cornerPulse 2s ease-in-out infinite' }} />
              <div className="absolute top-3 right-3 w-7 h-7 border-t-2 border-r-2 z-20" style={{ borderColor: '#f97316', animation: 'oc-cornerPulse 2s ease-in-out infinite 0.5s' }} />
              <div className="absolute bottom-3 left-3 w-7 h-7 border-b-2 border-l-2 z-20" style={{ borderColor: '#7c3aed', animation: 'oc-cornerPulse 2s ease-in-out infinite 1s' }} />
              <div className="absolute bottom-3 right-3 w-7 h-7 border-b-2 border-r-2 z-20" style={{ borderColor: '#e8192c', animation: 'oc-cornerPulse 2s ease-in-out infinite 1.5s' }} />

              {/* Background glow */}
              <div className="absolute top-0 left-0 w-40 h-40 rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(232,25,44,0.12) 0%, transparent 70%)', transform: 'translate(-30%, -30%)', animation: 'oc-bgPulse 5s ease-in-out infinite' }} />
              <div className="absolute bottom-0 right-0 w-40 h-40 rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(124,58,237,0.12) 0%, transparent 70%)', transform: 'translate(30%, 30%)', animation: 'oc-bgPulse 5s ease-in-out infinite 2.5s' }} />

              <div className="relative z-10 p-8" style={{ background: 'linear-gradient(135deg, rgba(232,25,44,0.08) 0%, rgba(124,58,237,0.06) 50%, rgba(5,5,12,0.95) 100%)', border: '1px solid rgba(232,25,44,0.2)' }}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'rgba(232,25,44,0.15)', border: '1px solid rgba(232,25,44,0.35)' }}>
                    <div className="w-4 h-4 rounded-full" style={{ background: '#e8192c', boxShadow: '0 0 8px rgba(232,25,44,0.8)', animation: 'oc-dotGlow 1.5s ease-in-out infinite' }} />
                  </div>
                  <h3 className="text-lg font-bold" style={{ background: 'linear-gradient(135deg, #e8192c 0%, #f97316 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                    Our Trust & Growth
                  </h3>
                </div>
                <p className="text-sm leading-relaxed mb-5" style={{ color: 'rgba(255,255,255,0.7)' }}>
                  The trust placed in Karhari Media by artists, record labels, creators, and business partners is our greatest achievement. We remain committed to continuously improving our technology, expanding our services, and delivering world-class music distribution and rights management solutions.
                </p>
                <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.7)' }}>
                  Our goal is to help artists, singers, songwriters, music producers, record labels, and YouTube creators grow their careers while we manage the complex technical and business aspects of digital music distribution.
                </p>
                {/* Decorative divider */}
                <div className="mt-6 flex items-center gap-3">
                  <div className="h-px flex-1" style={{ background: 'linear-gradient(to right, rgba(232,25,44,0.6), transparent)' }} />
                  <div className="w-2 h-2 rounded-full" style={{ background: '#e8192c', boxShadow: '0 0 6px rgba(232,25,44,0.8)' }} />
                  <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#f97316', boxShadow: '0 0 5px rgba(249,115,22,0.8)' }} />
                  <div className="h-px flex-1" style={{ background: 'linear-gradient(to left, rgba(124,58,237,0.6), transparent)' }} />
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* RIGHT BOX */}
          <ScrollReveal direction="right">
            <div className="relative rounded-2xl overflow-hidden h-full" style={{ animation: 'oc-rightGlow 4s ease-in-out infinite 2s' }}>
              {/* Animated border lights */}
              <div className="absolute top-0 left-0 right-0 h-0.5 overflow-hidden z-10">
                <div className="h-full w-1/2" style={{ background: 'linear-gradient(to right, transparent, #2563eb, #06b6d4, transparent)', animation: 'oc-topSlide 2.8s linear infinite' }} />
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-0.5 overflow-hidden z-10">
                <div className="h-full w-1/2" style={{ background: 'linear-gradient(to right, transparent, #06b6d4, #2563eb, transparent)', animation: 'oc-bottomSlide 2.8s linear infinite' }} />
              </div>
              <div className="absolute top-0 left-0 bottom-0 w-0.5 overflow-hidden z-10">
                <div className="w-full h-1/2" style={{ background: 'linear-gradient(to bottom, transparent, #2563eb, #10b981, transparent)', animation: 'oc-leftSlide 2.8s linear infinite' }} />
              </div>
              <div className="absolute top-0 right-0 bottom-0 w-0.5 overflow-hidden z-10">
                <div className="w-full h-1/2" style={{ background: 'linear-gradient(to bottom, transparent, #06b6d4, #2563eb, transparent)', animation: 'oc-rightSlide 2.8s linear infinite' }} />
              </div>
              {/* Corner accents */}
              <div className="absolute top-3 left-3 w-7 h-7 border-t-2 border-l-2 z-20" style={{ borderColor: '#2563eb', animation: 'oc-cornerPulse 2s ease-in-out infinite 0.3s' }} />
              <div className="absolute top-3 right-3 w-7 h-7 border-t-2 border-r-2 z-20" style={{ borderColor: '#06b6d4', animation: 'oc-cornerPulse 2s ease-in-out infinite 0.8s' }} />
              <div className="absolute bottom-3 left-3 w-7 h-7 border-b-2 border-l-2 z-20" style={{ borderColor: '#10b981', animation: 'oc-cornerPulse 2s ease-in-out infinite 1.3s' }} />
              <div className="absolute bottom-3 right-3 w-7 h-7 border-b-2 border-r-2 z-20" style={{ borderColor: '#2563eb', animation: 'oc-cornerPulse 2s ease-in-out infinite 1.8s' }} />

              {/* Background glow */}
              <div className="absolute top-0 right-0 w-40 h-40 rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(37,99,235,0.12) 0%, transparent 70%)', transform: 'translate(30%, -30%)', animation: 'oc-bgPulse 5s ease-in-out infinite 1s' }} />
              <div className="absolute bottom-0 left-0 w-40 h-40 rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(6,182,212,0.12) 0%, transparent 70%)', transform: 'translate(-30%, 30%)', animation: 'oc-bgPulse 5s ease-in-out infinite 3s' }} />

              <div className="relative z-10 p-8" style={{ background: 'linear-gradient(135deg, rgba(37,99,235,0.08) 0%, rgba(6,182,212,0.06) 50%, rgba(5,5,12,0.95) 100%)', border: '1px solid rgba(37,99,235,0.2)' }}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'rgba(37,99,235,0.15)', border: '1px solid rgba(37,99,235,0.35)' }}>
                    <div className="w-4 h-4 rounded-full" style={{ background: '#2563eb', boxShadow: '0 0 8px rgba(37,99,235,0.8)', animation: 'oc-dotGlow 1.5s ease-in-out infinite 0.5s' }} />
                  </div>
                  <h3 className="text-lg font-bold" style={{ background: 'linear-gradient(135deg, #2563eb 0%, #06b6d4 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                    Our Vision & Values
                  </h3>
                </div>
                <p className="text-sm leading-relaxed mb-5" style={{ color: 'rgba(255,255,255,0.7)' }}>
                  We believe that lasting success is built on honesty, transparency, innovation, and long-term partnerships. We look forward to serving the global music community for many years to come.
                </p>
                <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.7)' }}>
                  We are committed to providing fast distribution, transparent royalty reporting, and timely payments. Our experienced team manages every aspect of music distribution and YouTube operations with professionalism and transparency, ensuring our partners receive reliable service throughout the process.
                </p>
                {/* Decorative divider */}
                <div className="mt-6 flex items-center gap-3">
                  <div className="h-px flex-1" style={{ background: 'linear-gradient(to right, rgba(37,99,235,0.6), transparent)' }} />
                  <div className="w-2 h-2 rounded-full" style={{ background: '#2563eb', boxShadow: '0 0 6px rgba(37,99,235,0.8)' }} />
                  <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#06b6d4', boxShadow: '0 0 5px rgba(6,182,212,0.8)' }} />
                  <div className="h-px flex-1" style={{ background: 'linear-gradient(to left, rgba(6,182,212,0.6), transparent)' }} />
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}