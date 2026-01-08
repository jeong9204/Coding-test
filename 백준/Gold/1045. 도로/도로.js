'use strict';
const fs = require('fs');

const lines = fs.readFileSync(0, 'utf8').trim().split('\n').map(s => s.trim());
let ptr = 0;

const [Nstr, Mstr] = lines[ptr++].split(/\s+/);
const N = Number(Nstr);
const M = Number(Mstr);

const mat = [];
for (let i = 0; i < N; i++) mat.push(lines[ptr++]);

// 간선 목록 추출 (u < v)만
const edges = [];
for (let i = 0; i < N; i++) {
  for (let j = i + 1; j < N; j++) {
    if (mat[i][j] === 'Y') edges.push([i, j]);
  }
}

// 간선이 M개 미만이면 애초에 불가능
if (edges.length < M) {
  console.log(-1);
  process.exit(0);
}

// (u,v) 오름차순이 우선순위 "높은 순서"로 보는 순서
edges.sort((a, b) => (a[0] - b[0]) || (a[1] - b[1]));

// DSU
class DSU {
  constructor(n) {
    this.p = Array.from({ length: n }, (_, i) => i);
    this.r = Array(n).fill(0);
  }
  find(x) {
    while (this.p[x] !== x) {
      this.p[x] = this.p[this.p[x]];
      x = this.p[x];
    }
    return x;
  }
  union(a, b) {
    a = this.find(a);
    b = this.find(b);
    if (a === b) return;
    if (this.r[a] < this.r[b]) [a, b] = [b, a];
    this.p[b] = a;
    if (this.r[a] === this.r[b]) this.r[a]++;
  }
}

// 현재까지 포함/제외 결정 상태에서 가능성 체크
// includedIdxSet: 포함된 간선 인덱스 Set
// excludedIdxSet: 제외된 간선 인덱스 Set
function feasible(includedIdxSet, excludedIdxSet) {
  const includedCount = includedIdxSet.size;

  if (includedCount > M) return false;

  // allowed 간선 수
  const allowedCount = edges.length - excludedIdxSet.size;
  if (allowedCount < M) return false;

  // DSU를 포함 간선으로만 구성
  const dsu = new DSU(N);
  for (const idx of includedIdxSet) {
    const [u, v] = edges[idx];
    dsu.union(u, v);
  }

  // 컴포넌트 id 매핑
  const compId = new Map();
  let compCnt = 0;
  const compOf = Array(N);
  for (let i = 0; i < N; i++) {
    const r = dsu.find(i);
    if (!compId.has(r)) compId.set(r, compCnt++);
    compOf[i] = compId.get(r);
  }

  // 연결에 필요한 최소 간선 수
  const minNeeded = includedCount + (compCnt - 1);
  if (minNeeded > M) return false;

  // 컴포넌트 그래프가 연결 가능한지 확인
  // allowed 간선(=excluded 제외)로 comp graph 생성
  if (compCnt === 1) return true; // 이미 연결됨(추가 간선만 더 넣으면 됨)

  const adj = Array.from({ length: compCnt }, () => []);
  for (let i = 0; i < edges.length; i++) {
    if (excludedIdxSet.has(i)) continue;
    const [u, v] = edges[i];
    const cu = compOf[u];
    const cv = compOf[v];
    if (cu !== cv) {
      adj[cu].push(cv);
      adj[cv].push(cu);
    }
  }

  // BFS로 comp graph 연결성 체크
  const q = [0];
  const vis = Array(compCnt).fill(false);
  vis[0] = true;
  for (let qi = 0; qi < q.length; qi++) {
    const x = q[qi];
    for (const y of adj[x]) {
      if (!vis[y]) {
        vis[y] = true;
        q.push(y);
      }
    }
  }
  for (let i = 0; i < compCnt; i++) if (!vis[i]) return false;

  return true;
}

// 그리디 선택
const included = new Set();
const excluded = new Set();

// 전체적으로도 불가능하면 -1
if (!feasible(included, excluded)) {
  console.log(-1);
  process.exit(0);
}

for (let i = 0; i < edges.length; i++) {
  // 이미 M개를 채웠으면 나머지는 제외(튜플에 더 들어가면 크기 M을 넘김)
  if (included.size === M) {
    excluded.add(i);
    continue;
  }

  // i를 포함해보고 가능하면 포함
  included.add(i);
  if (!feasible(included, excluded)) {
    // 포함하면 불가능 -> 되돌리고 제외
    included.delete(i);
    excluded.add(i);
  }
}

// 최종적으로 M개 못 채우면 불가능
if (included.size !== M) {
  console.log(-1);
  process.exit(0);
}

// 정답: 각 정점에 incident한 간선 수 출력
const deg = Array(N).fill(0);
for (const idx of included) {
  const [u, v] = edges[idx];
  deg[u]++;
  deg[v]++;
}

console.log(deg.join(' '));
