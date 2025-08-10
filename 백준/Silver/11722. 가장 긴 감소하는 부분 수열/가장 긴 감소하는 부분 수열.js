// BOJ 11722 - 가장 긴 감소하는 부분 수열 (O(N^2))
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const input = [];
rl.on('line', (line) => input.push(line.trim()));
rl.on('close', () => {
  const N = Number(input[0]);
  const A = input[1].split(' ').map(Number);

  const dp = Array(N).fill(1);
  let ans = 0;

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < i; j++) {
      if (A[j] > A[i]) {
        // j에서 i로 이어 붙여 감소 수열을 만들 수 있을 때
        dp[i] = Math.max(dp[i], dp[j] + 1);
      }
    }
    ans = Math.max(ans, dp[i]);
  }

  console.log(ans);
});
