'use strict';
const fs = require('fs');

const input = fs.readFileSync(0, 'utf8').trim().split('\n');
const [N, M] = input[0].split(' ').map(Number);
const grid = input.slice(1).map(s => s.trim());

function isPerfectSquare(x) {
  if (x < 0) return false;
  const r = Math.floor(Math.sqrt(x));
  return r * r === x;
}

let best = -1;

// 1) 길이 1(한 칸만 선택) 먼저 전부 체크 (N=M=1 같은 케이스를 살림)
for (let r = 0; r < N; r++) {
  for (let c = 0; c < M; c++) {
    const v = grid[r].charCodeAt(c) - 48;
    if (isPerfectSquare(v)) best = Math.max(best, v);
  }
}

// 2) 모든 시작점 + 모든 공차(dr, dc) 탐색
for (let r0 = 0; r0 < N; r0++) {
  for (let c0 = 0; c0 < M; c0++) {
    for (let dr = -(N - 1); dr <= (N - 1); dr++) {
      for (let dc = -(M - 1); dc <= (M - 1); dc++) {
        if (dr === 0 && dc === 0) continue;

        let r = r0, c = c0;
        let num = 0;

        while (r >= 0 && r < N && c >= 0 && c < M) {
          const digit = grid[r].charCodeAt(c) - 48;
          num = num * 10 + digit;

          if (isPerfectSquare(num)) best = Math.max(best, num);

          r += dr;
          c += dc;
        }
      }
    }
  }
}

console.log(best);
