/* Extracted verbatim from combined.html by tools/phase2-extract.js - do not hand-edit. */
export function runKm2(gsap, ScrollTrigger, MotionPathPlugin) {
(function () {
            try {

                const stage = document.getElementById('km2-stage');
                const heroEl = document.getElementById('km2-hero');
                const YT_TINY = `<svg viewBox="0 0 24 24"><path d="M9 7v10l8-5-8-5z"/></svg>`;
                const avatarUrl = i => `https://i.pravatar.cc/150?img=${(i % 70) + 1}`;
                const thumbUrl = i => `https://picsum.photos/seed/kmdc${i}/200/128`;

                // Starfield
                const starsWrap = document.getElementById('km2-stars');
                for (let i = 0; i < 90; i++) {
                    const s = document.createElement('div');
                    s.className = 'star';
                    s.style.left = Math.random() * 100 + '%';
                    s.style.top = Math.random() * 100 + '%';
                    s.style.opacity = Math.random() * .6 + .2;
                    starsWrap.appendChild(s);
                    gsap.to(s, { opacity: Math.random() * .8 + .1, duration: 1.5 + Math.random() * 2.5, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: Math.random() * 3 });
                }

                // Comet arcs
                const cometSvg = document.getElementById('km2-cometSvg');
                cometSvg.innerHTML = `
            <defs>
                <linearGradient id="cometGold" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stop-color="#ffb020" stop-opacity="0"/>
                    <stop offset="100%" stop-color="#ffb020" stop-opacity=".8"/>
                </linearGradient>
                <linearGradient id="cometPurple" x1="1" y1="0" x2="0" y2="1">
                    <stop offset="0%" stop-color="#9b6bff" stop-opacity="0"/>
                    <stop offset="100%" stop-color="#9b6bff" stop-opacity=".7"/>
                </linearGradient>
            </defs>
            <path d="M -50 40 Q 250 -40 550 120" stroke="url(#cometPurple)" stroke-width="1.4" fill="none" filter="blur(1px)"/>
            <path d="M 105 -20 Q 80 60 60 140" stroke="url(#cometGold)" stroke-width="1.4" fill="none" filter="blur(1px)"/>
        `;

                // Network chain definitions
                const HUB_PCT = { x: 50, y: 52 };
                const chainDefs = [
                    [{ type: 'avatar', x: 30, y: 33 }, { type: 'avatar', x: 25, y: 13 }, { type: 'thumb', x: 9, y: 15 }],
                    [{ type: 'avatar', x: 12, y: 41, vip: true }],
                    [{ type: 'avatar', x: 23, y: 58 }, { type: 'thumb', x: 15, y: 64 }],
                    [{ type: 'avatar', x: 33, y: 75 }, { type: 'avatar', x: 50, y: 88 }, { type: 'thumb', x: 75, y: 82 }],
                    [{ type: 'avatar', x: 61, y: 24 }, { type: 'avatar', x: 68, y: 13 }, { type: 'thumb', x: 87, y: 16 }],
                    [{ type: 'avatar', x: 74, y: 44 }, { type: 'avatar', x: 91, y: 24 }],
                    [{ type: 'avatar', x: 80, y: 60 }, { type: 'thumb', x: 91, y: 55 }],
                    [{ type: 'avatar', x: 67, y: 70 }]
                ];

                // Build nodes
                let imgCounter = 0;
                const nodes = [];
                chainDefs.forEach((chain, ci) => {
                    chain.forEach((pt, pi) => {
                        nodes.push({ ...pt, chainIdx: ci, posInChain: pi, id: `c${ci}-${pi}`, imgIdx: imgCounter++ });
                    });
                });

                nodes.forEach((n) => {
                    const el = document.createElement('div');
                    el.style.left = n.x + '%';
                    el.style.top = n.y + '%';
                    if (n.type === 'thumb') {
                        el.className = 'node thumb';
                        el.innerHTML = `<div class="card"><img src="${thumbUrl(n.imgIdx)}" alt="" loading="lazy" decoding="async"><div class="tint"></div><div class="yticon">${YT_TINY}</div><div class="cap">Testimonial</div></div>`;
                    } else {
                        el.className = 'node avatar' + (n.vip ? ' vip' : '');
                        el.innerHTML = `<div class="node-halo h1"></div><div class="node-halo h2"></div><div class="circle"><img src="${avatarUrl(n.imgIdx)}" alt="" loading="lazy" decoding="async"></div>`;
                    }
                    stage.appendChild(el);
                    n.el = el;
                });

                // Catmull-Rom to Bezier spline
                function splinePath(pts) {
                    if (pts.length < 2) return '';
                    let d = `M ${pts[0].x} ${pts[0].y} `;
                    for (let i = 0; i < pts.length - 1; i++) {
                        const p0 = pts[i - 1] || pts[i];
                        const p1 = pts[i];
                        const p2 = pts[i + 1];
                        const p3 = pts[i + 2] || p2;
                        const cp1x = p1.x + (p2.x - p0.x) / 6;
                        const cp1y = p1.y + (p2.y - p0.y) / 6;
                        const cp2x = p2.x - (p3.x - p1.x) / 6;
                        const cp2y = p2.y - (p3.y - p1.y) / 6;
                        d += `C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y} `;
                    }
                    return d;
                }

                let chainLineData = [];

                function buildChainGeometry(W, H) {
                    const HUB = { x: W * (HUB_PCT.x / 100), y: H * (HUB_PCT.y / 100) };
                    return chainDefs.map((chain, ci) => {
                        const chainPts = chain.map(p => ({ x: W * (p.x / 100), y: H * (p.y / 100) }));
                        const first = chainPts[0];
                        const dx = first.x - HUB.x, dy = first.y - HUB.y;
                        const dist = Math.hypot(dx, dy) || 1;
                        const nx = -dy / dist, ny = dx / dist;
                        const side = (chain[0].x < HUB_PCT.x ? -1 : 1);
                        const bow = dist * 0.24 * side;
                        const bendPt = { x: HUB.x + dx * 0.38 + nx * bow, y: HUB.y + dy * 0.38 + ny * bow };
                        const points = [HUB, bendPt, ...chainPts];
                        return { ci, chainLen: chain.length, points, d: splinePath(points) };
                    });
                }

                function createNetwork() {
                    chainLineData.forEach(cd => { if (cd.tween) cd.tween.kill(); });
                    chainLineData = [];
                }

                createNetwork();

                let resizeT;
                window.addEventListener('resize', () => { clearTimeout(resizeT); resizeT = setTimeout(createNetwork, 200); });

                // Entrance timeline
                const nodeEls = nodes.map(n => n.el);

                const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
                tl.from('.km2-section .hero-header h1', { y: -30, opacity: 0, duration: .8 })
                    .from('.km2-section .subtitle', { y: -10, opacity: 0, duration: .6 }, '-=.4')
                    .from('.km2-section .divider', { opacity: 0, duration: .6 }, '-=.3')
                    .to('.km2-section .kpi-card', { y: 0, opacity: 1, duration: .7, stagger: .15 }, '-=.2')
                    .to('#km2-hubLabel', { opacity: 1, y: 0, duration: .6 }, '-=.2')
                    .from('#km2-hub', { scale: .3, opacity: 0, duration: .9, ease: 'back.out(1.7)' }, '-=.3')
                    .to(nodeEls, { opacity: 1, scale: 1, duration: .5, stagger: { each: .025, from: 'random' }, ease: 'back.out(2)' }, '-=.8')
                    .to('.km2-section .feature-item', { opacity: 1, y: 0, duration: .6, stagger: .08 }, '-=.2');

                // Ambient animations
                gsap.to('.km2-section .ped-sweep', { rotate: 360, duration: 6, repeat: -1, ease: 'none', transformOrigin: '50% 50%' });
                gsap.to('.km2-section .ped-ring.r3', { boxShadow: '0 0 40px rgba(200,235,255,.9)', duration: 1.6, repeat: -1, yoyo: true, ease: 'sine.inOut' });
                gsap.to('.km2-section .ped-floor-glow', { opacity: .6, scale: 1.08, duration: 2, repeat: -1, yoyo: true, ease: 'sine.inOut' });
                gsap.to('#km2-ytBtn', { y: -12, duration: 2.2, repeat: -1, yoyo: true, ease: 'sine.inOut' });
                gsap.to('#km2-ytBtn', { rotateY: 10, rotateX: -4, duration: 4, repeat: -1, yoyo: true, ease: 'sine.inOut' });

                // Halo breathing
                document.querySelectorAll('.km2-section .node-halo').forEach((h) => {
                    const isOuter = h.classList.contains('h2');
                    gsap.to(h, {
                        scale: isOuter ? 1.3 : 1.16, opacity: isOuter ? .06 : .14,
                        duration: 1.8 + Math.random() * 1.4, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: Math.random() * 2
                    });
                });

                // Gentle float for nodes
                nodes.forEach((n, i) => {
                    gsap.to(n.el, {
                        y: '+=' + gsap.utils.random(-5, 5), x: '+=' + gsap.utils.random(-3, 3),
                        duration: gsap.utils.random(2.2, 3.6), repeat: -1, yoyo: true, ease: 'sine.inOut', delay: i * 0.05
                    });
                });

                // Mouse parallax
                heroEl.addEventListener('mousemove', (e) => {
                    const r = heroEl.getBoundingClientRect();
                    const px = (e.clientX - r.left) / r.width - 0.5;
                    const py = (e.clientY - r.top) / r.height - 0.5;
                    gsap.to(stage, { rotateY: px * 6, rotateX: -py * 6, transformPerspective: 1400, duration: .6, ease: 'power2.out' });
                    gsap.to('#km2-hub', { x: px * 14, y: py * 10, duration: .6, ease: 'power2.out' });
                });
                heroEl.addEventListener('mouseleave', () => {
                    gsap.to(stage, { rotateY: 0, rotateX: 0, duration: .8, ease: 'power2.out' });
                    gsap.to('#km2-hub', { x: 0, y: 0, duration: .8, ease: 'power2.out' });
                });

            } catch (err) {
                console.error('[km2] section script error:', err);
            }
        })();
        /* ==================== index3.html (km3) scripts ==================== */
}
