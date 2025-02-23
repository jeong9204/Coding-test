const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let input = [];
rl.on('line', (line) => {
  input.push(line.trim());
}).on('close', () => {
  const n = parseInt(input[0], 10); // n값 읽기 (1 ≤ n ≤ 1,000)
  const MOD = 10007;
  
  // dp[i] : 2×i 직사각형을 채우는 방법의 수
  const dp = new Array(n + 1).fill(0);
  
  // 초기값 설정
  dp[0] = 1;
  dp[1] = 1;
  
  for (let i = 2; i <= n; i++) {
    dp[i] = (dp[i - 1] + 2 * dp[i - 2]) % MOD;
  }
  
  console.log(dp[n]);
});
