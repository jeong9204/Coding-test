'use strict';

const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim().split(/\s+/).map(Number);

let p = 0;
const N = input[p++];

const L = new Array(N);
const R = new Array(N);
for (let i = 0; i < N; i++) {
  L[i] = input[p++];
  R[i] = input[p++];
}

// skipIndex: 이 시간의 광역기만 "맞아도 되는" 걸로 간주(= 구간 제약 무시)
// skipIndex = -1 이면 아무것도 무시 안 함
function canSurvive(skipIndex) {
  // 시작 위치는 마음대로 가능하므로 매우 큰 구간으로 시작
  // (문제 좌표가 1..1000이고 N<=1000이라 실제로 이렇게 크게 잡아도 안전)
  let lo = -1e15;
  let hi =  1e15;

  for (let i = 0; i < N; i++) {
    // i초 위치는 (i-1)초 위치에서 1만큼만 이동 가능
    if (i > 0) {
      lo -= 1;
      hi += 1;
    }

    // 이번 초를 "무시"하지 않는다면, 광역기 구간 안에 있어야 함
    if (i !== skipIndex) {
      if (lo < L[i]) lo = L[i];
      if (hi > R[i]) hi = R[i];
    }

    // 가능한 구간이 비면 즉시 불가능
    if (lo > hi) return false;
  }

  return true;
}

// 0번 실패로 가능하면 즉시 성공
if (canSurvive(-1)) {
  console.log('World Champion');
  process.exit(0);
}

// 1번 실패(어느 한 초를 무시)로 가능한지 전부 시도
for (let skip = 0; skip < N; skip++) {
  if (canSurvive(skip)) {
    console.log('World Champion');
    process.exit(0);
  }
}

console.log('Surrender');
