'use strict';
const fs = require('fs');

const raw = fs.readFileSync(0, 'utf8').trimEnd().split('\n');
const N = Number(raw[0].trim());

// 가격표: 공백이 있든 없든 숫자만 뽑아서 사용
const price = Array.from({ length: N }, (_, i) => {
  const s = raw[i + 1].replace(/\s+/g, ''); // 공백 제거
  const row = new Array(N);
  for (let j = 0; j < N; j++) row[j] = s.charCodeAt(j) - 48; // '0'~'9'
  return row;
});

const SIZE = 1 << N;
const INF = 10; // 불가능 표시 (가격은 0~9)

// dp[mask * N + last] = 그 상태에 도달 가능한 "최소 마지막 구매가격"
const dp = new Uint8Array(SIZE * N);
dp.fill(INF);

// 시작: 0번(=1번 예술가)만 소유, 마지막 구매가 0
dp[(1 << 0) * N + 0] = 0;

// popcount 미리 계산
const pop = new Uint8Array(SIZE);
for (let m = 1; m < SIZE; m++) pop[m] = pop[m >> 1] + (m & 1);

let ans = 1;

for (let mask = 0; mask < SIZE; mask++) {
  let reachable = false;

  // 이 mask가 "도달 가능"한지 먼저 확인하면서 전이도 수행
  for (let last = 0; last < N; last++) {
    const curPrice = dp[mask * N + last];
    if (curPrice === INF) continue;

    reachable = true;

    for (let next = 0; next < N; next++) {
      if (mask & (1 << next)) continue; // 이미 소유했던 사람은 재구매 불가

      const p = price[last][next];      // last -> next 판매가
      if (p < curPrice) continue;       // 산 가격보다 싸게 팔면 안 됨

      const nmask = mask | (1 << next);
      const idx = nmask * N + next;

      // 같은 (nmask, next)면 "마지막 가격이 더 작은 것"만 유지하면 됨
      if (p < dp[idx]) dp[idx] = p;
    }
  }

  // ✅ 도달 가능한 mask만 ans 후보
  if (reachable) ans = Math.max(ans, pop[mask]);
}

console.log(String(ans));
