/**
 * phase2-extract.js
 * One-time migration tool: decomposes combined.html (the authoritative merged
 * page) into Next.js components.
 *
 * Outputs (under app/components/):
 *   - styles/base.css            design system + nav/hero/all-platforms CSS
 *   - styles/km{2..10}.css       per-section @scope CSS blocks (verbatim)
 *   - Navbar.tsx, Hero.tsx, AllPlatforms.tsx, SectionKm{2..10}.tsx
 *   - scripts/km1Nav.js, km1Hero.js, km1Platforms.js, km{2..10}.js
 *                                verbatim JS segments wrapped in run*()
 *
 * Usage: node tools/phase2-extract.js
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const read = (f) => fs.readFileSync(path.join(ROOT, f), 'utf8');
const write = (f, s) => {
  const p = path.join(ROOT, f);
  fs.mkdirSync(path.dirname(p), { recursive: true });
  fs.writeFileSync(p, s);
};

// Source of truth is the frozen snapshot in legacy/.
const html = read('legacy/combined.html');

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

function camelDash(name) {
  return name.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
}

const VOID_TAGS = new Set(['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'source', 'track', 'wbr']);

const ATTR_RENAMES = {
  class: 'className',
  'classname': 'className',
  for: 'htmlFor',
  tabindex: 'tabIndex',
  maxlength: 'maxLength',
  readonly: 'readOnly',
  autocomplete: 'autoComplete',
  autofocus: 'autoFocus',
  autoplay: 'autoPlay',
  colspan: 'colSpan',
  rowspan: 'rowSpan',
  cellpadding: 'cellPadding',
  cellspacing: 'cellSpacing',
  frameborder: 'frameBorder',
  allowfullscreen: 'allowFullScreen',
  enctype: 'encType',
  srcdoc: 'srcDoc',
  'http-equiv': 'httpEquiv',
  contenteditable: 'contentEditable',
  spellcheck: 'spellCheck',
};

function reactAttrName(name) {
  if (name.startsWith('data-') || name.startsWith('aria-')) return name;
  if (ATTR_RENAMES[name]) return ATTR_RENAMES[name];
  if (name.includes('-')) return camelDash(name);
  return name;
}

function decodeEntities(value) {
  return value
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;/g, "'")
    .replace(/&nbsp;/g, '\u00a0')
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(parseInt(n, 10)));
}

function quoteAttr(value) {
  if (value.includes('"')) {
    return "'" + value.replace(/'/g, "\\'") + "'";
  }
  return '"' + value + '"';
}

function cssToStyleObject(cssText) {
  const decls = [];
  for (const d of splitTop(cssText, ';')) {
    const t = d.trim();
    if (!t) continue;
    const idx = t.indexOf(':');
    if (idx === -1) {
      decls.push(t + ': ""');
      continue;
    }
    const prop = camelDash(t.slice(0, idx).trim());
    let val = t.slice(idx + 1).trim();
    if (val.includes('"')) val = val.replace(/"/g, "'");
    decls.push(prop + ": '" + val + "'");
  }
  return decls.join(', ');
}

// --------------------------------------------------------------- HTML -> JSX
function parseAttrs(s) {
  const attrs = [];
  let i = 0;
  while (i < s.length) {
    while (i < s.length && /\s/.test(s[i])) i++;
    if (i >= s.length) break;
    let name = '';
    while (i < s.length && !/[\s=]/.test(s[i])) {
      name += s[i];
      i++;
    }
    let value = null;
    while (i < s.length && /\s/.test(s[i])) i++;
    if (s[i] === '=') {
      i++;
      while (i < s.length && /\s/.test(s[i])) i++;
      if (s[i] === '"' || s[i] === "'") {
        const q = s[i];
        i++;
        let v = '';
        while (i < s.length && s[i] !== q) {
          v += s[i];
          i++;
        }
        i++;
        value = v;
      } else {
        let v = '';
        while (i < s.length && !/\s/.test(s[i])) {
          v += s[i];
          i++;
        }
        value = v;
      }
    }
    attrs.push({ name, value });
  }
  return attrs;
}

function convertTag(tag) {
  if (tag.startsWith('</')) return tag;
  const m = tag.match(/^<([a-zA-Z][\w-]*)([\s\S]*?)>$/);
  if (!m) return tag;
  const name = m[1];
  const attrs = parseAttrs(m[2]);
  const out = [];
  for (const a of attrs) {
    const rn = reactAttrName(a.name);
    if (a.value === null) {
      out.push(rn);
    } else if (a.name === 'style') {
      out.push('style={{ ' + cssToStyleObject(a.value) + ' }}');
    } else {
      out.push(rn + '=' + quoteAttr(decodeEntities(a.value)));
    }
  }
  const selfClose = VOID_TAGS.has(name) ? ' /' : '';
  return '<' + name + (out.length ? ' ' + out.join(' ') : '') + selfClose + '>';
}

function convertText(text) {
  const escaped = text.replace(/'/g, '&apos;').replace(/>/g, '&gt;');
  if (!/\n/.test(escaped)) return escaped;
  const leading = /^\s+/.test(escaped);
  const trailing = /\s+$/.test(escaped);
  const core = escaped.replace(/\s+/g, ' ').trim();
  if (!core) return '';
  return (leading ? ' ' : '') + core + (trailing ? ' ' : '');
}

function htmlToJsx(body) {
  const out = [];
  const rest = body.replace(/<!--[\s\S]*?-->/g, '');
  let i = 0;
  while (i < rest.length) {
    const lt = rest.indexOf('<', i);
    if (lt === -1) {
      const t = convertText(rest.slice(i));
      if (t) out.push(t);
      break;
    }
    if (lt > i) {
      const t = convertText(rest.slice(i, lt));
      if (t) out.push(t);
    }
    if (/<[a-zA-Z/!]/.test(rest[lt] + (rest[lt + 1] || ''))) {
      let j = lt + 1;
      let quote = null;
      while (j < rest.length) {
        const ch = rest[j];
        if (quote) {
          if (ch === quote) quote = null;
        } else if (ch === '"' || ch === "'") {
          quote = ch;
        } else if (ch === '>') {
          break;
        }
        j++;
      }
      out.push(convertTag(rest.slice(lt, j + 1)));
      i = j + 1;
    } else {
      out.push(rest.slice(lt, lt + 1));
      i = lt + 1;
    }
  }
  return out.join('');
}

// -------------------------------------------------------------- extraction
function balancedExtract(text, openIdx) {
  const tagRe = /<\/?([a-zA-Z][\w-]*)\b[^>]*>/g;
  tagRe.lastIndex = openIdx;
  let m = tagRe.exec(text);
  if (!m || m[0].startsWith('</')) throw new Error('not an open tag at ' + openIdx);
  const tag = m[1];
  let depth = 1;
  while ((m = tagRe.exec(text))) {
    const isClose = m[0].startsWith('</');
    if (m[1] === tag) {
      if (isClose) {
        depth--;
        if (depth === 0) return text.slice(openIdx, m.index + m[0].length);
      } else if (!m[0].endsWith('/>')) {
        depth++;
      }
    }
  }
  throw new Error('unbalanced <' + tag + '> from ' + openIdx);
}

function stripOuterTag(block) {
  return block.slice(block.indexOf('>') + 1, block.lastIndexOf('<'));
}

// --- CSS: base + @scope blocks
const styleOpen = html.indexOf('<style>');
const styleClose = html.indexOf('</style>');
const css = html.slice(styleOpen + '<style>'.length, styleClose);

const scopes = [];
{
  const re = /@scope\s*\(\s*\.(km\d+-section)\s*\)/g;
  let m;
  while ((m = re.exec(css))) {
    const openIdx = css.indexOf('{', m.index);
    let depth = 1;
    let i = openIdx + 1;
    while (depth > 0) {
      const ch = css[i];
      if (ch === '{') depth++;
      else if (ch === '}') depth--;
      i++;
    }
    scopes.push({ name: m[1], start: m.index, end: i, css: css.slice(m.index, i) });
    re.lastIndex = i;
  }
}
if (scopes.length !== 9) throw new Error('expected 9 @scope blocks, got ' + scopes.length);

const baseCss = css.slice(0, scopes[0].start);
for (let i = 0; i < scopes.length; i++) {
  const gap = css.slice(scopes[i].end, scopes[i + 1] ? scopes[i + 1].start : css.length).replace(/\/\*[\s\S]*?\*\//g, '');
  if (gap.trim()) throw new Error('unexpected CSS between scopes at index ' + i + ': ' + gap.slice(0, 80));
}

// --- body parts
const navBlock = balancedExtract(html, html.indexOf('<nav class="navbar">'));
const heroBlock = balancedExtract(html, html.indexOf('<section class="hero">'));
const platformsBlock = balancedExtract(html, html.indexOf('<section class="all-platforms">'));

const PARTS = [
  { file: 'Navbar', className: 'navbar', tag: 'nav', script: 'km1Nav', hook: 'useNavbar', css: null, block: navBlock },
  { file: 'Hero', className: 'hero', tag: 'section', script: 'km1Hero', hook: 'useGsapSection', css: null, block: heroBlock },
  { file: 'AllPlatforms', className: 'all-platforms', tag: 'section', script: 'km1Platforms', hook: 'useGsapSection', css: null, block: platformsBlock },
];

{
  const kmRe = /class="km(\d+)-section"/g;
  const seen = new Set();
  let m;
  let cursor = platformsBlock.length > 0 ? html.indexOf('<section class="all-platforms">') + platformsBlock.length : 0;
  while ((m = kmRe.exec(html))) {
    const num = m[1];
    if (seen.has(num)) continue;
    const idx = html.indexOf('<div class="km' + num + '-section">');
    if (idx === -1) throw new Error('missing wrapper for km' + num);
    const block = balancedExtract(html, idx);
    if (block.indexOf('<div class="km' + num + '-section">') !== 0) throw new Error('bad km' + num + ' wrapper');
    const scope = scopes.find((s) => s.name === 'km' + num + '-section');
    if (!scope) throw new Error('no css scope for km' + num);
    PARTS.push({
      file: 'SectionKm' + num,
      className: 'km' + num + '-section',
      tag: 'div',
      script: 'km' + num,
      hook: 'useGsapSection',
      css: 'km' + num,
      block,
      scope,
    });
    seen.add(num);
  }
}

// --- scripts
const scriptStart = html.indexOf('/* ==================== js/main.js');
const scriptEnd = html.lastIndexOf('</script>');
const scriptsAll = html.slice(scriptStart, scriptEnd);

const scriptMarkers = [];
{
  const re = /\/\*\s*=+\s*index(\d+)\.html \(km(\d+)\) scripts\s*=+\s*\*\//g;
  let m;
  while ((m = re.exec(scriptsAll))) scriptMarkers.push({ num: m[2], start: m.index + m[0].length });
}

function sliceSegment(fromIdx, toIdx) {
  return scriptsAll.slice(fromIdx, toIdx).trim();
}

// km1 (js/main.js): strip the leading registerPlugin line, split into 3 parts
{
  const km1Body = sliceSegment(0, scriptMarkers[0].start);
  const regLine = 'gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);';
  const ri = km1Body.indexOf(regLine);
  if (ri === -1) throw new Error('registerPlugin line not found in km1');
  const afterRegister = km1Body.slice(ri + regLine.length).trim();

  const heroMarker = '// HERO ENTRANCE ANIMATIONS';
  const platMarker = '// PLATFORM VERTICAL SCROLL (All Platforms)';
  const heroIdx = afterRegister.indexOf(heroMarker);
  const platIdx = afterRegister.indexOf(platMarker);
  if (heroIdx === -1 || platIdx === -1) throw new Error('km1 split markers not found');

  const km1Nav = afterRegister.slice(0, heroIdx).trim();
  const km1Hero = afterRegister.slice(heroIdx, platIdx).trim();
  const km1Platforms = afterRegister.slice(platIdx).trim();
  writeScript('km1Nav', km1Nav);
  writeScript('km1Hero', km1Hero);
  writeScript('km1Platforms', km1Platforms);
}

for (let i = 0; i < scriptMarkers.length; i++) {
  const seg = sliceSegment(scriptMarkers[i].start, i + 1 < scriptMarkers.length ? scriptMarkers[i + 1].start : scriptsAll.length);
  writeScript('km' + scriptMarkers[i].num, seg);
}

function writeScript(name, body) {
  if (!body.trim()) throw new Error('empty script segment: ' + name);
  const fn = 'run' + name[0].toUpperCase() + name.slice(1);
  const wrapped =
    '/* Extracted verbatim from combined.html by tools/phase2-extract.js - do not hand-edit. */\n' +
    'export function ' + fn + '(gsap, ScrollTrigger, MotionPathPlugin) {\n' +
    body + '\n' +
    '}\n';
  write('app/components/scripts/' + name + '.js', wrapped);
}

// ------------------------------------------------------------------ write
function componentSource(part) {
  const lines = [];
  lines.push("'use client';");
  lines.push('');
  const fn = 'run' + part.script[0].toUpperCase() + part.script.slice(1);
  if (part.hook === 'useGsapSection') {
    lines.push("import { useRef } from 'react';");
  }
  if (part.css) lines.push("import './styles/" + part.css + ".css';");
  if (part.hook === 'useGsapSection') {
    lines.push("import { useGsapSection } from './hooks/useGsapSection';");
    lines.push("import { " + fn + " } from './scripts/" + part.script + "';");
  } else {
    lines.push("import { useNavbar } from './hooks/useNavbar';");
  }
  lines.push('');
  lines.push('export default function ' + part.file + '() {');
  if (part.hook === 'useGsapSection') {
    lines.push('  const ref = useRef<HTMLDivElement>(null);');
    lines.push('  useGsapSection(' + fn + ', ref);');
  } else {
    lines.push('  useNavbar();');
  }
  lines.push('');
  lines.push('  return (');
  if (part.hook === 'useGsapSection') {
    lines.push('    <' + part.tag + ' className="' + part.className + '" ref={ref}>');
  } else {
    lines.push('    <' + part.tag + ' className="' + part.className + '">');
  }
  const body = htmlToJsx(stripOuterTag(part.block));
  lines.push(
    body
      .split('\n')
      .map((l) => '      ' + l)
      .join('\n')
  );
  lines.push('    </' + part.tag + '>');
  lines.push('  );');
  lines.push('}');
  return lines.join('\n') + '\n';
}

function stripOuterTag(block) {
  return block.slice(block.indexOf('>') + 1, block.lastIndexOf('<'));
}

// Rewrite relative css url() refs (./x.png) to public-root (/x.png), since the
// extracted css now lives in app/components/styles/ while assets live in public/.
function rewriteCssUrls(cssText) {
  return cssText.replace(
    /url\(\s*(?:'|")?(?:\.\/)?([^'")\s]+?\.(?:png|jpe?g|gif|svg|webp|ico))(?:\s*|'|")?\)/gi,
    (m, file) => 'url(/' + file + ')'
  );
}

// base css (design system + nav/hero/all-platforms)
write('app/components/styles/base.css', '/* Extracted verbatim from combined.html by tools/phase2-extract.js - do not hand-edit. */\n' + rewriteCssUrls(baseCss.trim()) + '\n');
for (const s of scopes) {
  const name = s.name.replace('-section', '');
  write('app/components/styles/' + name + '.css', '/* Extracted verbatim from combined.html by tools/phase2-extract.js - do not hand-edit. */\n' + rewriteCssUrls(s.css) + '\n');
}

for (const part of PARTS) {
  write('app/components/' + part.file + '.tsx', componentSource(part));
}

// ------------------------------------------------------------------ checks
const allBodies = PARTS.map((p) => p.block).join('');
const ids = [...allBodies.matchAll(/id="([\w-]+)"/g)].map((x) => x[1]);
const dupIds = ids.filter((x, i) => ids.indexOf(x) !== i);
console.log('Components:', PARTS.map((p) => p.file).join(', '));
console.log('Scope blocks:', scopes.map((s) => s.name).join(', '));
if (dupIds.length) console.log('WARNING duplicate ids:', [...new Set(dupIds)]);
else console.log('IDs: unique across page');

const imgRefs = new Set();
for (const p of PARTS) {
  const body = p.block;
  for (const m of body.matchAll(/src="([^"]+)"/g)) {
    const ref = m[1];
    if (!/^(https?:\/\/|data:|#|$)/.test(ref) && !ref.includes('${')) imgRefs.add(ref);
  }
}
const missing = [];
for (const r of imgRefs) {
  if (!fs.existsSync(path.join(ROOT, 'public', r))) missing.push(r);
}
if (missing.length) console.log('WARNING img srcs missing in public/:', missing);
else console.log('img srcs: all local refs resolve to public/ (' + imgRefs.size + ')');

// verify each extracted component body still references its wrapper class at least once
for (const p of PARTS) {
  const jsx = componentSource(p);
  if (jsx.indexOf('className="' + p.className + '"') === -1) throw new Error('wrapper class missing for ' + p.file);
}
console.log('Wrapper classes: all present');
console.log('Done. Output under app/components/');
