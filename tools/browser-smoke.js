/**
 * browser-smoke.js
 * Headless-Chrome smoke test for the migrated page:
 *   - navigates to the URL, waits for load + animations to initialize
 *   - reports dynamic DOM state (evidence that legacy scripts ran)
 *   - reports any runtime exceptions / console errors
 *
 * Usage: node tools/browser-smoke.js [url] [waitMs]
 */

const { spawn } = require('child_process');
const CHROME = process.env.CHROME_PATH || 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const CDP_PORT = 9333;
const URL = process.argv[2] || 'http://localhost:3100';
const WAIT_MS = parseInt(process.argv[3] || '9000', 10);
const PROFILE = process.env.TEMP + '\\opencode\\km-chrome-smoke';

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function main() {
  const chrome = spawn(CHROME, [
    '--headless=new',
    '--no-sandbox',
    '--disable-gpu',
    '--disable-background-networking',
    '--no-first-run',
    '--no-default-browser-check',
    '--remote-debugging-port=' + CDP_PORT,
    '--user-data-dir=' + PROFILE,
    'about:blank',
  ], { stdio: 'ignore' });

  let target = null;
  for (let i = 0; i < 60; i++) {
    try {
      const list = await (await fetch('http://localhost:' + CDP_PORT + '/json/list')).json();
      target = list.find((t) => t.type === 'page');
      if (target) break;
    } catch (_) { /* chrome not up yet */ }
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
    if (msg.id && pending.has(msg.id)) {
      pending.get(msg.id)(msg);
      pending.delete(msg.id);
    }
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
  const send = (method, params = {}) =>
    new Promise((res) => {
      const id = ++msgId;
      pending.set(id, res);
      ws.send(JSON.stringify({ id, method, params }));
    });

  await send('Runtime.enable');
  await send('Page.enable');
  await send('Log.enable');
  await send('Page.navigate', { url: URL });
  await sleep(WAIT_MS);

  const probe = `
    JSON.stringify({
      markers: document.querySelectorAll('[data-km-init="1"]').length,
      sparkles: document.querySelectorAll('.sparkle').length,
      platformLogoCards: document.querySelectorAll('.platform-logo-card').length,
      km5PlatGrid: (document.getElementById('km5-platGrid') || {}).children ? document.getElementById('km5-platGrid').children.length : -1,
      km10Solutions: (document.getElementById('km10-solutionsGrid') || {}).children ? document.getElementById('km10-solutionsGrid').children.length : -1,
      km10Steps: (document.getElementById('km10-stepsRow') || {}).children ? document.getElementById('km10-stepsRow').children.length : -1,
      km7Cards: document.querySelectorAll('.km7-section .cid-card').length,
      km9Shield: !!document.getElementById('km9-shieldStage'),
      heroOrbitIcons: document.querySelectorAll('.hero .orbit-icon').length,
      scrollHeight: document.body.scrollHeight,
      title: document.title
    })`;
  const r = await send('Runtime.evaluate', { expression: probe, returnByValue: true });
  console.log('PAGE STATE: ' + r.result.result.value);
  console.log('ERRORS: ' + (errors.length ? '\n' + errors.join('\n') : 'none'));

  ws.close();
  chrome.kill();
  process.exit(0);
}

main().catch((e) => {
  console.error('SMOKE TEST FAILED: ' + e.message);
  process.exit(1);
});
