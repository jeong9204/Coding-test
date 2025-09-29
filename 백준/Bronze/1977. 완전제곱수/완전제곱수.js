// 실행: node main.js < input.txt
const fs = require('fs');

const lines = fs.readFileSync(0, 'utf8').trim().split(/\s+/).map(Number);
const M = lines[0];
const N = lines[1];

// 제곱근 구간으로 변환
const start = Math.ceil(Math.sqrt(M)); // 가장 작은 밑 k (k^2 >= M)
const end = Math.floor(Math.sqrt(N));  // 가장 큰 밑 k (k^2 <= N)

if (start > end) {
  // 구간 내 완전제곱수가 없음
  console.log(-1);
} else {
  let sum = 0;
  for (let k = start; k <= end; k++) {
    sum += k * k;
  }
  const minSquare = start * start;

  console.log(sum);
  console.log(minSquare);
}
