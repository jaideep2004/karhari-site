/* Extracted verbatim from combined.html by tools/phase2-extract.js - do not hand-edit. */
export function runKm8(gsap, ScrollTrigger, MotionPathPlugin) {
(function () {
            try {

                const checkSm = `<svg viewBox="0 0 24 24" fill="none" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg>`;
                const arrowSvg = `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M5 12h11l-4-4 1.4-1.4L19.8 12l-6.4 6.4L12 17l4-4H5z"/></svg>`;

                /* ============ ILLUSTRATION TEMPLATES ============ */
                const illustrations = {
                    "01": `
  <div class="i-avatar">
    <svg class="i-headphone" viewBox="0 0 60 34"><path d="M4 30 V17 a26 26 0 0 1 52 0 V30" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" opacity="0.85"/></svg>
    <div class="i-eq">
      <i class="bar" style="height:6px"></i><i class="bar" style="height:12px"></i><i class="bar" style="height:8px"></i><i class="bar" style="height:15px"></i><i class="bar" style="height:9px"></i>
    </div>
  </div>
  <span class="i-note n1">♪</span><span class="i-note n2">♫</span><span class="i-note n3">♪</span>
  <div class="glow-floor"></div>`,

                    "02": `
  <div class="i-cloud">
    <svg viewBox="0 0 80 50"><path d="M20 42h34a13 13 0 0 0 2-25.8A18 18 0 0 0 21 12 14 14 0 0 0 20 42z" fill="none" stroke="#60a5fa" stroke-width="2.5"/></svg>
    <svg class="i-upload-arrow" viewBox="0 0 10 14"><path d="M5 14V2M1 6l4-4 4 4" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
    <div class="i-shield"><svg viewBox="0 0 24 24" fill="none"><path d="M20 6L9 17l-5-5" stroke-linecap="round" stroke-linejoin="round" stroke-width="3"/></svg></div>
  </div>
  <div class="i-ring" style="width:90px;height:90px;">
    <div class="orbit-dot d1"></div><div class="orbit-dot d2"></div><div class="orbit-dot d3"></div>
  </div>
  <div class="glow-floor"></div>`,

                    "03": `
  <div class="i-panel">
    <div class="i-row"><div class="fill"></div></div>
    <div class="i-row"><div class="fill"></div></div>
    <div class="i-row"><div class="fill"></div></div>
    <div class="i-row"><div class="fill"></div></div>
    <div class="i-scanline"></div>
    <div class="i-check-badge">${checkSm}</div>
  </div>
  <div class="glow-floor"></div>`,

                    "04": `
  <div class="i-globe-wrap">
    <div class="i-globe">
      <div class="lat" style="top:18%; height:0; left:0; right:0;"></div>
      <div class="lat" style="top:38%; height:0; left:0; right:0;"></div>
      <div class="lat" style="top:58%; height:0; left:0; right:0;"></div>
      <div class="lat" style="top:78%; height:0; left:0; right:0;"></div>
    </div>
    <div class="pulse-ring"></div>
    <div class="i-ring orbit-container">
      <div class="i-orbit-item o1" style="background:#1DB954;color:#1DB954;">S</div>
      <div class="i-orbit-item o2" style="background:#FF0000;color:#FF0000;">Y</div>
      <div class="i-orbit-item o3" style="background:#000;color:#fff;">T</div>
    </div>
  </div>
  <div class="glow-floor"></div>`,

                    "05": `
  <div style="position:relative; width:100px; height:60px;">
    <div class="i-bank">
      <svg viewBox="0 0 60 42"><path d="M2 16 30 2 58 16 M6 16v22M18 16v22M30 16v22M42 16v22M54 16v22M0 40h60" stroke="#f5a524" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>
    </div>
    <div class="i-coins"><div class="coin"></div><div class="coin"></div><div class="coin"></div></div>
    <div class="i-beam"></div>
    <div class="i-count">$0</div>
  </div>
  <div class="glow-floor"></div>`,

                    "06": `
  <div style="position:relative; width:100px; height:64px; display:flex; align-items:center; justify-content:center;">
    <div class="i-graph"><i></i><i></i><i></i><i></i><i></i></div>
    <div class="i-glass"></div>
  </div>
  <div class="glow-floor"></div>`,

                    "07": `
  <div style="position:relative; width:100px; height:90px; display:flex; align-items:center; justify-content:center;">
    <div class="i-phone">
      <span class="lbl">PAYOUT</span>
      <div class="i-pay-btn">${checkSm}</div>
      <div class="i-ring-progress"></div>
    </div>
    <div class="i-coin-rise c1"></div><div class="i-coin-rise c2"></div><div class="i-coin-rise c3"></div>
  </div>
  <div class="glow-floor"></div>`,

                    "08": `
  <div class="i-dash">
    <div class="i-dash-amt">$<span class="dash-num">0</span></div>
    <div class="i-dash-sub">▲ +12.5%</div>
    <svg class="i-linegraph" viewBox="0 0 70 30" preserveAspectRatio="none">
      <path class="dash-line" d="M0 25 L10 18 L20 20 L30 10 L40 14 L50 5 L60 8 L70 2" fill="none" stroke="#ec4899" stroke-width="2" stroke-linecap="round"/>
    </svg>
    <svg class="i-donut" viewBox="0 0 36 36">
      <circle cx="18" cy="18" r="15.5" fill="none" stroke="rgba(255,255,255,.1)" stroke-width="4"/>
      <circle class="dash-donut" cx="18" cy="18" r="15.5" fill="none" stroke="#ec4899" stroke-width="4" stroke-linecap="round" stroke-dasharray="97" stroke-dashoffset="97" transform="rotate(-90 18 18)"/>
    </svg>
  </div>
  <div class="glow-floor"></div>`
                };

                /* ============ CARD DATA ============ */
                const steps = [
                    { n: "01", accent: "#a855f7", title: "Create & Release", sub: "By Artists & Labels", desc: "Artists & Labels create music and artwork, add metadata and choose stores & territories.", list: ["Upload Audio & Artwork", "Add Details & Metadata", "Select Stores & Territories", "Submit for Distribution"] },
                    { n: "02", accent: "#3b82f6", title: "Submitted for Distribution", sub: "Secure & Protected", desc: "Your release is securely received and our system confirms your submission.", list: ["Secure File Transfer", "Data Verification", "Submission Confirmed", "You're Always in Control"] },
                    { n: "03", accent: "#22d3ee", title: "Review & Deliver to Stores", sub: "Quality Checked", desc: "We review your release for quality & compliance and deliver to 100+ global stores.", list: ["Quality & Compliance Check", "Metadata Optimization", "Deliver to 100+ Stores", "Global Reach"] },
                    { n: "04", accent: "#22c55e", title: "Streaming Worldwide", sub: "Fans Listen & Enjoy", desc: "Your music goes live and fans stream your songs on their favorite platforms.", list: ["Available on Global Stores", "Fans Stream Your Music", "More Streams, More Reach", "Your Music Grows"] },
                    { n: "05", accent: "#f5a524", title: "Stores Report & Pay Us", sub: "Royalties Collected", desc: "Stores send usage reports and pay us based on the streams and sales.", list: ["Usage Reports from Stores", "Royalties Collected", "Multiple Currencies", "Secure Transactions"] },
                    { n: "06", accent: "#818cf8", title: "Report Verification & Reconciliation", sub: "100% Accuracy", desc: "We verify every report, match data and ensure complete accuracy.", list: ["Data Matching & Verification", "Resolve Discrepancies", "Accurate Calculations", "100% Transparent Process"] },
                    { n: "07", accent: "#fb7185", title: "Payout to Artists & Labels", sub: "You Earn, We Deliver", desc: "After verification, we pay your royalties on time via your preferred method.", list: ["On-Time Payouts", "Multiple Payment Options", "No Hidden Deductions", "You Focus on Music"] },
                    { n: "08", accent: "#ec4899", title: "Transparent Dashboard", sub: "Track Everything", desc: "Track your earnings, streams and payouts anytime with complete transparency.", list: ["Real-time Earnings", "Detailed Reports", "Download Statements", "Complete Transparency"] }
                ];

                function buildArrow() {
                    return `<div class="flow-link">
    <div class="flow-line">
      <div class="flow-streak"></div>
      <div class="flow-arrowhead">${arrowSvg}</div>
    </div>
  </div>`;
                }

                function buildCard(s) {
                    return `
  <div class="step-card" data-step="${s.n}" style="--accent:${s.accent}">
    <div class="card-top">
      <div class="num-badge">${s.n}</div>
      <div class="stage-pill">Stage ${s.n}</div>
    </div>
    <div class="illus-stage">${illustrations[s.n]}</div>
    <div class="card-title">${s.title}</div>
    <div class="card-sub">${s.sub}</div>
    <div class="card-desc">${s.desc}</div>
    <ul class="card-checklist">${s.list.map(li => `<li>${checkSm}<span>${li}</span></li>`).join('')}</ul>
  </div>`;
                }

                const track = document.getElementById('km8-sliderTrack');
                let html = '';
                for (let rep = 0; rep < 2; rep++) {
                    steps.forEach((s, i) => {
                        html += buildCard(s);
                        html += buildArrow();
                    });
                }
                track.innerHTML = html;

                /* ============ HELPERS ============ */
                function randBetween(a, b) { return a + Math.random() * (b - a); }

                function spawnParticles(container, count, color) {
                    for (let i = 0; i < count; i++) {
                        const p = document.createElement('div');
                        p.className = 'particle';
                        const size = randBetween(2, 4);
                        p.style.width = size + 'px'; p.style.height = size + 'px';
                        p.style.left = randBetween(5, 90) + '%';
                        p.style.top = randBetween(10, 80) + '%';
                        p.style.background = color;
                        container.appendChild(p);
                        gsap.to(p, {
                            y: -randBetween(10, 24),
                            opacity: 0,
                            duration: randBetween(1.6, 3.2),
                            repeat: -1,
                            delay: randBetween(0, 2),
                            ease: "power1.out",
                            yoyo: false,
                            onRepeat: () => { gsap.set(p, { y: 0, opacity: .7 }); }
                        });
                    }
                }

                /* ============ INIT ANIMATIONS PER CARD INSTANCE ============ */
                function initCard(card) {
                    const step = card.dataset.step;
                    const accent = getComputedStyle(card).getPropertyValue('--accent').trim();

                    /* subtle floating for whole illustration */
                    const illus = card.querySelector('.illus-stage');
                    gsap.to(illus, { y: -4, duration: 2.6, ease: "sine.inOut", repeat: -1, yoyo: true });

                    /* breathing glow floor */
                    const floor = card.querySelector('.glow-floor');
                    if (floor) gsap.to(floor, { opacity: .55, scale: 1.08, duration: 2, repeat: -1, yoyo: true, ease: "sine.inOut" });

                    if (step === "01") {
                        gsap.to(card.querySelectorAll('.i-eq i'), {
                            scaleY: () => randBetween(0.4, 1.8), transformOrigin: 'bottom', duration: 0.5, repeat: -1, yoyo: true, stagger: { each: 0.08, repeat: -1 }, ease: "sine.inOut"
                        });
                        const notes = card.querySelectorAll('.i-note');
                        notes.forEach((n, i) => {
                            gsap.set(n, { left: 20 + i * 18 + 'px', top: '50%' });
                            gsap.to(n, {
                                y: -30, opacity: 0, duration: 2.4, repeat: -1, delay: i * 0.7, ease: "power1.out",
                                onRepeat: () => gsap.set(n, { y: 0, opacity: 1 })
                            });
                        });
                        gsap.to(card.querySelector('.i-avatar'), { boxShadow: `0 0 34px 2px ${accent}`, duration: 1.6, repeat: -1, yoyo: true });
                    }

                    if (step === "02") {
                        gsap.to(card.querySelector('.i-upload-arrow'), {
                            y: -8, opacity: 0, duration: 1, repeat: -1, ease: "power1.in",
                            onRepeat: () => gsap.set(card.querySelector('.i-upload-arrow'), { y: 0, opacity: 1 })
                        });
                        gsap.to(card.querySelector('.i-shield'), { scale: 1.15, duration: 0.9, repeat: -1, yoyo: true, ease: "sine.inOut" });
                        const dots = card.querySelectorAll('.orbit-dot');
                        const radius = 45;
                        dots.forEach((d, i) => {
                            const angleOffset = i * 120;
                            const spin = { t: 0 };
                            gsap.to(spin, {
                                t: 360, duration: 6, repeat: -1, ease: "none",
                                onUpdate: () => {
                                    const a = (spin.t + angleOffset) * Math.PI / 180;
                                    d.style.transform = `translate(${Math.cos(a) * radius}px, ${Math.sin(a) * radius * 0.5}px)`;
                                }
                            });
                        });
                    }

                    if (step === "03") {
                        gsap.to(card.querySelector('.i-scanline'), { y: 90, duration: 2.2, repeat: -1, ease: "sine.inOut" });
                        const fills = card.querySelectorAll('.i-row .fill');
                        gsap.timeline({ repeat: -1, repeatDelay: 0.6 })
                            .to(fills, { scaleX: 1, duration: 0.4, stagger: 0.35, ease: "power2.out" })
                            .to(fills, { scaleX: 1, duration: 0.5 }) // hold
                            .to(fills, { scaleX: 0, duration: 0.01 }); // reset
                        gsap.to(card.querySelector('.i-check-badge'), { boxShadow: `0 0 18px 2px ${accent}`, duration: 1, repeat: -1, yoyo: true });
                    }

                    if (step === "04") {
                        const globe = card.querySelector('.i-globe');
                        gsap.to(globe, { rotate: 360, duration: 14, repeat: -1, ease: "none" });
                        gsap.to(card.querySelector('.pulse-ring'), {
                            scale: 1.6, opacity: 0, duration: 2, repeat: -1, ease: "power1.out",
                            onStart: () => gsap.set(card.querySelector('.pulse-ring'), { scale: 1, opacity: .6 })
                        });
                        const items = card.querySelectorAll('.i-orbit-item');
                        const angles = [0, 120, 240];
                        items.forEach((it, i) => {
                            const spin = { t: angles[i] };
                            gsap.to(spin, {
                                t: angles[i] + 360, duration: 8, repeat: -1, ease: "none",
                                onUpdate: () => {
                                    const a = spin.t * Math.PI / 180;
                                    it.style.transform = `translate(${Math.cos(a) * 44}px, ${Math.sin(a) * 44}px)`;
                                }
                            });
                        });
                    }

                    if (step === "05") {
                        gsap.to(card.querySelectorAll('.coin'), { y: -3, duration: 0.7, stagger: 0.15, repeat: -1, yoyo: true, ease: "sine.inOut" });
                        gsap.to(card.querySelector('.i-beam'), { opacity: 0.2, scaleX: 1.3, transformOrigin: 'left', duration: 0.8, repeat: -1, yoyo: true });
                        const counter = card.querySelector('.i-count');
                        let val = { n: 0 };
                        gsap.to(val, {
                            n: 24560, duration: 3, repeat: -1, ease: "power1.inOut",
                            onUpdate: () => { counter.textContent = '$' + Math.floor(val.n).toLocaleString(); },
                            onRepeat: () => { val.n = 0; }
                        });
                    }

                    if (step === "06") {
                        gsap.to(card.querySelectorAll('.i-graph i'), {
                            scaleY: () => randBetween(0.35, 1), duration: 1, stagger: 0.1, repeat: -1, yoyo: true, ease: "sine.inOut"
                        });
                        gsap.to(card.querySelector('.i-glass'), { x: 20, duration: 1.6, repeat: -1, yoyo: true, ease: "sine.inOut" });
                    }

                    if (step === "07") {
                        gsap.to(card.querySelector('.i-pay-btn'), { scale: 1.15, boxShadow: '0 0 18px 2px #4ade80', duration: 0.9, repeat: -1, yoyo: true });
                        gsap.to(card.querySelector('.i-ring-progress'), { rotate: 360, duration: 2, repeat: -1, ease: "none" });
                        const coins = card.querySelectorAll('.i-coin-rise');
                        coins.forEach((c, i) => {
                            gsap.set(c, { x: -20 + i * 20, y: 30, opacity: 0 });
                            gsap.to(c, {
                                y: -30, opacity: 1, duration: 1.8, delay: i * 0.5, repeat: -1, ease: "power1.out",
                                onRepeat: () => gsap.set(c, { y: 30, opacity: 0 })
                            });
                        });
                    }

                    if (step === "08") {
                        const numEl = card.querySelector('.dash-num');
                        let val = { n: 0 };
                        gsap.to(val, {
                            n: 24560, duration: 2.6, repeat: -1, ease: "power1.inOut",
                            onUpdate: () => { numEl.textContent = Math.floor(val.n).toLocaleString(); },
                            onRepeat: () => { val.n = 0; }
                        });
                        const line = card.querySelector('.dash-line');
                        const len = line.getTotalLength();
                        gsap.set(line, { strokeDasharray: len, strokeDashoffset: len });
                        gsap.to(line, { strokeDashoffset: 0, duration: 2, repeat: -1, ease: "power2.inOut", repeatDelay: 0.4 });
                        const donut = card.querySelector('.dash-donut');
                        gsap.to(donut, { strokeDashoffset: 20, duration: 2, repeat: -1, yoyo: true, ease: "sine.inOut" });
                    }

                    /* particles for every card, subtle accent-colored dust */
                    spawnParticles(illus, 5, accent);

                    /* 3D tilt on hover using pointer */
                    card.addEventListener('mousemove', (e) => {
                        const r = card.getBoundingClientRect();
                        const px = (e.clientX - r.left) / r.width - 0.5;
                        const py = (e.clientY - r.top) / r.height - 0.5;
                        gsap.to(card, { rotateY: px * 10, rotateX: -py * 10, duration: 0.4, ease: "power2.out" });
                    });
                    card.addEventListener('mouseleave', () => {
                        gsap.to(card, { rotateY: 0, rotateX: 0, duration: 0.6, ease: "power3.out" });
                    });
                }

                /* ============ ARROW STREAK ANIMATION ============ */
                function initArrow(link) {
                    const streak = link.querySelector('.flow-streak');
                    const w = link.querySelector('.flow-line').offsetWidth;
                    gsap.fromTo(streak, { x: -20 }, { x: w + 10, duration: 1.4, repeat: -1, ease: "power1.inOut", delay: randBetween(0, 1.2) });
                }

                /* ============ RUN INIT ON ALL NODES ============ */
                ((__kmF) => {
  if (document.readyState !== 'complete') { window.addEventListener('load', __kmF); } else { __kmF(); }
})(() => {
                    document.querySelectorAll('.km8-section .step-card').forEach(initCard);
                    document.querySelectorAll('.km8-section .flow-link').forEach(initArrow);

                    /* entrance reveal */
                    gsap.from(".km8-section .step-card", { opacity: 0, y: 34, duration: 0.9, stagger: 0.06, ease: "power3.out" });
                    gsap.from(".km8-section .header-wrap > *", { opacity: 0, y: 20, duration: 0.8, stagger: 0.12, ease: "power3.out" });
                    gsap.from(".km8-section .feature-item", { opacity: 0, y: 15, duration: 0.6, stagger: 0.08, delay: 0.4, ease: "power2.out" });

                    /* infinite slider scroll */
                    const track = document.getElementById('km8-sliderTrack');
                    const totalWidth = track.scrollWidth / 2;
                    const tween = gsap.to(track, { x: -totalWidth, duration: 34, ease: "none", repeat: -1 });

                    const outer = document.querySelector('.km8-section .slider-outer');
                    outer.addEventListener('mouseenter', () => gsap.to(tween, { timeScale: 0.12, duration: 0.6 }));
                    outer.addEventListener('mouseleave', () => gsap.to(tween, { timeScale: 1, duration: 0.6 }));
                });

            } catch (err) {
                console.error('[km8] section script error:', err);
            }
        })();
        /* ==================== index9.html (km9) scripts ==================== */
}
