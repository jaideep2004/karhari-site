/**
 * img-diff.js — pixel-level comparison of the legacy-vs-next screenshots produced
 * by visual-compare.js.
 *
 * Modes:
 *   default      : per section, mean channel diff + % of pixels differing
 *   --coarse     : downscale to width 220 before diffing (layout-level signal)
 *   --shift      : find best (dx,dy) offset minimizing diff (marquee test)
 *   --motion <b> : motion-control: legacy-run1 vs legacy-run2 (self motion), next
 *                  run1 vs run2 (self motion), legacy-run1 vs next-run1 (cross).
 *                  If cross <= self motion + slack, the section differs only by
 *                  animation phase -> visual parity confirmed.
 *
 * Usage: node tools/img-diff.js [shotDir] [mode] [secondShotDir]
 */
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const DIR = process.argv[2] || (process.env.TEMP + '\\opencode\\km-visual');
const MODE = process.argv[3] || '';
const DIR2 = process.argv[4] || (DIR.replace(/km-visual$/, 'km-visual-run1'));
const THRESHOLD = 24; // per-channel abs diff
const COARSE = MODE === '--coarse'; // downscale to width 220 before diffing
const SHIFT = MODE === '--shift'; // find best (dx,dy) offset minimizing diff
const MOTION = MODE === '--motion';

function diffAt(bufA, bufB, w, h, dx, dy, stride) {
  let sum = 0, diffPixels = 0;
  for (let y = 0; y < h; y++) {
    const srcY = y + dy;
    if (srcY < 0 || srcY >= h) { diffPixels += w; continue; }
    for (let x = 0; x < w; x++) {
      const srcX = x + dx;
      if (srcX < 0 || srcX >= w) { diffPixels++; continue; }
      const i = (y * w + x) * 3, j = (srcY * w + srcX) * 3;
      const dr = Math.abs(bufB[i] - bufA[j]);
      const dg = Math.abs(bufB[i + 1] - bufA[j + 1]);
      const db = Math.abs(bufB[i + 2] - bufA[j + 2]);
      const d = Math.max(dr, dg, db);
      sum += (dr + dg + db) / 3;
      if (d > THRESHOLD) diffPixels++;
    }
  }
  return { mean: +(sum / (w * h)).toFixed(2), diffPct: +((diffPixels / (w * h)) * 100).toFixed(2) };
}

async function diffPair(legacyPath, nextPath) {
  const [a, b] = await Promise.all([sharp(legacyPath), sharp(nextPath)]);
  const [metaA, metaB] = await Promise.all([a.metadata(), b.metadata()]);
  const w = Math.min(metaA.width, metaB.width);
  const h = Math.min(metaA.height, metaB.height);
  let targetW = w, targetH = h;
  if (COARSE || SHIFT) { targetW = 220; targetH = Math.round(h * (targetW / w)); }
  const [ra, rb] = await Promise.all([
    sharp(legacyPath).resize(targetW, targetH).removeAlpha().raw().toBuffer({ resolveWithObject: true }),
    sharp(nextPath).resize(targetW, targetH).removeAlpha().raw().toBuffer({ resolveWithObject: true }),
  ]);
  const bufA = ra.data, bufB = rb.data;
  if (SHIFT) {
    let best = { dx: 0, dy: 0, mean: Infinity, diffPct: Infinity };
    for (let dy = -30; dy <= 30; dy += 3) {
      for (let dx = -80; dx <= 80; dx += 3) {
        const r = diffAt(bufA, bufB, targetW, targetH, dx, dy, 3);
        if (r.mean < best.mean) best = { dx, dy, ...r };
      }
    }
    return { w: targetW, h: targetH, ...best };
  }
  const n = targetW * targetH;
  let sum = 0, diffPixels = 0;
  let maxDiff = 0;
  for (let i = 0; i < n; i++) {
    const dr = Math.abs(bufA[i * 3] - bufB[i * 3]);
    const dg = Math.abs(bufA[i * 3 + 1] - bufB[i * 3 + 1]);
    const db = Math.abs(bufA[i * 3 + 2] - bufB[i * 3 + 2]);
    const d = Math.max(dr, dg, db);
    sum += (dr + dg + db) / 3;
    if (d > THRESHOLD) diffPixels++;
    if (d > maxDiff) maxDiff = d;
  }
  return { w: targetW, h: targetH, mean: +(sum / n).toFixed(2), diffPct: +((diffPixels / n) * 100).toFixed(2), max: maxDiff };
}

async function main() {
  if (MOTION) {
    const keys = new Set([
      ...fs.readdirSync(DIR).filter((f) => f.endsWith('.png')).map((f) => f.replace(/^(legacy|next)-/, '').replace(/\.png$/, '')),
      ...fs.readdirSync(DIR2).filter((f) => f.endsWith('.png')).map((f) => f.replace(/^(legacy|next)-/, '').replace(/\.png$/, '')),
    ]);
    const rows = [];
    for (const key of keys) {
      const p = (dir, pref) => path.join(dir, pref + '-' + key + '.png');
      const ok = (pth) => fs.existsSync(pth);
      if (!ok(p(DIR, 'legacy')) || !ok(p(DIR, 'next')) || !ok(p(DIR2, 'legacy')) || !ok(p(DIR2, 'next'))) continue;
      const legMotion = await diffPair(p(DIR, 'legacy'), p(DIR2, 'legacy'));
      const nextMotion = await diffPair(p(DIR, 'next'), p(DIR2, 'next'));
      const cross = await diffPair(p(DIR, 'legacy'), p(DIR, 'next'));
      rows.push({ key, legMotion, nextMotion, cross });
    }
    rows.sort((a, b) => (b.cross.mean - b.cross.diffPct / 100) - (a.cross.mean - a.cross.diffPct / 100));
    console.log('MOTION CONTROL (mean channel diff; % pixels >' + THRESHOLD + '):');
    console.log('  section                      legacy self-motion   next self-motion   legacy-vs-next  verdict');
    for (const r of rows) {
      const slack = 1.5;
      const motion = Math.max(r.legMotion.mean, r.nextMotion.mean) + slack;
      const ok = r.cross.mean <= motion;
      const verdict = ok ? 'ANIMATION PHASE (ok)' : 'REAL DIFF <-- inspect';
      console.log('  ' + r.key.padEnd(27) +
        ' ' + String(r.legMotion.mean).padStart(5) + ' / ' + String(r.legMotion.diffPct).padStart(5) + '%' +
        '   ' + String(r.nextMotion.mean).padStart(5) + ' / ' + String(r.nextMotion.diffPct).padStart(5) + '%' +
        '   ' + String(r.cross.mean).padStart(5) + ' / ' + String(r.cross.diffPct).padStart(5) + '%' +
        '   ' + verdict);
    }
    return;
  }
  const files = fs.readdirSync(DIR).filter((f) => f.endsWith('.png'));
  const keys = new Set(files.map((f) => f.replace(/^(legacy|next)-/, '').replace(/\.png$/, '')));
  const rows = [];
  for (const key of keys) {
    const lp = path.join(DIR, 'legacy-' + key + '.png');
    const np = path.join(DIR, 'next-' + key + '.png');
    if (!fs.existsSync(lp) || !fs.existsSync(np)) continue;
    const r = await diffPair(lp, np);
    rows.push({ key, ...r });
  }
  rows.sort((a, b) => b.diffPct - a.diffPct);
  if (SHIFT) {
    console.log('BEST-SHIFT diff (dx,dy px at width 220; mean channel diff; % pixels >' + THRESHOLD + ')');
    for (const r of rows) {
      const flag = r.diffPct > 8 ? '  <-- not animation phase' : '';
      console.log('  ' + r.key.padEnd(28) + ' shift (' + String(r.dx).padStart(4) + ',' + String(r.dy).padStart(4) + ')  mean ' + String(r.mean).padStart(5) + '  diff% ' + String(r.diffPct).padStart(6) + flag);
    }
    return;
  }
  console.log((COARSE ? 'COARSE' : 'FINE') + ' diff: mean channel diff + % of pixels differing by >' + THRESHOLD + '/255');
  for (const r of rows) {
    const flag = COARSE ? (r.diffPct > 8 ? '  <-- inspect' : '') : (r.diffPct > 8 ? '  <-- animated?' : '');
    console.log('  ' + r.key.padEnd(28) + ' mean ' + String(r.mean).padStart(5) + '  diff% ' + String(r.diffPct).padStart(6) + flag);
  }
}

main().catch((e) => { console.error('IMG DIFF FAILED: ' + e.message); process.exit(1); });
