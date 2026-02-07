'use strict';

const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim().split(/\s+/).map(Number);

let p = 0;
const N = input[p++];
const M = input[p++];

const adj = Array.from({ length: N }, () => []);
for (let i = 0; i < M; i++) {
  const a = input[p++], b = input[p++];
  adj[a].push(b);
  adj[b].push(a);
}

const visited = new Uint8Array(N);
let found = false;

function dfs(v, depth) {
  if (found) return;         // 이미 찾았으면 더 할 필요 없음
  if (depth === 4) {         // 간선 4개 연결 성공 -> 정점 5개 존재
    found = true;
    return;
  }

  for (const nxt of adj[v]) {
    if (visited[nxt]) continue;
    visited[nxt] = 1;
    dfs(nxt, depth + 1);
    visited[nxt] = 0;
    if (found) return;
  }
}

// 모든 정점을 시작점으로 시도
for (let i = 0; i < N; i++) {
  visited[i] = 1;
  dfs(i, 0);
  visited[i] = 0;
  if (found) break;
}

console.log(found ? '1' : '0');
