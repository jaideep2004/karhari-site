'use client';

import React, { useEffect, useRef, useState } from 'react';

interface StatItem {
  value: number;
  suffix: string;
  label: string;
  sublabel: string;
  liveIncrement: number;
}

const stats: StatItem[] = [
  {
    value: 800,
    suffix: '+',
    label: 'Active Channels',
    sublabel: 'Managed on YouTube Music CMS & Entertainment CMS',
    liveIncrement: 1,
  },
  {
    value: 150,
    suffix: 'M+',
    label: 'Total Subscribers',
    sublabel: 'Across all managed channels',
    liveIncrement: 1,
  },
  {
    value: 40,
    suffix: '+',
    label: 'Global Platforms',
    sublabel: 'Spotify, Apple, YouTube & more',
    liveIncrement: 0,
  },
  {
    value: 80,
    suffix: '%',
    label: 'Revenue to Artist',
    sublabel: 'Artist 80% · Record Label 80% · YouTube MCN 80% · Karhari Media 20%',
    liveIncrement: 0,
  },
];

function AnimatedCounter({
  value,
  suffix,
  duration = 4500,
  liveIncrement,
}: {
  value: number;
  suffix: string;
  duration?: number;
  liveIncrement: number;
}) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const [done, setDone] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);
  const liveRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    // Slow count-up: 60 steps over duration ms
    const steps = 60;
    const stepDuration = duration / steps;
    const increment = value / steps;
    let current = 0;
    const interval = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(interval);
        setDone(true);
      } else {
        setCount(Math.floor(current));
      }
    }, stepDuration);
    return () => clearInterval(interval);
  }, [started, value, duration]);

  // After count-up done, live increment every 2-3 seconds
  useEffect(() => {
    if (!done || liveIncrement === 0) return;
    let direction = 1;
    let step = 0;
    liveRef.current = setInterval(() => {
      step++;
      // Every 4 steps flip direction to give grow/shrink feel
      if (step % 4 === 0) direction = direction === 1 ? -1 : 1;
      setCount((prev) => {
        const next = prev + direction * liveIncrement;
        // Keep within ±5 of base value
        if (next > value + 5) return value + 4;
        if (next < value - 2) return value - 1;
        return next;
      });
    }, 2200);
    return () => {
      if (liveRef.current) clearInterval(liveRef.current);
    };
  }, [done, liveIncrement, value]);

  return (
    <span ref={ref} className="stat-number text-primary">
      {count.toLocaleString()}{suffix}
    </span>
  );
}

export default function StatsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.section-enter').forEach((el, i) => {
              setTimeout(() => el.classList.add('visible'), i * 100);
            });
          }
        });
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-8 sm:py-12 lg:py-14 border-b border-border relative overflow-hidden">
      {/* Colorful orbs */}
      <div className="absolute inset-0 blob-bg opacity-30 pointer-events-none" />
      <div className="absolute top-0 right-0 w-72 h-72 orb-blue opacity-30 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 orb-pink opacity-25 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8 section-enter">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-3 block">
            By The Numbers
          </span>
          <h2 className="text-section-title font-extrabold text-foreground">
            A Scale You Can Trust
          </h2>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={`section-enter stagger-${i + 1} bento-card neon-card p-4 sm:p-6 lg:p-8 flex flex-col`}
              style={{ animationDelay: `${i * 0.7}s` }}
            >
              <AnimatedCounter
                value={stat.value}
                suffix={stat.suffix}
                duration={4500}
                liveIncrement={stat.liveIncrement}
              />
              <p className="text-sm sm:text-base font-bold text-foreground mt-2 mb-1 leading-tight">{stat.label}</p>
              <p className="text-[10px] sm:text-xs text-muted-foreground font-medium leading-relaxed">{stat.sublabel}</p>
            </div>
          ))}
        </div>

        {/* Established badge */}
        <div className="mt-6 sm:mt-8 flex justify-center section-enter stagger-5">
          <div className="glass-card-lime rounded-full px-4 sm:px-6 py-2 sm:py-2.5 inline-flex items-center gap-2 sm:gap-3 text-center">
            <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-primary flex-shrink-0" />
            <span className="text-xs sm:text-sm font-semibold text-primary">
              Trusted partner for independent artists and record labels since 2014
            </span>
            <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-primary flex-shrink-0" />
          </div>
        </div>
      </div>
    </section>
  );
}