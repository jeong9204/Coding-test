const readline = require('readline');
const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

let N = 0, K = 0;
rl.on('line', (line) => {
  const [n, k] = line.trim().split(' ').map(Number);
  N = n; K = k;
  rl.close();
}).on('close', () => {
  const MOD = 10007;

  // 대칭성 활용: C(N, K) = C(N, N-K)
  K = Math.min(K, N - K);

  // dp[j] = 현재 행에서 C(i, j)
  const dp = Array(K + 1).fill(0);
  dp[0] = 1; // C(i, 0) = 1

  for (let i = 1; i <= N; i++) {
    // 뒤에서 앞으로 갱신: dp[j] = dp[j] + dp[j-1]
    const upper = Math.min(i, K);
    for (let j = upper; j >= 1; j--) {
      dp[j] = (dp[j] + dp[j - 1]) % MOD;
    }
    // dp[0]은 항상 1 (C(i,0)=1). 이미 1이라 따로 건드릴 필요 없음.
  }

  console.log(dp[K] % MOD);
});
