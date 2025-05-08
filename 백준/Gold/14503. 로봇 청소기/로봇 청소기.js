const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const input = [];
rl.on('line', line => input.push(line)).on('close', () => {
  const [N, M] = input[0].split(' ').map(Number);
  let [r, c, d] = input[1].split(' ').map(Number);
  const map = input.slice(2).map(line => line.split(' ').map(Number));

  const visited = Array.from({ length: N }, () => Array(M).fill(0)); // 청소 여부 체크
  const dx = [-1, 0, 1, 0]; // 북 동 남 서
  const dy = [0, 1, 0, -1];

  let cleaned = 0;

  while (true) {
    // 1. 현재 위치 청소
    if (visited[r][c] === 0) {
      visited[r][c] = 1;
      cleaned++;
    }

    let moved = false;
    for (let i = 0; i < 4; i++) {
      // 2. 왼쪽 방향 확인
      d = (d + 3) % 4;
      const nx = r + dx[d];
      const ny = c + dy[d];

      if (map[nx][ny] === 0 && visited[nx][ny] === 0) {
        r = nx;
        c = ny;
        moved = true;
        break;
      }
    }

    if (!moved) {
      // 3. 후진
      const backDir = (d + 2) % 4;
      const bx = r + dx[backDir];
      const by = c + dy[backDir];

      if (map[bx][by] === 1) {
        // 뒤가 벽이면 멈춤
        break;
      } else {
        r = bx;
        c = by;
      }
    }
  }

  console.log(cleaned);
});
