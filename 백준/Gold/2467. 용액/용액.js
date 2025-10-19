// BOJ 2470 - 두 용액
// Node.js (ECMAScript 2021)

'use strict';
const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim().split(/\s+/).map(Number);

let idx = 0;
const N = input[idx++];
const A = input.slice(idx, idx + N); // 이미 오름차순 정렬로 주어짐

let l = 0, r = N - 1;
let bestAbs = Infinity;
let ansL = A[l], ansR = A[r];

while (l < r) {
  const sum = A[l] + A[r];
  const absSum = Math.abs(sum);

  if (absSum < bestAbs) {
    bestAbs = absSum;
    ansL = A[l];
    ansR = A[r];
    if (bestAbs === 0) break; // 더 좋을 수 없음: 조기 종료
  }

  if (sum < 0) {
    l++; // 합을 키워서 0에 더 가깝게
  } else {
    r--; // 합을 줄여서 0에 더 가깝게
  }
}

console.log(ansL + ' ' + ansR);
