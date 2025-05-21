const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const N = Number(input[0]);
const prices = input[1].split(' ').map(Number);

const dp = Array(N + 1).fill(0);

// dp[0] = 0 → 카드 0개 사는 건 0원
for (let i = 1; i <= N; i++) {
  for (let j = 1; j <= i; j++) {
    dp[i] = Math.max(dp[i], dp[i - j] + prices[j - 1]);
  }
}

console.log(dp[N]);
