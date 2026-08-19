'use client';

import React, { useEffect, useRef } from 'react';

const platforms = [
  'Spotify', 'Apple Music', 'YouTube Music', 'Amazon Music', 'JioSaavn',
  'Gaana', 'Hungama', 'Wynk Music', 'Tidal', 'Deezer',
  'SoundCloud', 'iTunes', 'Pandora', 'TikTok', 'Facebook Audio Library',
  'Instagram Reels', 'Beatport', 'Resso', 'Audiomack', 'Napster',
  'YouTube Content ID', 'Facebook Rights Manager', 'Boomplay', 'iHeartRadio', 'Anghami',
];

export default function PlatformsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.section-enter').forEach((el, i) => {
              setTimeout(() => el.classList.add('visible'), i * 80);
            });
          }
        });
      },
      { threshold: 0.1 }
    );
    if (sectionRef?.current) observer?.observe(sectionRef?.current);
    return () => observer?.disconnect();
  }, []);

  return (
    <section id="platforms" ref={sectionRef} className="py-10 sm:py-16 lg:py-24 border-y border-border bg-secondary/30 relative overflow-hidden">
      {/* Background texture */}
      <div className="absolute inset-0 blob-bg opacity-20 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12 lg:mb-16 section-enter">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-3 block">
            Distribution Network
          </span>
          <h2 className="text-section-title font-extrabold text-foreground mb-4">
            Your Music,<br className="sm:hidden" /> Everywhere
          </h2>
          <p className="text-muted-foreground font-medium max-w-xl mx-auto text-sm sm:text-base">
            One submission. 40+ platforms. We ensure your tracks reach every corner of the globe — from India to the world.
          </p>
        </div>

        {/* Platform pills — responsive wrap grid */}
        <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2 lg:gap-3 section-enter stagger-2">
          {platforms?.map((platform, i) => (
            <span
              key={platform}
              className="platform-pill"
              style={{ transitionDelay: `${i * 30}ms` }}
            >
              {platform}
            </span>
          ))}
          <span className="platform-pill border-primary/30 text-primary font-semibold">
            + More Platforms
          </span>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-8 sm:mt-10 lg:mt-12 section-enter stagger-3">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-bold text-sm sm:text-base px-6 sm:px-8 py-3 sm:py-4 rounded-full hover:bg-primary/90 transition-all duration-200 lime-glow group"
          >
            Get Distributed Today
            <svg className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}