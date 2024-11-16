// 입력을 처리하는 모듈
const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on("line", (line) => {
  // 입력받은 두 숫자를 공백으로 분리
  const [A, B] = line.split(" ");
  
  // 숫자를 뒤집는 함수
  const reverseNumber = (num) => {
    return parseInt(num.split("").reverse().join(""), 10);
  };

  // A와 B를 뒤집음
  const reversedA = reverseNumber(A);
  const reversedB = reverseNumber(B);

  // 둘 중 더 큰 값을 출력
  console.log(Math.max(reversedA, reversedB));

  rl.close();
});
