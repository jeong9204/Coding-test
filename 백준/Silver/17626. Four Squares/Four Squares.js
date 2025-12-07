// BOJ 17626 - Four Squares
// Node.js DP 풀이: dp[i] = i를 제곱수 합으로 나타낼 때 최소 개수

const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const n = Number(input);

const dp = new Array(n + 1).fill(0);

// dp[0] = 0 (이미 0으로 초기화되어 있음)
// dp[i] = min(dp[i - j*j] + 1) for all j with j*j <= i

for (let i = 1; i <= n; i++) {
  let min = Number.MAX_SAFE_INTEGER;

  // i에서 뺄 수 있는 모든 제곱수 j*j를 시도
  for (let j = 1; j * j <= i; j++) {
    const sq = j * j;
    const candidate = dp[i - sq] + 1;
    if (candidate < min) {
      min = candidate;
    }
  }

  dp[i] = min;
}

console.log(dp[n]);
