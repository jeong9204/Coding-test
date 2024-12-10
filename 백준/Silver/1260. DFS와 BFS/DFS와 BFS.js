const readline = require("readline");

// 입력 받기
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];

rl.on("line", (line) => {
  input.push(line.trim());
}).on("close", () => {
  // 파싱
  const [N, M, V] = input[0].split(" ").map(Number);
  const edges = input.slice(1).map((line) => line.split(" ").map(Number));

  // 그래프 초기화 (1부터 N까지 정점 사용)
  const graph = Array.from({ length: N + 1 }, () => []);
  edges.forEach(([a, b]) => {
    graph[a].push(b);
    graph[b].push(a);
  });

  // 각 정점의 인접리스트 정렬 (작은 번호부터 방문)
  graph.forEach((adj) => adj.sort((a, b) => a - b));

  // DFS 구현
  const dfs = (start) => {
    const visited = Array(N + 1).fill(false);
    const result = [];
    const stack = [start];

    while (stack.length) {
      const node = stack.pop();
      if (!visited[node]) {
        visited[node] = true;
        result.push(node);
        for (let neighbor of graph[node].slice().reverse()) {
          if (!visited[neighbor]) {
            stack.push(neighbor);
          }
        }
      }
    }

    return result;
  };

  // BFS 구현
  const bfs = (start) => {
    const visited = Array(N + 1).fill(false);
    const result = [];
    const queue = [start];

    while (queue.length) {
      const node = queue.shift();
      if (!visited[node]) {
        visited[node] = true;
        result.push(node);
        for (let neighbor of graph[node]) {
          if (!visited[neighbor]) {
            queue.push(neighbor);
          }
        }
      }
    }

    return result;
  };

  // 결과 출력
  const dfsResult = dfs(V).join(" ");
  const bfsResult = bfs(V).join(" ");
  console.log(dfsResult);
  console.log(bfsResult);
});
