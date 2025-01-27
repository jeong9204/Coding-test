const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];
rl.on("line", (line) => {
  input.push(line);
}).on("close", () => {
  const N = parseInt(input[0]); // 수열의 크기
  const A = input[1].split(" ").map(Number); // 수열 A

  // dp 배열을 초기화합니다. dp[i]는 A[i]를 마지막 원소로 하는 가장 긴 증가하는 부분 수열의 길이를 의미합니다.
  const dp = Array(N).fill(1);

  // 가장 긴 증가하는 부분 수열의 길이를 찾습니다.
  for (let i = 1; i < N; i++) {
    for (let j = 0; j < i; j++) {
      if (A[j] < A[i]) {
        dp[i] = Math.max(dp[i], dp[j] + 1);
      }
    }
  }

  // dp 배열에서 최댓값이 가장 긴 증가하는 부분 수열의 길이입니다.
  const longest = Math.max(...dp);
  console.log(longest);
});
