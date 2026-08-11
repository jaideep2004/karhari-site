/**
 * visual-compare.js
 * Phase 5 visual verification tool:
 *   - serves legacy/combined.html on :3200 (tiny static server) and Next prod on :3100
 *   - headless Chrome (CDP): measures every section's bounding box on BOTH pages
 *     (desktop 1440x900 + mobile 390x844) and diffs them (5% height tolerance)
 *   - interaction checks on the Next page: mobile nav toggle, anchor scroll,
 *     navbar 'scrolled' class, hero animation final state, ScrollTrigger reveals
 *   - saves full-page + per-section screenshots of both pages to
 *     %TEMP%\opencode\km-visual\ for human inspection
 *
 * Usage: node tools/visual-compare.js
 * Prereqs: next prod build must exist (npm run build).
 */

const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');
const http = require('http');

const CHROME = process.env.CHROME_PATH || 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const CDP_PORT = 9334;
const NEXT_URL = 'http://localhost:3100';
const LEGACY_URL = 'http://localhost:3200/combined.html';
const LEGACY_DIR = path.join(__dirname, '..', 'legacy');
const SHOT_DIR = process.env.TEMP + '\\opencode\\km-visual';
const PROFILE = process.env.TEMP + '\\opencode\\km-chrome-visual';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const SECTIONS = [
  ['nav', '.navbar'],
  ['hero', '.hero'],
  ['all-platforms', '.all-platforms'],
  ['km2', '.km2-section'],
  ['km3', '.km3-section'],
  ['km4', '.km4-section'],
  ['km6', '.km6-section'],
  ['km5', '.km5-section'],
  ['km7', '.km7-section'],
  ['km8', '.km8-section'],
  ['km9', '.km9-section'],
  ['km10', '.km10-section'],
];

function serveStatic(dir, port) {
  const MIME = {
    '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript',
    '.png': 'image/png', '.svg': 'image/svg+xml', '.webp': 'image/webp',
    '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.gif': 'image/gif',
    '.ico': 'image/x-icon', '.pdf': 'application/pdf', '.woff2': 'font/woff2',
    '.woff': 'font/woff', '.mp4': 'video/mp4', '.mp3': 'audio/mpeg',
  };
  return new Promise((res) => {
    const srv = http.createServer((req, res) => {
      let p = decodeURIComponent(req.url.split('?')[0]);
      if (p.endsWith('/')) p += 'index.html';
      const fp = path.join(dir, p);
      if (!fp.startsWith(path.resolve(dir))) { res.writeHead(403); return res.end(); }
      fs.readFile(fp, (err, data) => {
        if (err) { res.writeHead(404); return res.end('not found'); }
        res.writeHead(200, { 'Content-Type': MIME[path.extname(fp)] || 'application/octet-stream' });
        res.end(data);
      });
    });
    srv.listen(port, () => res(srv));
  });
}

async function startChrome() {
  const chrome = spawn(CHROME, [
    '--headless=new', '--no-sandbox', '--disable-gpu', '--disable-background-networking',
    '--no-first-run', '--no-default-browser-check',
    '--remote-debugging-port=' + CDP_PORT, '--user-data-dir=' + PROFILE, 'about:blank',
  ], { stdio: 'ignore' });
  let target = null;
  for (let i = 0; i < 60; i++) {
    try {
      const list = await (await fetch('http://localhost:' + CDP_PORT + '/json/list')).json();
      target = list.find((t) => t.type === 'page');
      if (target) break;
    } catch (_) { /* not up yet */ }
    await sleep(250);
  }
  if (!target) throw new Error('Chrome CDP did not come up');
  const ws = new WebSocket(target.webSocketDebuggerUrl);
  await new Promise((res, rej) => { ws.onopen = res; ws.onerror = () => rej(new Error('ws error')); });
  let msgId = 0;
  const pending = new Map();
  const errors = [];
  ws.onmessage = (ev) => {
    const msg = JSON.parse(ev.data);
    if (msg.id && pending.has(msg.id)) { pending.get(msg.id)(msg); pending.delete(msg.id); }
    if (msg.method === 'Runtime.exceptionThrown') {
      const d = msg.params.exceptionDetails;
      errors.push('exception: ' + (d.exception && d.exception.description ? d.exception.description.split('\n')[0] : d.text));
    }
    if (msg.method === 'Runtime.consoleAPICalled' && msg.params.type === 'error') {
      errors.push('console.error: ' + msg.params.args.map((a) => a.value || a.description || '').join(' '));
    }
    if (msg.method === 'Log.entryAdded' && msg.params.entry.level === 'error') {
      errors.push('log(' + msg.params.entry.url + '): ' + msg.params.entry.text.split('\n')[0]);
    }
  };
  const send = (method, params = {}) => new Promise((res) => {
    const id = ++msgId; pending.set(id, res); ws.send(JSON.stringify({ id, method, params }));
  });
  const evl = async (expression) => {
    const r = await send('Runtime.evaluate', { expression, returnByValue: true });
    if (r.result && r.result.exceptionDetails) throw new Error('eval: ' + r.result.exceptionDetails.text);
    return r.result && r.result.result ? r.result.result.value : undefined;
  };
  return { chrome, ws, send, evl, errors };
}

async function setViewport(cdp, width, height, mobile, dsf) {
  await cdp.send('Emulation.setDeviceMetricsOverride', {
    width, height, deviceScaleFactor: dsf, mobile,
  });
  await sleep(400);
}

async function measure(cdp) {
  const expr = `JSON.stringify((${JSON.stringify(SECTIONS.map((s) => s[1]))}).map((sel) => {
    const el = document.querySelector(sel);
    if (!el) return { sel, missing: true };
    const r = el.getBoundingClientRect();
    return { sel, top: Math.round(r.top + window.scrollY), height: Math.round(r.height), width: Math.round(r.width) };
  }))`;
  const val = await cdp.evl(expr);
  return JSON.parse(val);
}

async function shot(cdp, name, clip) {
  const params = { format: 'png' };
  if (clip) params.clip = clip;
  const r = await cdp.send('Page.captureScreenshot', params);
  fs.writeFileSync(path.join(SHOT_DIR, name), Buffer.from(r.result.data, 'base64'));
}

function pct(a, b) { return Math.abs(a - b) / Math.max(a, b, 1) * 100; }

async function main() {
  fs.mkdirSync(SHOT_DIR, { recursive: true });
  const legacySrv = await serveStatic(LEGACY_DIR, 3200);
  console.log('[tool] legacy static server on :3200');

  let nextProc = null;
  if (!(await (await fetch(NEXT_URL).catch(() => null)))) {
    nextProc = spawn(process.execPath, ['node_modules/next/dist/bin/next', 'start', '--port', '3100'], { stdio: 'ignore', cwd: path.join(__dirname, '..') });
    for (let i = 0; i < 60; i++) {
      const ok = await fetch(NEXT_URL).then(() => true).catch(() => false);
      if (ok) break;
      await sleep(500);
    }
    console.log('[tool] next prod server on :3100');
  } else {
    console.log('[tool] reusing existing server on :3100');
  }

  const cdp = await startChrome();
  await cdp.send('Runtime.enable');
  await cdp.send('Page.enable');
  await cdp.send('Log.enable');
  await cdp.send('Network.enable');

  const report = { desktop: [], mobile: [], checks: {}, legacyErrors: [], nextErrors: [] };
  let fail = 0;

  const runComparison = async (vpName, width, height, mobile) => {
    await setViewport(cdp, width, height, mobile, 1);
    await cdp.send('Page.navigate', { url: LEGACY_URL });
    await sleep(mobile ? 8000 : 11000);
    const legacyBoxes = await measure(cdp);
    report.legacyErrors.push(...cdp.errors.map((e) => '[legacy] ' + e));
    cdp.errors.length = 0;
    for (const [key, sel] of SECTIONS) {
      const lb = legacyBoxes.find((b) => b.sel === sel);
      if (lb && !lb.missing) {
        await cdp.evl(`window.scrollTo(0, ${Math.max(lb.top - 80, 0)})`);
        await sleep(900);
        await shot(cdp, `legacy-${vpName}-${key}.png`, { x: 0, y: lb.top, width, height: lb.height, scale: 1 });
      }
    }
    await cdp.evl('window.scrollTo(0, 0)');
    await sleep(500);
    await setViewport(cdp, width, height, mobile, 0.35);
    await shot(cdp, `legacy-${vpName}-full.png`);
    await setViewport(cdp, width, height, mobile, 1);

    await cdp.send('Page.navigate', { url: NEXT_URL });
    await sleep(mobile ? 7000 : 9000);
    const nextBoxes = await measure(cdp);
    report.nextErrors.push(...cdp.errors.map((e) => '[next] ' + e));
    cdp.errors.length = 0;
    for (const [key, sel] of SECTIONS) {
      const lb = legacyBoxes.find((b) => b.sel === sel);
      const nb = nextBoxes.find((b) => b.sel === sel);
      if (!lb || !nb || lb.missing || nb.missing) {
        report[vpName].push({ key, status: 'FAIL', note: (lb && lb.missing ? 'legacy missing' : '') + (nb && nb.missing ? ' next missing' : '') });
        fail++;
        continue;
      }
      const dh = pct(lb.height, nb.height);
      const dw = Math.abs(lb.width - nb.width);
      const dtop = Math.abs(lb.top - nb.top);
      const ok = dh <= 5 && dw <= 4 && dtop <= 10;
      if (!ok) fail++;
      report[vpName].push({ key, ok, dh: +dh.toFixed(1), dw, dtop, lh: lb.height, nh: nb.height, ltop: lb.top, ntop: nb.top });
      if (nb && !nb.missing) {
        await cdp.evl(`window.scrollTo(0, ${Math.max(nb.top - 80, 0)})`);
        await sleep(900);
        await shot(cdp, `next-${vpName}-${key}.png`, { x: 0, y: nb.top, width, height: nb.height, scale: 1 });
      }
    }
    await cdp.evl('window.scrollTo(0, 0)');
    await sleep(500);
    await setViewport(cdp, width, height, mobile, 0.35);
    await shot(cdp, `next-${vpName}-full.png`);
    await setViewport(cdp, width, height, mobile, 1);
  };

  await runComparison('desktop', 1440, 900, false);

  // --- desktop interaction checks on Next page ---
  await setViewport(cdp, 1440, 900, false, 1);
  await cdp.send('Page.navigate', { url: NEXT_URL });
  await sleep(8000);
  await cdp.evl('window.scrollTo(0, 300)');
  await sleep(500);
  const scrolled = await cdp.evl(`document.querySelector('.navbar').classList.contains('scrolled')`);
  report.checks.navbarScrolled = scrolled;
  if (!scrolled) fail++;

  const heroState = JSON.parse(await cdp.evl(`JSON.stringify({
    badge: getComputedStyle(document.querySelector('.hero-badge')).opacity,
    vinyl: getComputedStyle(document.getElementById('vinyl')).transform,
    line: getComputedStyle(document.querySelector('.title-line')).opacity
  })`));
  const vinylRotating = /matrix|rotate/.test(heroState.vinyl);
  report.checks.hero = { badge: heroState.badge, vinyl: heroState.vinyl, titleLine: heroState.line };
  if (heroState.badge !== '1' || heroState.line !== '1' || !vinylRotating) { fail++; report.checks.hero.fail = true; }

  await cdp.evl(`document.querySelector('.all-platforms').scrollIntoView({ block: 'start' })`);
  await sleep(1300);
  const reveal = await cdp.evl(`getComputedStyle(document.querySelector('.platforms-content')).opacity`);
  report.checks.platformsReveal = reveal;
  if (reveal !== '1') fail++;

  await cdp.evl(`document.querySelector('.navbar-links a[href="#"], #navLinks a[href="#"]').click()`);
  await sleep(1500);
  const scrollY = await cdp.evl('window.scrollY');
  report.checks.anchorHome = scrollY;
  if (scrollY > 20) fail++;

  // --- mobile ---
  await setViewport(cdp, 390, 844, true, 1);
  await cdp.send('Page.navigate', { url: NEXT_URL });
  await sleep(7000);
  await cdp.evl(`document.getElementById('navToggle').click()`);
  await sleep(600);
  const toggle1 = await cdp.evl(`JSON.stringify({ open: document.getElementById('navLinks').classList.contains('open'), aria: document.getElementById('navToggle').getAttribute('aria-expanded') })`);
  await cdp.evl(`document.getElementById('navToggle').click()`);
  await sleep(600);
  const toggle2 = await cdp.evl(`JSON.stringify({ open: document.getElementById('navLinks').classList.contains('open'), aria: document.getElementById('navToggle').getAttribute('aria-expanded') })`);
  await cdp.evl(`document.getElementById('navToggle').click()`);
  await sleep(500);
  await cdp.evl(`document.querySelector('#navLinks a').click()`);
  await sleep(700);
  const toggle3 = await cdp.evl(`JSON.stringify({ open: document.getElementById('navLinks').classList.contains('open'), aria: document.getElementById('navToggle').getAttribute('aria-expanded') })`);
  report.checks.mobileToggle = { open: toggle1, closed: toggle2, afterLinkClick: toggle3 };
  if (!toggle1.includes('"open":true') || !toggle2.includes('"open":false') || !toggle3.includes('"open":false')) fail++;

  await runComparison('mobile', 390, 844, true);

  // --- print report ---
  console.log('\n=== SECTION BOX DIFFS (legacy vs next) ===');
  for (const vp of ['desktop', 'mobile']) {
    console.log('--- ' + vp + ' ---');
    for (const r of report[vp]) {
      if (r.status === 'FAIL') { console.log('  FAIL ' + r.key + ': ' + r.note); continue; }
      console.log('  ' + (r.ok ? 'ok   ' : 'DIFF ') + r.key.padEnd(13) +
        ' h ' + r.lh + '->' + r.nh + ' (' + r.dh + '%)  w ' + r.dw + 'px  top +' + r.dtop + 'px');
    }
  }
  console.log('\n=== INTERACTION CHECKS (next page) ===');
  for (const [k, v] of Object.entries(report.checks)) console.log('  ' + k + ': ' + JSON.stringify(v));
  console.log('\n=== RUNTIME ERRORS ===');
  console.log('legacy: ' + (report.legacyErrors.length ? '\n    ' + report.legacyErrors.join('\n    ') : 'none'));
  console.log('next:   ' + (report.nextErrors.length ? '\n    ' + report.nextErrors.join('\n    ') : 'none'));
  console.log('\nScreenshots: ' + SHOT_DIR);

  wsCleanup(cdp);
  legacySrv.close();
  if (nextProc) nextProc.kill();
  console.log('\nRESULT: ' + (fail === 0 ? 'ALL PASS' : fail + ' FAILURES'));
  process.exit(fail === 0 ? 0 : 1);
}

function wsCleanup(cdp) {
  try { cdp.ws.close(); } catch (_) {}
  try { cdp.chrome.kill(); } catch (_) {}
}

main().catch((e) => {
  console.error('VISUAL COMPARE FAILED: ' + e.message);
  process.exit(1);
});
