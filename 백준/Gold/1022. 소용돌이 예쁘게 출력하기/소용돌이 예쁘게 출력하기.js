'use strict';
const fs = require('fs');

const [r1, c1, r2, c2] = fs.readFileSync(0, 'utf8').trim().split(/\s+/).map(Number);

function valueAt(r, c) {
  const k = Math.max(Math.abs(r), Math.abs(c));
  if (k === 0) return 1;

  const M = (2 * k + 1) ** 2; // (k,k)에 있는 최대값

  // 아래변: r == k
  if (r === k) {
    return M - (k - c);
  }
  // 왼쪽변: c == -k
  if (c === -k) {
    return M - 2 * k - (k - r);
  }
  // 위변: r == -k
  if (r === -k) {
    return M - 4 * k - (c + k);
  }
  // 오른쪽변: c == k
  // (layer k 위면 반드시 여기에 걸림)
  return M - 6 * k - (r + k);
}

// 1) 값 계산 + 문자열 저장 + 최대 폭 계산
const rows = [];
let maxLen = 0;

for (let r = r1; r <= r2; r++) {
  const line = [];
  for (let c = c1; c <= c2; c++) {
    const vStr = String(valueAt(r, c));
    maxLen = Math.max(maxLen, vStr.length);
    line.push(vStr);
  }
  rows.push(line);
}

// 2) 폭에 맞춰 정렬 후 출력
let out = '';
for (const line of rows) {
  out += line.map(s => s.padStart(maxLen, ' ')).join(' ') + '\n';
}

process.stdout.write(out);
