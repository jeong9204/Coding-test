'use strict';

const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim().split(/\s+/);

let idx = 0;
const N = Number(input[idx++]);

const pos = new Array(N);
for (let i = 0; i < N; i++) pos[i] = Number(input[idx++]);

function gcd(a, b) {
  while (b !== 0) {
    const t = a % b;
    a = b;
    b = t;
  }
  return a;
}

// 1) 인접 간격들의 gcd 구하기
let D = pos[1] - pos[0];
for (let i = 2; i < N; i++) {
  D = gcd(D, pos[i] - pos[i - 1]);
}

// 2) 각 구간마다 추가 나무 수 합산
let answer = 0;
for (let i = 1; i < N; i++) {
  const gap = pos[i] - pos[i - 1];
  answer += (gap / D) - 1;
}

console.log(String(answer));
