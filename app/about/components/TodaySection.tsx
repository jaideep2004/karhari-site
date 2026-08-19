'use client';

import React from 'react';
import ScrollReveal from '../../components/ScrollReveal';
import Icon from '../../components/ui/AppIcon';

const services = [
  { label: 'Global Digital Music Distribution', color: '#e8192c' },
  { label: 'YouTube MCN Management', color: '#f97316' },
  { label: 'Rights Management', color: '#7c3aed' },
  { label: 'Copyright Protection', color: '#2563eb' },
  { label: 'Music Catalogue Management', color: '#06b6d4' },
  { label: 'Royalty Collection', color: '#10b981' },
  { label: 'Transparent Reporting', color: '#f59e0b' },
  { label: 'Real-Time Analytics', color: '#ec4899' },
  { label: 'Artist Dashboard', color: '#8b5cf6' },
  { label: 'Record Label Dashboard', color: '#14b8a6' },
  { label: 'Distribution Management', color: '#e8192c' },
  { label: 'Release Management', color: '#f97316' },
];

const todayFeatures = [
  { icon: 'GlobeAltIcon', text: 'We are committed to providing fast distribution, transparent royalty reporting, and timely payments.', color: '#2563eb' },
  { icon: 'CurrencyDollarIcon', text: 'Whenever appropriate, we may also provide advance payments to eligible artist partners, enabling them to focus on creating music while we handle distribution, rights management, royalty collection, YouTube channel management, and catalog administration.', color: '#10b981' },
  { icon: 'UsersIcon', text: 'Our experienced team manages every aspect of music distribution and YouTube operations with professionalism and transparency.', color: '#7c3aed' },
  { icon: 'ShieldCheckIcon', text: 'From delivering music to digital platforms to protecting copyrights and collecting royalties, we strive to ensure that our partners receive reliable service and complete transparency throughout the process.', color: '#06b6d4' },
];

const commitmentItems = [
  { icon: 'StarIcon', text: 'The trust placed in Karhari Media by artists, record labels, creators, and business partners is our greatest achievement.', color: '#f59e0b' },
  { icon: 'ArrowTrendingUpIcon', text: 'We remain committed to continuously improving our technology, expanding our services, and delivering world-class music distribution and rights management solutions.', color: '#e8192c' },
  { icon: 'HeartIcon', text: 'Our goal is to help artists, singers, songwriters, music producers, record labels, and YouTube creators grow their careers while we manage the complex technical and business aspects of digital music distribution.', color: '#ec4899' },
  { icon: 'HandshakeIcon', text: 'We believe that lasting success is built on honesty, transparency, innovation, long-term partnerships, and we look forward to serving the global music community for many years to come.', color: '#8b5cf6' },
];

export default function TodaySection() {
  return (
    <section className="py-20 relative overflow-hidden" style={{ background: 'linear-gradient(180deg, #050508 0%, #080514 30%, #050810 70%, #050508 100%)' }}>
      <style>{`
        @keyframes ts-topSlide {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
        @keyframes ts-bottomSlide {
          0% { transform: translateX(200%); }
          100% { transform: translateX(-100%); }
        }
        @keyframes ts-leftSlide {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(200%); }
        }
        @keyframes ts-rightSlide {
          0% { transform: translateY(200%); }
          100% { transform: translateY(-100%); }
        }
        @keyframes ts-bgPulse {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.08); }
        }
        @keyframes ts-cornerPulse {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
        @keyframes ts-dotGlow {
          0%, 100% { opacity: 0.6; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.3); }
        }
        @keyframes ts-particleFloat {
          0% { transform: translateY(100vh); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(-100px); opacity: 0; }
        }
        @keyframes ts-sectionGlow {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.7; }
        }
      `}</style>

      {/* Animated background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(232,25,44,0.5), rgba(124,58,237,0.5), transparent)' }} />
        <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(6,182,212,0.5), rgba(16,185,129,0.5), transparent)' }} />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full" style={{ background: 'radial-gradient(ellipse, rgba(124,58,237,0.06) 0%, transparent 70%)', animation: 'ts-bgPulse 8s ease-in-out infinite' }} />
        <div className="absolute top-0 left-0 w-[400px] h-[400px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(232,25,44,0.05) 0%, transparent 70%)', animation: 'ts-bgPulse 10s ease-in-out infinite 3s' }} />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(6,182,212,0.05) 0%, transparent 70%)', animation: 'ts-bgPulse 9s ease-in-out infinite 5s' }} />
        {/* Floating particles */}
        {[...Array(10)].map((_, i) => (
          <div key={i} className="absolute w-1 h-1 rounded-full" style={{
            left: `${5 + i * 9}%`,
            bottom: '0',
            background: ['#e8192c','#f97316','#7c3aed','#2563eb','#06b6d4','#10b981','#f59e0b','#ec4899','#8b5cf6','#14b8a6'][i],
            boxShadow: `0 0 4px ${['#e8192c','#f97316','#7c3aed','#2563eb','#06b6d4','#10b981','#f59e0b','#ec4899','#8b5cf6','#14b8a6'][i]}`,
            animation: `ts-particleFloat ${7 + i * 1.1}s linear infinite`,
            animationDelay: `${i * 0.7}s`,
          }} />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">

          {/* Col 1 — Today + services list */}
          <ScrollReveal direction="left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-5 text-xs font-semibold tracking-widest uppercase" style={{ background: 'rgba(232,25,44,0.1)', border: '1px solid rgba(232,25,44,0.3)', color: '#f87171' }}>
              <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
              Present
            </div>
            <h2 className="text-2xl font-extrabold mb-4" style={{ background: 'linear-gradient(135deg, #e8192c 0%, #f97316 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Today
            </h2>

            {/* Small box for left-side text below "Today" */}
            <div className="relative rounded-xl overflow-hidden mb-5">
              {/* Animated border */}
              <div className="absolute top-0 left-0 right-0 h-0.5 overflow-hidden z-10">
                <div className="h-full w-1/2" style={{ background: 'linear-gradient(to right, transparent, #e8192c, #f97316, transparent)', animation: 'ts-topSlide 3s linear infinite' }} />
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-0.5 overflow-hidden z-10">
                <div className="h-full w-1/2" style={{ background: 'linear-gradient(to right, transparent, #f97316, #e8192c, transparent)', animation: 'ts-bottomSlide 3s linear infinite' }} />
              </div>
              <div className="absolute top-0 left-0 bottom-0 w-0.5 overflow-hidden z-10">
                <div className="w-full h-1/2" style={{ background: 'linear-gradient(to bottom, transparent, #e8192c, transparent)', animation: 'ts-leftSlide 3s linear infinite' }} />
              </div>
              <div className="absolute top-0 right-0 bottom-0 w-0.5 overflow-hidden z-10">
                <div className="w-full h-1/2" style={{ background: 'linear-gradient(to bottom, transparent, #f97316, transparent)', animation: 'ts-rightSlide 3s linear infinite' }} />
              </div>
              <div className="absolute top-1.5 left-1.5 w-3 h-3 border-t border-l z-20" style={{ borderColor: '#e8192c', animation: 'ts-cornerPulse 2s ease-in-out infinite' }} />
              <div className="absolute bottom-1.5 right-1.5 w-3 h-3 border-b border-r z-20" style={{ borderColor: '#f97316', animation: 'ts-cornerPulse 2s ease-in-out infinite 1s' }} />
              <div className="relative z-10 p-4" style={{ background: 'linear-gradient(135deg, rgba(232,25,44,0.08) 0%, rgba(5,5,12,0.95) 100%)', border: '1px solid rgba(232,25,44,0.2)' }}>
                <p className="text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.65)' }}>
                  Today, Karhari Media is a global digital music distribution and rights management company serving artists, record labels, creators, and music businesses. Our platform provides professional solutions including:
                </p>
              </div>
            </div>

            {/* Service boxes with lighting animations */}
            <div className="grid grid-cols-1 gap-2">
              {services.map((s, i) => (
                <div key={i} className="relative rounded-lg overflow-hidden" style={{
                  background: `linear-gradient(135deg, ${s.color}0a 0%, rgba(5,5,12,0.95) 100%)`,
                  border: `1px solid ${s.color}20`,
                }}>
                  <div className="absolute top-0 left-0 right-0 h-px overflow-hidden z-10">
                    <div className="h-full w-1/3" style={{ background: `linear-gradient(to right, transparent, ${s.color}, transparent)`, animation: `ts-topSlide ${1.8 + i * 0.08}s linear infinite`, animationDelay: `${i * 0.1}s` }} />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 h-px overflow-hidden z-10">
                    <div className="h-full w-1/3" style={{ background: `linear-gradient(to right, transparent, ${s.color}, transparent)`, animation: `ts-bottomSlide ${1.8 + i * 0.08}s linear infinite`, animationDelay: `${i * 0.15}s` }} />
                  </div>
                  <div className="absolute top-0 left-0 bottom-0 w-px overflow-hidden z-10">
                    <div className="w-full h-1/3" style={{ background: `linear-gradient(to bottom, transparent, ${s.color}, transparent)`, animation: `ts-leftSlide ${1.8 + i * 0.08}s linear infinite` }} />
                  </div>
                  <div className="absolute top-0 right-0 bottom-0 w-px overflow-hidden z-10">
                    <div className="w-full h-1/3" style={{ background: `linear-gradient(to bottom, transparent, ${s.color}, transparent)`, animation: `ts-rightSlide ${1.8 + i * 0.08}s linear infinite`, animationDelay: `${i * 0.2}s` }} />
                  </div>
                  <div className="relative z-10 flex items-center gap-2.5 px-3 py-2">
                    <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: s.color, boxShadow: `0 0 5px ${s.color}`, animation: 'ts-dotGlow 1.5s ease-in-out infinite' }} />
                    <span className="text-xs font-medium" style={{ color: 'rgba(255,255,255,0.75)' }}>{s.label}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Analytics note box */}
            <div className="relative rounded-xl overflow-hidden mt-3">
              <div className="absolute top-0 left-0 right-0 h-px overflow-hidden z-10">
                <div className="h-full w-1/2" style={{ background: 'linear-gradient(to right, transparent, #06b6d4, transparent)', animation: 'ts-topSlide 4s linear infinite' }} />
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-px overflow-hidden z-10">
                <div className="h-full w-1/2" style={{ background: 'linear-gradient(to right, transparent, #8b5cf6, transparent)', animation: 'ts-bottomSlide 4s linear infinite' }} />
              </div>
              <div className="relative z-10 p-3" style={{ background: 'linear-gradient(135deg, rgba(6,182,212,0.07) 0%, rgba(5,5,12,0.95) 100%)', border: '1px solid rgba(6,182,212,0.2)' }}>
                <p className="text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.45)' }}>
                  Our technology enables artists and record labels to monitor their music performance through transparent, real-time analytics and reporting.
                </p>
              </div>
            </div>
          </ScrollReveal>

          {/* Col 2 — Today Continued */}
          <ScrollReveal delay={150}>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-5 text-xs font-semibold tracking-widest uppercase" style={{ background: 'rgba(37,99,235,0.1)', border: '1px solid rgba(37,99,235,0.3)', color: '#60a5fa' }}>
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
              Services
            </div>
            <h2 className="text-2xl font-extrabold mb-5" style={{ background: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Today (Continued)
            </h2>
            <div className="space-y-3">
              {todayFeatures.map((item, i) => (
                <div key={i} className="relative rounded-xl overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-0.5 overflow-hidden z-10">
                    <div className="h-full w-1/2" style={{ background: `linear-gradient(to right, transparent, ${item.color}, transparent)`, animation: `ts-topSlide ${2.2 + i * 0.2}s linear infinite`, animationDelay: `${i * 0.3}s` }} />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 overflow-hidden z-10">
                    <div className="h-full w-1/2" style={{ background: `linear-gradient(to right, transparent, ${item.color}, transparent)`, animation: `ts-bottomSlide ${2.2 + i * 0.2}s linear infinite`, animationDelay: `${i * 0.2}s` }} />
                  </div>
                  <div className="absolute top-0 left-0 bottom-0 w-0.5 overflow-hidden z-10">
                    <div className="w-full h-1/2" style={{ background: `linear-gradient(to bottom, transparent, ${item.color}, transparent)`, animation: `ts-leftSlide ${2.2 + i * 0.2}s linear infinite` }} />
                  </div>
                  <div className="absolute top-0 right-0 bottom-0 w-0.5 overflow-hidden z-10">
                    <div className="w-full h-1/2" style={{ background: `linear-gradient(to bottom, transparent, ${item.color}, transparent)`, animation: `ts-rightSlide ${2.2 + i * 0.2}s linear infinite`, animationDelay: `${i * 0.4}s` }} />
                  </div>
                  {/* Corner accents */}
                  <div className="absolute top-1.5 left-1.5 w-3 h-3 border-t border-l z-20" style={{ borderColor: item.color, opacity: 0.7, animation: 'ts-cornerPulse 2s ease-in-out infinite' }} />
                  <div className="absolute bottom-1.5 right-1.5 w-3 h-3 border-b border-r z-20" style={{ borderColor: item.color, opacity: 0.7, animation: `ts-cornerPulse 2s ease-in-out infinite ${i * 0.3}s` }} />
                  <div className="relative z-10 flex gap-3 p-4" style={{ background: `linear-gradient(135deg, ${item.color}0d 0%, rgba(5,5,12,0.95) 100%)`, border: `1px solid ${item.color}20` }}>
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: `${item.color}18`, border: `1px solid ${item.color}35` }}>
                      <Icon name={item.icon as any} size={18} variant="outline" style={{ color: item.color }} />
                    </div>
                    <p className="text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.65)' }}>{item.text}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Extra Karhari Media boxes to fill empty space in Col 2 */}
            <div className="space-y-3 mt-3">
              {[
                { title: 'YouTube MCN Management', desc: 'Karhari Media manages YouTube Multi-Channel Networks, helping creators and record labels grow their channels, protect content, and maximize ad revenue through our MCN infrastructure.', color: '#f97316' },
                { title: 'Music Licensing & Sync', desc: 'We handle music licensing, sync placements, and copyright registrations — ensuring your compositions are protected and monetized across all digital platforms worldwide.', color: '#06b6d4' },
                { title: 'Advance Payments for Artists', desc: 'Eligible artist partners may receive advance payments from Karhari Media, enabling them to focus on creating music while we manage distribution, royalties, and rights management.', color: '#10b981' },
              ].map((box, i) => (
                <div key={i} className="relative rounded-xl overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-0.5 overflow-hidden z-10">
                    <div className="h-full w-1/2" style={{ background: `linear-gradient(to right, transparent, ${box.color}, transparent)`, animation: `ts-topSlide ${2.5 + i * 0.3}s linear infinite`, animationDelay: `${i * 0.4}s` }} />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 overflow-hidden z-10">
                    <div className="h-full w-1/2" style={{ background: `linear-gradient(to right, transparent, ${box.color}, transparent)`, animation: `ts-bottomSlide ${2.5 + i * 0.3}s linear infinite`, animationDelay: `${i * 0.3}s` }} />
                  </div>
                  <div className="absolute top-0 left-0 bottom-0 w-0.5 overflow-hidden z-10">
                    <div className="w-full h-1/2" style={{ background: `linear-gradient(to bottom, transparent, ${box.color}, transparent)`, animation: `ts-leftSlide ${2.5 + i * 0.3}s linear infinite` }} />
                  </div>
                  <div className="absolute top-0 right-0 bottom-0 w-0.5 overflow-hidden z-10">
                    <div className="w-full h-1/2" style={{ background: `linear-gradient(to bottom, transparent, ${box.color}, transparent)`, animation: `ts-rightSlide ${2.5 + i * 0.3}s linear infinite`, animationDelay: `${i * 0.5}s` }} />
                  </div>
                  <div className="absolute top-1.5 left-1.5 w-3 h-3 border-t border-l z-20" style={{ borderColor: box.color, opacity: 0.7, animation: 'ts-cornerPulse 2s ease-in-out infinite' }} />
                  <div className="absolute bottom-1.5 right-1.5 w-3 h-3 border-b border-r z-20" style={{ borderColor: box.color, opacity: 0.7, animation: `ts-cornerPulse 2s ease-in-out infinite ${i * 0.4}s` }} />
                  <div className="relative z-10 p-4" style={{ background: `linear-gradient(135deg, ${box.color}0d 0%, rgba(5,5,12,0.95) 100%)`, border: `1px solid ${box.color}20` }}>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: box.color, boxShadow: `0 0 5px ${box.color}`, animation: 'ts-dotGlow 1.5s ease-in-out infinite' }} />
                      <span className="text-xs font-semibold" style={{ color: box.color }}>{box.title}</span>
                    </div>
                    <p className="text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.6)' }}>{box.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>

          {/* Col 3 — Our Commitment */}
          <ScrollReveal direction="right">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-5 text-xs font-semibold tracking-widest uppercase" style={{ background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.3)', color: '#fbbf24' }}>
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
              Values
            </div>
            <h2 className="text-2xl font-extrabold mb-5" style={{ background: 'linear-gradient(135deg, #f59e0b 0%, #ec4899 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Our Commitment
            </h2>
            <div className="space-y-3">
              {commitmentItems.map((item, i) => (
                <div key={i} className="relative rounded-xl overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-0.5 overflow-hidden z-10">
                    <div className="h-full w-1/2" style={{ background: `linear-gradient(to right, transparent, ${item.color}, transparent)`, animation: `ts-topSlide ${2.4 + i * 0.2}s linear infinite`, animationDelay: `${i * 0.25}s` }} />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 overflow-hidden z-10">
                    <div className="h-full w-1/2" style={{ background: `linear-gradient(to right, transparent, ${item.color}, transparent)`, animation: `ts-bottomSlide ${2.4 + i * 0.2}s linear infinite`, animationDelay: `${i * 0.3}s` }} />
                  </div>
                  <div className="absolute top-0 left-0 bottom-0 w-0.5 overflow-hidden z-10">
                    <div className="w-full h-1/2" style={{ background: `linear-gradient(to bottom, transparent, ${item.color}, transparent)`, animation: `ts-leftSlide ${2.4 + i * 0.2}s linear infinite` }} />
                  </div>
                  <div className="absolute top-0 right-0 bottom-0 w-0.5 overflow-hidden z-10">
                    <div className="w-full h-1/2" style={{ background: `linear-gradient(to bottom, transparent, ${item.color}, transparent)`, animation: `ts-rightSlide ${2.4 + i * 0.2}s linear infinite`, animationDelay: `${i * 0.35}s` }} />
                  </div>
                  <div className="absolute top-1.5 left-1.5 w-3 h-3 border-t border-l z-20" style={{ borderColor: item.color, opacity: 0.7, animation: 'ts-cornerPulse 2s ease-in-out infinite' }} />
                  <div className="absolute bottom-1.5 right-1.5 w-3 h-3 border-b border-r z-20" style={{ borderColor: item.color, opacity: 0.7, animation: `ts-cornerPulse 2s ease-in-out infinite ${i * 0.3}s` }} />
                  <div className="relative z-10 flex gap-3 p-4" style={{ background: `linear-gradient(135deg, ${item.color}0d 0%, rgba(5,5,12,0.95) 100%)`, border: `1px solid ${item.color}20` }}>
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: `${item.color}18`, border: `1px solid ${item.color}35` }}>
                      <Icon name={item.icon as any} size={18} variant="outline" style={{ color: item.color }} />
                    </div>
                    <p className="text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.65)' }}>{item.text}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Extra Karhari Media boxes to fill empty space in Col 3 */}
            <div className="space-y-3 mt-3">
              {[
                { title: 'Karhari Media — Artist First', desc: 'We believe every artist deserves a fair share of their music earnings. Karhari Media is built on the principle of transparency — artists always know exactly how much they earn and when they get paid.', color: '#e8192c' },
                { title: 'Global Network & Partnerships', desc: 'Our partnerships with 150+ digital platforms, streaming services, and music stores ensure your music reaches listeners in every corner of the world — from India to the USA, Europe, and beyond.', color: '#8b5cf6' },
                { title: 'Innovation in Music Tech', desc: 'Karhari Media continuously invests in technology — from AI-powered analytics to automated royalty management — so our partners always have access to the most advanced music distribution tools available.', color: '#ec4899' },
              ].map((box, i) => (
                <div key={i} className="relative rounded-xl overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-0.5 overflow-hidden z-10">
                    <div className="h-full w-1/2" style={{ background: `linear-gradient(to right, transparent, ${box.color}, transparent)`, animation: `ts-topSlide ${2.6 + i * 0.3}s linear infinite`, animationDelay: `${i * 0.4}s` }} />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 overflow-hidden z-10">
                    <div className="h-full w-1/2" style={{ background: `linear-gradient(to right, transparent, ${box.color}, transparent)`, animation: `ts-bottomSlide ${2.6 + i * 0.3}s linear infinite`, animationDelay: `${i * 0.3}s` }} />
                  </div>
                  <div className="absolute top-0 left-0 bottom-0 w-0.5 overflow-hidden z-10">
                    <div className="w-full h-1/2" style={{ background: `linear-gradient(to bottom, transparent, ${box.color}, transparent)`, animation: `ts-leftSlide ${2.6 + i * 0.3}s linear infinite` }} />
                  </div>
                  <div className="absolute top-0 right-0 bottom-0 w-0.5 overflow-hidden z-10">
                    <div className="w-full h-1/2" style={{ background: `linear-gradient(to bottom, transparent, ${box.color}, transparent)`, animation: `ts-rightSlide ${2.6 + i * 0.3}s linear infinite`, animationDelay: `${i * 0.5}s` }} />
                  </div>
                  <div className="absolute top-1.5 left-1.5 w-3 h-3 border-t border-l z-20" style={{ borderColor: box.color, opacity: 0.7, animation: 'ts-cornerPulse 2s ease-in-out infinite' }} />
                  <div className="absolute bottom-1.5 right-1.5 w-3 h-3 border-b border-r z-20" style={{ borderColor: box.color, opacity: 0.7, animation: `ts-cornerPulse 2s ease-in-out infinite ${i * 0.4}s` }} />
                  <div className="relative z-10 p-4" style={{ background: `linear-gradient(135deg, ${box.color}0d 0%, rgba(5,5,12,0.95) 100%)`, border: `1px solid ${box.color}20` }}>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: box.color, boxShadow: `0 0 5px ${box.color}`, animation: 'ts-dotGlow 1.5s ease-in-out infinite' }} />
                      <span className="text-xs font-semibold" style={{ color: box.color }}>{box.title}</span>
                    </div>
                    <p className="text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.6)' }}>{box.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}