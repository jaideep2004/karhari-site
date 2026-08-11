/**
 * build-index.js
 * Merges index.html + index2/3/4/6/5.html into a single-page index.html.
 * - Scopes each section's CSS under a unique wrapper id (backgrounds unified to
 *   the page's animated nebula so the page reads as one continuous flow).
 * - Dedupes Google Fonts, drops per-section GSAP script tags, keeps inline
 *   scripts (with scoped selectors where class names collided across sections).
 *
 * Usage: node tools/build-index.js
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const read = (f) => fs.readFileSync(path.join(ROOT, f), 'utf8');
const write = (f, s) => fs.writeFileSync(path.join(ROOT, f), s);

// Merge order: index.html, index2, index3, index4, index6, index5
const SECTIONS = [
  { file: 'index2.html', id: 'km2' },
  { file: 'index3.html', id: 'km3' },
  { file: 'index4.html', id: 'km4' },
  { file: 'index6.html', id: 'km6' },
  { file: 'index5.html', id: 'km5' }
];

// JS selectors that collided across sections — scoped to the owning section.
const JS_SCOPE_FIXES = {
  km3: { '.tagline': '#km3 .tagline' },
  km5: {
    '.stat-icon': '#km5 .stat-icon',
    '.ic': '#km5 .ic',
    '.play': '#km5 .play',
    '.btn-outline': '#km5 .btn-outline'
  }
};

// Full-section containers whose OPAQUE background must be dropped so every
// section shows the shared page nebula (like sections 1-2). ::before texture
// overlays are left untouched.
const BG_STRIP = {
  km3: ['.km3-hero'],
  km4: ['.cid-section'],
  km6: ['.details-section']
};

// Containers whose top padding is zeroed so the .page-section spacing of
// 90px (same as section 2) stays uniform between sections.
const PAD_TOP_ZERO = {
  km4: ['.cid-section'],
  km6: ['.details-section'],
  km5: ['.wrap']
};

// Strip previously merged section markup from a body string. Sections may
// contain nested <section>...</section> tags, so close tags are matched by
// counting open/close depth.
function stripSections(body) {
  let result = body;
  const startRe = /<section class="page-section" id="km\d">/g;
  let m;
  while ((m = startRe.exec(result))) {
    const openIdx = m.index;
    const openLen = m[0].length;
    let depth = 1;
    const tokenRe = /<\/section>|<section\b/g;
    let t;
    let endIdx = -1;
    while ((t = tokenRe.exec(result))) {
      if (t.index < openIdx + openLen) continue;
      if (t[0] === '</section>') {
        depth--;
        if (depth === 0) {
          endIdx = t.index;
          break;
        }
      } else {
        depth++;
      }
    }
    if (endIdx === -1) throw new Error('Unbalanced section markup in base body');
    result = result.slice(0, openIdx) + result.slice(endIdx + '</section>'.length);
  }
  return result;
}

// ---------------------------------------------------------------- CSS utils

function splitTop(str, sep) {
  const parts = [];
  let depth = 0;
  let cur = '';
  for (let i = 0; i < str.length; i++) {
    const ch = str[i];
    if (ch === '(' || ch === '[' || ch === '{') depth++;
    else if (ch === ')' || ch === ']' || ch === '}') depth--;
    if (ch === sep && depth === 0) {
      parts.push(cur);
      cur = '';
    } else {
      cur += ch;
    }
  }
  parts.push(cur);
  return parts;
}

function transformSelector(sel, id) {
  const s = sel.trim();
  if (!s) return s;
  if (s === ':root') return '#' + id;
  if (s === '*') return '#' + id + ' *';
  if (/^(body|html)(?=[:\s]|$)/.test(s)) {
    return s.replace(/^(body|html)/, '#' + id);
  }
  if (s.startsWith(':')) return '#' + id + ' ' + s;
  return '#' + id + ' ' + s;
}

function isBodyish(sel) {
  return /^(body|html|:root)(?=[:\s]|$)/.test(sel.trim());
}

// Strip background* declarations (unifies every section onto the page nebula).
function filterBackgroundDecls(body) {
  return splitTop(body, ';')
    .filter((d) => {
      const t = d.trim();
      return !(t && /^background[^:]*:/.test(t));
    })
    .join(';');
}

// For rules derived from body/html resets: drop background* and padding* so the
// wrapper's spacing is owned by .page-section (padding: 90px 0 0).
function filterBodyResets(body) {
  return splitTop(body, ';')
    .filter((d) => {
      const t = d.trim();
      return !(t && (/^background[^:]*:|^padding[^:]*:/.test(t)));
    })
    .join(';');
}

// Rewrite padding shorthands so the TOP value becomes 0 (spacing is owned by
// .page-section). Drops padding-top declarations entirely.
function zeroTopPadding(body) {
  return splitTop(body, ';')
    .map((d) => {
      const t = d.trim();
      if (!t) return d;
      const m = t.match(/^(padding(?![a-z-]))\s*:\s*(.*)$/);
      if (!m) return d;
      const vals = m[2].split(/\s+/).filter(Boolean);
      if (vals.length === 1) return m[1] + ': 0';
      if (vals.length === 2) return m[1] + ': 0 ' + vals[1];
      if (vals.length === 3) return m[1] + ': 0 ' + vals[1] + ' ' + vals[2];
      return m[1] + ': 0 ' + vals[1] + ' ' + vals[2] + ' ' + vals[3];
    })
    .filter((d) => !/^\s*padding-top\s*:/.test(d))
    .join(';');
}

/**
 * Scope a section's CSS under `#id`. Recurse into @media/@supports, rename
 * @keyframes names (and their animation refs) to be globally unique.
 */
function scopeCss(css, id, renames) {
  const out = [];
  const rn = renames || new Map();
  const n = css.length;
  let i = 0;

  function findBlockEnd(open) {
    let depth = 1;
    let j = open;
    while (j < n) {
      const ch = css[j];
      if (ch === '"' || ch === "'") {
        const q = ch;
        j++;
        while (j < n && css[j] !== q) j++;
        j++;
        continue;
      }
      if (ch === '/' && css[j + 1] === '*') {
        const e = css.indexOf('*/', j + 2);
        j = e === -1 ? n : e + 2;
        continue;
      }
      if (ch === '{') depth++;
      else if (ch === '}') {
        depth--;
        if (depth === 0) return j;
      }
      j++;
    }
    throw new Error('Unbalanced CSS braces in #' + id);
  }

  while (i < n) {
    const open = css.indexOf('{', i);
    if (open === -1) {
      out.push(css.slice(i));
      break;
    }
    const close = findBlockEnd(open + 1);
    const pre = css.slice(i, open).replace(/\/\*[\s\S]*?\*\//g, '').trim();
    const body = css.slice(open + 1, close);

    if (/^@(media|supports|container|document)\b/.test(pre)) {
      out.push('\n' + pre + ' {\n' + scopeCss(body, id, rn) + '\n}\n');
    } else if (/^@keyframes\b/.test(pre)) {
      const m = pre.match(/^@keyframes\s+([\w-]+)/);
      if (m) {
        const newName = id + '-' + m[1];
        rn.set(m[1], newName);
        out.push('\n@keyframes ' + newName + ' {\n' + body + '\n}\n');
      } else {
        out.push('\n' + pre + ' {\n' + body + '\n}\n');
      }
    } else if (/^@/.test(pre)) {
      out.push('\n' + pre + ' {\n' + body + '\n}\n');
    } else {
      const sels = splitTop(pre, ',');
      const cleanSels = sels.map((s) => s.trim());
      const bodyish = cleanSels.some(isBodyish);
      const stripBg = bodyish || cleanSels.some((s) => (BG_STRIP[id] || []).includes(s));
      const zeroTop = cleanSels.some((s) => (PAD_TOP_ZERO[id] || []).includes(s));
      const transformed = cleanSels.map((s) => transformSelector(s, id));
      const deduped = [...new Set(transformed)].filter(Boolean);
      let processedBody = body;
      if (bodyish) processedBody = filterBodyResets(processedBody);
      else if (stripBg) processedBody = filterBackgroundDecls(processedBody);
      if (zeroTop) processedBody = zeroTopPadding(processedBody);
      out.push('\n' + deduped.join(',\n') + ' {\n' + processedBody + '\n}\n');
    }
    i = close + 1;
  }

  let result = out.join('');
  for (const [from, to] of rn) {
    result = result.replace(
      new RegExp('(animation(?:-name)?\\s*:\\s*)' + from.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '(?=[\\s,;{])', 'g'),
      '$1' + to
    );
  }
  return result;
}

// ----------------------------------------------------------- section parsing

function extractSection(section) {
  const html = read(section.file);

  const styles = [];
  let m;
  const styleRe = /<style[^>]*>([\s\S]*?)<\/style>/g;
  while ((m = styleRe.exec(html))) styles.push(m[1]);
  const scopedCss = styles.map((css) => scopeCss(css, section.id)).join('\n');

  const scripts = [];
  const scriptRe = /<script(?![^>]*src)[^>]*>([\s\S]*?)<\/script>/g;
  while ((m = scriptRe.exec(html))) scripts.push(m[1]);

  const fixes = JS_SCOPE_FIXES[section.id] || {};
  const fixedScripts = scripts.map((s) => {
    let out = s;
    for (const [from, to] of Object.entries(fixes)) {
      out = out.split('"' + from + '"').join('"' + to + '"');
      out = out.split("'" + from + "'").join("'" + to + "'");
    }
    return out;
  });

  let body = html.slice(html.indexOf('<body'), html.lastIndexOf('</body>'));
  body = body.replace(/<body[^>]*>/, '');
  body = body.replace(/<style[^>]*>[\s\S]*?<\/style>/g, '');
  body = body.replace(/<script[^>]*>[\s\S]*?<\/script>/g, '');
  body = body.replace(/<link[^>]*>/g, '').replace(/<meta[^>]*>/g, '').replace(/<title>[\s\S]*?<\/title>/g, '');

  return {
    id: section.id,
    scopedCss,
    scripts: fixedScripts,
    body: body.trim()
  };
}

// ------------------------------------------------------------------- build

function build() {
  const base = read('index.html');
  const bodyStart = base.indexOf('<body>');
  const bodyEnd = base.lastIndexOf('</body>');
  let baseBody = base.slice(bodyStart + '<body>'.length, bodyEnd);

  // Strip previously merged sections (idempotent rebuilds)
  baseBody = stripSections(baseBody);
  // Strip leftover merged inline scripts and markers from earlier builds
  baseBody = baseBody.replace(/<script(?![^>]*src)[^>]*>[\s\S]*?<\/script>/g, '');
  baseBody = baseBody.replace(/<!-- ==================== SECTION \(from .*?\) ==================== -->\s*/g, '');
  baseBody = baseBody.replace(/\n\s*<!-- Scripts -->\s*/g, '');

  const baseScripts = [];
  let m;
  const scriptRe = /<script[^>]*>[\s\S]*?<\/script>/g;
  while ((m = scriptRe.exec(baseBody))) baseScripts.push(m[0]);
  baseBody = baseBody.replace(/<script[^>]*>[\s\S]*?<\/script>/g, '');

  const sections = SECTIONS.map(extractSection);

  const pageStyles = `
  <style id="page-section-style">
    .page-section {
      position: relative;
      padding: 90px 0 0;
      content-visibility: auto;
      contain-intrinsic-size: auto 1800px;
    }
  </style>
  `;
  const sectionStyles = sections
    .map((s) => `<style id="${s.id}-styles">\n${s.scopedCss}\n  </style>`)
    .join('\n');

  const sectionMarkup = sections
    .map((s) => `\n  <!-- ==================== SECTION (from ${s.file}) ==================== -->\n  <section class="page-section" id="${s.id}">\n${s.body}\n  </section>\n`)
    .join('\n');

  const mergedScripts = sections
    .map((s) => s.scripts.map((sc) => `<script>\n${sc}\n  </script>`).join('\n'))
    .join('\n');

  // Refuse to build on top of an already-merged base
  if (/class="page-section"/.test(baseBody)) {
    throw new Error('index.html already contains merged sections in body. Rebuild from a pristine base.');
  }

  const out =
    base.slice(0, base.indexOf('<head>')) +
    '<head>\n' +
    base
      .slice(base.indexOf('<head>') + '<head>'.length, base.indexOf('</head>'))
      .replace(/<style id="km\d-styles">[\s\S]*?<\/style>\s*/g, '')
      .replace(/<style id="page-section-style">[\s\S]*?<\/style>\s*/g, '') +
    pageStyles +
    sectionStyles +
    '\n</head>\n<body>\n' +
    baseBody +
    sectionMarkup +
    '\n  <!-- Scripts -->\n' +
    baseScripts.join('\n') +
    '\n' +
    mergedScripts +
    '\n</body>\n</html>\n';

  // ------------------------------------------------------------ sanity checks
  const counts = (re) => (out.match(re) || []).length;
  const sectionOpen = counts(/<section\b/g);
  const sectionClose = counts(/<\/section>/g);
  const scriptOpen = counts(/<script\b/g);
  const scriptClose = counts(/<\/script>/g);
  const styleOpen = counts(/<style\b/g);
  const styleClose = counts(/<\/style>/g);
  if (sectionOpen !== sectionClose) throw new Error('UNBALANCED sections: ' + sectionOpen + '/' + sectionClose);
  if (scriptOpen !== scriptClose) throw new Error('UNBALANCED scripts: ' + scriptOpen + '/' + scriptClose);
  if (styleOpen !== styleClose) throw new Error('UNBALANCED styles: ' + styleOpen + '/' + styleClose);
  if (scriptOpen !== baseScripts.length + sections.reduce((a, s) => a + s.scripts.length, 0)) {
    throw new Error('script count mismatch: expected ' + (baseScripts.length + sections.reduce((a, s) => a + s.scripts.length, 0)) + ' got ' + scriptOpen);
  }

  write('index.html', out);

  // ------------------------------------------------------------- verify
  const ids = [...out.matchAll(/id="([\w-]+)"/g)].map((x) => x[1]);
  const dupIds = ids.filter((x, i) => ids.indexOf(x) !== i);
  console.log('Wrote index.html (' + (out.length / 1024).toFixed(1) + ' KB)');
  console.log('Section order:', sections.map((s) => s.id + ' (' + s.file + ')').join(' -> '));
  if (dupIds.length) console.log('WARNING duplicate ids:', [...new Set(dupIds)]);
  else console.log('IDs: unique across page');

  const allIds = new Set(ids);
  const missing = [];
  for (const s of sections) {
    for (const sc of s.scripts) {
      for (const q of sc.matchAll(/getElementById\(["'`]([\w-]+)["'`]\)/g)) {
        if (!allIds.has(q[1])) missing.push(s.id + ': ' + q[1]);
      }
    }
  }
  if (missing.length) console.log('WARNING getElementById targets missing:', missing);
  else console.log('getElementById targets: all present');
}

build();
