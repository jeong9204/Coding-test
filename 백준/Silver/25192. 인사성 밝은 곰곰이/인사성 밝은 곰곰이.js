'use strict';

const fs = require('fs');
const lines = fs.readFileSync(0, 'utf8').trim().split('\n');

const N = Number(lines[0]);
let seen = new Set();
let ans = 0;

for (let i = 1; i <= N; i++) {
  const s = lines[i].trim();

  if (s === 'ENTER') {
    // 새로운 사람이 입장 -> 새로운 세션 시작
    seen.clear();
  } else {
    // 닉네임
    if (!seen.has(s)) {
      ans++;
      seen.add(s);
    }
  }
}

console.log(String(ans));
