const readline = require("readline");

// 입력 및 출력 처리
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];
rl.on("line", (line) => {
  input.push(line.trim());
}).on("close", () => {
  const T = parseInt(input[0]); // 테스트 케이스 수
  const results = [];

  // 모든 테스트 케이스 처리
  for (let t = 0; t < T; t++) {
    const k = parseInt(input[2 * t + 1]); // 층 수
    const n = parseInt(input[2 * t + 2]); // 호 수

    // DP 배열 초기화 (k층까지 계산)
    const dp = Array.from({ length: k + 1 }, () => Array(n + 1).fill(0));

    // 0층 초기화
    for (let i = 1; i <= n; i++) {
      dp[0][i] = i;
    }

    // DP 계산 (1층부터 k층까지)
    for (let floor = 1; floor <= k; floor++) {
      for (let room = 1; room <= n; room++) {
        dp[floor][room] = dp[floor][room - 1] + dp[floor - 1][room];
      }
    }

    // 결과 저장
    results.push(dp[k][n]);
  }

  // 출력
  console.log(results.join("\n"));
});
