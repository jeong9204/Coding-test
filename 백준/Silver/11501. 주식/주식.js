// BOJ 11501 - 주식 (메모리 초과 방지 버전)
// 핵심: split 금지(문자열 토큰 폭발) -> Buffer에서 정수 직접 파싱
// 가격은 Int32Array로 저장(메모리 절약), 뒤에서부터 max 유지하며 이익 계산

'use strict';
const fs = require('fs');

const data = fs.readFileSync(0); // Buffer
let idx = 0;
const len = data.length;

function readInt() {
  // 공백/개행 스킵
  while (idx < len) {
    const c = data[idx];
    if (c > 32) break; // ' ' (32) 이하 = 공백류
    idx++;
  }
  let num = 0;
  while (idx < len) {
    const c = data[idx];
    if (c <= 32) break;
    num = num * 10 + (c - 48);
    idx++;
  }
  return num;
}

const T = readInt();
let out = [];

for (let tc = 0; tc < T; tc++) {
  const N = readInt();

  // Int32Array: 1e6개면 약 4MB
  const prices = new Int32Array(N);
  for (let i = 0; i < N; i++) prices[i] = readInt();

  let maxPrice = 0;
  let profit = 0n;

  for (let i = N - 1; i >= 0; i--) {
    const p = prices[i];
    if (p > maxPrice) {
      maxPrice = p;
    } else {
      profit += BigInt(maxPrice - p);
    }
  }

  out.push(profit.toString());
}

process.stdout.write(out.join('\n'));