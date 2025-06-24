const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const input = [];
rl.on("line", (line) => input.push(line.trim()));
rl.on("close", () => {
  const [N, E] = input[0].split(" ").map(Number);
  const graph = Array.from({ length: N + 1 }, () => []);

  // 그래프 구성
  for (let i = 1; i <= E; i++) {
    const [a, b, c] = input[i].split(" ").map(Number);
    graph[a].push([b, c]);
    graph[b].push([a, c]);
  }

  const [v1, v2] = input[E + 1].split(" ").map(Number);
  const INF = Infinity;

  // 다익스트라 함수
  function dijkstra(start) {
    const dist = Array(N + 1).fill(INF);
    const visited = Array(N + 1).fill(false);
    const pq = [[0, start]]; // [비용, 노드]
    dist[start] = 0;

    while (pq.length) {
      pq.sort((a, b) => b[0] - a[0]); // 최소힙 흉내
      const [cost, now] = pq.pop();

      if (visited[now]) continue;
      visited[now] = true;

      for (const [next, w] of graph[now]) {
        if (dist[next] > dist[now] + w) {
          dist[next] = dist[now] + w;
          pq.push([dist[next], next]);
        }
      }
    }
    return dist;
  }

  const dist1 = dijkstra(1);
  const distV1 = dijkstra(v1);
  const distV2 = dijkstra(v2);

  const path1 = dist1[v1] + distV1[v2] + distV2[N];
  const path2 = dist1[v2] + distV2[v1] + distV1[N];

  const result = Math.min(path1, path2);
  console.log(result >= INF ? -1 : result);
});
