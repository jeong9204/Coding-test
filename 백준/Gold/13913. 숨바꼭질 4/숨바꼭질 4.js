const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim().split(' ').map(Number);

const [N, K] = input;
const MAX = 100000;

// N이 K보다 크거나 같으면 뒤로만 가면 된다.
if (N >= K) {
  const path = [];
  for (let i = N; i >= K; i--) {
    path.push(i);
  }

  console.log(N - K);
  console.log(path.join(' '));
  process.exit(0);
}

const visited = new Array(MAX + 1).fill(false);
const dist = new Array(MAX + 1).fill(0);
const prev = new Array(MAX + 1).fill(-1);

// 직접 큐 구현 (shift 사용 안 함)
const queue = new Array(MAX + 1);
let head = 0;
let tail = 0;

queue[tail++] = N;
visited[N] = true;

while (head < tail) {
  const cur = queue[head++];

  if (cur === K) break;

  const nextPositions = [cur - 1, cur + 1, cur * 2];

  for (const next of nextPositions) {
    if (next < 0 || next > MAX) continue;
    if (visited[next]) continue;

    visited[next] = true;
    dist[next] = dist[cur] + 1;
    prev[next] = cur;
    queue[tail++] = next;
  }
}

// 경로 복원
const path = [];
let current = K;

while (current !== -1) {
  path.push(current);
  if (current === N) break;
  current = prev[current];
}

path.reverse();

console.log(dist[K]);
console.log(path.join(' '));