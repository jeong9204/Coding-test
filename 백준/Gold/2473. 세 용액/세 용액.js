'use strict';
const fs = require('fs');

const input = fs.readFileSync(0, 'utf8').trim().split(/\s+/);
let idx = 0;

const N = Number(input[idx++]);
const a = new Array(N);
for (let i = 0; i < N; i++) a[i] = Number(input[idx++]);

a.sort((x, y) => x - y);

let bestAbs = Infinity;
let ans1 = 0, ans2 = 0, ans3 = 0;

for (let i = 0; i < N - 2; i++) {
  let l = i + 1;
  let r = N - 1;

  while (l < r) {
    const sum = a[i] + a[l] + a[r];
    const abs = Math.abs(sum);

    if (abs < bestAbs) {
      bestAbs = abs;
      ans1 = a[i];
      ans2 = a[l];
      ans3 = a[r];
      if (bestAbs === 0) break; // 0이면 최적
    }

    if (sum > 0) r--;
    else l++;
  }

  if (bestAbs === 0) break;
}

console.log(`${ans1} ${ans2} ${ans3}`);