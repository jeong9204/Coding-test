'use strict';
const fs = require('fs');

const input = fs.readFileSync(0, 'utf8').trim().split('\n');
const [N, K] = input[0].trim().split(' ').map(Number);
const s = input[1].trim().split(''); // 배열로 만들어서 햄버거 먹힘 처리하기 쉽게

let ans = 0;

for (let i = 0; i < N; i++) {
  if (s[i] !== 'P') continue;

  // 이 사람이 먹을 수 있는 범위
  const left = Math.max(0, i - K);
  const right = Math.min(N - 1, i + K);

  // 가능한 가장 왼쪽 햄버거부터 찾기
  for (let j = left; j <= right; j++) {
    if (s[j] === 'H') {
      s[j] = 'X';   // 먹힌 햄버거 표시(아무 문자나 H/P 아닌 걸로)
      ans++;
      break;        // 사람은 1개만 먹을 수 있음
    }
  }
}

console.log(ans);