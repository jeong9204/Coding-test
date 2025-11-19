// BOJ 1261: 알고스팟
// 다익스트라 + 최소 힙 구현

const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim().split('\n');

// 첫 줄: M(가로), N(세로)
const [M, N] = input[0].trim().split(' ').map(Number);

// 미로 정보 읽기
const maze = [];
for (let i = 1; i <= N; i++) {
  // "01101" 이런 식으로 들어오므로 문자열 그대로 사용
  maze.push(input[i].trim().split('').map(ch => Number(ch)));
}

// 최소 힙 구현
class MinHeap {
  constructor() {
    this.data = [];
  }

  isEmpty() {
    return this.data.length === 0;
  }

  push(node) {
    // node: [cost, r, c]
    this.data.push(node);
    this._heapifyUp(this.data.length - 1);
  }

  pop() {
    if (this.data.length === 0) return null;
    const top = this.data[0];
    const last = this.data.pop();
    if (this.data.length > 0) {
      this.data[0] = last;
      this._heapifyDown(0);
    }
    return top;
  }

  _heapifyUp(idx) {
    let i = idx;
    while (i > 0) {
      const parent = Math.floor((i - 1) / 2);
      if (this.data[parent][0] <= this.data[i][0]) break;
      [this.data[parent], this.data[i]] = [this.data[i], this.data[parent]];
      i = parent;
    }
  }

  _heapifyDown(idx) {
    const n = this.data.length;
    let i = idx;
    while (true) {
      let left = i * 2 + 1;
      let right = i * 2 + 2;
      let smallest = i;

      if (left < n && this.data[left][0] < this.data[smallest][0]) {
        smallest = left;
      }
      if (right < n && this.data[right][0] < this.data[smallest][0]) {
        smallest = right;
      }

      if (smallest === i) break;
      [this.data[i], this.data[smallest]] = [this.data[smallest], this.data[i]];
      i = smallest;
    }
  }
}

// 다익스트라 준비
const INF = Number.POSITIVE_INFINITY;
const dist = Array.from({ length: N }, () => Array(M).fill(INF));

// 시작점: (0, 0)
dist[0][0] = 0;
const heap = new MinHeap();
heap.push([0, 0, 0]); // [부순 벽 개수, r, c]

const dr = [-1, 1, 0, 0];
const dc = [0, 0, -1, 1];

while (!heap.isEmpty()) {
  const [cost, r, c] = heap.pop();

  // 이미 더 좋은 경로가 있다면 스킵
  if (cost > dist[r][c]) continue;

  // 도착점에 도달한 경우, 이 cost가 최소
  if (r === N - 1 && c === M - 1) break;

  for (let d = 0; d < 4; d++) {
    const nr = r + dr[d];
    const nc = c + dc[d];
    if (nr < 0 || nr >= N || nc < 0 || nc >= M) continue;

    // 다음 칸이 벽이면 1개 더 부숴야 함
    const add = maze[nr][nc]; // 0 또는 1
    const nextCost = cost + add;

    if (nextCost < dist[nr][nc]) {
      dist[nr][nc] = nextCost;
      heap.push([nextCost, nr, nc]);
    }
  }
}

// (N-1, M-1)까지 가는 최소 벽 개수
console.log(dist[N - 1][M - 1].toString());
