const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n').map(Number);

const MAX = 123456 * 2;
const isPrime = new Array(MAX + 1).fill(true);
isPrime[0] = false;
isPrime[1] = false;

// 에라토스테네스의 체로 소수 판별
for (let i = 2; i * i <= MAX; i++) {
  if (isPrime[i]) {
    for (let j = i * i; j <= MAX; j += i) {
      isPrime[j] = false;
    }
  }
}

const result = [];

for (const n of input) {
  if (n === 0) break;
  let count = 0;
  for (let i = n + 1; i <= 2 * n; i++) {
    if (isPrime[i]) count++;
  }
  result.push(count);
}

console.log(result.join('\n'));
