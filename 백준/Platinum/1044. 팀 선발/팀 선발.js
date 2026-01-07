'use strict';
const fs = require('fs');

const data = fs.readFileSync(0, 'utf8').trim().split(/\s+/);
let p = 0;

const N = Number(data[p++]);
const half = N / 2;

const a = new Array(N);
const b = new Array(N);

for (let i = 0; i < N; i++) a[i] = BigInt(data[p++]);
for (let i = 0; i < N; i++) b[i] = BigInt(data[p++]);

// w[i] = a[i] + b[i], 목표는 sum(w in team1) ≈ B(=sum(b))
const w = new Array(N);
let B = BigInt(0);
for (let i = 0; i < N; i++) {
  w[i] = a[i] + b[i];
  B += b[i];
}

// 반 나누기 (최대 18/18)
const n1 = Math.floor(N / 2);
const n2 = N - n1;
const w1 = w.slice(0, n1);
const w2 = w.slice(n1);

// popcount (n<=18이라 빠르게 가능)
function popcount(x) {
  let c = 0;
  while (x) { x &= (x - 1); c++; }
  return c;
}

// 절댓값 BigInt
function absBig(x) {
  return x < 0n ? -x : x; // (여기만 0n을 쓰면 또 SyntaxError 가능)
}
// -> 위도 안전하게 바꾸자
function absBigSafe(x) {
  return x < BigInt(0) ? -x : x;
}

// 마스크에서 i번째가 선택(팀1)이면 1, 아니면 2
function digitFromMask(mask, i) {
  return ((mask >> i) & 1) ? 1 : 2;
}

// 전체 배치 사전순 비교: (m1A,m2A) vs (m1B,m2B)
function isLexSmaller(m1A, m2A, m1B, m2B) {
  for (let i = 0; i < N; i++) {
    const da = (i < n1) ? digitFromMask(m1A, i) : digitFromMask(m2A, i - n1);
    const db = (i < n1) ? digitFromMask(m1B, i) : digitFromMask(m2B, i - n1);
    if (da !== db) return da < db;
  }
  return false;
}

// 오른쪽 절반 내부에서 사전순 비교(길이 len)
// digit는 (bit=1 -> 1) 가 (bit=0 -> 2)보다 작으므로
// 첫 차이에서 bit=1인 마스크가 더 "사전순 앞".
function isLexSmallerHalf(maskA, maskB, len) {
  for (let i = 0; i < len; i++) {
    const aBit = (maskA >> i) & 1;
    const bBit = (maskB >> i) & 1;
    if (aBit !== bBit) return aBit > bBit; // 1이 더 앞(작음)
  }
  return false;
}

// 부분집합을 cnt별로 묶어서 만들기 (n<=18)
function buildSubsets(weights) {
  const n = weights.length;
  const total = 1 << n;

  // sum[mask] 빠르게: sum[mask] = sum[mask without lsb] + weight[lsbIndex]
  const sum = new Array(total);
  sum[0] = BigInt(0);

  for (let m = 1; m < total; m++) {
    const lsb = m & -m;
    const prev = m ^ lsb;
    const idx = Math.clz32(lsb) ^ 31; // lsb의 bit index (0..31) trick
    sum[m] = sum[prev] + weights[idx];
  }

  const byCnt = Array.from({ length: n + 1 }, () => []);
  for (let m = 0; m < total; m++) {
    const c = popcount(m);
    byCnt[c].push({ sum: sum[m], mask: m });
  }
  return byCnt;
}

const left = buildSubsets(w1);
const rightRaw = buildSubsets(w2);

// 오른쪽: cnt별로 (sum 오름차순) 정렬하고, 같은 sum이면 "오른쪽 내부 사전순 최소 mask"만 남김
const right = Array.from({ length: n2 + 1 }, () => ({ sums: [], masks: [] }));

for (let cnt = 0; cnt <= n2; cnt++) {
  const list = rightRaw[cnt];
  list.sort((u, v) => (u.sum < v.sum ? -1 : u.sum > v.sum ? 1 : 0));

  const sums = [];
  const masks = [];

  let i = 0;
  while (i < list.length) {
    const s = list[i].sum;
    let bestMask = list[i].mask;
    let j = i + 1;
    while (j < list.length && list[j].sum === s) {
      const m = list[j].mask;
      if (isLexSmallerHalf(m, bestMask, n2)) bestMask = m;
      j++;
    }
    sums.push(s);
    masks.push(bestMask);
    i = j;
  }
  right[cnt] = { sums, masks };
}

// lower_bound for BigInt array
function lowerBound(arr, x) {
  let lo = 0, hi = arr.length;
  while (lo < hi) {
    const mid = (lo + hi) >> 1;
    if (arr[mid] < x) lo = mid + 1;
    else hi = mid;
  }
  return lo;
}

let bestDiff = null;      // BigInt
let bestMask1 = 0;
let bestMask2 = 0;

for (let c1 = 0; c1 <= n1; c1++) {
  const c2 = half - c1;
  if (c2 < 0 || c2 > n2) continue;

  const r = right[c2];
  const rSums = r.sums;
  const rMasks = r.masks;
  if (rSums.length === 0) continue;

  for (const { sum: sum1, mask: mask1 } of left[c1]) {
    const target = B - sum1;
    const idx = lowerBound(rSums, target);

    for (const t of [idx - 1, idx]) {
      if (t < 0 || t >= rSums.length) continue;

      const sum2 = rSums[t];
      const mask2 = rMasks[t];
      const diff = absBigSafe((sum1 + sum2) - B);

      if (bestDiff === null || diff < bestDiff) {
        bestDiff = diff;
        bestMask1 = mask1;
        bestMask2 = mask2;
      } else if (diff === bestDiff) {
        if (isLexSmaller(mask1, mask2, bestMask1, bestMask2)) {
          bestMask1 = mask1;
          bestMask2 = mask2;
        }
      }
    }
  }
}

// 출력
const out = [];
for (let i = 0; i < N; i++) {
  const d = (i < n1) ? digitFromMask(bestMask1, i) : digitFromMask(bestMask2, i - n1);
  out.push(String(d));
}
console.log(out.join(' '));
