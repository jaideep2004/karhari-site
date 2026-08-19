import VinylDisc from './VinylDisc';
import OrbitalRings from './OrbitalRings';

export default function HeroVisual() {
  return (
    <div className="hero-right-reveal flex items-center justify-center lg:justify-end mt-2 lg:mt-0">
      {/* Responsive orbital wheel container */}
      <div
        className="relative"
        style={{
          width: 'min(88vw, 340px)',
          height: 'min(88vw, 340px)',
        }}
      >
        {/* Outer atmospheric glow */}
        <div
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(200,134,10,0.18) 0%, rgba(180,80,0,0.08) 50%, transparent 75%)',
            transform: 'scale(1.3)',
          }}
        />

        {/* Orbital rings + spinning icons */}
        <OrbitalRings />

        {/* Vinyl disc center */}
        <VinylDisc />
      </div>
    </div>
  );
}