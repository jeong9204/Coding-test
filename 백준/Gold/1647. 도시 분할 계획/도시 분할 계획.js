'use strict';

const fs = require('fs');
const data = fs.readFileSync(0, 'utf8');
let p = 0;
const L = data.length;

function nextInt() {
  while (p < L) {
    const ch = data.charCodeAt(p);
    if (ch > 32) break; // 공백/개행 스킵
    p++;
  }
  let sign = 1;
  if (data.charCodeAt(p) === 45) { // '-'
    sign = -1;
    p++;
  }
  let num = 0;
  while (p < L) {
    const ch = data.charCodeAt(p);
    if (ch <= 32) break;
    num = num * 10 + (ch - 48);
    p++;
  }
  return num * sign;
}

const N = nextInt();
const M = nextInt();

// 간선 패킹용 상수
const BASE = 1000001;
const BASE2 = BASE * BASE;

// 간선을 key 하나로 저장 (Float64Array는 정렬/메모리에서 유리)
const edges = new Float64Array(M);

for (let i = 0; i < M; i++) {
  const a = nextInt();
  const b = nextInt();
  const c = nextInt();
  edges[i] = c * BASE2 + a * BASE + b;
}

edges.sort();

// DSU (Union-Find)
const parent = new Int32Array(N + 1);
const size = new Int32Array(N + 1);
for (let i = 1; i <= N; i++) {
  parent[i] = i;
  size[i] = 1;
}

function find(x) {
  while (parent[x] !== x) {
    parent[x] = parent[parent[x]];
    x = parent[x];
  }
  return x;
}

function union(a, b) {
  a = find(a);
  b = find(b);
  if (a === b) return false;
  if (size[a] < size[b]) {
    const t = a; a = b; b = t;
  }
  parent[b] = a;
  size[a] += size[b];
  return true;
}

// Kruskal로 MST 구성
let used = 0;
let sum = 0;
let maxEdge = 0;

for (let i = 0; i < M && used < N - 1; i++) {
  const key = edges[i];

  const c = Math.floor(key / BASE2);
  const rem = key - c * BASE2;
  const a = Math.floor(rem / BASE);
  const b = rem - a * BASE;

  if (union(a, b)) {
    sum += c;
    if (c > maxEdge) maxEdge = c;
    used++;
  }
}

console.log(String(sum - maxEdge));
