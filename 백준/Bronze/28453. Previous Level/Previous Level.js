const fs = require('fs');

const input = fs.readFileSync(0, 'utf8').trim().split(/\s+/).map(Number);
let idx = 0;

const N = input[idx++];
const levels = input.slice(idx, idx + N);

const res = levels.map(m => {
  if (m === 300) return 1;
  if (m >= 275) return 2;
  if (m >= 250) return 3;
  return 4;
});

console.log(res.join(' '));
