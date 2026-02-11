'use strict';

const fs = require('fs');

const input = fs.readFileSync(0, 'utf8').trim().split(/\s+/);
let idx = 0;

const N = Number(input[idx++]);

const xs = new Array(N);
const ys = new Array(N);

for (let i = 0; i < N; i++) {
  xs[i] = BigInt(input[idx++]);
  ys[i] = BigInt(input[idx++]);
}

let sum = 0n;

for (let i = 0; i < N; i++) {
  const j = (i + 1) % N;
  sum += xs[i] * ys[j] - ys[i] * xs[j];
}

if (sum < 0n) sum = -sum; // 절댓값

const intPart = sum / 2n;
const frac = (sum % 2n === 0n) ? '0' : '5';

console.log(intPart.toString() + '.' + frac);
