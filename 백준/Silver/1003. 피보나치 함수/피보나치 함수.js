const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const input = [];

rl.on("line", (line) => {
  input.push(line);
}).on("close", () => {
  const T = parseInt(input[0]); // 테스트 케이스 개수
  const testCases = input.slice(1).map(Number); // 각 테스트 케이스의 N 값
  const maxN = Math.max(...testCases);

  // 동적 프로그래밍 배열
  const countZero = new Array(maxN + 1).fill(0);
  const countOne = new Array(maxN + 1).fill(0);

  // 초기 값 설정
  countZero[0] = 1;
  countOne[0] = 0;
  if (maxN >= 1) {
    countZero[1] = 0;
    countOne[1] = 1;
  }

  // 동적 프로그래밍 계산
  for (let i = 2; i <= maxN; i++) {
    countZero[i] = countZero[i - 1] + countZero[i - 2];
    countOne[i] = countOne[i - 1] + countOne[i - 2];
  }

  // 결과 출력
  testCases.forEach((N) => {
    console.log(`${countZero[N]} ${countOne[N]}`);
  });
});
