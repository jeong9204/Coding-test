'use strict';
const fs = require('fs');

const input = fs.readFileSync(0, 'utf8').trim().split('\n');
const [N, M] = input[0].trim().split(/\s+/).map(Number);
const rows = input.slice(1, 1 + N).map(s => s.trim());
const K = Number(input[1 + N].trim());

let ans = 0;

// 같은 패턴 카운트를 빠르게 세기 위해 빈도 맵
const freq = new Map();
for (const r of rows) freq.set(r, (freq.get(r) || 0) + 1);

for (const [pattern, count] of freq.entries()) {
  // 이 패턴을 전부 1로 만들기 위해 필요한 뒤집기 수 = 0의 개수
  let zeroCnt = 0;
  for (let i = 0; i < M; i++) {
    if (pattern.charCodeAt(i) === 48) zeroCnt++; // '0'
  }

  // K번 누르되, (K - zeroCnt)가 짝수여야 같은 열을 2번씩 더 눌러 횟수 소모 가능
  if (zeroCnt <= K && ((K - zeroCnt) % 2 === 0)) {
    ans = Math.max(ans, count);
  }
}

console.log(String(ans));
