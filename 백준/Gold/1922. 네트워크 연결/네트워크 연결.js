// Kruskal - Minimum Spanning Tree (BOJ 1922 유형)
// 실행: node main.js < input.txt

const fs = require('fs');

const tokens = fs.readFileSync(0, 'utf8').trim().split(/\s+/).map(Number);
let idx = 0;

const N = tokens[idx++];               // 컴퓨터(정점) 수
const M = tokens[idx++];               // 간선 수

// 간선: [cost, a, b]
const edges = new Array(M);
for (let i = 0; i < M; i++) {
  const a = tokens[idx++], b = tokens[idx++], c = tokens[idx++];
  edges[i] = [c, a, b];
}

// 1) 비용 오름차순 정렬
edges.sort((e1, e2) => e1[0] - e2[0]);

// 2) Union-Find (Disjoint Set)
const parent = new Array(N + 1);
const rank = new Array(N + 1).fill(0);
for (let i = 1; i <= N; i++) parent[i] = i;

function find(x) {
  // 경로 압축
  if (parent[x] !== x) parent[x] = find(parent[x]);
  return parent[x];
}

function union(a, b) {
  a = find(a);
  b = find(b);
  if (a === b) return false; // 이미 같은 집합 → 싸이클 발생하므로 스킵
  // 랭크(대략 높이) 기준 union by rank
  if (rank[a] < rank[b]) {
    parent[a] = b;
  } else if (rank[a] > rank[b]) {
    parent[b] = a;
  } else {
    parent[b] = a;
    rank[a]++;
  }
  return true;
}

// 3) 작은 간선부터 N-1개 뽑기
let total = 0;
let picked = 0;

for (let i = 0; i < M && picked < N - 1; i++) {
  const [cost, a, b] = edges[i];
  if (union(a, b)) {
    total += cost;
    picked++;
  }
}

// 문제에서 "항상 연결 가능"이라 했으므로 total 출력
console.log(total);
