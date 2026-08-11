const fs = require('fs');
const files = fs.readdirSync('app/components/styles').filter((f) => f.endsWith('.css') && f !== 'base.css');
let total = 0;
for (const f of files) {
  const c = fs.readFileSync('app/components/styles/' + f, 'utf8');
  const m = c.replace(/\s+$/, '').match(/@scope\s*\([^)]*\)\s*\{([\s\S]*)\}$/);
  if (!m) { console.log(f, ': NO @scope block!'); continue; }
  const inner = m[1];
  const lines = inner.split('\n');
  const hits = [];
  lines.forEach((l, i) => {
    if (/^\s*(body|html|:root)(::?[\w-]+)?(\s*,\s*(body|html|:root)(::?[\w-]+)?)*\s*\{/.test(l)) {
      hits.push({ line: i + 1, text: l.trim() });
    }
  });
  console.log(f + ': ' + hits.length + ' body/html/:root rules inside @scope');
  for (const h of hits) console.log('   L' + h.line + ': ' + h.text);
  total += hits.length;
}
console.log('TOTAL:', total);
