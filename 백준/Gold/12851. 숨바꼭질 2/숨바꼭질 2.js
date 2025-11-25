// 숨바꼭질 2 (BOJ 12851)
// N에서 K까지 최단 시간 + 그 최단 시간으로 도달하는 방법 수

const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim().split(/\s+/).map(Number);
const N = input[0];
const K = input[1];

const MAX = 100000;

// N == K면 바로 종료
if (N === K) {
  console.log(0);
  console.log(1);
  process.exit(0);
}

// dist[x]: N에서 x까지의 최단 시간, -1은 아직 방문 안 함
const dist = new Int32Array(MAX + 1);
for (let i = 0; i <= MAX; i++) dist[i] = -1;

// ways[x]: N에서 x까지 최단 시간으로 도달하는 방법 수
const ways = new Int32Array(MAX + 1);

const queue = [];
let head = 0;

dist[N] = 0;
ways[N] = 1;
queue.push(N);

while (head < queue.length) {
  const x = queue[head++];
  const currentTime = dist[x];

  // 이미 K까지의 최단 시간을 알고 있고,
  // 그보다 더 늦은 시간에 탐색할 필요는 없음 (최적화용)
  if (dist[K] !== -1 && currentTime > dist[K]) break;

  const nextPositions = [x - 1, x + 1, x * 2];

  for (const nx of nextPositions) {
    if (nx < 0 || nx > MAX) continue;

    // 아직 방문 안 한 경우: 첫 방문 → 최단 거리 확정
    if (dist[nx] === -1) {
      dist[nx] = currentTime + 1;
      ways[nx] = ways[x];
      queue.push(nx);
    }
    // 이미 방문했는데, 같은 최단 시간으로 도달하는 또 다른 경로 발견
    else if (dist[nx] === currentTime + 1) {
      ways[nx] += ways[x];
    }
  }
}

console.log(dist[K].toString());
console.log(ways[K].toString());
