'use client';

import { useRef } from 'react';
import './styles/km10-music.css';
import { useGsapSection } from './hooks/useGsapSection';
import { runKm10Music } from './scripts/km10-music';

export default function SectionKm10Music() {
  const ref = useRef<HTMLDivElement>(null);
  useGsapSection(runKm10Music, ref);

  return (
    <div className="km10-music-section" ref={ref}>
      <section className="karhari">
        <div className="hero-backdrop">
          <span className="hb-1"></span>
          <span className="hb-2"></span>
          <span className="hb-3"></span>
          <div className="hb-figs"><i></i><i></i><i></i><i></i><i></i></div>
        </div>
        <div className="container">
          <div className="top-grid">
            <div className="hero-col">
              <div className="brand-label">KARHARI MEDIA DISTRIBUTION</div>
              <h1 className="km10m-hero-title">
                <div><span className="g-cyan">MUSIC CMS &amp;</span></div>
                <div><span className="g-gold">MUSIC MULTI CHANNEL NETWORK</span></div>
              </h1>
              <p className="tagline">MANAGE.&nbsp; PROTECT.&nbsp; MONETIZE.&nbsp; GROW.</p>
              <p className="hero-desc">The all-in-one platform to manage thousands of music channels, protect your content and maximize your revenue.</p>
              <div className="stat-row" id="km10m-heroStats"></div>
            </div>
            <div className="solutions-col reveal">
              <h3>POWERFUL <span className="g-cyan">MUSIC CMS &amp; MCN</span> <span className="g-gold">SOLUTIONS</span></h3>
              <div className="solutions-grid" id="km10m-solutionsGrid"></div>
            </div>
          </div>
          <div className="main-grid">
            <div className="features-col" id="km10m-featuresCol"></div>
            <div className="orbit-col">
              <div className="orbit-wrap" id="km10m-orbitWrap">
                <svg className="orbit-svg" id="km10m-orbitSvg"></svg>
                <div className="orbit-center">
                  <div className="orbit-play">
                    <svg viewBox="0 0 24 24"><path d="M8 5l11 7-11 7z" fill="#ffffff" /></svg>
                  </div>
                </div>
              </div>
            </div>
            <div className="network-col">
              <div className="net-card reveal">
                <h3>OUR NETWORK. <span className="g-gold">THEIR SUCCESS.</span></h3>
                <p className="sub">Thousands of Channels. Millions of Fans. One Family.</p>
                <div className="world-map" id="km10m-worldMap"></div>
                <div className="network-stats" id="km10m-networkStats"></div>
              </div>
              <div className="net-card reveal">
                <h3 className="grow-hdr">WE HELP YOU <span className="g-pink">GROW ON YOUTUBE</span></h3>
                <div className="grow-row" id="km10m-growRow"></div>
              </div>
              <div className="net-card logo-card reveal">
                <div className="logo-block">
                  <div className="logo-badge music-logo-badge">
                    <span>
                      <svg viewBox="0 0 24 24" className="icon" style={{ stroke: '#fff' }}>
                        <path d="M4 12v-4M8 16V8M12 20V4M16 16V8M20 12v-4" strokeWidth="2" />
                      </svg>
                    </span>
                  </div>
                  <div>
                    <div className="logo-title">KARHARI <span>MEDIA</span></div>
                    <div className="logo-sub">DISTRIBUTION</div>
                  </div>
                </div>
                <div className="logo-tagline-sub">MUSIC CMS &amp; MUSIC MULTI CHANNEL NETWORK</div>
                <div className="logo-tagline">YOUR CONTENT. OUR TECHNOLOGY. LIMITLESS GROWTH.</div>
              </div>
            </div>
          </div>
          <div className="how-section reveal">
            <h2>HOW IT WORKS</h2>
            <div className="steps-row" id="km10m-stepsRow"></div>
          </div>
          <div className="footer-bar reveal">
            <div className="footer-icons" id="km10m-footerIcons"></div>
          </div>
        </div>
      </section>
    </div>
  );
}
