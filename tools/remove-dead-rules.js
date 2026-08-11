/**
 * remove-dead-rules.js
 * Deletes dead body/html/:root rules that live INSIDE @scope blocks.
 * Inside `@scope (.kmX-section)`, body/html/:root are ancestors of the scope
 * root, so such selectors never match — they are leftovers from when each
 * section was a standalone HTML page.
 *
 * Usage: node tools/remove-dead-rules.js
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const DIR = path.join(ROOT, 'app', 'components', 'styles');

const DEAD_RE = /^(body|html|:root)(::?[\w-]+|\([^)]*\))*(?:\s*,\s*(body|html|:root)(::?[\w-]+|\([^)]*\))*)*$/;

function removeDeadRules(css) {
  const scopeStart = css.indexOf('@scope');
  const scopeEnd = css.lastIndexOf('}');
  if (scopeStart === -1 || scopeEnd === -1) return css;

  const before = css.slice(0, scopeStart);
  const headerEnd = css.indexOf('{', scopeStart) + 1;
  const header = css.slice(scopeStart, headerEnd);
  const inner = css.slice(headerEnd, scopeEnd);
  const after = css.slice(scopeEnd + 1);

  const lines = inner.split('\n');
  const out = [];
  let i = 0;
  let removed = 0;
  while (i < lines.length) {
    const line = lines[i];
    // rule header starts at brace depth 0 (top level of the scope block)
    if (/^\s*[^@\s}]/.test(line)) {
      // accumulate header until a line containing '{'
      let j = i;
      let headerText = '';
      while (j < lines.length && !lines[j].includes('{')) {
        headerText += lines[j];
        j++;
      }
      if (j < lines.length) {
        headerText += lines[j];
        const sel = headerText.slice(0, headerText.indexOf('{')).trim();
        if (DEAD_RE.test(sel)) {
          // consume balanced block
          let depth = 1;
          let k = j + 1;
          while (k < lines.length && depth > 0) {
            const opens = (lines[k].match(/{/g) || []).length;
            const closes = (lines[k].match(/}/g) || []).length;
            depth += opens - closes;
            k++;
          }
          if (depth !== 0) throw new Error('unbalanced block in ' + sel);
          removed++;
          i = k;
          continue;
        }
      }
      out.push(line);
      i++;
      continue;
    }
    out.push(line);
    i++;
  }
  return before + header + out.join('\n') + after;
}

let total = 0;
for (const f of fs.readdirSync(DIR)) {
  if (!f.endsWith('.css') || f === 'base.css') continue;
  const p = path.join(DIR, f);
  const orig = fs.readFileSync(p, 'utf8');
  const cleaned = removeDeadRules(orig);
  if (cleaned !== orig) {
    fs.writeFileSync(p, cleaned);
    console.log(f + ': cleaned (-' + (orig.length - cleaned.length) + ' chars)');
    total++;
  }
}
console.log('Cleaned files: ' + total);
