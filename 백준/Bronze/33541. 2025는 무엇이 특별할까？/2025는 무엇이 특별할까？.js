'use strict';

const fs = require('fs');
const X = Number(fs.readFileSync(0, 'utf8').trim());

let answer = -1;

for (let y = X + 1; y <= 9999; y++) {
  const a = Math.floor(y / 100);
  const b = y % 100;
  const s = a + b;
  if (s * s === y) {
    answer = y;
    break;
  }
}

console.log(String(answer));
