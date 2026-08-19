'use client';

import { useRef } from 'react';
import './styles/km10-ent.css';
import { useGsapSection } from './hooks/useGsapSection';
import { runKm10Ent } from './scripts/km10-ent';

export default function SectionKm10Ent() {
  const ref = useRef<HTMLDivElement>(null);
  useGsapSection(runKm10Ent, ref);

  return (
    <div id="entertainment-cms" className="km10-ent-section" ref={ref}>
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
              <div className="brand-label">KARHARI MEDIA DISTRIBUTION &mdash;</div>
              <h1 className="km10e-hero-title">
                <div><span className="c-white">ENTERTAINMENT CMS &amp;</span></div>
                <div><span className="g-pink">ENTERTAINMENT MULTI CHANNEL NETWORK</span></div>
              </h1>
              <p className="tagline">MANAGE.&nbsp; PROTECT.&nbsp; MONETIZE.&nbsp; GROW.</p>
              <p className="hero-desc">The all-in-one platform to manage thousands of Entertainment YouTube channels, protect your content and maximize your revenue.</p>
              <div className="stat-row" id="km10e-heroStats"></div>
            </div>
            <div className="solutions-col reveal">
              <h3>POWERFUL <span className="g-pink">ENTERTAINMENT CMS &amp; MCN</span> SOLUTIONS</h3>
              <div className="solutions-grid" id="km10e-solutionsGrid"></div>
            </div>
          </div>

          <div className="main-grid">
            <div className="features-col" id="km10e-featuresCol"></div>

            <div className="center-col">
              <div className="orbit-wrap" id="km10e-orbitWrap">
                <svg className="orbit-svg" id="km10e-orbitSvg"></svg>
                <div className="orbit-center">
                  <div className="orbit-play">
                    <svg viewBox="0 0 24 24"><path d="M8 5l11 7-11 7z" fill="#ffffff" /></svg>
                  </div>
                </div>
              </div>

              <div className="how-section reveal">
                <div className="how-pill-header">HOW IT WORKS</div>
                <div className="steps-row" id="km10e-stepsRow"></div>
              </div>
            </div>

            <div className="network-col">
              <div className="net-card reveal">
                <h3>OUR NETWORK. <span className="g-pink">THEIR SUCCESS.</span></h3>
                <p className="sub">Thousands of Channels. Millions of Fans. One Family.</p>
                <div className="world-map" id="km10e-worldMap"></div>
                <div className="network-stats" id="km10e-networkStats"></div>
              </div>
              <div className="net-card reveal">
                <h3 className="grow-hdr">WE HELP YOU GROW ON <span style={{ color: 'var(--red)' }}>YOUTUBE</span></h3>
                <div className="grow-row" id="km10e-growRow"></div>
              </div>
              <div className="net-card logo-card reveal">
                <div className="logo-block">
                  <div className="logo-badge ent-logo-badge">
                    <img src="/karhari-media-b1.png" alt="Karhari Media" className="logo-badge-img" />
                  </div>
                  <div>
                    <div className="logo-title">KARHARI <span>MEDIA</span></div>
                    <div className="logo-sub">DISTRIBUTION</div>
                  </div>
                </div>
                <div className="logo-tagline-sub">ENTERTAINMENT CMS &amp; ENTERTAINMENT MCN</div>
                <div className="logo-tagline">YOUR CONTENT. OUR TECHNOLOGY. LIMITLESS GROWTH.</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
