const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];

rl.on("line", (line) => {
  input.push(line.trim());
}).on("close", () => {
  const n = parseInt(input[0]); // 첫 줄은 숫자의 개수
  const numbers = input[1].split(" ").map(Number); // 두 번째 줄의 숫자들

  // 소수 판별 함수
  const isPrime = (num) => {
    if (num < 2) return false; // 0과 1은 소수가 아님
    for (let i = 2; i <= Math.sqrt(num); i++) {
      if (num % i === 0) return false; // 약수가 존재하면 소수가 아님
    }
    return true;
  };

  // 주어진 숫자 중 소수의 개수 계산
  const primeCount = numbers.filter(isPrime).length;

  console.log(primeCount); // 결과 출력
});
