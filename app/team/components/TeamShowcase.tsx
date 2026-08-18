'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';

interface TeamMember {
  id: number;
  name: string;
  role: string;
  department: string;
  cardGradient: string;
  glowColor: string;
  ringColors: string[];
  photo: string;
  alt: string;
  description: string;
}

const row1Members: TeamMember[] = [
{
  id: 1,
  name: 'SHEKH TABREJ',
  role: 'Company Director / CEO',
  department: 'LEADERSHIP',
  cardGradient: 'linear-gradient(160deg, #1a0533 0%, #120228 60%, #0d0120 100%)',
  glowColor: '#FFB347',
  ringColors: ['#FFB347', '#FF8C00', '#FFD700'],
  photo: "/assets/images/1786350541870.jpg-1786350578512.jpeg",
  alt: 'Rajveer Singhania, CEO of Karhari Media, professional portrait in dark studio',
  description: 'This person established Karhari Media in 2014 and gave it an identity, A veteran of over 17 years in the Rights Management and Digital Music Distribution industry on YouTube.'
},
{
  id: 2,
  name: 'Ananya Krishnamurthy',
  role: 'Creative Director',
  department: 'ARTIST SUPPORT',
  cardGradient: 'linear-gradient(160deg, #0d1a3a 0%, #081228 60%, #050c1e 100%)',
  glowColor: '#C084FC',
  ringColors: ['#C084FC', '#A855F7', '#E879F9'],
  photo: "/assets/images/ananya_krishnamurthy.png",
  alt: 'Ananya Krishnamurthy, Creative Director, young Indian woman with dark hair, professional portrait with warm studio lighting',
  description: 'Award-winning creative mind shaping brand identity and visual storytelling for artists and campaigns.'
},
{
  id: 3,
  name: 'Vikram Mehrotra',
  role: 'Operations Director',
  department: 'ARTIST SUPPORT',
  cardGradient: 'linear-gradient(160deg, #001a2e 0%, #001020 60%, #000c18 100%)',
  glowColor: '#38BDF8',
  ringColors: ['#38BDF8', '#0EA5E9', '#7DD3FC'],
  photo: "/assets/images/vikram_mehrotra.png",
  alt: 'Vikram Mehrotra, Operations Director, young Indian man in formal business suit, professional business portrait',
  description: 'Oversees day-to-day operations ensuring seamless workflow across all departments and artist pipelines.'
},
{
  id: 4,
  name: 'Priyanka Nambiar',
  role: 'Head of Legal',
  department: 'LEGAL TEAM',
  cardGradient: 'linear-gradient(160deg, #001a18 0%, #001210 60%, #000d0b 100%)',
  glowColor: '#34D399',
  ringColors: ['#34D399', '#10B981', '#6EE7B7'],
  photo: "/assets/images/priyanka_nambiar.png",
  alt: 'Priyanka Nambiar, Head of Legal, young Indian woman in formal blazer, professional formal portrait',
  description: 'Expert in entertainment law and IP rights. Protects artist contracts and ensures full regulatory compliance.'
},
{
  id: 5,
  name: 'Shekh Tanveer',
  role: 'Company Director / Head of Content Review / Label Manager',
  department: 'COMPANY DIRECTOR / HEAD OF CONTENT REVIEW / LABEL MANAGER',
  cardGradient: 'linear-gradient(160deg, #1a0a2e 0%, #120620 60%, #0d0418 100%)',
  glowColor: '#FB923C',
  ringColors: ['#FB923C', '#F97316', '#FED7AA'],
  photo: "/assets/images/ChatGPT_Image_Aug_10__2026__02_34_05_PM__1_-1786354289611.png",
  alt: 'Shekh Tanveer, Company Director / Head of Content Review / Label Manager, professional portrait',
  description: 'He is also a director of the company and is also the head of the content review team and is the head of all the labels managers and is also called the managing head in the position related to music distribution.'
},
{
  id: 6,
  name: 'Swati Bhattacharya',
  role: 'Senior Content Reviewer',
  department: 'LABEL MANAGER',
  cardGradient: 'linear-gradient(160deg, #1a0520 0%, #120318 60%, #0d0212 100%)',
  glowColor: '#F472B6',
  ringColors: ['#F472B6', '#EC4899', '#FBCFE8'],
  photo: "/assets/images/swati_bhattacharya.png",
  alt: 'Swati Bhattacharya, Senior Content Reviewer, young Indian woman with dark hair, professional portrait with soft lighting',
  description: 'Meticulous reviewer with deep knowledge of content guidelines. Mentors junior reviewers and handles escalations.'
},
{
  id: 13,
  name: 'Ishaan Kapoor',
  role: 'Brand Manager',
  department: 'LEGAL TEAM',
  cardGradient: 'linear-gradient(160deg, #0a1a2e 0%, #061220 60%, #040c18 100%)',
  glowColor: '#67E8F9',
  ringColors: ['#67E8F9', '#22D3EE', '#A5F3FC'],
  photo: "/assets/images/ishaan_kapoor.png",
  alt: 'Ishaan Kapoor, Brand Manager, young Indian man in modern smart casual outfit, professional portrait in modern office',
  description: 'Drives brand consistency and visual identity across all Karhari Media campaigns and artist partnerships.'
}];


const row2Members: TeamMember[] = [
{
  id: 7,
  name: 'Samiyul Tamang',
  role: 'Company Director / CEO',
  department: 'Company Director / CEO',
  cardGradient: 'linear-gradient(160deg, #001228 0%, #000c1e 60%, #000814 100%)',
  glowColor: '#60A5FA',
  ringColors: ['#60A5FA', '#3B82F6', '#93C5FD'],
  photo: "/assets/images/file_0000000063a08211a7f92c6d18ef3774-1786353052621.png",
  alt: 'Samiyul Tamang, Company Director / CEO, professional portrait',
  description: 'The person who carries out all the work of Karhari Media Company holds the position of Director and CEO in the company and apart from this he also holds the position of Managing Head.'
},
{
  id: 8,
  name: 'Meera Venkataraman',
  role: 'Support Lead',
  department: 'DIGITAL MUSIC DISTRIBUTION',
  cardGradient: 'linear-gradient(160deg, #0a1a00 0%, #061200 60%, #040d00 100%)',
  glowColor: '#A3E635',
  ringColors: ['#A3E635', '#84CC16', '#D9F99D'],
  photo: "/assets/images/meera_venkataraman.png",
  alt: 'Meera Venkataraman, Support Lead, young Indian woman in professional blazer, confident expression',
  description: 'Heads the customer support division, resolving artist queries and maintaining high satisfaction scores.'
},
{
  id: 9,
  name: 'Arjun Tiwari',
  role: 'Artist Manager',
  department: 'YOUTUBE PARTNER MANAGER',
  cardGradient: 'linear-gradient(160deg, #1a0010 0%, #120008 60%, #0d0006 100%)',
  glowColor: '#FB7185',
  ringColors: ['#FB7185', '#F43F5E', '#FECDD3'],
  photo: "/assets/images/arjun_tiwari.png",
  alt: 'Arjun Tiwari, Artist Manager, young Indian man in smart casual shirt, professional portrait in creative studio',
  description: 'Manages a roster of emerging artists, coordinating releases, promotions, and brand partnerships.'
},
{
  id: 10,
  name: 'Nandita Pillai',
  role: 'Artist Manager',
  department: 'YOUTUBE PARTNER MANAGER',
  cardGradient: 'linear-gradient(160deg, #1a1000 0%, #120a00 60%, #0d0700 100%)',
  glowColor: '#FBBF24',
  ringColors: ['#FBBF24', '#F59E0B', '#FDE68A'],
  photo: "/assets/images/nandita_pillai.png",
  alt: 'Nandita Pillai, Artist Manager, young Indian woman in professional blazer, warm studio lighting portrait',
  description: 'Passionate advocate for artists, building long-term careers through strategic planning and industry connections.'
},
{
  id: 11,
  name: 'Md Sahid Miya',
  role: 'Company Director',
  department: 'YOUTUBE CHANNEL MANAGER / CMS/MCN',
  cardGradient: 'linear-gradient(160deg, #001a1a 0%, #001212 60%, #000d0d 100%)',
  glowColor: '#2DD4BF',
  ringColors: ['#2DD4BF', '#14B8A6', '#99F6E4'],
  photo: "/assets/images/WhatsApp_Image_2026-08-10_at_14.27.16-1786353848720.jpeg",
  alt: 'Md Sahid Miya, Company Director, young Indian man in formal suit, professional business portrait',
  description: "He is a director of the company and is the management head of all the YouTube channels managed on YouTube through the company's YouTube CMS and multi-channel network."
},
{
  id: 12,
  name: 'Lavanya Gopalan',
  role: 'Brand Strategist',
  department: 'YOUTUBE CHANNEL MANAGER / CMS/MCN',
  cardGradient: 'linear-gradient(160deg, #1a0a1a 0%, #120612 60%, #0d040d 100%)',
  glowColor: '#E879F9',
  ringColors: ['#E879F9', '#D946EF', '#F5D0FE'],
  photo: "/assets/images/lavanya_gopalan.png",
  alt: 'Lavanya Gopalan, Brand Strategist, young Indian woman in bright professional outfit, creative studio portrait',
  description: 'Crafts compelling brand narratives for artists and the Karhari Media identity across digital platforms.'
},
{
  id: 14,
  name: 'Priya Sharma',
  role: 'Digital Marketing Lead',
  department: 'MARKETING',
  cardGradient: 'linear-gradient(160deg, #1a0a00 0%, #120700 60%, #0d0500 100%)',
  glowColor: '#FCA5A5',
  ringColors: ['#FCA5A5', '#F87171', '#FEE2E2'],
  photo: "/assets/images/priya_sharma.png",
  alt: 'Priya Sharma, Digital Marketing Lead, young Indian woman in stylish professional outfit, studio portrait',
  description: 'Leads digital campaigns and social media strategy, amplifying artist reach across all major platforms.'
}];


/* Snake border canvas — draws a thin glowing snake that travels around the card border */
function SnakeBorderCanvas({ glowColor, ringColors }: { glowColor: string; ringColors: string[] }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const progressRef = useRef<number>(Math.random()); // random start position

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const SNAKE_LENGTH = 0.28; // fraction of perimeter
    const SPEED = 0.0018;
    const TRAIL_SEGMENTS = 60;

    const colors = [glowColor, ringColors[0], ringColors[1], ringColors[2], glowColor];

    const getPerimeterPoint = (t: number, w: number, h: number, r: number) => {
      // t in [0,1] travels around the rounded rect
      const perim = 2 * (w + h) - 8 * r + 2 * Math.PI * r;
      const dist = ((t % 1) + 1) % 1 * perim;

      // Segments: top, top-right corner, right, bottom-right, bottom, bottom-left, left, top-left
      const seg = [
        w - 2 * r,           // top straight
        Math.PI / 2 * r,     // top-right corner
        h - 2 * r,           // right straight
        Math.PI / 2 * r,     // bottom-right corner
        w - 2 * r,           // bottom straight
        Math.PI / 2 * r,     // bottom-left corner
        h - 2 * r,           // left straight
        Math.PI / 2 * r,     // top-left corner
      ];

      let acc = 0;
      for (let i = 0; i < seg.length; i++) {
        if (dist <= acc + seg[i]) {
          const local = dist - acc;
          switch (i) {
            case 0: return { x: r + local, y: 0 };
            case 1: {
              const angle = -Math.PI / 2 + (local / seg[i]) * (Math.PI / 2);
              return { x: w - r + Math.cos(angle) * r, y: r + Math.sin(angle) * r };
            }
            case 2: return { x: w, y: r + local };
            case 3: {
              const angle = (local / seg[i]) * (Math.PI / 2);
              return { x: w - r + Math.cos(angle) * r, y: h - r + Math.sin(angle) * r };
            }
            case 4: return { x: w - r - local, y: h };
            case 5: {
              const angle = Math.PI / 2 + (local / seg[i]) * (Math.PI / 2);
              return { x: r + Math.cos(angle) * r, y: h - r + Math.sin(angle) * r };
            }
            case 6: return { x: 0, y: h - r - local };
            case 7: {
              const angle = Math.PI + (local / seg[i]) * (Math.PI / 2);
              return { x: r + Math.cos(angle) * r, y: r + Math.sin(angle) * r };
            }
          }
        }
        acc += seg[i];
      }
      return { x: r, y: 0 };
    };

    const draw = () => {
      const w = canvas.width;
      const h = canvas.height;
      const r = 16; // border-radius matching card

      ctx.clearRect(0, 0, w, h);

      progressRef.current = (progressRef.current + SPEED) % 1;
      const head = progressRef.current;

      // Draw trail from tail to head
      for (let i = 0; i < TRAIL_SEGMENTS; i++) {
        const frac = i / TRAIL_SEGMENTS;
        const t = ((head - SNAKE_LENGTH * frac) + 2) % 1;
        const pt = getPerimeterPoint(t, w, h, r);

        // Color cycles through ringColors
        const colorIdx = Math.floor(frac * colors.length);
        const color = colors[Math.min(colorIdx, colors.length - 1)];

        // Opacity: bright at head, fades at tail
        const alpha = frac * 0.9 + 0.05;
        const lineWidth = (1 - frac) * 3.5 + 0.5;

        if (i > 0) {
          const prevT = ((head - SNAKE_LENGTH * ((i - 1) / TRAIL_SEGMENTS)) + 2) % 1;
          const prevPt = getPerimeterPoint(prevT, w, h, r);

          // Glow layer
          ctx.beginPath();
          ctx.moveTo(prevPt.x, prevPt.y);
          ctx.lineTo(pt.x, pt.y);
          ctx.strokeStyle = color;
          ctx.lineWidth = lineWidth + 4;
          ctx.globalAlpha = alpha * 0.18;
          ctx.lineCap = 'round';
          ctx.stroke();

          // Core line
          ctx.beginPath();
          ctx.moveTo(prevPt.x, prevPt.y);
          ctx.lineTo(pt.x, pt.y);
          ctx.strokeStyle = color;
          ctx.lineWidth = lineWidth;
          ctx.globalAlpha = alpha;
          ctx.lineCap = 'round';
          ctx.stroke();
        }
      }

      // Bright head spark
      const headPt = getPerimeterPoint(head, w, h, r);
      ctx.globalAlpha = 1;
      const spark = ctx.createRadialGradient(headPt.x, headPt.y, 0, headPt.x, headPt.y, 7);
      spark.addColorStop(0, '#ffffff');
      spark.addColorStop(0.3, glowColor);
      spark.addColorStop(1, glowColor + '00');
      ctx.beginPath();
      ctx.arc(headPt.x, headPt.y, 7, 0, Math.PI * 2);
      ctx.fillStyle = spark;
      ctx.fill();

      ctx.globalAlpha = 1;
      animRef.current = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(animRef.current);
  }, [glowColor, ringColors]);

  return (
    <canvas
      ref={canvasRef}
      width={224}
      height={420}
      className="absolute inset-0 pointer-events-none rounded-2xl"
      style={{ zIndex: 5 }}
      aria-hidden="true"
    />
  );
}

/* Spinning logo badge for each card */
function SpinningLogoBadge({ ringColors }: {ringColors: string[];}) {
  return (
    <div className="absolute bottom-3 right-3 z-20" style={{ width: 44, height: 44 }}>
      <div
        className="absolute inset-0 rounded-full spin-ring"
        style={{
          background: `conic-gradient(${ringColors[0]}, ${ringColors[1]}, ${ringColors[2]}, ${ringColors[0]})`,
          padding: 2
        }}>
        
        <div className="w-full h-full rounded-full" style={{ background: '#080818' }} />
      </div>
      <div
        className="absolute rounded-full spin-ring-reverse"
        style={{
          inset: 3,
          background: `conic-gradient(transparent 30%, ${ringColors[2]}80 50%, transparent 70%)`,
          borderRadius: '50%'
        }} />
      
      <div
        className="absolute rounded-full overflow-hidden"
        style={{ inset: 5, background: '#080818' }}>
        
        <Image
          src="/assets/images/1608452013412__1_-1786345250703.png"
          alt="Karhari Media Logo"
          width={34}
          height={34}
          className="w-full h-full object-cover rounded-full"
          unoptimized />
        
      </div>
    </div>);

}

function TeamCard({ member }: {member: TeamMember;}) {
  return (
    <div
      className="team-card flex-shrink-0 mx-3 rounded-2xl overflow-hidden relative group"
      style={{
        width: '224px',
        background: member.cardGradient,
        border: `1px solid ${member.glowColor}30`,
        boxShadow: `0 4px 30px rgba(0,0,0,0.8), 0 0 0 1px ${member.glowColor}18`
      }}>
      
      {/* Snake border visualizer */}
      <SnakeBorderCanvas glowColor={member.glowColor} ringColors={member.ringColors} />

      {/* Top glow line */}
      <div
        className="absolute top-0 left-4 right-4 h-px pulse-glow"
        style={{ background: `linear-gradient(to right, transparent, ${member.glowColor}90, transparent)` }}
        aria-hidden="true" />
      

      {/* Photo */}
      <div className="relative w-full overflow-hidden" style={{ height: '220px' }}>
        <img
          src={member.photo}
          alt={member.alt}
          className="w-full h-full object-cover object-top"
          style={{ filter: 'brightness(0.9) contrast(1.08) saturate(1.15)' }} />
        
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to top, ${member.cardGradient.match(/#[0-9A-Fa-f]{6}/)?.[0] ?? '#080818'} 0%, rgba(8,8,24,0.5) 40%, transparent 70%)`
          }}
          aria-hidden="true" />
        
        <div
          className="absolute top-3 left-3 px-2 py-0.5 rounded-full text-[9px] font-bold tracking-widest uppercase"
          style={{
            background: 'rgba(8,8,24,0.88)',
            color: member.glowColor,
            border: `1px solid ${member.glowColor}50`
          }}>
          
          {member.department}
        </div>
      </div>

      {/* Info below photo */}
      <div className="px-4 pt-3 pb-5 relative z-10">
        <h3
          className="text-base font-bold leading-tight mb-0.5"
          style={{ color: '#EEF0FF', fontFamily: 'var(--font-sans)' }}>
          
          {member.name}
        </h3>
        <p
          className="text-xs font-semibold mb-2"
          style={{ color: member.glowColor, letterSpacing: '0.02em' }}>
          
          {member.role}
        </p>
        <p
          className="text-xs leading-relaxed"
          style={{ color: 'rgba(220,220,255,0.45)', fontFamily: 'var(--font-sans)' }}>
          
          {member.description}
        </p>
      </div>

      <SpinningLogoBadge ringColors={member.ringColors} />
    </div>);

}

/* Static row — no scrolling */
function InfiniteScrollRow({ members }: {members: TeamMember[];direction: 'left' | 'right';}) {
  return (
    <div className="relative overflow-x-auto">
      <div className="flex gap-4 px-4">
        {members.map((member) =>
        <TeamCard key={member.id} member={member} />
        )}
      </div>
    </div>
  );
}

/* Visualizer component */
function AudioVisualizer({ color }: {color: string;}) {
  const bars = [
  { cls: 'viz-bar-1', h: '60%' },
  { cls: 'viz-bar-2', h: '80%' },
  { cls: 'viz-bar-3', h: '40%' },
  { cls: 'viz-bar-4', h: '90%' },
  { cls: 'viz-bar-5', h: '55%' },
  { cls: 'viz-bar-6', h: '70%' },
  { cls: 'viz-bar-7', h: '45%' },
  { cls: 'viz-bar-8', h: '85%' }];

  return (
    <div className="flex items-end gap-0.5" style={{ height: 28 }}>
      {bars.map((b, i) =>
      <div
        key={i}
        className={`${b.cls} rounded-full`}
        style={{
          width: 3,
          height: b.h,
          background: color,
          opacity: 0.8
        }} />

      )}
    </div>);

}

export default function TeamShowcase() {
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    const children = el.querySelectorAll('.header-anim');
    children.forEach((child, i) => {
      const c = child as HTMLElement;
      c.style.opacity = '0';
      c.style.transform = 'translateY(30px)';
      setTimeout(() => {
        c.style.transition = 'opacity 0.9s cubic-bezier(0.2,0.8,0.2,1), transform 0.9s cubic-bezier(0.2,0.8,0.2,1)';
        c.style.opacity = '1';
        c.style.transform = 'translateY(0)';
      }, 200 + i * 150);
    });
  }, []);

  return (
    <section className="km-team-section relative min-h-screen overflow-hidden">

      {/* Header */}
      <div ref={headerRef} className="text-center mb-14 px-4">

        <div className="header-anim flex items-center justify-between w-full max-w-4xl mx-auto mb-4 px-4">

          {/* LEFT — Karhari Media logo icon with spinning ring */}
          <div className="relative flex-shrink-0" style={{ width: 96, height: 96 }}>
            <div
              className="absolute inset-0 rounded-full spin-ring"
              style={{
                background: 'conic-gradient(#8B5CF6, #38BDF8, #34D399, #FBBF24, #F472B6, #8B5CF6)',
                padding: 4
              }}>
              <div className="w-full h-full rounded-full" style={{ background: '#080818' }} />
            </div>
            <div
              className="absolute rounded-full spin-ring-reverse"
              style={{
                inset: 5,
                background: 'conic-gradient(transparent 25%, rgba(139,92,246,0.8) 50%, transparent 75%)',
                borderRadius: '50%'
              }} />
            <div
              className="absolute rounded-full overflow-hidden"
              style={{ inset: 9, background: '#080818' }}>
              <Image
                src="/assets/images/1608452013412__1_-1786345250703.png"
                alt="Karhari Media Logo"
                width={78}
                height={78}
                className="w-full h-full object-cover rounded-full"
                unoptimized
                priority />
            </div>
          </div>

          {/* CENTER — Title + visualizers */}
          <div className="flex items-center gap-4 flex-1 justify-center">
            <AudioVisualizer color="#8B5CF6" />
            <h2
              className="font-display text-5xl sm:text-6xl md:text-7xl font-bold text-[rgba(255,252,240,1)]"
              style={{
                background: 'linear-gradient(135deg, #EEF0FF 0%, #C4B5FD 50%, #93C5FD 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                textShadow: 'none',
                letterSpacing: '-0.02em'
              }}>
              Our Team
            </h2>
            <AudioVisualizer color="#38BDF8" />
          </div>

          {/* RIGHT — YouTube icon with spinning ring */}
          <div className="relative flex-shrink-0" style={{ width: 96, height: 96 }}>
            <div
              className="absolute inset-0 rounded-full spin-ring"
              style={{
                background: 'conic-gradient(#FF0000, #FF4444, #FF8888, #FF0000, #CC0000, #FF0000)',
                padding: 4
              }}>
              <div className="w-full h-full rounded-full" style={{ background: '#080818' }} />
            </div>
            <div
              className="absolute rounded-full spin-ring-reverse"
              style={{
                inset: 5,
                background: 'conic-gradient(transparent 25%, rgba(255,0,0,0.8) 50%, transparent 75%)',
                borderRadius: '50%'
              }} />
            <div
              className="absolute rounded-full overflow-hidden flex items-center justify-center"
              style={{ inset: 9, background: '#080818' }}>
              <svg viewBox="0 0 24 24" width="46" height="46" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814z"
                  fill="#FF0000" />
                <path d="M9.545 15.568V8.432L15.818 12l-6.273 3.568z" fill="#ffffff" />
              </svg>
            </div>
          </div>

        </div>

        <p
          className="header-anim text-sm sm:text-base max-w-md mx-auto"
          style={{ color: 'rgba(200,210,255,0.5)', fontFamily: 'var(--font-sans)', lineHeight: '1.7' }}>
          
          The people behind Karhari Media — creators, strategists, and advocates building the future of music.
        </p>

        <div className="header-anim flex items-center justify-center gap-4 mt-8">
          <div className="h-px w-24" style={{ background: 'linear-gradient(to right, transparent, rgba(139,92,246,0.6))' }} />
          <div className="w-2 h-2 rounded-full pulse-glow" style={{ background: '#8B5CF6' }} />
          <div className="h-px w-24" style={{ background: 'linear-gradient(to left, transparent, rgba(56,189,248,0.6))' }} />
        </div>
      </div>

      {/* Row 1 — scrolls left to right */}
      <div className="mb-6">
        <InfiniteScrollRow members={row1Members} direction="right" />
      </div>

      {/* Row 2 — scrolls right to left */}
      <div>
        <InfiniteScrollRow members={row2Members} direction="left" />
      </div>

    </section>);

}