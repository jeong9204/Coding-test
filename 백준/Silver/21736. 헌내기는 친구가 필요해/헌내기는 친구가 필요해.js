'use strict';

const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim().split('\n');

const [N, M] = input[0].trim().split(' ').map(Number);

const grid = new Array(N);
let sr = -1, sc = -1;

for (let r = 0; r < N; r++) {
  const row = input[1 + r].trim();
  grid[r] = row;
  const idx = row.indexOf('I');
  if (idx !== -1) {
    sr = r;
    sc = idx;
  }
}

// 방문 배열: 0/1로만 쓰려고 Uint8Array 사용 (메모리 절약 + 빠름)
const visited = new Uint8Array(N * M);

function pos(r, c) {
  return r * M + c;
}

const dr = [1, -1, 0, 0];
const dc = [0, 0, 1, -1];

// 큐를 배열로 만들고 head 포인터로 pop(shift) 대체
const qR = new Int32Array(N * M);
const qC = new Int32Array(N * M);
let head = 0, tail = 0;

visited[pos(sr, sc)] = 1;
qR[tail] = sr;
qC[tail] = sc;
tail++;

let count = 0;

while (head < tail) {
  const r = qR[head];
  const c = qC[head];
  head++;

  for (let k = 0; k < 4; k++) {
    const nr = r + dr[k];
    const nc = c + dc[k];

    if (nr < 0 || nr >= N || nc < 0 || nc >= M) continue;
    const p = pos(nr, nc);
    if (visited[p]) continue;

    const cell = grid[nr][nc];
    if (cell === 'X') continue; // 벽은 못 감

    visited[p] = 1;

    if (cell === 'P') count++;

    qR[tail] = nr;
    qC[tail] = nc;
    tail++;
  }
}

console.log(count === 0 ? 'TT' : String(count));
