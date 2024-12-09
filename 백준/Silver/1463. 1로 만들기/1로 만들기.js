function minOperationsToOne(N) {
  // dp 배열 생성 (dp[i]는 i를 1로 만들기 위한 최소 연산 횟수를 저장)
  const dp = new Array(N + 1).fill(0);

  for (let i = 2; i <= N; i++) {
    // 기본적으로 이전 숫자에서 1을 뺀 경우
    dp[i] = dp[i - 1] + 1;

    // 2로 나누어 떨어지는 경우
    if (i % 2 === 0) {
      dp[i] = Math.min(dp[i], dp[i / 2] + 1);
    }

    // 3으로 나누어 떨어지는 경우
    if (i % 3 === 0) {
      dp[i] = Math.min(dp[i], dp[i / 3] + 1);
    }
  }

  return dp[N];
}

// 테스트
const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim();
const N = parseInt(input, 10);
console.log(minOperationsToOne(N));
