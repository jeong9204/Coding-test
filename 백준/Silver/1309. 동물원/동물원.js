// 실행: node main.js < input.txt
const fs = require('fs');
const N = parseInt(fs.readFileSync(0, 'utf8').trim(), 10);
const MOD = 9901;

// dp[i][*]를 i-1에서 i로 갱신하며 3개 상태만 유지
let a0 = 1; // dp[1][0]
let a1 = 1; // dp[1][1]
let a2 = 1; // dp[1][2]

for (let i = 2; i <= N; i++) {
  const n0 = (a0 + a1 + a2) % MOD;      // dp[i][0]
  const n1 = (a0 + a2) % MOD;            // dp[i][1]
  const n2 = (a0 + a1) % MOD;            // dp[i][2]
  a0 = n0; a1 = n1; a2 = n2;
}

const ans = ((a0 + a1) % MOD + a2) % MOD;
console.log(ans);
