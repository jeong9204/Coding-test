const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const input = [];

rl.on('line', line => input.push(line)).on('close', () => {
  const V = +input[0];
  const graph = Array.from({ length: V + 1 }, () => []);

  // 인접 리스트 구성
  for (let i = 1; i <= V; i++) {
    const data = input[i].split(' ').map(Number);
    const from = data[0];

    for (let j = 1; j < data.length - 1; j += 2) {
      const to = data[j];
      const weight = data[j + 1];
      graph[from].push([to, weight]);
    }
  }

  // DFS 함수
  function dfs(start) {
    const visited = Array(V + 1).fill(false);
    const stack = [[start, 0]];
    let maxDist = 0;
    let farthestNode = start;

    while (stack.length > 0) {
      const [current, dist] = stack.pop();

      if (visited[current]) continue;
      visited[current] = true;

      if (dist > maxDist) {
        maxDist = dist;
        farthestNode = current;
      }

      for (const [next, weight] of graph[current]) {
        if (!visited[next]) {
          stack.push([next, dist + weight]);
        }
      }
    }

    return [farthestNode, maxDist];
  }

  // 1. 임의의 노드(1)에서 가장 먼 노드 A 찾기
  const [farthestNode] = dfs(1);

  // 2. A에서 가장 먼 거리 구하기
  const [, diameter] = dfs(farthestNode);

  console.log(diameter);
});
