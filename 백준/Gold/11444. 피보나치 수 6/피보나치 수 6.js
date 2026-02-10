// BOJ - Fibonacci (mod 1,000,000,007)
// Fast Doubling + BigInt

'use strict';

const fs = require('fs');

const input = fs.readFileSync(0, 'utf8').trim();
const n = BigInt(input);

const MOD = 1000000007n;

// fibPair(n) -> [F(n) % MOD, F(n+1) % MOD]
function fibPair(x) {
  if (x === 0n) return [0n, 1n];

  const [a, b] = fibPair(x >> 1n); // a = F(k), b = F(k+1), where k = floor(x/2)

  // c = F(2k), d = F(2k+1)
  // c = F(k) * (2*F(k+1) - F(k))
  let twoBMinusA = (2n * b - a) % MOD;
  if (twoBMinusA < 0n) twoBMinusA += MOD; // 음수 보정

  const c = (a * twoBMinusA) % MOD;

  // d = F(k)^2 + F(k+1)^2
  const d = (a * a + b * b) % MOD;

  if ((x & 1n) === 0n) {
    // x = 2k
    return [c, d];
  } else {
    // x = 2k+1
    // F(2k+1) = d
    // F(2k+2) = F(2k) + F(2k+1) = c + d
    return [d, (c + d) % MOD];
  }
}

const [fn] = fibPair(n);
console.log(fn.toString());
