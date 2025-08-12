const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const lines = [];
rl.on('line', (line) => lines.push(line.trim()))
  .on('close', () => {
    const [N, L, R] = lines[0].split(' ').map(Number);
    const A = Array.from({ length: N }, (_, i) =>
      lines[1 + i].split(' ').map(Number)
    );

    const dirs = [
      [1, 0],
      [-1, 0],
      [0, 1],
      [0, -1],
    ];

    let days = 0;

    while (true) {
      const visited = Array.from({ length: N }, () => Array(N).fill(false));
      let moved = false;

      for (let r = 0; r < N; r++) {
        for (let c = 0; c < N; c++) {
          if (visited[r][c]) continue;

          // BFS로 연합 찾기
          const q = [[r, c]];
          let qi = 0;
          visited[r][c] = true;

          const unionCells = [[r, c]];
          let sum = A[r][c];

          while (qi < q.length) {
            const [cr, cc] = q[qi++];

            for (const [dr, dc] of dirs) {
              const nr = cr + dr, nc = cc + dc;
              if (nr < 0 || nr >= N || nc < 0 || nc >= N) continue;
              if (visited[nr][nc]) continue;

              const diff = Math.abs(A[cr][cc] - A[nr][nc]);
              if (diff >= L && diff <= R) {
                visited[nr][nc] = true;
                q.push([nr, nc]);
                unionCells.push([nr, nc]);
                sum += A[nr][nc];
              }
            }
          }

          // 연합 크기가 2 이상이면 인구 이동 발생
          if (unionCells.length > 1) {
            moved = true;
            const avg = Math.floor(sum / unionCells.length);
            for (const [ur, uc] of unionCells) {
              A[ur][uc] = avg;
            }
          }
        }
      }

      if (!moved) break; // 그날 이동이 없으면 종료
      days++;
    }

    console.log(days);
  });
