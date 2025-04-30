const readline = require('readline');
const rl = readline.createInterface({ input: process.stdin });

let input = [];
rl.on('line', line => input.push(line)).on('close', () => {
  const T = Number(input[0]);
  let line = 1;

  const dx = [-2, -1, 1, 2, 2, 1, -1, -2];
  const dy = [1, 2, 2, 1, -1, -2, -2, -1];

  const results = [];

  for (let t = 0; t < T; t++) {
    const l = Number(input[line++]);
    const [startX, startY] = input[line++].split(' ').map(Number);
    const [endX, endY] = input[line++].split(' ').map(Number);

    if (startX === endX && startY === endY) {
      results.push(0);
      continue;
    }

    const visited = Array.from({ length: l }, () => Array(l).fill(false));
    const queue = [[startX, startY, 0]];
    visited[startX][startY] = true;

    let found = false;
    while (queue.length && !found) {
      const [x, y, moves] = queue.shift();

      for (let i = 0; i < 8; i++) {
        const nx = x + dx[i];
        const ny = y + dy[i];

        if (nx < 0 || ny < 0 || nx >= l || ny >= l || visited[nx][ny]) continue;

        if (nx === endX && ny === endY) {
          results.push(moves + 1);
          found = true;
          break;
        }

        visited[nx][ny] = true;
        queue.push([nx, ny, moves + 1]);
      }
    }
  }

  console.log(results.join('\n'));
});
