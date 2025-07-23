const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const input = [];

rl.on('line', (line) => {
  input.push(line.trim());
}).on('close', () => {
  const N = parseInt(input[0]);
  const A = input[1].split(' ').map(Number);

  const dp = [...A]; // 초기값은 자기 자신

  for (let i = 1; i < N; i++) {
    for (let j = 0; j < i; j++) {
      if (A[i] > A[j]) {
        dp[i] = Math.max(dp[i], dp[j] + A[i]);
      }
    }
  }

  console.log(Math.max(...dp));
});
