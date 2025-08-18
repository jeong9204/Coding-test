const fs = require('fs');
const data = fs.readFileSync(0, 'utf8').trim().split(/\s+/); // 빠른 토큰 파싱
let idx = 0;

const K = Number(data[idx++]);   // 테스트 케이스 수
const out = [];

for (let tc = 0; tc < K; tc++) {
  const V = Number(data[idx++]);
  const E = Number(data[idx++]);

  // 인접 리스트
  const graph = Array.from({ length: V + 1 }, () => []);
  for (let i = 0; i < E; i++) {
    const u = Number(data[idx++]);
    const v = Number(data[idx++]);
    graph[u].push(v);
    graph[v].push(u);
  }

  // 색 배열: 0(미방문), 1, -1 두 가지 색
  const color = new Int8Array(V + 1);
  let isBipartite = true;

  // 모든 정점(연결요소) 검사
  for (let s = 1; s <= V && isBipartite; s++) {
    if (color[s] !== 0) continue;

    // BFS 시작
    const queue = new Int32Array(V); // 충분히 큰 큐 버퍼(최대 V)
    let head = 0, tail = 0;

    color[s] = 1;
    queue[tail++] = s;

    while (head < tail && isBipartite) {
      const cur = queue[head++];
      const c = color[cur];

      for (const nxt of graph[cur]) {
        if (color[nxt] === 0) {
          color[nxt] = -c;       // 반대 색으로 칠하기
          queue[tail++] = nxt;
        } else if (color[nxt] === c) {
          // 같은 색끼리 연결되어 있으면 이분 그래프 아님
          isBipartite = false;
          break;
        }
      }
    }
  }

  out.push(isBipartite ? 'YES' : 'NO');
}

console.log(out.join('\n'));
