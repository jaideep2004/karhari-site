'use client';

// Outer ring — 8 platforms from user's list
const orbitingPlatforms = [
  { name: 'Spotify',      angle: 0,   bg: '#1DB954' },
  { name: 'Apple Music',  angle: 45,  bg: '#FA243C' },
  { name: 'YouTube',      angle: 90,  bg: '#FF0000' },
  { name: 'Amazon Music', angle: 135, bg: '#00A8E1' },
  { name: 'TikTok',       angle: 180, bg: '#010101' },
  { name: 'Facebook',     angle: 225, bg: '#1877F2' },
  { name: 'Deezer',       angle: 270, bg: '#A238FF' },
  { name: 'TIDAL',        angle: 315, bg: '#000000' },
];

// Inner ring — remaining 4 platforms from user's list
const innerOrbitPlatforms = [
  { name: 'SoundCloud', angle: 0,   bg: '#FF5500' },
  { name: '7digital',   angle: 90,  bg: '#1565C0' },
  { name: 'Gaana',      angle: 180, bg: '#E8000D' },
  { name: 'Hungama',    angle: 270, bg: '#111111' },
];

// Brand background colors
const brandColors: Record<string, string> = {
  Spotify:       '#1DB954',
  'Apple Music': '#FA243C',
  YouTube:       '#FF0000',
  'Amazon Music':'#00A8E1',
  TikTok:        '#010101',
  Facebook:      '#1877F2',
  Deezer:        '#A238FF',
  TIDAL:         '#000000',
  SoundCloud:    '#FF5500',
  '7digital':    '#1565C0',
  Gaana:         '#E8000D',
  Hungama:       '#111111',
};

// High-quality icon URLs — using SimpleIcons CDN (svg) for crisp brand icons
const reliableIcons: Record<string, string> = {
  // Spotify — official green icon
  Spotify:       'https://cdn.simpleicons.org/spotify/FFFFFF',
  // Apple Music — white apple music icon
  'Apple Music': 'https://cdn.simpleicons.org/applemusic/FFFFFF',
  // YouTube — white play icon
  YouTube:       'https://cdn.simpleicons.org/youtube/FFFFFF',
  // Amazon Music — local uploaded asset
  'Amazon Music':'/assets/images/Stacked_Amazon_Music_CyanOnCharcoal_Circle_RGB-1786715172379.png',
  // TikTok — white tiktok icon
  TikTok:        'https://cdn.simpleicons.org/tiktok/FFFFFF',
  // Facebook — white facebook icon
  Facebook:      'https://cdn.simpleicons.org/facebook/FFFFFF',
  // Deezer — white deezer icon
  Deezer:        'https://cdn.simpleicons.org/deezer/FFFFFF',
  // TIDAL — white tidal icon
  TIDAL:         'https://cdn.simpleicons.org/tidal/FFFFFF',
  // SoundCloud — white soundcloud icon
  SoundCloud:    'https://cdn.simpleicons.org/soundcloud/FFFFFF',
  // 7digital — generated SVG brand icon
  '7digital':    '/assets/7digital-icon.svg',
  // Gaana — generated SVG brand icon
  Gaana:         '/assets/gaana-icon.svg',
  // Hungama — generated SVG brand icon
  Hungama:       '/assets/hungama-icon.svg',
};

// Initials fallback
const platformInitials: Record<string, string> = {
  Spotify:       'SP',
  'Apple Music': 'AM',
  YouTube:       'YT',
  'Amazon Music':'AZ',
  TikTok:        'TK',
  Facebook:      'FB',
  Deezer:        'DZ',
  TIDAL:         'TD',
  SoundCloud:    'SC',
  '7digital':    '7D',
  Gaana:         'GA',
  Hungama:       'HG',
};

interface PlatformIconProps {
  name: string;
  size: number;
}

// Platforms using full-color image logos — display on brand background
const fullColorLogoPlatforms = new Set<string>(['7digital', 'Gaana', 'Hungama']);

function PlatformIcon({ name, size }: PlatformIconProps) {
  const bg = brandColors[name] || '#333';
  const initials = platformInitials[name] || name.slice(0, 2).toUpperCase();
  const iconUrl = reliableIcons[name];
  const fontSize = size < 40 ? 10 : 13;
  const isFullColor = fullColorLogoPlatforms.has(name);
  // SVG brand icons have their own backgrounds — display at full size; others use brand bg with white icon
  const circleBg = isFullColor ? bg : bg;
  const glowColor = bg;

  return (
    <div
      className="w-full h-full rounded-full flex items-center justify-center overflow-hidden relative"
      role="img"
      aria-label={`${name} music platform`}
      style={{
        background: circleBg,
        border: '2px solid rgba(255,255,255,0.18)',
        boxShadow: `0 0 16px 4px ${glowColor}55, 0 4px 16px rgba(0,0,0,0.7)`
      }}>
      {iconUrl ? (
        <img
          src={iconUrl}
          alt={`${name} logo`}
          width={size * (isFullColor ? 1.0 : 0.65)}
          height={size * (isFullColor ? 1.0 : 0.65)}
          style={{ width: isFullColor ? '100%' : '65%', height: isFullColor ? '100%' : '65%', objectFit: 'cover', borderRadius: isFullColor ? '50%' : '0' }}
          onError={(e) => {
            const target = e.currentTarget as HTMLImageElement;
            target.style.display = 'none';
            const fallback = target.nextElementSibling as HTMLElement;
            if (fallback) fallback.style.display = 'flex';
          }}
        />
      ) : null}
      <div
        aria-hidden="true"
        style={{
          display: iconUrl ? 'none' : 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '100%',
          position: 'absolute',
          inset: 0,
          color: isFullColor ? bg : '#fff',
          fontWeight: 700,
          fontSize,
          letterSpacing: '0.05em'
        }}>
        {initials}
      </div>
    </div>
  );
}

export default function OrbitalRings() {
  const outerRadius = 230;
  const innerRadius = 155;
  const iconSize = 54;
  const innerIconSize = 46;
  const center = 260;

  return (
    <div className="absolute inset-0" style={{ width: 520, height: 520 }}>
      {/* ── Outer orbital ring ── */}
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          top: center - outerRadius,
          left: center - outerRadius,
          width: outerRadius * 2,
          height: outerRadius * 2,
          border: '1px solid rgba(0,220,255,0.25)',
          boxShadow: '0 0 20px 3px rgba(0,180,255,0.12), inset 0 0 20px 3px rgba(0,180,255,0.05)'
        }}
      />

      {/* ── Inner orbital ring ── */}
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          top: center - innerRadius,
          left: center - innerRadius,
          width: innerRadius * 2,
          height: innerRadius * 2,
          border: '1px solid rgba(160,0,255,0.25)',
          boxShadow: '0 0 14px 2px rgba(140,0,255,0.1)'
        }}
      />

      {/* ── Mid glow ring ── */}
      <div
        className="absolute rounded-full pointer-events-none glow-ring-pulse-slow"
        style={{
          top: center - 125,
          left: center - 125,
          width: 250,
          height: 250,
          border: '1.5px solid rgba(0,200,255,0.35)'
        }}
      />

      {/* ── Outer spinning wrapper ── */}
      <div
        className="absolute"
        style={{
          top: center - outerRadius,
          left: center - outerRadius,
          width: outerRadius * 2,
          height: outerRadius * 2,
          animation: 'orbitSpin 22s linear infinite'
        }}
        role="list"
        aria-label="Music distribution platforms">
        {orbitingPlatforms?.map((platform, i) => {
          const angleRad = platform?.angle * Math.PI / 180;
          const x = outerRadius + outerRadius * Math.sin(angleRad) - iconSize / 2;
          const y = outerRadius - outerRadius * Math.cos(angleRad) - iconSize / 2;
          return (
            <div
              key={`outer-${i}`}
              className="absolute"
              role="listitem"
              style={{
                left: x,
                top: y,
                width: iconSize,
                height: iconSize,
                animation: 'iconCounterRotate 22s linear infinite'
              }}>
              <PlatformIcon name={platform.name} size={iconSize} />
            </div>
          );
        })}
      </div>

      {/* ── Inner spinning wrapper (counter-clockwise) ── */}
      <div
        className="absolute"
        style={{
          top: center - innerRadius,
          left: center - innerRadius,
          width: innerRadius * 2,
          height: innerRadius * 2,
          animation: 'orbitSpin 32s linear infinite reverse'
        }}
        role="list"
        aria-label="Additional music streaming platforms">
        {innerOrbitPlatforms?.map((platform, i) => {
          const angleRad = platform?.angle * Math.PI / 180;
          const x = innerRadius + innerRadius * Math.sin(angleRad) - innerIconSize / 2;
          const y = innerRadius - innerRadius * Math.cos(angleRad) - innerIconSize / 2;
          return (
            <div
              key={`inner-${i}`}
              className="absolute"
              role="listitem"
              style={{
                left: x,
                top: y,
                width: innerIconSize,
                height: innerIconSize,
                animation: 'iconCounterRotate 32s linear infinite'
              }}>
              <PlatformIcon name={platform.name} size={innerIconSize} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
