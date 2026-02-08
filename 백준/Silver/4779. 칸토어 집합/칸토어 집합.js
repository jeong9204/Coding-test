'use strict';

const fs = require('fs');
const lines = fs.readFileSync(0, 'utf8').trim().split(/\s+/);

function cantor(n) {
  if (n === 0) return '-';
  const prev = cantor(n - 1);
  const spaces = ' '.repeat(3 ** (n - 1));
  return prev + spaces + prev;
}

const out = [];
for (const s of lines) {
  const n = Number(s);
  out.push(cantor(n));
}

console.log(out.join('\n'));
