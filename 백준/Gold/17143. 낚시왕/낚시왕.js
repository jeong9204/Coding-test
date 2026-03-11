'use strict';

const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim().split(/\s+/).map(Number);

let idx = 0;
const R = input[idx++];
const C = input[idx++];
const M = input[idx++];

// 상어 정보 저장
// { r, c, s, d, z, alive }
const sharks = [];

for (let i = 0; i < M; i++) {
  const r = input[idx++] - 1; // 0-index
  const c = input[idx++] - 1;
  const s = input[idx++];
  const d = input[idx++];
  const z = input[idx++];

  sharks.push({ r, c, s, d, z, alive: true });
}

let answer = 0;

// 상어 이동 함수
function moveShark(shark) {
  let { r, c, s, d } = shark;

  // 세로 이동
  if (d === 1 || d === 2) {
    const cycle = (R - 1) * 2;
    let move = cycle === 0 ? 0 : s % cycle;

    while (move--) {
      if (d === 1) { // 위
        if (r === 0) {
          d = 2;
          r++;
        } else {
          r--;
        }
      } else { // 아래
        if (r === R - 1) {
          d = 1;
          r--;
        } else {
          r++;
        }
      }
    }
  }
  // 가로 이동
  else {
    const cycle = (C - 1) * 2;
    let move = cycle === 0 ? 0 : s % cycle;

    while (move--) {
      if (d === 4) { // 왼쪽
        if (c === 0) {
          d = 3;
          c++;
        } else {
          c--;
        }
      } else { // 오른쪽
        if (c === C - 1) {
          d = 4;
          c--;
        } else {
          c++;
        }
      }
    }
  }

  shark.r = r;
  shark.c = c;
  shark.d = d;
}

// 낚시왕이 0열부터 C-1열까지 이동
for (let kingCol = 0; kingCol < C; kingCol++) {
  // 1) 현재 열에서 가장 위의 상어 잡기
  let target = -1;
  let minRow = Infinity;

  for (let i = 0; i < sharks.length; i++) {
    const shark = sharks[i];
    if (!shark.alive) continue;
    if (shark.c === kingCol && shark.r < minRow) {
      minRow = shark.r;
      target = i;
    }
  }

  if (target !== -1) {
    sharks[target].alive = false;
    answer += sharks[target].z;
  }

  // 2) 상어 이동 + 같은 칸 정리
  const board = Array.from({ length: R }, () => Array(C).fill(-1));

  for (let i = 0; i < sharks.length; i++) {
    const shark = sharks[i];
    if (!shark.alive) continue;

    moveShark(shark);

    const { r, c, z } = shark;

    if (board[r][c] === -1) {
      board[r][c] = i;
    } else {
      const otherIdx = board[r][c];
      const other = sharks[otherIdx];

      if (other.z < z) {
        other.alive = false;
        board[r][c] = i;
      } else {
        shark.alive = false;
      }
    }
  }
}

console.log(answer);