// BOJ: n 이상에서 가장 작은 소수 찾기
// Node.js (BigInt) + 결정적 Miller-Rabin (32-bit 범위에 충분)

const fs = require('fs');

const input = fs.readFileSync(0, 'utf8').trim().split(/\s+/);
let idx = 0;
const T = Number(input[idx++]);

// (a * b) % mod  -- BigInt면 그냥 곱해도 안전
function modMul(a, b, mod) {
  return (a * b) % mod;
}

// (base^exp) % mod
function modPow(base, exp, mod) {
  let result = 1n;
  let b = base % mod;
  let e = exp;

  while (e > 0n) {
    if (e & 1n) result = modMul(result, b, mod);
    b = modMul(b, b, mod);
    e >>= 1n;
  }
  return result;
}

// Miller-Rabin witness test
function isComposite(n, a, d, s) {
  // a^d % n
  let x = modPow(a, d, n);
  if (x === 1n || x === n - 1n) return false;

  for (let r = 1; r < s; r++) {
    x = modMul(x, x, n);
    if (x === n - 1n) return false;
  }
  return true; // 합성수임을 증명
}

function isPrimeBigInt(n) {
  if (n < 2n) return false;
  if (n === 2n || n === 3n) return true;
  if (n % 2n === 0n) return false;

  // 작은 소수로 빠른 컷 (속도 개선 + MR 베이스 호출 감소)
  const smallPrimes = [3n, 5n, 7n, 11n, 13n, 17n, 19n, 23n, 29n, 31n, 37n];
  for (const p of smallPrimes) {
    if (n === p) return true;
    if (n % p === 0n) return false;
  }

  // n-1 = d * 2^s 꼴로 분해
  let d = n - 1n;
  let s = 0;
  while ((d & 1n) === 0n) {
    d >>= 1n;
    s++;
  }

  // 32-bit 범위(여기선 4e9 근처)에서는 아래 베이스들로 결정적 판별이 충분히 안전
  // (여유 있게 몇 개 더 사용)
  const bases = [2n, 3n, 5n, 7n, 11n];

  for (const a of bases) {
    if (a >= n) continue;
    if (isComposite(n, a, d, s)) return false;
  }
  return true;
}

function nextPrimeAtLeast(nNum) {
  let n = BigInt(nNum);

  if (n <= 2n) return 2n;
  if (n % 2n === 0n) n += 1n; // 홀수부터 시작

  while (!isPrimeBigInt(n)) {
    n += 2n; // 홀수만 검사
  }
  return n;
}

let out = [];
for (let t = 0; t < T; t++) {
  const nStr = input[idx++];
  const nNum = Number(nStr); // 입력은 4e9 이하라 Number로 안전
  const ans = nextPrimeAtLeast(nNum);
  out.push(ans.toString());
}

console.log(out.join('\n'));
