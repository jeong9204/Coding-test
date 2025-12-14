// BOJ 1016 제곱 ㄴㄴ 수 (Node.js)
//
// 아이디어: [min, max] 구간에서 i^2( i>=2 )의 배수를 모두 마킹하고,
// 마킹되지 않은 수의 개수를 센다.

'use strict';
const fs = require('fs');

const input = fs.readFileSync(0, 'utf8').trim().split(/\s+/);
let min = BigInt(input[0]);
let max = BigInt(input[1]);

const len = Number(max - min + 1n); // 최대 1,000,001
const marked = new Uint8Array(len); // 0 = 제곱ㄴㄴ 후보, 1 = 제곱수로 나누어떨어짐

// BigInt sqrt (floor)
function isqrt(n) {
  // n >= 0
  if (n < 2n) return n;
  let x = n;
  let y = (x + 1n) >> 1n;
  while (y < x) {
    x = y;
    y = (x + n / x) >> 1n;
  }
  return x;
}

const limit = isqrt(max); // floor(sqrt(max))

for (let i = 2n; i <= limit; i++) {
  const sq = i * i;

  // start = ceil(min / sq) * sq
  let start = (min + sq - 1n) / sq * sq;

  // start부터 sq 간격으로 max까지 마킹
  for (let v = start; v <= max; v += sq) {
    const idx = Number(v - min); // len <= 1,000,001 이라 안전하게 Number로 변환 가능
    marked[idx] = 1;
  }
}

let count = 0;
for (let i = 0; i < len; i++) {
  if (marked[i] === 0) count++;
}

console.log(count.toString());
