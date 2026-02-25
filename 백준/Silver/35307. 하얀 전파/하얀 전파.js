'use strict';

const fs = require('fs');
const data = fs.readFileSync(0, 'utf8');
let p = 0;
const L = data.length;

function nextBigInt() {
  while (p < L) {
    const c = data.charCodeAt(p);
    if (c > 32) break;
    p++;
  }
  let num = 0n;
  while (p < L) {
    const c = data.charCodeAt(p);
    if (c <= 32) break;
    num = num * 10n + BigInt(c - 48);
    p++;
  }
  return num;
}

function ceilDiv(a, b) { // a,b >= 0, b > 0
  return (a + b - 1n) / b;
}

const T = Number(nextBigInt());
let out = [];

for (let tc = 0; tc < T; tc++) {
  const N = nextBigInt();
  const M = nextBigInt();
  const Lft = nextBigInt();
  const Rgt = nextBigInt();
  const Up = nextBigInt();
  const Down = nextBigInt();

  // Wmax
  const rowsMax = (Up === 0n && Down === 0n) ? 1n : N;
  const colsMax = (Lft === 0n && Rgt === 0n) ? 1n : M;
  const Wmax = rowsMax * colsMax;

  // TR (세로)
  let TR = 0n;
  if (N === 1n) {
    TR = 0n;
  } else if (Up === 0n && Down === 0n) {
    TR = 0n; // 어차피 1줄만 도달 가능
  } else if (Up === 0n) {
    // 아래로만
    TR = ceilDiv(N - 1n, Down);
  } else if (Down === 0n) {
    // 위로만
    TR = ceilDiv(N - 1n, Up);
  } else {
    // 위/아래 둘 다
    TR = ceilDiv(N - 1n, Up + Down);
  }

  // TC (가로)
  let TC = 0n;
  if (M === 1n) {
    TC = 0n;
  } else if (Lft === 0n && Rgt === 0n) {
    TC = 0n;
  } else if (Lft === 0n) {
    // 오른쪽만
    TC = ceilDiv(M - 1n, Rgt);
  } else if (Rgt === 0n) {
    // 왼쪽만
    TC = ceilDiv(M - 1n, Lft);
  } else {
    // 좌/우 둘 다
    TC = ceilDiv(M - 1n, Lft + Rgt);
  }

  const Tmin = TR + TC;
  out.push(`${Wmax.toString()} ${Tmin.toString()}`);
}

process.stdout.write(out.join('\n'));