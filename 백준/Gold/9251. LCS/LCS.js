const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const str1 = input[0];
const str2 = input[1];

const n = str1.length;
const m = str2.length;

// 2차원 배열 dp[n+1][m+1] 초기화 (모두 0으로)
const dp = Array.from({ length: n + 1 }, () => Array(m + 1).fill(0));

// DP 테이블 채우기
for (let i = 0; i < n; i++) {
  for (let j = 0; j < m; j++) {
    if (str1[i] === str2[j]) {
      dp[i + 1][j + 1] = dp[i][j] + 1;
    } else {
      dp[i + 1][j + 1] = Math.max(dp[i][j + 1], dp[i + 1][j]);
    }
  }
}

console.log(dp[n][m]);
