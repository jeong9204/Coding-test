const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const input = [];

rl.on('line', line => input.push(line)).on('close', () => {
  const [N, M] = input[0].split(' ').map(Number);
  const board = input.slice(1).map(line => line.split(' ').map(Number));

  const visited = Array.from({ length: N }, () => Array(M).fill(false));
  const dx = [-1, 1, 0, 0]; // 상하좌우
  const dy = [0, 0, -1, 1];

  let maxSum = 0;

  const dfs = (x, y, depth, sum) => {
    if (depth === 4) {
      maxSum = Math.max(maxSum, sum);
      return;
    }

    for (let i = 0; i < 4; i++) {
      const nx = x + dx[i];
      const ny = y + dy[i];

      if (nx >= 0 && ny >= 0 && nx < N && ny < M && !visited[nx][ny]) {
        visited[nx][ny] = true;
        dfs(nx, ny, depth + 1, sum + board[nx][ny]);
        visited[nx][ny] = false;
      }
    }
  };

  // 'ㅗ' 모양 처리
  const checkExtraShapes = (x, y) => {
    const center = board[x][y];

    const shapes = [
      [[0, 1], [0, -1], [-1, 0]], // ㅗ
      [[0, 1], [0, -1], [1, 0]],  // ㅜ
      [[1, 0], [-1, 0], [0, -1]], // ㅓ
      [[1, 0], [-1, 0], [0, 1]]   // ㅏ
    ];

    for (const shape of shapes) {
      let tempSum = center;
      let isValid = true;

      for (const [dx, dy] of shape) {
        const nx = x + dx;
        const ny = y + dy;

        if (nx < 0 || ny < 0 || nx >= N || ny >= M) {
          isValid = false;
          break;
        }
        tempSum += board[nx][ny];
      }

      if (isValid) {
        maxSum = Math.max(maxSum, tempSum);
      }
    }
  };

  // 모든 좌표에서 시작
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      visited[i][j] = true;
      dfs(i, j, 1, board[i][j]);
      visited[i][j] = false;

      checkExtraShapes(i, j); // 'ㅗ' 모양 확인
    }
  }

  console.log(maxSum);
});
