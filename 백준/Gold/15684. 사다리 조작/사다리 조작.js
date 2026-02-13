'use strict';

const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim().split(/\s+/);
let idx = 0;

const N = Number(input[idx++]);
const M = Number(input[idx++]);
const H = Number(input[idx++]);

// ladder[r][c] = r번째 가로줄에서 c와 c+1이 연결되어 있으면 true
const ladder = Array.from({ length: H + 1 }, () => Array(N + 2).fill(false));

for (let i = 0; i < M; i++) {
  const a = Number(input[idx++]);
  const b = Number(input[idx++]);
  ladder[a][b] = true;
}

// 현재 사다리 상태가 i -> i 로 내려오는지 검사
function check() {
  for (let start = 1; start <= N; start++) {
    let cur = start;
    for (let r = 1; r <= H; r++) {
      if (ladder[r][cur]) cur++;          // 오른쪽으로 연결되어 있으면 이동
      else if (ladder[r][cur - 1]) cur--; // 왼쪽에서 연결되어 있으면 왼쪽 이동
    }
    if (cur !== start) return false;
  }
  return true;
}

// (r,c)에 가로선을 놓을 수 있는지
function canPlace(r, c) {
  if (ladder[r][c]) return false;        // 이미 있음
  if (ladder[r][c - 1]) return false;    // 왼쪽에 붙어있음
  if (ladder[r][c + 1]) return false;    // 오른쪽에 붙어있음
  return true;
}

// limit개까지 추가해서 가능한지 탐색
// idxStart: 1차원 인덱스 시작점
// added: 지금까지 추가한 개수
function dfs(idxStart, added, limit) {
  if (added === limit) return check();

  const total = H * (N - 1);
  for (let i = idxStart; i < total; i++) {
    const r = Math.floor(i / (N - 1)) + 1;
    const c = (i % (N - 1)) + 1;

    if (!canPlace(r, c)) continue;

    ladder[r][c] = true;
    if (dfs(i + 1, added + 1, limit)) return true;
    ladder[r][c] = false;
  }
  return false;
}

// 0~3개 순서로 시도
let answer = -1;
for (let limit = 0; limit <= 3; limit++) {
  if (dfs(0, 0, limit)) {
    answer = limit;
    break;
  }
}

console.log(String(answer));
