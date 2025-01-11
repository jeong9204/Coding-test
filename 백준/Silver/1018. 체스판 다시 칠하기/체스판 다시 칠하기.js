const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];
rl.on("line", (line) => {
  input.push(line);
}).on("close", () => {
  const [N, M] = input[0].split(" ").map(Number);
  const board = input.slice(1);

  // 체스판의 두 가지 패턴 정의
  const whiteStartPattern = [
    "WBWBWBWB",
    "BWBWBWBW",
    "WBWBWBWB",
    "BWBWBWBW",
    "WBWBWBWB",
    "BWBWBWBW",
    "WBWBWBWB",
    "BWBWBWBW",
  ];
  const blackStartPattern = [
    "BWBWBWBW",
    "WBWBWBWB",
    "BWBWBWBW",
    "WBWBWBWB",
    "BWBWBWBW",
    "WBWBWBWB",
    "BWBWBWBW",
    "WBWBWBWB",
  ];

  // 보드의 최소 다시 칠해야 하는 개수를 계산하는 함수
  const countRepaints = (startX, startY, pattern) => {
    let count = 0;
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        if (board[startX + i][startY + j] !== pattern[i][j]) {
          count++;
        }
      }
    }
    return count;
  };

  let minRepaints = Infinity;

  // 8x8 체스판을 선택 가능한 모든 위치에서 확인
  for (let i = 0; i <= N - 8; i++) {
    for (let j = 0; j <= M - 8; j++) {
      const whiteRepaints = countRepaints(i, j, whiteStartPattern);
      const blackRepaints = countRepaints(i, j, blackStartPattern);
      minRepaints = Math.min(minRepaints, whiteRepaints, blackRepaints);
    }
  }

  console.log(minRepaints);
});
