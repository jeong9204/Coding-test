const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];

rl.on('line', (line) => {
  input.push(Number(line));
}).on('close', () => {
  const n = input[0];
  const fib = [0, 1]; // F(0) = 0, F(1) = 1 초기값 설정

  for (let i = 2; i <= n; i++) {
    fib[i] = fib[i - 1] + fib[i - 2];
  }

  console.log(fib[n]); // n번째 피보나치 수 출력
});
