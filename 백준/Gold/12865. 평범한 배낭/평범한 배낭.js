const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const [N, K] = input[0].split(' ').map(Number);
const items = input.slice(1).map(line => line.split(' ').map(Number));

const dp = Array(K + 1).fill(0);

for (let [weight, value] of items) {
    for (let w = K; w >= weight; w--) {
        dp[w] = Math.max(dp[w], dp[w - weight] + value);
    }
}

console.log(dp[K]);
