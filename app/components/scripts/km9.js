/* Extracted verbatim from combined.html by tools/phase2-extract.js - do not hand-edit. */
export function runKm9(gsap, ScrollTrigger, MotionPathPlugin) {
(function () {
            try {

                gsap.registerPlugin(MotionPathPlugin);

                /* =========================================================
                   0. BACKGROUND PARTICLES (ambient drifting dust)
                ========================================================= */
                function createBgParticles(container, count) {
                    for (let i = 0; i < count; i++) {
                        const p = document.createElement('div');
                        p.className = 'p';
                        p.style.left = Math.random() * 100 + '%';
                        p.style.top = Math.random() * 100 + '%';
                        container.appendChild(p);
                        gsap.to(p, {
                            y: (Math.random() - 0.5) * 200,
                            x: (Math.random() - 0.5) * 200,
                            opacity: Math.random() * 0.5 + 0.1,
                            duration: 6 + Math.random() * 6,
                            repeat: -1,
                            yoyo: true,
                            ease: 'sine.inOut'
                        });
                    }
                }
                createBgParticles(document.getElementById('km9-bgParticles'), 40);

                /* =========================================================
                   1. SHIELD INTERNAL GLOW PARTICLES (rising sparks)
                ========================================================= */
                function createShieldParticles(container, count) {
                    for (let i = 0; i < count; i++) {
                        const p = document.createElement('div');
                        p.className = 'particle';
                        const size = Math.random() * 3 + 1.5;
                        p.style.width = size + 'px';
                        p.style.height = size + 'px';
                        p.style.left = Math.random() * 100 + '%';
                        p.style.top = 60 + Math.random() * 40 + '%';
                        container.appendChild(p);
                        gsap.to(p, {
                            y: -140 - Math.random() * 100,
                            x: (Math.random() - 0.5) * 70,
                            opacity: 0,
                            duration: 3 + Math.random() * 3,
                            repeat: -1,
                            delay: Math.random() * 4,
                            ease: 'sine.out',
                            onRepeat() { gsap.set(p, { opacity: 1, y: 0, left: Math.random() * 100 + '%' }); }
                        });
                    }
                }
                createShieldParticles(document.getElementById('km9-shieldParticles'), 22);

                /* =========================================================
                   2. INTRO TIMELINE
                ========================================================= */
                const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

                tl.from('.km9-section .brand', { y: -30, opacity: 0, duration: 0.7 })
                    .from('.km9-section .headline', { y: 30, opacity: 0, duration: 0.7 }, '-=0.35')
                    .from('.km9-section .desc', { y: 20, opacity: 0, duration: 0.6 }, '-=0.4')
                    .from('.km9-section .feature-item', { y: 20, opacity: 0, stagger: 0.12, duration: 0.5 }, '-=0.3')
                    .from('.km9-section .center-label', { opacity: 0, y: -15, duration: 0.5 }, '-=0.6')
                    .from('.km9-section .shield-stage', { opacity: 0, scale: 0.85, duration: 0.9 }, '-=0.35')
                    .from('.km9-section .platform-node', { opacity: 0, scale: 0.3, stagger: 0.12, duration: 0.5 }, '-=0.5')
                    .from('.km9-section .global-coverage', { opacity: 0, y: 15, duration: 0.5 }, '-=0.2')
                    .from('.km9-section .right-heading', { opacity: 0, x: 30, duration: 0.6 }, '-=1.1')
                    .from('.km9-section .logo-item', { opacity: 0, y: 20, stagger: 0.1, duration: 0.5 }, '-=0.5')
                    .from('.km9-section .why-choose', { opacity: 0, y: 25, duration: 0.6 }, '-=0.3')
                    .from('.km9-section .bottom-panels .glass-panel', { opacity: 0, y: 35, stagger: 0.15, duration: 0.7 }, '-=0.2')
                    .from('.km9-section .bottom-bar', { opacity: 0, duration: 0.5 }, '-=0.2');

                /* =========================================================
                   3. FLOATING FEATURE ICONS
                ========================================================= */
                gsap.to('.km9-section .feature-item .icon-circle', {
                    y: -8, duration: 2.2, repeat: -1, yoyo: true, ease: 'sine.inOut',
                    stagger: { each: 0.3, from: 'random' }
                });

                /* =========================================================
                   4. SHIELD BREATHING GLOW + FLOAT
                ========================================================= */
                gsap.to('.km9-section .shield-glow', {
                    scale: 1.12, opacity: 0.55, duration: 2.4, repeat: -1, yoyo: true, ease: 'sine.inOut'
                });
                gsap.to('.km9-section .shield-core', {
                    y: -8, duration: 3, repeat: -1, yoyo: true, ease: 'sine.inOut'
                });
                gsap.to('.km9-section .lock-badge', {
                    y: -6, duration: 1.8, repeat: -1, yoyo: true, ease: 'sine.inOut'
                });
                gsap.to('.km9-section .light-beam', {
                    opacity: 0.55, scaleY: 1.05, duration: 2, repeat: -1, yoyo: true, ease: 'sine.inOut'
                });

                /* =========================================================
                   5. ROTATING HALO RINGS
                ========================================================= */
                gsap.to('.km9-section .ring-1', { rotate: 360, duration: 22, repeat: -1, ease: 'none' });
                gsap.to('.km9-section .ring-2', { rotate: -360, duration: 16, repeat: -1, ease: 'none' });
                gsap.to('.km9-section .ring-3', { rotate: 360, duration: 28, repeat: -1, ease: 'none' });

                /* =========================================================
                   5b. PEDESTAL — gentle 3D breathing glow on each tier
                ========================================================= */
                gsap.to('.km9-section .ped-top.t1', { filter: 'brightness(1.15)', duration: 2.4, repeat: -1, yoyo: true, ease: 'sine.inOut' });
                gsap.to('.km9-section .ped-top.t2', { filter: 'brightness(1.15)', duration: 2.1, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 0.2 });
                gsap.to('.km9-section .ped-top.t3', { filter: 'brightness(1.2)', duration: 1.8, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 0.4 });
                gsap.to('.km9-section .ped-glow', { scale: 1.3, opacity: 0.7, duration: 1.4, repeat: -1, yoyo: true, ease: 'sine.inOut' });
                gsap.to('.km9-section .ped-reflection', { opacity: 0.85, duration: 1.6, repeat: -1, yoyo: true, ease: 'sine.inOut' });

                /* =========================================================
                   6. FLOATING NODES + MUSIC NOTES
                ========================================================= */
                gsap.utils.toArray('.km9-section .platform-node').forEach((node, i) => {
                    gsap.to(node, {
                        y: '+=10', duration: 2 + i * 0.3, repeat: -1, yoyo: true, ease: 'sine.inOut'
                    });
                });
                gsap.utils.toArray('.km9-section .note').forEach((n, i) => {
                    gsap.to(n, {
                        y: -20, opacity: 0.15, duration: 2.5 + i * 0.4, repeat: -1, yoyo: true, ease: 'sine.inOut'
                    });
                });

                /* =========================================================
                   7. ANIMATED DATA FLOW — TRAVELING PULSES ON PATHS
                ========================================================= */
                document.querySelectorAll('.km9-section .pulse-dot').forEach((dot, i) => {
                    const pathEl = document.querySelector('#km9-path' + (i + 1));
                    gsap.to(dot, {
                        motionPath: {
                            path: pathEl,
                            align: pathEl,
                            alignOrigin: [0.5, 0.5]
                        },
                        duration: 2.2,
                        repeat: -1,
                        ease: 'power1.inOut',
                        delay: i * 0.5
                    });
                });

                /* =========================================================
                   8. COUNTING STATISTICS (on scroll into view)
                ========================================================= */
                const statNumbers = document.querySelectorAll('.km9-section .stat-number');
                const counted = new Set();
                const statObserver = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting && !counted.has(entry.target)) {
                            counted.add(entry.target);
                            const target = parseFloat(entry.target.dataset.count);
                            const suffix = entry.target.dataset.suffix || '';
                            const obj = { val: 0 };
                            gsap.to(obj, {
                                val: target,
                                duration: 2,
                                ease: 'power2.out',
                                onUpdate: () => {
                                    entry.target.textContent = Math.floor(obj.val) + suffix;
                                }
                            });
                        }
                    });
                }, { threshold: 0.5 });
                statNumbers.forEach(el => statObserver.observe(el));

                /* =========================================================
                   9. HOVER INTERACTIONS
                ========================================================= */
                document.querySelectorAll('.km9-section .glass-panel, .platform-node, .logo-item, .feature-item, .who-item, .how-step')
                    .forEach(el => {
                        el.addEventListener('mouseenter', () => {
                            gsap.to(el, { scale: 1.05, duration: 0.3, ease: 'power2.out' });
                        });
                        el.addEventListener('mouseleave', () => {
                            gsap.to(el, { scale: 1, duration: 0.3, ease: 'power2.out' });
                        });
                    });

                /* =========================================================
                   10. SOFT PARALLAX ON MOUSE MOVE
                ========================================================= */
                const heroSection = document.querySelector('.km9-section .km9-hero');
                heroSection.addEventListener('mousemove', (e) => {
                    const x = (e.clientX / window.innerWidth - 0.5) * 2;
                    const y = (e.clientY / window.innerHeight - 0.5) * 2;

                    gsap.to('.km9-section .shield-core', {
                        x: x * 6,
                        y: y * 6,
                        duration: 1,
                        ease: 'power2.out'
                    });
                    gsap.to('.km9-section .col-left', { x: x * 8, duration: 1, ease: 'power2.out' });
                    gsap.to('.km9-section .col-right', { x: x * -8, duration: 1, ease: 'power2.out' });
                    gsap.to('.km9-section .bg-glow-1', { x: x * 20, y: y * 20, duration: 1.2, ease: 'power2.out' });
                    gsap.to('.km9-section .bg-glow-2', { x: x * -20, y: y * -20, duration: 1.2, ease: 'power2.out' });
                });

            } catch (err) {
                console.error('[km9] section script error:', err);
            }
        })();
        /* ==================== index10.html (km10) scripts ==================== */
}
