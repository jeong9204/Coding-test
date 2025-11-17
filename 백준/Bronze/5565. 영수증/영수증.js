// BOJ 스타일 Node.js 풀이

const fs = require('fs');

// 전체 입력을 줄 단위로 읽기
const lines = fs.readFileSync(0, 'utf8').trim().split('\n');

// 첫 줄: 10권의 총 가격
const total = Number(lines[0].trim());

// 다음 9줄: 각각 한 권의 가격
let sumKnown = 0;
for (let i = 1; i <= 9; i++) {
  const price = Number(lines[i].trim());
  sumKnown += price;
}

// 읽을 수 없는 한 권의 가격 = 총합 - 9권의 합
const missing = total - sumKnown;

console.log(missing.toString());
