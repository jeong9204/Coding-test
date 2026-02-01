'use strict';

const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim().split('\n');

const [Slen, Plen] = input[0].trim().split(' ').map(Number);
const S = input[1].trim();
const need = input[2].trim().split(' ').map(Number); // [A, C, G, T]

// 현재 윈도우의 카운트: [A, C, G, T]
const cnt = [0, 0, 0, 0];

function idxOf(chCode) {
  // 'A'(65), 'C'(67), 'G'(71), 'T'(84)
  if (chCode === 65) return 0;
  if (chCode === 67) return 1;
  if (chCode === 71) return 2;
  return 3; // 84
}

function ok() {
  return (
    cnt[0] >= need[0] &&
    cnt[1] >= need[1] &&
    cnt[2] >= need[2] &&
    cnt[3] >= need[3]
  );
}

// 1) 초기 윈도우 (0..Plen-1) 세팅
for (let i = 0; i < Plen; i++) {
  cnt[idxOf(S.charCodeAt(i))]++;
}

let ans = 0;
if (ok()) ans++;

// 2) 슬라이딩
for (let i = Plen; i < Slen; i++) {
  // 윈도우에서 빠지는 문자: i - Plen
  cnt[idxOf(S.charCodeAt(i - Plen))]--;
  // 윈도우에 새로 들어오는 문자: i
  cnt[idxOf(S.charCodeAt(i))]++;

  if (ok()) ans++;
}

console.log(String(ans));
