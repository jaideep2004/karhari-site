"use client";

import React, { useEffect, useRef } from "react";
import Navbar from "../components/Navbar";
import TeamShowcase from "./components/TeamShowcase";

interface Bar {
  x: number;
  targetHeight: number;
  currentHeight: number;
  speed: number;
  color: string;
  phase: number;
  phaseSpeed: number;
}

const SPECTRUM_COLORS = [
  "#7C3AED", "#8B5CF6", "#A78BFA", "#C084FC",
  "#9333EA", "#6D28D9", "#7C3AED", "#A855F7",
  "#8B5CF6", "#C084FC", "#7C3AED", "#9333EA",
];

const ACCENT_COLORS = [
  "#38BDF8", "#0EA5E9", "#7DD3FC",
  "#34D399", "#10B981",
  "#F472B6", "#EC4899",
];

export default function TeamPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let bars: Bar[] = [];
    let accentBars: Bar[] = [];
    let frame = 0;

    const BAR_WIDTH = 4;
    const BAR_GAP = 3;
    const TOTAL_BAR_WIDTH = BAR_WIDTH + BAR_GAP;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      const count = Math.ceil(canvas.width / TOTAL_BAR_WIDTH) + 2;

      bars = Array.from({ length: count }, (_, i) => ({
        x: i * TOTAL_BAR_WIDTH,
        targetHeight: 20 + Math.random() * 120,
        currentHeight: 10 + Math.random() * 60,
        speed: 0.04 + Math.random() * 0.06,
        color: SPECTRUM_COLORS[i % SPECTRUM_COLORS.length],
        phase: Math.random() * Math.PI * 2,
        phaseSpeed: 0.018 + Math.random() * 0.025,
      }));

      accentBars = Array.from({ length: Math.ceil(count / 3) }, (_, i) => ({
        x: i * TOTAL_BAR_WIDTH * 3 + TOTAL_BAR_WIDTH,
        targetHeight: 10 + Math.random() * 60,
        currentHeight: 5 + Math.random() * 30,
        speed: 0.06 + Math.random() * 0.08,
        color: ACCENT_COLORS[i % ACCENT_COLORS.length],
        phase: Math.random() * Math.PI * 2,
        phaseSpeed: 0.025 + Math.random() * 0.035,
      }));
    };

    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      frame++;

      const H = canvas.height;
      const W = canvas.width;

      // Bottom equalizer bars — main spectrum
      for (const b of bars) {
        b.phase += b.phaseSpeed;
        b.targetHeight = 15 + Math.abs(Math.sin(b.phase) * 110) + Math.abs(Math.sin(b.phase * 0.7) * 50);
        b.currentHeight += (b.targetHeight - b.currentHeight) * b.speed;

        const barH = b.currentHeight;
        const y = H - barH;

        const grad = ctx.createLinearGradient(b.x, y, b.x, H);
        grad.addColorStop(0, b.color + "00");
        grad.addColorStop(0.3, b.color + "40");
        grad.addColorStop(0.7, b.color + "90");
        grad.addColorStop(1, b.color + "CC");

        ctx.fillStyle = grad;
        ctx.fillRect(b.x, y, BAR_WIDTH, barH);

        ctx.fillStyle = b.color + "FF";
        ctx.fillRect(b.x, y, BAR_WIDTH, 2);
      }

      // Top mirrored equalizer bars (inverted, smaller)
      for (const b of bars) {
        const mirrorH = b.currentHeight * 0.35;
        const grad = ctx.createLinearGradient(b.x, 0, b.x, mirrorH);
        grad.addColorStop(0, b.color + "CC");
        grad.addColorStop(0.5, b.color + "30");
        grad.addColorStop(1, b.color + "00");

        ctx.fillStyle = grad;
        ctx.fillRect(b.x, 0, BAR_WIDTH, mirrorH);
      }

      // Accent floating bars in the middle — subtle
      for (const b of accentBars) {
        b.phase += b.phaseSpeed;
        b.targetHeight = 8 + Math.abs(Math.sin(b.phase) * 40);
        b.currentHeight += (b.targetHeight - b.currentHeight) * b.speed;

        const centerY = H * 0.5;
        const barH = b.currentHeight;

        const grad = ctx.createLinearGradient(b.x, centerY - barH / 2, b.x, centerY + barH / 2);
        grad.addColorStop(0, b.color + "00");
        grad.addColorStop(0.5, b.color + "35");
        grad.addColorStop(1, b.color + "00");

        ctx.fillStyle = grad;
        ctx.fillRect(b.x, centerY - barH / 2, BAR_WIDTH - 1, barH);
      }

      // Horizontal scan line — subtle moving glow
      const scanY = H * 0.5 + Math.sin(frame * 0.008) * H * 0.15;
      const scanGrad = ctx.createLinearGradient(0, scanY - 1, 0, scanY + 1);
      scanGrad.addColorStop(0, "rgba(139,92,246,0)");
      scanGrad.addColorStop(0.5, "rgba(139,92,246,0.08)");
      scanGrad.addColorStop(1, "rgba(139,92,246,0)");
      ctx.fillStyle = scanGrad;
      ctx.fillRect(0, scanY - 1, W, 2);

      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <main
      className="min-h-screen relative overflow-x-hidden"
      style={{
        background: "linear-gradient(180deg, #050008 0%, #07000e 25%, #060010 60%, #04000c 100%)",
      }}
    >
      <Navbar />
      {/* Music equalizer spectrum canvas — clean, no blur */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none"
        style={{ zIndex: 0, opacity: 0.55 }}
        aria-hidden="true"
      />
      <div className="relative" style={{ zIndex: 1 }}>
        <TeamShowcase />
      </div>
    </main>
  );
}
