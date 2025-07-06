const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let input = [];
rl.on('line', (line) => {
  input.push(line.trim());
}).on('close', () => {
  const n = +input[0]; // 사람 수
  const [a, b] = input[1].split(' ').map(Number); // 두 사람
  const m = +input[2]; // 관계 수
  const graph = Array.from({ length: n + 1 }, () => []);
  
  // 그래프 구성 (양방향)
  for (let i = 3; i < 3 + m; i++) {
    const [x, y] = input[i].split(' ').map(Number);
    graph[x].push(y);
    graph[y].push(x);
  }

  // BFS 함수
  const visited = Array(n + 1).fill(false);
  const distance = Array(n + 1).fill(0);
  const queue = [a];
  visited[a] = true;

  while (queue.length) {
    const current = queue.shift();

    for (const next of graph[current]) {
      if (!visited[next]) {
        visited[next] = true;
        distance[next] = distance[current] + 1;
        queue.push(next);
      }
    }
  }

  // 결과 출력
  console.log(visited[b] ? distance[b] : -1);
});
