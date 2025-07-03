const readline = require('readline');
const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

let input = [];

rl.on('line', line => input.push(line)).on('close', () => {
  const [M, N, K] = input[0].split(' ').map(Number);
  const grid = Array.from({ length: M }, () => Array(N).fill(false));

  // 직사각형 채우기
  for (let i = 1; i <= K; i++) {
    const [x1, y1, x2, y2] = input[i].split(' ').map(Number);
    for (let y = y1; y < y2; y++) {
      for (let x = x1; x < x2; x++) {
        grid[y][x] = true; // 방문 처리
      }
    }
  }

  const dy = [-1, 1, 0, 0];
  const dx = [0, 0, -1, 1];

  const bfs = (sy, sx) => {
    const queue = [[sy, sx]];
    grid[sy][sx] = true;
    let size = 1;

    while (queue.length) {
      const [y, x] = queue.shift();
      for (let d = 0; d < 4; d++) {
        const ny = y + dy[d];
        const nx = x + dx[d];
        if (
          ny >= 0 && ny < M &&
          nx >= 0 && nx < N &&
          !grid[ny][nx]
        ) {
          grid[ny][nx] = true;
          queue.push([ny, nx]);
          size++;
        }
      }
    }

    return size;
  };

  const areas = [];

  for (let y = 0; y < M; y++) {
    for (let x = 0; x < N; x++) {
      if (!grid[y][x]) {
        areas.push(bfs(y, x));
      }
    }
  }

  areas.sort((a, b) => a - b);
  console.log(areas.length);
  console.log(areas.join(' '));
});
