const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];
rl.on("line", (line) => {
  input.push(line);
}).on("close", () => {
  const n = parseInt(input[0], 10); // 계단 개수
  const scores = input.slice(1).map(Number); // 각 계단의 점수

  // DP 배열 선언
  const dp = Array(n).fill(0);

  // 초기값 설정
  dp[0] = scores[0]; // 첫 번째 계단 점수
  if (n > 1) dp[1] = scores[0] + scores[1]; // 첫 번째 + 두 번째 계단 점수
  if (n > 2) dp[2] = Math.max(scores[0] + scores[2], scores[1] + scores[2]); // 두 가지 경우 비교

  // DP 점화식 계산
  for (let i = 3; i < n; i++) {
    dp[i] = Math.max(
      dp[i - 2] + scores[i], // 전전 계단에서 오는 경우
      dp[i - 3] + scores[i - 1] + scores[i] // 전 계단을 밟고 전전 계단을 건너뛰는 경우
    );
  }

  // 마지막 계단의 최댓값 출력
  console.log(dp[n - 1]);
});
