'use client';
import React, { useEffect, useState } from 'react';

const YouTubeIcon = ({ size = 36 }: { size?: number }) => (
  <svg viewBox="0 0 24 24" width={size} height={size}>
    <path d="M23.5 6.2c-.3-1-1-1.8-2-2.1C19.7 3.5 12 3.5 12 3.5s-7.7 0-9.5.6c-1 .3-1.7 1.1-2 2.1C0 8 0 12 0 12s0 4 .5 5.8c.3 1 1 1.8 2 2.1C4.3 20.5 12 20.5 12 20.5s7.7 0 9.5-.6c1-.3 1.7-1.1 2-2.1C24 16 24 12 24 12s0-4-.5-5.8z" fill="#FF0000"/>
    <polygon points="9.5,15.5 15.8,12 9.5,8.5" fill="white"/>
  </svg>
);

const KMIcon = ({ size = 36, glow = '#ffd700' }: { size?: number; glow?: string }) => (
  <img
    src="/assets/images/1608452013412__1_-1786673847726.png"
    alt="Karhari Media"
    style={{ width: size, height: size, objectFit: 'contain', filter: `drop-shadow(0 0 8px ${glow})` }}
  />
);

const BusinessIcon = ({ size = 28, color = '#00f5ff' }: { size?: number; color?: string }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none">
    <rect x="3" y="7" width="18" height="14" rx="2" stroke={color} strokeWidth="1.5" fill={color + '18'}/>
    <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    <line x1="12" y1="12" x2="12" y2="12" stroke={color} strokeWidth="2" strokeLinecap="round"/>
    <rect x="10" y="11" width="4" height="3" rx="0.5" stroke={color} strokeWidth="1.2" fill={color + '22'}/>
    <line x1="3" y1="12" x2="21" y2="12" stroke={color} strokeWidth="1" strokeOpacity="0.4"/>
  </svg>
);

/* ═══════════════════════════════════════════
   LIVE COUNTER HOOK
═══════════════════════════════════════════ */
function useLiveCounter(baseMillions: number, incrementPerTick: number = 0.003) {
  const [value, setValue] = useState(baseMillions);
  useEffect(() => {
    const interval = setInterval(() => {
      setValue(v => parseFloat((v + incrementPerTick).toFixed(4)));
    }, 280);
    return () => clearInterval(interval);
  }, [incrementPerTick]);
  return value;
}

function formatMillions(n: number): string {
  if (n >= 1000) return (n / 1000).toFixed(2) + 'B';
  if (n >= 1) return n.toFixed(2) + 'M';
  return (n * 1000).toFixed(1) + 'K';
}

function useCounter(target: number, duration: number = 3000, increment: number = 1) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    let current = 0;
    const steps = Math.floor(duration / 50);
    const step = target / steps;
    const timer = setInterval(() => {
      current += step;
      if (current >= target) { setValue(target); clearInterval(timer); }
      else { setValue(Math.floor(current)); }
    }, 50);
    const slowTimer = setTimeout(() => {
      const slow = setInterval(() => { setValue(v => v + increment); }, 900);
      return () => clearInterval(slow);
    }, duration + 200);
    return () => { clearInterval(timer); clearTimeout(slowTimer); };
  }, []);
  return value;
}

function formatNum(n: number): string {
  if (n >= 1_000_000_000) return (n / 1_000_000_000).toFixed(1) + 'B';
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(2) + 'M';
  if (n >= 1_000) return (n / 1_000).toFixed(1) + 'K';
  return n.toLocaleString();
}

/* ═══════════════════════════════════════════
   ANIMATED PIPELINE CONNECTOR
═══════════════════════════════════════════ */
function PipeConnector({ color, vertical = false, label }: { color: string; vertical?: boolean; label?: string }) {
  return (
    <div className="pipe-connector" style={{
      display: 'flex',
      flexDirection: vertical ? 'column' : 'row',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
      position: 'relative',
      zIndex: 10,
      ...(vertical ? { width: 2, minHeight: 32, margin: '0 auto' } : { height: 2, minWidth: 24, margin: 'auto 0' }),
    }}>
      <div style={{
        ...(vertical ? { width: 2, flex: 1 } : { height: 2, flex: 1 }),
        background: `linear-gradient(${vertical ? '180deg' : '90deg'}, ${color}33, ${color}88, ${color}33)`,
        boxShadow: `0 0 6px ${color}44`,
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute',
          ...(vertical ? { left: '-50%', top: 0, width: '200%', height: 8 } : { top: '-50%', left: 0, height: '200%', width: 8 }),
          background: `linear-gradient(${vertical ? '180deg' : '90deg'}, transparent, ${color}, transparent)`,
          boxShadow: `0 0 8px ${color}`,
          animation: `conn-travel-${vertical ? 'v' : 'h'} 1.5s linear infinite`,
        }} />
      </div>
      <div style={{
        width: 0, height: 0,
        ...(vertical ? {
          borderLeft: '6px solid transparent',
          borderRight: '6px solid transparent',
          borderTop: `8px solid ${color}88`,
          filter: `drop-shadow(0 0 4px ${color})`,
        } : {
          borderTop: '6px solid transparent',
          borderBottom: '6px solid transparent',
          borderLeft: `8px solid ${color}88`,
          filter: `drop-shadow(0 0 4px ${color})`,
        }),
      }} />
      {label && (
        <div style={{
          position: 'absolute',
          top: vertical ? '50%' : -18,
          left: vertical ? 8 : '50%',
          transform: vertical ? 'translateY(-50%)' : 'translateX(-50%)',
          fontSize: 7, color, fontWeight: 800, letterSpacing: '0.1em',
          whiteSpace: 'nowrap', background: '#020208', padding: '1px 4px',
        }}>{label}</div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════
   FINGERPRINT SCANNER ANIMATION
═══════════════════════════════════════════ */
function FingerprintScanner({ color, size = 52 }: { color: string; size?: number }) {
  return (
    <div style={{ position: 'relative', width: size, height: size, flexShrink: 0 }}>
      <svg viewBox="0 0 52 52" width={size} height={size} style={{ position: 'absolute', top: 0, left: 0 }}>
        <circle cx="26" cy="26" r="22" fill="none" stroke={color + '22'} strokeWidth="1"/>
        <path d="M26 10 C17 10 11 17 11 26 C11 35 17 42 26 42" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeDasharray="60" style={{ animation: `fp-draw 2s linear infinite` }}/>
        <path d="M26 15 C19 15 15 20 15 26 C15 32 19 37 26 37" fill="none" stroke={color + 'cc'} strokeWidth="1.8" strokeLinecap="round" strokeDasharray="50" style={{ animation: `fp-draw 2s linear 0.3s infinite` }}/>
        <path d="M26 20 C22 20 19 22.5 19 26 C19 29.5 22 32 26 32" fill="none" stroke={color + '99'} strokeWidth="1.8" strokeLinecap="round" strokeDasharray="35" style={{ animation: `fp-draw 2s linear 0.6s infinite` }}/>
        <path d="M26 10 C35 10 41 17 41 26 C41 35 35 42 26 42" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeDasharray="60" style={{ animation: `fp-draw 2s linear 0.15s infinite` }}/>
        <path d="M26 15 C33 15 37 20 37 26 C37 32 33 37 26 37" fill="none" stroke={color + 'cc'} strokeWidth="1.8" strokeLinecap="round" strokeDasharray="50" style={{ animation: `fp-draw 2s linear 0.45s infinite` }}/>
        <path d="M26 20 C30 20 33 22.5 33 26 C33 29.5 30 32 26 32" fill="none" stroke={color + '99'} strokeWidth="1.8" strokeLinecap="round" strokeDasharray="35" style={{ animation: `fp-draw 2s linear 0.75s infinite` }}/>
        <circle cx="26" cy="26" r="2.5" fill={color} style={{ animation: 'fp-center-pulse 1s ease-in-out infinite' }}/>
      </svg>
      <div style={{
        position: 'absolute', top: 4, left: 4, right: 4, height: 2,
        background: `linear-gradient(90deg, transparent, ${color}cc, transparent)`,
        boxShadow: `0 0 8px ${color}`,
        animation: 'fp-scan 1.5s ease-in-out infinite',
      }} />
    </div>
  );
}

/* ═══════════════════════════════════════════
   UNIFORM PIPELINE STEP CARD — Responsive
═══════════════════════════════════════════ */
interface StepCardProps {
  step: number;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  color: string;
  tags?: string[];
  scanning?: boolean;
  contentIdScan?: boolean;
  storeGrid?: React.ReactNode;
  delay?: number;
  liveNumber?: { value: number; label: string; prefix?: string };
}

function StepCard({ step, title, subtitle, icon, color, tags, scanning, contentIdScan, storeGrid, delay = 0, liveNumber }: StepCardProps) {
  const accentGlow = `${color}55`;
  const cardBg = `linear-gradient(135deg, ${color}18 0%, #0d0a1a 40%, ${color}0a 70%, #12081e 100%)`;
  return (
    <div className="pipeline-card" style={{
      position: 'relative',
      background: cardBg,
      border: `1.5px solid ${color}55`,
      borderRadius: 20,
      padding: '16px 14px 12px',
      overflow: 'hidden',
      boxShadow: `0 0 32px ${color}22, 0 8px 40px rgba(0,0,0,0.7), inset 0 1px 0 ${color}22`,
      animation: `mdp-card-rise 0.6s cubic-bezier(0.22,1,0.36,1) ${delay}s both`,
      flexShrink: 0,
      display: 'flex',
      flexDirection: 'column',
      gap: 0,
      backdropFilter: 'blur(12px)',
    } as React.CSSProperties}>

      <div style={{
        position: 'absolute', top: 0, left: '-120%', width: '80%', height: '100%',
        background: `linear-gradient(105deg, transparent 30%, ${color}18 50%, transparent 70%)`,
        animation: `mdp-shimmer 3.5s ease-in-out ${delay}s infinite`,
        zIndex: 2, pointerEvents: 'none',
      }} />

      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 2,
        background: `linear-gradient(90deg, transparent, ${color}cc, ${color}, ${color}cc, transparent)`,
        boxShadow: `0 0 12px ${color}`,
        animation: `mdp-top-glow 2s ease-in-out ${delay}s infinite`,
        zIndex: 8,
      }} />

      <div style={{
        position: 'absolute', bottom: -20, right: -20, width: 80, height: 80,
        borderRadius: '50%',
        background: `radial-gradient(circle, ${color}18 0%, transparent 70%)`,
        animation: `mdp-orb-float 4s ease-in-out ${delay * 0.5}s infinite`,
        zIndex: 1, pointerEvents: 'none',
      }} />

      <div style={{
        position: 'absolute', top: 10, right: 10,
        background: `linear-gradient(135deg, ${color}33, ${color}55)`,
        border: `1px solid ${color}88`,
        borderRadius: 8,
        padding: '2px 7px',
        fontSize: 9, fontWeight: 900, color,
        fontFamily: 'JetBrains Mono, monospace',
        boxShadow: `0 0 10px ${color}44, inset 0 1px 0 ${color}44`,
        zIndex: 9, letterSpacing: '0.05em',
      }}>0{step}</div>

      <div style={{
        width: 54, height: 54, borderRadius: 16,
        background: `linear-gradient(135deg, ${color}22 0%, ${color}0a 100%)`,
        border: `1.5px solid ${color}44`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        marginBottom: 10, flexShrink: 0,
        boxShadow: `0 0 20px ${color}33, inset 0 1px 0 ${color}33`,
        position: 'relative', overflow: 'hidden',
        animation: `mdp-icon-pulse 2.5s ease-in-out ${delay}s infinite`,
        zIndex: 5,
      }}>
        {icon}
        <div style={{
          position: 'absolute', top: '-100%', left: 0, width: '100%', height: '100%',
          background: `linear-gradient(180deg, transparent, ${color}44, transparent)`,
          animation: `pipe-scan-v 2.2s linear ${delay}s infinite`,
        }} />
      </div>

      <div style={{
        fontSize: 10.5, fontWeight: 900, color,
        letterSpacing: '0.06em', marginBottom: 5,
        textShadow: `0 0 12px ${color}88`,
        lineHeight: 1.25, flexShrink: 0,
        position: 'relative', zIndex: 5,
      }}>{title}</div>

      <div style={{
        fontSize: 8.5, color: '#7a6a9a', letterSpacing: '0.03em',
        lineHeight: 1.5, flexShrink: 0,
        flex: storeGrid ? '0 0 auto' : 1,
        position: 'relative', zIndex: 5,
      }}>{subtitle}</div>

      {liveNumber && (
        <div style={{
          marginTop: 8, padding: '7px 10px',
          background: `linear-gradient(135deg, ${color}15, ${color}08)`,
          border: `1px solid ${color}44`,
          borderRadius: 10, textAlign: 'center', flexShrink: 0,
          boxShadow: `0 0 12px ${color}18, inset 0 1px 0 ${color}22`,
          position: 'relative', zIndex: 5,
        }}>
          <div style={{
            fontSize: 17, fontWeight: 900, color,
            fontFamily: 'JetBrains Mono, monospace',
            textShadow: `0 0 14px ${color}`,
            letterSpacing: '0.04em',
          }}>{liveNumber.prefix || ''}{formatMillions(liveNumber.value)}</div>
          <div style={{ fontSize: 7, color: color + '99', letterSpacing: '0.12em', fontWeight: 700, marginTop: 2 }}>{liveNumber.label}</div>
        </div>
      )}

      {storeGrid && (
        <div style={{ marginTop: 8, flex: 1, position: 'relative', zIndex: 5 }}>
          {storeGrid}
        </div>
      )}

      {tags && !storeGrid && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 3, marginTop: 8, flexShrink: 0, position: 'relative', zIndex: 5 }}>
          {tags.map(tag => (
            <span key={tag} style={{
              fontSize: 7, fontWeight: 800, color,
              background: `linear-gradient(135deg, ${color}18, ${color}0a)`,
              border: `1px solid ${color}44`,
              borderRadius: 6, padding: '2px 6px', letterSpacing: '0.07em',
              boxShadow: `0 0 6px ${color}18`,
            }}>{tag}</span>
          ))}
        </div>
      )}

      {scanning && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 8, flexShrink: 0, position: 'relative', zIndex: 5 }}>
          <FingerprintScanner color={color} size={36} />
          <div style={{ fontSize: 7.5, color, letterSpacing: '0.12em', fontWeight: 800, animation: 'pipe-blink 0.9s infinite' }}>
            SCANNING...<br/>
            <span style={{ color: color + '88', fontWeight: 600 }}>VERIFYING</span>
          </div>
        </div>
      )}

      {contentIdScan && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 8, flexShrink: 0, position: 'relative', zIndex: 5 }}>
          <FingerprintScanner color={color} size={40} />
          <div style={{ fontSize: 7.5, color, letterSpacing: '0.1em', fontWeight: 800 }}>
            <div style={{ animation: 'pipe-blink 0.7s infinite' }}>CONTENT ID</div>
            <div style={{ color: color + '88', fontWeight: 600 }}>FINGERPRINT</div>
            <div style={{ color: '#00ff88', fontWeight: 800, animation: 'pipe-blink 1.2s infinite' }}>MATCHED ✓</div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════
   PHASE LABEL DIVIDER
═══════════════════════════════════════════ */
function PhaseDivider({ label, color }: { label: string; color: string }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 12,
      margin: '20px auto 16px', position: 'relative', zIndex: 10,
      width: '100%',
    }}>
      <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg, transparent, ${color}44)` }} />
      <div style={{
        display: 'flex', alignItems: 'center', gap: 8,
        background: `${color}0a`, border: `1px solid ${color}33`,
        borderRadius: 20, padding: '5px 16px',
        flexShrink: 0,
      }}>
        <div style={{ width: 6, height: 6, borderRadius: '50%', background: color, animation: 'pipe-blink 0.8s infinite', boxShadow: `0 0 6px ${color}` }} />
        <span style={{ fontSize: 'clamp(7px, 1.5vw, 9px)', color, letterSpacing: '0.15em', fontWeight: 800, whiteSpace: 'nowrap' }}>{label}</span>
      </div>
      <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg, ${color}44, transparent)` }} />
    </div>
  );
}

/* ═══════════════════════════════════════════
   PIPELINE ROW — responsive wrap
═══════════════════════════════════════════ */
function PipelineRow({ children, color }: { children: React.ReactNode; color: string }) {
  return (
    <div className="pipeline-row" style={{
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 0,
      flexWrap: 'wrap',
      paddingBottom: 8,
      paddingTop: 4,
      position: 'relative',
      zIndex: 6,
      width: '100%',
    }}>
      {children}
    </div>
  );
}

/* ═══════════════════════════════════════════
   COUNTER STRIP
═══════════════════════════════════════════ */
function CounterStrip({ items }: { items: Array<{ label: string; value: number; color: string; prefix?: string; suffix?: string }> }) {
  return (
    <div className="counter-strip" style={{
      display: 'grid',
      gridTemplateColumns: `repeat(${items.length}, 1fr)`,
      gap: 10,
      marginTop: 24,
      position: 'relative', zIndex: 10,
    }}>
      {items.map(item => (
        <div key={item.label} style={{
          background: `linear-gradient(135deg, ${item.color}0d 0%, #06060f 100%)`,
          border: `1px solid ${item.color}33`,
          borderRadius: 12, padding: '12px 16px', textAlign: 'center',
          position: 'relative', overflow: 'hidden',
          boxShadow: `0 0 14px ${item.color}14`,
        }}>
          <div style={{
            position: 'absolute', top: 0, left: '-100%', width: '100%', height: 2,
            background: `linear-gradient(90deg, transparent, ${item.color}, transparent)`,
            animation: 'pipe-scan-h 3s linear infinite',
          }} />
          <div style={{
            fontSize: 'clamp(14px, 2.5vw, 20px)', fontWeight: 900, color: item.color,
            fontFamily: 'JetBrains Mono, monospace',
            textShadow: `0 0 12px ${item.color}`,
          }}>{item.prefix}{formatNum(item.value)}{item.suffix}</div>
          <div style={{ fontSize: 'clamp(6px, 1.2vw, 8px)', color: '#555', letterSpacing: '0.1em', marginTop: 3, fontWeight: 700 }}>{item.label}</div>
        </div>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════
   SECTION HEADER
═══════════════════════════════════════════ */
function SectionHeader({ title, subtitle, badge, badgeColor, icon }: {
  title: string; subtitle: string; badge: string; badgeColor: string; icon: React.ReactNode;
}) {
  return (
    <div style={{ textAlign: 'center', marginBottom: 28, position: 'relative', zIndex: 10 }}>
      <div style={{
        display: 'inline-flex', alignItems: 'center', gap: 8,
        background: `${badgeColor}0d`, border: `1px solid ${badgeColor}44`,
        borderRadius: 20, padding: '5px 16px', marginBottom: 14,
      }}>
        <div style={{ width: 7, height: 7, borderRadius: '50%', background: badgeColor, animation: 'pipe-blink 1s infinite', boxShadow: `0 0 8px ${badgeColor}` }} />
        <span style={{ fontSize: 'clamp(8px, 1.5vw, 10px)', color: badgeColor, letterSpacing: '0.18em', fontWeight: 800 }}>{badge}</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14, marginBottom: 10, flexWrap: 'wrap' }}>
        {icon}
        <h2 style={{
          fontSize: 'clamp(16px, 3vw, 32px)', fontWeight: 900, margin: 0,
          background: `linear-gradient(135deg, ${badgeColor} 0%, #ffffff 50%, ${badgeColor}aa 100%)`,
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          letterSpacing: '0.04em', lineHeight: 1.1,
          textAlign: 'center',
        }}>{title}</h2>
      </div>
      <p style={{ color: '#4a4a6a', fontSize: 'clamp(8px, 1.5vw, 10px)', letterSpacing: '0.1em', margin: '0 auto', fontWeight: 600, maxWidth: 700, lineHeight: 1.5 }}>{subtitle}</p>
    </div>
  );
}

/* ═══════════════════════════════════════════
   YOUTUBE CREATOR INPUT CARDS
═══════════════════════════════════════════ */
function YTDualInputCards({ delay = 0 }: { delay?: number }) {
  const COLOR = '#FF0000';
  return (
    <div className="dual-input-cards" style={{ display: 'flex', flexDirection: 'column', gap: 10, flexShrink: 0 }}>
      <div className="dual-card" style={{
        position: 'relative',
        background: `linear-gradient(145deg, ${COLOR}12 0%, #06060f 60%, ${COLOR}06 100%)`,
        border: `1px solid ${COLOR}44`, borderRadius: 14, padding: '12px 14px',
        overflow: 'hidden', boxShadow: `0 0 20px ${COLOR}1a, 0 4px 24px rgba(0,0,0,0.5)`,
        animation: `pipe-card-appear 0.5s cubic-bezier(0.34,1.56,0.64,1) ${delay}s both`,
      }}>
        <div style={{ position: 'absolute', top: 0, left: '-100%', width: '100%', height: '2px', background: `linear-gradient(90deg, transparent, ${COLOR}cc, transparent)`, animation: `pipe-scan-h 2s linear ${delay}s infinite`, zIndex: 8 }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 40, height: 40, borderRadius: 10, background: `radial-gradient(circle, ${COLOR}1a 0%, transparent 70%)`, border: `1px solid ${COLOR}33`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <YouTubeIcon size={26} />
          </div>
          <div>
            <div style={{ fontSize: 10, fontWeight: 900, color: COLOR, letterSpacing: '0.07em', marginBottom: 3, textShadow: `0 0 8px ${COLOR}66` }}>CREATOR / ARTIST</div>
            <div style={{ fontSize: 8, color: '#5a5a7a', lineHeight: 1.4 }}>Submits YouTube channel or audio file to Karhari Media</div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 3, marginTop: 8 }}>
          {['YT CHANNEL', 'AUDIO', 'SUBMIT'].map(t => (
            <span key={t} style={{ fontSize: 6.5, fontWeight: 800, color: COLOR, background: `${COLOR}12`, border: `1px solid ${COLOR}30`, borderRadius: 3, padding: '1px 4px', letterSpacing: '0.06em' }}>{t}</span>
          ))}
        </div>
      </div>

      <div className="dual-card" style={{
        position: 'relative',
        background: `linear-gradient(145deg, #ffd70012 0%, #06060f 60%, #ffd70006 100%)`,
        border: `1px solid #ffd70044`, borderRadius: 14, padding: '12px 14px',
        overflow: 'hidden', boxShadow: `0 0 20px #ffd7001a, 0 4px 24px rgba(0,0,0,0.5)`,
        animation: `pipe-card-appear 0.5s cubic-bezier(0.34,1.56,0.64,1) ${delay + 0.1}s both`,
      }}>
        <div style={{ position: 'absolute', top: 0, left: '-100%', width: '100%', height: '2px', background: `linear-gradient(90deg, transparent, #ffd700cc, transparent)`, animation: `pipe-scan-h 2.2s linear ${delay + 0.3}s infinite`, zIndex: 8 }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 40, height: 40, borderRadius: 10, background: `radial-gradient(circle, #ffd7001a 0%, transparent 70%)`, border: `1px solid #ffd70033`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <BusinessIcon size={24} color="#ffd700" />
          </div>
          <div>
            <div style={{ fontSize: 10, fontWeight: 900, color: '#ffd700', letterSpacing: '0.07em', marginBottom: 3, textShadow: `0 0 8px #ffd70066` }}>RECORD LABEL</div>
            <div style={{ fontSize: 8, color: '#5a5a7a', lineHeight: 1.4 }}>Sends music catalog &amp; YouTube channels</div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 3, marginTop: 8 }}>
          {['CATALOG', 'CHANNELS', 'MUSIC'].map(t => (
            <span key={t} style={{ fontSize: 6.5, fontWeight: 800, color: '#ffd700', background: `#ffd70012`, border: `1px solid #ffd70030`, borderRadius: 3, padding: '1px 4px', letterSpacing: '0.06em' }}>{t}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   YOUTUBE MCN PAYOUT CARDS
═══════════════════════════════════════════ */
function YTPayoutCards({ delay = 0 }: { delay?: number }) {
  const entries = [
    { label: 'CREATORS', icon: <YouTubeIcon size={22} />, color: '#FF0000', sub: 'Channel revenue & analytics' },
    { label: 'ARTISTS', icon: <BusinessIcon size={20} color="#00f5ff" />, color: '#00f5ff', sub: 'Music royalties & streams' },
    { label: 'LABELS', icon: <BusinessIcon size={20} color="#a855f7" />, color: '#a855f7', sub: 'Catalog & label payouts' },
  ];
  return (
    <div className="dual-input-cards" style={{ display: 'flex', flexDirection: 'column', gap: 8, flexShrink: 0 }}>
      {entries.map((e, i) => (
        <div className="dual-card" key={i} style={{
          position: 'relative',
          background: `linear-gradient(145deg, ${e.color}10 0%, #06060f 60%, ${e.color}06 100%)`,
          border: `1px solid ${e.color}44`, borderRadius: 12, padding: '10px 12px',
          overflow: 'hidden', boxShadow: `0 0 16px ${e.color}14`,
          animation: `pipe-card-appear 0.5s cubic-bezier(0.34,1.56,0.64,1) ${delay + i * 0.1}s both`,
          display: 'flex', alignItems: 'center', gap: 10,
        }}>
          <div style={{ position: 'absolute', top: 0, left: '-100%', width: '100%', height: '2px', background: `linear-gradient(90deg, transparent, ${e.color}cc, transparent)`, animation: `pipe-scan-h 2s linear ${delay + i * 0.2}s infinite`, zIndex: 8 }} />
          <div style={{ width: 34, height: 34, borderRadius: 8, background: `radial-gradient(circle, ${e.color}1a 0%, transparent 70%)`, border: `1px solid ${e.color}33`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            {e.icon}
          </div>
          <div>
            <div style={{ fontSize: 10, fontWeight: 900, color: e.color, letterSpacing: '0.07em', textShadow: `0 0 6px ${e.color}66` }}>{e.label} PAID</div>
            <div style={{ fontSize: 7.5, color: '#5a5a7a', marginTop: 2 }}>{e.sub}</div>
          </div>
          <div style={{ marginLeft: 'auto', fontSize: 14, animation: 'pipe-blink 1.5s infinite' }}>💸</div>
        </div>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════
   SECTION 2: YOUTUBE MCN PIPELINE
═══════════════════════════════════════════ */
function YouTubeMCNPipeline() {
  const channels = useCounter(10847, 3000, 1);
  const ytRevenue = useCounter(3421847, 3500, 31);
  const views = useCounter(847000000, 4000, 500000);
  const claims = useCounter(284721, 2500, 7);

  const liveChannels = useLiveCounter(10.85, 0.004);
  const liveTracks = useLiveCounter(284.7, 0.012);
  const liveRevenue = useLiveCounter(3.42, 0.002);
  const liveViews = useLiveCounter(847.0, 0.35);
  const liveYTRevenue = useLiveCounter(3.42, 0.002);
  const livePayouts = useLiveCounter(2.87, 0.0015);

  const YT_COLOR = '#FF0000';
  const KM_COLOR = '#ffd700';

  return (
    <section style={{
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #020208 0%, #080010 50%, #020208 100%)',
      position: 'relative',
      overflow: 'hidden',
      padding: 'clamp(28px, 5vh, 64px) clamp(12px, 4vw, 72px) 40px',
      display: 'flex',
      flexDirection: 'column',
    }}>
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,0,0,0.018) 1px, transparent 1px), linear-gradient(90deg, rgba(255,0,0,0.018) 1px, transparent 1px)', backgroundSize: '70px 70px', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', top: '15%', right: '10%', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,0,0,0.04) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '15%', left: '10%', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,215,0,0.03) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'linear-gradient(90deg, transparent, #FF000088, transparent)', animation: 'pipe-global-scan 5s linear infinite', boxShadow: '0 0 16px #FF0000', pointerEvents: 'none', zIndex: 1 }} />

      <SectionHeader
        title="YOUTUBE MULTI-CHANNEL NETWORK PIPELINE"
        subtitle="CREATORS & LABELS → KARHARI MEDIA → CONTENT ID + MCN → YOUTUBE → REVENUE → PAYOUT"
        badge="YOUTUBE MCN ACTIVE"
        badgeColor={YT_COLOR}
        icon={<YouTubeIcon size={42} />}
      />

      <PhaseDivider label="PHASE 1 — SUBMIT · VERIFY · CONTENT ID SCAN · GO LIVE" color={YT_COLOR} />

      <PipelineRow color={YT_COLOR}>
        <YTDualInputCards delay={0} />
        <PipeConnector color={YT_COLOR} label="SUBMIT" />
        <StepCard
          step={2}
          title="KARHARI MEDIA VERIFIES CHANNEL"
          subtitle="Karhari Media verifies YouTube channel ownership, audio file authenticity & content eligibility for MCN"
          icon={<KMIcon size={30} glow={KM_COLOR} />}
          color={KM_COLOR}
          scanning={true}
          delay={0.2}
          liveNumber={{ value: liveChannels, label: 'CHANNELS VERIFIED', prefix: '' }}
        />
        <PipeConnector color={KM_COLOR} label="FINGERPRINT" />
        <StepCard
          step={3}
          title="CONTENT ID FINGERPRINT"
          subtitle="Audio fingerprint delivered to YouTube Content ID system. Channel connected to YouTube MCN network"
          icon={<YouTubeIcon size={30} />}
          color={YT_COLOR}
          contentIdScan={true}
          delay={0.35}
          liveNumber={{ value: liveTracks, label: 'TRACKS FINGERPRINTED', prefix: '' }}
        />
        <PipeConnector color={YT_COLOR} label="GO LIVE" />
        <StepCard
          step={4}
          title="CHANNEL GOES LIVE"
          subtitle="Content is live on YouTube — views, watch time, ad impressions & Content ID claims begin accumulating"
          icon={<YouTubeIcon size={30} />}
          color="#00ff88"
          tags={['LIVE ON YOUTUBE', 'VIEWS', 'WATCH TIME', 'MCN ACTIVE']}
          delay={0.5}
          liveNumber={{ value: liveViews, label: 'TOTAL VIEWS', prefix: '' }}
        />
      </PipelineRow>

      <PhaseDivider label="PHASE 2 — REVENUE · YOUTUBE SENDS TO KARHARI MEDIA · PROCESS · PAYOUT" color={KM_COLOR} />

      <PipelineRow color={KM_COLOR}>
        <StepCard
          step={5}
          title="REVENUE ON YOUTUBE"
          subtitle="Ad revenue, Content ID claims & YouTube Music royalties accumulate from views and streams"
          icon={<YouTubeIcon size={30} />}
          color={YT_COLOR}
          tags={['AD REVENUE', 'CONTENT ID', 'YT MUSIC', 'VIEWS']}
          delay={0}
          liveNumber={{ value: liveYTRevenue, label: 'YOUTUBE REVENUE', prefix: '$' }}
        />
        <PipeConnector color={YT_COLOR} label="SENDS TO KARHARI MEDIA" />
        <StepCard
          step={6}
          title="YOUTUBE → KARHARI MEDIA"
          subtitle="YouTube sends all revenue, analytics, Content ID earnings & streaming data to Karhari Media"
          icon={<KMIcon size={30} glow={KM_COLOR} />}
          color={KM_COLOR}
          scanning={true}
          delay={0.15}
          liveNumber={{ value: liveRevenue, label: 'REVENUE RECEIVED', prefix: '$' }}
        />
        <PipeConnector color={KM_COLOR} label="PROCESS" />
        <StepCard
          step={7}
          title="KARHARI MEDIA PROCESSES PAYOUT"
          subtitle="Karhari Media calculates earnings per channel, per creator — 100% transparent with full analytics report"
          icon={<KMIcon size={30} glow="#7b00ff" />}
          color="#7b00ff"
          tags={['CALCULATE', '100% TRANSPARENT', 'ANALYTICS', 'PROCESS']}
          delay={0.3}
          liveNumber={{ value: livePayouts, label: 'PAYOUTS PROCESSED', prefix: '$' }}
        />
        <PipeConnector color="#7b00ff" label="PAYOUT" />
        <YTPayoutCards delay={0.45} />
      </PipelineRow>

      <CounterStrip items={[
        { label: 'CHANNELS CONNECTED', value: channels, color: YT_COLOR },
        { label: 'YOUTUBE REVENUE', value: ytRevenue, color: KM_COLOR, prefix: '$' },
        { label: 'VIEWS TRACKED', value: views, color: '#00f5ff' },
        { label: 'CONTENT ID CLAIMS', value: claims, color: '#7b00ff' },
      ]} />

      <div style={{
        marginTop: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
        background: `${YT_COLOR}06`, border: `1px solid ${YT_COLOR}18`,
        borderRadius: 8, padding: '8px 20px', position: 'relative', zIndex: 10,
        flexWrap: 'wrap', textAlign: 'center',
      }}>
        <YouTubeIcon size={16} />
        <span style={{ fontSize: 'clamp(7px, 1.5vw, 9px)', color: `${YT_COLOR}77`, letterSpacing: '0.14em', fontWeight: 700 }}>
          MULTI-CHANNEL NETWORK · CONTENT ID DISTRIBUTION · YOUTUBE MUSIC ANALYTICS · 100% TRANSPARENT PAYOUT
        </span>
      </div>
    </section>
  );
}

export default function YouTubeMCNPipelinePage() {
  return (
    <>
      <style>{`
        @keyframes pipe-scan-h {
          0%   { transform: translateX(-110%); }
          100% { transform: translateX(210%); }
        }
        @keyframes pipe-scan-v {
          0%   { transform: translateY(-110%); }
          100% { transform: translateY(210%); }
        }
        @keyframes pipe-global-scan {
          0%   { transform: translateY(-100vh); opacity: 0; }
          5%   { opacity: 1; }
          95%  { opacity: 0.6; }
          100% { transform: translateY(200vh); opacity: 0; }
        }
        @keyframes pipe-blink {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.2; }
        }
        @keyframes pipe-card-appear {
          0%   { opacity: 0; transform: translateY(18px) scale(0.93); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes pipe-store-pop {
          0%   { opacity: 0; transform: scale(0.4); }
          100% { opacity: 1; transform: scale(1); }
        }
        @keyframes mdp-card-rise {
          0%   { opacity: 0; transform: translateY(24px) scale(0.9) rotateX(8deg); filter: blur(4px); }
          60%  { opacity: 1; filter: blur(0); }
          100% { opacity: 1; transform: translateY(0) scale(1) rotateX(0deg); filter: blur(0); }
        }
        @keyframes mdp-shimmer {
          0%   { left: -120%; }
          60%  { left: 120%; }
          100% { left: 120%; }
        }
        @keyframes mdp-top-glow {
          0%, 100% { opacity: 0.5; box-shadow: none; }
          50%       { opacity: 1; }
        }
        @keyframes mdp-icon-pulse {
          0%, 100% { box-shadow: 0 0 14px var(--icon-color, #f59e0b33); transform: scale(1); }
          50%       { box-shadow: 0 0 28px var(--icon-color, #f59e0b55); transform: scale(1.04); }
        }
        @keyframes mdp-orb-float {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50%       { transform: translate(-8px, -12px) scale(1.1); }
        }
        @keyframes mdp-store-pop {
          0%   { opacity: 0; transform: scale(0.3) rotate(-10deg); }
          70%  { transform: scale(1.08) rotate(2deg); }
          100% { opacity: 1; transform: scale(1) rotate(0deg); }
        }
        @keyframes mdp-num-tick {
          0%   { transform: scale(1.08); }
          100% { transform: scale(1); }
        }
        @keyframes fp-draw {
          0%   { stroke-dashoffset: 100; opacity: 0.2; }
          50%  { stroke-dashoffset: 0; opacity: 1; }
          100% { stroke-dashoffset: -100; opacity: 0.2; }
        }
        @keyframes fp-scan {
          0%   { top: 4px; opacity: 0.9; }
          50%  { top: calc(100% - 6px); opacity: 1; }
          100% { top: 4px; opacity: 0.9; }
        }
        @keyframes fp-center-pulse {
          0%, 100% { opacity: 0.6; transform: scale(1); }
          50%       { opacity: 1; transform: scale(1.4); }
        }
        @keyframes conn-travel-h {
          0%   { left: -8px; opacity: 0; }
          10%  { opacity: 1; }
          90%  { opacity: 1; }
          100% { left: calc(100% + 8px); opacity: 0; }
        }
        @keyframes conn-travel-v {
          0%   { top: -8px; opacity: 0; }
          10%  { opacity: 1; }
          90%  { opacity: 1; }
          100% { top: calc(100% + 8px); opacity: 0; }
        }
        @keyframes km-ring-cw  { to { transform: rotate(360deg); } }
        @keyframes km-ring-ccw { to { transform: rotate(-360deg); } }

        /* ═══════════════════════════════════════════
           RESPONSIVE LAYOUT RULES
        ═══════════════════════════════════════════ */

        /* Pipeline cards — fluid width */
        .pipeline-card {
          width: clamp(180px, 22vw, 240px);
          min-height: 260px;
        }

        /* Dual input cards — fluid width */
        .dual-input-cards {
          flex-shrink: 0;
        }
        .dual-card {
          width: clamp(160px, 20vw, 220px);
          min-height: 110px;
        }

        /* Pipeline row — wrap on small screens */
        .pipeline-row {
          row-gap: 12px;
          column-gap: 0;
        }

        /* Hide connectors when pipeline wraps */
        @media (max-width: 900px) {
          .pipe-connector {
            display: none !important;
          }
          .pipeline-row {
            gap: 12px !important;
            justify-content: center;
          }
          .pipeline-card {
            width: clamp(160px, 44vw, 220px) !important;
          }
          .dual-card {
            width: clamp(150px, 44vw, 210px) !important;
          }
        }

        @media (max-width: 600px) {
          .pipeline-card {
            width: calc(100vw - 40px) !important;
            max-width: 360px !important;
          }
          .dual-card {
            width: calc(100vw - 40px) !important;
            max-width: 360px !important;
          }
          .dual-input-cards {
            width: 100%;
          }
        }

        /* Counter strip — responsive columns */
        .counter-strip {
          grid-template-columns: repeat(2, 1fr) !important;
        }
        @media (min-width: 640px) {
          .counter-strip {
            grid-template-columns: repeat(4, 1fr) !important;
          }
        }
      `}</style>
      <div style={{ background: '#020208', minHeight: '100vh' }}>
        <YouTubeMCNPipeline />
      </div>
    </>
  );
}