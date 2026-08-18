'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

function YTLogo({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={Math.round(size * 0.7)} viewBox="0 0 90 63" fill="none">
      <rect width="90" height="63" rx="13" fill="#FF0000" />
      <polygon points="36,16 36,47 62,31.5" fill="white" />
    </svg>
  );
}

function KMLogo({ size = 32 }: { size?: number }) {
  return (
    <Image src="/assets/images/1608452013412__1_-1786434023986.png"
      alt="Karhari Media" width={Math.round(size * 2.6)} height={size} className="object-contain" />
  );
}

function LiveDot({ color = '#00ff88' }: { color?: string }) {
  return <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: color, animation: 'ytp-blink 1.1s ease-in-out infinite', boxShadow: `0 0 6px ${color}` }} />;
}

function LaserBorder({ color }: { color: string }) {
  return (
    <div className="absolute inset-0 rounded-2xl pointer-events-none overflow-hidden">
      <div className="absolute top-0 left-0 h-[2px] w-full" style={{ background: `linear-gradient(90deg, transparent 0%, ${color} 50%, transparent 100%)`, animation: 'ytp-laser-h 2s linear infinite' }} />
      <div className="absolute bottom-0 left-0 h-[2px] w-full" style={{ background: `linear-gradient(90deg, transparent 0%, ${color} 50%, transparent 100%)`, animation: 'ytp-laser-h-rev 2.3s linear infinite' }} />
      <div className="absolute top-0 left-0 w-[2px] h-full" style={{ background: `linear-gradient(180deg, transparent 0%, ${color} 50%, transparent 100%)`, animation: 'ytp-laser-v 1.8s linear infinite' }} />
      <div className="absolute top-0 right-0 w-[2px] h-full" style={{ background: `linear-gradient(180deg, transparent 0%, ${color} 50%, transparent 100%)`, animation: 'ytp-laser-v-rev 2.1s linear infinite' }} />
    </div>
  );
}

interface PolicyItem {
  point: string;
  url?: string;
}

interface PolicySection {
  title: string;
  color: string;
  policyUrl: string;
  policyLabel: string;
  icon: 'yt' | 'km';
  items: PolicyItem[];
}

const policies: PolicySection[] = [
  {
    title: 'YouTube Partner Program (YPP) & Monetization Policy',
    color: '#FF0000',
    policyUrl: 'https://support.google.com/youtube/answer/72857',
    policyLabel: 'YouTube Monetization Policy',
    icon: 'yt',
    items: [
      { point: 'Channel must have 1,000+ subscribers and 4,000 watch hours in the last 12 months', url: 'https://support.google.com/youtube/answer/72857' },
      { point: 'All content must comply with YouTube Community Guidelines', url: 'https://www.youtube.com/howyoutubeworks/policies/community-guidelines/' },
      { point: 'Advertiser-friendly content guidelines must be strictly followed', url: 'https://support.google.com/youtube/answer/6162278' },
      { point: 'No re-uploaded or third-party content without documented rights', url: 'https://support.google.com/youtube/answer/2797370' },
      { point: 'Channel must be in good standing — no active Community Guidelines strikes', url: 'https://support.google.com/youtube/answer/2797387' },
      { point: 'Spam, deceptive practices, and misleading content are prohibited', url: 'https://support.google.com/youtube/answer/2801973' },
    ],
  },
  {
    title: 'YouTube Content ID Policy',
    color: '#ff6b00',
    policyUrl: 'https://support.google.com/youtube/answer/2797370',
    policyLabel: 'YouTube Content ID Overview',
    icon: 'yt',
    items: [
      { point: 'Only exclusive rights holders may submit reference files to Content ID', url: 'https://support.google.com/youtube/answer/2797370' },
      { point: 'Reference files must be original, owned audio or video content', url: 'https://support.google.com/youtube/answer/2797370' },
      { point: 'Invalid or inaccurate Content ID claims are strictly prohibited', url: 'https://support.google.com/youtube/answer/4352063' },
      { point: 'Misuse of Content ID results in permanent removal from the program', url: 'https://support.google.com/youtube/answer/4352063' },
      { point: 'Content ID partners must have exclusive rights to submitted content', url: 'https://support.google.com/youtube/answer/2797370' },
      { point: 'All Content ID claims must be accurate — false claims violate policy', url: 'https://support.google.com/youtube/answer/4352063' },
      { point: 'Disputed claims must be resolved through official YouTube dispute process', url: 'https://support.google.com/youtube/answer/2797454' },
    ],
  },
  {
    title: 'YouTube Multi-Channel Network (MCN) Policy',
    color: '#8b00ff',
    policyUrl: 'https://support.google.com/youtube/answer/2737059',
    policyLabel: 'YouTube MCN Policy',
    icon: 'yt',
    items: [
      { point: 'MCN partners must comply with all YouTube Terms of Service at all times', url: 'https://support.google.com/youtube/answer/2737059' },
      { point: 'MCN is fully responsible for all channels affiliated in its network', url: 'https://support.google.com/youtube/answer/2737059' },
      { point: 'Channels under MCN are managed through YouTube Content Manager (CMS)', url: 'https://support.google.com/youtube/answer/6301625' },
      { point: 'MCN must ensure all affiliated channels follow YouTube policies', url: 'https://support.google.com/youtube/answer/2737059' },
      { point: 'Channels violating policies may be removed from the MCN immediately', url: 'https://support.google.com/youtube/answer/2737059' },
      { point: 'MCN contracts must be transparent and not mislead creators', url: 'https://support.google.com/youtube/answer/2737059' },
      { point: 'Karhari Media manages Artist, Label & Creator channels through YouTube CMS', url: 'https://support.google.com/youtube/answer/6301625' },
    ],
  },
  {
    title: 'YouTube CMS (Content Manager System) Policy',
    color: '#00d4ff',
    policyUrl: 'https://support.google.com/youtube/answer/6301625',
    policyLabel: 'YouTube CMS Guide',
    icon: 'km',
    items: [
      { point: 'CMS is used to manage content, claims, and revenue across all channels', url: 'https://support.google.com/youtube/answer/6301625' },
      { point: 'All channel policies are enforced through YouTube Content Manager', url: 'https://support.google.com/youtube/answer/6301625' },
      { point: 'Revenue tracking and claims are managed via the YouTube CMS dashboard', url: 'https://support.google.com/youtube/answer/6301625' },
      { point: 'Channel ownership transfers require official YouTube verification process', url: 'https://support.google.com/youtube/answer/6301625' },
      { point: 'Karhari Media uses CMS to manage all Artist, Label & Creator channels', url: 'https://support.google.com/youtube/answer/6301625' },
      { point: 'All YouTube Channel Policies apply to every channel managed in CMS', url: 'https://support.google.com/youtube/answer/2801895' },
    ],
  },
  {
    title: 'YouTube Community Guidelines',
    color: '#00ff88',
    policyUrl: 'https://www.youtube.com/howyoutubeworks/policies/community-guidelines/',
    policyLabel: 'YouTube Community Guidelines',
    icon: 'yt',
    items: [
      { point: 'No spam, scams, or deceptive content of any kind', url: 'https://support.google.com/youtube/answer/2801973' },
      { point: 'No hate speech, harassment, or cyberbullying', url: 'https://support.google.com/youtube/answer/2801939' },
      { point: 'No violent or graphic content that shocks or disgusts', url: 'https://support.google.com/youtube/answer/2802008' },
      { point: 'No misinformation that could cause real-world harm', url: 'https://support.google.com/youtube/answer/10834785' },
      { point: 'No content that endangers minors in any way', url: 'https://support.google.com/youtube/answer/2801999' },
      { point: 'Copyright violations result in strikes and channel termination', url: 'https://support.google.com/youtube/answer/2797387' },
    ],
  },
  {
    title: 'YouTube Copyright & Fair Use Policy',
    color: '#D4F000',
    policyUrl: 'https://support.google.com/youtube/answer/2797454',
    policyLabel: 'YouTube Copyright Policy',
    icon: 'yt',
    items: [
      { point: 'Only upload content you created or have rights to use', url: 'https://support.google.com/youtube/answer/2797454' },
      { point: 'Three copyright strikes result in permanent channel termination', url: 'https://support.google.com/youtube/answer/2797387' },
      { point: 'Fair use does not automatically protect content from Content ID claims', url: 'https://support.google.com/youtube/answer/9783148' },
      { point: 'Copyright disputes must be filed through official YouTube dispute process', url: 'https://support.google.com/youtube/answer/2797454' },
      { point: 'Music in videos must be licensed — background music is not exempt', url: 'https://support.google.com/youtube/answer/2797454' },
      { point: 'Live performance recordings require clearance from all rights holders', url: 'https://support.google.com/youtube/answer/2797454' },
    ],
  },
  {
    title: 'YouTube Advertiser-Friendly Content Guidelines',
    color: '#ff6b00',
    policyUrl: 'https://support.google.com/youtube/answer/6162278',
    policyLabel: 'Advertiser-Friendly Guidelines',
    icon: 'yt',
    items: [
      { point: 'Content must be suitable for all advertisers to run ads against', url: 'https://support.google.com/youtube/answer/6162278' },
      { point: 'Inappropriate language, violence, or adult themes reduce ad revenue', url: 'https://support.google.com/youtube/answer/6162278' },
      { point: 'Controversial topics may result in limited or no monetization', url: 'https://support.google.com/youtube/answer/6162278' },
      { point: 'Thumbnails and titles must accurately represent video content', url: 'https://support.google.com/youtube/answer/6162278' },
      { point: 'Clickbait titles and misleading thumbnails violate policy', url: 'https://support.google.com/youtube/answer/2801973' },
    ],
  },
  {
    title: 'YouTube Terms of Service',
    color: '#FF0000',
    policyUrl: 'https://www.youtube.com/t/terms',
    policyLabel: 'YouTube Terms of Service',
    icon: 'yt',
    items: [
      { point: 'All users must agree to and comply with YouTube Terms of Service', url: 'https://www.youtube.com/t/terms' },
      { point: 'YouTube reserves the right to terminate accounts for policy violations', url: 'https://www.youtube.com/t/terms' },
      { point: 'Content uploaded to YouTube grants YouTube a license to use it', url: 'https://www.youtube.com/t/terms' },
      { point: 'Users are responsible for all content they upload', url: 'https://www.youtube.com/t/terms' },
      { point: 'YouTube Privacy Policy governs all data collection and usage', url: 'https://policies.google.com/privacy' },
    ],
  },
];

export default function YouTubePoliciesPage() {
  return (
    <div className="min-h-screen bg-[#060610] text-white overflow-x-hidden" style={{ fontFamily: "'DM Sans','Manrope',sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,700;0,9..40,900&display=swap');
        @keyframes ytp-spin    { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes ytp-spin-r  { from { transform: rotate(360deg); } to { transform: rotate(0deg); } }
        @keyframes ytp-blink   { 0%,100% { opacity: 1; } 50% { opacity: 0.15; } }
        @keyframes ytp-float   { 0%,100% { transform: translateY(0px); } 50% { transform: translateY(-8px); } }
        @keyframes ytp-scan    { 0% { transform: scale(0.8); opacity: 0.9; } 100% { transform: scale(1.8); opacity: 0; } }
        @keyframes ytp-shimmer { 0% { background-position: -200% center; } 100% { background-position: 200% center; } }
        @keyframes ytp-grid-move { from { transform: translateY(0); } to { transform: translateY(60px); } }
        @keyframes ytp-laser-h { 0% { transform: translateX(-100%); } 100% { transform: translateX(100%); } }
        @keyframes ytp-laser-h-rev { 0% { transform: translateX(100%); } 100% { transform: translateX(-100%); } }
        @keyframes ytp-laser-v { 0% { transform: translateY(-100%); } 100% { transform: translateY(100%); } }
        @keyframes ytp-laser-v-rev { 0% { transform: translateY(100%); } 100% { transform: translateY(-100%); } }
        @keyframes ytp-pulse-glow {
          0%,100% { box-shadow: 0 0 20px #FF000040, 0 0 40px #FF000015; }
          50%      { box-shadow: 0 0 40px #FF000070, 0 0 80px #FF000030; }
        }
        @keyframes ytp-data-stream {
          0%   { transform: translateY(-100%); opacity: 0; }
          10%  { opacity: 1; }
          90%  { opacity: 1; }
          100% { transform: translateY(100vh); opacity: 0; }
        }
        .ytp-shimmer-text {
          background: linear-gradient(90deg, #FF0000 0%, #ff6b00 25%, #D4F000 50%, #ff6b00 75%, #FF0000 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: ytp-shimmer 3s linear infinite;
        }
      `}</style>

      {/* ── Back link — kept below the global navbar ── */}
      <div className="fixed top-[88px] right-4 md:right-6 z-40">
        <Link href="/youtube-content-id"
          className="px-4 py-1.5 rounded-lg text-xs font-bold text-white border border-white/20 hover:border-red-500/50 transition-all"
          style={{ background: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(8px)' }}>
          ← Content ID Pipeline
        </Link>
      </div>

      {/* HERO */}
      <section className="relative pt-28 pb-12 overflow-hidden"
        style={{ background: 'radial-gradient(ellipse 120% 80% at 50% -10%, #1f0000 0%, #0a0010 45%, #060610 100%)' }}>
        <div className="absolute inset-0 opacity-[0.06]"
          style={{ backgroundImage: 'linear-gradient(#FF0000 1px, transparent 1px), linear-gradient(90deg, #FF0000 1px, transparent 1px)', backgroundSize: '50px 50px', animation: 'ytp-grid-move 8s linear infinite' }} />
        {[15, 35, 55, 75, 90].map((left, i) => (
          <div key={i} className="absolute top-0 w-px opacity-15 pointer-events-none"
            style={{ left: `${left}%`, height: '100%', background: `linear-gradient(180deg, transparent, ${['#FF0000','#D4F000','#00ff88','#8b00ff','#00d4ff'][i]}, transparent)`, animation: `ytp-data-stream ${4 + i * 1.2}s ${i * 0.8}s linear infinite` }} />
        ))}

        <div className="relative z-10 max-w-5xl mx-auto px-4 pt-10 text-center">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div style={{ filter: 'drop-shadow(0 0 18px #FF000088)', animation: 'ytp-float 3s ease-in-out infinite' }}>
              <YTLogo size={64} />
            </div>
            <div className="flex flex-col items-center gap-1">
              <span className="ytp-shimmer-text text-3xl md:text-4xl font-black tracking-tight">YouTube Policies</span>
              <span className="text-gray-400 text-sm font-semibold tracking-widest uppercase">Complete Policy Reference</span>
            </div>
            <div style={{ filter: 'drop-shadow(0 0 14px #FF000066)', animation: 'ytp-float 3.5s ease-in-out infinite' }}>
              <KMLogo size={52} />
            </div>
          </div>

          <p className="text-gray-300 text-sm md:text-base leading-relaxed max-w-3xl mx-auto mb-6">
            Karhari Media strictly follows all YouTube partner policies with full strength and zero compromise. Below is a complete reference of all YouTube policies applicable to Content ID, MCN, CMS, monetization, and channel management — with direct clickable links to official YouTube documentation.
          </p>

          {/* Partner commitment badges */}
          <div className="flex flex-wrap justify-center gap-2 mb-6">
            {[
              { label: 'YouTube Content ID Partner', color: '#FF0000' },
              { label: 'MCN Certified', color: '#8b00ff' },
              { label: 'CMS Managed', color: '#00d4ff' },
              { label: 'Policy Compliant', color: '#00ff88' },
              { label: 'YPP Certified', color: '#D4F000' },
            ].map((tag, i) => (
              <div key={i} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-bold"
                style={{ borderColor: `${tag.color}50`, background: `${tag.color}12`, color: tag.color }}>
                <LiveDot color={tag.color} />
                {tag.label}
              </div>
            ))}
          </div>

          {/* Quick links */}
          <div className="flex flex-wrap justify-center gap-2">
            {policies.map((p, i) => (
              <a key={i} href={`#policy-${i}`}
                className="px-3 py-1 rounded-lg text-[10px] font-bold border transition-all hover:scale-105"
                style={{ borderColor: `${p.color}40`, background: `${p.color}10`, color: p.color }}>
                {p.title.split(' ').slice(0, 3).join(' ')}...
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* POLICIES */}
      <section className="py-8 px-4 max-w-5xl mx-auto">
        <div className="space-y-6">
          {policies.map((policy, idx) => (
            <div key={idx} id={`policy-${idx}`} className="rounded-2xl border relative overflow-hidden"
              style={{ borderColor: `${policy.color}40`, background: `${policy.color}08` }}>
              <LaserBorder color={policy.color} />
              <div className="relative z-10 p-6">
                {/* Header */}
                <div className="flex items-start gap-4 mb-4">
                  <div className="p-2.5 rounded-xl border flex-shrink-0"
                    style={{ borderColor: `${policy.color}50`, background: `${policy.color}15` }}>
                    {policy.icon === 'yt' ? <YTLogo size={24} /> : <KMLogo size={24} />}
                  </div>
                  <div className="flex-1">
                    <h2 className="text-white font-black text-base md:text-lg mb-1">{policy.title}</h2>
                    <a href={policy.policyUrl} target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg border text-[10px] font-bold transition-all hover:scale-105"
                      style={{ borderColor: `${policy.color}50`, background: `${policy.color}15`, color: policy.color }}>
                      <YTLogo size={10} />
                      {policy.policyLabel} — Official YouTube Policy ↗
                    </a>
                  </div>
                  <div className="flex-shrink-0 hidden md:flex items-center gap-2">
                    <KMLogo size={16} />
                    <span className="text-[9px] font-bold text-gray-500">KM ENFORCED</span>
                  </div>
                </div>

                {/* Policy items */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {policy.items.map((item, j) => (
                    <div key={j} className="flex items-start gap-2 p-2.5 rounded-xl border"
                      style={{ borderColor: `${policy.color}20`, background: `${policy.color}06` }}>
                      <div className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0"
                        style={{ background: policy.color, boxShadow: `0 0 4px ${policy.color}` }} />
                      <div className="flex-1">
                        <p className="text-gray-200 text-xs leading-relaxed">{item.point}</p>
                        {item.url && (
                          <a href={item.url} target="_blank" rel="noopener noreferrer"
                            className="text-[9px] font-mono mt-0.5 block transition-colors hover:opacity-100 opacity-60"
                            style={{ color: policy.color }}>
                            {item.url.replace('https://', '')} ↗
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Karhari Media enforcement note */}
                <div className="mt-4 p-3 rounded-xl border flex items-center gap-3"
                  style={{ borderColor: `${policy.color}30`, background: `${policy.color}0a` }}>
                  <KMLogo size={16} />
                  <p className="text-gray-400 text-[10px] leading-relaxed flex-1">
                    <span className="font-black" style={{ color: policy.color }}>Karhari Media</span> strictly enforces this policy for all artists, record labels, and YouTube creators in our network. Violations result in immediate removal from our Content ID pipeline and MCN.
                  </p>
                  <div className="flex items-center gap-1 flex-shrink-0">
                    <LiveDot color={policy.color} />
                    <span className="text-[9px] font-bold" style={{ color: policy.color }}>ACTIVE</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* All Policy URLs Reference */}
        <div className="mt-8 rounded-2xl border border-white/10 bg-white/3 p-6 relative overflow-hidden">
          <LaserBorder color="#FF0000" />
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <YTLogo size={24} />
              <h2 className="text-white font-black text-lg">All YouTube Policy URLs — Quick Reference</h2>
              <KMLogo size={24} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {[
                { label: 'YouTube Partner Program', url: 'https://support.google.com/youtube/answer/72857' },
                { label: 'YouTube Content ID Overview', url: 'https://support.google.com/youtube/answer/2797370' },
                { label: 'Content ID Invalid References', url: 'https://support.google.com/youtube/answer/4352063' },
                { label: 'Content ID Dispute Process', url: 'https://support.google.com/youtube/answer/2797454' },
                { label: 'YouTube MCN Policy', url: 'https://support.google.com/youtube/answer/2737059' },
                { label: 'YouTube CMS Guide', url: 'https://support.google.com/youtube/answer/6301625' },
                { label: 'YouTube Community Guidelines', url: 'https://www.youtube.com/howyoutubeworks/policies/community-guidelines/' },
                { label: 'Copyright Strike Policy', url: 'https://support.google.com/youtube/answer/2797387' },
                { label: 'Advertiser-Friendly Guidelines', url: 'https://support.google.com/youtube/answer/6162278' },
                { label: 'YouTube Terms of Service', url: 'https://www.youtube.com/t/terms' },
                { label: 'Spam & Deceptive Practices', url: 'https://support.google.com/youtube/answer/2801973' },
                { label: 'YouTube Privacy Policy', url: 'https://policies.google.com/privacy' },
                { label: 'Fair Use on YouTube', url: 'https://support.google.com/youtube/answer/9783148' },
                { label: 'Channel Monetization Policies', url: 'https://support.google.com/youtube/answer/2801895' },
                { label: 'Hate Speech Policy', url: 'https://support.google.com/youtube/answer/2801939' },
                { label: 'Misinformation Policy', url: 'https://support.google.com/youtube/answer/10834785' },
              ].map((link, i) => {
                const colors = ['#FF0000','#ff6b00','#D4F000','#00ff88','#00d4ff','#8b00ff'];
                const c = colors[i % colors.length];
                return (
                  <a key={i} href={link.url} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2 p-2.5 rounded-xl border transition-all hover:scale-[1.02] group"
                    style={{ borderColor: `${c}25`, background: `${c}06` }}>
                    <YTLogo size={12} />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-white group-hover:text-white/90">{link.label}</p>
                      <p className="text-[9px] font-mono truncate opacity-50 group-hover:opacity-80 transition-opacity" style={{ color: c }}>
                        {link.url.replace('https://', '')}
                      </p>
                    </div>
                    <span className="text-[10px] flex-shrink-0" style={{ color: c }}>↗</span>
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Final CTA */}
        <div className="mt-8 text-center py-10 px-4 rounded-3xl border border-red-500/30 bg-red-900/10 relative overflow-hidden"
          style={{ boxShadow: '0 0 60px #FF000020' }}>
          <LaserBorder color="#FF0000" />
          <div className="relative z-10">
            <div className="flex items-center justify-center gap-3 mb-4">
              <YTLogo size={32} />
              <KMLogo size={32} />
            </div>
            <h2 className="text-2xl font-black text-white mb-2">Ready to Work with Karhari Media?</h2>
            <p className="text-gray-400 text-sm mb-6 max-w-xl mx-auto">
              Submit your music to our YouTube Content ID pipeline. We enforce all YouTube policies strictly — protecting your rights and maximizing your revenue globally.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/youtube-content-id#submit"
                className="px-8 py-3 rounded-xl font-black text-black text-sm tracking-wider transition-all hover:scale-105"
                style={{ background: 'linear-gradient(135deg, #FF0000, #ff6b00)', boxShadow: '0 0 20px #FF000050' }}>
                SUBMIT YOUR MUSIC
              </Link>
              <Link href="/youtube-content-id"
                className="px-8 py-3 rounded-xl font-bold text-white text-sm border border-white/20 hover:border-red-500/50 transition-all">
                View Content ID Pipeline
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/8 bg-black/60 py-6 mt-8">
        <div className="max-w-5xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <KMLogo size={20} />
            <span className="text-gray-500 text-xs">© 2024 Karhari Media PVT. LTD.</span>
          </div>
          <div className="flex items-center gap-2">
            <YTLogo size={16} />
            <span className="text-gray-500 text-xs">Official YouTube Content ID Partner — All Policies Enforced</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
