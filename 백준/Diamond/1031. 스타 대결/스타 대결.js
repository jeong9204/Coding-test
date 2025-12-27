'use strict';
const fs = require('fs');

const lines = fs.readFileSync(0, 'utf8').trim().split('\n');
let ptr = 0;
const [N, M] = lines[ptr++].trim().split(/\s+/).map(Number);
let A = lines[ptr++].trim().split(/\s+/).map(Number);
let B = lines[ptr++].trim().split(/\s+/).map(Number);

// 기본 불가능 체크
const sumA = A.reduce((s, x) => s + x, 0);
const sumB = B.reduce((s, x) => s + x, 0);
if (sumA !== sumB) {
  console.log('-1');
  process.exit(0);
}
for (let i = 0; i < N; i++) if (A[i] > M) { console.log('-1'); process.exit(0); }
for (let j = 0; j < M; j++) if (B[j] > N) { console.log('-1'); process.exit(0); }

// mat[i][j] = -1(미정), 0, 1
const mat = Array.from({ length: N }, () => Array(M).fill(-1));

/** Dinic 구현 */
class Dinic {
  constructor(n) {
    this.n = n;
    this.head = new Int32Array(n).fill(-1);
    this.to = [];
    this.cap = [];
    this.next = [];
    this.level = new Int32Array(n);
    this.it = new Int32Array(n);
  }
  addEdge(u, v, c) {
    // forward
    this.to.push(v);
    this.cap.push(c);
    this.next.push(this.head[u]);
    this.head[u] = this.to.length - 1;
    // backward
    this.to.push(u);
    this.cap.push(0);
    this.next.push(this.head[v]);
    this.head[v] = this.to.length - 1;
  }
  bfs(s, t) {
    this.level.fill(-1);
    const q = new Int32Array(this.n);
    let qh = 0, qt = 0;
    this.level[s] = 0;
    q[qt++] = s;
    while (qh < qt) {
      const u = q[qh++];
      for (let e = this.head[u]; e !== -1; e = this.next[e]) {
        if (this.cap[e] <= 0) continue;
        const v = this.to[e];
        if (this.level[v] !== -1) continue;
        this.level[v] = this.level[u] + 1;
        q[qt++] = v;
      }
    }
    return this.level[t] !== -1;
  }
  dfs(u, t, f) {
    if (u === t) return f;
    for (let e = this.it[u]; e !== -1; e = this.next[e], this.it[u] = e) {
      if (this.cap[e] <= 0) continue;
      const v = this.to[e];
      if (this.level[v] !== this.level[u] + 1) continue;
      const ret = this.dfs(v, t, Math.min(f, this.cap[e]));
      if (ret > 0) {
        this.cap[e] -= ret;
        this.cap[e ^ 1] += ret;
        return ret;
      }
    }
    return 0;
  }
  maxFlow(s, t) {
    let flow = 0;
    while (this.bfs(s, t)) {
      this.it.set(this.head);
      while (true) {
        const pushed = this.dfs(s, t, 1e9);
        if (pushed === 0) break;
        flow += pushed;
      }
    }
    return flow;
  }
}

// 현재 상태가 완성 가능한지(유량으로 체크)
function feasible(curA, curB, mat) {
  let total = 0;
  for (let i = 0; i < N; i++) {
    if (curA[i] < 0 || curA[i] > M) return false;
    total += curA[i];
  }
  let totalB = 0;
  for (let j = 0; j < M; j++) {
    if (curB[j] < 0 || curB[j] > N) return false;
    totalB += curB[j];
  }
  if (total !== totalB) return false;

  const S = 0;
  const rowStart = 1;
  const colStart = rowStart + N;
  const T = colStart + M;
  const dinic = new Dinic(T + 1);

  // S -> rows
  for (let i = 0; i < N; i++) dinic.addEdge(S, rowStart + i, curA[i]);
  // cols -> T
  for (let j = 0; j < M; j++) dinic.addEdge(colStart + j, T, curB[j]);

  // rows -> cols (미정 칸만)
  for (let i = 0; i < N; i++) {
    const u = rowStart + i;
    for (let j = 0; j < M; j++) {
      if (mat[i][j] !== -1) continue; // 이미 0/1 확정이면 간선 없음(1은 이미 차감되어야 함)
      dinic.addEdge(u, colStart + j, 1);
    }
  }

  const f = dinic.maxFlow(S, T);
  return f === total;
}

// 그리디로 한 칸씩 결정
for (let i = 0; i < N; i++) {
  for (let j = 0; j < M; j++) {
    // 이미 확정된 칸이면 스킵(실제로는 한 번만 지나가지만 안전)
    if (mat[i][j] !== -1) continue;

    // 강제 0
    if (A[i] === 0 || B[j] === 0) {
      mat[i][j] = 0;
      continue;
    }

    // 행에서 남은 칸 수가 A[i]면 남은 칸은 전부 1
    if (M - j === A[i]) {
      mat[i][j] = 1;
      A[i]--;
      B[j]--;
      continue;
    }

    // 열에서 남은 칸 수가 B[j]면 남은 칸은 전부 1
    if (N - i === B[j]) {
      mat[i][j] = 1;
      A[i]--;
      B[j]--;
      continue;
    }

    // 0을 먼저 시도: (i,j)=0으로 고정해도 완성 가능?
    mat[i][j] = 0;
    if (feasible(A, B, mat)) {
      // 0 확정
      continue;
    }

    // 0이 불가능하면 1로
    mat[i][j] = 1;
    A[i]--;
    B[j]--;
    if (A[i] < 0 || B[j] < 0) {
      console.log('-1');
      process.exit(0);
    }
  }
}

// 최종 검증(남은 수가 모두 0이어야 함)
if (A.some(x => x !== 0) || B.some(x => x !== 0)) {
  console.log('-1');
  process.exit(0);
}

// 출력
let out = '';
for (let i = 0; i < N; i++) {
  out += mat[i].map(v => (v === 1 ? '1' : '0')).join('') + '\n';
}
process.stdout.write(out);
