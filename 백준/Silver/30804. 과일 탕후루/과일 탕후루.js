'use strict';

const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim().split(/\s+/).map(Number);

let p = 0;
const N = input[p++];
const S = input.slice(p, p + N);

const cnt = new Int32Array(10); // 과일 1~9 카운트
let kinds = 0;                  // 현재 윈도우 내 서로 다른 종류 수

let ans = 0;
let l = 0;

for (let r = 0; r < N; r++) {
  const x = S[r];
  if (cnt[x] === 0) kinds++;
  cnt[x]++;

  // 종류가 2개 초과면 l을 이동해서 줄이기
  while (kinds > 2) {
    const y = S[l];
    cnt[y]--;
    if (cnt[y] === 0) kinds--;
    l++;
  }

  // 지금 윈도우 [l..r]은 항상 종류 <= 2
  const len = r - l + 1;
  if (len > ans) ans = len;
}

console.log(String(ans));
