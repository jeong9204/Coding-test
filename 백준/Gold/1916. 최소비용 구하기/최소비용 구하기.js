const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const input = [];
rl.on('line', line => {
  input.push(line.trim());
}).on('close', () => {
  const n = parseInt(input[0]);
  const m = parseInt(input[1]);

  const graph = Array.from({ length: n + 1 }, () => []);
  for (let i = 2; i < 2 + m; i++) {
    const [u, v, w] = input[i].split(' ').map(Number);
    graph[u].push({ to: v, cost: w });
  }

  const [start, end] = input[2 + m].split(' ').map(Number);

  const INF = Infinity;
  const dist = Array(n + 1).fill(INF);
  const visited = Array(n + 1).fill(false);

  class MinHeap {
    constructor() {
      this.heap = [];
    }
    push(data) {
      this.heap.push(data);
      this._heapifyUp();
    }
    pop() {
      const top = this.heap[0];
      const last = this.heap.pop();
      if (this.heap.length > 0) {
        this.heap[0] = last;
        this._heapifyDown();
      }
      return top;
    }
    _heapifyUp() {
      let idx = this.heap.length - 1;
      while (idx > 0) {
        const parentIdx = Math.floor((idx - 1) / 2);
        if (this.heap[parentIdx].cost <= this.heap[idx].cost) break;
        [this.heap[parentIdx], this.heap[idx]] = [this.heap[idx], this.heap[parentIdx]];
        idx = parentIdx;
      }
    }
    _heapifyDown() {
      let idx = 0;
      const length = this.heap.length;
      while (true) {
        let left = 2 * idx + 1;
        let right = 2 * idx + 2;
        let smallest = idx;

        if (left < length && this.heap[left].cost < this.heap[smallest].cost) {
          smallest = left;
        }
        if (right < length && this.heap[right].cost < this.heap[smallest].cost) {
          smallest = right;
        }
        if (smallest === idx) break;

        [this.heap[smallest], this.heap[idx]] = [this.heap[idx], this.heap[smallest]];
        idx = smallest;
      }
    }
    isEmpty() {
      return this.heap.length === 0;
    }
  }

  function dijkstra(start) {
    const pq = new MinHeap();
    dist[start] = 0;
    pq.push({ node: start, cost: 0 });

    while (!pq.isEmpty()) {
      const { node, cost } = pq.pop();
      if (visited[node]) continue;
      visited[node] = true;

      for (const { to, cost: edgeCost } of graph[node]) {
        if (dist[to] > dist[node] + edgeCost) {
          dist[to] = dist[node] + edgeCost;
          pq.push({ node: to, cost: dist[to] });
        }
      }
    }
  }

  dijkstra(start);
  console.log(dist[end]);
});
