'use strict';
const fs = require('fs');

const input = fs.readFileSync(0, 'utf8').trim().split(/\s+/);
let p = 0;

const N = BigInt(input[p++]);
const A = BigInt(input[p++]);
const B = BigInt(input[p++]);
const C = BigInt(input[p++]);
const D = BigInt(input[p++]);
const E = BigInt(input[p++]);
const F = BigInt(input[p++]);

const faces = [A, B, C, D, E, F];

// N=1 특수 처리: 5면만 보이므로 (전체합 - 최대값)
if (N === 1n) {
  let sum = 0n;
  let mx = 0n;
  for (const v of faces) {
    sum += v;
    if (v > mx) mx = v;
  }
  console.log(String(sum - mx));
  process.exit(0);
}

// 1면 최소
let min1 = faces[0];
for (const v of faces) if (v < min1) min1 = v;

// 인접한 2면 조합(12개) - 입력 순서 (A,B,C,D,E,F) 기준
// 마주보는 면: A-F, B-E, C-D
const twoPairs = [
  [A, B], [A, C], [A, D], [A, E],
  [F, B], [F, C], [F, D], [F, E],
  [B, C], [B, D],
  [E, C], [E, D],
];
let min2 = twoPairs[0][0] + twoPairs[0][1];
for (const [x, y] of twoPairs) {
  const s = x + y;
  if (s < min2) min2 = s;
}

// 꼭짓점 3면 조합(8개)
const threeTriples = [
  [A, B, C], [A, B, D], [A, E, C], [A, E, D],
  [F, B, C], [F, B, D], [F, E, C], [F, E, D],
];
let min3 = threeTriples[0][0] + threeTriples[0][1] + threeTriples[0][2];
for (const [x, y, z] of threeTriples) {
  const s = x + y + z;
  if (s < min3) min3 = s;
}

// 개수 계산 (BigInt)
const n = N; // BigInt
const threeCnt = 4n;
const twoCnt = 8n * n - 12n;
const oneCnt = (n - 2n) * (n - 2n) + 4n * (n - 2n) * (n - 1n);

const ans = min3 * threeCnt + min2 * twoCnt + min1 * oneCnt;
console.log(String(ans));
