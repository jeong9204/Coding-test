// BOJ 1075: 나누기
// Node.js 풀이

const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim().split('\n');

const N = Number(input[0].trim());
const F = Number(input[1].trim());

// N의 마지막 두 자리를 00으로 만든 base
const base = Math.floor(N / 100) * 100;

let answerSuffix = 0;

for (let i = 0; i < 100; i++) {
  const candidate = base + i;
  if (candidate % F === 0) {
    answerSuffix = i;
    break; // 가장 작은 i를 찾으면 바로 종료
  }
}

// 두 자리 문자열로 출력 (한 자리면 앞에 0 붙이기)
const result = String(answerSuffix).padStart(2, '0');
console.log(result);
