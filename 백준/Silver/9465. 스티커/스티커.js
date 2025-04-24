const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const T = +input[0];
let index = 1;

for (let t = 0; t < T; t++) {
  const n = +input[index++];
  const stickers = [
    input[index++].split(' ').map(Number),
    input[index++].split(' ').map(Number),
  ];

  // DP 초기화
  const dp = [
    Array(n).fill(0),
    Array(n).fill(0),
  ];

  // 초기값 설정
  dp[0][0] = stickers[0][0];
  dp[1][0] = stickers[1][0];

  if (n > 1) {
    dp[0][1] = dp[1][0] + stickers[0][1];
    dp[1][1] = dp[0][0] + stickers[1][1];
  }

  // 점화식 적용
  for (let i = 2; i < n; i++) {
    dp[0][i] = Math.max(dp[1][i - 1], dp[1][i - 2]) + stickers[0][i];
    dp[1][i] = Math.max(dp[0][i - 1], dp[0][i - 2]) + stickers[1][i];
  }

  // 마지막 칸 중 더 큰 값이 정답
  console.log(Math.max(dp[0][n - 1], dp[1][n - 1]));
}
