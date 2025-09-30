// 3×N 타일 채우기 - DP
// 실행: node main.js < input.txt

const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const N = Number(input);

if (N % 2 === 1) {
  // 홀수 폭은 불가능
  console.log(0);
  process.exit(0);
}

// dp[n]: 3×n 보드를 채우는 경우의 수
const dp = new Array(N + 1).fill(0);
dp[0] = 1;
if (N >= 2) dp[2] = 3;

for (let n = 4; n <= N; n += 2) {
  dp[n] = 4 * dp[n - 2] - dp[n - 4];
}

console.log(dp[N]);
