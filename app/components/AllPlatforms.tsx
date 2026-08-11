'use client';

import { useRef } from 'react';
import { useGsapSection } from './hooks/useGsapSection';
import { runKm1Platforms } from './scripts/km1Platforms';

export default function AllPlatforms() {
  const ref = useRef<HTMLDivElement>(null);
  useGsapSection(runKm1Platforms, ref);

  return (
    <section className="all-platforms" ref={ref}>
      <div className="platforms-container"><div className="platforms-content"><div className="section-badge"><span className="badge-dot"></span> ALL PLATFORMS </div><h2 className="section-title"> Your Music.<br /><span className="title-accent">Everywhere.</span></h2><p className="section-desc"> Distribute to all major streaming platforms and digital stores worldwide. No limits. No boundaries. </p></div><div className="platforms-scroll-wrapper"><div className="scroll-fade-top"></div><div className="platforms-scroll" id="platformsScroll"><div className="scroll-column" id="scrollColumn1"></div><div className="scroll-column" id="scrollColumn2"></div><div className="scroll-column" id="scrollColumn3"></div><div className="scroll-column" id="scrollColumn4"></div></div><div className="scroll-fade-bottom"></div></div></div>
    </section>
  );
}
