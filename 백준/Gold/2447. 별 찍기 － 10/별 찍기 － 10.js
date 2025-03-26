const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim();
const N = Number(input);

// N x N 2차원 배열 초기화
const board = Array.from({ length: N }, () => Array(N).fill('*'));

function fillBlank(x, y, size) {
  const gap = size / 3;

  // 가운데를 공백으로 채움
  for (let i = x + gap; i < x + 2 * gap; i++) {
    for (let j = y + gap; j < y + 2 * gap; j++) {
      board[i][j] = ' ';
    }
  }

  // 더 작게 나눌 수 있다면 재귀 호출
  if (gap >= 3) {
    for (let dx = 0; dx < 3; dx++) {
      for (let dy = 0; dy < 3; dy++) {
        fillBlank(x + dx * gap, y + dy * gap, gap);
      }
    }
  }
}

// 최초 호출
fillBlank(0, 0, N);

// 결과 출력
console.log(board.map(row => row.join('')).join('\n'));
