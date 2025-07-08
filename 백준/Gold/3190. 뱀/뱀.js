const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];
rl.on('line', line => {
  input.push(line.trim());
}).on('close', () => {
  const N = +input[0];
  const K = +input[1];

  const apples = input.slice(2, 2 + K).map(line => {
    const [x, y] = line.split(' ').map(Number);
    return [x - 1, y - 1]; // 0-indexed
  });

  const L = +input[2 + K];
  const commands = input.slice(3 + K).map(line => {
    const [t, d] = line.split(' ');
    return [parseInt(t), d];
  });

  console.log(snakeGame(N, apples, commands));
});

function snakeGame(N, apples, commands) {
  const board = Array.from({ length: N }, () => Array(N).fill(0));
  for (const [x, y] of apples) board[x][y] = 1;

  const dx = [0, 1, 0, -1]; // → ↓ ← ↑
  const dy = [1, 0, -1, 0];

  let dir = 0;
  let time = 0;
  let headX = 0, headY = 0;
  let snake = [[0, 0]]; // 뱀의 몸통 좌표들을 저장 (꼬리 ~ 머리 순)
  const snakeSet = new Set(['0,0']);
  let cmdIndex = 0;

  while (true) {
    time++;
    const nx = headX + dx[dir];
    const ny = headY + dy[dir];

    // 벽에 부딪히면 게임 종료
    if (nx < 0 || nx >= N || ny < 0 || ny >= N || snakeSet.has(`${nx},${ny}`)) {
      return time;
    }

    // 이동
    snake.push([nx, ny]);
    snakeSet.add(`${nx},${ny}`);

    if (board[nx][ny] === 1) {
      board[nx][ny] = 0; // 사과 먹음, 꼬리 안 줄임
    } else {
      const [tx, ty] = snake.shift(); // 꼬리 줄이기
      snakeSet.delete(`${tx},${ty}`);
    }

    // 방향 전환
    if (cmdIndex < commands.length && time === commands[cmdIndex][0]) {
      const c = commands[cmdIndex][1];
      if (c === 'L') dir = (dir + 3) % 4;
      else if (c === 'D') dir = (dir + 1) % 4;
      cmdIndex++;
    }

    headX = nx;
    headY = ny;
  }
}
