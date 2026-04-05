const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim().split('\n');

let idx = 0;
const T = Number(input[idx++]);

const MAX_N = 100;
const dp = Array(MAX_N + 1).fill(0n);

dp[0] = 1n;

for (let n = 3; n <= MAX_N; n++) {
  dp[n] = dp[n - 3] * 2n;
}

const answers = [];

for (let t = 0; t < T; t++) {
  const N = Number(input[idx++]);
  answers.push(dp[N].toString());
}

console.log(answers.join('\n'));