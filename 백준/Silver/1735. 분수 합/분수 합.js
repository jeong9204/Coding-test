// BOJ 1735 - 분수 합
// 두 분수 A1/B1, A2/B2의 합을 기약분수로 출력
// 합: (A1*B2 + A2*B1) / (B1*B2)
// 기약분수: 분자/분모를 GCD로 나눔

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const lines = [];
rl.on('line', (line) => lines.push(line.trim()))
  .on('close', () => {
    // 입력 파싱
    const [A1, B1] = lines[0].split(/\s+/).map(Number);
    const [A2, B2] = lines[1].split(/\s+/).map(Number);

    // 1) 분수 합치기
    const num = A1 * B2 + A2 * B1;   // 새 분자
    const den = B1 * B2;             // 새 분모

    // 2) 최대공약수로 약분
    const g = gcd(num, den);
    const simpNum = num / g;
    const simpDen = den / g;

    console.log(simpNum + ' ' + simpDen);
  });

// 유클리드 호제법 (반복)
function gcd(a, b) {
  while (b !== 0) {
    const r = a % b;
    a = b;
    b = r;
  }
  return a;
}
