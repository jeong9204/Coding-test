const readline = require('readline');

// 입력받기
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on('line', (line) => {
  const n = parseInt(line.trim(), 10);
  const MOD = 10007;

  // DP 배열 초기화
  const dp = new Array(n + 1).fill(0);

  // 초기값 설정
  dp[1] = 1;
  if (n > 1) dp[2] = 2;

  // 점화식 적용: dp[i] = dp[i-1] + dp[i-2]
  for (let i = 3; i <= n; i++) {
    dp[i] = (dp[i - 1] + dp[i - 2]) % MOD;
  }

  // 결과 출력
  console.log(dp[n]);
  rl.close();
});
