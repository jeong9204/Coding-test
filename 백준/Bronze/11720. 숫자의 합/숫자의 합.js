const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let inputLines = [];

rl.on("line", (line) => {
  inputLines.push(line);
});

rl.on("close", () => {
  const N = parseInt(inputLines[0]); // 숫자의 개수
  const numbers = inputLines[1]; // 공백 없이 이어진 숫자들

  let sum = 0;
  for (let i = 0; i < N; i++) {
    sum += parseInt(numbers[i]); // 각 자릿수를 정수로 변환 후 합산
  }

  console.log(sum);
});
