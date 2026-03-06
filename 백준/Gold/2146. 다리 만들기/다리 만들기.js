'use strict';

const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim().split(/\s+/).map(Number);

let idx = 0;
const N = input[idx++];

const map = Array.from({ length: N }, () => Array(N));
for (let r = 0; r < N; r++) {
  for (let c = 0; c < N; c++) {
    map[r][c] = input[idx++];
  }
}

const dr = [1, -1, 0, 0];
const dc = [0, 0, 1, -1];

// owner[r][c] : 이 칸이 어느 섬 소유인지
const owner = Array.from({ length: N }, () => Array(N).fill(0));
// dist[r][c] : 해당 섬에서 이 칸까지 확장한 거리
const dist = Array.from({ length: N }, () => Array(N).fill(-1));

// BFS 큐용 배열
const qr = new Array(N * N);
const qc = new Array(N * N);

let islandId = 0;

// 1) 섬 번호 붙이기
for (let r = 0; r < N; r++) {
  for (let c = 0; c < N; c++) {
    if (map[r][c] === 1 && owner[r][c] === 0) {
      islandId++;

      let head = 0, tail = 0;
      qr[tail] = r;
      qc[tail] = c;
      tail++;

      owner[r][c] = islandId;
      dist[r][c] = 0;

      while (head < tail) {
        const cr = qr[head];
        const cc = qc[head];
        head++;

        for (let d = 0; d < 4; d++) {
          const nr = cr + dr[d];
          const nc = cc + dc[d];

          if (nr < 0 || nr >= N || nc < 0 || nc >= N) continue;
          if (map[nr][nc] !== 1) continue;
          if (owner[nr][nc] !== 0) continue;

          owner[nr][nc] = islandId;
          dist[nr][nc] = 0;

          qr[tail] = nr;
          qc[tail] = nc;
          tail++;
        }
      }
    }
  }
}

// 2) 멀티 소스 BFS 초기화: 모든 육지 칸을 시작점으로 큐에 넣기
let head = 0, tail = 0;
for (let r = 0; r < N; r++) {
  for (let c = 0; c < N; c++) {
    if (owner[r][c] !== 0) {
      qr[tail] = r;
      qc[tail] = c;
      tail++;
    }
  }
}

let answer = Infinity;

// 3) 모든 섬이 동시에 바다로 확장
while (head < tail) {
  const r = qr[head];
  const c = qc[head];
  head++;

  for (let d = 0; d < 4; d++) {
    const nr = r + dr[d];
    const nc = c + dc[d];

    if (nr < 0 || nr >= N || nc < 0 || nc >= N) continue;

    // 아직 아무 섬도 차지하지 않은 바다라면 확장
    if (owner[nr][nc] === 0) {
      owner[nr][nc] = owner[r][c];
      dist[nr][nc] = dist[r][c] + 1;

      qr[tail] = nr;
      qc[tail] = nc;
      tail++;
    }
    // 다른 섬이 이미 차지한 칸이면 두 확장이 만난 것
    else if (owner[nr][nc] !== owner[r][c]) {
      const candidate = dist[r][c] + dist[nr][nc];
      if (candidate < answer) answer = candidate;
    }
  }
}

console.log(answer);