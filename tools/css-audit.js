const fs = require('fs');
const files = fs.readdirSync('app/components/styles').filter((f) => f.endsWith('.css'));
const perFile = {};
for (const f of files) {
  const c = fs.readFileSync('app/components/styles/' + f, 'utf8');
  const classes = new Set();
  for (const m of c.matchAll(/\.([a-zA-Z_][\w-]*)(?=[\s:,{>~+.)])/g)) {
    if (m[1].match(/^[\d-]/)) continue;
    classes.add(m[1]);
  }
  perFile[f] = classes;
}
const names = Object.keys(perFile);
const collisions = new Map();
for (let i = 0; i < names.length; i++) {
  for (let j = i + 1; j < names.length; j++) {
    for (const cls of perFile[names[i]]) {
      if (perFile[names[j]].has(cls)) {
        if (!collisions.has(cls)) collisions.set(cls, []);
        collisions.get(cls).push(names[i] + ' & ' + names[j]);
      }
    }
  }
}
console.log('Files:', names.join(', '));
console.log('Classes shared across 2+ section files:', collisions.size);
if (collisions.size) {
  const list = [...collisions.entries()].slice(0, 40);
  for (const [c, where] of list) console.log('  .' + c, '->', where.join(', '));
}

const resets = [];
for (const f of names) {
  const c = fs.readFileSync('app/components/styles/' + f, 'utf8');
  if (/(^|\})\s*(body|html|:root)\b/.test(c.replace(/@scope[\s\S]*?\}/g, ''))) {
    resets.push(f);
  }
}
console.log('Files containing body/html/:root resets OUTSIDE @scope:', resets.length ? resets.join(', ') : 'none (all resets are in base.css)');
