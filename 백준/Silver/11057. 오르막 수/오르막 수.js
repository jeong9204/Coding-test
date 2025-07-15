const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim();
const N = parseInt(input);
const MOD = 10007;

const dp = Array.from({ length: N + 1 }, () => Array(10).fill(0));

// 길이가 1일 때는 각 자리수 0~9가 오르막 수 1개씩 있음
for (let j = 0; j < 10; j++) {
  dp[1][j] = 1;
}

// DP 테이블 채우기
for (let i = 2; i <= N; i++) {
  for (let j = 0; j < 10; j++) {
    for (let k = 0; k <= j; k++) {
      dp[i][j] = (dp[i][j] + dp[i - 1][k]) % MOD;
    }
  }
}

// 정답은 길이 N이고 마지막 자리가 0~9인 모든 경우의 합
let result = 0;
for (let j = 0; j < 10; j++) {
  result = (result + dp[N][j]) % MOD;
}

console.log(result);
