/* Extracted verbatim from combined.html by tools/phase2-extract.js - do not hand-edit. */
export function runKm10(gsap, ScrollTrigger, MotionPathPlugin) {
(function () {
            try {

                /* ============================================================
                   ICON LIBRARY — minimal line icons, viewBox 0 0 24 24
                =============================================================*/
                const ICONS = {
                    users: '<circle cx="8" cy="8" r="3"/><path d="M2 20c0-3.2 2.5-5.5 6-5.5s6 2.3 6 5.5"/><circle cx="17.5" cy="9.5" r="2.4"/><path d="M14.8 20c0-2.4 1.7-4.3 4.2-4.3"/>',
                    play: '<circle cx="12" cy="12" r="8.5"/><path d="M10 8.3l6 3.7-6 3.7z"/>',
                    musicNote: '<path d="M9 17.5V4.8l10-2v12.5"/><circle cx="6" cy="17.5" r="3"/><circle cx="16" cy="15.3" r="3"/>',
                    eye: '<path d="M2 12s3.6-6.2 10-6.2S22 12 22 12s-3.6 6.2-10 6.2S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
                    globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18"/><path d="M12 3c2.6 2.5 3.7 5.6 3.7 9s-1.1 6.5-3.7 9c-2.6-2.5-3.7-5.6-3.7-9s1.1-6.5 3.7-9z"/>',
                    shieldCheck: '<path d="M12 2.3l7.5 2.8v6c0 5-3.2 8.4-7.5 10.4C7.7 19.5 4.5 16.1 4.5 11.1v-6L12 2.3z"/><path d="M8.6 12.2l2.3 2.3 4.5-4.6"/>',
                    monitor: '<rect x="3" y="4.5" width="18" height="12" rx="2"/><path d="M8.5 20h7M12 16.5V20"/>',
                    dollar: '<circle cx="12" cy="12" r="9"/><path d="M12 6.5v11"/><path d="M15.3 9.2c0-1.6-1.6-2.7-3.3-2.7s-3.3 1.1-3.3 2.5c0 3.2 6.6 1.6 6.6 4.8 0 1.5-1.5 2.6-3.3 2.6s-3.3-1.1-3.3-2.7"/>',
                    barChart: '<line x1="6" y1="19" x2="6" y2="11"/><line x1="12" y1="19" x2="12" y2="5"/><line x1="18" y1="19" x2="18" y2="13.5"/>',
                    disc: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="2.3"/>',
                    layers: '<path d="M12 3.2l8.5 4.6-8.5 4.6-8.5-4.6L12 3.2z"/><path d="M3.5 12.4l8.5 4.6 8.5-4.6"/><path d="M3.5 16.8l8.5 4.6 8.5-4.6"/>',
                    trending: '<polyline points="3,17.5 9,11.2 13,15 21,5.8"/><polyline points="15,5.8 21,5.8 21,11.8"/>',
                    key: '<circle cx="8" cy="15.5" r="4.2"/><path d="M11 12.3L20.5 2.8"/><path d="M16.5 6.3l3 3"/><path d="M13.3 9.5l2.2 2.2"/>',
                    headset: '<path d="M4 13.5v-1.2a8 8 0 0116 0v1.2"/><rect x="2.3" y="13.3" width="4.2" height="6.4" rx="1.6"/><rect x="17.5" y="13.3" width="4.2" height="6.4" rx="1.6"/>',
                    film: '<rect x="3" y="4.2" width="18" height="15.6" rx="2"/><line x1="8" y1="4.2" x2="8" y2="19.8"/><line x1="16" y1="4.2" x2="16" y2="19.8"/><line x1="3" y1="9.4" x2="8" y2="9.4"/><line x1="3" y1="15" x2="8" y2="15"/><line x1="16" y1="9.4" x2="21" y2="9.4"/><line x1="16" y1="15" x2="21" y2="15"/>',
                    smile: '<circle cx="12" cy="12" r="9"/><path d="M7.8 14.2c1 1.7 2.6 2.6 4.2 2.6s3.2-.9 4.2-2.6"/><circle cx="8.9" cy="10" r="1"/><circle cx="15.1" cy="10" r="1"/>',
                    star: '<path d="M12 2.3l3.1 6.7 7.2.8-5.4 4.9 1.5 7.2-6.4-3.7-6.4 3.7 1.5-7.2-5.4-4.9 7.2-.8 3.1-6.7z"/>',
                    calendar: '<rect x="3" y="5" width="18" height="16" rx="2"/><line x1="3" y1="10.2" x2="21" y2="10.2"/><line x1="8" y1="3" x2="8" y2="7"/><line x1="16" y1="3" x2="16" y2="7"/>',
                    dance: '<circle cx="12" cy="4.8" r="2.3"/><path d="M12 8v6"/><path d="M12 8.5l-4.8 3"/><path d="M12 8.5l4.8 3"/><path d="M12 14l-3.7 6"/><path d="M12 14l3.7 6"/>',
                    megaphone: '<path d="M3 10v4h3l6.5 4.2V5.8L6 10H3z"/><path d="M14.3 8.7a4.3 4.3 0 010 6.6"/><path d="M17.3 5.8a8.4 8.4 0 010 12.4"/>',
                    person: '<circle cx="12" cy="8" r="3.6"/><path d="M4.8 20c0-3.7 3.2-6.3 7.2-6.3S19.2 16.3 19.2 20"/>',
                    cloudUpload: '<path d="M7.2 18.2a4.6 4.6 0 01-.5-9.2 6.1 6.1 0 0111.6-2A5.1 5.1 0 0118 18.2H7.2z"/><path d="M12 10.5v6.2"/><path d="M9 13.3l3-3 3 3"/>',
                    gear: '<circle cx="12" cy="12" r="3.1"/><path d="M12 3v2.4M12 18.6V21M4.2 4.2l1.7 1.7M18.1 18.1l1.7 1.7M3 12h2.4M18.6 12H21M4.2 19.8l1.7-1.7M18.1 5.9l1.7-1.7"/>',
                    chartLine: '<polyline points="3,18.5 9,10.5 13,14.2 21,4.5"/>',
                    rocket: '<path d="M12 2.5c3.2 2.1 5.2 6.2 4.2 11.5l-4.2 4-4.2-4c-1-5.3 1-9.4 4.2-11.5z"/><circle cx="12" cy="9.3" r="1.5"/><path d="M8 15.8l-3.3 5.2"/><path d="M16 15.8l3.3 5.2"/>',
                    brain: '<path d="M9.3 3.3a3 3 0 00-3 3v.7a3 3 0 000 6v.7a3 3 0 003 3M14.7 3.3a3 3 0 013 3v.7a3 3 0 010 6v.7a3 3 0 01-3 3M9.3 3.3v16.4M14.7 3.3v16.4"/>',
                    document: '<path d="M6.3 2.5h8.4l5 5v14H6.3z"/><path d="M14.7 2.5v5h5"/><line x1="9.3" y1="13.4" x2="15.3" y2="13.4"/><line x1="9.3" y1="17.2" x2="15.3" y2="17.2"/>',
                    trophy: '<path d="M8 4h8v5a4 4 0 01-8 0V4z"/><path d="M8 5.2H4.3v1.6A3.9 3.9 0 008 10.6"/><path d="M16 5.2h3.7v1.6A3.9 3.9 0 0116 10.6"/><path d="M12 13v3.5"/><path d="M9 20.5h6"/><path d="M9.8 16.5h4.4v4H9.8z"/>'
                };
                function icon(name, extraStyle = '') {
                    return `<svg class="icon" viewBox="0 0 24 24" style="${extraStyle}">${ICONS[name]}</svg>`;
                }

                /* ============================================================
                   DATA
                =============================================================*/
                const heroStats = [
                    { num: '25K+', label: 'Users', ic: 'users', c: 'var(--blue)' },
                    { num: '20K+', label: 'YouTube Channels', ic: 'play', c: 'var(--pink)' },
                    { num: '15K+', label: 'Music Channels', ic: 'musicNote', c: 'var(--purple)' },
                    { num: '1B+', label: 'Monthly Views', ic: 'eye', c: 'var(--teal)' },
                    { num: '50+', label: 'Countries', ic: 'globe', c: 'var(--gold)' },
                    { num: '100%', label: 'Content Protection', ic: 'shieldCheck', c: 'var(--green)' },
                ];

                const solutions = [
                    { t: 'Content Management System', d: 'Full control of your content', ic: 'monitor', c: 'var(--blue)' },
                    { t: 'Monetization &amp; Revenue', d: 'Smart monetization tools', ic: 'dollar', c: 'var(--gold)' },
                    { t: 'Multi Channel Network (MCN)', d: 'Scale &amp; manage your network', ic: 'layers', c: 'var(--orange)' },
                    { t: 'Advanced Analytics', d: 'Real-time insights &amp; reports', ic: 'barChart', c: 'var(--blue)' },
                    { t: 'Content ID &amp; Copyright Protection', d: 'AI-powered content protection', ic: 'shieldCheck', c: 'var(--green)' },
                    { t: 'Channel Growth &amp; Audience', d: 'Grow audience &amp; engagement', ic: 'trending', c: 'var(--red)' },
                    { t: 'Rights Management', d: 'Secure &amp; automated takedowns', ic: 'key', c: 'var(--orange)' },
                    { t: '24/7 Dedicated Support', d: 'Always here for you', ic: 'headset', c: 'var(--blue)' },
                ];

                const features = [
                    { t: 'Channel Management', d: 'Add, manage and organize unlimited YouTube & music channels.', ic: 'monitor', c: 'var(--blue)' },
                    { t: 'Content Protection', d: 'AI-powered Content ID system to detect, claim and protect your content worldwide.', ic: 'shieldCheck', c: 'var(--green)' },
                    { t: 'Monetization & Royalties', d: 'Maximize earnings with smart monetization and transparent royalty management.', ic: 'dollar', c: 'var(--gold)' },
                    { t: 'Analytics & Reports', d: 'Real-time analytics to track performance and revenue.', ic: 'barChart', c: 'var(--blue)' },
                    { t: 'Team & Access Management', d: 'Add team members, set roles and manage access securely.', ic: 'users', c: 'var(--purple)' },
                    { t: 'Music Library Management', d: 'Organize, upload and manage your entire music library.', ic: 'disc', c: 'var(--pink)' },
                ];

                const orbitNodes = [
                    { t: 'Movie Clips', s: '250K+ Subscribers', ic: 'film', c: 'var(--orange)' },
                    { t: 'Comedy Shows', s: '300K+ Subscribers', ic: 'smile', c: 'var(--gold)' },
                    { t: 'Web Series', s: '400K+ Subscribers', ic: 'layers', c: 'var(--teal)' },
                    { t: 'Celebrity News', s: '350K+ Subscribers', ic: 'star', c: 'var(--purple)' },
                    { t: 'Lifestyle Vlogs', s: '260K+ Subscribers', ic: 'person', c: 'var(--pink)' },
                    { t: 'Entertainment News', s: '450K+ Subscribers', ic: 'calendar', c: 'var(--cyan)' },
                    { t: 'Dance & Talent', s: '220K+ Subscribers', ic: 'dance', c: 'var(--magenta)' },
                    { t: 'Trailers & Teasers', s: '270K+ Subscribers', ic: 'megaphone', c: 'var(--red)' },
                    { t: 'Music Videos', s: '500K+ Subscribers', ic: 'musicNote', c: 'var(--pink)' },
                ];

                const worldPins = [
                    { x: 16, y: 38, c: 'var(--blue)' }, { x: 27, y: 66, c: 'var(--green)' }, { x: 47, y: 26, c: 'var(--purple)' },
                    { x: 50, y: 58, c: 'var(--orange)' }, { x: 64, y: 38, c: 'var(--red)' }, { x: 74, y: 56, c: 'var(--gold)' },
                    { x: 85, y: 72, c: 'var(--teal)' }, { x: 36, y: 44, c: 'var(--pink)' }
                ];

                const networkStats = [
                    { num: '20K+', label: 'YouTube Channels', c: 'var(--orange)' },
                    { num: '15K+', label: 'Music Channels', c: 'var(--red)' },
                    { num: '25K+', label: 'Registered Users', c: 'var(--green)' },
                    { num: '1B+', label: 'Monthly Views', c: 'var(--blue)' },
                    { num: '50+', label: 'Countries', c: 'var(--purple)' },
                ];

                const growItems = [
                    { t: 'Higher Revenue', ic: 'dollar', c: 'var(--green)' },
                    { t: 'Wider Audience', ic: 'users', c: 'var(--purple)' },
                    { t: 'Stronger Brand', ic: 'trophy', c: 'var(--gold)' },
                    { t: 'Long Term Growth', ic: 'chartLine', c: 'var(--blue)' },
                ];

                const steps = [
                    { n: '1. Upload', d: 'Upload your content securely', ic: 'cloudUpload', c: 'var(--cyan)' },
                    { n: '2. Add Channels', d: 'Connect and add your YouTube & music channels', ic: 'play', c: 'var(--pink)' },
                    { n: '3. Protect', d: 'AI Content ID protects your content', ic: 'shieldCheck', c: 'var(--green)' },
                    { n: '4. Manage', d: 'Manage content, team and permissions', ic: 'gear', c: 'var(--orange)' },
                    { n: '5. Monetize', d: 'Optimize revenue and earn more', ic: 'dollar', c: 'var(--red)' },
                    { n: '6. Analyze', d: 'Track performance with powerful analytics', ic: 'chartLine', c: 'var(--blue)' },
                    { n: '7. Grow', d: 'Grow your network and audience globally', ic: 'rocket', c: 'var(--teal)' },
                ];

                const footerIcons = [
                    { t: 'AI Powered Content ID', ic: 'brain', c: 'var(--purple)' },
                    { t: 'Real-Time Analytics', ic: 'chartLine', c: 'var(--green)' },
                    { t: 'Secure Cloud Infrastructure', ic: 'cloudUpload', c: 'var(--blue)' },
                    { t: 'Automated Workflows', ic: 'gear', c: 'var(--orange)' },
                    { t: 'Smart Royalty Reports', ic: 'document', c: 'var(--magenta)' },
                    { t: 'Global Team Support', ic: 'headset', c: 'var(--blue)' },
                    { t: 'Data Security & Privacy', ic: 'shieldCheck', c: 'var(--red)' },
                ];

                /* ============================================================
                   RENDER
                =============================================================*/
                document.getElementById('km10-heroStats').innerHTML = heroStats.map((s, i) => `
  <div class="stat-item reveal" style="transition-delay:${i * 0.05}s">
    <div class="stat-ic" style="--sc:${s.c}">${icon(s.ic)}</div>
    <div><div class="stat-num">${s.num}</div><div class="stat-label">${s.label}</div></div>
  </div>`).join('');

                document.getElementById('km10-solutionsGrid').innerHTML = solutions.map(s => `
  <div class="sol-item">
    <div class="sol-ic" style="--sc:${s.c}">${icon(s.ic)}</div>
    <div><div class="sol-title">${s.t}</div><div class="sol-desc">${s.d}</div></div>
  </div>`).join('');

                document.getElementById('km10-featuresCol').innerHTML = features.map((f, i) => `
  <div class="feature-item reveal" style="transition-delay:${i * 0.06}s;--sc:${f.c}">
    <div class="feat-ic" style="--sc:${f.c}">${icon(f.ic)}</div>
    <div><div class="feat-title">${f.t}</div><div class="feat-desc">${f.d}</div></div>
  </div>`).join('');

                document.getElementById('km10-worldMap').innerHTML =
                    `<svg viewBox="0 0 100 56" preserveAspectRatio="none">
    <defs><pattern id="dotPat" width="2.6" height="2.6" patternUnits="userSpaceOnUse">
      <circle cx="0.5" cy="0.5" r="0.5" fill="rgba(255,255,255,0.16)"/>
    </pattern></defs>
    <path d="M8,16 Q4,20 6,27 Q4,32 9,34 Q13,38 19,35 Q23,33 22,27 Q26,24 22,19 Q22,14 16,13 Q11,12 8,16Z" fill="url(#dotPat)"/>
    <path d="M20,36 Q17,40 19,46 Q18,51 23,53 Q27,54 28,49 Q32,46 29,41 Q30,36 25,35 Q21,34 20,36Z" fill="url(#dotPat)"/>
    <path d="M42,14 Q39,18 42,21 Q40,25 45,26 Q49,27 50,23 Q54,21 51,17 Q52,13 47,12 Q43,11 42,14Z" fill="url(#dotPat)"/>
    <path d="M43,26 Q39,30 41,36 Q39,42 44,46 Q49,49 53,45 Q57,42 55,36 Q57,30 52,27 Q47,24 43,26Z" fill="url(#dotPat)"/>
    <path d="M58,14 Q55,18 58,22 Q62,26 68,24 Q74,27 79,23 Q83,20 80,16 Q81,11 75,10 Q68,8 62,11 Q58,10 58,14Z" fill="url(#dotPat)"/>
    <path d="M78,24 Q75,28 78,32 Q76,36 81,38 Q86,40 88,36 Q91,32 88,28 Q89,23 84,22 Q80,21 78,24Z" fill="url(#dotPat)"/>
    <path d="M80,42 Q77,45 80,49 Q84,52 89,49 Q92,46 89,43 Q89,40 85,40 Q81,39 80,42Z" fill="url(#dotPat)"/>
  </svg>` +
                    worldPins.map(p => `<div class="pin" style="left:${p.x}%;top:${p.y}%;--pc:${p.c}"></div>`).join('');

                document.getElementById('km10-networkStats').innerHTML = networkStats.map(s => `
  <div class="ns-box"><div class="ns-num" style="color:${s.c}">${s.num}</div><div class="ns-label">${s.label}</div></div>`).join('');

                document.getElementById('km10-growRow').innerHTML = growItems.map(g => `
  <div class="grow-item"><div class="grow-ic" style="--sc:${g.c}">${icon(g.ic)}</div><div class="grow-label">${g.t}</div></div>`).join('');

                document.getElementById('km10-stepsRow').innerHTML = steps.map((s, i) => `
  <div class="step-item reveal" style="transition-delay:${i * 0.05}s">
    <div class="step-ic" style="--sc:${s.c}">${icon(s.ic)}</div>
    <div class="step-num" style="color:${s.c}">${s.n}</div>
    <div class="step-desc">${s.d}</div>
  </div>
  ${i < steps.length - 1 ? `<div class="step-arrow"><svg viewBox="0 0 24 12" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><path d="M0 6h20M15 1l5 5-5 5"/></svg></div>` : ''}
`).join('');

                document.getElementById('km10-footerIcons').innerHTML = footerIcons.map(f => `
  <div class="fi-item"><div class="fi-ic" style="--sc:${f.c}">${icon(f.ic)}</div><div class="fi-label">${f.t}</div></div>`).join('');

                /* ============================================================
                   ORBIT LAYOUT — positions nodes + draws connecting lines
                =============================================================*/
                function layoutOrbit() {
                    const wrap = document.getElementById('km10-orbitWrap');
                    const svg = document.getElementById('km10-orbitSvg');
                    const size = wrap.offsetWidth;
                    if (!size) return;
                    const cx = size / 2, cy = size / 2;
                    const R = size * 0.415;

                    // clear previous nodes
                    wrap.querySelectorAll('.orbit-node').forEach(n => n.remove());

                    const n = orbitNodes.length;
                    const step = (Math.PI * 2) / n;
                    let lines = '';
                    orbitNodes.forEach((node, i) => {
                        const angle = i * step; // 0 = top, clockwise
                        const x = cx + R * Math.sin(angle);
                        const y = cy - R * Math.cos(angle);

                        lines += `<line x1="${cx}" y1="${cy}" x2="${x}" y2="${y}" stroke="${node.c}" stroke-opacity="0.28" stroke-width="1.4"/>`;
                        lines += `<circle r="2.6" fill="${node.c}"><animateMotion dur="3.6s" begin="${i * 0.22}s" repeatCount="indefinite" path="M${cx},${cy} L${x},${y}"/><animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.15;0.85;1" dur="3.6s" begin="${i * 0.22}s" repeatCount="indefinite"/></circle>`;

                        const div = document.createElement('div');
                        div.className = 'orbit-node';
                        div.style.left = x + 'px';
                        div.style.top = y + 'px';
                        div.style.animationDelay = (i * 0.06) + 's';
                        div.innerHTML = `<div class="n-ic" style="--sc:${node.c}">${icon(node.ic)}</div>
      <div><div class="n-title">${node.t}</div><div class="n-sub" style="--sc:${node.c}">${node.s}</div></div>`;
                        wrap.appendChild(div);
                    });
                    svg.innerHTML = lines;
                    svg.setAttribute('viewBox', `0 0 ${size} ${size}`);
                }
                window.addEventListener('load', layoutOrbit);
                window.addEventListener('resize', () => { clearTimeout(window._orbitT); window._orbitT = setTimeout(layoutOrbit, 120); });
                layoutOrbit();
                setTimeout(layoutOrbit, 60); // re-run once fonts/layout settle

                /* ============================================================
                   SCROLL REVEAL
                =============================================================*/
                const io = new IntersectionObserver((entries) => {
                    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
                }, { threshold: 0.15 });
                document.querySelectorAll('.km10-section .reveal').forEach(el => io.observe(el));

            } catch (err) {
                console.error('[km10] section script error:', err);
            }
        })();
}
