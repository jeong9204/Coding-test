// BOJ 행렬 곱셈 순서 (Matrix Chain Multiplication)
// Node.js (DP O(N^3))

const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim().split(/\s+/).map(Number);

let idx = 0;
const N = input[idx++];

const r = new Array(N + 1);
const c = new Array(N + 1);

// 행렬 i의 크기: r[i] x c[i]
for (let i = 1; i <= N; i++) {
  r[i] = input[idx++];
  c[i] = input[idx++];
}

// dp[i][j] = i번째 행렬부터 j번째 행렬까지 곱하는 최소 비용
const dp = Array.from({ length: N + 1 }, () => new Array(N + 1).fill(0));

// 구간 길이 len = 2 ~ N
for (let len = 2; len <= N; len++) {
  for (let i = 1; i <= N - len + 1; i++) {
    const j = i + len - 1;
    let minCost = Number.MAX_SAFE_INTEGER;

    // 중간 분할 지점 k (i <= k < j)
    for (let k = i; k < j; k++) {
      const cost =
        dp[i][k] +
        dp[k + 1][j] +
        r[i] * c[k] * c[j];

      if (cost < minCost) {
        minCost = cost;
      }
    }

    dp[i][j] = minCost;
  }
}

// 전체 행렬 A1 ~ AN을 곱하는 최소 비용
console.log(dp[1][N]);
