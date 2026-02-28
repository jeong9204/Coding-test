'use strict';
const fs = require('fs');

const input = fs.readFileSync(0, 'utf8').trim().split(/\s+/);
let idx = 0;

const H = Number(input[idx++]); // 사실 계산에 직접 쓰이진 않지만 입력 형식상 받음
const W = Number(input[idx++]);

const height = new Array(W);
for (let i = 0; i < W; i++) height[i] = Number(input[idx++]);

// 1) 왼쪽 최대 높이
const Lmax = new Array(W);
let cur = 0;
for (let i = 0; i < W; i++) {
  if (height[i] > cur) cur = height[i];
  Lmax[i] = cur;
}

// 2) 오른쪽 최대 높이
const Rmax = new Array(W);
cur = 0;
for (let i = W - 1; i >= 0; i--) {
  if (height[i] > cur) cur = height[i];
  Rmax[i] = cur;
}

// 3) 각 칸에 고이는 물 합산
let ans = 0;
for (let i = 0; i < W; i++) {
  const waterLevel = Math.min(Lmax[i], Rmax[i]);
  const w = waterLevel - height[i];
  if (w > 0) ans += w;
}

console.log(ans);