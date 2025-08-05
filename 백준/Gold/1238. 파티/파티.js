const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const [N, M, X] = input[0].split(" ").map(Number);
const edges = input.slice(1).map(line => line.split(" ").map(Number));

const graph = Array.from({ length: N + 1 }, () => []);
const reverseGraph = Array.from({ length: N + 1 }, () => []);

for (let [from, to, time] of edges) {
  graph[from].push([to, time]);
  reverseGraph[to].push([from, time]); // 역방향
}

// ✅ 다익스트라 함수
const dijkstra = (start, graph) => {
  const dist = Array(N + 1).fill(Infinity);
  const visited = Array(N + 1).fill(false);
  dist[start] = 0;

  const pq = [[0, start]]; // [거리, 노드]

  while (pq.length) {
    // 우선순위 큐: 가장 짧은 거리의 노드를 꺼냄
    pq.sort((a, b) => b[0] - a[0]); // 거리 기준 내림차순 정렬
    const [curDist, cur] = pq.pop();

    if (visited[cur]) continue;
    visited[cur] = true;

    for (let [next, cost] of graph[cur]) {
      if (dist[next] > curDist + cost) {
        dist[next] = curDist + cost;
        pq.push([dist[next], next]);
      }
    }
  }

  return dist;
};

// ✅ X에서 각 마을로 가는 거리 (귀가)
const fromX = dijkstra(X, graph);

// ✅ 각 마을에서 X로 오는 거리 (등교)
const toX = dijkstra(X, reverseGraph);

// ✅ 왕복 시간 계산
let maxTime = 0;
for (let i = 1; i <= N; i++) {
  maxTime = Math.max(maxTime, fromX[i] + toX[i]);
}

console.log(maxTime);
