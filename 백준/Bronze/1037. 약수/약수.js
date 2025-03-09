const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let input = [];
rl.on('line', (line) => {
  input.push(line);
}).on('close', () => {
  const numDivisors = Number(input[0]);  // 약수 개수 (사용하지 않음)
  const divisors = input[1].split(' ').map(Number); // 진짜 약수 배열
  
  const N = Math.min(...divisors) * Math.max(...divisors); // N을 찾는 공식
  console.log(N);
});
