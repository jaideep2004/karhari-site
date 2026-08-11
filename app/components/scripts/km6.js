/* Extracted verbatim from combined.html by tools/phase2-extract.js - do not hand-edit. */
export function runKm6(gsap, ScrollTrigger, MotionPathPlugin) {
(function () {
            try {

                ((__kmF) => {
  if (document.readyState === 'loading') { document.addEventListener('DOMContentLoaded', __kmF); } else { __kmF(); }
})(() => {

                    /* Build mini waveform bars */
                    const miniWave = document.getElementById('km6-miniWave');
                    const mHeights = [8, 14, 20, 11, 22, 15, 9, 17];
                    const miniBars = mHeights.map(h => {
                        const s = document.createElement('span');
                        s.style.height = h + 'px';
                        miniWave.appendChild(s);
                        return s;
                    });
                    miniBars.forEach((bar, i) => animateMiniWave(bar, mHeights[i]));
                    function animateMiniWave(bar, base) {
                        const target = gsap.utils.random(base * 0.4, base * 1.5, 1);
                        gsap.to(bar, {
                            height: target + 'px',
                            duration: gsap.utils.random(.4, .9),
                            ease: 'sine.inOut',
                            onComplete: () => animateMiniWave(bar, base)
                        });
                    }

                    /* ---------- ENTRANCE ANIMATIONS ---------- */
                    /* Play immediately: a scroll-triggered entrance freezes under
                       content-visibility layout shifts in the merged page (km6 stays
                       invisible). A small delay lets the section render first. */
                    const tl = gsap.timeline({ defaults: { ease: 'power3.out' }, delay: 0.25 });

                    tl.fromTo('#km6-card1', { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: .7 })
                        .fromTo('#km6-card2', { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: .7 }, '-=.5')
                        .fromTo('#km6-card3', { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: .7 }, '-=.5')
                        .fromTo('#km6-mc1', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: .6 }, '-=.3')
                        .fromTo('#km6-mc2', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: .6 }, '-=.45')
                        .fromTo('#km6-mc3', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: .6 }, '-=.45')
                        .fromTo('#km6-mc4', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: .6 }, '-=.45');

                    /* Fallback: make sure content is never stuck invisible (e.g. if GSAP
                       or the entrance timeline failed to run). */
                    setTimeout(() => {
                        gsap.set(['#km6-card1', '#km6-card2', '#km6-card3', '#km6-mc1', '#km6-mc2', '#km6-mc3', '#km6-mc4'], { opacity: 1, y: 0 });
                    }, 2500);

                    /* ---------- AMBIENT LOOPS ---------- */

                    // step icon glow pulse, staggered
                    gsap.to('.km6-section .step-icon', {
                        boxShadow: '0 0 28px rgba(255,35,56,.75), inset 0 0 10px rgba(255,255,255,.15)',
                        duration: 1.6, repeat: -1, yoyo: true, ease: 'sine.inOut', stagger: .3
                    });

                    // flowing dots along connector arrows
                    gsap.utils.toArray('.km6-section .step-arrow').forEach((arrow, i) => {
                        const dot = arrow.querySelector('.arrow-flow-dot');
                        gsap.timeline({ repeat: -1, delay: i * .4 })
                            .set(dot, { x: 0, opacity: 0 })
                            .to(dot, { opacity: 1, duration: .15 })
                            .to(dot, { x: 20, duration: .8, ease: 'power1.in' })
                            .to(dot, { opacity: 0, duration: .15 }, '-=.15');
                    });

                    // policy icon glow breathing
                    gsap.to('.km6-section .policy-item .pi-icon', {
                        boxShadow: '0 0 20px rgba(255,35,56,.5)', duration: 1.8, repeat: -1, yoyo: true,
                        ease: 'sine.inOut', stagger: .2
                    });

                    // thumb play triangles subtle pulse
                    gsap.to('.km6-section .thumb .tri-mini', {
                        opacity: .5, duration: 1.2, repeat: -1, yoyo: true, ease: 'sine.inOut', stagger: .15
                    });

                    // av preview light beams sweeping
                    gsap.utils.toArray('.km6-section .av-light-beam').forEach((beam, i) => {
                        gsap.fromTo(beam, { x: -40, opacity: 0 }, {
                            x: 100, opacity: .6, duration: 2.2, repeat: -1, delay: i * .8, ease: 'sine.inOut'
                        });
                    });
                    gsap.to('.km6-section .av-play', {
                        boxShadow: '0 0 22px rgba(255,35,56,.85)', duration: 1.6, repeat: -1, yoyo: true, ease: 'sine.inOut'
                    });

                    // mini card header icon glow
                    gsap.to('.km6-section .mini-card.green .mh-icon', { boxShadow: '0 0 22px rgba(62,207,90,.7)', duration: 2, repeat: -1, yoyo: true, ease: 'sine.inOut' });
                    gsap.to('.km6-section .mini-card.blue .mh-icon', { boxShadow: '0 0 22px rgba(58,160,255,.7)', duration: 2, repeat: -1, yoyo: true, ease: 'sine.inOut' });
                    gsap.to('.km6-section .mini-card.purple .mh-icon', { boxShadow: '0 0 22px rgba(162,92,255,.7)', duration: 2, repeat: -1, yoyo: true, ease: 'sine.inOut' });
                    gsap.to('.km6-section .mini-card.gold .mh-icon', { boxShadow: '0 0 22px rgba(255,176,32,.7)', duration: 2, repeat: -1, yoyo: true, ease: 'sine.inOut' });

                    // note strip icon glow
                    gsap.to('.km6-section .note-strip .ns-icon', { boxShadow: '0 0 18px rgba(255,35,56,.7)', duration: 2, repeat: -1, yoyo: true, ease: 'sine.inOut' });
                    gsap.to('.km6-section .warn-icon', { boxShadow: '0 0 16px rgba(255,35,56,.55)', duration: 1.8, repeat: -1, yoyo: true, ease: 'sine.inOut' });

                    // button hover glow lift (mouse-driven, not looping)
                    document.querySelectorAll('.km6-section .mini-btn').forEach(btn => {
                        btn.addEventListener('mouseenter', () => gsap.to(btn, { scale: 1.04, duration: .25, ease: 'power2.out' }));
                        btn.addEventListener('mouseleave', () => gsap.to(btn, { scale: 1, duration: .25, ease: 'power2.out' }));
                    });

                });

            } catch (err) {
                console.error('[km6] section script error:', err);
            }
        })();
        /* ==================== index5.html (km5) scripts ==================== */
}
