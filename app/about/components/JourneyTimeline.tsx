'use client';

import React, { useEffect, useRef } from 'react';

const timelineEvents = [
  {
    year: '2014',
    title: 'The Vision',
    description: 'Karhari Media name was created by Mr. Shekh Tabrej.',
    color: '#e8192c',
    glow: 'rgba(232,25,44,0.5)',
    bg: 'rgba(232,25,44,0.08)',
    borderAnim: '0s',
    snakeDelay: '0s',
  },
  {
    year: '2014 – 2017',
    title: 'Building Relationships',
    description: 'Signed agreements with artists & labels. Started producing original music.',
    color: '#f97316',
    glow: 'rgba(249,115,22,0.5)',
    bg: 'rgba(249,115,22,0.08)',
    borderAnim: '0.3s',
    snakeDelay: '0.4s',
  },
  {
    year: '2017 – 2020',
    title: 'Working with Partners',
    description: 'Distributed music through Believe Music, MusicMaster, Bquate Music & others.',
    color: '#7c3aed',
    glow: 'rgba(124,58,237,0.5)',
    bg: 'rgba(124,58,237,0.08)',
    borderAnim: '0.6s',
    snakeDelay: '0.8s',
  },
  {
    year: '2020',
    title: 'Website Launch',
    description: 'Secured karharimedia.com domain and launched our official website.',
    color: '#2563eb',
    glow: 'rgba(37,99,235,0.5)',
    bg: 'rgba(37,99,235,0.08)',
    borderAnim: '0.9s',
    snakeDelay: '1.2s',
  },
  {
    year: '2022',
    title: 'Company Registered',
    description: 'Karhari Media registered with Government of India.',
    color: '#06b6d4',
    glow: 'rgba(6,182,212,0.5)',
    bg: 'rgba(6,182,212,0.08)',
    borderAnim: '1.2s',
    snakeDelay: '1.6s',
  },
  {
    year: '2024 Onwards',
    title: 'Building Our Own Tech',
    description: 'Investing in our own technology infrastructure and distribution platform.',
    color: '#10b981',
    glow: 'rgba(16,185,129,0.5)',
    bg: 'rgba(16,185,129,0.08)',
    borderAnim: '1.5s',
    snakeDelay: '2.0s',
  },
];

export default function JourneyTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mobileRef = useRef<HTMLDivElement>(null);
  const vizCanvasRef = useRef<HTMLCanvasElement>(null);

  // Lighting visualizer background
  useEffect(() => {
    const canvas = vizCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const barColors = [
      '#e8192c', '#f97316', '#7c3aed', '#2563eb', '#06b6d4', '#10b981',
      '#e8192c', '#f97316', '#7c3aed', '#2563eb', '#06b6d4', '#10b981',
    ];
    const barCount = 48;
    const bars: { height: number; targetHeight: number; speed: number; colorIdx: number }[] = [];
    for (let i = 0; i < barCount; i++) {
      bars.push({
        height: Math.random() * 0.4,
        targetHeight: Math.random() * 0.5 + 0.05,
        speed: 0.012 + Math.random() * 0.018,
        colorIdx: i % barColors.length,
      });
    }

    let animId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const barW = canvas.width / barCount;

      bars.forEach((bar, i) => {
        // Smoothly animate toward target
        bar.height += (bar.targetHeight - bar.height) * bar.speed;
        if (Math.abs(bar.height - bar.targetHeight) < 0.005) {
          bar.targetHeight = Math.random() * 0.55 + 0.05;
        }

        const bh = bar.height * canvas.height * 0.7;
        const x = i * barW + barW * 0.15;
        const w = barW * 0.7;
        const y = canvas.height - bh;

        // Gradient bar
        const grad = ctx.createLinearGradient(x, y, x, canvas.height);
        const col = barColors[bar.colorIdx];
        grad.addColorStop(0, col + 'cc');
        grad.addColorStop(0.5, col + '66');
        grad.addColorStop(1, col + '11');
        ctx.fillStyle = grad;
        ctx.globalAlpha = 0.55;
        ctx.beginPath();
        ctx.roundRect(x, y, w, bh, 2);
        ctx.fill();

        // Top glow dot
        ctx.beginPath();
        ctx.arc(x + w / 2, y, w * 0.6, 0, Math.PI * 2);
        ctx.fillStyle = col;
        ctx.globalAlpha = 0.35;
        ctx.fill();
      });

      // Horizontal reflection line
      ctx.globalAlpha = 0.12;
      ctx.fillStyle = 'rgba(255,255,255,0.08)';
      ctx.fillRect(0, canvas.height - 2, canvas.width, 2);

      ctx.globalAlpha = 1;
      animId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  useEffect(() => {
    const allCards = [
      ...(containerRef.current?.querySelectorAll('.timeline-card') || []),
      ...(mobileRef.current?.querySelectorAll('.timeline-card') || []),
    ];

    allCards.forEach((card) => {
      (card as HTMLElement).style.opacity = '0';
      (card as HTMLElement).style.transform = 'translateY(30px)';
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = parseInt((entry.target as HTMLElement).dataset.idx || '0');
            setTimeout(() => {
              (entry.target as HTMLElement).style.transition =
                'opacity 0.7s cubic-bezier(0.22,1,0.36,1), transform 0.7s cubic-bezier(0.22,1,0.36,1)';
              (entry.target as HTMLElement).style.opacity = '1';
              (entry.target as HTMLElement).style.transform = 'translateY(0)';
            }, idx * 140);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    allCards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-20 relative overflow-hidden" style={{ background: 'linear-gradient(180deg, #0a0d1a 0%, #0f0a1a 50%, #0a0a0f 100%)' }}>

      <style>{`
        /* ── Snake border for each CARD ── */
        @keyframes cardSnake {
          0%   { stroke-dashoffset: 0; }
          100% { stroke-dashoffset: -600; }
        }
        @keyframes cardSnake2 {
          0%   { stroke-dashoffset: -150; }
          100% { stroke-dashoffset: -750; }
        }
        @keyframes cardSnake3 {
          0%   { stroke-dashoffset: -300; }
          100% { stroke-dashoffset: -900; }
        }
        @keyframes cardSnake4 {
          0%   { stroke-dashoffset: -450; }
          100% { stroke-dashoffset: -1050; }
        }

        @keyframes borderGlow {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
        @keyframes dotPulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.4); }
        }

        .card-snake-svg {
          position: absolute;
          inset: -2px;
          width: calc(100% + 4px);
          height: calc(100% + 4px);
          pointer-events: none;
          z-index: 10;
          overflow: visible;
        }
        .card-snake-svg rect {
          fill: none;
          stroke-width: 1.2;
          stroke-linecap: round;
          stroke-dasharray: 18 582;
        }

        .timeline-card-inner {
          position: relative;
          overflow: visible;
        }
        .timeline-card-inner::after {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 1px;
          background: var(--card-color);
          box-shadow: 0 0 8px var(--card-color);
          animation: borderGlow 2s ease-in-out infinite;
          border-radius: 8px 8px 0 0;
        }
      `}</style>

      {/* Lighting visualizer canvas background */}
      <canvas
        ref={vizCanvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ opacity: 0.45 }}
      />

      {/* Static background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(37,99,235,0.6), rgba(124,58,237,0.6), transparent)' }} />
        <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(124,58,237,0.6), rgba(16,185,129,0.5), transparent)' }} />
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.3) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section wrapper — no snake border, just subtle styling */}
        <div className="relative rounded-2xl sm:rounded-3xl p-4 sm:p-8" style={{
          background: 'rgba(10,10,20,0.6)',
          border: '1px solid rgba(124,58,237,0.15)',
          boxShadow: '0 0 60px rgba(37,99,235,0.08), 0 0 120px rgba(124,58,237,0.05)',
        }}>

          {/* Section header */}
          <div className="text-center mb-8 sm:mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-4 text-xs font-semibold tracking-widest uppercase" style={{ background: 'rgba(37,99,235,0.12)', border: '1px solid rgba(37,99,235,0.4)', color: '#60a5fa' }}>
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
              Milestones
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Our Journey{' '}
              <span style={{ background: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 50%, #e8192c 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                Timeline
              </span>
            </h2>
          </div>

          {/* Desktop horizontal timeline — 6 equal-size cards */}
          <div className="hidden lg:block relative" ref={containerRef}>
            {/* Animated connecting line */}
            <div className="absolute top-8 left-0 right-0 h-0.5" style={{ background: 'linear-gradient(to right, #e8192c, #f97316, #7c3aed, #2563eb, #06b6d4, #10b981)', boxShadow: '0 0 16px rgba(124,58,237,0.6)', animation: 'borderGlow 2s ease-in-out infinite' }} />

            <div className="grid grid-cols-6 gap-4">
              {timelineEvents.map((event, i) => (
                <div
                  key={event.year}
                  className="timeline-card flex flex-col items-center text-center"
                  data-idx={i}
                >
                  {/* Animated dot */}
                  <div
                    className="relative z-10 w-5 h-5 rounded-full border-2 mb-4 flex-shrink-0"
                    style={{
                      background: event.color,
                      borderColor: '#0a0a0f',
                      boxShadow: `0 0 0 3px ${event.color}30, 0 0 20px ${event.glow}`,
                      animation: `dotPulse 2s ease-in-out infinite ${event.borderAnim}`,
                    }}
                  />
                  {/* Card with snake border — all same height */}
                  <div
                    className="timeline-card-inner rounded-xl p-4 w-full transition-all duration-300 hover:scale-105"
                    style={{
                      '--card-color': event.color,
                      '--card-glow': event.glow,
                      background: event.bg,
                      border: `1px solid ${event.color}40`,
                      boxShadow: `0 4px 20px ${event.glow}20`,
                      minHeight: '140px',
                    } as React.CSSProperties}
                  >
                    {/* Snake SVG around each card */}
                    <svg className="card-snake-svg" viewBox="0 0 100 100" preserveAspectRatio="none">
                      <rect x="1.5" y="1.5" width="97" height="97" rx="8"
                        stroke={event.color}
                        style={{ strokeDashoffset: 0, animation: `cardSnake 8s linear infinite ${event.snakeDelay}` }}
                      />
                      <rect x="1.5" y="1.5" width="97" height="97" rx="8"
                        stroke={event.color}
                        strokeOpacity="0.5"
                        style={{ strokeDashoffset: -150, animation: `cardSnake2 8s linear infinite ${event.snakeDelay}` }}
                      />
                      <rect x="1.5" y="1.5" width="97" height="97" rx="8"
                        stroke={event.color}
                        strokeOpacity="0.3"
                        style={{ strokeDashoffset: -300, animation: `cardSnake3 8s linear infinite ${event.snakeDelay}` }}
                      />
                      <rect x="1.5" y="1.5" width="97" height="97" rx="8"
                        stroke={event.color}
                        strokeOpacity="0.15"
                        style={{ strokeDashoffset: -450, animation: `cardSnake4 8s linear infinite ${event.snakeDelay}` }}
                      />
                    </svg>

                    <div className="text-xs font-bold mb-1.5" style={{ color: event.color }}>
                      {event.year}
                    </div>
                    <div className="text-sm font-bold text-white mb-2">{event.title}</div>
                    <div className="text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.6)' }}>{event.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tablet grid timeline — 3 columns */}
          <div className="hidden md:grid lg:hidden grid-cols-3 gap-5">
            {timelineEvents.map((event, i) => (
              <div
                key={event.year}
                className="timeline-card flex flex-col items-center text-center"
                data-idx={i}
              >
                <div
                  className="relative z-10 w-4 h-4 rounded-full border-2 mb-3 flex-shrink-0"
                  style={{
                    background: event.color,
                    borderColor: '#0a0a0f',
                    boxShadow: `0 0 0 3px ${event.color}30, 0 0 16px ${event.glow}`,
                    animation: `dotPulse 2s ease-in-out infinite ${event.borderAnim}`,
                  }}
                />
                <div
                  className="timeline-card-inner rounded-xl p-3 w-full"
                  style={{
                    '--card-color': event.color,
                    '--card-glow': event.glow,
                    background: event.bg,
                    border: `1px solid ${event.color}40`,
                    boxShadow: `0 4px 20px ${event.glow}20`,
                    minHeight: '120px',
                  } as React.CSSProperties}
                >
                  <svg className="card-snake-svg" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <rect x="1.5" y="1.5" width="97" height="97" rx="8"
                      stroke={event.color}
                      style={{ strokeDashoffset: 0, animation: `cardSnake 8s linear infinite ${event.snakeDelay}` }}
                    />
                    <rect x="1.5" y="1.5" width="97" height="97" rx="8"
                      stroke={event.color}
                      strokeOpacity="0.4"
                      style={{ strokeDashoffset: -150, animation: `cardSnake2 8s linear infinite ${event.snakeDelay}` }}
                    />
                  </svg>
                  <div className="text-xs font-bold mb-1" style={{ color: event.color }}>{event.year}</div>
                  <div className="text-xs font-bold text-white mb-1">{event.title}</div>
                  <div className="text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.6)' }}>{event.description}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile vertical timeline */}
          <div className="md:hidden space-y-5" ref={mobileRef}>
            {timelineEvents.map((event, i) => (
              <div
                key={event.year}
                className="timeline-card flex gap-4"
                data-idx={i}
              >
                <div className="flex flex-col items-center">
                  <div
                    className="w-4 h-4 rounded-full flex-shrink-0 mt-1"
                    style={{ background: event.color, boxShadow: `0 0 12px ${event.glow}`, animation: `dotPulse 2s ease-in-out infinite ${event.borderAnim}` }}
                  />
                  {i < timelineEvents.length - 1 && (
                    <div className="w-px flex-1 mt-2" style={{ background: `linear-gradient(to bottom, ${event.color}60, ${timelineEvents[i + 1].color}40)` }} />
                  )}
                </div>
                <div
                  className="timeline-card-inner rounded-xl p-4 flex-1 transition-all duration-300"
                  style={{
                    '--card-color': event.color,
                    '--card-glow': event.glow,
                    background: event.bg,
                    border: `1px solid ${event.color}40`,
                    borderLeftColor: event.color,
                    borderLeftWidth: '2px',
                    boxShadow: `0 4px 20px ${event.glow}15`,
                  } as React.CSSProperties}
                >
                  {/* Snake SVG around each mobile card */}
                  <svg className="card-snake-svg" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <rect x="1.5" y="1.5" width="97" height="97" rx="8"
                      stroke={event.color}
                      style={{ strokeDashoffset: 0, animation: `cardSnake 8s linear infinite ${event.snakeDelay}` }}
                    />
                    <rect x="1.5" y="1.5" width="97" height="97" rx="8"
                      stroke={event.color}
                      strokeOpacity="0.4"
                      style={{ strokeDashoffset: -150, animation: `cardSnake2 8s linear infinite ${event.snakeDelay}` }}
                    />
                  </svg>

                  <div className="text-xs font-bold mb-1" style={{ color: event.color }}>{event.year}</div>
                  <div className="text-sm font-bold text-white mb-1">{event.title}</div>
                  <div className="text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.6)' }}>{event.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}