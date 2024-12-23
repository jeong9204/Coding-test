const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on("line", (line) => {
  const n = parseInt(line); // 입력받은 n을 정수로 변환

  if (n === 0) {
    console.log(0); // n이 0일 경우 바로 0 출력
    rl.close();
    return;
  }

  if (n === 1) {
    console.log(1); // n이 1일 경우 바로 1 출력
    rl.close();
    return;
  }

  // 피보나치 계산 (반복문 사용)
  let a = 0, // F(0)
    b = 1; // F(1)

  for (let i = 2; i <= n; i++) {
    const next = a + b; // 현재 두 수의 합을 계산
    a = b; // b를 a로 업데이트
    b = next; // 새로 계산된 합을 b로 업데이트
  }

  console.log(b); // n번째 피보나치 수 출력
  rl.close();
});
