// BOJ TSP (N<=10) - 비트마스크 DP (Held-Karp)
// 입력: N, 그리고 N줄의 비용 행렬 W
// 출력: 최소 순회 비용

const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim().split(/\s+/).map(Number);

let idx = 0;
const N = input[idx++];

const W = Array.from({ length: N }, () => Array(N));
for (let i = 0; i < N; i++) {
  for (let j = 0; j < N; j++) {
    W[i][j] = input[idx++];
  }
}

const ALL = (1 << N) - 1;
const INF = 1e15;

// 메모이제이션 테이블: dp[city][mask] = 최소 비용 (미방문 시 -1)
const dp = Array.from({ length: N }, () => Array(1 << N).fill(-1));

function solve(city, mask) {
  // 모든 도시 방문 → 시작점(0)으로 돌아가는 비용
  if (mask === ALL) {
    const ret = W[city][0];
    return ret > 0 ? ret : INF;
  }

  let memo = dp[city][mask];
  if (memo !== -1) return memo;

  let best = INF;

  // 다음 방문 도시 선택
  for (let next = 0; next < N; next++) {
    const bit = 1 << next;
    if (mask & bit) continue;          // 이미 방문
    if (W[city][next] === 0) continue; // 길 없음

    const cost = W[city][next] + solve(next, mask | bit);
    if (cost < best) best = cost;
  }

  dp[city][mask] = best;
  return best;
}

// 시작 도시는 0(=1번 도시)로 고정
const answer = solve(0, 1 << 0);
console.log(answer.toString());
