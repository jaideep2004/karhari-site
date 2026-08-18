/**
 * Repair double-encoded UTF-8 (mojibake) in the regenerated app files.
 *
 * Background: the source HTML was once read as Windows-1252 and re-saved as
 * UTF-8, so every non-ASCII char became a string of Latin chars:
 *   🇦 (U+1F1E6, UTF-8 F0 9F 87 A6) -> "ðŸ‡¦"
 *   –  (U+2013, UTF-8 E2 80 93)    -> "â€“"
 *   ✅ (U+2705, UTF-8 E2 9C 85)    -> "âœ…"
 *
 * This reverses the process: characters that map 1:1 into CP1252 bytes are
 * re-encoded as bytes and decoded as UTF-8 again. Only *valid* UTF-8 prefixes
 * are consumed, so clean text is never altered (any character that cannot be
 * part of the corruption — real emojis, Greek, CJK, etc. — breaks the run and
 * passes through untouched).
 *
 * Usage:
 *   node tools/fix-mojibake.js [--dry-run] [dir...]
 * (defaults to scanning app/)
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');

// CP1252 bytes 0x80-0x9F (undefined slots have no legit mapping)
const CP1252_SPECIAL = {
  0x80: 0x20ac, 0x82: 0x201a, 0x83: 0x0192, 0x84: 0x201e, 0x85: 0x2026,
  0x86: 0x2020, 0x87: 0x2021, 0x88: 0x02c6, 0x89: 0x2030, 0x8a: 0x0160,
  0x8b: 0x2039, 0x8c: 0x0152, 0x8e: 0x017d, 0x91: 0x2018, 0x92: 0x2019,
  0x93: 0x201c, 0x94: 0x201d, 0x95: 0x2022, 0x96: 0x2013, 0x97: 0x2014,
  0x98: 0x02dc, 0x99: 0x2122, 0x9a: 0x0161, 0x9b: 0x203a, 0x9c: 0x0153,
  0x9e: 0x017e, 0x9f: 0x0178,
};
// Undefined CP1252 bytes (0x81, 0x8D, 0x8F, 0x90, 0x9D) survive the corruption
// in one of two forms: as a raw Latin-1/C1 control char (U+0081...U+009D,
// the byte value itself) or as U+FFFD (replacement char). Map both.
const CHAR_TO_BYTE = new Map();
for (const [b, c] of Object.entries(CP1252_SPECIAL)) CHAR_TO_BYTE.set(c, Number(b));
for (let b = 0x80; b <= 0x9f; b++) CHAR_TO_BYTE.set(b, b);
// U+FFFD fallback: 0x8F is the only undefined byte common in the content
// (continuation byte of U+FE0F, i.e. emoji variation selectors "ï¸�").
CHAR_TO_BYTE.set(0xfffd, 0x8f);

function toBytes(ch) {
  const code = ch.codePointAt(0);
  if (CHAR_TO_BYTE.has(code)) return CHAR_TO_BYTE.get(code);
  if (code <= 0x7f || (0xa0 <= code && code <= 0xff)) return code;
  return null; // not part of the corruption
}

// Tolerant decode: walk `bytes` (each from `chars`, the original run), decoding
// every valid UTF-8 sequence and passing anything else through verbatim as the
// original char (bytes 0x80-0xBF may map to CP1252 specials). In a real UTF-8
// file bytes >= 0x80 only occur inside valid sequences, so an undecodable byte
// (e.g. clean “—” mapping to byte 0x97) is clean text: emit it and continue.
// Returns {out, fixed} where fixed counts rewritten source chars.
function decodeBytes(bytes, chars) {
  let out = '';
  let fixed = 0;
  let i = 0;
  const n = bytes.length;
  while (i < n) {
    const b = bytes[i];
    let len;
    if (b < 0x80) len = 1;
    else if ((b & 0xe0) === 0xc0) len = 2;
    else if ((b & 0xf0) === 0xe0) len = 3;
    else if ((b & 0xf8) === 0xf0) len = 4;
    else { out += chars[i]; i++; continue; } // 0x80-0xBF single / 0xC0-0xC1 / 0xF5+
    if (len > 1) {
      if (len === 2 && b < 0xc2) { out += chars[i]; i++; continue; }
      if (i + len > n) { out += chars[i]; i++; continue; }
      let ok = true;
      for (let j = 1; j < len; j++) if ((bytes[i + j] & 0xc0) !== 0x80) { ok = false; break; }
      if (!ok) { out += chars[i]; i++; continue; }
      if (len === 3 && b === 0xe0 && bytes[i + 1] < 0xa0) { out += chars[i]; i++; continue; }
      if (len === 3 && b === 0xed && bytes[i + 1] >= 0xa0) { out += chars[i]; i++; continue; }
      if (len === 4 && (b > 0xf4 || (b === 0xf0 && bytes[i + 1] < 0x90) || (b === 0xf4 && bytes[i + 1] > 0x8f))) { out += chars[i]; i++; continue; }
      let cp;
      if (len === 2) cp = ((b & 0x1f) << 6) | (bytes[i + 1] & 0x3f);
      else if (len === 3) cp = ((b & 0x0f) << 12) | ((bytes[i + 1] & 0x3f) << 6) | (bytes[i + 2] & 0x3f);
      else cp = ((b & 0x07) << 18) | ((bytes[i + 1] & 0x3f) << 12) | ((bytes[i + 2] & 0x3f) << 6) | (bytes[i + 3] & 0x3f);
      out += String.fromCodePoint(cp);
      fixed += len;
      i += len;
    } else {
      out += chars[i];
      i++;
    }
  }
  return { out, fixed };
}

function repair(text) {
  let out = '';
  let run = []; // chars mappable to CP1252 bytes (candidate corruption)
  let fixed = 0;

  // Encodes the pending run back to CP1252 bytes, decodes the longest valid
  // UTF-8 prefix, and writes the result. Characters after a premature stop
  // are kept verbatim, so this is the identity transform on clean text.
  const flush = () => {
    if (!run.length) return;
    const bytes = run.map((c) => toBytes(c));
    const { out: decoded, fixed: rewrote } = decodeBytes(bytes, run);
    out += decoded;
    fixed += rewrote;
    run = [];
  };

  for (const ch of text) {
    const b = toBytes(ch);
    if (b === null) {
      flush();
      out += ch;
    } else {
      run.push(ch);
    }
  }
  flush();
  return { out, fixed };
}

function walk(dir, exts, found) {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, ent.name);
    if (ent.isDirectory()) {
      if (ent.name === 'node_modules' || ent.name === '.next') continue;
      walk(p, exts, found);
    } else if (exts.has(path.extname(ent.name).toLowerCase())) {
      found.push(p);
    }
  }
}

const dryRun = process.argv.includes('--dry-run');
if (process.argv.includes('--test')) {
  const cases = [
    ['ðŸ›¡ï¸\u008F', '🛡️'],                       // shield + VS16 (raw C1)
    ['ðŸ”\u008D', '🔍'],                           // magnifier (raw C1 continuer)
    ['â˜\u0081', '☁'],                             // cloud U+2601 (raw C1)
    ['Â', 'Â'],                                   // truncated 2-byte lead: untouched
    ['Â·', '·'],                                   // U+00C2 U+00B7 is valid UTF-8 for U+00B7 — decodes
    ['Café World', 'Café World'],                 // single-encoded accented text untouched
    ['ðŸ‡¦ðŸ‡«', '🇦🇫'],                            // flag (no undefined bytes)
    ['âœ…', '✅'],                                 // check mark
    ['âœ”ï¸\u008F', '✔️'],                          // heavy check + VS16
    ['â€“', '–'],                                  // en dash
    ['â€”', '—'],                                  // em dash
    ['â€¦', '…'],                                  // ellipsis
    ['ðŸŽµ', '🎵'],                                // note
    ['ðŸŒ', 'ðŸŒ'],                                // truncated sequence: untouched
    ['export const x = 1;', 'export const x = 1;'], // clean text: unchanged
    ['✅ ✔️ –', '✅ ✔️ –'],                          // real emojis/dash: unchanged
    ['name: "Toby"', 'name: "Toby"'],              // ASCII quotes untouched
  ];
  let pass = 0;
  for (const [inp, want] of cases) {
    const { out } = repair(inp);
    const ok = out === want;
    if (ok) pass++;
    else console.log(`FAIL: ${JSON.stringify(inp)} -> ${JSON.stringify(out)} (want ${JSON.stringify(want)})`);
  }
  console.log(`${pass}/${cases.length} unit tests passed`);
  process.exit(pass === cases.length ? 0 : 1);
}
const dirs = process.argv.slice(2).filter((a) => !a.startsWith('--') && fs.existsSync(path.join(ROOT, a)))
  .map((a) => path.join(ROOT, a));
const roots = dirs.length ? dirs : [path.join(ROOT, 'app')];
const exts = new Set(['.tsx', '.ts', '.js', '.css']);

const all = [];
for (const root of roots) walk(root, exts, all);

let totalChars = 0;
let changedFiles = 0;
for (const file of all) {
  const raw = fs.readFileSync(file, 'utf8');
  const { out, fixed } = repair(raw);
  if (!fixed) continue;
  totalChars += fixed;
  changedFiles++;
  const rel = path.relative(ROOT, file);
  if (dryRun) {
    console.log(`${rel}: ${fixed} corrupted char(s) -> will be repaired`);
  } else {
    fs.writeFileSync(file, out);
    console.log(`${rel}: repaired ${fixed} corrupted char(s)`);
  }
}
console.log(`\n${dryRun ? 'DRY RUN — ' : ''}${changedFiles} file(s), ${totalChars} corrupted char(s) total`);