const fs = require('fs');

const input = fs.readFileSync(0, 'utf8').trim().split(/\s+/).map(Number);

// 19x19
const board = Array.from({ length: 19 }, (_, i) =>
  input.slice(i * 19, (i + 1) * 19)
);

const N = 19;

// 4 directions: →, ↓, ↘, ↗
const dirs = [
  [0, 1],
  [1, 0],
  [1, 1],
  [-1, 1],
];

function inRange(r, c) {
  return r >= 0 && r < N && c >= 0 && c < N;
}

for (let r = 0; r < N; r++) {
  for (let c = 0; c < N; c++) {
    const color = board[r][c];
    if (color === 0) continue;

    for (const [dr, dc] of dirs) {
      // 시작점인지 확인: 이전 칸이 같은 색이면 여기서 세면 중복/좌표 조건 깨짐
      const pr = r - dr;
      const pc = c - dc;
      if (inRange(pr, pc) && board[pr][pc] === color) continue;

      // 연속 개수 세기
      let cnt = 1;
      let nr = r + dr;
      let nc = c + dc;
      while (inRange(nr, nc) && board[nr][nc] === color) {
        cnt++;
        nr += dr;
        nc += dc;
      }

      // 정확히 5개인지 + 6개 이상 방지
      if (cnt === 5) {
        // nr,nc는 "연속이 끝난 다음 칸"
        // 만약 그 칸도 같은 색이면 6개 이상인데 while에서 이미 깨졌으니 사실상 불필요
        // 대신 안전하게 한 번 더 체크 (로직 명확화)
        if (inRange(nr, nc) && board[nr][nc] === color) continue;

        // 승자 출력 + 시작점 좌표(문제는 1-index)
        console.log(color);
        console.log((r + 1) + ' ' + (c + 1));
        process.exit(0);
      }
    }
  }
}

// 아무도 이기지 못함
console.log(0);
