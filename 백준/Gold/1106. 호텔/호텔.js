const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const input = [];
rl.on('line', line => input.push(line)).on('close', () => {
  const [C, N] = input[0].split(' ').map(Number);
  const cities = input.slice(1).map(line => line.split(' ').map(Number));

  const MAX_CUSTOMER = C + 100; // 충분히 넉넉하게 잡기
  const dp = Array(MAX_CUSTOMER).fill(Infinity);
  dp[0] = 0;

  for (const [cost, customer] of cities) {
    for (let i = customer; i < MAX_CUSTOMER; i++) {
      dp[i] = Math.min(dp[i], dp[i - customer] + cost);
    }
  }

  // C 이상 고객을 모은 경우 중 최소 비용 출력
  let answer = Infinity;
  for (let i = C; i < MAX_CUSTOMER; i++) {
    answer = Math.min(answer, dp[i]);
  }

  console.log(answer);
});
