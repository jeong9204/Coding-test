'use strict';
const fs = require('fs');

const N = Number(fs.readFileSync(0, 'utf8').trim());

function countDigitsToN(n) {
  const res = Array(10).fill(0);

  for (let factor = 1; factor <= n; factor *= 10) {
    const lower = n % factor;
    const cur = Math.floor(n / factor) % 10;
    const higher = Math.floor(n / (factor * 10));

    // 1~9 처리
    for (let d = 1; d <= 9; d++) {
      if (cur > d) {
        res[d] += (higher + 1) * factor;
      } else if (cur === d) {
        res[d] += higher * factor + (lower + 1);
      } else {
        res[d] += higher * factor;
      }
    }

    // 0 처리 (선행 0 제외 보정)
    if (higher === 0) continue; // 이 자리에서는 0을 세면 전부 선행 0이 됨

    if (cur === 0) {
      res[0] += (higher - 1) * factor + (lower + 1);
    } else {
      res[0] += (higher - 1) * factor + factor;
    }
  }

  return res;
}

const ans = countDigitsToN(N);
console.log(ans.join(' '));
