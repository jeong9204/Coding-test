// Node.js solution (Dijkstra + memoized T-chain resolution)
// 상태: (idx, dir)  idx = r*M + c, dir: 0 up,1 left,2 down,3 right

'use strict';
const fs = require('fs');

const input = fs.readFileSync(0, 'utf8').trim().split('\n');
let [N, M, Tcost] = input[0].trim().split(' ').map(Number);
const T = Tcost;

const grid = new Uint8Array(N * M); // store charCode-like type
// We'll encode:
// '.' -> 0, 'T' -> 1, 'S' -> 2
let startIdx = -1;
let startDir = 0;

for (let r = 0; r < N; r++) {
  const line = input[1 + r].trim();
  for (let c = 0; c < M; c++) {
    const ch = line.charCodeAt(c);
    const idx = r * M + c;
    if (ch === 46) { // '.'
      grid[idx] = 0;
    } else if (ch === 84) { // 'T'
      grid[idx] = 1;
    } else if (ch === 83) { // 'S'
      grid[idx] = 2;
    } else {
      // '0'..'3'
      startIdx = idx;
      startDir = ch - 48;
      grid[idx] = 0; // start cell is effectively empty for movement
    }
  }
}

// ---------- helpers: move one step in absolute dir ----------
function move(idx, dir) {
  // 0 up, 1 left, 2 down, 3 right
  if (dir === 0) {
    if (idx < M) return -1;
    return idx - M;
  }
  if (dir === 2) {
    if (idx >= (N - 1) * M) return -1;
    return idx + M;
  }
  if (dir === 1) {
    if (idx % M === 0) return -1;
    return idx - 1;
  }
  // dir === 3
  if (idx % M === M - 1) return -1;
  return idx + 1;
}

// ---------- memo for resolveT on states (T-cell idx, dir) ----------
const totalStates = N * M * 4;

// status: 0 unvisited, 1 visiting, 2 done
const status = new Uint8Array(totalStates);
// nextPos: final non-T cell idx, or -1
const nextPos = new Int32Array(totalStates);
nextPos.fill(-2); // -2 means "unset"
// nextDir: final dir (0..3)
const nextDir = new Uint8Array(totalStates);

function resolveT(tIdx, enterDir) {
  // only valid to call if grid[tIdx] is T (1)
  let idx = tIdx;
  let dir = enterDir;

  const stack = [];

  while (true) {
    const sid = idx * 4 + dir;

    if (status[sid] === 2) {
      // already computed
      return [nextPos[sid], nextDir[sid]];
    }

    if (status[sid] === 1) {
      // cycle detected in current traversal
      // pop until we remove sid (cycle nodes), mark them invalid
      while (stack.length) {
        const psid = stack.pop();
        status[psid] = 2;
        nextPos[psid] = -1;
        nextDir[psid] = 0;
        if (psid === sid) break;
      }
      // remaining stack leads into cycle => also invalid
      while (stack.length) {
        const psid = stack.pop();
        status[psid] = 2;
        nextPos[psid] = -1;
        nextDir[psid] = 0;
      }
      return [-1, 0];
    }

    // mark visiting
    status[sid] = 1;
    stack.push(sid);

    // simulate one "T action": rotate CCW then move forward
    const nd = (dir + 1) & 3;
    const nIdx = move(idx, nd);
    if (nIdx === -1) {
      // goes out of grid => invalid
      while (stack.length) {
        const psid = stack.pop();
        status[psid] = 2;
        nextPos[psid] = -1;
        nextDir[psid] = 0;
      }
      return [-1, 0];
    }

    if (grid[nIdx] === 1) {
      // still T, continue chain; direction becomes nd at the new T cell
      idx = nIdx;
      dir = nd;
      continue;
    } else {
      // reached non-T cell
      const finalPos = nIdx;
      const finalDir = nd;
      while (stack.length) {
        const psid = stack.pop();
        status[psid] = 2;
        nextPos[psid] = finalPos;
        nextDir[psid] = finalDir;
      }
      return [finalPos, finalDir];
    }
  }
}

// ---------- Min Heap for Dijkstra ----------
class MinHeap {
  constructor() {
    this.ids = [];
    this.ds = [];
  }
  push(id, d) {
    let i = this.ids.length;
    this.ids.push(id);
    this.ds.push(d);
    while (i > 0) {
      const p = (i - 1) >> 1;
      if (this.ds[p] <= d) break;
      this.ids[i] = this.ids[p];
      this.ds[i] = this.ds[p];
      i = p;
    }
    this.ids[i] = id;
    this.ds[i] = d;
  }
  pop() {
    const n = this.ids.length;
    if (n === 0) return null;
    const minId = this.ids[0];
    const minD = this.ds[0];
    const lastId = this.ids.pop();
    const lastD = this.ds.pop();
    if (n > 1) {
      let i = 0;
      while (true) {
        let l = i * 2 + 1;
        if (l >= n - 1) break;
        let r = l + 1;
        let c = r < n - 1 && this.ds[r] < this.ds[l] ? r : l;
        if (this.ds[c] >= lastD) break;
        this.ids[i] = this.ids[c];
        this.ds[i] = this.ds[c];
        i = c;
      }
      this.ids[i] = lastId;
      this.ds[i] = lastD;
    }
    return [minId, minD];
  }
  get size() {
    return this.ids.length;
  }
}

// ---------- Dijkstra ----------
const INF = Number.POSITIVE_INFINITY;
const dist = new Float64Array(totalStates);
for (let i = 0; i < totalStates; i++) dist[i] = INF;

const startState = startIdx * 4 + startDir;
dist[startState] = 0;

const pq = new MinHeap();
pq.push(startState, 0);

let answer = -1;

while (pq.size) {
  const [state, d] = pq.pop();
  if (d !== dist[state]) continue;

  const idx = (state / 4) | 0;
  const dir = state & 3;

  // goal check: current cell is sea 'S'
  if (grid[idx] === 2) {
    answer = d;
    break;
  }

  // 1) rotate CCW
  {
    const ndir = (dir + 1) & 3;
    const ns = idx * 4 + ndir;
    const nd = d + T;
    if (nd < dist[ns]) {
      dist[ns] = nd;
      pq.push(ns, nd);
    }
  }

  // 2) side moves (perpendicular to facing)
  let a, b;
  if (dir === 0 || dir === 2) {
    // facing up/down => can move left/right
    a = 1; b = 3;
  } else {
    // facing left/right => can move up/down
    a = 0; b = 2;
  }

  for (const md of [a, b]) {
    const nIdx = move(idx, md);
    if (nIdx === -1) continue; // cannot leave grid by our own movement

    let finalIdx = nIdx;
    let finalDir = dir;

    if (grid[nIdx] === 1) {
      // entered T => resolve chain using enterDir = current dir
      const res = resolveT(nIdx, dir);
      if (res[0] === -1) continue; // stuck or out of grid
      finalIdx = res[0];
      finalDir = res[1];
    }

    const ns = finalIdx * 4 + finalDir;
    const nd = d + 1;
    if (nd < dist[ns]) {
      dist[ns] = nd;
      pq.push(ns, nd);
    }
  }
}

console.log(String(answer));
