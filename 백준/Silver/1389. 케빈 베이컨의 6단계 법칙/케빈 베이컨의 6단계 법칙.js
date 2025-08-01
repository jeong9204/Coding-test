const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const input = [];
rl.on('line', (line) => {
  input.push(line.trim());
}).on('close', () => {
  const [N, M] = input[0].split(' ').map(Number);
  const graph = Array.from({ length: N + 1 }, () => []);

  // 친구 관계를 양방향으로 그래프에 저장
  for (let i = 1; i <= M; i++) {
    const [a, b] = input[i].split(' ').map(Number);
    graph[a].push(b);
    graph[b].push(a);
  }

  // 케빈 베이컨 수를 저장할 배열
  const bacon = Array(N + 1).fill(0);

  for (let i = 1; i <= N; i++) {
    const dist = Array(N + 1).fill(Infinity);
    const visited = Array(N + 1).fill(false);
    const queue = [[i, 0]];

    visited[i] = true;
    dist[i] = 0;

    while (queue.length) {
      const [cur, d] = queue.shift();

      for (const next of graph[cur]) {
        if (!visited[next]) {
          visited[next] = true;
          dist[next] = d + 1;
          queue.push([next, d + 1]);
        }
      }
    }

    // i번 유저의 케빈 베이컨 수 계산
    bacon[i] = dist.slice(1).reduce((a, b) => a + b, 0);
  }

  // 최소 케빈 베이컨 수를 가진 사람의 번호 찾기
  let min = Infinity;
  let answer = 0;

  for (let i = 1; i <= N; i++) {
    if (bacon[i] < min) {
      min = bacon[i];
      answer = i;
    }
  }

  console.log(answer);
});
