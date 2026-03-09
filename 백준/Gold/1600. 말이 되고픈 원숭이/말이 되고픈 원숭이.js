'use strict';

const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim().split(/\s+/).map(Number);

let idx = 0;
const K = input[idx++];
const W = input[idx++];
const H = input[idx++];

const board = Array.from({ length: H }, () => Array(W));
for (let r = 0; r < H; r++) {
  for (let c = 0; c < W; c++) {
    board[r][c] = input[idx++];
  }
}

// 일반 이동 4방향
const dr4 = [1, -1, 0, 0];
const dc4 = [0, 0, 1, -1];

// 말 이동 8방향
const dr8 = [-2, -2, -1, -1, 1, 1, 2, 2];
const dc8 = [-1, 1, -2, 2, -2, 2, -1, 1];

// visited[r][c][k] = (r,c)에 말 이동을 k번 사용해서 방문했는가
const visited = Array.from({ length: H }, () =>
  Array.from({ length: W }, () => Array(K + 1).fill(false))
);

// BFS 큐
// 상태: [r, c, usedHorse, dist]
const queue = [];
let head = 0;

queue.push([0, 0, 0, 0]);
visited[0][0][0] = true;

while (head < queue.length) {
  const [r, c, used, dist] = queue[head++];

  // 도착
  if (r === H - 1 && c === W - 1) {
    console.log(dist);
    return;
  }

  // 1) 일반 이동
  for (let d = 0; d < 4; d++) {
    const nr = r + dr4[d];
    const nc = c + dc4[d];

    if (nr < 0 || nr >= H || nc < 0 || nc >= W) continue;
    if (board[nr][nc] === 1) continue;
    if (visited[nr][nc][used]) continue;

    visited[nr][nc][used] = true;
    queue.push([nr, nc, used, dist + 1]);
  }

  // 2) 말 이동
  if (used < K) {
    for (let d = 0; d < 8; d++) {
      const nr = r + dr8[d];
      const nc = c + dc8[d];
      const nextUsed = used + 1;

      if (nr < 0 || nr >= H || nc < 0 || nc >= W) continue;
      if (board[nr][nc] === 1) continue;
      if (visited[nr][nc][nextUsed]) continue;

      visited[nr][nc][nextUsed] = true;
      queue.push([nr, nc, nextUsed, dist + 1]);
    }
  }
}

console.log(-1);