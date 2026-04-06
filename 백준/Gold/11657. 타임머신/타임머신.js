const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim().split('\n');

const [N, M] = input[0].split(' ').map(Number);
const edges = [];

for (let i = 1; i <= M; i++) {
  const [A, B, C] = input[i].split(' ').map(Number);
  edges.push([A, B, C]);
}

const INF = BigInt(Number.MAX_SAFE_INTEGER) * 1000000n;
const dist = Array(N + 1).fill(INF);
dist[1] = 0n;

// N-1번 완화
for (let i = 1; i <= N - 1; i++) {
  let updated = false;

  for (const [from, to, cost] of edges) {
    if (dist[from] === INF) continue;

    const nextCost = dist[from] + BigInt(cost);
    if (dist[to] > nextCost) {
      dist[to] = nextCost;
      updated = true;
    }
  }

  // 더 이상 갱신이 없으면 조기 종료
  if (!updated) break;
}

// 음수 사이클 확인
let hasNegativeCycle = false;

for (const [from, to, cost] of edges) {
  if (dist[from] === INF) continue;

  const nextCost = dist[from] + BigInt(cost);
  if (dist[to] > nextCost) {
    hasNegativeCycle = true;
    break;
  }
}

if (hasNegativeCycle) {
  console.log(-1);
} else {
  const answer = [];

  for (let city = 2; city <= N; city++) {
    if (dist[city] === INF) {
      answer.push('-1');
    } else {
      answer.push(dist[city].toString());
    }
  }

  console.log(answer.join('\n'));
}