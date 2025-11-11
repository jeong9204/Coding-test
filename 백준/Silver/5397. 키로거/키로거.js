// BOJ 5397: 키로거
// Node.js (v12+), O(total L) 시간, O(L) 메모리

const fs = require('fs');
const raw = fs.readFileSync(0, 'utf8');

// \r 제거(윈도우 개행 대응), 마지막 개행만 제거
const lines = raw.replace(/\r/g, '').trimEnd().split('\n');
const T = parseInt(lines[0], 10);

const out = [];
for (let i = 1; i <= T; i++) {
  const s = lines[i] || ''; // 각 테스트 케이스 문자열
  const left = [];
  const right = [];

  // 문자열을 char 배열로 복사하지 않고 직접 순회 (메모리 절약)
  for (const ch of s) {
    if (ch === '-') {
      if (left.length) left.pop();
    } else if (ch === '<') {
      if (left.length) right.push(left.pop());
    } else if (ch === '>') {
      if (right.length) left.push(right.pop());
    } else {
      left.push(ch);
    }
  }

  // 결과: left + reverse(right)
  // 문자열로 바로 합쳐서 중간 배열 생성 최소화
  out.push(left.join('') + right.reverse().join(''));
}

console.log(out.join('\n'));
