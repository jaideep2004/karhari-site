/* Extracted verbatim from combined.html by tools/phase2-extract.js - do not hand-edit. */
export function runKm7(gsap, ScrollTrigger, MotionPathPlugin) {
(function () {
            try {

                /* ============================================================
                   REUSABLE: PARTICLES
                ============================================================ */
                function spawnParticles(stageEl, fieldEl, count) {
                    for (let i = 0; i < count; i++) {
                        const s = document.createElement('div');
                        s.className = 'spark';
                        fieldEl.appendChild(s);
                        resetParticle(stageEl, s, true);
                    }
                }
                function resetParticle(stageEl, el, first) {
                    const w = stageEl.offsetWidth, h = stageEl.offsetHeight;
                    const startX = gsap.utils.random(w * 0.32, w * 0.68);
                    const startY = h * gsap.utils.random(0.78, 0.9);
                    gsap.set(el, { x: startX, y: startY, opacity: 1, scale: gsap.utils.random(.7, 1.3) });
                    const travel = gsap.utils.random(h * 0.35, h * 0.55);
                    const drift = gsap.utils.random(-18, 18);
                    const dur = gsap.utils.random(2, 3.2);
                    gsap.to(el, {
                        x: `+=${drift}`, y: `-=${travel}`, duration: dur, ease: 'power1.out',
                        delay: first ? gsap.utils.random(0, 3) : 0,
                        onComplete: () => resetParticle(stageEl, el, false)
                    });
                    gsap.fromTo(el, { opacity: 1 }, { opacity: 0, duration: dur * 0.3, delay: dur * 0.7 + (first ? gsap.utils.random(0, 3) : 0), ease: 'power1.in' });
                }

                /* ============================================================
                   REUSABLE: PEDESTAL ANIMATION
                ============================================================ */
                function animatePedestal(ring1, ring2, ring3, core, pulse) {
                    gsap.to(ring1, { strokeDashoffset: -220, duration: 9, repeat: -1, ease: 'none' });
                    gsap.to(ring2, { strokeDashoffset: 180, duration: 7, repeat: -1, ease: 'none' });
                    gsap.to(ring3, { strokeDashoffset: -140, duration: 11, repeat: -1, ease: 'none' });
                    gsap.to(core, { attr: { rx: 34, ry: 9.5 }, duration: 1.5, repeat: -1, yoyo: true, ease: 'sine.inOut' });
                    (function fire() {
                        gsap.fromTo(pulse,
                            { attr: { rx: 30, ry: 8 }, opacity: 1 },
                            { attr: { rx: 200, ry: 48 }, opacity: 0, duration: 1.9, ease: 'power1.out', onComplete: fire }
                        );
                    })();
                }

                /* =========================================================
                   CARD 1 SETUP
                ========================================================= */
                const stage1 = document.getElementById('km7-stage1');
                spawnParticles(stage1, document.getElementById('km7-particles1'), 12);
                animatePedestal('#km7-c1-ring1', '#km7-c1-ring2', '#km7-c1-ring3', '#km7-c1-core', '#km7-c1-pulse');

                gsap.to('#km7-c1-monitor', { y: -8, duration: 3.2, repeat: -1, yoyo: true, ease: 'sine.inOut' });

                function shineSweep(el, delayBetween) {
                    gsap.fromTo(el, { left: '-40%' }, {
                        left: '140%', duration: 1.3, ease: 'power2.inOut',
                        onComplete: () => gsap.delayedCall(delayBetween, () => shineSweep(el, delayBetween))
                    });
                }
                shineSweep(document.getElementById('km7-c1-shine'), 2.8);

                gsap.to('#km7-c1-shield', { y: -7, duration: 2.8, repeat: -1, yoyo: true, ease: 'sine.inOut' });
                gsap.to('#km7-c1-shield svg', { filter: 'drop-shadow(0 0 34px rgba(255,45,45,.9))', duration: 1.7, repeat: -1, yoyo: true, ease: 'sine.inOut' });
                gsap.to('#km7-c1-shield .lock-badge svg', { scale: 1.12, transformOrigin: 'center', duration: 1.5, repeat: -1, yoyo: true, ease: 'sine.inOut' });

                [['#km7-c1-icon1', 0], ['#km7-c1-icon2', .4], ['#km7-c1-icon3', .8]].forEach(([sel, delay]) => {
                    gsap.to(sel, { y: -6, duration: 2.2, repeat: -1, yoyo: true, ease: 'sine.inOut', delay });
                    gsap.to(sel, {
                        boxShadow: '0 0 22px rgba(255,45,45,1), inset 0 0 6px rgba(255,255,255,.1), 0 5px 12px rgba(0,0,0,.5)',
                        duration: 1.6, repeat: -1, yoyo: true, ease: 'sine.inOut', delay
                    });
                });

                /* =========================================================
                   CARD 2 SETUP — FINGERPRINT (create → scan → reset loop, STATIC position)
                ========================================================= */
                const stage2 = document.getElementById('km7-stage2');
                spawnParticles(stage2, document.getElementById('km7-particles2'), 12);
                animatePedestal('#km7-c2-ring1', '#km7-c2-ring2', '#km7-c2-ring3', '#km7-c2-core', '#km7-c2-pulse');

                /* NOTE: no y-floating tween on #c2-fp anymore — it stays fixed in place */
                gsap.to('#km7-c2-fp svg', {
                    filter: 'drop-shadow(0 0 14px var(--accent)) drop-shadow(0 0 34px var(--glow))',
                    duration: 1.6, repeat: -1, yoyo: true, ease: 'sine.inOut'
                });

                const fpOutline = document.getElementById('km7-c2-fpOutline');
                const fpFill = document.getElementById('km7-c2-fpPath');
                const fpScan = document.getElementById('km7-c2-scan');
                const fpLen = fpOutline.getTotalLength();
                fpOutline.style.strokeDasharray = fpLen;
                fpOutline.style.strokeDashoffset = fpLen;

                function fingerprintCycle() {
                    const tl = gsap.timeline({ onComplete: fingerprintCycle });

                    // reset state
                    tl.set(fpOutline, { strokeDashoffset: fpLen, opacity: 1 })
                        .set(fpFill, { opacity: 0 })
                        .set(fpScan, { top: '-15%', opacity: 0 })

                        // 1) CREATING — ridges draw themselves on, like a scanner tracing the print
                        .to(fpOutline, { strokeDashoffset: 0, duration: 1.7, ease: 'power2.inOut' })

                        // 2) fingerprint "materializes" (fill fades in over the traced outline)
                        .to(fpFill, { opacity: 1, duration: .55, ease: 'power1.out' }, '-=0.25')
                        .to(fpOutline, { opacity: 0, duration: .4 }, '<')

                        // 3) SCANNING — beam sweeps down across the completed print (twice)
                        .set(fpScan, { opacity: 1, top: '100%' })
                        .to(fpScan, { top: '-15%', duration: 1.3, ease: 'power1.inOut' })
                        .to(fpScan, { top: '100%', duration: 0, }, '+=0.15')
                        .to(fpScan, { top: '-15%', duration: 1.1, ease: 'power1.inOut' })
                        .to(fpScan, { opacity: 0, duration: .3 })

                        // 4) hold completed / matched state briefly
                        .to({}, { duration: .9 })

                        // 5) fade out to loop back into "creating" again
                        .to(fpFill, { opacity: 0, duration: .5, ease: 'power1.in' });
                }
                fingerprintCycle();

                gsap.to('.km7-section .audio-wave span', {
                    height: () => gsap.utils.random(25, 100) + '%',
                    duration: () => gsap.utils.random(.3, .7),
                    repeat: -1, yoyo: true, repeatRefresh: true, ease: 'sine.inOut', stagger: .05
                });

                function playMatchCounter() {
                    const obj = { v: 0 };
                    gsap.to(obj, {
                        v: 100, duration: 2.2, ease: 'power2.out',
                        onUpdate() { document.getElementById('km7-c2-percent').textContent = Math.round(obj.v); },
                        onComplete() {
                            gsap.to('.km7-section .match-pos', { boxShadow: '0 0 34px rgba(41,163,255,.7)', duration: .4, yoyo: true, repeat: 1 });
                            gsap.delayedCall(2.6, () => { obj.v = 0; document.getElementById('km7-c2-percent').textContent = '0'; playMatchCounter(); });
                        }
                    });
                }
                playMatchCounter();

                /* =========================================================
                   CARD 3 SETUP — PAYOUT & ROYALTIES
                ========================================================= */
                const stage3 = document.getElementById('km7-stage3');
                spawnParticles(stage3, document.getElementById('km7-particles3'), 12);
                animatePedestal('#km7-c3-ring1', '#km7-c3-ring2', '#km7-c3-ring3', '#km7-c3-core', '#km7-c3-pulse');

                /* ---- 3D Bar chart: grow-up on load ---- */
                const barGroupIds = ['#km7-barg1', '#km7-barg2', '#km7-barg3', '#km7-barg4', '#km7-barg5', '#km7-barg6'];
                gsap.set(barGroupIds, { transformOrigin: '50% 100%', scaleY: 0, opacity: 0 });
                barGroupIds.forEach((sel, i) => {
                    gsap.to(sel, {
                        scaleY: 1, opacity: 1, duration: 1.1, ease: 'power3.out', delay: .4 + i * 0.1,
                        onComplete() {
                            gsap.to(sel + ' .chart-bar', { opacity: gsap.utils.random(.75, 1), duration: gsap.utils.random(1, 2), repeat: -1, yoyo: true, repeatRefresh: true, ease: 'sine.inOut' });
                        }
                    });
                });

                /* ---- Line graph: initial draw-on ---- */
                const chartLine = document.getElementById('km7-chartLine');
                const clen = chartLine.getTotalLength();
                chartLine.style.strokeDasharray = clen;
                chartLine.style.strokeDashoffset = clen;
                gsap.to(chartLine, { strokeDashoffset: 0, duration: 1.6, ease: 'power2.inOut', delay: 1.2 });
                gsap.fromTo('.km7-section .chart-arrow', { opacity: 0, scale: .4, transformOrigin: 'center' }, { opacity: 1, scale: 1, duration: .5, delay: 2.7, ease: 'back.out(2)' });

                /* ---- Line graph: continuous energy comet ---- */
                const flowLine = document.getElementById('km7-chartLineFlow');
                const flen = flowLine.getTotalLength();
                const cometLength = 22;
                flowLine.style.strokeDasharray = `${cometLength} ${flen}`;
                flowLine.style.strokeDashoffset = flen;
                gsap.fromTo(flowLine,
                    { strokeDashoffset: flen },
                    { strokeDashoffset: -cometLength, duration: 2.2, ease: 'none', repeat: -1, delay: 3, repeatDelay: .6 }
                );

                gsap.fromTo('#km7-chartDots .chart-dot',
                    { scale: 0, transformOrigin: 'center' },
                    { scale: 1, duration: .4, stagger: .18, delay: 1.3, ease: 'back.out(3)' }
                );

                gsap.utils.toArray('.km7-section .chart-dot-pulse').forEach((p, i) => {
                    (function fire() {
                        gsap.fromTo(p,
                            { attr: { r: 3 }, opacity: .9 },
                            {
                                attr: { r: 11 }, opacity: 0, duration: 1.6, ease: 'power1.out', delay: i * 0.35 + gsap.utils.random(0, 1),
                                onComplete: fire
                            }
                        );
                    })();
                });

                /* ---- Earnings count-up ---- */
                const earnObj = { v: 0 };
                gsap.to(earnObj, {
                    v: 24680.50, duration: 2.4, ease: 'power2.out', delay: .6,
                    onUpdate() {
                        document.getElementById('km7-c3-earnings').textContent =
                            earnObj.v.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                    }
                });
                gsap.to('#km7-c3-pct', { scale: 1.12, transformOrigin: 'center', duration: 1.2, repeat: -1, yoyo: true, ease: 'sine.inOut' });
                gsap.to('.km7-section .earnings-pos', { y: -6, duration: 3, repeat: -1, yoyo: true, ease: 'sine.inOut' });

                /* ---- Gold coins: STATIC & grounded — only subtle sparkle glints ---- */
                function addSparkle(el) {
                    const sp = el.querySelector('.km7-sparkle');
                    if (!sp) return;
                    sp.style.left = gsap.utils.random(18, 60) + '%';
                    sp.style.top = gsap.utils.random(15, 50) + '%';
                    gsap.timeline({ repeat: -1, repeatDelay: gsap.utils.random(2, 4.5), delay: gsap.utils.random(0, 2) })
                        .to(sp, { opacity: 1, scale: 1.5, duration: .25 })
                        .to(sp, { opacity: 0, scale: .4, duration: .4 });
                }
                gsap.utils.toArray('.km7-section .coin-top, .loose-main').forEach((el) => {
                    addSparkle(el);
                });

                gsap.from('.km7-section .coin-stack, .coin-loose', {
                    scale: 0, opacity: 0, y: 24, duration: .8, stagger: .1, delay: .5, ease: 'back.out(1.6)'
                });

                /* =========================================================
                   CARD 4 SETUP — COPYRIGHT & CONTROL
                ========================================================= */
                const stage4 = document.getElementById('km7-stage4');
                spawnParticles(stage4, document.getElementById('km7-particles4'), 12);
                animatePedestal('#km7-c4-ring1', '#km7-c4-ring2', '#km7-c4-ring3', '#km7-c4-core', '#km7-c4-pulse');

                /* orbit rings slow rotation */
                const orbit1 = document.getElementById('km7-c4-orbit1');
                const orbit2 = document.getElementById('km7-c4-orbit2');
                const o1len = orbit1.getTotalLength();
                const o2len = orbit2.getTotalLength();
                orbit1.style.strokeDasharray = '6 6';
                orbit2.style.strokeDasharray = '6 6';
                gsap.to(orbit1, { strokeDashoffset: -o1len, duration: 14, repeat: -1, ease: 'none' });
                gsap.to(orbit2, { strokeDashoffset: o2len, duration: 20, repeat: -1, ease: 'none' });

                /* connector energy flow comets — travel from shield outward to each node */
                ['#km7-c4-flow-top', '#km7-c4-flow-right', '#km7-c4-flow-bottom', '#km7-c4-flow-left'].forEach((sel, i) => {
                    const el = document.querySelector(sel);
                    const len = el.getTotalLength();
                    const comet = 18;
                    el.style.strokeDasharray = `${comet} ${len}`;
                    el.style.strokeDashoffset = len;
                    gsap.fromTo(el,
                        { strokeDashoffset: len },
                        { strokeDashoffset: -comet, duration: 1.8, ease: 'none', repeat: -1, delay: 1 + i * 0.4, repeatDelay: 1.2 }
                    );
                });

                /* central shield stays fixed in place — only glow pulse + badge pulse animate (no y floating) */
                gsap.to('#km7-c4-shield svg', {
                    filter: 'drop-shadow(0 0 32px rgba(34,197,94,.9)) drop-shadow(0 0 14px rgba(255,255,255,.35))',
                    duration: 1.7, repeat: -1, yoyo: true, ease: 'sine.inOut'
                });
                gsap.to('#km7-c4-shield .cc-c-badge', { scale: 1.1, transformOrigin: 'center', duration: 1.6, repeat: -1, yoyo: true, ease: 'sine.inOut' });

                /* orbit node icons float + glow pulse */
                [['#km7-c4-node-top', 0], ['#km7-c4-node-right', .3], ['#km7-c4-node-bottom', .6], ['#km7-c4-node-left', .9]].forEach(([sel, delay]) => {
                    gsap.to(sel, { y: -6, duration: 2.3, repeat: -1, yoyo: true, ease: 'sine.inOut', delay });
                    gsap.to(sel, {
                        boxShadow: '0 0 22px rgba(34,197,94,1), inset 0 0 6px rgba(255,255,255,.1), 0 5px 12px rgba(0,0,0,.5)',
                        duration: 1.7, repeat: -1, yoyo: true, ease: 'sine.inOut', delay
                    });
                });

                /* Entrance: nodes settle in with bounce */
                gsap.from('.km7-section .cc-node', {
                    scale: 0, opacity: 0, duration: .7, stagger: .12, delay: .6, ease: 'back.out(1.8)'
                });
                gsap.from('#km7-c4-shield', {
                    scale: 0, opacity: 0, duration: .8, delay: .4, ease: 'back.out(1.6)'
                });

                /* =========================================================
                   ENTRANCE
                ========================================================= */
                gsap.from('.km7-section .cid-card:not(.placeholder)', { opacity: 0, y: 40, duration: 1, stagger: .15, ease: 'power3.out' });
                gsap.from('.km7-section .left-panel > *', { opacity: 0, x: -20, duration: .8, stagger: .1, delay: .2, ease: 'power3.out' });
                gsap.from('.km7-section .payout-row', { opacity: 0, y: 14, duration: .8, delay: .8, ease: 'power3.out' });

            } catch (err) {
                console.error('[km7] section script error:', err);
            }
        })();
        /* ==================== index8.html (km8) scripts ==================== */
}
