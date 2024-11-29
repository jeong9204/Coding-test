const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];

rl.on("line", (line) => {
  input.push(line);
}).on("close", () => {
  const n = parseInt(input[0]); // 첫 번째 줄은 숫자의 개수 N
  const numbers = input.slice(1, n + 1).map(Number); // 나머지 줄은 숫자들로 변환

  // 오름차순 정렬
  numbers.sort((a, b) => a - b);

  // 결과 출력
  numbers.forEach((num) => console.log(num));
});
