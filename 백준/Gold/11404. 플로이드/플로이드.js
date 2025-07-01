const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];
rl.on('line', line => input.push(line)).on('close', () => {
  const n = parseInt(input[0]);
  const m = parseInt(input[1]);

  // 무한대로 초기화된 2차원 배열
  const INF = 1e9;
  const dist = Array.from({ length: n + 1 }, () => Array(n + 1).fill(INF));

  // 자기 자신까지는 비용 0
  for (let i = 1; i <= n; i++) {
    dist[i][i] = 0;
  }

  // 버스 정보 입력
  for (let i = 2; i < m + 2; i++) {
    const [a, b, c] = input[i].split(' ').map(Number);
    // 같은 노선이 여러 개 있을 수 있으므로 최소 비용만 저장
    dist[a][b] = Math.min(dist[a][b], c);
  }

  // 플로이드-워셜 알고리즘
  for (let k = 1; k <= n; k++) {
    for (let i = 1; i <= n; i++) {
      for (let j = 1; j <= n; j++) {
        if (dist[i][j] > dist[i][k] + dist[k][j]) {
          dist[i][j] = dist[i][k] + dist[k][j];
        }
      }
    }
  }

  // 출력
  let result = '';
  for (let i = 1; i <= n; i++) {
    let line = '';
    for (let j = 1; j <= n; j++) {
      line += (dist[i][j] === INF ? 0 : dist[i][j]) + ' ';
    }
    result += line.trim() + '\n';
  }
  console.log(result.trim());
});
