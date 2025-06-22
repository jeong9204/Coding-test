const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const board = [];
const blanks = [];

rl.on("line", (line) => {
  const row = line.trim().split(" ").map(Number);
  board.push(row);
  if (board.length === 9) rl.close();
});

rl.on("close", () => {
  // 0인 칸을 찾아 blanks에 넣는다
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (board[i][j] === 0) {
        blanks.push([i, j]);
      }
    }
  }

  // DFS 시작
  solve(0);
});

// 백트래킹 함수
function solve(idx) {
  if (idx === blanks.length) {
    // 모든 빈칸을 다 채웠으면 출력하고 종료
    board.forEach((row) => {
      console.log(row.join(" "));
    });
    process.exit(0); // 하나만 출력하고 종료
  }

  const [x, y] = blanks[idx];

  for (let num = 1; num <= 9; num++) {
    if (isValid(x, y, num)) {
      board[x][y] = num; // 숫자 채워보기
      solve(idx + 1);    // 다음 빈칸 시도
      board[x][y] = 0;   // 실패하면 백트래킹
    }
  }
}

// 해당 숫자를 놓아도 유효한지 검사
function isValid(x, y, num) {
  // 행 검사
  for (let j = 0; j < 9; j++) {
    if (board[x][j] === num) return false;
  }

  // 열 검사
  for (let i = 0; i < 9; i++) {
    if (board[i][y] === num) return false;
  }

  // 3x3 박스 검사
  const startRow = Math.floor(x / 3) * 3;
  const startCol = Math.floor(y / 3) * 3;
  for (let i = startRow; i < startRow + 3; i++) {
    for (let j = startCol; j < startCol + 3; j++) {
      if (board[i][j] === num) return false;
    }
  }

  return true;
}
