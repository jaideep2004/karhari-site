'use client';
import React, { useEffect, useRef, useState } from 'react';

const FacebookIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const InstagramIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);

const WhatsAppIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

function useIncrementingNumber(base: number, increment: number, interval: number) {
  const [value, setValue] = useState(base);
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  useEffect(() => {
    if (!mounted) return;
    const timer = setInterval(() => setValue(v => v + increment), interval);
    return () => clearInterval(timer);
  }, [mounted, increment, interval]);
  return value;
}

// ============================================================
// ADVANCED CENTRAL FINGERPRINT SCANNER CANVAS
// ============================================================
const AdvancedScannerCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const timeRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const setSize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      ctx.scale(dpr, dpr);
    };
    setSize();
    window.addEventListener('resize', setSize);

    interface AudioFile {
      id: number;
      x: number;
      y: number;
      vy: number;
      speed: number;
      size: number;
      color: string;
      label: string;
      phase: 'incoming' | 'scanning' | 'scanned' | 'delivering';
      scanProgress: number;
      opacity: number;
      wavePhase: number;
      targetY: number;
      deliverTarget: number; // 0=FB, 1=IG, 2=WA
    }

    let fileIdCounter = 0;
    const audioFiles: AudioFile[] = [];
    const trackNames = [
      'midnight_echo.mp3', 'lagos_night.wav', 'afrobeat.mp3', 'desert_wind.wav',
      'city_pulse.mp3', 'vocal_master.wav', 'bass_drop.mp3', 'remix_final.wav',
      'soul_track.mp3', 'urban_mix.wav', 'deep_house.mp3', 'acoustic_01.wav',
    ];
    const fileColors = ['#e85d26', '#ff8c42', '#1877F2', '#4da6ff', '#a855f7', '#22d3ee', '#25D366', '#f59e0b'];

    const spawnFile = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      const targetY = h * 0.15 + Math.random() * h * 0.7;
      audioFiles.push({
        id: fileIdCounter++,
        x: 8,
        y: targetY,
        vy: 0,
        speed: 0.5 + Math.random() * 0.8,
        size: 20 + Math.random() * 12,
        color: fileColors[Math.floor(Math.random() * fileColors.length)],
        label: trackNames[Math.floor(Math.random() * trackNames.length)],
        phase: 'incoming',
        scanProgress: 0,
        opacity: 0.8 + Math.random() * 0.2,
        wavePhase: Math.random() * Math.PI * 2,
        targetY,
        deliverTarget: Math.floor(Math.random() * 3),
      });
    };

    // Pre-populate
    for (let i = 0; i < 10; i++) {
      spawnFile();
      if (audioFiles[i]) {
        audioFiles[i].x = Math.random() * (canvas.offsetWidth * 0.35);
      }
    }

    const draw = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      ctx.clearRect(0, 0, w, h);
      timeRef.current += 0.016;
      const t = timeRef.current;

      // Deep dark background
      const bgGrad = ctx.createLinearGradient(0, 0, 0, h);
      bgGrad.addColorStop(0, 'rgba(3,5,15,0.98)');
      bgGrad.addColorStop(0.5, 'rgba(5,8,20,0.98)');
      bgGrad.addColorStop(1, 'rgba(3,5,15,0.98)');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, w, h);

      // Hex grid
      ctx.strokeStyle = 'rgba(24,119,242,0.035)';
      ctx.lineWidth = 0.5;
      const hexS = 24;
      for (let row = 0; row * hexS * 1.5 < h + hexS * 2; row++) {
        for (let col = 0; col * hexS * 1.73 < w + hexS * 2; col++) {
          const hx = col * hexS * 1.73 + (row % 2 === 0 ? 0 : hexS * 0.865);
          const hy = row * hexS * 1.5;
          ctx.beginPath();
          for (let i = 0; i < 6; i++) {
            let angle = (Math.PI / 3) * i - Math.PI / 6;
            const px = hx + hexS * 0.85 * Math.cos(angle);
            const py = hy + hexS * 0.85 * Math.sin(angle);
            if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
          }
          ctx.closePath();
          ctx.stroke();
        }
      }

      // Horizontal scan line sweeping top to bottom
      const scanY = ((t * 35) % (h + 60)) - 30;
      const scanLineGrad = ctx.createLinearGradient(0, scanY - 40, 0, scanY + 15);
      scanLineGrad.addColorStop(0, 'rgba(24,119,242,0)');
      scanLineGrad.addColorStop(0.7, 'rgba(24,119,242,0.08)');
      scanLineGrad.addColorStop(1, 'rgba(24,119,242,0.15)');
      ctx.fillStyle = scanLineGrad;
      ctx.fillRect(0, scanY - 40, w, 55);
      ctx.strokeStyle = 'rgba(24,119,242,0.5)';
      ctx.lineWidth = 1;
      ctx.shadowBlur = 8;
      ctx.shadowColor = '#1877F2';
      ctx.beginPath(); ctx.moveTo(0, scanY); ctx.lineTo(w, scanY); ctx.stroke();
      ctx.shadowBlur = 0;

      // ============================================================
      // CENTRAL FINGERPRINT SCANNER
      // ============================================================
      const cx = w / 2;
      const cy = h / 2;
      const scannerR = Math.min(w * 0.20, h * 0.36, 160);

      // Outer ambient glow rings
      for (let ring = 3; ring >= 1; ring--) {
        const rGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, scannerR * (1.2 + ring * 0.4));
        rGrad.addColorStop(0, `rgba(24,119,242,${0.06 / ring})`);
        rGrad.addColorStop(1, 'rgba(24,119,242,0)');
        ctx.fillStyle = rGrad;
        ctx.beginPath(); ctx.arc(cx, cy, scannerR * (1.2 + ring * 0.4), 0, Math.PI * 2); ctx.fill();
      }

      // Outer tech rings
      [1.35, 1.22, 1.12].forEach((mult, idx) => {
        ctx.beginPath();
        ctx.arc(cx, cy, scannerR * mult, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(24,119,242,${0.08 + idx * 0.04})`;
        ctx.lineWidth = idx === 0 ? 0.5 : 1;
        if (idx === 1) { ctx.setLineDash([6, 4]); }
        ctx.stroke();
        ctx.setLineDash([]);
      });

      // Rotating outer dashed ring
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(t * 0.5);
      ctx.beginPath();
      ctx.arc(0, 0, scannerR * 1.28, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(232,93,38,${0.2 + Math.sin(t) * 0.1})`;
      ctx.lineWidth = 1.5;
      ctx.setLineDash([10, 5]);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.restore();

      // Counter-rotating inner ring
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(-t * 0.3);
      ctx.beginPath();
      ctx.arc(0, 0, scannerR * 1.05, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(77,166,255,${0.15 + Math.sin(t * 1.5) * 0.08})`;
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 8]);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.restore();

      // Corner brackets
      const bSize = scannerR * 0.28;
      const bDist = scannerR * 1.32;
      const bracketAlpha = 0.5 + Math.sin(t * 1.5) * 0.2;
      [
        { x: cx - bDist, y: cy - bDist, sx: 1, sy: 1 },
        { x: cx + bDist, y: cy - bDist, sx: -1, sy: 1 },
        { x: cx + bDist, y: cy + bDist, sx: -1, sy: -1 },
        { x: cx - bDist, y: cy + bDist, sx: 1, sy: -1 },
      ].forEach(c => {
        ctx.strokeStyle = `rgba(24,119,242,${bracketAlpha})`;
        ctx.lineWidth = 2.5;
        ctx.shadowBlur = 6;
        ctx.shadowColor = '#1877F2';
        ctx.beginPath();
        ctx.moveTo(c.x, c.y + bSize * c.sy);
        ctx.lineTo(c.x, c.y);
        ctx.lineTo(c.x + bSize * c.sx, c.y);
        ctx.stroke();
        ctx.shadowBlur = 0;
      });

      // Fingerprint concentric rings with organic distortion
      for (let ring = 1; ring <= 22; ring++) {
        const baseR = ring * (scannerR / 22);
        const distAmp = ring * 0.6;
        const alpha = 0.04 + (ring % 3 === 0 ? 0.14 : ring % 2 === 0 ? 0.08 : 0.03) + Math.sin(t * 0.6 + ring * 0.4) * 0.025;
        ctx.beginPath();
        for (let angle = 0; angle <= Math.PI * 2 + 0.05; angle += 0.02) {
          const d1 = Math.sin(angle * 8 + t * 0.9 + ring * 0.6) * distAmp;
          const d2 = Math.sin(angle * 13 + t * 0.5 + ring * 0.3) * distAmp * 0.4;
          const r = baseR + d1 + d2;
          const px = cx + r * Math.cos(angle);
          const py = cy + r * Math.sin(angle);
          if (angle === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
        }
        ctx.closePath();
        const isHighlight = ring % 4 === 0;
        const isOrange = ring % 7 === 0;
        ctx.strokeStyle = isOrange
          ? `rgba(232,93,38,${alpha * 1.5})`
          : isHighlight
            ? `rgba(77,166,255,${alpha * 1.8})`
            : `rgba(24,119,242,${alpha})`;
        ctx.lineWidth = isHighlight ? 1.5 : 0.7;
        if (isHighlight) {
          ctx.shadowBlur = 4;
          ctx.shadowColor = isOrange ? '#e85d26' : '#1877F2';
        }
        ctx.stroke();
        ctx.shadowBlur = 0;
      }

      // Rotating sweep glow
      const sweepAngle = t * 2.5;
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.arc(cx, cy, scannerR, sweepAngle - 1.2, sweepAngle);
      ctx.closePath();
      const sweepGrad = ctx.createLinearGradient(
        cx + scannerR * 0.2 * Math.cos(sweepAngle - 0.6),
        cy + scannerR * 0.2 * Math.sin(sweepAngle - 0.6),
        cx + scannerR * Math.cos(sweepAngle),
        cy + scannerR * Math.sin(sweepAngle)
      );
      sweepGrad.addColorStop(0, 'rgba(24,119,242,0)');
      sweepGrad.addColorStop(1, 'rgba(24,119,242,0.4)');
      ctx.fillStyle = sweepGrad;
      ctx.fill();
      ctx.restore();

      // Sweep line
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(cx + scannerR * Math.cos(sweepAngle), cy + scannerR * Math.sin(sweepAngle));
      ctx.strokeStyle = 'rgba(24,119,242,0.95)';
      ctx.lineWidth = 2.5;
      ctx.shadowBlur = 16;
      ctx.shadowColor = '#1877F2';
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Ripple rings emanating from center
      for (let i = 0; i < 6; i++) {
        const rT = (t * 0.4 + i * 0.167) % 1;
        const rR = rT * scannerR * 1.7;
        const rA = (1 - rT) * 0.35;
        ctx.beginPath();
        ctx.arc(cx, cy, rR, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(24,119,242,${rA})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }

      // Center core glow
      const coreGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 14);
      coreGrad.addColorStop(0, '#ffffff');
      coreGrad.addColorStop(0.3, '#4da6ff');
      coreGrad.addColorStop(0.7, 'rgba(24,119,242,0.5)');
      coreGrad.addColorStop(1, 'rgba(24,119,242,0)');
      ctx.fillStyle = coreGrad;
      ctx.shadowBlur = 24;
      ctx.shadowColor = '#1877F2';
      ctx.beginPath(); ctx.arc(cx, cy, 10, 0, Math.PI * 2); ctx.fill();
      ctx.shadowBlur = 0;

      // ============================================================
      // AUDIO FILES — flying from left to center, then delivering right
      // ============================================================
      // Spawn new files periodically
      if (Math.random() < 0.025 && audioFiles.length < 18) {
        spawnFile();
      }

      const deliveryTargetYs = [h * 0.2, h * 0.5, h * 0.8];
      const deliveryColors = ['#1877F2', '#E1306C', '#25D366'];

      for (let i = audioFiles.length - 1; i >= 0; i--) {
        const f = audioFiles[i];

        if (f.phase === 'incoming') {
          f.x += f.speed;
          const dist = Math.sqrt((f.x - cx) ** 2 + (f.y - cy) ** 2);
          if (dist < scannerR * 0.85) {
            f.phase = 'scanning';
          }
        } else if (f.phase === 'scanning') {
          f.scanProgress = Math.min(1, f.scanProgress + 0.018);
          if (f.scanProgress >= 1) {
            f.phase = 'scanned';
          }
        } else if (f.phase === 'scanned') {
          // Move toward delivery target
          const targetX = w - 20;
          const targetY = deliveryTargetYs[f.deliverTarget];
          const dx = targetX - f.x;
          const dy = targetY - f.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist > 5) {
            f.x += (dx / dist) * (f.speed * 2.5);
            f.y += (dy / dist) * (f.speed * 2.5);
          } else {
            audioFiles.splice(i, 1);
            spawnFile();
            continue;
          }
        }

        const s = f.size;
        const fx = f.x;
        const fy = f.y;

        // Waveform trail for incoming files
        if (f.phase === 'incoming') {
          ctx.beginPath();
          for (let wx = Math.max(0, fx - 70); wx < fx; wx += 2) {
            const prog = (fx - wx) / 70;
            const wAmp = 5 * prog;
            const wy = fy + Math.sin(wx * 0.25 + t * 5 + f.wavePhase) * wAmp;
            if (wx === Math.max(0, fx - 70)) ctx.moveTo(wx, wy);
            else ctx.lineTo(wx, wy);
          }
          ctx.strokeStyle = `${f.color}35`;
          ctx.lineWidth = 1.2;
          ctx.stroke();
        }

        // Beam line from file to scanner when close
        if (f.phase === 'incoming') {
          const dist = Math.sqrt((fx - cx) ** 2 + (fy - cy) ** 2);
          if (dist < scannerR * 2) {
            const beamAlpha = Math.max(0, 1 - dist / (scannerR * 2)) * 0.4;
            ctx.beginPath();
            ctx.moveTo(fx, fy);
            ctx.lineTo(cx, cy);
            ctx.strokeStyle = `${f.color}${Math.floor(beamAlpha * 255).toString(16).padStart(2, '0')}`;
            ctx.lineWidth = 0.8;
            ctx.setLineDash([3, 7]);
            ctx.stroke();
            ctx.setLineDash([]);
          }
        }

        // Delivery beam for scanned files
        if (f.phase === 'scanned') {
          const targetY = deliveryTargetYs[f.deliverTarget];
          const dColor = deliveryColors[f.deliverTarget];
          ctx.beginPath();
          ctx.moveTo(cx, cy);
          ctx.lineTo(fx, fy);
          ctx.strokeStyle = `${dColor}20`;
          ctx.lineWidth = 1;
          ctx.setLineDash([2, 6]);
          ctx.stroke();
          ctx.setLineDash([]);
        }

        // File card rendering
        ctx.save();
        ctx.globalAlpha = f.opacity;

        const isScanning = f.phase === 'scanning';
        const isScanned = f.phase === 'scanned';
        const cardColor = isScanned ? deliveryColors[f.deliverTarget] : f.color;

        // Card background
        ctx.fillStyle = isScanning
          ? `rgba(24,119,242,0.2)`
          : isScanned
            ? `${cardColor}20`
            : `${f.color}10`;
        ctx.strokeStyle = isScanning
          ? `rgba(24,119,242,0.8)`
          : isScanned
            ? cardColor
            : `${f.color}50`;
        ctx.lineWidth = isScanning || isScanned ? 1.5 : 0.8;

        if (isScanning || isScanned) {
          ctx.shadowBlur = isScanning ? 14 : 8;
          ctx.shadowColor = isScanning ? '#1877F2' : cardColor;
        }

        ctx.beginPath();
        ctx.roundRect(fx - s * 0.65, fy - s * 0.75, s * 1.3, s * 1.5, 5);
        ctx.fill();
        ctx.stroke();
        ctx.shadowBlur = 0;

        // Music note icon
        ctx.fillStyle = isScanned ? cardColor : isScanning ? '#4da6ff' : `${f.color}cc`;
        ctx.font = `${s * 0.55}px sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('♪', fx, fy - s * 0.05);

        // File label
        ctx.font = `bold ${Math.max(7, s * 0.22)}px monospace`;
        ctx.fillStyle = isScanned ? cardColor : isScanning ? '#4da6ff' : '#666';
        ctx.fillText(f.label.substring(0, 9), fx, fy + s * 0.62);

        // Scan progress bar
        if (isScanning && f.scanProgress > 0) {
          ctx.fillStyle = 'rgba(0,0,0,0.7)';
          ctx.fillRect(fx - s * 0.65, fy + s * 0.85, s * 1.3, 3.5);
          const barGrad = ctx.createLinearGradient(fx - s * 0.65, 0, fx - s * 0.65 + s * 1.3 * f.scanProgress, 0);
          barGrad.addColorStop(0, '#1877F2');
          barGrad.addColorStop(1, '#4da6ff');
          ctx.fillStyle = barGrad;
          ctx.shadowBlur = 5;
          ctx.shadowColor = '#1877F2';
          ctx.fillRect(fx - s * 0.65, fy + s * 0.85, s * 1.3 * f.scanProgress, 3.5);
          ctx.shadowBlur = 0;
        }

        // Checkmark for scanned
        if (isScanned) {
          ctx.fillStyle = cardColor;
          ctx.font = `bold ${s * 0.3}px sans-serif`;
          ctx.fillText('✓', fx + s * 0.45, fy - s * 0.55);
        }

        ctx.restore();
      }

      // ============================================================
      // DELIVERY BEAMS from scanner to right edge
      // ============================================================
      deliveryTargetYs.forEach((targetY, idx) => {
        const dColor = deliveryColors[idx];
        // Static beam line
        ctx.beginPath();
        ctx.moveTo(cx + scannerR * 0.8, cy);
        ctx.lineTo(w - 10, targetY);
        ctx.strokeStyle = `${dColor}12`;
        ctx.lineWidth = 1;
        ctx.setLineDash([5, 10]);
        ctx.stroke();
        ctx.setLineDash([]);

        // Multiple moving particles on beam
        for (let p = 0; p < 3; p++) {
          const pT = ((t * 0.7 + idx * 0.33 + p * 0.33) % 1);
          const startX = cx + scannerR * 0.8;
          const endX = w - 10;
          const bx = startX + (endX - startX) * pT;
          const by = cy + (targetY - cy) * pT;

          ctx.beginPath();
          ctx.arc(bx, by, 3.5, 0, Math.PI * 2);
          ctx.fillStyle = dColor;
          ctx.shadowBlur = 10;
          ctx.shadowColor = dColor;
          ctx.fill();
          ctx.shadowBlur = 0;

          // Trailing glow
          ctx.beginPath();
          ctx.arc(bx, by, 7, 0, Math.PI * 2);
          ctx.fillStyle = `${dColor}18`;
          ctx.fill();
        }
      });

      // ============================================================
      // STATUS TEXT
      // ============================================================
      const statusTexts = ['SCANNING', 'FINGERPRINTING', 'MATCHING', 'DELIVERING', 'PROTECTING'];
      const statusIdx = Math.floor(t * 0.7) % statusTexts.length;
      ctx.fillStyle = `rgba(24,119,242,${0.45 + Math.sin(t * 3) * 0.25})`;
      ctx.font = 'bold 9px monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'top';
      ctx.fillText(statusTexts[statusIdx], cx, cy + scannerR + 14);

      animRef.current = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', setSize);
    };
  }, []);

  return <canvas ref={canvasRef} className="w-full h-full" style={{ display: 'block' }} />;
};

// ============================================================
// SOURCE ENTITY CARD (left panel)
// ============================================================
interface SourceEntityCardProps {
  title: string;
  subtitle: string;
  color: string;
  fileCount: string;
  icon: React.ReactNode;
  delay: number;
}

const SourceEntityCard = ({ title, subtitle, color, fileCount, icon, delay }: SourceEntityCardProps) => {
  const [active, setActive] = useState(false);
  const [pulse, setPulse] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setActive(true), delay);
    return () => clearTimeout(t);
  }, [delay]);

  useEffect(() => {
    if (!active) return;
    const interval = setInterval(() => setPulse(p => p + 1), 1800 + Math.random() * 600);
    return () => clearInterval(interval);
  }, [active]);

  return (
    <div
      className="relative p-4 rounded-16 overflow-hidden transition-all duration-700"
      style={{
        background: active ? `${color}0a` : 'rgba(255,255,255,0.02)',
        border: `1px solid ${active ? color + '35' : 'rgba(255,255,255,0.06)'}`,
        boxShadow: active ? `0 4px 24px ${color}15, inset 0 1px 0 ${color}15` : 'none',
        transform: active ? 'translateX(0)' : 'translateX(-20px)',
        opacity: active ? 1 : 0,
      }}
    >
      {/* Animated left border */}
      <div
        className="absolute left-0 top-0 bottom-0 w-0.5 rounded-l-16"
        style={{
          background: `linear-gradient(180deg, transparent, ${color}, transparent)`,
          animation: active ? `borderFlow 2s ease-in-out infinite` : 'none',
        }}
      />

      <div className="flex items-center gap-3 mb-3">
        <div
          className="w-11 h-11 rounded-12 flex items-center justify-center flex-shrink-0"
          style={{
            background: `${color}18`,
            border: `1px solid ${color}40`,
            boxShadow: active ? `0 0 16px ${color}30` : 'none',
            animation: active ? 'iconPulse 2.5s ease-in-out infinite' : 'none',
          }}
        >
          {icon}
        </div>
        <div>
          <div className="text-white font-bold text-sm">{title}</div>
          <div style={{ color: '#555', fontSize: '11px' }}>{subtitle}</div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <div
            className="w-2 h-2 rounded-full"
            style={{
              background: '#25D366',
              boxShadow: '0 0 6px #25D366',
              animation: 'pulse 1.2s ease-in-out infinite',
            }}
          />
          <span style={{ color: '#25D366', fontSize: '10px', fontWeight: 700, letterSpacing: '0.05em' }}>SENDING</span>
        </div>
        <span className="font-black tabular-nums text-xs" style={{ color: color }}>{fileCount}</span>
      </div>
    </div>
  );
};

// ============================================================
// AUDIO FILE QUEUE ITEM (left panel)
// ============================================================
interface AudioQueueItemProps {
  name: string;
  type: string;
  color: string;
  delay: number;
}

const AudioQueueItem = ({ name, type, color, delay }: AudioQueueItemProps) => {
  const [active, setActive] = useState(false);
  const [scanPct, setScanPct] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setActive(true), delay);
    return () => clearTimeout(t);
  }, [delay]);

  useEffect(() => {
    setScanPct(Math.random() * 60);
  }, []);

  useEffect(() => {
    if (!active) return;
    const interval = setInterval(() => {
      setScanPct(p => (p >= 100 ? Math.random() * 10 : p + 1.5 + Math.random() * 3));
    }, 60);
    return () => clearInterval(interval);
  }, [active]);

  return (
    <div
      className="flex items-center gap-2 px-2.5 py-2 rounded-10 transition-all duration-500"
      style={{
        background: active ? `${color}0e` : 'rgba(255,255,255,0.02)',
        border: `1px solid ${active ? color + '30' : 'rgba(255,255,255,0.05)'}`,
      }}
    >
      <div
        className="w-6 h-6 rounded-8 flex items-center justify-center flex-shrink-0"
        style={{ background: `${color}18`, border: `1px solid ${color}35` }}
      >
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2">
          <path d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2z"/>
        </svg>
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-white font-semibold truncate" style={{ fontSize: '10px' }}>{name}</div>
        <div className="flex items-center gap-1 mt-0.5">
          <div className="flex-1 h-1 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.05)' }}>
            <div
              className="h-full rounded-full"
              style={{
                width: `${Math.min(100, scanPct)}%`,
                background: `linear-gradient(90deg, ${color}, ${color}aa)`,
                boxShadow: `0 0 4px ${color}80`,
                transition: 'width 0.06s linear',
              }}
            />
          </div>
          <span style={{ color: color, fontSize: '8px', fontWeight: 700, flexShrink: 0 }}>{type}</span>
        </div>
      </div>
    </div>
  );
};

// ============================================================
// PLATFORM DELIVERY CARD (right panel)
// ============================================================
interface PlatformDeliveryCardProps {
  name: string;
  icon: React.ReactNode;
  color: string;
  deliveries: number;
  tracks: number;
  index: number;
}

const PlatformDeliveryCard = ({ name, icon, color, deliveries, tracks, index }: PlatformDeliveryCardProps) => {
  const formatNum = (n: number) => (n / 1000000).toFixed(3) + 'M';
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), index * 200 + 300);
    return () => clearTimeout(timer);
  }, [index]);

  return (
    <div
      className="relative p-5 rounded-18 overflow-hidden transition-all duration-700"
      style={{
        background: `${color}08`,
        border: `1px solid ${color}30`,
        boxShadow: `0 4px 28px ${color}12, inset 0 1px 0 ${color}15`,
        transform: visible ? 'translateX(0)' : 'translateX(20px)',
        opacity: visible ? 1 : 0,
        flex: 1,
      }}
    >
      {/* Animated background glow */}
      <div
        className="absolute inset-0 rounded-18 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at 80% 50%, ${color}12 0%, transparent 65%)`,
          animation: 'pulseGlow 3s ease-in-out infinite',
        }}
      />

      {/* Right border glow */}
      <div
        className="absolute right-0 top-0 bottom-0 w-0.5 rounded-r-18"
        style={{
          background: `linear-gradient(180deg, transparent, ${color}80, transparent)`,
          animation: 'borderFlow 2.5s ease-in-out infinite',
        }}
      />

      <div className="flex items-center gap-3 mb-4 relative">
        <div
          className="w-14 h-14 rounded-16 flex items-center justify-center flex-shrink-0"
          style={{
            background: color,
            boxShadow: `0 0 24px ${color}60, 0 4px 16px ${color}40`,
            animation: 'platformIconGlow 2.5s ease-in-out infinite',
          }}
        >
          {icon}
        </div>
        <div>
          <div className="text-white font-bold text-base">{name}</div>
          <div className="flex items-center gap-1.5 mt-1">
            <div
              className="w-2 h-2 rounded-full"
              style={{ background: '#25D366', boxShadow: '0 0 6px #25D366', animation: 'pulse 1s ease-in-out infinite' }}
            />
            <span style={{ color: '#25D366', fontSize: '10px', fontWeight: 700, letterSpacing: '0.06em' }}>RECEIVING</span>
          </div>
        </div>
      </div>

      <div className="space-y-3 relative">
        <div className="flex items-center justify-between">
          <span style={{ color: '#555', fontSize: '11px' }}>Total Deliveries</span>
          <span className="font-black tabular-nums" style={{ color: color, fontSize: '13px' }} suppressHydrationWarning>
            {formatNum(deliveries)}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span style={{ color: '#555', fontSize: '11px' }}>Active Tracks</span>
          <span className="font-black tabular-nums" style={{ color: color, fontSize: '13px' }} suppressHydrationWarning>
            {formatNum(tracks)}
          </span>
        </div>

        {/* Animated progress bar */}
        <div className="h-2 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.05)' }}>
          <div
            className="h-full rounded-full"
            style={{
              width: `${72 + index * 8}%`,
              background: `linear-gradient(90deg, ${color}cc, ${color})`,
              boxShadow: `0 0 8px ${color}80`,
              animation: 'progressPulse 3s ease-in-out infinite',
            }}
          />
        </div>

        {/* Mini waveform bars */}
        <div className="flex items-end gap-0.5 h-6">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="flex-1 rounded-sm"
              style={{
                background: `${color}${i % 3 === 0 ? 'cc' : '55'}`,
                height: `${30 + Math.sin(i * 0.8 + index) * 40 + 20}%`,
                animation: `waveBar${i % 4} ${0.8 + (i % 3) * 0.3}s ease-in-out infinite alternate`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

// ============================================================
// MAIN COMPONENT
// ============================================================
export default function FingerprintSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  const fbDeliveries = useIncrementingNumber(1847293, 230, 500);
  const igDeliveries = useIncrementingNumber(1234567, 180, 600);
  const waDeliveries = useIncrementingNumber(892341, 140, 700);
  const fbTracks = useIncrementingNumber(2340000, 150, 400);
  const igTracks = useIncrementingNumber(1890000, 120, 450);
  const waTracks = useIncrementingNumber(1120000, 100, 550);
  const totalScanned = useIncrementingNumber(5847293, 450, 300);

  useEffect(() => {
    setMounted(true);
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.05 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const formatM = (n: number) => (n / 1000000).toFixed(3) + 'M';

  const audioQueue = [
    { name: 'midnight_echoes.mp3', type: 'MP3', color: '#e85d26', delay: 0 },
    { name: 'lagos_nights.wav', type: 'WAV', color: '#1877F2', delay: 150 },
    { name: 'afrobeat_soul.mp3', type: 'MP3', color: '#a855f7', delay: 300 },
    { name: 'desert_wind.wav', type: 'WAV', color: '#22d3ee', delay: 450 },
    { name: 'city_pulse.mp3', type: 'MP3', color: '#ff8c42', delay: 600 },
    { name: 'vocal_master.wav', type: 'WAV', color: '#4da6ff', delay: 750 },
    { name: 'bass_drop_07.mp3', type: 'MP3', color: '#e85d26', delay: 900 },
    { name: 'remix_final.wav', type: 'WAV', color: '#25D366', delay: 1050 },
    { name: 'soul_track.mp3', type: 'MP3', color: '#f59e0b', delay: 1200 },
  ];

  return (
    <section ref={sectionRef} id="fingerprint" className="py-16 lg:py-28 relative overflow-hidden" style={{ background: 'linear-gradient(180deg, #0d0d0d 0%, #060a18 50%, #0d0d0d 100%)' }}>
      {/* Background glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute" style={{ top: '10%', left: '50%', transform: 'translateX(-50%)', width: '900px', height: '700px', background: 'radial-gradient(ellipse, rgba(24,119,242,0.07) 0%, transparent 65%)', borderRadius: '50%' }} />
        <div className="absolute" style={{ top: '30%', left: '5%', width: '350px', height: '350px', background: 'radial-gradient(ellipse, rgba(232,93,38,0.05) 0%, transparent 70%)', borderRadius: '50%' }} />
        <div className="absolute" style={{ top: '30%', right: '5%', width: '350px', height: '350px', background: 'radial-gradient(ellipse, rgba(24,119,242,0.05) 0%, transparent 70%)', borderRadius: '50%' }} />
      </div>

      <div className="section-container relative">
        {/* Section header */}
        <div
          className="text-center mb-8 sm:mb-10"
          style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(24px)', transition: 'all 0.6s ease-out' }}
        >
          <div className="section-label mb-4">Live Audio Fingerprinting</div>
          <h2 className="font-black text-white mb-4" style={{ fontSize: 'clamp(24px, 4vw, 52px)', lineHeight: '1.1', letterSpacing: '-0.03em' }}>
            Every audio file.
            <br />
            <span className="gradient-text">Scanned. Identified. Delivered.</span>
          </h2>
          <p className="text-sm sm:text-base max-w-2xl mx-auto" style={{ color: '#a8a39c', lineHeight: '1.7' }}>
            Our high-tech fingerprint scanner processes thousands of audio files per second — from Artists, Record Labels, and Music Producers — delivering rights-protected content to Facebook, Instagram, and WhatsApp in real time.
          </p>
        </div>

        {/* MAIN 3-PANEL HIGH-TECH BOX */}
        <div
          className="relative rounded-24 overflow-hidden"
          style={{
            background: 'rgba(3,5,15,0.95)',
            border: '1px solid rgba(24,119,242,0.22)',
            boxShadow: '0 0 100px rgba(24,119,242,0.10), 0 0 50px rgba(232,93,38,0.05), 0 2px 0 rgba(24,119,242,0.3)',
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(32px)',
            transition: 'all 0.7s ease-out 0.2s',
          }}
        >
          {/* Top status bar */}
          <div
            className="flex flex-wrap items-center justify-between gap-2 px-4 sm:px-6 py-3"
            style={{ borderBottom: '1px solid rgba(24,119,242,0.15)', background: 'rgba(24,119,242,0.06)' }}
          >
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="dot-pulse" style={{ background: '#1877F2', boxShadow: '0 0 0 0 rgba(24,119,242,0.4)' }} />
              <span style={{ color: '#4da6ff', fontSize: '10px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                Live Audio Fingerprint Asset Scanner
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <div className="flex items-center gap-1.5 px-2 py-1 rounded-8" style={{ background: 'rgba(37,211,102,0.1)', border: '1px solid rgba(37,211,102,0.2)' }}>
                <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#25D366', animation: 'pulse 1s ease-in-out infinite' }} />
                <span style={{ color: '#25D366', fontSize: '9px', fontWeight: 700 }}>SCANNING LIVE</span>
              </div>
              <div className="flex items-center gap-1.5 px-2 py-1 rounded-8" style={{ background: 'rgba(232,93,38,0.1)', border: '1px solid rgba(232,93,38,0.2)' }}>
                <span style={{ color: '#ff8c42', fontSize: '9px', fontWeight: 700 }} suppressHydrationWarning>TOTAL: {mounted ? formatM(totalScanned) : formatM(5847293)}</span>
              </div>
              <div className="hidden sm:flex items-center gap-1.5 px-2 py-1 rounded-8" style={{ background: 'rgba(24,119,242,0.1)', border: '1px solid rgba(24,119,242,0.2)' }}>
                <span style={{ color: '#4da6ff', fontSize: '9px', fontWeight: 700 }}>99.8% ACCURACY</span>
              </div>
            </div>
          </div>

          {/* 3-panel layout — stacks on mobile */}
          <div className="flex flex-col lg:grid lg:grid-cols-12" style={{ minHeight: '400px' }}>

            {/* LEFT PANEL — Audio Sources (hidden on small mobile, shown on md+) */}
            <div
              className="hidden md:flex flex-col gap-3 p-4 lg:p-5 lg:col-span-3"
              style={{ borderRight: '1px solid rgba(24,119,242,0.1)', background: 'rgba(232,93,38,0.015)' }}
            >
              <div className="text-center pb-2" style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                <div className="text-xs font-bold uppercase tracking-widest mb-0.5" style={{ color: '#e85d26' }}>Audio Sources</div>
                <div style={{ color: '#3a3a3a', fontSize: '10px' }}>Submitting to scanner →</div>
              </div>

              <SourceEntityCard
                title="Artist"
                subtitle="Independent Musicians"
                color="#e85d26"
                fileCount="847K+ files"
                delay={100}
                icon={
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#e85d26" strokeWidth="1.8">
                    <path d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2z"/>
                  </svg>
                }
              />
              <SourceEntityCard
                title="Record Label"
                subtitle="Major & Indie Labels"
                color="#a855f7"
                fileCount="1.2M+ files"
                delay={250}
                icon={
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#a855f7" strokeWidth="1.8">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                  </svg>
                }
              />
              <SourceEntityCard
                title="Music Producer"
                subtitle="Studio Productions"
                color="#22d3ee"
                fileCount="634K+ files"
                delay={400}
                icon={
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#22d3ee" strokeWidth="1.8">
                    <circle cx="12" cy="12" r="3"/>
                    <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/>
                  </svg>
                }
              />

              <div className="flex-1">
                <div className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: '#333' }}>Audio Queue</div>
                <div className="space-y-1.5">
                  {audioQueue.slice(0, 6).map(f => (
                    <AudioQueueItem key={f.name} {...f} />
                  ))}
                </div>
              </div>
            </div>

            {/* CENTER PANEL — Scanner */}
            <div className="flex flex-col lg:col-span-6 relative" style={{ minHeight: '360px' }}>
              <div className="flex-1 relative" style={{ minHeight: '360px' }}>
                <AdvancedScannerCanvas />

                <div className="absolute top-3 left-1/2 -translate-x-1/2 pointer-events-none">
                  <div
                    className="flex items-center gap-2 px-3 py-1.5 rounded-full"
                    style={{
                      background: 'rgba(24,119,242,0.18)',
                      border: '1px solid rgba(24,119,242,0.4)',
                      backdropFilter: 'blur(12px)',
                    }}
                  >
                    <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#1877F2', animation: 'pulse 1s ease-in-out infinite' }} />
                    <span style={{ color: '#4da6ff', fontSize: '10px', fontWeight: 700, letterSpacing: '0.1em' }}>FINGERPRINT SCANNER ACTIVE</span>
                  </div>
                </div>

                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-center gap-2 pointer-events-none flex-wrap">
                  {[
                    { label: 'Files/sec', value: '2,847', color: '#1877F2' },
                    { label: 'Match Rate', value: '99.8%', color: '#25D366' },
                    { label: 'Queue Size', value: '12.4K', color: '#e85d26' },
                    { label: 'Latency', value: '< 2ms', color: '#a855f7' },
                  ].map(s => (
                    <div
                      key={s.label}
                      className="flex flex-col items-center px-2 py-1.5 rounded-10"
                      style={{
                        background: 'rgba(0,0,0,0.75)',
                        border: `1px solid ${s.color}25`,
                        backdropFilter: 'blur(10px)',
                      }}
                    >
                      <span className="font-black tabular-nums text-xs" style={{ color: s.color }}>{s.value}</span>
                      <span style={{ color: '#444', fontSize: '8px' }}>{s.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT PANEL — Delivery */}
            <div
              className="flex flex-col gap-3 p-4 lg:p-5 lg:col-span-3"
              style={{ borderTop: '1px solid rgba(24,119,242,0.1)', borderLeft: '0px', background: 'rgba(24,119,242,0.015)' }}
            >
              <div className="text-center pb-2" style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                <div className="text-xs font-bold uppercase tracking-widest mb-0.5" style={{ color: '#4da6ff' }}>Delivery Targets</div>
                <div style={{ color: '#3a3a3a', fontSize: '10px' }}>← Receiving fingerprinted audio</div>
              </div>

              {/* On mobile: horizontal row; on lg: stacked */}
              <div className="flex flex-row lg:flex-col gap-3">
                <PlatformDeliveryCard
                  name="Facebook"
                  icon={<FacebookIcon size={22} />}
                  color="#1877F2"
                  deliveries={fbDeliveries}
                  tracks={fbTracks}
                  index={0}
                />
                <PlatformDeliveryCard
                  name="Instagram"
                  icon={<InstagramIcon size={22} />}
                  color="#E1306C"
                  deliveries={igDeliveries}
                  tracks={igTracks}
                  index={1}
                />
                <PlatformDeliveryCard
                  name="WhatsApp"
                  icon={<WhatsAppIcon size={22} />}
                  color="#25D366"
                  deliveries={waDeliveries}
                  tracks={waTracks}
                  index={2}
                />
              </div>

              <div
                className="p-3 rounded-16 mt-auto"
                style={{
                  background: 'rgba(24,119,242,0.08)',
                  border: '1px solid rgba(24,119,242,0.2)',
                }}
              >
                <div className="text-center">
                  <div style={{ color: '#444', fontSize: '10px', marginBottom: '4px', letterSpacing: '0.08em' }}>TOTAL DELIVERIES</div>
                  <div className="font-black tabular-nums" style={{ color: '#4da6ff', fontSize: '18px', letterSpacing: '-0.02em' }} suppressHydrationWarning>
                    {mounted ? formatM(fbDeliveries + igDeliveries + waDeliveries) : formatM(1847293 + 1234567 + 892341)}
                  </div>
                  <div style={{ color: '#333', fontSize: '9px', marginTop: '2px' }}>across all platforms</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 1024px) {
          .lg\\:col-span-3 { grid-column: span 3 / span 3; }
          .lg\\:col-span-6 { grid-column: span 6 / span 6; }
          .lg\\:grid-cols-12 { grid-template-columns: repeat(12, minmax(0, 1fr)); }
          .lg\\:flex-col { flex-direction: column; }
          .lg\\:p-5 { padding: 20px; }
        }
        @keyframes borderFlow {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 1; }
        }
        @keyframes iconPulse {
          0%, 100% { box-shadow: 0 0 12px currentColor; }
          50% { box-shadow: 0 0 24px currentColor; }
        }
        @keyframes platformIconGlow {
          0%, 100% { box-shadow: 0 0 24px rgba(255,255,255,0.3); }
          50% { box-shadow: 0 0 40px rgba(255,255,255,0.5); }
        }
        @keyframes progressPulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.65; }
        }
        @keyframes waveBar0 { from { height: 30%; } to { height: 80%; } }
        @keyframes waveBar1 { from { height: 50%; } to { height: 100%; } }
        @keyframes waveBar2 { from { height: 20%; } to { height: 70%; } }
        @keyframes waveBar3 { from { height: 40%; } to { height: 90%; } }
      `}</style>
    </section>
  );
}
