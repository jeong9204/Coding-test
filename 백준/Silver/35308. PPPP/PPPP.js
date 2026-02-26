'use strict';

const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim().split(/\s+/);
let idx = 0;

const T = Number(input[idx++]);
let out = [];

for (let tc = 0; tc < T; tc++) {
  const N = Number(input[idx++]);
  const K = Number(input[idx++]);

  if (N === 1) {
    // K는 1일 수밖에 없음
    out.push('1');
    continue;
  }

  if (K !== 2) {
    out.push('-1');
    continue;
  }

  // 유일한 해: 2 3 4 ... N 1
  let arr = new Array(N);
  for (let i = 0; i < N - 1; i++) arr[i] = String(i + 2);
  arr[N - 1] = '1';
  out.push(arr.join(' '));
}

console.log(out.join('\n'));