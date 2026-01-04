'use strict';
const fs = require('fs');

const [Ns, Ks] = fs.readFileSync(0, 'utf8').trim().split(/\s+/);
const K = Number(Ks);

const lenN = Ns.length;

// K가 0이라면 (문제는 보통 자연수지만) 어떤 양의 정수도 "서로 다른 숫자 0개"가 불가능
if (K === 0) {
  console.log(-1);
  process.exit(0);
}

// popcount(0~1023) 미리 계산
const pop = Array(1 << 10).fill(0);
for (let m = 1; m < (1 << 10); m++) pop[m] = pop[m >> 1] + (m & 1);

// 길이 L, (필요하면) 하한 boundDigits를 만족하는 최소 수를 찾는다.
// - boundDigits가 null이면 "하한 없음"(길이가 더 길어서 자동으로 N 이상인 경우)
// - boundDigits가 있으면 길이 L == lenN 이고 "N 이상" 제약이 있음
function solveLength(L, boundDigits /* array of digits or null */) {
  // memo[pos][cmp][mask] -> boolean (가능하면 true)
  const memo = new Map(); // key: pos|cmp|mask

  function key(pos, cmp, mask) {
    return (pos << 11) | (cmp << 10) | mask;
  }

  function possible(pos, cmp, mask) {
    const used = pop[mask];
    if (used > K) return false;

    const remaining = L - pos;
    const need = K - used;

    // 남은 자리 수로 K개를 만들 수 없는 경우 빠르게 컷
    // need는 남은 자리 수보다 클 수 없다
    // 또한 새로 만들 수 있는 숫자 종류는 최대 (10-used)개
    if (need < 0) return false;
    if (need > remaining) return false;
    if (need > (10 - used)) return false;

    if (pos === L) return used === K;

    const memoKey = key(pos, cmp, mask);
    if (memo.has(memoKey)) return memo.get(memoKey);

    // 이번 자리에 들어갈 최소 digit
    let startDigit = (pos === 0 ? 1 : 0); // 선행 0 금지
    if (boundDigits && cmp === 0) {
      startDigit = Math.max(startDigit, boundDigits[pos]);
    }

    for (let d = startDigit; d <= 9; d++) {
      // bound가 있고 아직 cmp==0인데 d가 bound보다 작으면 불가
      if (boundDigits && cmp === 0 && d < boundDigits[pos]) continue;

      const nmask = mask | (1 << d);
      if (pop[nmask] > K) continue;

      let ncmp = cmp;
      if (boundDigits && cmp === 0) {
        if (d > boundDigits[pos]) ncmp = 1;
        else ncmp = 0; // d == boundDigits[pos]
      } else {
        // bound가 없거나 이미 더 큰 상태면 계속 자유
        ncmp = 1;
      }

      if (possible(pos + 1, ncmp, nmask)) {
        memo.set(memoKey, true);
        return true;
      }
    }

    memo.set(memoKey, false);
    return false;
  }

  // 실제로 최소 문자열 구성
  if (!possible(0, boundDigits ? 0 : 1, 0)) return null;

  let pos = 0;
  let cmp = boundDigits ? 0 : 1;
  let mask = 0;
  const out = [];

  while (pos < L) {
    let startDigit = (pos === 0 ? 1 : 0);
    if (boundDigits && cmp === 0) {
      startDigit = Math.max(startDigit, boundDigits[pos]);
    }

    for (let d = startDigit; d <= 9; d++) {
      if (boundDigits && cmp === 0 && d < boundDigits[pos]) continue;

      const nmask = mask | (1 << d);
      if (pop[nmask] > K) continue;

      let ncmp = cmp;
      if (boundDigits && cmp === 0) {
        if (d > boundDigits[pos]) ncmp = 1;
        else ncmp = 0;
      } else {
        ncmp = 1;
      }

      if (possible(pos + 1, ncmp, nmask)) {
        out.push(String(d));
        pos++;
        cmp = ncmp;
        mask = nmask;
        break;
      }
    }
  }

  return out.join('');
}

// 1) 길이 L을 작은 것부터 시도
const startLen = Math.max(lenN, K);

let answer = null;
for (let L = startLen; L <= 20; L++) {
  if (L === lenN) {
    // 하한이 N인 경우
    const bound = Ns.split('').map(ch => ch.charCodeAt(0) - 48);
    answer = solveLength(L, bound);
  } else {
    // 길이가 더 길면 자동으로 N 이상이므로 하한 없음
    answer = solveLength(L, null);
  }
  if (answer !== null) break;
}

console.log(answer ?? -1);
