/* Extracted verbatim from combined.html by tools/phase2-extract.js - do not hand-edit. */
export function runKm1Hero(gsap, ScrollTrigger, MotionPathPlugin) {
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
}
