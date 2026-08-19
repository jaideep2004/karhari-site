'use client';

import React from 'react';

export default function TitleBanner() {
  return (
    <section className="relative pt-24 pb-4 sm:pt-32 sm:pb-6 lg:pt-36 lg:pb-8 overflow-hidden">
      {/* Background orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] orb-lime opacity-60" />
        <div className="absolute top-0 left-1/4 w-[400px] h-[300px] orb-blue opacity-50" />
        <div className="absolute top-0 right-1/4 w-[400px] h-[300px] orb-pink opacity-40" />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(12)]?.map((_, i) => (
          <div
            key={i}
            className="absolute w-1.5 h-1.5 rounded-full"
            style={{
              left: `${8 + i * 8}%`,
              bottom: '10%',
              background: ['#CCFF00', '#1A6BFF', '#FF00C8', '#00FFB4', '#FF8C00']?.[i % 5],
              animation: `particle-float ${3 + (i % 4)}s ease-in-out infinite`,
              animationDelay: `${i * 0.4}s`,
              opacity: 0.7,
            }}
          />
        ))}
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 text-center">
        <span className="inline-block text-xs font-semibold uppercase tracking-[0.2em] sm:tracking-[0.25em] text-primary mb-4 sm:mb-5 px-3 sm:px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10">
          Karhari Media Pvt. Ltd. · Contractor Portal
        </span>

        <h1
          className="rainbow-title font-extrabold leading-tight mb-4 sm:mb-6"
          style={{ fontSize: 'clamp(1.8rem, 6vw, 6rem)', letterSpacing: '-0.03em' }}
        >
          Contact us from<br className="hidden sm:block" /> Karhari Media!
        </h1>

        <p className="text-muted-foreground font-medium max-w-2xl mx-auto text-sm sm:text-base lg:text-lg leading-relaxed px-2 sm:px-0">
          India&apos;s premier music distribution partner — connecting artists and record labels to the world&apos;s biggest platforms.
        </p>

        <div className="mt-4 sm:mt-6 flex items-center justify-center gap-2 sm:gap-3">
          <div className="h-px w-10 sm:w-16 bg-gradient-to-r from-transparent to-primary/60" />
          <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-primary animate-pulse" />
          <div className="h-px w-20 sm:w-32 bg-gradient-to-r from-primary/60 via-blue-500/60 to-pink-500/60" />
          <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-blue-500 animate-pulse" style={{ animationDelay: '0.5s' }} />
          <div className="h-px w-10 sm:w-16 bg-gradient-to-l from-transparent to-pink-500/60" />
        </div>
      </div>
    </section>
  );
}