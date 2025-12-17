'use strict';
const fs = require('fs');

const S = fs.readFileSync(0, 'utf8').trim();
const N = S.length;

// 문제에서 준 세그먼트 개수:
// 1..9,0 => 2,5,5,4,5,6,3,7,5,6
// 즉 0:6, 1:2, 2:5, 3:5, 4:4, 5:5, 6:6, 7:3, 8:7, 9:5
const seg = [6, 2, 5, 5, 4, 5, 6, 3, 7, 5];

// 현재 표시의 총 세그먼트 수
let target = 0;
for (const ch of S) target += seg[ch.charCodeAt(0) - 48];

// mod = 10^N
let mod = 1n;
for (let i = 0; i < N; i++) mod *= 10n;

// 현재 값(BigInt) (leading zero 포함 가능)
const cur = BigInt(S);

// possible[len][sum] = len자리로 sum 세그먼트를 만들 수 있는지
const MAX_SUM = 7 * N;
const possible = Array.from({ length: N + 1 }, () => Array(MAX_SUM + 1).fill(false));
possible[0][0] = true;

for (let len = 0; len < N; len++) {
  for (let sum = 0; sum <= MAX_SUM; sum++) {
    if (!possible[len][sum]) continue;
    for (let d = 0; d <= 9; d++) {
      const ns = sum + seg[d];
      if (ns <= MAX_SUM) possible[len + 1][ns] = true;
    }
  }
}

// x를 N자리 문자열로 (0 padding)
function toNDigits(x) {
  let t = x.toString();
  if (t.length < N) t = t.padStart(N, '0');
  return t;
}

// boundStr 이상이면서 세그먼트 합 targetSum인 가장 작은 수를 문자열로 생성
function buildMin(boundStr, targetSum) {
  const boundDigits = Array.from(boundStr, ch => ch.charCodeAt(0) - 48);

  function dfs(pos, rem, tight) {
    const left = N - pos;
    if (rem < 0) return null;
    if (!possible[left][rem]) return null;
    if (pos === N) return rem === 0 ? '' : null;

    const startDigit = tight ? boundDigits[pos] : 0;

    for (let d = startDigit; d <= 9; d++) {
      const rem2 = rem - seg[d];
      const tight2 = tight && (d === startDigit);
      const suffix = dfs(pos + 1, rem2, tight2);
      if (suffix !== null) return String(d) + suffix;
    }
    return null;
  }

  return dfs(0, targetSum, true);
}

// 1) [cur+1 .. mod-1]에서 찾기
let bestStr = null;
if (cur !== mod - 1n) {
  const bound = cur + 1n;
  bestStr = buildMin(toNDigits(bound), target);
}

let answer;
if (bestStr !== null) {
  const y = BigInt(bestStr);
  answer = y - cur;
} else {
  // 2) 없으면 한 바퀴 돌아서 [0..]에서 가장 작은 해 찾기
  const y0Str = buildMin('0'.repeat(N), target);
  const y0 = BigInt(y0Str);
  answer = (mod - cur) + y0;
}

console.log(answer.toString());
