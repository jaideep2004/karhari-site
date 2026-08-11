gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

// ============================================
// NAVBAR SCROLL EFFECT
// ============================================
window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}, { passive: true });

// ============================================
// MOBILE NAV TOGGLE
// ============================================
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  navToggle.classList.toggle('open', isOpen);
  navToggle.setAttribute('aria-expanded', isOpen);
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// ============================================
// HERO ENTRANCE ANIMATIONS
// ============================================
const heroTL = gsap.timeline({ defaults: { ease: 'power3.out' } });

heroTL
  .to('.hero-badge', {
    opacity: 1,
    y: 0,
    duration: 0.6,
    delay: 0.3
  })
  .to('.title-line', {
    opacity: 1,
    x: 0,
    duration: 0.7,
    stagger: 0.15
  }, '-=0.3')
  .to('.hero-subtitle', {
    opacity: 1,
    y: 0,
    duration: 0.6
  }, '-=0.3')
  .to('.hero-buttons', {
    opacity: 1,
    y: 0,
    duration: 0.6
  }, '-=0.3')
  .to('.hero-dsp-list', {
    opacity: 1,
    y: 0,
    duration: 0.6
  }, '-=0.2');

// ============================================
// VINYL RECORD ROTATION (slow, continuous)
// ============================================
gsap.to('#vinyl', {
  rotation: 360,
  duration: 25,
  repeat: -1,
  ease: 'none'
});

// Vinyl glow pulse
gsap.to('#vinyl', {
  filter: 'drop-shadow(0 0 60px rgba(255, 215, 0, 0.35)) drop-shadow(0 0 120px rgba(255, 150, 0, 0.18))',
  duration: 3,
  repeat: -1,
  yoyo: true,
  ease: 'sine.inOut'
});

// ============================================
// FLOATING SPARKLE PARTICLES (close to vinyl)
// ============================================
const sparkleContainer = document.getElementById('sparkleContainer');
function createSparkles() {
  for (let i = 0; i < 20; i++) {
    const sparkle = document.createElement('div');
    sparkle.className = 'sparkle';
    const angle = Math.random() * Math.PI * 2;
    const radius = 185 + Math.random() * 170;
    sparkle.style.left = `${350 + Math.cos(angle) * radius}px`;
    sparkle.style.top = `${310 + Math.sin(angle) * radius}px`;
    sparkle.style.width = `${2 + Math.random() * 3}px`;
    sparkle.style.height = sparkle.style.width;
    sparkle.style.animationDelay = `${Math.random() * 5}s`;
    sparkle.style.animationDuration = `${3 + Math.random() * 3}s`;
    sparkleContainer.appendChild(sparkle);
  }
}
createSparkles();

// ============================================
// ORBITING PLATFORM ICONS (tilted elliptical)
// ============================================
const icons = document.querySelectorAll('.orbit-icon');
const orbitRadiusX = 300;
const orbitRadiusY = 260;
let orbitAngle = 0;
const orbitSpeed = 0.004;
let orbitRunning = true;
let orbitRaf = 0;

function positionIcons() {
  icons.forEach((icon, i) => {
    const angle = (orbitAngle + (i * (360 / icons.length))) * (Math.PI / 180);
    const x = Math.cos(angle) * orbitRadiusX;
    const y = Math.sin(angle) * orbitRadiusY;
    icon.style.transform = `translate(${x}px, ${y}px)`;
    icon.style.zIndex = Math.sin(angle) > 0 ? 10 : 1;
  });
  orbitAngle += orbitSpeed * 16.67;
}

function orbitTick() {
  if (!orbitRunning) return;
  orbitRaf = requestAnimationFrame(orbitTick);
  positionIcons();
}

// Pause the orbit loop when the hero is off-screen
if ('IntersectionObserver' in window) {
  const orbitObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      orbitRunning = entry.isIntersecting;
    });
  }, { rootMargin: '200px 0px 200px 0px' });
  const orbitTarget = document.querySelector('.hero-visual');
  if (orbitTarget) orbitObserver.observe(orbitTarget);
}

// Reveal icons
gsap.to('.orbit-icon', {
  opacity: 1,
  duration: 0.8,
  stagger: 0.12,
  delay: 1.2,
  ease: 'back.out(1.7)',
  onStart: orbitTick
});

// Continuous subtle float on each bubble
icons.forEach((icon, i) => {
  gsap.to(icon.querySelector('.glass-bubble'), {
    y: -4 + (i % 3) * 2,
    duration: 2 + (i * 0.3),
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut',
    delay: i * 0.15
  });
});

// ============================================
// PLATFORM VERTICAL SCROLL (All Platforms)
// ============================================
const allDSPLogos = [
  { name: 'Spotify', file: 'spotify.png' },
  { name: 'Apple Music', file: 'applemusic.png' },
  { name: 'YouTube Music', file: 'ytmusic.png' },
  { name: 'Amazon Music', file: 'amazonmusic.png' },
  { name: 'YouTube', file: 'youtube.png' },
  { name: 'TikTok Music', file: 'tiktok-music-library.png' },
  { name: 'Instagram Music', file: 'instagram-music.png' },
  { name: 'Meta', file: 'facebook.png' },
  { name: 'JioSaavn', file: 'jiosaavan.png' },
  { name: 'Gaana', file: 'gaana.png' },
  { name: 'Hungama', file: 'hungamamusic.png' },
  { name: 'Wynk Music', file: 'wynkmusic.png' },
  { name: 'Deezer', file: 'deezer.png' },
  { name: 'Tidal', file: 'tidal.png' },
  { name: 'Pandora', file: 'pandora.png' },
  { name: 'Boomplay', file: 'boomplay.png' },
  { name: 'SoundCloud', file: 'soundcloud.png' },
  { name: 'Napster', file: 'napster.png' },
  { name: 'Audiomack', file: 'audiomack.png' },
  { name: 'Anghami', file: 'anghami.png' },
  { name: 'KKBOX', file: 'kkbox.png' },
  { name: 'JOOX', file: 'joox.png' },
  { name: 'QQ Music', file: 'kugoumusic.png' },
  { name: 'Kuwo Music', file: 'kuwomusic.png' },
  { name: 'NetEase', file: 'neteasecloud.png' },
  { name: 'Yandex Music', file: 'yandexmusic.png' },
  { name: 'VK Music', file: 'vkmusic.png' },
  { name: 'Melon', file: 'melonmusic.png' },
  { name: 'Genie', file: 'geniemusic.png' },
  { name: 'Bugs', file: 'bugs.png' },
  { name: 'Boom', file: 'boom.png' },
  { name: 'Awa Music', file: 'awamusic.png' },
  { name: 'Resso', file: 'resso.png' },
  { name: 'Qobuz', file: 'qobuz.png' },
  { name: 'iHeartRadio', file: 'iheartradio.png' },
  { name: 'Tencent', file: 'tencentmusic.png' },
  { name: 'Snapchat', file: 'snapchat-sounds.png' },
  { name: 'WhatsApp', file: 'whatsapp.png' },
  { name: 'Peloton', file: 'peloton.png' },
  { name: 'Flo Music', file: 'flomusic.png' },
  { name: 'UMA Music', file: 'umamusic.png' },
  { name: 'Zvuk', file: 'zvuk.png' },
  { name: 'LINE Music', file: 'linemusic.png' },
  { name: 'Facebook Rights', file: 'facebook-rights-management.png' },
  { name: 'Facebook Audio', file: 'facebook-audio-library.png' },
  { name: 'YouTube CID', file: 'youtube-content-id.png' },
  { name: 'ACRCloud', file: 'acr-cloud.png' }
];

// Split into 4 columns
const col1Data = allDSPLogos.filter((_, i) => i % 4 === 0);
const col2Data = allDSPLogos.filter((_, i) => i % 4 === 1);
const col3Data = allDSPLogos.filter((_, i) => i % 4 === 2);
const col4Data = allDSPLogos.filter((_, i) => i % 4 === 3);

function createLogoCards(column, data) {
  data.forEach(logo => {
    const card = document.createElement('div');
    card.className = 'platform-logo-card';
    card.innerHTML = `
      <img src="https://cms.karharimedia.com/images/dsp/${logo.file}" alt="${logo.name}" loading="lazy" decoding="async">
    `;
    column.appendChild(card);
  });
}

const col1 = document.getElementById('scrollColumn1');
const col2 = document.getElementById('scrollColumn2');
const col3 = document.getElementById('scrollColumn3');
const col4 = document.getElementById('scrollColumn4');

createLogoCards(col1, col1Data);
createLogoCards(col2, col2Data);
createLogoCards(col3, col3Data);
createLogoCards(col4, col4Data);

// Duplicate content for seamless scroll
[col1, col2, col3, col4].forEach(col => {
  const clone = col.innerHTML;
  col.innerHTML += clone;
});

// Animate each column with different speeds for visual interest
function animateColumn(col, duration, direction) {
  const totalHeight = col.scrollHeight / 2;
  gsap.fromTo(col,
    { y: direction === 'up' ? 0 : -totalHeight },
    {
      y: direction === 'up' ? -totalHeight : 0,
      duration: duration,
      repeat: -1,
      ease: 'none',
      modifiers: {
        y: gsap.utils.unitize(y => parseFloat(y) % totalHeight)
      }
    }
  );
}

animateColumn(col1, 40, 'up');
animateColumn(col2, 50, 'down');
animateColumn(col3, 45, 'up');
animateColumn(col4, 55, 'down');

// ============================================
// SECTION SCROLL REVEALS
// ============================================
gsap.from('.platforms-content', {
  scrollTrigger: {
    trigger: '.all-platforms',
    start: 'top 75%',
  },
  opacity: 0,
  x: -50,
  duration: 0.8,
  ease: 'power3.out'
});

gsap.from('.platforms-scroll-wrapper', {
  scrollTrigger: {
    trigger: '.all-platforms',
    start: 'top 75%',
  },
  opacity: 0,
  x: 50,
  duration: 0.8,
  delay: 0.2,
  ease: 'power3.out'
});
