'use strict';

const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim().split(/\s+/).map(Number);

const N = input[0];
const K = input[1];

const board = Array.from({ length: N }, () => Array(N).fill(0));

const mid = Math.floor(N / 2);
let r = mid;
let c = mid;

board[r][c] = 1;

let ansR = (K === 1) ? r + 1 : -1;
let ansC = (K === 1) ? c + 1 : -1;

// 방향: 위, 오른, 아래, 왼
const dr = [-1, 0, 1, 0];
const dc = [0, 1, 0, -1];

let dir = 0;      // 현재 방향 인덱스
let stepLen = 1;  // 이번에 이동할 칸 수(1,1,2,2,3,3...)

let num = 2;
while (num <= N * N) {
  // stepLen은 같은 길이를 2번 반복해야 함
  for (let repeat = 0; repeat < 2; repeat++) {
    for (let s = 0; s < stepLen; s++) {
      r += dr[dir];
      c += dc[dir];

      board[r][c] = num;

      if (num === K) {
        ansR = r + 1; // 1-indexed
        ansC = c + 1;
      }

      num++;
      if (num > N * N) break;
    }
    dir = (dir + 1) % 4; // 다음 방향으로 회전
    if (num > N * N) break;
  }
  stepLen++;
}

let out = [];
for (let i = 0; i < N; i++) {
  out.push(board[i].join(' '));
}
out.push(`${ansR} ${ansC}`);

console.log(out.join('\n'));
