const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim().split('\n');

let idx = 0;
const T = Number(input[idx++]);
const answers = [];

for (let t = 0; t < T; t++) {
  const N = Number(input[idx++]);
  const coins = input[idx++].split(' ').map(Number);
  const M = Number(input[idx++]);

  const dp = Array(M + 1).fill(0);
  dp[0] = 1;

  for (const coin of coins) {
    for (let amount = coin; amount <= M; amount++) {
      dp[amount] += dp[amount - coin];
    }
  }

  answers.push(dp[M].toString());
}

console.log(answers.join('\n'));