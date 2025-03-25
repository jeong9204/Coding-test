const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let input = [];
rl.on('line', line => {
  input.push(line.trim());
}).on('close', () => {
  const N = +input[0];
  const grid = input.slice(1).map(row => row.split(''));
  
  const dx = [-1, 1, 0, 0];
  const dy = [0, 0, -1, 1];

  function bfs(x, y, visited, board, isBlind) {
    const queue = [[x, y]];
    visited[x][y] = true;
    const color = board[x][y];

    while (queue.length > 0) {
      const [cx, cy] = queue.shift();
      for (let i = 0; i < 4; i++) {
        const nx = cx + dx[i];
        const ny = cy + dy[i];
        if (nx >= 0 && nx < N && ny >= 0 && ny < N && !visited[nx][ny]) {
          const nextColor = board[nx][ny];
          if (isBlind) {
            if ((color === 'R' || color === 'G') && (nextColor === 'R' || nextColor === 'G')) {
              visited[nx][ny] = true;
              queue.push([nx, ny]);
            } else if (nextColor === color) {
              visited[nx][ny] = true;
              queue.push([nx, ny]);
            }
          } else {
            if (nextColor === color) {
              visited[nx][ny] = true;
              queue.push([nx, ny]);
            }
          }
        }
      }
    }
  }

  function countRegions(isBlind) {
    const visited = Array.from({ length: N }, () => Array(N).fill(false));
    let count = 0;
    for (let i = 0; i < N; i++) {
      for (let j = 0; j < N; j++) {
        if (!visited[i][j]) {
          bfs(i, j, visited, grid, isBlind);
          count++;
        }
      }
    }
    return count;
  }

  const normal = countRegions(false);
  const blind = countRegions(true);
  console.log(`${normal} ${blind}`);
});
