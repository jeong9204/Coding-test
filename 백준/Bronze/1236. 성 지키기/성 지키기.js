const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim().split('\n');

const [N, M] = input[0].split(' ').map(Number);
const castle = input.slice(1, N + 1);

let emptyRowCount = 0;
let emptyColCount = 0;

// 경비원이 없는 행 개수 세기
for (let i = 0; i < N; i++) {
  let hasGuard = false;

  for (let j = 0; j < M; j++) {
    if (castle[i][j] === 'X') {
      hasGuard = true;
      break;
    }
  }

  if (!hasGuard) {
    emptyRowCount++;
  }
}

// 경비원이 없는 열 개수 세기
for (let j = 0; j < M; j++) {
  let hasGuard = false;

  for (let i = 0; i < N; i++) {
    if (castle[i][j] === 'X') {
      hasGuard = true;
      break;
    }
  }

  if (!hasGuard) {
    emptyColCount++;
  }
}

console.log(Math.max(emptyRowCount, emptyColCount));