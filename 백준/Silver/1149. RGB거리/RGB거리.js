const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let n = 0;
let costs = [];
let index = 0;

rl.on("line", (line) => {
  if (index === 0) {
    n = parseInt(line.trim());
  } else {
    costs.push(line.split(" ").map(Number));
  }
  index++;

  if (index === n + 1) {
    rl.close();

    // DP 배열 초기화
    const dp = Array.from({ length: n }, () => Array(3).fill(0));

    // 첫 번째 집의 비용을 초기화
    dp[0][0] = costs[0][0];
    dp[0][1] = costs[0][1];
    dp[0][2] = costs[0][2];

    // DP 계산
    for (let i = 1; i < n; i++) {
      dp[i][0] = costs[i][0] + Math.min(dp[i - 1][1], dp[i - 1][2]); // 빨강
      dp[i][1] = costs[i][1] + Math.min(dp[i - 1][0], dp[i - 1][2]); // 초록
      dp[i][2] = costs[i][2] + Math.min(dp[i - 1][0], dp[i - 1][1]); // 파랑
    }

    // 최솟값 계산
    const result = Math.min(dp[n - 1][0], dp[n - 1][1], dp[n - 1][2]);
    console.log(result);
  }
});
