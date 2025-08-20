const fs = require('fs');

const tokens = fs.readFileSync(0, 'utf8').trim().split(/\s+/).map(Number);
let p = 0;
const n = tokens[p++], k = tokens[p++];

const coinsRaw = [];
for (let i = 0; i < n; i++) coinsRaw.push(tokens[p++]);

// 1) 중복 제거 + k보다 큰 코인 제거
const coins = [...new Set(coinsRaw)].filter(v => v <= k).sort((a, b) => a - b);

// 2) DP 배열 초기화
const dp = Array(k + 1).fill(Infinity);
dp[0] = 0;

// 3) 무한 배낭: 코인 바깥 루프, 금액은 오름차순
for (const c of coins) {
  for (let x = c; x <= k; x++) {
    if (dp[x - c] + 1 < dp[x]) {
      dp[x] = dp[x - c] + 1;
    }
  }
}

// 4) 결과
console.log(Number.isFinite(dp[k]) ? dp[k] : -1);
