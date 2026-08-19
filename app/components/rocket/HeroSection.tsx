'use client';

import Navbar from '../Navbar';
import HeroContent from './HeroContent';
import HeroVisual from './HeroVisual';
import HeroBackground from './HeroBackground';

export default function HeroSection() {
  return (
    <section
      className="km-rocket-hero relative w-full min-h-screen flex flex-col"
      aria-label="Hero — Karhari Media Global Music Distribution & Digital Rights Management">
      
      <HeroBackground />
      <Navbar />
      {/* Main hero body — pt clears the fixed navbar */}
      <div className="relative z-10 flex-1 flex items-center max-w-[1400px] mx-auto w-full px-4 sm:px-6 lg:px-10 xl:px-16 pt-24 lg:pt-28 pb-10">
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 xl:gap-16 items-center">
          <HeroContent />
          <HeroVisual />
        </div>
      </div>
    </section>
  );
}
