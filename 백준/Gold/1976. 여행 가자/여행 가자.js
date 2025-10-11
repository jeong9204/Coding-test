// 실행: node main.js < input.txt
const fs = require('fs');
const tokens = fs.readFileSync(0, 'utf8').trim().split(/\s+/).map(Number);
let idx = 0;

const N = tokens[idx++];   // 도시 수
const M = tokens[idx++];   // 여행 계획 길이

// Union-Find 준비
const parent = Array.from({ length: N + 1 }, (_, i) => i);
const rank = new Array(N + 1).fill(0);

function find(x) {
  while (parent[x] !== x) {
    parent[x] = parent[parent[x]]; // path compression (halving)
    x = parent[x];
  }
  return x;
}
function union(a, b) {
  a = find(a); b = find(b);
  if (a === b) return;
  if (rank[a] < rank[b]) parent[a] = b;
  else if (rank[a] > rank[b]) parent[b] = a;
  else { parent[b] = a; rank[a]++; }
}

// 인접 행렬 처리: 1이면 두 도시를 같은 집합으로
for (let i = 1; i <= N; i++) {
  for (let j = 1; j <= N; j++) {
    const v = tokens[idx++]; // i행 j열
    if (v === 1) union(i, j);
  }
}

// 여행 계획
const plan = new Array(M);
for (let k = 0; k < M; k++) plan[k] = tokens[idx++];

// 모든 도시가 같은 컴포넌트인지 확인
const root = find(plan[0]);
let ok = true;
for (let k = 1; k < M; k++) {
  if (find(plan[k]) !== root) { ok = false; break; }
}

console.log(ok ? 'YES' : 'NO');
