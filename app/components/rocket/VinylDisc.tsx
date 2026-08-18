import AppImage from '../ui/AppImage';

export default function VinylDisc() {
  return (
    <div
      className="absolute"
      style={{
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 240,
        height: 240,
        zIndex: 10,
      }}
    >
      {/* Outer golden glow ring */}
      <div
        className="absolute inset-0 rounded-full glow-ring-pulse"
        style={{
          background: 'transparent',
          boxShadow: '0 0 60px 20px rgba(200,134,10,0.5), 0 0 100px 40px rgba(180,80,0,0.25)',
          borderRadius: '50%',
        }}
      />
      {/* Spinning vinyl disc */}
      <div
        className="vinyl-spin absolute inset-0 rounded-full overflow-hidden"
        style={{
          background: 'radial-gradient(circle at 30% 30%, #2a2a2a 0%, #111111 40%, #050505 100%)',
          boxShadow: 'inset 0 0 40px rgba(0,0,0,0.8), 0 0 30px rgba(200,134,10,0.4)',
        }}
      >
        {/* Vinyl grooves — concentric rings */}
        {[20, 35, 50, 65, 80, 95, 108]?.map((r, i) => (
          <div
            key={i}
            className="absolute rounded-full border"
            style={{
              top: `calc(50% - ${r}px)`,
              left: `calc(50% - ${r}px)`,
              width: r * 2,
              height: r * 2,
              borderColor: 'rgba(255,255,255,0.04)',
              borderWidth: '1px',
            }}
          />
        ))}

        {/* Center label — BLACK circle with logo for full visibility */}
        <div
          className="absolute rounded-full flex items-center justify-center overflow-hidden"
          style={{
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 100,
            height: 100,
            background: 'radial-gradient(circle at 40% 35%, #1a1a1a 0%, #000000 60%, #0a0a0a 100%)',
            boxShadow: '0 0 20px rgba(200,134,10,0.5), inset 0 0 10px rgba(0,0,0,0.8)',
            border: '2px solid rgba(200,134,10,0.6)',
          }}
        >
          <AppImage
            src="/assets/images/1608452013412__1_-1786701462621.png"
            alt="Karhari Media logo centered on vinyl disc label"
            width={88}
            height={88}
            className="object-contain w-[88px] h-[88px]"
            priority
          />
        </div>
      </div>
      {/* Inner golden ring border */}
      <div
        className="absolute inset-0 rounded-full pointer-events-none"
        style={{
          border: '2px solid rgba(200,134,10,0.7)',
          boxShadow: '0 0 20px rgba(200,134,10,0.4)',
        }}
      />
    </div>
  );
}
