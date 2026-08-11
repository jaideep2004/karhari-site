/* Extracted verbatim from combined.html by tools/phase2-extract.js - do not hand-edit. */
export function runKm5(gsap, ScrollTrigger, MotionPathPlugin) {
(function () {
            try {

                /* ============================================================ ICONS ============================================================ */
                const ICON = {
                    home: `<path d="M3 11l9-8 9 8"/><path d="M5 10v10h5v-6h4v6h5V10"/>`,
                    catalogue: `<rect x="4" y="4" width="6" height="6" rx="1"/><rect x="14" y="4" width="6" height="6" rx="1"/><rect x="4" y="14" width="6" height="6" rx="1"/><rect x="14" y="14" width="6" height="6" rx="1"/>`,
                    users: `<circle cx="9" cy="8" r="3"/><path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6"/><circle cx="17" cy="9" r="2.3"/><path d="M15.5 20c.3-2.3 1.9-4.1 4-4.6"/>`,
                    truck: `<path d="M3 6h10v9H3z"/><path d="M13 10h4l4 3v2h-8z"/><circle cx="7" cy="18" r="1.6"/><circle cx="18" cy="18" r="1.6"/>`,
                    chart: `<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>`,
                    dollar: `<path d="M12 2v20M17 6.5c0-1.9-2.2-3.5-5-3.5s-5 1.6-5 3.5 2.2 3 5 3.5 5 1.7 5 3.5-2.2 3.5-5 3.5-5-1.6-5-3.5"/>`,
                    file: `<path d="M6 2h9l5 5v15H6z"/><path d="M14 2v6h6"/>`,
                    shield: `<path d="M12 2l8 4v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6z"/><path d="M9 12l2 2 4-4"/>`,
                    settings: `<circle cx="12" cy="12" r="3"/><path d="M4 12h2m12 0h2M12 4v2m0 12v2M6.3 6.3l1.4 1.4m8.6 8.6l1.4 1.4M17.7 6.3l-1.4 1.4M7.7 16.3l-1.4 1.4"/>`,
                    cloud: `<path d="M7 18a4 4 0 01-.6-7.95A5 5 0 0116.9 8.1 4.4 4.4 0 0117.4 18H7z"/><path d="M12 12v7M9.5 15.5L12 13l2.5 2.5"/>`,
                    music: `<circle cx="6.5" cy="18" r="2.4"/><circle cx="17.5" cy="16" r="2.4"/><path d="M9 18V6l10-2v12"/>`,
                    globe: `<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.4 2.5 3.8 5.7 3.8 9s-1.4 6.5-3.8 9c-2.4-2.5-3.8-5.7-3.8-9s1.4-6.5 3.8-9z"/>`,
                    play: `<path d="M8 5.5l11 6.5-11 6.5z"/>`,
                    disc: `<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="2.4"/>`,
                    link: `<path d="M9 15l6-6M8 12l-2.3 2.3a3.3 3.3 0 004.7 4.7L13 17M16 12l2.3-2.3a3.3 3.3 0 00-4.7-4.7L11 7"/>`,
                    lock: `<rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V7a4 4 0 018 0v4"/>`,
                    alert: `<path d="M12 3l9.5 16.5H2.5z"/><path d="M12 9.5v4.2M12 17h.01"/>`,
                    copyright: `<circle cx="12" cy="12" r="9"/><path d="M14.5 9.3a3 3 0 100 5.4"/>`,
                    eye: `<path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6-10-6-10-6z"/><circle cx="12" cy="12" r="2.5"/>`,
                };
                const svg = (name, extra = "") => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" ${extra}>${ICON[name]}</svg>`;

                /* ============================================================ DATA ============================================================ */
                const navItems = [["home", "Dashboard", true], ["catalogue", "Catalogue"], ["users", "Artists"], ["disc", "Releases"], ["truck", "Distribution"], ["chart", "Analytics"], ["dollar", "Royalties"], ["file", "Reports"], ["shield", "Rights Management"], ["settings", "Settings"]];

                const workflowSteps = [
                    { n: "1", title: "CREATE", desc: "Artists & Labels upload music and metadata", icon: "cloud", c1: "#a78bfa", c2: "#c4b5fd" },
                    { n: "2", title: "MANAGE", desc: "We organize, verify and optimize your catalogue", icon: "music", c1: "#8b5cf6", c2: "#a78bfa" },
                    { n: "3", title: "DISTRIBUTE", desc: "Deliver to 150+ platforms worldwide", icon: "globe", c1: "#3b82f6", c2: "#60a5fa" },
                    { n: "4", title: "MONITOR", desc: "Real-time tracking & performance analytics", icon: "chart", c1: "#2563eb", c2: "#3b82f6" },
                    { n: "5", title: "EARN", desc: "Royalty collection & transparent payouts", icon: "dollar", c1: "#d946ef", c2: "#ec4899" },
                ];

                const glanceStats = [
                    { icon: "music", num: "150K+", label: "Songs", c1: "#a78bfa" },
                    { icon: "users", num: "25K+", label: "Artists", c1: "#22d3ee" },
                    { icon: "disc", num: "2K+", label: "Record Labels", c1: "#ec4899" },
                    { icon: "globe", num: "150+", label: "Platforms", c1: "#3b82f6" },
                ];

                const donutData = [
                    { label: "Hindi", pct: 45, color: "#8b5cf6" }, { label: "Punjabi", pct: 15, color: "#22d3ee" },
                    { label: "Bhojpuri", pct: 10, color: "#f59e0b" }, { label: "English", pct: 10, color: "#3b82f6" },
                    { label: "Regional", pct: 20, color: "#ec4899" },
                ];

                const platforms = [
                    { name: "Spotify", bg: "#1DB954", icon: "music" }, { name: "Apple Music", bg: "linear-gradient(135deg,#fa233b,#fb5c74)", icon: "music" },
                    { name: "YouTube", bg: "#FF0000", icon: "play" }, { name: "YouTube Music", bg: "#FF0000", icon: "play" },
                    { name: "Amazon Music", bg: "#00A8E1", icon: "music" }, { name: "JioSaavn", bg: "linear-gradient(135deg,#8b5cf6,#5b21b6)", icon: "music" },
                    { name: "Gaana", bg: "#E8393A", icon: "music" }, { name: "Hungama", bg: "#2E5EE0", icon: "music" },
                    { name: "Deezer", bg: "linear-gradient(135deg,#f59e0b,#a855f7)", icon: "music" }, { name: "TIDAL", bg: "#111111", icon: "disc" },
                    { name: "TikTok", bg: "#111111", icon: "music" }, { name: "Facebook", bg: "#1877F2", icon: "link" },
                ];

                const releases = [
                    { t: "Dil Ki Baatein", a: "Armaan Malik", l: "Karhari Records", st: "live", streams: "2.5M", cov: "linear-gradient(135deg,#f59e0b,#ec4899)" },
                    { t: "Pyar Deewana", a: "Neha Kakkar", l: "KM Music", st: "live", streams: "1.8M", cov: "linear-gradient(135deg,#3b82f6,#8b5cf6)" },
                    { t: "Zindagi Safar", a: "Jubin Nautiyal", l: "Karhari Records", st: "live", streams: "3.2M", cov: "linear-gradient(135deg,#22d3ee,#3b82f6)" },
                    { t: "Chandni Raat", a: "Shreya Ghoshal", l: "KM Music", st: "proc", streams: "—", cov: "linear-gradient(135deg,#ec4899,#f59e0b)" },
                    { t: "Desi Vibes", a: "Various Artists", l: "Karhari Beats", st: "live", streams: "890K", cov: "linear-gradient(135deg,#8b5cf6,#22d3ee)" },
                ];

                const rightsItems = [
                    { icon: "shield", text: "Content ID Protection" }, { icon: "copyright", text: "Copyright Monitoring" },
                    { icon: "alert", text: "Takedown Management" }, { icon: "eye", text: "Usage Reports" },
                ];

                const features = [
                    { icon: "file", title: "ADVANCED METADATA MANAGEMENT", desc: "Auto-tagging, ISRC, UPC, genre, mood, and more.", c: "#a78bfa" },
                    { icon: "link", title: "SMART DISTRIBUTION", desc: "AI-powered delivery with 99% success rate worldwide.", c: "#22d3ee" },
                    { icon: "chart", title: "REAL-TIME ANALYTICS", desc: "Track performance in real-time with advanced analytics dashboards.", c: "#3b82f6" },
                    { icon: "dollar", title: "AUTOMATED ROYALTIES", desc: "Transparent royalty collection and automated payouts every month.", c: "#ec4899" },
                    { icon: "lock", title: "SECURE & RELIABLE", desc: "Enterprise-grade security for your valuable music assets.", c: "#22c55e" },
                ];

                /* ============================================================ RENDER ============================================================ */
                document.getElementById('km5-navList').innerHTML = navItems.map(([ic, label, active]) => `<a class="${active ? 'active' : ''}">${svg(ic)}<span>${label}</span></a>`).join("");

                document.getElementById('km5-workflowRow').innerHTML = workflowSteps.map((s, i) => `
  <div class="wf-step">
    <div class="ring" style="--c1:${s.c1};--c2:${s.c2}">${svg(s.icon)}</div>
    <h4>${s.n}. ${s.title}</h4><p>${s.desc}</p>
  </div>
  ${i < workflowSteps.length - 1 ? '<div class="wf-arrow"><span class="flow-dot"></span></div>' : ''}
`).join("");

                document.getElementById('km5-glanceGrid').innerHTML = glanceStats.map(s => `
  <div class="stat-box">
    <div class="stat-icon" style="--c1:${s.c1}">${svg(s.icon)}</div>
    <div class="num" data-count="${s.num}">0</div>
    <div class="lbl">${s.label}</div>
  </div>`).join("");

                document.getElementById('km5-legendList').innerHTML = donutData.map(d => `<div class="row"><span class="dot" style="background:${d.color}"></span>${d.label}<b>${d.pct}%</b></div>`).join("");

                document.getElementById('km5-platGrid').innerHTML = platforms.map(p => `<div class="plat"><div class="ic" style="background:${p.bg}">${svg(p.icon)}</div><span class="tip">${p.name}</span></div>`).join("");

                document.getElementById('km5-releasesBody').innerHTML = releases.map(r => `
  <div class="rel-row">
    <div class="trk"><div class="cover" style="background:${r.cov}"></div><div class="info"><b>${r.t}</b></div><div class="play">${svg("play")}</div></div>
    <div class="cell">${r.a}</div>
    <div class="cell">${r.l}</div>
    <div class="plat-icons">
      <div class="mini" style="background:#1DB954">${svg("music")}</div>
      <div class="mini" style="background:linear-gradient(135deg,#fa233b,#fb5c74)">${svg("music")}</div>
      <div class="mini" style="background:#FF0000">${svg("play")}</div>
      <span class="plus">+147</span>
    </div>
    <div class="status ${r.st === 'live' ? 'live' : 'proc'}">${r.st === 'live' ? '<span class="dot-live"></span>Live' : 'Processing'}</div>
    <div class="streams">${r.streams}</div>
  </div>`).join("");

                document.getElementById('km5-rightsList').innerHTML = rightsItems.map(r => `<div class="right-item"><div class="left">${svg(r.icon)}${r.text}</div><span class="pill active">Active</span></div>`).join("");

                document.getElementById('km5-featuresBar').innerHTML = features.map(f => `<div class="feat"><div class="feat-icon" style="--c1:${f.c}">${svg(f.icon)}</div><h5>${f.title}</h5><p>${f.desc}</p></div>`).join("") +
                    `<div class="partner"><h5>PARTNER WITH US</h5><p>Empowering music creators worldwide to grow, earn and succeed together.</p><button class="btn-gradient">Join Karhari Media Today</button></div>`;

                document.querySelectorAll(".km5-section .card, .features").forEach(c => c.insertAdjacentHTML("beforeend", '<div class="shine"></div>'));

                /* ============================================================ DONUT ============================================================ */
                (function buildDonut() {
                    const svgEl = document.getElementById('km5-donutSvg');
                    const r = 50, cx = 60, cy = 60, circ = 2 * Math.PI * r; let offsetAcc = 0;
                    donutData.forEach((d, i) => {
                        const dash = (d.pct / 100) * circ;
                        const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
                        circle.setAttribute("cx", cx); circle.setAttribute("cy", cy); circle.setAttribute("r", r);
                        circle.setAttribute("fill", "none"); circle.setAttribute("stroke", d.color); circle.setAttribute("stroke-width", "14");
                        circle.setAttribute("stroke-dasharray", `${dash} ${circ - dash}`);
                        circle.setAttribute("stroke-dashoffset", -offsetAcc);
                        circle.setAttribute("transform", `rotate(-90 ${cx} ${cy})`);
                        circle.style.strokeDasharray = `0 ${circ}`;
                        circle.dataset.final = `${dash} ${circ - dash}`;
                        circle.dataset.index = i;
                        svgEl.appendChild(circle);
                        offsetAcc += dash;
                    });
                })();

                /* ============================================================ CHARTS ============================================================ */
                function buildAreaChart(id, points, color) {
                    const el = document.getElementById(id); const w = 220, h = 70; const gradId = id + "grad";
                    let path = `M0,${h}`; points.forEach((p, i) => { path += ` L${(i / (points.length - 1)) * w},${h - p * h}`; }); path += ` L${w},${h} Z`;
                    let linePath = "M" + points.map((p, i) => `${(i / (points.length - 1)) * w},${h - p * h}`).join(" L");
                    const lastX = w, lastY = h - points[points.length - 1] * h;
                    el.innerHTML = `<defs><linearGradient id="${gradId}" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="${color}" stop-opacity="0.45"/><stop offset="100%" stop-color="${color}" stop-opacity="0"/></linearGradient></defs>
    <path d="${path}" fill="url(#${gradId})" stroke="none" opacity="0" class="area"/>
    <path d="${linePath}" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" class="line"/>
    <circle cx="${lastX}" cy="${lastY}" r="3" fill="${color}" class="end-dot" opacity="0"/>`;
                }
                buildAreaChart("km5-chart1", [0.3, 0.5, 0.35, 0.6, 0.5, 0.75, 0.6, 0.85], "#8b5cf6");
                buildAreaChart("km5-chart2", [0.4, 0.55, 0.3, 0.65, 0.45, 0.7, 0.55, 0.8, 0.6, 0.9], "#3b82f6");

                /* ============================================================ MAP ============================================================ */
                (function buildMap() {
                    const el = document.getElementById('km5-mapSvg'); let dots = "";
                    for (let i = 0; i < 70; i++) {
                        const x = Math.random() * 200, y = Math.random() * 140;
                        if (Math.random() > 0.55) { dots += `<circle class="twinkle-dot" cx="${x}" cy="${y}" r="1" fill="rgba(139,92,246,.5)"/>`; }
                    }
                    const arcs = `<path class="arc" d="M20,90 Q80,20 150,50" stroke="url(#mapGrad)" stroke-width="1" fill="none"/>
    <path class="arc" d="M40,110 Q100,90 170,40" stroke="url(#mapGrad)" stroke-width="1" fill="none"/>
    <circle cx="20" cy="90" r="2.5" fill="#a78bfa"/><circle cx="150" cy="50" r="2.5" fill="#22d3ee"/>
    <circle cx="170" cy="40" r="2.5" fill="#ec4899"/><circle cx="40" cy="110" r="2.5" fill="#8b5cf6"/>`;
                    el.innerHTML = `<defs><linearGradient id="mapGrad" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stop-color="#8b5cf6"/><stop offset="100%" stop-color="#22d3ee"/></linearGradient></defs>${dots}${arcs}`;
                })();

                /* ============================================================ INTRO TIMELINE ============================================================ */
                ((__kmF) => {
  if (document.readyState !== 'complete') { window.addEventListener('load', __kmF); } else { __kmF(); }
})(() => {
                    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
                    tl.from(".km5-section .sidebar", { x: -40, opacity: 0, duration: .7 })
                        .to(["#km5-workflowCard", "#km5-overviewCard", "#km5-releasesCard"], { opacity: 1, duration: .6, stagger: .15 }, "-=.4")
                        .fromTo(["#km5-workflowCard", "#km5-overviewCard", "#km5-releasesCard"], { y: 30 }, { y: 0, duration: .6, stagger: .15 }, "<")
                        .to(["#km5-glanceCard", "#km5-distCard", "#km5-rightsCard"], { opacity: 1, duration: .6, stagger: .15 }, "-=1")
                        .fromTo(["#km5-glanceCard", "#km5-distCard", "#km5-rightsCard"], { y: 30 }, { y: 0, duration: .6, stagger: .15 }, "<")
                        .to(".km5-section .features", { opacity: 1, y: 0, duration: .6 }, "-=.2")
                        .fromTo(".km5-section .features", { y: 20 }, { y: 0, duration: .6 }, "<")
                        .to(".km5-section .tagline-bar", { opacity: 1, duration: .6 }, "-=.3");

                    gsap.set(".km5-section .rel-row", { y: 15 });
                    gsap.from(".km5-section .wf-step", { opacity: 0, y: 15, duration: .6, stagger: .12, delay: .9, ease: "power2.out" });
                    gsap.from(".km5-section .stat-box", { opacity: 0, scale: .9, duration: .5, stagger: .1, delay: 1.1 });
                    gsap.from(".km5-section .plat", { opacity: 0, scale: .7, duration: .4, stagger: .04, delay: 1.2, ease: "back.out(2)" });
                    gsap.to(".km5-section .rel-row", { opacity: 1, y: 0, duration: .5, stagger: .08, delay: 1.1, ease: "power2.out" });
                    gsap.from(".km5-section .right-item", { opacity: 0, x: 15, duration: .5, stagger: .1, delay: 1.2 });
                    gsap.from(".km5-section .feat, .partner", { opacity: 0, y: 10, duration: .5, stagger: .1, delay: 1.6 });

                    document.querySelectorAll("[data-count]").forEach(el => {
                        const raw = el.dataset.count; const num = parseFloat(raw); const suffix = raw.replace(/[0-9.]/g, "");
                        const proxy = { v: 0 };
                        gsap.to(proxy, {
                            v: num, duration: 1.6, delay: 1, ease: "power2.out",
                            onUpdate: () => { el.textContent = (num < 10 ? proxy.v.toFixed(1) : Math.round(proxy.v)) + suffix; }
                        });
                    });

                    document.querySelectorAll("#km5-donutSvg circle").forEach((c, i) => {
                        gsap.to(c, { strokeDasharray: c.dataset.final, duration: 1, delay: 1 + i * 0.15, ease: "power2.out" });
                    });

                    ["#km5-chart1", "#km5-chart2"].forEach(id => {
                        const line = document.querySelector(id + " .line"), area = document.querySelector(id + " .area"), dot = document.querySelector(id + " .end-dot");
                        const len = line.getTotalLength(); line.style.strokeDasharray = len; line.style.strokeDashoffset = len;
                        gsap.to(line, { strokeDashoffset: 0, duration: 1.4, delay: 1.3, ease: "power2.out" });
                        gsap.to(area, { opacity: 1, duration: 1, delay: 1.6 });
                        gsap.to(dot, { opacity: 1, duration: .4, delay: 2.7 });
                    });

                    document.querySelectorAll("#km5-mapSvg .arc").forEach((p, i) => {
                        const len = p.getTotalLength(); p.style.strokeDasharray = len; p.style.strokeDashoffset = len;
                        gsap.to(p, {
                            strokeDashoffset: 0, duration: 1.6, delay: 1.6 + i * .2, ease: "power2.out", onComplete: () => {
                                p.style.strokeDasharray = "3 5";
                                gsap.to(p, { strokeDashoffset: -40, duration: 2, repeat: -1, ease: "none" });
                            }
                        });
                    });

                    startContinuousAnimations();
                });

                /* ================================================================================
                   CONTINUOUS IDLE ANIMATIONS — always running, never stop
                ================================================================================ */
                function startContinuousAnimations() {

                    /* --- Sidebar nav icons: gentle infinite side sway, staggered --- */
                    gsap.utils.toArray(".km5-section .nav a svg").forEach((icon, i) => {
                        gsap.to(icon, {
                            x: 3, duration: 1.2 + Math.random() * .4, repeat: -1, yoyo: true, ease: "sine.inOut",
                            delay: i * 0.15
                        });
                    });

                    /* --- Active nav dot pulse (continuous, GSAP driven) --- */
                    const activeDotHost = document.querySelector(".km5-section .nav a.active");
                    if (activeDotHost) {
                        gsap.to(activeDotHost, {
                            boxShadow: "0 0 28px -4px rgba(139,92,246,.8)", duration: 1.6, repeat: -1, yoyo: true, ease: "sine.inOut"
                        });
                    }

                    /* --- Workflow icons: continuous breathing scale + rotate wobble, staggered --- */
                    gsap.utils.toArray(".km5-section .ring svg").forEach((icon, i) => {
                        gsap.to(icon, {
                            scale: 1.12, duration: 1.4, repeat: -1, yoyo: true, ease: "sine.inOut", delay: i * 0.25
                        });
                        gsap.to(icon, {
                            rotate: 8, duration: 2.2, repeat: -1, yoyo: true, ease: "sine.inOut", delay: i * 0.3 + 0.2
                        });
                    });

                    /* --- Workflow connector flow dots: continuous infinite travel loop --- */
                    document.querySelectorAll(".km5-section .wf-arrow").forEach((arrow, i) => {
                        const dot = arrow.querySelector(".flow-dot");
                        gsap.set(dot, { x: 0, opacity: 0 });
                        gsap.timeline({ repeat: -1, delay: i * 0.35 })
                            .to(dot, { opacity: 1, duration: .15 })
                            .to(dot, { x: 24, duration: 1, ease: "power1.inOut" })
                            .to(dot, { opacity: 0, duration: .15 }, "-=.1")
                            .set(dot, { x: 0 });
                    });

                    /* --- Stat box icons: continuous float + slight rotate, staggered --- */
                    gsap.utils.toArray(".km5-section .stat-icon").forEach((icon, i) => {
                        gsap.to(icon, {
                            y: -4, duration: 1.3 + Math.random() * .5, repeat: -1, yoyo: true, ease: "sine.inOut", delay: i * .2
                        });
                        gsap.to(icon, {
                            rotate: -6, duration: 2.4, repeat: -1, yoyo: true, ease: "sine.inOut", delay: i * .2 + .3
                        });
                    });
                    gsap.utils.toArray(".km5-section .stat-box").forEach((box, i) => {
                        gsap.to(box, {
                            y: -3, duration: 1.8 + Math.random() * .4, repeat: -1, yoyo: true, ease: "sine.inOut", delay: i * .25
                        });
                    });

                    /* --- Donut legend: auto-cycling highlight loop through segments --- */
                    const legendRows = document.querySelectorAll(".km5-section .legend .row");
                    const donutCircles = document.querySelectorAll("#km5-donutSvg circle");
                    let legendIndex = 0;
                    function cycleLegend() {
                        legendRows.forEach((row, i) => {
                            const active = i === legendIndex;
                            gsap.to(row, { x: active ? 4 : 0, duration: .4, ease: "power2.out" });
                            gsap.to(donutCircles[i], {
                                strokeWidth: active ? 18 : 12, opacity: active ? 1 : 0.4, duration: .4, ease: "power2.out"
                            });
                        });
                        legendIndex = (legendIndex + 1) % legendRows.length;
                    }
                    cycleLegend();
                    setInterval(cycleLegend, 1400);

                    /* --- Chart end-dot: continuous pulsing beacon --- */
                    document.querySelectorAll(".km5-section .end-dot").forEach((dot, i) => {
                        gsap.to(dot, {
                            scale: 1.8, transformOrigin: "center", opacity: .3, duration: 1, repeat: -1, yoyo: true, ease: "sine.inOut", delay: i * .3
                        });
                    });

                    /* --- Distribution icons: continuous breathing glow + gentle bob, staggered --- */
                    gsap.utils.toArray(".km5-section .plat .ic").forEach((ic, i) => {
                        gsap.to(ic, {
                            y: -3, duration: 1.6 + Math.random() * .5, repeat: -1, yoyo: true, ease: "sine.inOut", delay: i * .12
                        });
                        gsap.to(ic, {
                            boxShadow: "0 6px 18px -6px rgba(139,92,246,.55)", duration: 1.6 + Math.random() * .5,
                            repeat: -1, yoyo: true, ease: "sine.inOut", delay: i * .12 + .3
                        });
                    });

                    /* --- Distribution tooltip on hover (kept, functional need) --- */
                    document.querySelectorAll(".km5-section .plat").forEach(p => {
                        const tip = p.querySelector(".tip"), ic = p.querySelector(".ic");
                        p.addEventListener("mouseenter", () => {
                            gsap.to(tip, { opacity: 1, y: -4, duration: .25 });
                            gsap.to(ic, { scale: 1.2, duration: .25, ease: "back.out(2.5)" });
                        });
                        p.addEventListener("mouseleave", () => {
                            gsap.to(tip, { opacity: 0, y: 4, duration: .2 });
                            gsap.to(ic, { scale: 1, duration: .25 });
                        });
                    });

                    /* --- Release rows: continuous play-button pulse + live dot glow --- */
                    document.querySelectorAll(".km5-section .rel-row").forEach((row, i) => {
                        const play = row.querySelector(".play");
                        gsap.to(play, {
                            scale: 1.12, duration: 1.3 + Math.random() * .4, repeat: -1, yoyo: true, ease: "sine.inOut", delay: i * .18
                        });
                        const liveDot = row.querySelector(".dot-live");
                        if (liveDot) {
                            gsap.to(liveDot, {
                                boxShadow: "0 0 10px 2px rgba(34,197,94,.9)", scale: 1.3, duration: 1, repeat: -1, yoyo: true, ease: "sine.inOut", delay: i * .15
                            });
                        }
                        row.addEventListener("mouseenter", () => gsap.to(row, { backgroundColor: "rgba(255,255,255,.025)", duration: .25 }));
                        row.addEventListener("mouseleave", () => gsap.to(row, { backgroundColor: "transparent", duration: .25 }));
                    });

                    /* --- Rights items: continuous icon float loop + pill glow pulse --- */
                    document.querySelectorAll(".km5-section .right-item").forEach((item, i) => {
                        const icon = item.querySelector("svg");
                        const pill = item.querySelector(".pill");
                        gsap.to(icon, {
                            x: 3, duration: 1.3 + Math.random() * .4, repeat: -1, yoyo: true, ease: "sine.inOut", delay: i * .2
                        });
                        gsap.to(pill, {
                            boxShadow: "0 0 12px -1px rgba(34,197,94,.8)", duration: 1.4, repeat: -1, yoyo: true, ease: "sine.inOut", delay: i * .25
                        });
                    });

                    /* --- Map twinkling dots: continuous randomized opacity flicker --- */
                    document.querySelectorAll(".km5-section .twinkle-dot").forEach(dot => {
                        gsap.to(dot, {
                            opacity: 0.15 + Math.random() * .6, duration: 1 + Math.random() * 2, repeat: -1, yoyo: true, ease: "sine.inOut", delay: Math.random() * 2
                        });
                    });

                    /* --- Footer feature icons: continuous float bounce loop, staggered --- */
                    gsap.utils.toArray(".km5-section .feat-icon").forEach((icon, i) => {
                        gsap.to(icon, {
                            y: -5, duration: 1.5 + Math.random() * .5, repeat: -1, yoyo: true, ease: "sine.inOut", delay: i * .2
                        });
                    });

                    /* --- CTA button: continuous glow pulse --- */
                    gsap.to(".km5-section .btn-gradient", {
                        boxShadow: "0 10px 34px -6px rgba(236,72,153,.85)", duration: 1.4, repeat: -1, yoyo: true, ease: "sine.inOut"
                    });
                    gsap.to(".km5-section .km5-btn-outline", {
                        boxShadow: "0 0 26px -6px rgba(139,92,246,.9)", duration: 1.6, repeat: -1, yoyo: true, ease: "sine.inOut"
                    });

                    /* --- Card shine sweep: continuous repeating pass, staggered per card --- */
                    document.querySelectorAll(".km5-section .shine").forEach((shine, i) => {
                        gsap.timeline({ repeat: -1, repeatDelay: 5 + Math.random() * 3, delay: 2 + i * 0.6 })
                            .fromTo(shine, { xPercent: -220 }, { xPercent: 280, duration: 1.2, ease: "power2.inOut" });
                    });

                    /* --- Brand equalizer bars: continuous idle music-bar animation --- */
                    gsap.utils.toArray("#km5-eqIcon i").forEach((bar, i) => {
                        gsap.set(bar, { height: 8 + Math.random() * 18 });
                        gsap.to(bar, {
                            height: () => 6 + Math.random() * 22, duration: .5 + Math.random() * .4, repeat: -1, yoyo: true, ease: "sine.inOut", delay: i * .12
                        });
                    });

                    /* --- Workflow ring: gentle continuous scale-in-out for whole ring wrapper --- */
                    gsap.utils.toArray(".km5-section .ring").forEach((ring, i) => {
                        gsap.to(ring, {
                            scale: 1.05, duration: 1.8 + Math.random() * .5, repeat: -1, yoyo: true, ease: "sine.inOut", delay: i * .3
                        });
                    });
                }

            } catch (err) {
                console.error('[km5] section script error:', err);
            }
        })();
        /* ==================== index7.html (km7) scripts ==================== */
}
