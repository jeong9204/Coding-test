const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let N;
const area = [];
let line = 0;

rl.on('line', (input) => {
  if (!N) {
    N = parseInt(input);
  } else {
    area.push(input.split(' ').map(Number));
    line++;
    if (line === N) rl.close();
  }
});

rl.on('close', () => {
  const dx = [-1, 1, 0, 0];
  const dy = [0, 0, -1, 1];

  const maxHeight = Math.max(...area.flat());
  let result = 0;

  for (let h = 0; h <= maxHeight; h++) {
    const visited = Array.from({ length: N }, () => Array(N).fill(false));
    let safeZoneCount = 0;

    const bfs = (x, y) => {
      const queue = [[x, y]];
      visited[x][y] = true;

      while (queue.length) {
        const [cx, cy] = queue.shift();
        for (let d = 0; d < 4; d++) {
          const nx = cx + dx[d];
          const ny = cy + dy[d];
          if (
            nx >= 0 && nx < N &&
            ny >= 0 && ny < N &&
            !visited[nx][ny] &&
            area[nx][ny] > h
          ) {
            visited[nx][ny] = true;
            queue.push([nx, ny]);
          }
        }
      }
    };

    for (let i = 0; i < N; i++) {
      for (let j = 0; j < N; j++) {
        if (!visited[i][j] && area[i][j] > h) {
          bfs(i, j);
          safeZoneCount++;
        }
      }
    }

    result = Math.max(result, safeZoneCount);
  }

  console.log(result);
});
