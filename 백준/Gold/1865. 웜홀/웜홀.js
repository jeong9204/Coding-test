const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim().split('\n');

let idx = 0;
const TC = Number(input[idx++]);
const answer = [];

for (let tc = 0; tc < TC; tc++) {
  const [N, M, W] = input[idx++].split(' ').map(Number);
  const edges = [];

  // 도로: 양방향
  for (let i = 0; i < M; i++) {
    const [S, E, T] = input[idx++].split(' ').map(Number);
    edges.push([S, E, T]);
    edges.push([E, S, T]);
  }

  // 웜홀: 단방향, 시간 감소 => 음수 간선
  for (let i = 0; i < W; i++) {
    const [S, E, T] = input[idx++].split(' ').map(Number);
    edges.push([S, E, -T]);
  }

  // 모든 정점을 시작점처럼 처리하기 위해 0으로 초기화
  const dist = Array(N + 1).fill(0);

  let hasNegativeCycle = false;

  // 벨만-포드
  for (let i = 1; i <= N; i++) {
    let updated = false;

    for (const [cur, next, cost] of edges) {
      if (dist[next] > dist[cur] + cost) {
        dist[next] = dist[cur] + cost;
        updated = true;

        // N번째 반복에서도 갱신되면 음수 사이클 존재
        if (i === N) {
          hasNegativeCycle = true;
          break;
        }
      }
    }

    if (hasNegativeCycle) break;
    if (!updated) break; // 더 이상 갱신 없으면 조기 종료
  }

  answer.push(hasNegativeCycle ? 'YES' : 'NO');
}

console.log(answer.join('\n'));