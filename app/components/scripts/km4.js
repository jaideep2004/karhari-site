/* Extracted verbatim from combined.html by tools/phase2-extract.js - do not hand-edit. */
export function runKm4(gsap, ScrollTrigger, MotionPathPlugin) {
(function () {
            try {

                ((__kmF) => {
  if (document.readyState === 'loading') { document.addEventListener('DOMContentLoaded', __kmF); } else { __kmF(); }
})(() => {

                    /* Build waveform bars */
                    const waveEl = document.getElementById('km4-waveformEl');
                    const wHeights = [6, 12, 18, 10, 20, 14, 8, 16, 11, 7];
                    const waveBars = wHeights.map(h => {
                        const s = document.createElement('span');
                        s.style.height = h + 'px';
                        waveEl.appendChild(s);
                        return s;
                    });

                    /* Build HUD tick sidebars */
                    const ticksLeft = document.getElementById('km4-ticksLeft');
                    const ticksRight = document.getElementById('km4-ticksRight');
                    for (let i = 0; i < 7; i++) {
                        const l = document.createElement('span');
                        l.style.width = gsap.utils.random(10, 30) + 'px';
                        ticksLeft.appendChild(l);
                        const r = document.createElement('span');
                        r.style.width = gsap.utils.random(10, 30) + 'px';
                        ticksRight.appendChild(r);
                    }

                    /* Ambient floating particles across the whole stage */
                    const stageEl = document.getElementById('km4-stageEl');
                    const particles = [];
                    for (let i = 0; i < 24; i++) {
                        const p = document.createElement('div');
                        p.className = 'stage-particle';
                        p.style.left = gsap.utils.random(0, 100) + '%';
                        p.style.top = gsap.utils.random(0, 100) + '%';
                        stageEl.appendChild(p);
                        particles.push(p);
                    }
                    particles.forEach(p => animateParticle(p));
                    function animateParticle(p) {
                        gsap.set(p, { opacity: 0, scale: gsap.utils.random(.6, 1.4) });
                        gsap.to(p, {
                            opacity: gsap.utils.random(.3, .9),
                            y: -gsap.utils.random(20, 60),
                            duration: gsap.utils.random(2, 4.5),
                            ease: 'sine.inOut',
                            onComplete: () => {
                                gsap.set(p, { top: gsap.utils.random(0, 100) + '%', left: gsap.utils.random(0, 100) + '%', y: 0 });
                                gsap.to(p, { opacity: 0, duration: .8, onComplete: () => animateParticle(p) });
                            }
                        });
                    }

                    /* Mini sparks INSIDE the player body — extra "alive" holographic dust */
                    const playerBody = document.getElementById('km4-playerBody');
                    const miniSparks = [];
                    for (let i = 0; i < 10; i++) {
                        const s = document.createElement('div');
                        s.className = 'mini-spark';
                        s.style.left = gsap.utils.random(8, 92) + '%';
                        s.style.top = gsap.utils.random(8, 92) + '%';
                        playerBody.appendChild(s);
                        miniSparks.push(s);
                    }
                    miniSparks.forEach(s => animateMiniSpark(s));
                    function animateMiniSpark(s) {
                        gsap.set(s, { opacity: 0 });
                        gsap.to(s, {
                            opacity: gsap.utils.random(.4, 1),
                            y: -gsap.utils.random(6, 18),
                            duration: gsap.utils.random(1.2, 2.6),
                            ease: 'sine.inOut',
                            onComplete: () => {
                                gsap.set(s, { top: gsap.utils.random(8, 92) + '%', left: gsap.utils.random(8, 92) + '%', y: 0 });
                                gsap.to(s, { opacity: 0, duration: .5, onComplete: () => animateMiniSpark(s) });
                            }
                        });
                    }

                    /* Beam particles rising from the pedestal core UP into the screen (V direction) */
                    const beamOriginX = 240;
                    for (let i = 0; i < 12; i++) {
                        const bp = document.createElement('div');
                        bp.style.position = 'absolute';
                        bp.style.width = '3px';
                        bp.style.height = '3px';
                        bp.style.borderRadius = '50%';
                        bp.style.background = '#ffd9dc';
                        bp.style.boxShadow = '0 0 6px 2px rgba(255,130,140,.85)';
                        bp.style.zIndex = '3';
                        bp.style.left = (beamOriginX - 10 + gsap.utils.random(-6, 6)) + 'px';
                        bp.style.top = (430 + gsap.utils.random(-10, 10)) + 'px';
                        stageEl.appendChild(bp);
                        animateBeamParticle(bp);
                    }
                    function animateBeamParticle(bp) {
                        gsap.set(bp, { opacity: 0, y: 0, x: 0 });
                        const riseDist = gsap.utils.random(110, 150);
                        const drift = gsap.utils.random(-18, 18);
                        gsap.to(bp, {
                            y: -riseDist,
                            x: drift,
                            opacity: 1,
                            duration: gsap.utils.random(1.1, 2),
                            ease: 'sine.out',
                            onComplete: () => {
                                gsap.to(bp, {
                                    opacity: 0, duration: .3,
                                    onComplete: () => animateBeamParticle(bp)
                                });
                            }
                        });
                    }

                    /* Initial 3D tilt: pitched back + yawed RIGHT (positive rotationY)
                       so the right edge recedes and the screen visibly faces right */
                    gsap.set('#km4-playerWindow', {
                        transformPerspective: 1300,
                        rotationX: 12,
                        rotationY: 13,
                        transformOrigin: '50% 100%'
                    });

                    /* ---------- ENTRANCE TIMELINE ---------- */
                    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

                    tl.fromTo('.km4-section .cid-left', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: .7 })
                        .fromTo('.km4-section .cid-right', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: .7 }, '-=.5')
                        .fromTo('.km4-section .cid-center', { opacity: 0, scale: .92 }, { opacity: 1, scale: 1, duration: .8 }, '-=.5')
                        .to('#km4-playerWindow', { rotationX: 8, rotationY: 10, duration: 1.1, ease: 'power3.out' }, '-=.7')
                        .fromTo('.km4-section .float-panel', { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: .5, stagger: .12 }, '-=.6')
                        .to('.km4-section .conn-path, .conn-dot', { opacity: 1, duration: .6 }, '-=.3')
                        .fromTo('.km4-section .rule-row', { opacity: 0, x: 16 }, { opacity: 1, x: 0, duration: .45, stagger: .08 }, '-=.5');

                    /* ---------- AMBIENT LOOPS ---------- */

                    gsap.to('#km4-playRing', { rotate: 360, duration: 5, repeat: -1, ease: 'linear', transformOrigin: '50% 50%' });
                    gsap.to('.km4-section .play-ring-outer', { rotate: -360, duration: 12, repeat: -1, ease: 'linear', transformOrigin: '50% 50%' });
                    gsap.to('#km4-ringRunner', { rotate: 360, duration: 3.2, repeat: -1, ease: 'linear', transformOrigin: '50% 50%' });

                    gsap.to('.km4-section .play-btn', {
                        boxShadow: '0 0 50px rgba(255,35,56,.85), inset 0 0 16px rgba(255,255,255,.2)',
                        duration: 1.8, repeat: -1, yoyo: true, ease: 'sine.inOut'
                    });
                    gsap.to('.km4-section .play-ring-glow', { opacity: .4, duration: 1.8, repeat: -1, yoyo: true, ease: 'sine.inOut' });

                    gsap.set('#km4-glassSheen', { x: '-40%' });
                    gsap.to('#km4-glassSheen', {
                        x: '140%', duration: 3.4, repeat: -1, repeatDelay: 2.2, ease: 'power1.inOut'
                    });

                    /* scan-line sweeping continuously top to bottom */
                    gsap.set('#km4-scanLine', { top: '0%', opacity: 0 });
                    gsap.timeline({ repeat: -1, repeatDelay: .6 })
                        .to('#km4-scanLine', { opacity: .6, duration: .2 })
                        .to('#km4-scanLine', { top: '100%', duration: 1.6, ease: 'sine.inOut' }, '<')
                        .to('#km4-scanLine', { opacity: 0, duration: .3 }, '-=.3');

                    /* corner brackets breathing */
                    gsap.to('.km4-section .corner-bracket', {
                        opacity: .95, duration: 1.4, repeat: -1, yoyo: true, ease: 'sine.inOut', stagger: .15
                    });

                    /* live status dot pulse */
                    gsap.to('#km4-liveDot', {
                        boxShadow: '0 0 10px 3px rgba(62,207,90,.85)', scale: 1.25,
                        duration: 1, repeat: -1, yoyo: true, ease: 'sine.inOut', transformOrigin: '50% 50%'
                    });

                    /* progress shimmer sweep */
                    gsap.to('#km4-progShimmer', {
                        left: '110%', duration: 2.2, repeat: -1, ease: 'power1.inOut', repeatDelay: .6
                    });

                    gsap.to('.km4-section .hud-ticks-side span', {
                        opacity: gsap.utils.wrap([1, .3]),
                        duration: .9, repeat: -1, yoyo: true, stagger: { each: .1, from: 'random' }, ease: 'sine.inOut'
                    });

                    gsap.to('.km4-section .hud-ring.r1', { rotate: 360, duration: 40, repeat: -1, ease: 'linear', transformOrigin: '50% 50%' });
                    gsap.to('.km4-section .hud-ring.r2', { rotate: -360, duration: 55, repeat: -1, ease: 'linear', transformOrigin: '50% 50%' });

                    waveBars.forEach((bar, i) => animateWave(bar, wHeights[i]));
                    function animateWave(bar, base) {
                        const target = gsap.utils.random(base * 0.4, base * 1.6, 1);
                        gsap.to(bar, {
                            height: target + 'px',
                            duration: gsap.utils.random(.35, .8),
                            ease: 'sine.inOut',
                            onComplete: () => animateWave(bar, base)
                        });
                    }

                    gsap.to('.km4-section .conn-path', { strokeDashoffset: -20, duration: 1.6, repeat: -1, ease: 'linear' });
                    gsap.to('.km4-section .conn-dot', {
                        scale: 1.6, opacity: .4, duration: 1, repeat: -1, yoyo: true,
                        transformOrigin: '50% 50%', ease: 'sine.inOut', stagger: .2
                    });

                    gsap.utils.toArray('.km4-section .float-panel').forEach((el, i) => {
                        gsap.to(el, {
                            y: i % 2 === 0 ? -6 : 6,
                            duration: 2.4 + i * .2,
                            repeat: -1, yoyo: true, ease: 'sine.inOut'
                        });
                    });

                    /* Idle "breathing" tilt on BOTH axes — keeps the screen facing right */
                    gsap.to('#km4-playerWindow', {
                        rotationX: 5,
                        rotationY: 16,
                        duration: 4.5,
                        repeat: -1,
                        yoyo: true,
                        ease: 'sine.inOut',
                        delay: 1.6
                    });

                    /* ---------- PEDESTAL + V-BEAM CONTINUOUS ANIMATION ---------- */

                    gsap.to('.km4-section .beam', { opacity: .5, duration: 1.4, repeat: -1, yoyo: true, ease: 'sine.inOut' });
                    gsap.to('.km4-section .beam-core', { opacity: .35, scaleX: 1.08, duration: 1.1, repeat: -1, yoyo: true, ease: 'sine.inOut', transformOrigin: 'bottom center' });
                    gsap.to('.km4-section .beam-streak', { opacity: .2, duration: 1.2, repeat: -1, yoyo: true, ease: 'sine.inOut', stagger: .3 });

                    gsap.to('#km4-underGlow', { opacity: .4, scale: 1.15, duration: 1.6, repeat: -1, yoyo: true, ease: 'sine.inOut', transformOrigin: '50% 50%' });

                    gsap.to('#km4-pedGlow', { opacity: .55, scale: 1.08, duration: 2, repeat: -1, yoyo: true, ease: 'sine.inOut', transformOrigin: '240px 150px' });
                    gsap.to('#km4-pedCore', { opacity: .7, scale: 1.08, duration: 1.5, repeat: -1, yoyo: true, ease: 'sine.inOut', transformOrigin: '240px 146px' });

                    gsap.to('#km4-pedRingDash', { attr: { 'stroke-dashoffset': -200 }, duration: 3, repeat: -1, ease: 'linear' });
                    gsap.to('#km4-pedRing2', { attr: { rx: 90, ry: 12 }, duration: 2.2, repeat: -1, yoyo: true, ease: 'sine.inOut' });

                    gsap.to('#km4-rayGroup', { rotate: 360, duration: 34, repeat: -1, ease: 'linear', transformOrigin: '240px 150px' });
                    gsap.to('#km4-orbitGroup', { rotate: -360, duration: 18, repeat: -1, ease: 'linear', transformOrigin: '240px 150px' });

                    ['#km4-sonar1', '#km4-sonar2', '#km4-sonar3'].forEach((sel, i) => {
                        gsap.fromTo(sel,
                            { attr: { rx: 40, ry: 5 }, opacity: .6 },
                            {
                                attr: { rx: 220, ry: 24 }, opacity: 0,
                                duration: 3.6, repeat: -1, delay: i * 1.2, ease: 'sine.out',
                                transformOrigin: '240px 200px'
                            });
                    });

                    gsap.to('.km4-section .info-icon', { boxShadow: '0 0 28px rgba(255,35,56,.7)', duration: 2, repeat: -1, yoyo: true, ease: 'sine.inOut' });
                    gsap.to('.km4-section .rh-icon', { boxShadow: '0 0 22px rgba(255,35,56,.75)', duration: 2, repeat: -1, yoyo: true, ease: 'sine.inOut' });

                });

            } catch (err) {
                console.error('[km4] section script error:', err);
            }
        })();
        /* ==================== index6.html (km6) scripts ==================== */
}
