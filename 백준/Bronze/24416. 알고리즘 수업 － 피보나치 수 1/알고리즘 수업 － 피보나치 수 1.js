// BOJ 24416: 알고리즘 수업 - 피보나치 수 1
// Node.js (백준 표준 입력)

const fs = require('fs');
const n = parseInt(fs.readFileSync(0, 'utf8').trim(), 10);

// 안전장치 (문제 보장: 5 ≤ n ≤ 40)
if (isNaN(n) || n < 1) {
  console.log('0 0');
  process.exit(0);
}

// 1) F(n) 계산 (F(1)=1, F(2)=1)
function fibIter(n) {
  if (n <= 2) return 1;
  let a = 1; // F(1)
  let b = 1; // F(2)
  for (let i = 3; i <= n; i++) {
    const c = a + b; // F(i) = F(i-1) + F(i-2)
    a = b;
    b = c;
  }
  return b; // F(n)
}

const code1Count = fibIter(n); // 재귀 기준 코드1 실행 횟수 = F(n)
const code2Count = Math.max(0, n - 2); // DP 기준 코드2 실행 횟수 = n-2

console.log(`${code1Count} ${code2Count}`);
