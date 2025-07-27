const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let input = [];
rl.on('line', line => {
  input.push(line.trim());
}).on('close', () => {
  const [n, m] = input[0].split(' ').map(Number);
  const graph = Array.from({ length: n + 1 }, () => []);
  const inDegree = Array(n + 1).fill(0);

  // 그래프 구성 및 진입 차수 초기화
  for (let i = 1; i <= m; i++) {
    const [a, b] = input[i].split(' ').map(Number);
    graph[a].push(b);     // a가 b보다 앞
    inDegree[b]++;        // b의 진입차수 증가
  }

  const queue = [];
  const result = [];

  // 진입 차수가 0인 노드를 먼저 큐에 추가
  for (let i = 1; i <= n; i++) {
    if (inDegree[i] === 0) queue.push(i);
  }

  // 위상 정렬 시작
  while (queue.length > 0) {
    const cur = queue.shift();
    result.push(cur);

    for (const next of graph[cur]) {
      inDegree[next]--;         // 연결된 노드의 진입 차수 감소
      if (inDegree[next] === 0) queue.push(next); // 0이 되면 큐에 추가
    }
  }

  console.log(result.join(' '));
});
