'use strict';
const fs = require('fs');

const [s, N, K, R1, R2, C1, C2] = fs.readFileSync(0, 'utf8').trim().split(/\s+/).map(Number);

const start = (N - K) / 2;
const end = start + K - 1;

function isBlack(r, c) {
  for (let t = 0; t < s; t++) {
    const rr = r % N;
    const cc = c % N;
    if (rr >= start && rr <= end && cc >= start && cc <= end) return true;
    r = Math.floor(r / N);
    c = Math.floor(c / N);
  }
  return false;
}

let out = '';
for (let r = R1; r <= R2; r++) {
  let line = '';
  for (let c = C1; c <= C2; c++) {
    line += isBlack(r, c) ? '1' : '0';
  }
  out += line + '\n';
}

process.stdout.write(out);
