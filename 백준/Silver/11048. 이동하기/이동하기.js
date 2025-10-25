// BOJ 11048 - 이동하기
// Node.js (ECMAScript 2021)

'use strict';
const fs = require('fs');

const tokens = fs.readFileSync(0, 'utf8').trim().split(/\s+/).map(Number);
let p = 0;

const N = tokens[p++];
const M = tokens[p++];

// candy[r][c] (1-based로 쓰면 편하기 때문에 N+1 x M+1 배열 준비)
const candy = Array.from({ length: N + 1 }, () => new Array(M + 1).fill(0));
for (let r = 1; r <= N; r++) {
  for (let c = 1; c <= M; c++) {
    candy[r][c] = tokens[p++];
  }
}

// dp[r][c] = (1,1)에서 (r,c)까지 오면서 먹을 수 있는 사탕의 최대값
const dp = Array.from({ length: N + 1 }, () => new Array(M + 1).fill(0));

for (let r = 1; r <= N; r++) {
  for (let c = 1; c <= M; c++) {
    // 위(r-1,c), 왼쪽(r,c-1), 대각선(r-1,c-1) 중 최대값에 현재 사탕 추가
    const bestPrev = Math.max(
      dp[r - 1][c],
      dp[r][c - 1],
      dp[r - 1][c - 1]
    );
    dp[r][c] = bestPrev + candy[r][c];
  }
}

// 정답은 (N,M)까지 갔을 때 얻을 수 있는 최대 사탕 개수
console.log(dp[N][M].toString());
