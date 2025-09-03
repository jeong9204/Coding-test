// 트리의 지름 (가중치 있음) - 2회 BFS 풀이
// 1) 아무 노드(1)에서 BFS -> 가장 먼 정점 u
// 2) u에서 BFS -> 최장거리 = 지름

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const lines = [];
rl.on('line', line => lines.push(line.trim()))
  .on('close', () => {
    const n = Number(lines[0]);
    const adj = Array.from({ length: n + 1 }, () => []);

    for (let i = 1; i <= n - 1; i++) {
      // 입력: parent child weight
      const [p, c, w] = lines[i].split(/\s+/).map(Number);
      adj[p].push([c, w]);
      adj[c].push([p, w]);
    }

    // 반복형 BFS: 시작 start에서 모든 노드까지의 거리 계산
    function bfs(start) {
      const dist = Array(n + 1).fill(-1);
      const q = new Array(n); // 최대 n개까지 들어갈 수 있음 (대충 잡아도 OK)
      let head = 0, tail = 0;

      dist[start] = 0;
      q[tail++] = start;

      while (head < tail) {
        const cur = q[head++];
        for (const [nxt, w] of adj[cur]) {
          if (dist[nxt] !== -1) continue;
          dist[nxt] = dist[cur] + w;
          q[tail++] = nxt;
        }
      }

      // 가장 먼 정점과 그 거리 찾기
      let farNode = 1, farDist = 0;
      for (let v = 1; v <= n; v++) {
        if (dist[v] > farDist) {
          farDist = dist[v];
          farNode = v;
        }
      }
      return { farNode, farDist, dist };
    }

    // 1) 1번에서 가장 먼 정점 u
    const { farNode: u } = bfs(1);
    // 2) u에서 가장 먼 거리 = 지름
    const { farDist: diameter } = bfs(u);

    console.log(diameter.toString());
  });
