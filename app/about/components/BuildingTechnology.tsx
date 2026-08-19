'use client';

import React from 'react';
import ScrollReveal from '../../components/ScrollReveal';
import AppImage from '../../components/ui/AppImage';

const techListLeft = [
  { label: 'Digital music distribution software', color: '#e8192c' },
  { label: 'Artist Dashboard', color: '#f97316' },
  { label: 'Record Label Dashboard', color: '#7c3aed' },
  { label: 'Administration Panel', color: '#2563eb' },
  { label: 'Royalty Management System', color: '#06b6d4' },
];

const techListRight = [
  { label: 'Analytics Platform', color: '#10b981' },
  { label: 'Catalogue Management System', color: '#f59e0b' },
  { label: 'YouTube MCN Management System', color: '#ec4899' },
  { label: 'Distribution Management Software', color: '#8b5cf6' },
  { label: 'Direct integrations with global digital music platforms', color: '#14b8a6' },
];

export default function BuildingTechnology() {
  return (
    <section className="py-20 relative overflow-hidden" style={{ background: 'linear-gradient(180deg, #050508 0%, #0a0514 40%, #050810 70%, #050508 100%)' }}>
      <style>{`
        @keyframes bt-topSlide {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
        @keyframes bt-bottomSlide {
          0% { transform: translateX(200%); }
          100% { transform: translateX(-100%); }
        }
        @keyframes bt-leftSlide {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(200%); }
        }
        @keyframes bt-rightSlide {
          0% { transform: translateY(200%); }
          100% { transform: translateY(-100%); }
        }
        @keyframes bt-photoGlow {
          0%, 100% { box-shadow: 0 0 20px rgba(139,92,246,0.4), 0 0 50px rgba(6,182,212,0.2), 0 0 80px rgba(139,92,246,0.1); }
          50% { box-shadow: 0 0 40px rgba(139,92,246,0.7), 0 0 80px rgba(6,182,212,0.4), 0 0 120px rgba(139,92,246,0.2); }
        }
        @keyframes bt-bgPulse {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.05); }
        }
        @keyframes bt-cornerPulse {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }
        @keyframes bt-scanLine {
          0% { top: 0%; opacity: 0.7; }
          100% { top: 100%; opacity: 0; }
        }
        @keyframes bt-floatOrb {
          0%, 100% { transform: translateY(0px) scale(1); opacity: 0.5; }
          50% { transform: translateY(-12px) scale(1.1); opacity: 0.9; }
        }
        @keyframes bt-boxGlow {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }
        @keyframes bt-particleFloat {
          0% { transform: translateY(100vh) translateX(0px); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(-100px) translateX(30px); opacity: 0; }
        }
      `}</style>
      {/* Animated background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(139,92,246,0.6), rgba(6,182,212,0.5), transparent)' }} />
        <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(6,182,212,0.5), rgba(139,92,246,0.4), transparent)' }} />
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.08) 0%, transparent 70%)', animation: 'bt-bgPulse 6s ease-in-out infinite' }} />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(6,182,212,0.08) 0%, transparent 70%)', animation: 'bt-bgPulse 8s ease-in-out infinite 2s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full" style={{ background: 'radial-gradient(ellipse, rgba(37,99,235,0.05) 0%, transparent 70%)', animation: 'bt-bgPulse 10s ease-in-out infinite 4s' }} />
        {[...Array(8)]?.map((_, i) =>
          <div key={i} className="absolute w-1 h-1 rounded-full" style={{
            left: `${10 + i * 11}%`,
            bottom: '0',
            background: ['#8b5cf6', '#06b6d4', '#e8192c', '#f97316', '#10b981', '#2563eb', '#ec4899', '#f59e0b']?.[i],
            boxShadow: `0 0 4px ${['#8b5cf6', '#06b6d4', '#e8192c', '#f97316', '#10b981', '#2563eb', '#ec4899', '#f59e0b']?.[i]}`,
            animation: `bt-particleFloat ${6 + i * 1.2}s linear infinite`,
            animationDelay: `${i * 0.8}s`
          }} />
        )}
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <ScrollReveal direction="up">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-4 text-xs font-semibold tracking-widest uppercase" style={{ background: 'rgba(139,92,246,0.1)', border: '1px solid rgba(139,92,246,0.3)', color: '#c4b5fd' }}>
              <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
              2024 Onwards
            </div>
            <h2 className="text-3xl font-extrabold mb-3" style={{ background: 'linear-gradient(135deg, #8b5cf6 0%, #06b6d4 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Building Our Own Technology
            </h2>
            <p className="text-sm leading-relaxed max-w-2xl mx-auto" style={{ color: 'rgba(255,255,255,0.55)' }}>
              After years of industry experience, Karhari Media began investing heavily in developing its own technology infrastructure — building everything in-house.
            </p>
          </div>
        </ScrollReveal>

        {/* Main two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 items-start">

          {/* LEFT COLUMN */}
          <ScrollReveal direction="left">
            <div className="flex flex-col gap-3">
              {/* Left tech boxes */}
              {techListLeft?.map((item, i) =>
                <div key={i} className="relative rounded-xl overflow-hidden" style={{
                  background: `linear-gradient(135deg, ${item?.color}0d 0%, rgba(5,5,12,0.95) 100%)`,
                  border: `1px solid ${item?.color}25`
                }}>
                  <div className="absolute top-0 left-0 right-0 h-0.5 overflow-hidden z-10">
                    <div className="h-full w-1/3" style={{ background: `linear-gradient(to right, transparent, ${item?.color}, transparent)`, animation: `bt-topSlide ${2 + i * 0.1}s linear infinite` }} />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 overflow-hidden z-10">
                    <div className="h-full w-1/3" style={{ background: `linear-gradient(to right, transparent, ${item?.color}, transparent)`, animation: `bt-bottomSlide ${2 + i * 0.1}s linear infinite`, animationDelay: `${i * 0.15}s` }} />
                  </div>
                  <div className="absolute top-0 left-0 bottom-0 w-0.5 overflow-hidden z-10">
                    <div className="w-full h-1/3" style={{ background: `linear-gradient(to bottom, transparent, ${item?.color}, transparent)`, animation: `bt-leftSlide ${2 + i * 0.1}s linear infinite`, animationDelay: `${i * 0.1}s` }} />
                  </div>
                  <div className="absolute top-0 right-0 bottom-0 w-0.5 overflow-hidden z-10">
                    <div className="w-full h-1/3" style={{ background: `linear-gradient(to bottom, transparent, ${item?.color}, transparent)`, animation: `bt-rightSlide ${2 + i * 0.1}s linear infinite`, animationDelay: `${i * 0.2}s` }} />
                  </div>
                  <div className="absolute top-1 left-1 w-2.5 h-2.5 border-t border-l z-20" style={{ borderColor: item?.color, opacity: 0.8, animation: 'bt-cornerPulse 2s ease-in-out infinite' }} />
                  <div className="absolute bottom-1 right-1 w-2.5 h-2.5 border-b border-r z-20" style={{ borderColor: item?.color, opacity: 0.8, animation: `bt-cornerPulse 2s ease-in-out infinite ${i * 0.2}s` }} />
                  <div className="relative z-10 flex items-center gap-3 px-4 py-3">
                    <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: item?.color, boxShadow: `0 0 6px ${item?.color}`, animation: 'bt-boxGlow 1.5s ease-in-out infinite' }} />
                    <span className="text-sm font-medium" style={{ color: 'rgba(255,255,255,0.8)' }}>{item?.label}</span>
                  </div>
                  <div className="absolute inset-0 pointer-events-none" style={{ background: `radial-gradient(ellipse at left center, ${item?.color}08 0%, transparent 60%)` }} />
                </div>
              )}

              {/* Achievement box at bottom of left column */}
              <div className="relative rounded-2xl overflow-hidden mt-1" style={{
                background: 'linear-gradient(135deg, rgba(139,92,246,0.1) 0%, rgba(6,182,212,0.07) 50%, rgba(5,5,12,0.95) 100%)',
                border: '1px solid rgba(139,92,246,0.3)'
              }}>
                <div className="absolute top-0 left-0 right-0 h-0.5 overflow-hidden z-10">
                  <div className="h-full w-1/2" style={{ background: 'linear-gradient(to right, transparent, #8b5cf6, #06b6d4, transparent)', animation: 'bt-topSlide 3s linear infinite' }} />
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-0.5 overflow-hidden z-10">
                  <div className="h-full w-1/2" style={{ background: 'linear-gradient(to right, transparent, #06b6d4, #8b5cf6, transparent)', animation: 'bt-bottomSlide 3s linear infinite' }} />
                </div>
                <div className="absolute top-0 left-0 bottom-0 w-0.5 overflow-hidden z-10">
                  <div className="w-full h-1/2" style={{ background: 'linear-gradient(to bottom, transparent, #e8192c, transparent)', animation: 'bt-leftSlide 3s linear infinite' }} />
                </div>
                <div className="absolute top-0 right-0 bottom-0 w-0.5 overflow-hidden z-10">
                  <div className="w-full h-1/2" style={{ background: 'linear-gradient(to bottom, transparent, #2563eb, transparent)', animation: 'bt-rightSlide 3s linear infinite' }} />
                </div>
                <div className="absolute top-2 left-2 w-5 h-5 border-t-2 border-l-2 z-20" style={{ borderColor: '#8b5cf6', animation: 'bt-cornerPulse 2.5s ease-in-out infinite' }} />
                <div className="absolute top-2 right-2 w-5 h-5 border-t-2 border-r-2 z-20" style={{ borderColor: '#06b6d4', animation: 'bt-cornerPulse 2.5s ease-in-out infinite 0.6s' }} />
                <div className="absolute bottom-2 left-2 w-5 h-5 border-b-2 border-l-2 z-20" style={{ borderColor: '#2563eb', animation: 'bt-cornerPulse 2.5s ease-in-out infinite 1.2s' }} />
                <div className="absolute bottom-2 right-2 w-5 h-5 border-b-2 border-r-2 z-20" style={{ borderColor: '#e8192c', animation: 'bt-cornerPulse 2.5s ease-in-out infinite 1.8s' }} />
                <div className="absolute top-0 right-0 w-24 h-24 rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(6,182,212,0.2) 0%, transparent 70%)', transform: 'translate(30%, -30%)' }} />
                <div className="absolute bottom-0 left-0 w-20 h-20 rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.2) 0%, transparent 70%)', transform: 'translate(-30%, 30%)' }} />
                <div className="relative z-10 p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 rounded-full" style={{ background: '#8b5cf6', boxShadow: '0 0 6px rgba(139,92,246,0.8)', animation: 'bt-boxGlow 1.5s ease-in-out infinite' }} />
                    <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: '#c4b5fd' }}>Our Achievement</span>
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.7)' }}>
                    Over the following years, we successfully developed our own professional music distribution platform, allowing us to operate through our own distribution software, technology, and licensing infrastructure.
                  </p>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* RIGHT COLUMN */}
          <ScrollReveal direction="right">
            <div className="flex flex-col gap-3">
              {/* Photo with lighting animation */}
              <div className="relative mb-1">
                <div className="absolute -inset-4 rounded-3xl pointer-events-none" style={{
                  background: 'radial-gradient(ellipse at center, rgba(139,92,246,0.25) 0%, rgba(6,182,212,0.15) 50%, transparent 70%)',
                  animation: 'bt-bgPulse 4s ease-in-out infinite'
                }} />
                <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.6) 0%, transparent 70%)', animation: 'bt-floatOrb 3s ease-in-out infinite' }} />
                <div className="absolute -top-4 -right-4 w-10 h-10 rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(6,182,212,0.6) 0%, transparent 70%)', animation: 'bt-floatOrb 3.5s ease-in-out infinite 0.8s' }} />
                <div className="absolute -bottom-4 -left-4 w-10 h-10 rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(37,99,235,0.6) 0%, transparent 70%)', animation: 'bt-floatOrb 4s ease-in-out infinite 1.5s' }} />
                <div className="absolute -bottom-4 -right-4 w-12 h-12 rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(236,72,153,0.5) 0%, transparent 70%)', animation: 'bt-floatOrb 3.2s ease-in-out infinite 2s' }} />

                <div className="relative rounded-2xl overflow-hidden" style={{
                  border: '2px solid rgba(139,92,246,0.5)',
                  animation: 'bt-photoGlow 4s ease-in-out infinite'
                }}>
                  <div className="absolute top-0 left-0 right-0 h-0.5 overflow-hidden z-10">
                    <div className="h-full w-1/2" style={{ background: 'linear-gradient(to right, transparent, #8b5cf6, #06b6d4, transparent)', animation: 'bt-topSlide 2.5s linear infinite' }} />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 overflow-hidden z-10">
                    <div className="h-full w-1/2" style={{ background: 'linear-gradient(to right, transparent, #06b6d4, #8b5cf6, transparent)', animation: 'bt-bottomSlide 2.5s linear infinite' }} />
                  </div>
                  <div className="absolute top-0 left-0 bottom-0 w-0.5 overflow-hidden z-10">
                    <div className="w-full h-1/2" style={{ background: 'linear-gradient(to bottom, transparent, #e8192c, #8b5cf6, transparent)', animation: 'bt-leftSlide 2.5s linear infinite' }} />
                  </div>
                  <div className="absolute top-0 right-0 bottom-0 w-0.5 overflow-hidden z-10">
                    <div className="w-full h-1/2" style={{ background: 'linear-gradient(to bottom, transparent, #2563eb, #06b6d4, transparent)', animation: 'bt-rightSlide 2.5s linear infinite' }} />
                  </div>
                  <div className="absolute top-3 left-3 w-7 h-7 border-t-2 border-l-2 z-20" style={{ borderColor: '#8b5cf6', borderRadius: '4px 0 0 0', animation: 'bt-cornerPulse 2s ease-in-out infinite' }} />
                  <div className="absolute top-3 right-3 w-7 h-7 border-t-2 border-r-2 z-20" style={{ borderColor: '#06b6d4', borderRadius: '0 4px 0 0', animation: 'bt-cornerPulse 2s ease-in-out infinite 0.5s' }} />
                  <div className="absolute bottom-3 left-3 w-7 h-7 border-b-2 border-l-2 z-20" style={{ borderColor: '#2563eb', borderRadius: '0 0 0 4px', animation: 'bt-cornerPulse 2s ease-in-out infinite 1s' }} />
                  <div className="absolute bottom-3 right-3 w-7 h-7 border-b-2 border-r-2 z-20" style={{ borderColor: '#e8192c', borderRadius: '0 0 4px 0', animation: 'bt-cornerPulse 2s ease-in-out infinite 1.5s' }} />
                  <div className="absolute left-0 right-0 h-px z-20 pointer-events-none" style={{
                    background: 'linear-gradient(to right, transparent, rgba(139,92,246,0.6), transparent)',
                    animation: 'bt-scanLine 3s linear infinite'
                  }} />
                  <AppImage
                    src="https://img.rocket.new/generatedImages/rocket_gen_img_10cc0312d-1772149863959.png"
                    alt="Advanced technology circuit board with glowing blue and purple lights representing digital innovation and music tech infrastructure"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    style={{ aspectRatio: '4/3', minHeight: '240px' }} />
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(139,92,246,0.2) 0%, transparent 50%, rgba(6,182,212,0.15) 100%)' }} />
                </div>
              </div>

              {/* Right tech boxes — fill remaining space */}
              {techListRight?.map((item, i) =>
                <div key={i} className="relative rounded-xl overflow-hidden" style={{
                  background: `linear-gradient(135deg, ${item?.color}0d 0%, rgba(5,5,12,0.95) 100%)`,
                  border: `1px solid ${item?.color}25`
                }}>
                  <div className="absolute top-0 left-0 right-0 h-0.5 overflow-hidden z-10">
                    <div className="h-full w-1/3" style={{ background: `linear-gradient(to right, transparent, ${item?.color}, transparent)`, animation: `bt-topSlide ${2.2 + i * 0.1}s linear infinite` }} />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 overflow-hidden z-10">
                    <div className="h-full w-1/3" style={{ background: `linear-gradient(to right, transparent, ${item?.color}, transparent)`, animation: `bt-bottomSlide ${2.2 + i * 0.1}s linear infinite`, animationDelay: `${i * 0.15}s` }} />
                  </div>
                  <div className="absolute top-0 left-0 bottom-0 w-0.5 overflow-hidden z-10">
                    <div className="w-full h-1/3" style={{ background: `linear-gradient(to bottom, transparent, ${item?.color}, transparent)`, animation: `bt-leftSlide ${2.2 + i * 0.1}s linear infinite`, animationDelay: `${i * 0.1}s` }} />
                  </div>
                  <div className="absolute top-0 right-0 bottom-0 w-0.5 overflow-hidden z-10">
                    <div className="w-full h-1/3" style={{ background: `linear-gradient(to bottom, transparent, ${item?.color}, transparent)`, animation: `bt-rightSlide ${2.2 + i * 0.1}s linear infinite`, animationDelay: `${i * 0.2}s` }} />
                  </div>
                  <div className="absolute top-1 left-1 w-2.5 h-2.5 border-t border-l z-20" style={{ borderColor: item?.color, opacity: 0.8, animation: 'bt-cornerPulse 2s ease-in-out infinite' }} />
                  <div className="absolute bottom-1 right-1 w-2.5 h-2.5 border-b border-r z-20" style={{ borderColor: item?.color, opacity: 0.8, animation: `bt-cornerPulse 2s ease-in-out infinite ${i * 0.2}s` }} />
                  <div className="relative z-10 flex items-center gap-3 px-4 py-3">
                    <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: item?.color, boxShadow: `0 0 6px ${item?.color}`, animation: 'bt-boxGlow 1.5s ease-in-out infinite' }} />
                    <span className="text-sm font-medium" style={{ color: 'rgba(255,255,255,0.8)' }}>{item?.label}</span>
                  </div>
                  <div className="absolute inset-0 pointer-events-none" style={{ background: `radial-gradient(ellipse at left center, ${item?.color}08 0%, transparent 60%)` }} />
                </div>
              )}

              {/* Karhari Media Music Distribution branded box — fills empty bottom-right space */}
              <div className="relative rounded-2xl overflow-hidden mt-1" style={{
                background: 'linear-gradient(135deg, rgba(232,25,44,0.12) 0%, rgba(139,92,246,0.08) 50%, rgba(5,5,12,0.95) 100%)',
                border: '1px solid rgba(232,25,44,0.3)'
              }}>
                <div className="absolute top-0 left-0 right-0 h-0.5 overflow-hidden z-10">
                  <div className="h-full w-1/2" style={{ background: 'linear-gradient(to right, transparent, #e8192c, #8b5cf6, transparent)', animation: 'bt-topSlide 3s linear infinite' }} />
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-0.5 overflow-hidden z-10">
                  <div className="h-full w-1/2" style={{ background: 'linear-gradient(to right, transparent, #8b5cf6, #e8192c, transparent)', animation: 'bt-bottomSlide 3s linear infinite' }} />
                </div>
                <div className="absolute top-0 left-0 bottom-0 w-0.5 overflow-hidden z-10">
                  <div className="w-full h-1/2" style={{ background: 'linear-gradient(to bottom, transparent, #e8192c, transparent)', animation: 'bt-leftSlide 3s linear infinite' }} />
                </div>
                <div className="absolute top-0 right-0 bottom-0 w-0.5 overflow-hidden z-10">
                  <div className="w-full h-1/2" style={{ background: 'linear-gradient(to bottom, transparent, #8b5cf6, transparent)', animation: 'bt-rightSlide 3s linear infinite' }} />
                </div>
                <div className="absolute top-2 left-2 w-5 h-5 border-t-2 border-l-2 z-20" style={{ borderColor: '#e8192c', animation: 'bt-cornerPulse 2.5s ease-in-out infinite' }} />
                <div className="absolute top-2 right-2 w-5 h-5 border-t-2 border-r-2 z-20" style={{ borderColor: '#8b5cf6', animation: 'bt-cornerPulse 2.5s ease-in-out infinite 0.6s' }} />
                <div className="absolute bottom-2 left-2 w-5 h-5 border-b-2 border-l-2 z-20" style={{ borderColor: '#8b5cf6', animation: 'bt-cornerPulse 2.5s ease-in-out infinite 1.2s' }} />
                <div className="absolute bottom-2 right-2 w-5 h-5 border-b-2 border-r-2 z-20" style={{ borderColor: '#e8192c', animation: 'bt-cornerPulse 2.5s ease-in-out infinite 1.8s' }} />
                <div className="absolute top-0 right-0 w-28 h-28 rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(232,25,44,0.18) 0%, transparent 70%)', transform: 'translate(30%, -30%)' }} />
                <div className="absolute bottom-0 left-0 w-24 h-24 rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.18) 0%, transparent 70%)', transform: 'translate(-30%, 30%)' }} />
                <div className="relative z-10 p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-2 h-2 rounded-full" style={{ background: '#e8192c', boxShadow: '0 0 6px rgba(232,25,44,0.8)', animation: 'bt-boxGlow 1.5s ease-in-out infinite' }} />
                    <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: '#fca5a5' }}>Karhari Media</span>
                  </div>
                  <h4 className="text-sm font-bold mb-2" style={{ background: 'linear-gradient(135deg, #e8192c 0%, #8b5cf6 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                    Global Music Distribution Platform
                  </h4>
                  <p className="text-xs leading-relaxed mb-3" style={{ color: 'rgba(255,255,255,0.65)' }}>
                    Karhari Media's proprietary distribution platform delivers your music to 150+ global digital stores — Spotify, Apple Music, Amazon Music, YouTube Music, JioSaavn, Gaana, and more — with real-time royalty tracking and transparent reporting.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {['150+ Platforms', 'Real-Time Royalties', 'Global Reach', 'Artist First']?.map((tag, t) => (
                      <span key={t} className="text-xs px-2 py-0.5 rounded-full" style={{
                        background: t % 2 === 0 ? 'rgba(232,25,44,0.12)' : 'rgba(139,92,246,0.12)',
                        border: `1px solid ${t % 2 === 0 ? 'rgba(232,25,44,0.3)' : 'rgba(139,92,246,0.3)'}`,
                        color: t % 2 === 0 ? '#fca5a5' : '#c4b5fd'
                      }}>{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
