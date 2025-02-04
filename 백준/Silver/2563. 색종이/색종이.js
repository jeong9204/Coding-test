const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];
rl.on("line", (line) => {
  input.push(line);
}).on("close", () => {
  const n = Number(input[0]); // 색종이 개수
  const paper = Array.from(Array(100), () => Array(100).fill(0)); // 100x100 도화지

  // 색종이 붙이기
  for (let i = 1; i <= n; i++) {
    const [x, y] = input[i].split(" ").map(Number);

    for (let dx = 0; dx < 10; dx++) {
      for (let dy = 0; dy < 10; dy++) {
        paper[x + dx][y + dy] = 1; // 색종이 영역을 1로 설정
      }
    }
  }

  // 검은 영역(1의 개수) 계산
  let blackArea = 0;
  for (let i = 0; i < 100; i++) {
    for (let j = 0; j < 100; j++) {
      if (paper[i][j] === 1) blackArea++;
    }
  }

  console.log(blackArea);
});
