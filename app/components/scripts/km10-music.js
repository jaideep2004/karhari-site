/* Music CMS & MCN section script */
export function runKm10Music(gsap, ScrollTrigger, MotionPathPlugin) {
  (function () {
    try {
      /* ============================================================
         ICON LIBRARY — minimal line icons, viewBox 0 0 24 24
      =============================================================*/
      const ICONS = {
        users: '<circle cx="8" cy="8" r="3"/><path d="M2 20c0-3.2 2.5-5.5 6-5.5s6 2.3 6 5.5"/><circle cx="17.5" cy="9.5" r="2.4"/><path d="M14.8 20c0-2.4 1.7-4.3 4.2-4.3"/>',
        play: '<path d="M8 5l11 7-11 7z"/>',
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
        return `<svg class="icon" viewBox="0 0 24 24" style="${extraStyle}">${ICONS[name] || ''}</svg>`;
      }

      /* ============================================================
         DATA — MUSIC CMS
      =============================================================*/
      const heroStats = [
        { num: '25K+', label: 'Users', ic: 'users', c: 'var(--blue)' },
        { num: '15K+', label: 'Music Channels', ic: 'musicNote', c: 'var(--purple)' },
        { num: '1B+', label: 'Monthly Views', ic: 'eye', c: 'var(--teal)' },
        { num: '50+', label: 'Countries', ic: 'globe', c: 'var(--gold)' },
        { num: '100%', label: 'Content Protection', ic: 'shieldCheck', c: 'var(--green)' }
      ];

      const solutions = [
        { t: 'Music CMS (Content Management System)', d: 'Full control of your music content', ic: 'monitor', c: 'var(--blue)' },
        { t: 'Music Multi Channel Network (MCN)', d: 'Scale & manage your music network', ic: 'layers', c: 'var(--purple)' },
        { t: 'Content ID & Copyright Protection', d: 'AI-powered content protection', ic: 'shieldCheck', c: 'var(--green)' },
        { t: 'Rights Management & Takedowns', d: 'Secure & automated takedowns', ic: 'key', c: 'var(--gold)' },
        { t: 'Monetization & Revenue Optimization', d: 'Smart monetization tools', ic: 'dollar', c: 'var(--gold)' },
        { t: 'Advanced Analytics & Reporting', d: 'Real-time insights & reports', ic: 'barChart', c: 'var(--blue)' },
        { t: 'Channel Growth & Audience Development', d: 'Grow audience & engagement', ic: 'trending', c: 'var(--pink)' },
        { t: '24/7 Dedicated Support', d: 'Always here for you', ic: 'headset', c: 'var(--cyan)' }
      ];

      const features = [
        { t: 'MUSIC CHANNEL MANAGEMENT', d: 'Add & manage unlimited music YouTube channels from one powerful dashboard.', ic: 'musicNote', c: 'var(--blue)' },
        { t: 'CONTENT ID PROTECTION', d: 'AI-powered Content ID system to detect, claim and protect your music worldwide.', ic: 'shieldCheck', c: 'var(--green)' },
        { t: 'MONETIZATION & ROYALTIES', d: 'Maximize earnings with smart monetization and transparent royalty management.', ic: 'dollar', c: 'var(--gold)' },
        { t: 'ANALYTICS & REPORTS', d: 'Real-time analytics to track performance, audience and revenue in one place.', ic: 'barChart', c: 'var(--purple)' },
        { t: 'TEAM & ACCESS MANAGEMENT', d: 'Add team members, set roles, and manage access securely.', ic: 'users', c: 'var(--cyan)' },
        { t: 'MUSIC LIBRARY MANAGEMENT', d: 'Organize, upload and manage your entire music library efficiently.', ic: 'disc', c: 'var(--magenta)' }
      ];

      const worldPins = [
        { x: 16, y: 38, c: 'var(--blue)' }, { x: 27, y: 66, c: 'var(--green)' }, { x: 47, y: 26, c: 'var(--purple)' },
        { x: 50, y: 58, c: 'var(--orange)' }, { x: 64, y: 38, c: 'var(--red)' }, { x: 74, y: 56, c: 'var(--gold)' },
        { x: 85, y: 72, c: 'var(--teal)' }, { x: 36, y: 44, c: 'var(--pink)' }
      ];

      const networkStats = [
        { num: '15K+', label: 'Music Channels', c: 'var(--blue)' },
        { num: '25K+', label: 'Registered Users', c: 'var(--green)' },
        { num: '1B+', label: 'Monthly Views', c: 'var(--gold)' },
        { num: '50+', label: 'Countries', c: 'var(--purple)' }
      ];

      const growItems = [
        { t: 'Higher Revenue', ic: 'dollar', c: 'var(--green)' },
        { t: 'Wider Audience', ic: 'users', c: 'var(--purple)' },
        { t: 'Stronger Brand', ic: 'star', c: 'var(--gold)' },
        { t: 'Long Term Growth', ic: 'chartLine', c: 'var(--blue)' }
      ];

      const steps = [
        { n: '1. UPLOAD', d: 'Upload your music content securely', ic: 'cloudUpload', c: 'var(--blue)' },
        { n: '2. ADD CHANNELS', d: 'Connect and add your music YouTube channels', ic: 'play', c: 'var(--pink)' },
        { n: '3. PROTECT', d: 'AI Content ID protects your music', ic: 'shieldCheck', c: 'var(--green)' },
        { n: '4. MONETIZE', d: 'We optimize and maximize your revenue', ic: 'dollar', c: 'var(--gold)' },
        { n: '5. ANALYZE', d: 'Track performance with smart analytics', ic: 'barChart', c: 'var(--purple)' },
        { n: '6. GROW', d: 'Grow your channels and audience together', ic: 'rocket', c: 'var(--cyan)' }
      ];

      const footerIcons = [
        { t: 'AI Powered Content ID', ic: 'brain', c: 'var(--purple)' },
        { t: 'Real-Time Analytics', ic: 'chartLine', c: 'var(--green)' },
        { t: 'Secure Cloud Infrastructure', ic: 'cloudUpload', c: 'var(--blue)' },
        { t: 'Automated Workflows', ic: 'gear', c: 'var(--orange)' },
        { t: 'Smart Royalty Reports', ic: 'document', c: 'var(--magenta)' },
        { t: 'Global Team Support', ic: 'headset', c: 'var(--cyan)' }
      ];

      /* ============================================================
         RENDER DOM
      =============================================================*/
      const heroStatsEl = document.getElementById('km10m-heroStats');
      if (heroStatsEl) {
        heroStatsEl.innerHTML = heroStats.map((s) => `
          <div class="stat-item">
            <div class="stat-ic" style="--sc:${s.c}">${icon(s.ic)}</div>
            <div>
              <div class="stat-num">${s.num}</div>
              <div class="stat-label">${s.label}</div>
            </div>
          </div>
        `).join('');
      }

      const solGridEl = document.getElementById('km10m-solutionsGrid');
      if (solGridEl) {
        solGridEl.innerHTML = solutions.map(s => `
          <div class="sol-item">
            <div class="sol-ic" style="--sc:${s.c}">${icon(s.ic)}</div>
            <div>
              <div class="sol-title">${s.t}</div>
              <div class="sol-desc">${s.d}</div>
            </div>
          </div>
        `).join('');
      }

      const featColEl = document.getElementById('km10m-featuresCol');
      if (featColEl) {
        featColEl.innerHTML = features.map((f) => `
          <div class="feature-item" style="--sc:${f.c}">
            <div class="feat-ic" style="--sc:${f.c}">${icon(f.ic)}</div>
            <div>
              <div class="feat-title">${f.t}</div>
              <div class="feat-desc">${f.d}</div>
            </div>
          </div>
        `).join('');
      }

      const worldMapEl = document.getElementById('km10m-worldMap');
      if (worldMapEl) {
        worldMapEl.innerHTML = `
          <svg viewBox="0 0 100 56" preserveAspectRatio="none">
            <defs>
              <pattern id="dotPatM" width="2.4" height="2.4" patternUnits="userSpaceOnUse">
                <circle cx="0.6" cy="0.6" r="0.5" fill="rgba(255,255,255,0.2)"/>
              </pattern>
            </defs>
            <path d="M8,16 Q4,20 6,27 Q4,32 9,34 Q13,38 19,35 Q23,33 22,27 Q26,24 22,19 Q22,14 16,13 Q11,12 8,16Z" fill="url(#dotPatM)"/>
            <path d="M20,36 Q17,40 19,46 Q18,51 23,53 Q27,54 28,49 Q32,46 29,41 Q30,36 25,35 Q21,34 20,36Z" fill="url(#dotPatM)"/>
            <path d="M42,14 Q39,18 42,21 Q40,25 45,26 Q49,27 50,23 Q54,21 51,17 Q52,13 47,12 Q43,11 42,14Z" fill="url(#dotPatM)"/>
            <path d="M43,26 Q39,30 41,36 Q39,42 44,46 Q49,49 53,45 Q57,42 55,36 Q57,30 52,27 Q47,24 43,26Z" fill="url(#dotPatM)"/>
            <path d="M58,14 Q55,18 58,22 Q62,26 68,24 Q74,27 79,23 Q83,20 80,16 Q81,11 75,10 Q68,8 62,11 Q58,10 58,14Z" fill="url(#dotPatM)"/>
            <path d="M78,24 Q75,28 78,32 Q76,36 81,38 Q86,40 88,36 Q91,32 88,28 Q89,23 84,22 Q80,21 78,24Z" fill="url(#dotPatM)"/>
            <path d="M80,42 Q77,45 80,49 Q84,52 89,49 Q92,46 89,43 Q89,40 85,40 Q81,39 80,42Z" fill="url(#dotPatM)"/>
          </svg>
        ` + worldPins.map(p => `<div class="pin" style="left:${p.x}%;top:${p.y}%;--pc:${p.c}"></div>`).join('');
      }

      const netStatsEl = document.getElementById('km10m-networkStats');
      if (netStatsEl) {
        netStatsEl.innerHTML = networkStats.map(s => `
          <div class="ns-box">
            <div class="ns-num" style="color:${s.c}">${s.num}</div>
            <div class="ns-label">${s.label}</div>
          </div>
        `).join('');
      }

      const growRowEl = document.getElementById('km10m-growRow');
      if (growRowEl) {
        growRowEl.innerHTML = growItems.map(g => `
          <div class="grow-item">
            <div class="grow-ic" style="--sc:${g.c}">${icon(g.ic)}</div>
            <div class="grow-label">${g.t}</div>
          </div>
        `).join('');
      }

      const stepsRowEl = document.getElementById('km10m-stepsRow');
      if (stepsRowEl) {
        stepsRowEl.innerHTML = steps.map((s, i) => `
          <div class="step-item">
            <div class="step-ic" style="--sc:${s.c}">${icon(s.ic)}</div>
            <div class="step-num" style="color:${s.c}">${s.n}</div>
            <div class="step-desc">${s.d}</div>
          </div>
          ${i < steps.length - 1 ? `<div class="step-arrow"><svg viewBox="0 0 24 12" fill="none" stroke="var(--cyan)" stroke-width="1.8" stroke-dasharray="3 2"><path d="M0 6h20M15 1l5 5-5 5"/></svg></div>` : ''}
        `).join('');
      }

      const footerIconsEl = document.getElementById('km10m-footerIcons');
      if (footerIconsEl) {
        footerIconsEl.innerHTML = footerIcons.map(f => `
          <div class="fi-item">
            <div class="fi-ic" style="--sc:${f.c}">${icon(f.ic)}</div>
            <div class="fi-label">${f.t}</div>
          </div>
        `).join('');
      }

      /* ============================================================
         ORBIT LAYOUT — MUSIC MULTI-CHANNEL WEB (ENHANCED AUDIO EQUALIZER)
      =============================================================*/
      function layoutOrbit() {
        const wrap = document.getElementById('km10m-orbitWrap');
        const svg = document.getElementById('km10m-orbitSvg');
        if (!wrap || !svg) return;
        const size = wrap.offsetWidth;
        if (!size) return;
        const cx = size / 2, cy = size / 2;
        const R = size * 0.42;

        const numNodes = 24;
        let svgContent = '';
        const colors = ['#ff0000', 'var(--blue)', 'var(--purple)', 'var(--pink)', 'var(--gold)', 'var(--teal)', 'var(--cyan)'];

        // 1. Expanding Audio Signal Ripples
        svgContent += `
          <circle cx="${cx}" cy="${cy}" r="40" fill="none" stroke="rgba(160, 107, 255, 0.4)" stroke-width="1.5">
            <animate attributeName="r" values="40;225" dur="3.6s" repeatCount="indefinite"/>
            <animate attributeName="opacity" values="0.8;0" dur="3.6s" repeatCount="indefinite"/>
          </circle>
          <circle cx="${cx}" cy="${cy}" r="40" fill="none" stroke="rgba(59, 157, 255, 0.4)" stroke-width="1.5">
            <animate attributeName="r" values="40;225" dur="3.6s" begin="1.8s" repeatCount="indefinite"/>
            <animate attributeName="opacity" values="0.8;0" dur="3.6s" begin="1.8s" repeatCount="indefinite"/>
          </circle>
        `;

        // 2. Concentric Orbit Rings
        svgContent += `<circle cx="${cx}" cy="${cy}" r="${R * 0.52}" fill="none" stroke="rgba(160,107,255,0.3)" stroke-width="1.5" stroke-dasharray="4 4"/>`;
        svgContent += `<circle cx="${cx}" cy="${cy}" r="${R * 0.82}" fill="none" stroke="rgba(59,157,255,0.25)" stroke-width="1.5"/>`;

        // 3. Audio Equalizer Wave Bar Ring
        const eqBars = 20;
        for (let b = 0; b < eqBars; b++) {
          const eqAngle = (b * Math.PI * 2) / eqBars;
          const innerR = R * 0.38;
          const outerR = R * 0.48;
          const x1 = cx + innerR * Math.cos(eqAngle);
          const y1 = cy + innerR * Math.sin(eqAngle);
          const x2 = cx + outerR * Math.cos(eqAngle);
          const y2 = cy + outerR * Math.sin(eqAngle);
          const eqColor = colors[b % colors.length];

          svgContent += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${eqColor}" stroke-width="2.5" stroke-linecap="round" opacity="0.7">
            <animate attributeName="stroke-opacity" values="0.3;1;0.3" dur="${0.8 + (b % 5) * 0.2}s" repeatCount="indefinite"/>
            <animate attributeName="x2" values="${x1 + (x2 - x1) * 0.4};${x2};${x1 + (x2 - x1) * 0.4}" dur="${0.8 + (b % 5) * 0.2}s" repeatCount="indefinite"/>
            <animate attributeName="y2" values="${y1 + (y2 - y1) * 0.4};${y2};${y1 + (y2 - y1) * 0.4}" dur="${0.8 + (b % 5) * 0.2}s" repeatCount="indefinite"/>
          </line>`;
        }

        // 4. Radiating Node Web
        for (let i = 0; i < numNodes; i++) {
          const angle = (i * Math.PI * 2) / numNodes;
          const dist = R * (0.52 + (i % 2 === 0 ? 0.45 : 0.25));
          const x = cx + dist * Math.sin(angle);
          const y = cy - dist * Math.cos(angle);
          const c = colors[i % colors.length];

          // Radial line
          svgContent += `<line x1="${cx}" y1="${cy}" x2="${x}" y2="${y}" stroke="${c}" stroke-opacity="0.35" stroke-width="1.2"/>`;

          // Inner cross connections
          if (i % 2 === 0) {
            const nextAngle = ((i + 3) * Math.PI * 2) / numNodes;
            const nx = cx + (R * 0.72) * Math.sin(nextAngle);
            const ny = cy - (R * 0.72) * Math.cos(nextAngle);
            svgContent += `<line x1="${x}" y1="${y}" x2="${nx}" y2="${ny}" stroke="rgba(255,255,255,0.12)" stroke-width="1"/>`;
          }

          // Animated particle moving along line
          svgContent += `<circle r="3.5" fill="${c}">
            <animateMotion dur="${2.6 + (i % 3) * 0.4}s" begin="${i * 0.15}s" repeatCount="indefinite" path="M${cx},${cy} L${x},${y}"/>
            <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.15;0.85;1" dur="${2.6 + (i % 3) * 0.4}s" begin="${i * 0.15}s" repeatCount="indefinite"/>
          </circle>`;

          // Mini red YouTube play badge at node ends
          svgContent += `<g transform="translate(${x - 9}, ${y - 6})" filter="drop-shadow(0 0 4px #ff0000)">
            <rect width="18" height="12" rx="3" fill="#ff0000"/>
            <polygon points="7,3 13,6 7,9" fill="#ffffff"/>
          </g>`;
        }
        svg.innerHTML = svgContent;
        svg.setAttribute('viewBox', `0 0 ${size} ${size}`);
      }

      window.addEventListener('load', layoutOrbit);
      window.addEventListener('resize', () => {
        clearTimeout(window._orbitTM);
        window._orbitTM = setTimeout(layoutOrbit, 120);
      });
      layoutOrbit();
      setTimeout(layoutOrbit, 80);

      /* ============================================================
         SCROLL REVEAL
      =============================================================*/
      const io = new IntersectionObserver((entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.classList.add('in');
            io.unobserve(e.target);
          }
        });
      }, { threshold: 0.1 });
      document.querySelectorAll('.km10-music-section .reveal').forEach(el => io.observe(el));

    } catch (err) {
      console.error('[km10m] section script error:', err);
    }
  })();
}
