'use client';

import React from 'react';
import ScrollReveal from '../../components/ScrollReveal';
import Icon from '../../components/ui/AppIcon';

const founderInfo = [
{ icon: 'UserIcon', label: 'Name', value: 'Mr. Shekh Tabrej', color: '#e8192c', borderColors: ['#e8192c', '#ff6b6b', '#e8192c', '#ff4444'] },
{ icon: 'CalendarIcon', label: 'Date of Birth', value: '03 December 1988', color: '#f97316', borderColors: ['#f97316', '#fb923c', '#f97316', '#ea580c'] },
{ icon: 'MapPinIcon', label: 'Birth Place', value: 'Karhari Village, Darbhanga, Bihar, India', color: '#7c3aed', borderColors: ['#7c3aed', '#a855f7', '#7c3aed', '#6d28d9'] },
{ icon: 'BriefcaseIcon', label: 'Role', value: 'Founder & CEO', color: '#2563eb', borderColors: ['#2563eb', '#3b82f6', '#2563eb', '#1d4ed8'] },
{ icon: 'BuildingOfficeIcon', label: 'Company', value: 'Karhari Media', color: '#06b6d4', borderColors: ['#06b6d4', '#22d3ee', '#06b6d4', '#0891b2'] },
{ icon: 'LightBulbIcon', label: 'Vision', value: 'Empowering artists and labels worldwide', color: '#10b981', borderColors: ['#10b981', '#34d399', '#10b981', '#059669'] }];


export default function FounderSection() {
  return (
    <section className="py-20 relative overflow-hidden" style={{ background: 'linear-gradient(180deg, #050508 0%, #0a0514 40%, #050810 70%, #050508 100%)' }}>
      <style>{`
        @keyframes fs-topSlide {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
        @keyframes fs-bottomSlide {
          0% { transform: translateX(200%); }
          100% { transform: translateX(-100%); }
        }
        @keyframes fs-leftSlide {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(200%); }
        }
        @keyframes fs-rightSlide {
          0% { transform: translateY(200%); }
          100% { transform: translateY(-100%); }
        }
        @keyframes fs-photoGlow {
          0%, 100% { box-shadow: 0 0 18px rgba(232,25,44,0.3), 0 0 36px rgba(124,58,237,0.15), inset 0 0 12px rgba(232,25,44,0.05); }
          50% { box-shadow: 0 0 32px rgba(232,25,44,0.55), 0 0 64px rgba(124,58,237,0.28), inset 0 0 20px rgba(232,25,44,0.1); }
        }
        @keyframes fs-bgPulse {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.05); }
        }
        @keyframes fs-cornerPulse {
          0%, 100% { opacity: 0.6; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.1); }
        }
        @keyframes fs-scanLine {
          0% { top: 0%; opacity: 0.6; }
          100% { top: 100%; opacity: 0; }
        }
        @keyframes fs-infoBoxGlow {
          0%, 100% { opacity: 0.7; }
          50% { opacity: 1; }
        }
        @keyframes fs-dotGlow {
          0%, 100% { opacity: 0.6; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.4); }
        }
        @keyframes fs-nameShimmer {
          0%, 100% { opacity: 0.8; }
          50% { opacity: 1; }
        }
        @keyframes fs-particleFloat {
          0% { transform: translateY(100vh); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(-100px); opacity: 0; }
        }
      `}</style>

      {/* Animated background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(232,25,44,0.5), rgba(124,58,237,0.5), transparent)' }} />
        <div className="absolute -top-20 left-1/4 w-[500px] h-[500px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(232,25,44,0.06) 0%, transparent 70%)', animation: 'fs-bgPulse 8s ease-in-out infinite' }} />
        <div className="absolute -bottom-20 right-1/4 w-[500px] h-[500px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(124,58,237,0.06) 0%, transparent 70%)', animation: 'fs-bgPulse 10s ease-in-out infinite 3s' }} />
        {[...Array(8)].map((_, i) =>
        <div key={i} className="absolute w-1 h-1 rounded-full" style={{
          left: `${8 + i * 12}%`,
          bottom: '0',
          background: ['#e8192c', '#f97316', '#7c3aed', '#2563eb', '#06b6d4', '#10b981', '#ec4899', '#8b5cf6'][i],
          boxShadow: `0 0 4px ${['#e8192c', '#f97316', '#7c3aed', '#2563eb', '#06b6d4', '#10b981', '#ec4899', '#8b5cf6'][i]}`,
          animation: `fs-particleFloat ${7 + i * 1.2}s linear infinite`,
          animationDelay: `${i * 0.8}s`
        }} />
        )}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        <ScrollReveal>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-6 text-xs font-semibold tracking-widest uppercase" style={{ background: 'rgba(232,25,44,0.1)', border: '1px solid rgba(232,25,44,0.3)', color: '#f87171' }}>
            <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
            Leadership
          </div>
          <h2 className="text-2xl font-extrabold mb-10" style={{ background: 'linear-gradient(135deg, #e8192c 0%, #7c3aed 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            About the Founder
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-start">

          {/* LEFT — Photo + animated boxes below */}
          <ScrollReveal direction="left">
            <div className="flex flex-col items-center lg:items-start pl-0 lg:pl-4">

              {/* Photo frame */}
              <div className="relative w-full max-w-xs sm:max-w-sm mx-auto lg:mx-0" style={{ maxWidth: '260px' }}>
                {/* Outer glow ring */}
                <div className="absolute -inset-3 rounded-2xl pointer-events-none" style={{
                  background: 'linear-gradient(135deg, rgba(232,25,44,0.15) 0%, rgba(124,58,237,0.15) 50%, rgba(6,182,212,0.15) 100%)',
                  borderRadius: '20px'
                }} />

                {/* Main frame */}
                <div className="relative rounded-xl overflow-hidden" style={{
                  border: '2px solid rgba(232,25,44,0.5)',
                  animation: 'fs-photoGlow 3s ease-in-out infinite',
                  background: '#0a0a0f',
                  borderRadius: '14px'
                }}>
                  {/* Animated 4-side border lights */}
                  <div className="absolute top-0 left-0 right-0 h-0.5 overflow-hidden z-10">
                    <div className="h-full w-1/2" style={{ background: 'linear-gradient(to right, transparent, #e8192c, transparent)', animation: 'fs-topSlide 1.8s linear infinite' }} />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 overflow-hidden z-10">
                    <div className="h-full w-1/2" style={{ background: 'linear-gradient(to right, transparent, #7c3aed, transparent)', animation: 'fs-bottomSlide 1.8s linear infinite' }} />
                  </div>
                  <div className="absolute top-0 left-0 bottom-0 w-0.5 overflow-hidden z-10">
                    <div className="w-full h-1/2" style={{ background: 'linear-gradient(to bottom, transparent, #2563eb, transparent)', animation: 'fs-leftSlide 1.8s linear infinite' }} />
                  </div>
                  <div className="absolute top-0 right-0 bottom-0 w-0.5 overflow-hidden z-10">
                    <div className="w-full h-1/2" style={{ background: 'linear-gradient(to bottom, transparent, #06b6d4, transparent)', animation: 'fs-rightSlide 1.8s linear infinite' }} />
                  </div>
                  {/* Corner accents */}
                  <div className="absolute top-2 left-2 w-5 h-5 border-t-2 border-l-2 z-20" style={{ borderColor: '#e8192c', borderRadius: '3px 0 0 0', animation: 'fs-cornerPulse 2s ease-in-out infinite' }} />
                  <div className="absolute top-2 right-2 w-5 h-5 border-t-2 border-r-2 z-20" style={{ borderColor: '#7c3aed', borderRadius: '0 3px 0 0', animation: 'fs-cornerPulse 2s ease-in-out infinite 0.5s' }} />
                  <div className="absolute bottom-2 left-2 w-5 h-5 border-b-2 border-l-2 z-20" style={{ borderColor: '#2563eb', borderRadius: '0 0 0 3px', animation: 'fs-cornerPulse 2s ease-in-out infinite 1s' }} />
                  <div className="absolute bottom-2 right-2 w-5 h-5 border-b-2 border-r-2 z-20" style={{ borderColor: '#06b6d4', borderRadius: '0 0 3px 0', animation: 'fs-cornerPulse 2s ease-in-out infinite 1.5s' }} />
                  {/* Scan line */}
                  <div className="absolute left-0 right-0 h-px z-20 pointer-events-none" style={{
                    background: 'linear-gradient(to right, transparent, rgba(232,25,44,0.5), transparent)',
                    animation: 'fs-scanLine 4s linear infinite'
                  }} />
                  {/* Founder photo */}
                  <img
                    src="/assets/images/1786350541870.jpg-1786350729766.jpeg"
                    alt="Mr. Shekh Tabrej, Founder and CEO of Karhari Media"
                    style={{
                      display: 'block',
                      width: '100%',
                      height: '300px',
                      objectFit: 'cover',
                      objectPosition: 'center top',
                      filter: 'brightness(1.08) contrast(1.1) saturate(1.05)'
                    }} />

                  <div className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none" style={{ background: 'linear-gradient(to top, rgba(13,10,26,0.85) 0%, transparent 100%)' }} />
                </div>

                {/* Floating glow orbs */}
                <div className="absolute -top-3 -left-3 w-10 h-10 rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(232,25,44,0.45) 0%, transparent 70%)', animation: 'fs-infoBoxGlow 2.5s ease-in-out infinite' }} />
                <div className="absolute -bottom-3 -right-3 w-10 h-10 rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(124,58,237,0.45) 0%, transparent 70%)', animation: 'fs-infoBoxGlow 2.5s ease-in-out infinite 1.2s' }} />
                <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(6,182,212,0.4) 0%, transparent 70%)', animation: 'fs-infoBoxGlow 2.5s ease-in-out infinite 0.6s' }} />
              </div>

              {/* Bio content box below photo */}
              <div className="mt-5 w-full max-w-xs sm:max-w-sm mx-auto lg:mx-0 relative rounded-xl overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-0.5 overflow-hidden z-10">
                  <div className="h-full w-1/2" style={{ background: 'linear-gradient(to right, transparent, #e8192c, #7c3aed, transparent)', animation: 'fs-topSlide 3s linear infinite' }} />
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-0.5 overflow-hidden z-10">
                  <div className="h-full w-1/2" style={{ background: 'linear-gradient(to right, transparent, #7c3aed, #e8192c, transparent)', animation: 'fs-bottomSlide 3s linear infinite' }} />
                </div>
                <div className="absolute top-0 left-0 bottom-0 w-0.5 overflow-hidden z-10">
                  <div className="w-full h-1/2" style={{ background: 'linear-gradient(to bottom, transparent, #2563eb, transparent)', animation: 'fs-leftSlide 3s linear infinite' }} />
                </div>
                <div className="absolute top-0 right-0 bottom-0 w-0.5 overflow-hidden z-10">
                  <div className="w-full h-1/2" style={{ background: 'linear-gradient(to bottom, transparent, #06b6d4, transparent)', animation: 'fs-rightSlide 3s linear infinite' }} />
                </div>
                <div className="absolute top-1.5 left-1.5 w-4 h-4 border-t border-l z-20" style={{ borderColor: '#e8192c', animation: 'fs-cornerPulse 2s ease-in-out infinite' }} />
                <div className="absolute bottom-1.5 right-1.5 w-4 h-4 border-b border-r z-20" style={{ borderColor: '#7c3aed', animation: 'fs-cornerPulse 2s ease-in-out infinite 1s' }} />
                <div className="relative z-10 p-4 space-y-3" style={{ background: 'linear-gradient(135deg, rgba(232,25,44,0.08) 0%, rgba(124,58,237,0.06) 50%, rgba(5,5,12,0.95) 100%)', border: '1px solid rgba(232,25,44,0.2)' }}>
                  {[
                  'His passion for music, entrepreneurship, and technology inspired the creation of Karhari Media.',
                  'What began as a simple vision in 2014 has grown into a company dedicated to empowering artists and record labels with professional music distribution, rights management, and digital technology solutions.'].
                  map((text, i) =>
                  <div key={i} className="flex gap-3">
                      <div className="flex-shrink-0 mt-1.5">
                        <div className="w-1.5 h-1.5 rounded-full" style={{ background: i === 0 ? '#e8192c' : '#7c3aed', boxShadow: `0 0 6px ${i === 0 ? 'rgba(232,25,44,0.8)' : 'rgba(124,58,237,0.8)'}`, animation: 'fs-dotGlow 1.5s ease-in-out infinite' }} />
                      </div>
                      <p className="text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.65)' }}>{text}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Founder Name — animated box */}
              <div className="mt-4 w-full max-w-xs sm:max-w-sm mx-auto lg:mx-0 relative rounded-xl overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-0.5 overflow-hidden z-10">
                  <div className="h-full w-1/2" style={{ background: 'linear-gradient(to right, transparent, #f59e0b, #e8192c, transparent)', animation: 'fs-topSlide 2.2s linear infinite' }} />
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-0.5 overflow-hidden z-10">
                  <div className="h-full w-1/2" style={{ background: 'linear-gradient(to right, transparent, #e8192c, #f59e0b, transparent)', animation: 'fs-bottomSlide 2.2s linear infinite' }} />
                </div>
                <div className="absolute top-0 left-0 bottom-0 w-0.5 overflow-hidden z-10">
                  <div className="w-full h-1/2" style={{ background: 'linear-gradient(to bottom, transparent, #f59e0b, transparent)', animation: 'fs-leftSlide 2.2s linear infinite' }} />
                </div>
                <div className="absolute top-0 right-0 bottom-0 w-0.5 overflow-hidden z-10">
                  <div className="w-full h-1/2" style={{ background: 'linear-gradient(to bottom, transparent, #e8192c, transparent)', animation: 'fs-rightSlide 2.2s linear infinite' }} />
                </div>
                <div className="absolute top-1.5 left-1.5 w-4 h-4 border-t border-l z-20" style={{ borderColor: '#f59e0b', animation: 'fs-cornerPulse 1.8s ease-in-out infinite' }} />
                <div className="absolute top-1.5 right-1.5 w-4 h-4 border-t border-r z-20" style={{ borderColor: '#e8192c', animation: 'fs-cornerPulse 1.8s ease-in-out infinite 0.4s' }} />
                <div className="absolute bottom-1.5 left-1.5 w-4 h-4 border-b border-l z-20" style={{ borderColor: '#e8192c', animation: 'fs-cornerPulse 1.8s ease-in-out infinite 0.8s' }} />
                <div className="absolute bottom-1.5 right-1.5 w-4 h-4 border-b border-r z-20" style={{ borderColor: '#f59e0b', animation: 'fs-cornerPulse 1.8s ease-in-out infinite 1.2s' }} />
                <div className="relative z-10 px-5 py-3 flex items-center gap-3" style={{ background: 'linear-gradient(135deg, rgba(245,158,11,0.1) 0%, rgba(232,25,44,0.07) 50%, rgba(5,5,12,0.95) 100%)', border: '1px solid rgba(245,158,11,0.25)' }}>
                  <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: '#f59e0b', boxShadow: '0 0 8px rgba(245,158,11,0.8)', animation: 'fs-dotGlow 1.5s ease-in-out infinite' }} />
                  <span className="text-base font-bold" style={{ background: 'linear-gradient(135deg, #f59e0b 0%, #e8192c 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', animation: 'fs-nameShimmer 2s ease-in-out infinite' }}>
                    Mr. Shekh Tabrej
                  </span>
                </div>
              </div>

            </div>
          </ScrollReveal>

          {/* RIGHT — each info item in its own animated box */}
          <ScrollReveal direction="right">
            <div className="space-y-3">
              <div className="mb-4 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-red-500" style={{ boxShadow: '0 0 6px rgba(232,25,44,0.7)' }} />
                <h4 className="text-base font-bold text-white">Founder Information</h4>
              </div>

              {founderInfo.map((info, idx) =>
              <div key={info.label} className="relative rounded-xl overflow-hidden" style={{
                background: `linear-gradient(135deg, ${info.color}0d 0%, rgba(5,5,12,0.95) 100%)`,
                border: `1px solid ${info.color}30`
              }}>
                  {/* Animated 4-side border lights */}
                  <div className="absolute top-0 left-0 right-0 h-0.5 overflow-hidden z-10">
                    <div className="h-full w-2/5" style={{
                    background: `linear-gradient(to right, transparent, ${info.borderColors[0]}, transparent)`,
                    animation: `fs-topSlide ${1.6 + idx * 0.15}s linear infinite`
                  }} />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 overflow-hidden z-10">
                    <div className="h-full w-2/5" style={{
                    background: `linear-gradient(to right, transparent, ${info.borderColors[1]}, transparent)`,
                    animation: `fs-bottomSlide ${1.6 + idx * 0.15}s linear infinite`,
                    animationDelay: `${idx * 0.2}s`
                  }} />
                  </div>
                  <div className="absolute top-0 left-0 bottom-0 w-0.5 overflow-hidden z-10">
                    <div className="w-full h-2/5" style={{
                    background: `linear-gradient(to bottom, transparent, ${info.borderColors[2]}, transparent)`,
                    animation: `fs-leftSlide ${1.6 + idx * 0.15}s linear infinite`,
                    animationDelay: `${idx * 0.1}s`
                  }} />
                  </div>
                  <div className="absolute top-0 right-0 bottom-0 w-0.5 overflow-hidden z-10">
                    <div className="w-full h-2/5" style={{
                    background: `linear-gradient(to bottom, transparent, ${info.borderColors[3]}, transparent)`,
                    animation: `fs-rightSlide ${1.6 + idx * 0.15}s linear infinite`,
                    animationDelay: `${idx * 0.3}s`
                  }} />
                  </div>
                  {/* Corner micro-accents */}
                  <div className="absolute top-1.5 left-1.5 w-3 h-3 border-t border-l z-20" style={{ borderColor: info.color, opacity: 0.7, animation: 'fs-infoBoxGlow 2s ease-in-out infinite' }} />
                  <div className="absolute top-1.5 right-1.5 w-3 h-3 border-t border-r z-20" style={{ borderColor: info.color, opacity: 0.7, animation: `fs-infoBoxGlow 2s ease-in-out infinite ${idx * 0.2}s` }} />
                  <div className="absolute bottom-1.5 left-1.5 w-3 h-3 border-b border-l z-20" style={{ borderColor: info.color, opacity: 0.7, animation: `fs-infoBoxGlow 2s ease-in-out infinite ${idx * 0.3}s` }} />
                  <div className="absolute bottom-1.5 right-1.5 w-3 h-3 border-b border-r z-20" style={{ borderColor: info.color, opacity: 0.7, animation: `fs-infoBoxGlow 2s ease-in-out infinite ${idx * 0.4}s` }} />
                  {/* Content */}
                  <div className="relative z-10 flex items-center gap-4 px-4 py-3">
                    <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{
                      background: `${info.color}18`,
                      border: `1px solid ${info.color}40`,
                      boxShadow: `0 0 10px ${info.color}20`
                    }}>

                      <Icon name={info.icon as any} size={16} variant="outline" style={{ color: info.color }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs mb-0.5" style={{ color: 'rgba(255,255,255,0.4)' }}>{info.label}</div>
                      <div className="text-sm font-semibold text-white leading-snug">{info.value}</div>
                    </div>
                    <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: info.color, boxShadow: `0 0 6px ${info.color}`, animation: 'fs-infoBoxGlow 1.5s ease-in-out infinite' }} />
                  </div>
                </div>
              )}

              {/* Founder & CEO — animated box placed below Vision */}
              <div className="relative rounded-xl overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-0.5 overflow-hidden z-10">
                  <div className="h-full w-1/2" style={{ background: 'linear-gradient(to right, transparent, #8b5cf6, #06b6d4, transparent)', animation: 'fs-topSlide 2.5s linear infinite' }} />
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-0.5 overflow-hidden z-10">
                  <div className="h-full w-1/2" style={{ background: 'linear-gradient(to right, transparent, #06b6d4, #8b5cf6, transparent)', animation: 'fs-bottomSlide 2.5s linear infinite' }} />
                </div>
                <div className="absolute top-0 left-0 bottom-0 w-0.5 overflow-hidden z-10">
                  <div className="w-full h-1/2" style={{ background: 'linear-gradient(to bottom, transparent, #8b5cf6, transparent)', animation: 'fs-leftSlide 2.5s linear infinite' }} />
                </div>
                <div className="absolute top-0 right-0 bottom-0 w-0.5 overflow-hidden z-10">
                  <div className="w-full h-1/2" style={{ background: 'linear-gradient(to bottom, transparent, #06b6d4, transparent)', animation: 'fs-rightSlide 2.5s linear infinite' }} />
                </div>
                <div className="absolute top-1.5 left-1.5 w-3 h-3 border-t border-l z-20" style={{ borderColor: '#8b5cf6', opacity: 0.7, animation: 'fs-infoBoxGlow 2s ease-in-out infinite' }} />
                <div className="absolute top-1.5 right-1.5 w-3 h-3 border-t border-r z-20" style={{ borderColor: '#06b6d4', opacity: 0.7, animation: 'fs-infoBoxGlow 2s ease-in-out infinite 0.5s' }} />
                <div className="absolute bottom-1.5 left-1.5 w-3 h-3 border-b border-l z-20" style={{ borderColor: '#06b6d4', opacity: 0.7, animation: 'fs-infoBoxGlow 2s ease-in-out infinite 1s' }} />
                <div className="absolute bottom-1.5 right-1.5 w-3 h-3 border-b border-r z-20" style={{ borderColor: '#8b5cf6', opacity: 0.7, animation: 'fs-infoBoxGlow 2s ease-in-out infinite 1.5s' }} />
                <div className="relative z-10 flex items-center gap-4 px-4 py-3" style={{ background: 'linear-gradient(135deg, rgba(139,92,246,0.1) 0%, rgba(6,182,212,0.07) 50%, rgba(5,5,12,0.95) 100%)', border: '1px solid rgba(139,92,246,0.25)' }}>
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(139,92,246,0.18)', border: '1px solid rgba(139,92,246,0.4)', boxShadow: '0 0 10px rgba(139,92,246,0.2)' }}>
                    <Icon name="StarIcon" size={16} variant="outline" style={{ color: '#8b5cf6' }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs mb-0.5" style={{ color: 'rgba(255,255,255,0.4)' }}>Designation</div>
                    <div className="text-sm font-semibold" style={{ background: 'linear-gradient(135deg, #8b5cf6 0%, #06b6d4 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                      Founder & CEO, Karhari Media
                    </div>
                  </div>
                  <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: '#8b5cf6', boxShadow: '0 0 6px rgba(139,92,246,0.8)', animation: 'fs-infoBoxGlow 1.5s ease-in-out infinite 0.5s' }} />
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>);

}