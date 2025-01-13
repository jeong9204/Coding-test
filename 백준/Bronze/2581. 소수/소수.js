const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const isPrime = (num) => {
  if (num < 2) return false;
  for (let i = 2; i * i <= num; i++) {
    if (num % i === 0) return false;
  }
  return true;
};

let input = [];
rl.on('line', (line) => {
  input.push(Number(line));
  if (input.length === 2) {
    const [M, N] = input;
    const primes = [];

    // 소수 판별 및 저장
    for (let i = M; i <= N; i++) {
      if (isPrime(i)) {
        primes.push(i);
      }
    }

    // 결과 계산
    if (primes.length > 0) {
      const sum = primes.reduce((acc, val) => acc + val, 0);
      const min = Math.min(...primes);
      console.log(sum);
      console.log(min);
    } else {
      console.log(-1);
    }

    rl.close();
  }
});
