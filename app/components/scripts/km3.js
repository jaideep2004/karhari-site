/* Extracted verbatim from combined.html by tools/phase2-extract.js - do not hand-edit. */
export function runKm3(gsap, ScrollTrigger, MotionPathPlugin) {
(function () {
            try {

                document.addEventListener('DOMContentLoaded', () => {

                    /* ---------- Build bar chart bars ---------- */
                    const barChart = document.getElementById('km3-barChart');
                    const heights = [16, 20, 18, 26, 22, 30, 26, 36, 32, 42, 38, 48, 44, 54, 50, 60, 56, 66, 62, 72];

                    const barEls = heights.map(h => {
                        const b = document.createElement('div');
                        b.className = 'bar';
                        b.dataset.base = h;
                        barChart.appendChild(b);
                        return b;
                    });

                    /* ---------- Compute correct arrow rotation to match final line segment ---------- */
                    function setupArrow() {
                        const path = document.getElementById('km3-trendPath');
                        const len = path.getTotalLength();
                        const pEnd = path.getPointAtLength(len);
                        const pPrev = path.getPointAtLength(Math.max(0, len - 10));
                        const angleRad = Math.atan2(pEnd.y - pPrev.y, pEnd.x - pPrev.x);
                        const angleDeg = angleRad * (180 / Math.PI);

                        const arrowGroup = document.getElementById('km3-trendArrowGroup');
                        arrowGroup.setAttribute('transform', `translate(${pEnd.x},${pEnd.y}) rotate(${angleDeg})`);
                    }
                    setupArrow();

                    /* ---------- MASTER ENTRANCE TIMELINE ---------- */
                    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

                    tl.fromTo('.km3-section .eyebrow', { opacity: 0, y: -10 }, { opacity: 1, y: 0, duration: .6 })
                        .to('.km3-section .pill-wrap', { opacity: 1, duration: .6 }, '-=.3')
                        .fromTo('.km3-section .corner-icon.left', { opacity: 0, scale: .5 }, { opacity: 1, scale: 1, duration: .6 }, '-=.4')
                        .fromTo('.km3-section .corner-icon.right', { opacity: 0, scale: .5 }, { opacity: 1, scale: 1, duration: .6 }, '-=.5')
                        .fromTo('.km3-section .km3-section-title', {
                            opacity: 0, x: (i, t) => t.classList.contains('green-text') ? -40 : 40
                        }, {
                            opacity: 1, x: 0, duration: .7, stagger: .15
                        })
                        .to('.km3-section .section-sub', { opacity: 1, duration: .6, stagger: .15 }, '-=.5')
                        .fromTo('.km3-section .center-badge', { opacity: 0, scale: .6 }, { opacity: 1, scale: 1, duration: .7 }, '-=.6')
                        .to('.km3-section .map-wrap, .network-wrap', { opacity: 1, duration: .7 }, '-=.4')
                        .fromTo('.km3-section .p-icon', { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: .5, stagger: .08 }, '-=.5')
                        .fromTo('.km3-section .km3-hero .avatar', { opacity: 0, scale: .4 }, { opacity: 1, scale: 1, duration: .5, stagger: .08 }, '-=.6')
                        .to(barEls, {
                            height: (i) => heights[i] + '%',
                            duration: .7,
                            stagger: .035,
                            ease: 'power2.out',
                            onComplete: startEqualizerLoop
                        }, '-=.4')
                        .call(() => {
                            const path = document.getElementById('km3-trendPath');
                            const len = path.getTotalLength();
                            path.style.strokeDasharray = len;
                            path.style.strokeDashoffset = len;
                            gsap.to(path, {
                                strokeDashoffset: 0, duration: 1.4, ease: 'power2.inOut',
                                onComplete: () => gsap.to('#km3-trendArrowGroup', { opacity: 1, duration: .3 })
                            });
                        }, null, '-=.3')
                        .fromTo('.km3-section .f-card', { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: .5, stagger: .06 }, '-=.6')
                        .to('.km3-section .tagline', { opacity: 1, duration: .6, stagger: .15 }, '-=.2')
                        .fromTo('.km3-section .trust-item', { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: .5, stagger: .1 }, '-=.2');

                    /* ---------- CONTINUOUS INDIVIDUAL BAR EQUALIZER ---------- */
                    function startEqualizerLoop() {
                        barEls.forEach((bar, i) => {
                            const base = parseFloat(bar.dataset.base);
                            animateBarLoop(bar, base, i);
                        });
                    }

                    function animateBarLoop(bar, base, i) {
                        const variance = gsap.utils.random(6, 16);
                        const dur = gsap.utils.random(0.45, 1.05);
                        const goingUp = Math.random() > 0.3;
                        const target = goingUp
                            ? Math.min(base + variance, 94)
                            : Math.max(base - variance * 0.5, base * 0.6);

                        gsap.to(bar, {
                            height: target + '%',
                            duration: dur,
                            ease: 'sine.inOut',
                            onComplete: () => animateBarLoop(bar, base, i)
                        });
                    }

                    /* ---------- AMBIENT LOOPS ---------- */

                    // Center badge glow pulse
                    gsap.to('.km3-section .center-badge', {
                        boxShadow: '-26px 0 55px rgba(57,255,176,.4), 26px 0 55px rgba(255,47,116,.4), 0 0 0 1px rgba(255,255,255,.08) inset',
                        duration: 2.2, repeat: -1, yoyo: true, ease: 'sine.inOut'
                    });

                    // Rotate the corner dashed rings
                    gsap.to('.km3-section .ring-spin', { rotate: 360, duration: 14, repeat: -1, ease: 'linear', transformOrigin: '50% 50%' });

                    // Continuous flowing dotted lines BEHIND the bars (left side)
                    gsap.to('#km3-flPath1', { strokeDashoffset: -100, duration: 4, repeat: -1, ease: 'linear' });
                    gsap.to('#km3-flPath2', { strokeDashoffset: -100, duration: 4.6, repeat: -1, ease: 'linear' });

                    // Subtle continuous glow breathing on the solid trend line + arrow
                    gsap.to('.km3-section .trend-path', {
                        filter: 'drop-shadow(0 0 12px rgba(255,255,255,1))',
                        duration: 1.6, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 2
                    });
                    gsap.to('#km3-trendArrowGroup polygon', {
                        filter: 'drop-shadow(0 0 10px rgba(255,255,255,1))',
                        duration: 1.6, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 2
                    });

                    // Continuous flowing curved lines (right side network)
                    gsap.to('.km3-section .net-path', {
                        strokeDashoffset: -60, duration: 2.4, repeat: -1, ease: 'linear'
                    });

                    // Avatars gentle float
                    gsap.utils.toArray('.km3-section .km3-hero .avatar').forEach((el, i) => {
                        gsap.to(el, {
                            y: i % 2 === 0 ? -6 : 6,
                            duration: 2 + (i * .2),
                            repeat: -1, yoyo: true, ease: 'sine.inOut'
                        });
                    });

                    // Badge pill soft glow breathing
                    gsap.to('.km3-section .badge-pill', {
                        boxShadow: '0 0 40px rgba(95,212,255,.35), inset 0 0 16px rgba(95,212,255,.15)',
                        duration: 2.4, repeat: -1, yoyo: true, ease: 'sine.inOut'
                    });

                    // Corner icon glow breathing
                    gsap.to('.km3-section .corner-icon.left', { boxShadow: '0 0 46px rgba(57,255,176,.7), inset 0 0 20px rgba(57,255,176,.25)', duration: 2, repeat: -1, yoyo: true, ease: 'sine.inOut' });
                    gsap.to('.km3-section .corner-icon.right', { boxShadow: '0 0 46px rgba(255,47,116,.7), inset 0 0 20px rgba(255,47,116,.3)', duration: 2, repeat: -1, yoyo: true, ease: 'sine.inOut' });

                });

            } catch (err) {
                console.error('[km3] section script error:', err);
            }
        })();
        /* ==================== index4.html (km4) scripts ==================== */
}
