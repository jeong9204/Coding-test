// BOJ 6064 - 카잉 달력
// Node.js (ECMAScript 2021)

const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim().split(/\s+/).map(Number);
let p = 0;

const T = input[p++];

const gcd = (a, b) => {
  while (b !== 0) {
    const t = a % b;
    a = b;
    b = t;
  }
  return a;
};
const lcm = (a, b) => (a / gcd(a, b)) * b;

// 안전한 모듈러(음수 방지)
const mod = (a, m) => {
  const r = a % m;
  return r < 0 ? r + m : r;
};

let out = [];
for (let tc = 0; tc < T; tc++) {
  const M = input[p++], N = input[p++], x = input[p++], y = input[p++];

  // 마지막 해(탐색 상한)
  const LIM = lcm(M, N);

  // k는 x부터 시작해서 M씩 증가 (k ≡ x mod M 보장)
  // 매번 (k ≡ y mod N)인지 검사
  let k = x;
  let answer = -1;

  // 반복 횟수는 최대 N / gcd(M, N)번
  while (k <= LIM) {
    // (k % N)과 y의 비교 시, 카잉 달력은 0을 N으로 본다.
    // 즉, k % N == 0 이면 N으로 간주해야 하므로 다음처럼 체크:
    if (mod(k - y, N) === 0) {
      answer = k;
      break;
    }
    k += M;
  }

  out.push(String(answer));
}

console.log(out.join('\n'));
