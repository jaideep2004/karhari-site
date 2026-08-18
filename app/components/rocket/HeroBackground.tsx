'use client';
import { useEffect, useRef } from 'react';

export default function HeroBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animFrameId: number;
    let time = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const lasers = [
      { x1: 0.0, y1: 0.55, x2: 0.58, y2: 0.28, color: 'rgba(0,229,255,0.16)', width: 1.5 },
      { x1: 0.0, y1: 0.72, x2: 0.62, y2: 0.18, color: 'rgba(160,0,255,0.13)', width: 1 },
      { x1: 0.05, y1: 0.88, x2: 0.52, y2: 0.12, color: 'rgba(0,200,255,0.11)', width: 1 },
      { x1: 0.0, y1: 0.35, x2: 0.48, y2: 0.62, color: 'rgba(255,0,200,0.09)', width: 1 },
      { x1: 0.12, y1: 1.0, x2: 0.5, y2: 0.38, color: 'rgba(80,0,255,0.11)', width: 1.2 },
      { x1: 0.0, y1: 0.45, x2: 0.55, y2: 0.75, color: 'rgba(0,255,180,0.08)', width: 0.8 },
    ];

    const draw = () => {
      const W = canvas.width;
      const H = canvas.height;
      time += 0.018;

      ctx.fillStyle = '#0d0b1e';
      ctx.fillRect(0, 0, W, H);

      // Deep blue/purple radial glow center-right
      const grd = ctx.createRadialGradient(W * 0.72, H * 0.45, 0, W * 0.72, H * 0.45, W * 0.55);
      grd.addColorStop(0, 'rgba(80,20,160,0.55)');
      grd.addColorStop(0.5, 'rgba(20,10,60,0.3)');
      grd.addColorStop(1, 'transparent');
      ctx.fillStyle = grd;
      ctx.fillRect(0, 0, W, H);

      // Laser beams
      lasers.forEach((laser, i) => {
        const sweep = Math.sin(time * 0.4 + i * 1.2) * 0.07;
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(laser.x1 * W, (laser.y1 + sweep) * H);
        ctx.lineTo(laser.x2 * W, (laser.y2 - sweep * 0.5) * H);
        ctx.strokeStyle = laser.color;
        ctx.lineWidth = laser.width;
        ctx.shadowColor = laser.color.replace(/[\d.]+[)]$/, '0.9)');
        ctx.shadowBlur = 22;
        ctx.stroke();
        ctx.restore();
      });

      // Floating laser particles
      for (let i = 0; i < 20; i++) {
        const px = (Math.sin(time * 0.3 + i * 2.1) * 0.5 + 0.5) * W * 0.65;
        const py = (Math.cos(time * 0.2 + i * 1.7) * 0.5 + 0.5) * H * 0.8;
        const hue = 180 + (i * 15) % 140;
        const alpha = 0.3 + Math.sin(time + i) * 0.2;
        ctx.beginPath();
        ctx.arc(px, py, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${hue}, 100%, 70%, ${alpha})`;
        ctx.shadowColor = `hsla(${hue}, 100%, 70%, 0.8)`;
        ctx.shadowBlur = 12;
        ctx.fill();
      }

      // --- SCAN GRID OVERLAY (subtle tech grid across full canvas) ---
      ctx.save();
      ctx.strokeStyle = 'rgba(0,229,255,0.04)';
      ctx.lineWidth = 0.5;
      const gridSize = 60;
      for (let x = 0; x < W; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, H);
        ctx.stroke();
      }
      for (let y = 0; y < H; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(W, y);
        ctx.stroke();
      }
      ctx.restore();

      // --- HORIZONTAL SCAN LINE sweeping top to bottom ---
      const scanY = ((Math.sin(time * 0.5) * 0.5 + 0.5)) * H;
      const scanGrd = ctx.createLinearGradient(0, scanY - 60, 0, scanY + 60);
      scanGrd.addColorStop(0, 'rgba(0,229,255,0)');
      scanGrd.addColorStop(0.4, 'rgba(0,229,255,0.06)');
      scanGrd.addColorStop(0.5, 'rgba(0,229,255,0.22)');
      scanGrd.addColorStop(0.6, 'rgba(0,229,255,0.06)');
      scanGrd.addColorStop(1, 'rgba(0,229,255,0)');
      ctx.save();
      ctx.fillStyle = scanGrd;
      ctx.fillRect(0, scanY - 60, W, 120);
      // Bright scan line edge
      ctx.beginPath();
      ctx.moveTo(0, scanY);
      ctx.lineTo(W, scanY);
      ctx.strokeStyle = 'rgba(0,229,255,0.55)';
      ctx.lineWidth = 1.5;
      ctx.shadowColor = 'rgba(0,229,255,0.9)';
      ctx.shadowBlur = 18;
      ctx.stroke();
      ctx.restore();

      animFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animFrameId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ display: 'block' }}
      />

      {/* Vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 35%, rgba(0,0,0,0.6) 100%)',
        }}
      />

      {/* ── FINGERPRINT SCANNER OVERLAY ── */}
      <FingerprintScanner />
    </div>
  );
}

function FingerprintScanner() {
  return (
    <>
      {/* Corner bracket — top-left */}
      <div className="absolute top-4 left-4 pointer-events-none" style={{ zIndex: 2 }}>
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
          <path d="M2 20 L2 2 L20 2" stroke="rgba(0,229,255,0.7)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
      {/* Corner bracket — top-right */}
      <div className="absolute top-4 right-4 pointer-events-none" style={{ zIndex: 2 }}>
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
          <path d="M46 20 L46 2 L28 2" stroke="rgba(0,229,255,0.7)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
      {/* Corner bracket — bottom-left */}
      <div className="absolute bottom-4 left-4 pointer-events-none" style={{ zIndex: 2 }}>
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
          <path d="M2 28 L2 46 L20 46" stroke="rgba(0,229,255,0.7)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
      {/* Corner bracket — bottom-right */}
      <div className="absolute bottom-4 right-4 pointer-events-none" style={{ zIndex: 2 }}>
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
          <path d="M46 28 L46 46 L28 46" stroke="rgba(0,229,255,0.7)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>

      {/* Status text — top-left HUD */}
      <div
        className="absolute top-6 left-16 pointer-events-none font-mono text-xs tracking-widest"
        style={{ color: 'rgba(0,229,255,0.55)', zIndex: 2, letterSpacing: '0.2em' }}
      >
        SCANNING · SECURE
      </div>
      {/* Status text — top-right HUD */}
      <div
        className="absolute top-6 right-16 pointer-events-none font-mono text-xs tracking-widest text-right"
        style={{ color: 'rgba(0,229,255,0.55)', zIndex: 2, letterSpacing: '0.2em' }}
      >
        PROTECTED · ACTIVE
      </div>

      {/* Bottom-left HUD data */}
      <div
        className="absolute bottom-6 left-16 pointer-events-none font-mono text-xs"
        style={{ color: 'rgba(0,229,255,0.4)', zIndex: 2, letterSpacing: '0.15em' }}
      >
        SYS · VERIFIED
      </div>
      {/* Bottom-right HUD data */}
      <div
        className="absolute bottom-6 right-16 pointer-events-none font-mono text-xs text-right"
        style={{ color: 'rgba(0,229,255,0.4)', zIndex: 2, letterSpacing: '0.15em' }}
      >
        ENCRYPTED · 256-BIT
      </div>

      {/* Fingerprint scanner centered in hero */}
      <div
        className="absolute pointer-events-none"
        style={{
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 2,
          width: 220,
          height: 220,
        }}
      >
        {/* Outer pulsing ring 1 */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            border: '1.5px solid rgba(0,229,255,0.18)',
            animation: 'fpPulse1 3s ease-in-out infinite',
            transform: 'scale(1.55)',
          }}
        />
        {/* Outer pulsing ring 2 */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            border: '1px solid rgba(0,229,255,0.10)',
            animation: 'fpPulse2 3s ease-in-out infinite 1s',
            transform: 'scale(1.9)',
          }}
        />
        {/* Outer pulsing ring 3 */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            border: '1px solid rgba(0,229,255,0.06)',
            animation: 'fpPulse1 3s ease-in-out infinite 2s',
            transform: 'scale(2.3)',
          }}
        />

        {/* Main fingerprint circle border */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            border: '2px solid rgba(0,229,255,0.35)',
            boxShadow: '0 0 24px rgba(0,229,255,0.2), inset 0 0 24px rgba(0,229,255,0.06)',
          }}
        />

        {/* Fingerprint SVG */}
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{ opacity: 0.55 }}
        >
          <svg
            width="120"
            height="120"
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Fingerprint ridge lines — concentric arcs */}
            <path d="M50 18 C32 18 18 32 18 50" stroke="rgba(0,229,255,0.7)" strokeWidth="1.8" strokeLinecap="round" fill="none"/>
            <path d="M50 24 C35 24 24 35 24 50" stroke="rgba(0,229,255,0.65)" strokeWidth="1.6" strokeLinecap="round" fill="none"/>
            <path d="M50 30 C38 30 30 38 30 50" stroke="rgba(0,229,255,0.6)" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
            <path d="M50 36 C41 36 36 41 36 50" stroke="rgba(0,229,255,0.55)" strokeWidth="1.4" strokeLinecap="round" fill="none"/>
            <path d="M50 42 C44 42 42 44 42 50" stroke="rgba(0,229,255,0.5)" strokeWidth="1.3" strokeLinecap="round" fill="none"/>
            {/* Right side arcs */}
            <path d="M50 18 C68 18 82 32 82 50" stroke="rgba(0,229,255,0.7)" strokeWidth="1.8" strokeLinecap="round" fill="none"/>
            <path d="M50 24 C65 24 76 35 76 50" stroke="rgba(0,229,255,0.65)" strokeWidth="1.6" strokeLinecap="round" fill="none"/>
            <path d="M50 30 C62 30 70 38 70 50" stroke="rgba(0,229,255,0.6)" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
            <path d="M50 36 C59 36 64 41 64 50" stroke="rgba(0,229,255,0.55)" strokeWidth="1.4" strokeLinecap="round" fill="none"/>
            <path d="M50 42 C56 42 58 44 58 50" stroke="rgba(0,229,255,0.5)" strokeWidth="1.3" strokeLinecap="round" fill="none"/>
            {/* Lower arcs */}
            <path d="M18 50 C18 68 32 82 50 82" stroke="rgba(0,229,255,0.65)" strokeWidth="1.6" strokeLinecap="round" fill="none"/>
            <path d="M24 50 C24 65 35 76 50 76" stroke="rgba(0,229,255,0.6)" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
            <path d="M30 50 C30 62 38 70 50 70" stroke="rgba(0,229,255,0.55)" strokeWidth="1.4" strokeLinecap="round" fill="none"/>
            <path d="M36 50 C36 59 41 64 50 64" stroke="rgba(0,229,255,0.5)" strokeWidth="1.3" strokeLinecap="round" fill="none"/>
            <path d="M82 50 C82 68 68 82 50 82" stroke="rgba(0,229,255,0.65)" strokeWidth="1.6" strokeLinecap="round" fill="none"/>
            <path d="M76 50 C76 65 65 76 50 76" stroke="rgba(0,229,255,0.6)" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
            <path d="M70 50 C70 62 62 70 50 70" stroke="rgba(0,229,255,0.55)" strokeWidth="1.4" strokeLinecap="round" fill="none"/>
            <path d="M64 50 C64 59 59 64 50 64" stroke="rgba(0,229,255,0.5)" strokeWidth="1.3" strokeLinecap="round" fill="none"/>
            {/* Center dot */}
            <circle cx="50" cy="50" r="3" fill="rgba(0,229,255,0.8)"/>
            <circle cx="50" cy="50" r="6" stroke="rgba(0,229,255,0.4)" strokeWidth="1.2" fill="none"/>
          </svg>
        </div>

        {/* Scan line sweeping over fingerprint */}
        <div
          className="absolute inset-0 rounded-full overflow-hidden"
          style={{ borderRadius: '50%' }}
        >
          <div
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              height: '3px',
              background: 'linear-gradient(90deg, transparent 0%, rgba(0,229,255,0.15) 20%, rgba(0,229,255,0.7) 50%, rgba(0,229,255,0.15) 80%, transparent 100%)',
              boxShadow: '0 0 12px rgba(0,229,255,0.8), 0 0 24px rgba(0,229,255,0.4)',
              animation: 'fpScan 2.4s ease-in-out infinite',
            }}
          />
        </div>

        {/* Lock icon at bottom of fingerprint circle */}
        <div
          className="absolute -bottom-8 left-1/2 -translate-x-1/2 font-mono text-xs tracking-widest"
          style={{ color: 'rgba(0,229,255,0.5)', whiteSpace: 'nowrap', letterSpacing: '0.2em' }}
        >
          ● IDENTITY VERIFIED
        </div>
      </div>

      {/* Inline keyframes */}
      <style>{`
        @keyframes fpScan {
          0%   { top: 5%; opacity: 0; }
          10%  { opacity: 1; }
          90%  { opacity: 1; }
          100% { top: 95%; opacity: 0; }
        }
        @keyframes fpPulse1 {
          0%, 100% { opacity: 0.6; transform: scale(1.55); }
          50%       { opacity: 0.15; transform: scale(1.65); }
        }
        @keyframes fpPulse2 {
          0%, 100% { opacity: 0.4; transform: scale(1.9); }
          50%       { opacity: 0.08; transform: scale(2.05); }
        }
      `}</style>
    </>
  );
}
