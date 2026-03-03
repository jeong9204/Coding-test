'use strict';
const fs = require('fs');

// ---------- Fast input (Buffer) ----------
const data = fs.readFileSync(0);
let idx = 0;
const len = data.length;

function readInt() {
  while (idx < len && data[idx] <= 32) idx++;
  let num = 0;
  while (idx < len) {
    const c = data[idx];
    if (c <= 32) break;
    num = num * 10 + (c - 48);
    idx++;
  }
  return num;
}

// ---------- Min Heap (Priority Queue) ----------
class MinHeap {
  constructor() {
    this.h = [];
  }
  push(item) {
    const h = this.h;
    h.push(item);
    let i = h.length - 1;
    while (i > 0) {
      const p = (i - 1) >> 1;
      if (h[p][0] <= h[i][0]) break; // compare by cost
      [h[p], h[i]] = [h[i], h[p]];
      i = p;
    }
  }
  pop() {
    const h = this.h;
    if (h.length === 0) return null;
    const top = h[0];
    const last = h.pop();
    if (h.length > 0) {
      h[0] = last;
      let i = 0;
      while (true) {
        let l = i * 2 + 1;
        let r = l + 1;
        let smallest = i;
        if (l < h.length && h[l][0] < h[smallest][0]) smallest = l;
        if (r < h.length && h[r][0] < h[smallest][0]) smallest = r;
        if (smallest === i) break;
        [h[i], h[smallest]] = [h[smallest], h[i]];
        i = smallest;
      }
    }
    return top;
  }
  get size() {
    return this.h.length;
  }
}

let problem = 1;
let out = [];

while (true) {
  const N = readInt();
  if (!N) break;

  // grid costs
  const cost = new Int32Array(N * N);
  for (let i = 0; i < N * N; i++) cost[i] = readInt();

  // dist init
  const INF = 1e9;
  const dist = new Int32Array(N * N);
  for (let i = 0; i < N * N; i++) dist[i] = INF;

  const heap = new MinHeap();

  // start
  dist[0] = cost[0];
  heap.push([dist[0], 0]); // [currentCost, index]

  const dx = [-1, 1, 0, 0];
  const dy = [0, 0, -1, 1];

  while (heap.size) {
    const [d, cur] = heap.pop();
    if (d !== dist[cur]) continue; // outdated entry

    // 도착하면 더 볼 필요 없음(다익스트라의 성질)
    if (cur === N * N - 1) break;

    const x = (cur / N) | 0;
    const y = cur % N;

    for (let dir = 0; dir < 4; dir++) {
      const nx = x + dx[dir];
      const ny = y + dy[dir];
      if (nx < 0 || nx >= N || ny < 0 || ny >= N) continue;

      const ni = nx * N + ny;
      const nd = d + cost[ni];
      if (nd < dist[ni]) {
        dist[ni] = nd;
        heap.push([nd, ni]);
      }
    }
  }

  out.push(`Problem ${problem}: ${dist[N * N - 1]}`);
  problem++;
}

process.stdout.write(out.join('\n'));