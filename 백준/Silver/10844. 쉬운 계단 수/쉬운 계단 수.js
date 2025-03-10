const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.on('line', (line) => {
  const N = Number(line);
  const MOD = 1_000_000_000;

  // DP 테이블 초기화
  const dp = Array.from(Array(N + 1), () => Array(10).fill(0));

  // 초기값 설정 (1자리 계단 수는 1개씩)
  for (let i = 1; i <= 9; i++) {
    dp[1][i] = 1;
  }

  // DP 테이블 채우기
  for (let i = 2; i <= N; i++) {
    for (let j = 0; j <= 9; j++) {
      if (j > 0) dp[i][j] += dp[i - 1][j - 1] % MOD; // 이전 자리수가 j-1인 경우
      if (j < 9) dp[i][j] += dp[i - 1][j + 1] % MOD; // 이전 자리수가 j+1인 경우
      dp[i][j] %= MOD; // 나머지 연산
    }
  }

  // 결과 계산
  let result = 0;
  for (let j = 0; j <= 9; j++) {
    result = (result + dp[N][j]) % MOD;
  }

  console.log(result);
});
