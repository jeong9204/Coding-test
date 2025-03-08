const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let input = [];
rl.on('line', (line) => {
  input.push(Number(line));
}).on('close', () => {
  const n = input[0];
  const wine = [0, ...input.slice(1)]; // 1번 인덱스부터 시작하도록 변환

  if (n === 1) {
    console.log(wine[1]); // 포도주가 1개일 경우 그대로 출력
    return;
  }
  
  // DP 테이블 초기화
  const dp = Array(n + 1).fill(0);
  dp[1] = wine[1];
  if (n > 1) dp[2] = wine[1] + wine[2];

  for (let i = 3; i <= n; i++) {
    dp[i] = Math.max(
      dp[i - 1], 
      dp[i - 2] + wine[i], 
      dp[i - 3] + wine[i - 1] + wine[i]
    );
  }

  console.log(dp[n]);
});
