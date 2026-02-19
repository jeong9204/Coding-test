'use strict';

const fs = require('fs');
const data = fs.readFileSync(0, 'utf8');
let p = 0;
const L = data.length;

function nextInt() {
  while (p < L) {
    const c = data.charCodeAt(p);
    if (c > 32) break;
    p++;
  }
  let sign = 1;
  if (data.charCodeAt(p) === 45) { // '-'
    sign = -1;
    p++;
  }
  let num = 0;
  while (p < L) {
    const c = data.charCodeAt(p);
    if (c <= 32) break;
    num = num * 10 + (c - 48);
    p++;
  }
  return num * sign;
}

// ---------- Min Heap (priority queue) ----------
class MinHeap {
  constructor() {
    this.arr = [];
  }
  size() {
    return this.arr.length;
  }
  push(item) { // item: [dist, node]
    const a = this.arr;
    a.push(item);
    let i = a.length - 1;
    while (i > 0) {
      const parent = (i - 1) >> 1;
      if (a[parent][0] <= a[i][0]) break;
      [a[parent], a[i]] = [a[i], a[parent]];
      i = parent;
    }
  }
  pop() {
    const a = this.arr;
    if (a.length === 0) return null;
    const top = a[0];
    const last = a.pop();
    if (a.length > 0) {
      a[0] = last;
      let i = 0;
      while (true) {
        const left = i * 2 + 1;
        const right = left + 1;
        let smallest = i;

        if (left < a.length && a[left][0] < a[smallest][0]) smallest = left;
        if (right < a.length && a[right][0] < a[smallest][0]) smallest = right;
        if (smallest === i) break;

        [a[i], a[smallest]] = [a[smallest], a[i]];
        i = smallest;
      }
    }
    return top;
  }
}

// ---------- Input ----------
const n = nextInt();
const m = nextInt();

const graph = Array.from({ length: n + 1 }, () => []);
for (let i = 0; i < m; i++) {
  const u = nextInt();
  const v = nextInt();
  const w = nextInt();
  graph[u].push([v, w]);
}

const A = nextInt();
const B = nextInt();

// ---------- Dijkstra ----------
const INF = 1e18;
const dist = new Array(n + 1).fill(INF);
const prev = new Array(n + 1).fill(0);

dist[A] = 0;

const pq = new MinHeap();
pq.push([0, A]);

while (pq.size() > 0) {
  const [d, cur] = pq.pop();
  if (d !== dist[cur]) continue; // outdated entry 스킵
  if (cur === B) break;          // 도착점이면 더 빨리 끝내도 됨(옵션)

  for (const [nxt, w] of graph[cur]) {
    const nd = d + w;
    if (nd < dist[nxt]) {
      dist[nxt] = nd;
      prev[nxt] = cur;
      pq.push([nd, nxt]);
    }
  }
}

// ---------- Path reconstruction ----------
const path = [];
let x = B;
while (x !== 0) {
  path.push(x);
  if (x === A) break;
  x = prev[x];
}
path.reverse();

// ---------- Output ----------
let out = '';
out += dist[B] + '\n';
out += path.length + '\n';
out += path.join(' ') + '\n';
process.stdout.write(out);
