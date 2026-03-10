'use strict';

const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim().split(/\s+/).map(Number);

let idx = 0;
const N = input[idx++];
const M = input[idx++];

const map = Array.from({ length: N }, () => Array(M));
for (let r = 0; r < N; r++) {
  for (let c = 0; c < M; c++) {
    map[r][c] = input[idx++];
  }
}

const dr = [1, -1, 0, 0];
const dc = [0, 0, 1, -1];

//
// 1) 섬 번호 붙이기
//
let islandCount = 0;

function bfsLabel(sr, sc, id) {
  const queue = [[sr, sc]];
  let head = 0;
  map[sr][sc] = id;

  while (head < queue.length) {
    const [r, c] = queue[head++];

    for (let d = 0; d < 4; d++) {
      const nr = r + dr[d];
      const nc = c + dc[d];

      if (nr < 0 || nr >= N || nc < 0 || nc >= M) continue;
      if (map[nr][nc] !== 1) continue;

      map[nr][nc] = id;
      queue.push([nr, nc]);
    }
  }
}

// 원래 땅(1)을 2,3,4... 로 라벨링
for (let r = 0; r < N; r++) {
  for (let c = 0; c < M; c++) {
    if (map[r][c] === 1) {
      islandCount++;
      bfsLabel(r, c, islandCount + 1);
    }
  }
}

// 섬 번호를 0-based로 쓰기 편하게 바꾸기 위해
// 실제 map 값은 2부터 시작하므로 변환 함수 사용
function islandIndex(val) {
  return val - 2; // 2 -> 0, 3 -> 1 ...
}

//
// 2) 가능한 다리 후보 찾기
//
// dist[i][j] = i번 섬과 j번 섬 사이 가능한 최소 다리 길이
//
const INF = 1e9;
const dist = Array.from({ length: islandCount }, () =>
  Array(islandCount).fill(INF)
);

for (let i = 0; i < islandCount; i++) dist[i][i] = 0;

// 각 섬 칸에서 4방향으로 직선 탐색
for (let r = 0; r < N; r++) {
  for (let c = 0; c < M; c++) {
    if (map[r][c] <= 1) continue; // 바다만 아니고, 라벨된 섬만

    const from = islandIndex(map[r][c]);

    for (let d = 0; d < 4; d++) {
      let nr = r + dr[d];
      let nc = c + dc[d];
      let length = 0;

      // 같은 방향으로 계속 직진
      while (nr >= 0 && nr < N && nc >= 0 && nc < M) {
        // 바다면 다리 연장
        if (map[nr][nc] === 0) {
          length++;
          nr += dr[d];
          nc += dc[d];
          continue;
        }

        // 자기 섬이면 불가능
        if (map[nr][nc] === map[r][c]) {
          break;
        }

        // 다른 섬을 만난 경우
        const to = islandIndex(map[nr][nc]);

        // 길이 2 이상일 때만 다리 가능
        if (length >= 2) {
          if (length < dist[from][to]) {
            dist[from][to] = length;
            dist[to][from] = length;
          }
        }
        break;
      }
    }
  }
}

//
// 3) 간선 목록 만들기
//
const edges = [];
for (let i = 0; i < islandCount; i++) {
  for (let j = i + 1; j < islandCount; j++) {
    if (dist[i][j] !== INF) {
      edges.push([dist[i][j], i, j]);
    }
  }
}

edges.sort((a, b) => a[0] - b[0]);

//
// 4) 크루스칼 MST
//
const parent = Array.from({ length: islandCount }, (_, i) => i);

function find(x) {
  if (parent[x] !== x) {
    parent[x] = find(parent[x]);
  }
  return parent[x];
}

function union(a, b) {
  a = find(a);
  b = find(b);
  if (a === b) return false;
  parent[b] = a;
  return true;
}

let total = 0;
let usedEdges = 0;

for (const [cost, a, b] of edges) {
  if (union(a, b)) {
    total += cost;
    usedEdges++;
    if (usedEdges === islandCount - 1) break;
  }
}

console.log(usedEdges === islandCount - 1 ? total : -1);