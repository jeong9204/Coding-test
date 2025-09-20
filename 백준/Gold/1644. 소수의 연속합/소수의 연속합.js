// BOJ 1644 - 소수의 연속합
// 전략: (1) 에라토스테네스의 체로 소수 목록 생성 (2) 투 포인터로 연속 부분합 = N 카운트
// 입력 N은 1 ≤ N ≤ 4,000,000

const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const N = Number(input);

// N=1이면 소수 합으로 표현 불가
if (N < 2) {
  console.log(0);
  process.exit(0);
}

// 1) 에라토스테네스의 체: N 이하 소수 구하기
function sieve(n) {
  const isComposite = new Uint8Array(n + 1); // 0 = prime 가정, 1 = composite
  const primes = [];
  for (let i = 2; i * i <= n; i++) {
    if (!isComposite[i]) {
      for (let j = i * i; j <= n; j += i) {
        isComposite[j] = 1;
      }
    }
  }
  for (let i = 2; i <= n; i++) {
    if (!isComposite[i]) primes.push(i);
  }
  return primes;
}

const primes = sieve(N);

// 2) 투 포인터로 연속 부분합 = N 개수 세기
let l = 0, r = 0, sum = 0, count = 0;

while (true) {
  if (sum >= N) {
    if (sum === N) count++;
    sum -= primes[l++];
  } else {
    if (r === primes.length) break;
    sum += primes[r++];
  }
}

console.log(count.toString());
