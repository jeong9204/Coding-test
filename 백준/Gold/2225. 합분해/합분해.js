// BOJ 2225 - 합분해 (풀이 1: 2차원 DP)
// 시간: O(N*K), 메모리: O(N*K)

const readline = require('readline');

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
const MOD = 1_000_000_000;

rl.on('line', line => {
  const [N, K] = line.trim().split(/\s+/).map(Number);

  // dp[k][n] = 정수 k개로 합 n을 만드는 경우의 수
  const dp = Array.from({ length: K + 1 }, () => Array(N + 1).fill(0));
  dp[0][0] = 1;                 // 기저

  for (let k = 1; k <= K; k++) {
    dp[k][0] = 1;               // 0을 k번 더하는 한 가지
    for (let n = 1; n <= N; n++) {
      dp[k][n] = (dp[k][n - 1] + dp[k - 1][n]) % MOD;
    }
  }

  console.log(dp[K][N] % MOD);
  rl.close();
});
