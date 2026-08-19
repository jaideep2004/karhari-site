'use client';
import React, { useEffect, useRef, useState, useCallback } from 'react';

const col1 = [
  { src: 'https://cms.karharimedia.com/images/dsp/spotify.png', alt: 'Spotify' },
  { src: '/assets/images/Purani_Yaden_Sadabahar_LoFi-1787108172810.png', alt: 'YouTube' },
  { src: 'https://cms.karharimedia.com/images/dsp/jiosaavan.png', alt: 'JioSaavn' },
  { src: 'https://cms.karharimedia.com/images/dsp/deezer.png', alt: 'Deezer' },
  { src: 'https://cms.karharimedia.com/images/dsp/soundcloud.png', alt: 'SoundCloud' },
  { src: 'https://cms.karharimedia.com/images/dsp/kkbox.png', alt: 'KKBOX' },
  { src: 'https://cms.karharimedia.com/images/dsp/neteasecloud.png', alt: 'NetEase' },
  { src: 'https://cms.karharimedia.com/images/dsp/geniemusic.png', alt: 'Genie' },
  { src: 'https://cms.karharimedia.com/images/dsp/resso.png', alt: 'Resso' },
  { src: 'https://cms.karharimedia.com/images/dsp/snapchat-sounds.png', alt: 'Snapchat' },
  { src: 'https://cms.karharimedia.com/images/dsp/umamusic.png', alt: 'UMA Music' },
  { src: 'https://cms.karharimedia.com/images/dsp/facebook-audio-library.png', alt: 'Facebook Audio' },
];

const col2 = [
  { src: 'https://cms.karharimedia.com/images/dsp/applemusic.png', alt: 'Apple Music' },
  { src: 'https://cms.karharimedia.com/images/dsp/tiktok-music-library.png', alt: 'TikTok Music' },
  { src: 'https://cms.karharimedia.com/images/dsp/gaana.png', alt: 'Gaana' },
  { src: 'https://cms.karharimedia.com/images/dsp/tidal.png', alt: 'Tidal' },
  { src: 'https://cms.karharimedia.com/images/dsp/napster.png', alt: 'Napster' },
  { src: 'https://cms.karharimedia.com/images/dsp/joox.png', alt: 'JOOX' },
  { src: 'https://cms.karharimedia.com/images/dsp/yandexmusic.png', alt: 'Yandex Music' },
  { src: 'https://cms.karharimedia.com/images/dsp/bugs.png', alt: 'Bugs' },
  { src: 'https://cms.karharimedia.com/images/dsp/qobuz.png', alt: 'Qobuz' },
  { src: 'https://cms.karharimedia.com/images/dsp/whatsapp.png', alt: 'WhatsApp' },
  { src: 'https://cms.karharimedia.com/images/dsp/zvuk.png', alt: 'Zvuk' },
  { src: '/assets/images/Karhari_Media_Distribution-1786796257601.png', alt: 'YouTube CID' },
];

const col3 = [
  { src: 'https://cms.karharimedia.com/images/dsp/ytmusic.png', alt: 'YouTube Music' },
  { src: 'https://cms.karharimedia.com/images/dsp/instagram-music.png', alt: 'Instagram Music' },
  { src: 'https://cms.karharimedia.com/images/dsp/hungamamusic.png', alt: 'Hungama' },
  { src: 'https://cms.karharimedia.com/images/dsp/pandora.png', alt: 'Pandora' },
  { src: 'https://cms.karharimedia.com/images/dsp/audiomack.png', alt: 'Audiomack' },
  { src: 'https://cms.karharimedia.com/images/dsp/kugoumusic.png', alt: 'QQ Music' },
  { src: '/assets/images/Apple_Music_icon.svg-1786793756983.webp', alt: 'VK Music' },
  { src: 'https://cms.karharimedia.com/images/dsp/boom.png', alt: 'Boom' },
  { src: 'https://cms.karharimedia.com/images/dsp/iheartradio.png', alt: 'iHeartRadio' },
  { src: 'https://cms.karharimedia.com/images/dsp/peloton.png', alt: 'Peloton' },
  { src: 'https://cms.karharimedia.com/images/dsp/linemusic.png', alt: 'LINE Music' },
  { src: 'https://cms.karharimedia.com/images/dsp/acr-cloud.png', alt: 'ACRCloud' },
];

const col4 = [
  { src: 'https://cms.karharimedia.com/images/dsp/amazonmusic.png', alt: 'Amazon Music' },
  { src: 'https://cms.karharimedia.com/images/dsp/facebook.png', alt: 'Meta' },
  { src: 'https://cms.karharimedia.com/images/dsp/wynkmusic.png', alt: 'Wynk Music' },
  { src: 'https://cms.karharimedia.com/images/dsp/boomplay.png', alt: 'Boomplay' },
  { src: 'https://cms.karharimedia.com/images/dsp/anghami.png', alt: 'Anghami' },
  { src: 'https://cms.karharimedia.com/images/dsp/kuwomusic.png', alt: 'Kuwo Music' },
  { src: 'https://cms.karharimedia.com/images/dsp/melonmusic.png', alt: 'Melon' },
  { src: 'https://cms.karharimedia.com/images/dsp/awamusic.png', alt: 'Awa Music' },
  { src: 'https://cms.karharimedia.com/images/dsp/tencentmusic.png', alt: 'Tencent' },
  { src: 'https://cms.karharimedia.com/images/dsp/flomusic.png', alt: 'Flo Music' },
  { src: 'https://cms.karharimedia.com/images/dsp/facebook-rights-management.png', alt: 'Facebook Rights' },
];

const DSP_STORES = [
  { name: 'YouTube', color: '#ff4444' },
  { name: 'Apple Music', color: '#fc3c44' },
  { name: 'Facebook', color: '#1877f2' },
  { name: 'TikTok', color: '#69c9d0' },
  { name: 'Gaana', color: '#e72c30' },
  { name: 'Hungama', color: '#ff6b35' },
  { name: 'Spotify', color: '#1db954' },
  { name: 'Amazon Music', color: '#00a8e1' },
  { name: 'JioSaavn', color: '#2bc5b4' },
  { name: 'Wynk Music', color: '#7b2fff' },
];

const TICKER_ITEMS = [
  'Karhari Media Distribution',
  'Label Service',
  'YouTube Multi Channel Network',
  'Music Distribution Service',
  'Artist Service',
  'Royalty Collecting Service',
];

const TITLE_TAGS = [
  '#KarhariMedia',
  '#MusicDistribution',
  '#ArtistLabel',
  '#MCNNetwork',
  '#GlobalReach',
  '#DigitalMusic',
];

const DESC_TAGS = [
  '#StreamingPlatforms',
  '#Spotify',
  '#AppleMusic',
  '#YouTubeMusic',
  '#150PlusPlatforms',
  '#RoyaltyCollection',
  '#IndieArtist',
  '#RecordLabel',
];

function ScrollColumn({ items, direction }: { items: { src: string; alt: string }[]; direction: 'up' | 'down' }) {
  const doubled = [...items, ...items];
  return (
    <div className="scroll-column">
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          animation:
            direction === 'up' ? 'platformScrollUp 28s linear infinite' : 'platformScrollDown 32s linear infinite',
        }}
      >
        {doubled.map((item, i) => (
          <div key={i} className="platform-logo-card">
            <img src={item.src} alt={item.alt} loading="lazy" decoding="async" />
          </div>
        ))}
      </div>
    </div>
  );
}

function FingerprintCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animFrame: number;
    let scanY = 0;
    let scanDir = 1;
    let time = 0;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const drawFingerprint = (t: number) => {
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);
      const cx = w / 2;
      const cy = h / 2;
      const maxR = Math.min(w, h) * 0.42;
      const lineCount = 28;

      for (let i = 0; i < lineCount; i++) {
        const r = (maxR / lineCount) * (i + 1);
        const waveAmp = 4 + i * 0.5;
        const waveFreq = 6 + i * 0.3;
        const phaseShift = i * 0.18 + t * 0.008;
        const distFromScan = Math.abs(scanY - (cy - maxR + (maxR * 2 * i) / lineCount));
        const glowAlpha = Math.max(0, 1 - distFromScan / 60);
        const baseAlpha = 0.08 + i * 0.005;
        const alpha = baseAlpha + glowAlpha * 0.45;

        ctx.beginPath();
        ctx.strokeStyle = `rgba(180, 100, 255, ${alpha})`;
        ctx.lineWidth = 1.2;
        const startAngle = Math.PI * 0.15;
        const endAngle = Math.PI * 0.85;
        const steps = 120;

        for (let s = 0; s <= steps; s++) {
          const angle = startAngle + ((endAngle - startAngle) * s) / steps;
          const wave = Math.sin(angle * waveFreq + phaseShift) * waveAmp;
          const rr = r + wave;
          const x = cx + Math.cos(angle) * rr;
          const y = cy + Math.sin(angle) * rr;
          if (s === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();

        ctx.beginPath();
        ctx.strokeStyle = `rgba(180, 100, 255, ${alpha * 0.7})`;
        for (let s = 0; s <= steps; s++) {
          const angle = Math.PI + startAngle + ((endAngle - startAngle) * s) / steps;
          const wave = Math.sin(angle * waveFreq + phaseShift) * waveAmp;
          const rr = r + wave;
          const x = cx + Math.cos(angle) * rr;
          const y = cy + Math.sin(angle) * rr;
          if (s === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      const scanLineY = cy - maxR + ((scanY / h) * maxR * 2);
      const grad = ctx.createLinearGradient(cx - maxR, 0, cx + maxR, 0);
      grad.addColorStop(0, 'rgba(160,80,255,0)');
      grad.addColorStop(0.3, 'rgba(200,100,255,0.6)');
      grad.addColorStop(0.5, 'rgba(220,120,255,0.9)');
      grad.addColorStop(0.7, 'rgba(200,100,255,0.6)');
      grad.addColorStop(1, 'rgba(160,80,255,0)');
      ctx.beginPath();
      ctx.strokeStyle = grad;
      ctx.lineWidth = 2;
      ctx.moveTo(cx - maxR, scanLineY);
      ctx.lineTo(cx + maxR, scanLineY);
      ctx.stroke();

      const haloGrad = ctx.createRadialGradient(cx, scanLineY, 0, cx, scanLineY, maxR * 0.6);
      haloGrad.addColorStop(0, 'rgba(180,80,255,0.12)');
      haloGrad.addColorStop(1, 'rgba(180,80,255,0)');
      ctx.fillStyle = haloGrad;
      ctx.fillRect(cx - maxR, scanLineY - 40, maxR * 2, 80);

      const bSize = 18;
      const bx = cx - maxR * 0.55;
      const by = cy - maxR * 0.55;
      const bx2 = cx + maxR * 0.55;
      const by2 = cy + maxR * 0.55;
      ctx.strokeStyle = 'rgba(200,120,255,0.7)';
      ctx.lineWidth = 2;
      [[bx, by, 1, 1], [bx2, by, -1, 1], [bx, by2, 1, -1], [bx2, by2, -1, -1]].forEach(([x, y, dx, dy]) => {
        ctx.beginPath();
        ctx.moveTo(x as number, (y as number) + (dy as number) * bSize);
        ctx.lineTo(x as number, y as number);
        ctx.lineTo((x as number) + (dx as number) * bSize, y as number);
        ctx.stroke();
      });

      ctx.fillStyle = 'rgba(160,80,255,0.06)';
      const dotSpacing = 28;
      for (let dx = 0; dx < w; dx += dotSpacing) {
        for (let dy = 0; dy < h; dy += dotSpacing) {
          ctx.beginPath();
          ctx.arc(dx, dy, 1, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    };

    const animate = () => {
      time++;
      scanY += scanDir * 1.2;
      if (scanY > canvas.height) scanDir = -1;
      if (scanY < 0) scanDir = 1;
      drawFingerprint(time);
      animFrame = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animFrame);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0 }}
    />
  );
}

// FIXED: Typewriter hook — uses a single ref-based timer, no state in deps
function useTypewriter(text: string, typingSpeed = 60, pauseMs = 1400, eraseSpeed = 35) {
  const [displayed, setDisplayed] = useState('');
  const stateRef = useRef<{ phase: 'typing' | 'pause' | 'erasing'; index: number }>({ phase: 'typing', index: 0 });
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const textRef = useRef(text);
  textRef.current = text;

  useEffect(() => {
    const tick = () => {
      const { phase, index } = stateRef.current;
      const fullText = textRef.current;

      if (phase === 'typing') {
        if (index < fullText.length) {
          stateRef.current.index = index + 1;
          setDisplayed(fullText.slice(0, index + 1));
          timerRef.current = setTimeout(tick, typingSpeed);
        } else {
          stateRef.current.phase = 'pause';
          timerRef.current = setTimeout(tick, pauseMs);
        }
      } else if (phase === 'pause') {
        stateRef.current.phase = 'erasing';
        timerRef.current = setTimeout(tick, pauseMs);
      } else {
        if (index > 0) {
          stateRef.current.index = index - 1;
          setDisplayed(fullText.slice(0, index - 1));
          timerRef.current = setTimeout(tick, eraseSpeed);
        } else {
          stateRef.current.phase = 'typing';
          timerRef.current = setTimeout(tick, 300);
        }
      }
    };

    timerRef.current = setTimeout(tick, typingSpeed);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return displayed;
}

// FIXED: Hashtag cycler — ref-based, no infinite loop
function useHashtagCycler(tags: string[], speed = 55, pause = 900, eraseSpeed = 30) {
  const [displayed, setDisplayed] = useState('');
  const stateRef = useRef<{ phase: 'typing' | 'pause' | 'erasing'; charIndex: number; tagIndex: number }>({
    phase: 'typing',
    charIndex: 0,
    tagIndex: 0,
  });
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const tagsRef = useRef(tags);
  tagsRef.current = tags;

  useEffect(() => {
    const tick = () => {
      let s = stateRef.current;
      const tag = tagsRef.current[s.tagIndex] ?? '';

      if (s.phase === 'typing') {
        if (s.charIndex < tag.length) {
          s.charIndex++;
          setDisplayed(tag.slice(0, s.charIndex));
          timerRef.current = setTimeout(tick, speed);
        } else {
          s.phase = 'pause';
          timerRef.current = setTimeout(tick, pause);
        }
      } else if (s.phase === 'pause') {
        s.phase = 'erasing';
        timerRef.current = setTimeout(tick, pause);
      } else {
        if (s.charIndex > 0) {
          s.charIndex--;
          setDisplayed(tag.slice(0, s.charIndex));
          timerRef.current = setTimeout(tick, eraseSpeed);
        } else {
          s.tagIndex = (s.tagIndex + 1) % tagsRef.current.length;
          s.phase = 'typing';
          timerRef.current = setTimeout(tick, 200);
        }
      }
    };

    timerRef.current = setTimeout(tick, speed);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { displayed };
}

// DSP Mini Card — cycles through store names with color accent
function DspMiniCard() {
  const [storeIndex, setStoreIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      const t = setTimeout(() => {
        setStoreIndex((prev) => (prev + 1) % DSP_STORES.length);
        setVisible(true);
      }, 250);
      return () => clearTimeout(t);
    }, 1400);
    return () => clearInterval(interval);
  }, []);

  const store = DSP_STORES[storeIndex];

  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        background: 'rgba(0,0,0,0.35)',
        border: `1px solid ${store.color}55`,
        borderRadius: '8px',
        padding: '5px 12px',
        marginTop: '10px',
        transition: 'opacity 0.25s ease',
        opacity: visible ? 1 : 0,
        minWidth: '145px',
        boxShadow: `0 0 10px ${store.color}22`,
      }}
    >
      <span
        style={{
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          background: store.color,
          boxShadow: `0 0 8px ${store.color}`,
          flexShrink: 0,
        }}
      />
      <span
        style={{
          fontSize: '0.7rem',
          fontWeight: 700,
          color: store.color,
          letterSpacing: '0.05em',
          whiteSpace: 'nowrap',
        }}
      >
        {store.name}
      </span>
      <span style={{ fontSize: '9px', color: 'rgba(255,255,255,0.35)', marginLeft: 'auto' }}>LIVE</span>
    </div>
  );
}

// Service Ticker Bar
function ServiceTickerBar() {
  const [tickerIndex, setTickerIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      const t = setTimeout(() => {
        setTickerIndex((prev) => (prev + 1) % TICKER_ITEMS.length);
        setVisible(true);
      }, 200);
      return () => clearTimeout(t);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        width: '100%',
        background: 'linear-gradient(90deg, rgba(60,10,120,0.4) 0%, rgba(100,20,200,0.25) 50%, rgba(60,10,120,0.4) 100%)',
        border: '1px solid rgba(160,80,255,0.25)',
        borderRadius: '6px',
        padding: '7px 14px',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        overflow: 'hidden',
        backdropFilter: 'blur(4px)',
      }}
    >
      <span
        style={{
          width: '6px',
          height: '6px',
          borderRadius: '50%',
          background: '#a855f7',
          boxShadow: '0 0 8px #a855f7',
          flexShrink: 0,
          animation: 'kmPulse 1s ease-in-out infinite',
        }}
      />
      <span
        style={{
          fontSize: '0.65rem',
          fontWeight: 700,
          color: 'rgba(200,150,255,0.9)',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          transition: 'opacity 0.2s ease',
          opacity: visible ? 1 : 0,
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          flex: 1,
        }}
      >
        {TICKER_ITEMS[tickerIndex]}
      </span>
      <span style={{ color: 'rgba(160,80,255,0.5)', fontSize: '9px', flexShrink: 0 }}>▶▶</span>
    </div>
  );
}

// ── NEW CARD DESIGNS ──────────────────────────────────────────────────────────

// Card 1: Karhari Media Platform Card — holographic neon style
function PlatformCard({
  titleText,
  subtitleText,
  activeTag,
}: {
  titleText: string;
  subtitleText: string;
  activeTag: string;
}) {
  return (
    <div className="km-card km-card--platform">
      {/* Animated corner accents */}
      <span className="km-corner km-corner--tl" />
      <span className="km-corner km-corner--tr" />
      <span className="km-corner km-corner--bl" />
      <span className="km-corner km-corner--br" />

      {/* Scan line */}
      <div className="km-scanline" />

      <div className="km-card__inner">
        {/* Top badge row */}
        <div className="km-card__badge-row">
          <span className="km-badge km-badge--live">
            <span className="km-badge__dot" />
            LIVE
          </span>
          <span className="km-badge km-badge--platform">PLATFORM</span>
        </div>

        {/* Logo / icon area */}
        <div className="km-card__icon-wrap">
          <div className="km-card__icon-ring" />
          <div className="km-card__icon-ring km-card__icon-ring--2" />
          <img
            src="/assets/images/1608452013412__1_-1786795544832.png"
            alt="Karhari Media brand logo"
            style={{ width: 32, height: 32, objectFit: 'contain', borderRadius: '50%', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 2 }}
          />
        </div>

        {/* Title */}
        <div className="km-card__title-block">
          <div className="km-card__subtitle">
            {subtitleText}
            <span className="km-cursor">|</span>
          </div>
          <div className="km-card__title">
            {titleText || '\u00A0'}
            {titleText.length > 0 && titleText.length < 'Global Music Distribution Artists and Labels'.length && (
              <span className="km-cursor">|</span>
            )}
          </div>
        </div>

        {/* Hashtag */}
        <div className="km-card__tag">
          <span className="km-tag-text">
            {activeTag}
            <span className="km-cursor">|</span>
          </span>
        </div>

        {/* DSP mini card */}
        <DspMiniCard />
      </div>
    </div>
  );
}

// Card 2: Green Media Distribution Network Card — circuit/data-stream style
function DistributionCard({ activeDescTag }: { activeDescTag: string }) {
  return (
    <div className="km-card km-card--distribution">
      {/* Animated corner accents */}
      <span className="km-corner km-corner--tl km-corner--green" />
      <span className="km-corner km-corner--tr km-corner--green" />
      <span className="km-corner km-corner--bl km-corner--green" />
      <span className="km-corner km-corner--br km-corner--green" />

      {/* Data stream lines */}
      <div className="km-datastream" />

      <div className="km-card__inner">
        {/* Top badge row */}
        <div className="km-card__badge-row">
          <span className="km-badge km-badge--network">
            <span className="km-badge__dot km-badge__dot--green" />
            NETWORK
          </span>
          <span className="km-badge km-badge--dist">DISTRIBUTION</span>
        </div>

        {/* Icon */}
        <div className="km-card__icon-wrap km-card__icon-wrap--green">
          <div className="km-card__icon-ring km-card__icon-ring--green" />
          <div className="km-card__icon-ring km-card__icon-ring--2 km-card__icon-ring--green2" />
          <img
            src="/assets/images/1608452013412__1_-1786795544832.png"
            alt="Karhari Media brand logo"
            style={{ width: 32, height: 32, objectFit: 'contain', borderRadius: '50%', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 2 }}
          />
        </div>

        {/* Title */}
        <div className="km-card__title-block">
          <div className="km-card__subtitle km-card__subtitle--green">
            Karhari Media
          </div>
          <div className="km-card__title km-card__title--green">
            Distribution Network
          </div>
        </div>

        {/* Description */}
        <p className="km-card__desc">
          Through <strong>Karhari Media Distribution</strong>, artists and record labels can distribute songs and manage YouTube channels across <strong>150+ platforms</strong> worldwide.
        </p>

        {/* Hashtag */}
        <div className="km-card__tag km-card__tag--green">
          <span className="km-tag-text km-tag-text--green">
            {activeDescTag}
            <span className="km-cursor km-cursor--green">|</span>
          </span>
        </div>

        {/* DSP mini card */}
        <DspMiniCard />
      </div>
    </div>
  );
}

export default function AllPlatformsSection() {
  const titleText = useTypewriter('Global Music Distribution Artists and Labels', 55, 1600, 30);
  const subtitleText = useTypewriter('Karhari Media', 80, 2000, 45);
  const { displayed: activeTag } = useHashtagCycler(TITLE_TAGS);
  const { displayed: activeDescTag } = useHashtagCycler(DESC_TAGS, 50, 800, 28);

  const handleEditImage = useCallback(() => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        console.log('Image selected:', file.name);
      }
    };
    input.click();
  }, []);

  return (
    <section
      className="all-platforms"
      style={{
        position: 'relative',
        overflow: 'hidden',
        background: 'linear-gradient(135deg, #0a0014 0%, #12002a 40%, #0d0020 70%, #080010 100%)',
        minHeight: '100vh',
      }}
    >
      <FingerprintCanvas />

      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(140,60,220,0.10) 0%, transparent 70%)',
          zIndex: 0,
          pointerEvents: 'none',
        }}
      />

      <div className="platforms-container" style={{ position: 'relative', zIndex: 1 }}>

        {/* Left Content — two redesigned cards moved upward */}
        <div
          className="platforms-content"
          style={{
            opacity: 1,
          }}
        >
          {/* Card 1: Platform Card */}
          <PlatformCard
            titleText={titleText}
            subtitleText={subtitleText}
            activeTag={activeTag}
          />

          {/* Service Ticker Bar between cards */}
          <div style={{ padding: '10px 0' }}>
            <ServiceTickerBar />
          </div>

          {/* Card 2: Distribution Network Card */}
          <DistributionCard activeDescTag={activeDescTag} />
        </div>

        {/* Right Scrolling Columns */}
        <div className="platforms-scroll-wrapper" style={{ opacity: 1 }}>
          <div className="scroll-fade-top"></div>
          <div className="platforms-scroll" id="platformsScroll">
            <ScrollColumn items={col1} direction="up" />
            <ScrollColumn items={col2} direction="down" />
            <ScrollColumn items={col3} direction="up" />
            <ScrollColumn items={col4} direction="down" />
          </div>
          <div className="scroll-fade-bottom"></div>
        </div>
      </div>

      <style>{`
        /* ── Card Base ─────────────────────────────────────────── */
        .km-card {
          position: relative;
          border-radius: 16px;
          overflow: hidden;
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
          padding: 0;
          isolation: isolate;
        }

        /* Platform Card — purple/violet holographic */
        .km-card--platform {
          background: linear-gradient(135deg, rgba(88,28,135,0.18) 0%, rgba(109,40,217,0.12) 50%, rgba(67,20,100,0.22) 100%);
          border: 1px solid rgba(168,85,247,0.35);
          box-shadow:
            0 0 0 1px rgba(168,85,247,0.12),
            0 8px 32px rgba(88,28,135,0.35),
            inset 0 1px 0 rgba(255,255,255,0.06);
          animation: kmCardGlowPurple 3s ease-in-out infinite alternate;
        }

        /* Distribution Card — teal/green circuit style */
        .km-card--distribution {
          background: linear-gradient(135deg, rgba(6,78,59,0.18) 0%, rgba(5,150,105,0.10) 50%, rgba(4,60,45,0.22) 100%);
          border: 1px solid rgba(52,211,153,0.3);
          box-shadow:
            0 0 0 1px rgba(52,211,153,0.1),
            0 8px 32px rgba(6,78,59,0.35),
            inset 0 1px 0 rgba(255,255,255,0.04);
          animation: kmCardGlowGreen 3s ease-in-out infinite alternate;
        }

        @keyframes kmCardGlowPurple {
          0%   { box-shadow: 0 0 0 1px rgba(168,85,247,0.12), 0 8px 32px rgba(88,28,135,0.35), inset 0 1px 0 rgba(255,255,255,0.06); }
          100% { box-shadow: 0 0 0 1px rgba(168,85,247,0.25), 0 12px 48px rgba(139,92,246,0.5), 0 0 60px rgba(168,85,247,0.15), inset 0 1px 0 rgba(255,255,255,0.08); }
        }

        @keyframes kmCardGlowGreen {
          0%   { box-shadow: 0 0 0 1px rgba(52,211,153,0.1), 0 8px 32px rgba(6,78,59,0.35), inset 0 1px 0 rgba(255,255,255,0.04); }
          100% { box-shadow: 0 0 0 1px rgba(52,211,153,0.22), 0 12px 48px rgba(16,185,129,0.4), 0 0 60px rgba(52,211,153,0.12), inset 0 1px 0 rgba(255,255,255,0.06); }
        }

        /* ── Corner Accents ────────────────────────────────────── */
        .km-corner {
          position: absolute;
          width: 14px;
          height: 14px;
          border-color: rgba(168,85,247,0.7);
          border-style: solid;
          z-index: 2;
          pointer-events: none;
          animation: kmCornerPulse 2s ease-in-out infinite alternate;
        }
        .km-corner--green {
          border-color: rgba(52,211,153,0.65);
          animation: kmCornerPulseGreen 2s ease-in-out infinite alternate;
        }
        .km-corner--tl { top: 8px; left: 8px; border-width: 2px 0 0 2px; border-radius: 3px 0 0 0; }
        .km-corner--tr { top: 8px; right: 8px; border-width: 2px 2px 0 0; border-radius: 0 3px 0 0; }
        .km-corner--bl { bottom: 8px; left: 8px; border-width: 0 0 2px 2px; border-radius: 0 0 0 3px; }
        .km-corner--br { bottom: 8px; right: 8px; border-width: 0 2px 2px 0; border-radius: 0 0 3px 0; }

        @keyframes kmCornerPulse {
          0%   { border-color: rgba(168,85,247,0.4); }
          100% { border-color: rgba(216,180,254,0.9); }
        }
        @keyframes kmCornerPulseGreen {
          0%   { border-color: rgba(52,211,153,0.35); }
          100% { border-color: rgba(110,231,183,0.85); }
        }

        /* ── Scan Line ─────────────────────────────────────────── */
        .km-scanline {
          position: absolute;
          left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent 0%, rgba(168,85,247,0.6) 30%, rgba(216,180,254,0.9) 50%, rgba(168,85,247,0.6) 70%, transparent 100%);
          z-index: 3;
          pointer-events: none;
          animation: kmScanMove 3.5s linear infinite;
        }
        @keyframes kmScanMove {
          0%   { top: 0%; opacity: 0; }
          5%   { opacity: 1; }
          95%  { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }

        /* ── Data Stream (Distribution card) ───────────────────── */
        .km-datastream {
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent 0%, rgba(52,211,153,0.5) 30%, rgba(110,231,183,0.85) 50%, rgba(52,211,153,0.5) 70%, transparent 100%);
          z-index: 3;
          pointer-events: none;
          animation: kmScanMoveGreen 4s linear infinite;
        }
        @keyframes kmScanMoveGreen {
          0%   { top: 0%; opacity: 0; }
          5%   { opacity: 1; }
          95%  { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }

        /* ── Card Inner ────────────────────────────────────────── */
        .km-card__inner {
          padding: 18px 20px 16px;
          position: relative;
          z-index: 1;
        }

        /* ── Badge Row ─────────────────────────────────────────── */
        .km-card__badge-row {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 14px;
        }
        .km-badge {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          padding: 3px 9px;
          border-radius: 20px;
          font-size: 0.58rem;
          font-weight: 800;
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }
        .km-badge--live {
          background: rgba(88,28,135,0.4);
          border: 1px solid rgba(168,85,247,0.4);
          color: rgba(216,180,254,0.95);
        }
        .km-badge--platform {
          background: rgba(67,20,100,0.3);
          border: 1px solid rgba(139,92,246,0.3);
          color: rgba(196,181,253,0.8);
        }
        .km-badge--network {
          background: rgba(6,78,59,0.4);
          border: 1px solid rgba(52,211,153,0.35);
          color: rgba(110,231,183,0.95);
        }
        .km-badge--dist {
          background: rgba(4,60,45,0.3);
          border: 1px solid rgba(16,185,129,0.3);
          color: rgba(52,211,153,0.8);
        }
        .km-badge__dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #a855f7;
          box-shadow: 0 0 6px #a855f7;
          animation: kmPulse 1.2s ease-in-out infinite;
        }
        .km-badge__dot--green {
          background: #34d399;
          box-shadow: 0 0 6px #34d399;
        }

        /* ── Icon Area ─────────────────────────────────────────── */
        .km-card__icon-wrap {
          position: relative;
          width: 52px;
          height: 52px;
          margin-bottom: 14px;
        }
        .km-card__icon-wrap--green .km-card__icon-svg { filter: drop-shadow(0 0 8px rgba(52,211,153,0.5)); }
        .km-card__icon-ring {
          position: absolute;
          inset: 0;
          border-radius: 50%;
          border: 1px solid rgba(168,85,247,0.25);
          animation: kmRingSpin 6s linear infinite;
        }
        .km-card__icon-ring--2 {
          inset: 6px;
          border-color: rgba(139,92,246,0.2);
          animation-duration: 9s;
          animation-direction: reverse;
        }
        .km-card__icon-ring--green { border-color: rgba(52,211,153,0.25); }
        .km-card__icon-ring--green2 { border-color: rgba(16,185,129,0.2); }
        .km-card__icon-svg {
          position: absolute;
          inset: 8px;
          filter: drop-shadow(0 0 8px rgba(168,85,247,0.5));
        }
        @keyframes kmRingSpin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }

        /* ── Title Block ───────────────────────────────────────── */
        .km-card__title-block { margin-bottom: 10px; }
        .km-card__subtitle {
          font-size: 0.6rem;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: rgba(196,181,253,0.8);
          margin-bottom: 4px;
          min-height: 1.2em;
          font-family: monospace;
        }
        .km-card__subtitle--green { color: rgba(110,231,183,0.8); }
        .km-card__title {
          font-size: 1.05rem;
          font-weight: 800;
          color: rgba(233,213,255,0.95);
          line-height: 1.2;
          min-height: 1.3em;
          letter-spacing: -0.01em;
          background: linear-gradient(135deg, #e9d5ff 0%, #c084fc 60%, #818cf8 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .km-card__title--green {
          background: linear-gradient(135deg, #d1fae5 0%, #34d399 60%, #06b6d4 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        /* ── Description ───────────────────────────────────────── */
        .km-card__desc {
          font-size: 0.72rem;
          color: rgba(167,243,208,0.75);
          line-height: 1.6;
          margin-bottom: 10px;
          max-width: 300px;
        }
        .km-card__desc strong { color: rgba(110,231,183,0.95); }

        /* ── Tag ───────────────────────────────────────────────── */
        .km-card__tag {
          margin-top: 8px;
          min-height: 26px;
          display: flex;
          align-items: center;
        }
        .km-tag-text {
          font-size: 0.65rem;
          font-family: monospace;
          color: rgba(196,181,253,0.9);
          background: rgba(88,28,135,0.25);
          border: 1px solid rgba(139,92,246,0.3);
          border-radius: 20px;
          padding: 2px 10px;
          min-width: 110px;
          display: inline-block;
          letter-spacing: 0.04em;
        }
        .km-tag-text--green {
          color: rgba(110,231,183,0.9);
          background: rgba(6,78,59,0.25);
          border-color: rgba(52,211,153,0.3);
        }

        /* ── Cursor ────────────────────────────────────────────── */
        .km-cursor {
          display: inline-block;
          color: rgba(216,180,254,0.9);
          animation: kmBlink 0.9s step-end infinite;
          margin-left: 1px;
        }
        .km-cursor--green { color: rgba(110,231,183,0.9); }
        @keyframes kmBlink {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0; }
        }

        /* ── Pulse ─────────────────────────────────────────────── */
        @keyframes kmPulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.5; transform: scale(1.4); }
        }
      `}</style>
    </section>
  );
}
