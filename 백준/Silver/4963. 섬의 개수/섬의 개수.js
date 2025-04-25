const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let input = [];
rl.on('line', line => {
  input.push(line);
}).on('close', () => {
  let idx = 0;
  
  const dx = [-1, -1, -1, 0, 0, 1, 1, 1];
  const dy = [-1, 0, 1, -1, 1, -1, 0, 1];

  while (true) {
    let [w, h] = input[idx].split(' ').map(Number);
    if (w === 0 && h === 0) break;

    let map = [];
    for (let i = 1; i <= h; i++) {
      map.push(input[idx + i].split(' ').map(Number));
    }

    let visited = Array.from({ length: h }, () => Array(w).fill(false));
    let count = 0;

    const dfs = (x, y) => {
      visited[x][y] = true;
      for (let dir = 0; dir < 8; dir++) {
        const nx = x + dx[dir];
        const ny = y + dy[dir];

        if (nx >= 0 && nx < h && ny >= 0 && ny < w) {
          if (map[nx][ny] === 1 && !visited[nx][ny]) {
            dfs(nx, ny);
          }
        }
      }
    };

    for (let i = 0; i < h; i++) {
      for (let j = 0; j < w; j++) {
        if (map[i][j] === 1 && !visited[i][j]) {
          dfs(i, j);
          count++;
        }
      }
    }

    console.log(count);

    idx += h + 1;
  }
});
