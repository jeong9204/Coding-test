// BOJ 25501 - 재귀의 귀재
// Node.js (ECMAScript 2021)

'use strict';
const fs = require('fs');
const lines = fs.readFileSync(0, 'utf8').trim().split('\n');

const T = Number(lines[0].trim());
let out = [];

function recursion(s, l, r, counter) {
  counter.count++; // 호출될 때마다 +1 (첫 호출 포함)
  if (l >= r) return 1;
  if (s[l] !== s[r]) return 0;
  return recursion(s, l + 1, r - 1, counter);
}

function isPalindromeWithCount(s) {
  const counter = { count: 0 };
  const result = recursion(s, 0, s.length - 1, counter);
  return [result, counter.count];
}

for (let i = 1; i <= T; i++) {
  const s = lines[i].trim(); // 대문자 알파벳 문자열
  const [res, cnt] = isPalindromeWithCount(s);
  out.push(res + ' ' + cnt);
}

console.log(out.join('\n'));
