// 실행: node main.js < input.txt
const fs = require('fs');
const s = fs.readFileSync(0, 'utf8').trim();
const [Astr, Bstr] = s.split(/\s+/);
let A = BigInt(Astr);
let B = BigInt(Bstr);

// 절댓값 BigInt
const abs = (x) => (x < 0n ? -x : x);

// 유클리드 호제법 (GCD)
function gcd(a, b) {
  a = abs(a);
  b = abs(b);
  while (b !== 0n) {
    const t = a % b;
    a = b;
    b = t;
  }
  return a;
}

// LCM 계산
function lcm(a, b) {
  if (a === 0n || b === 0n) return 0n; // 한쪽이 0이면 최소공배수 0
  const g = gcd(a, b);
  // (a / g) * b 순서로 곱해 overflow/성능 이점 (BigInt라 overflow 걱정은 적지만 습관적으로 안전)
  return (abs(a) / g) * abs(b);
}

const ans = lcm(A, B);
console.log(ans.toString());
