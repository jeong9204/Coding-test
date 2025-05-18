const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const input = [];

rl.on('line', line => input.push(line)).on('close', () => {
  const [R, C] = input[0].split(' ').map(Number);
  const board = input.slice(1, R + 1).map(line => line.split(''));

  const visited = Array(26).fill(false); // 알파벳 방문 여부 (A~Z)

  const dx = [-1, 1, 0, 0]; // 상하좌우
  const dy = [0, 0, -1, 1];

  let maxCount = 0;

  const dfs = (x, y, count) => {
    maxCount = Math.max(maxCount, count);

    for (let i = 0; i < 4; i++) {
      const nx = x + dx[i];
      const ny = y + dy[i];

      if (nx >= 0 && ny >= 0 && nx < R && ny < C) {
        const index = board[nx][ny].charCodeAt(0) - 65; // 'A' = 65

        if (!visited[index]) {
          visited[index] = true;
          dfs(nx, ny, count + 1);
          visited[index] = false; // 백트래킹
        }
      }
    }
  };

  const startIndex = board[0][0].charCodeAt(0) - 65;
  visited[startIndex] = true;
  dfs(0, 0, 1);

  console.log(maxCount);
});
