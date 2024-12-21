const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on("line", (line) => {
  const N = parseInt(line); // 입력받은 값을 정수로 변환
  for (let i = N; i > 0; i--) {
    console.log("*".repeat(i)); // 별을 i번 반복하여 출력
  }
  rl.close();
});
