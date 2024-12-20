const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on("line", (line) => {
  const N = parseInt(line); // 입력받은 숫자
  let result = 0; // 가장 작은 생성자 초기화 (없으면 0 출력)

  // 완전 탐색: 1부터 N까지 검사
  for (let i = 1; i < N; i++) {
    const sumOfDigits = i
      .toString()
      .split("")
      .map(Number)
      .reduce((a, b) => a + b, 0); // i의 각 자리수 합

    if (i + sumOfDigits === N) {
      result = i; // 가장 작은 생성자 발견
      break;
    }
  }

  console.log(result); // 결과 출력
  rl.close();
});
