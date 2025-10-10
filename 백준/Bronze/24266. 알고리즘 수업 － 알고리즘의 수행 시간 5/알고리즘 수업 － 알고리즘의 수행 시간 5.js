// 실행: node main.js < input.txt
const fs = require('fs');

// n을 문자열로 읽어 BigInt로 변환
const n = BigInt(fs.readFileSync(0, 'utf8').trim());

// 수행 횟수: n^3 (BigInt로 정확 계산)
const count = n * n * n;

// 출력
console.log(count.toString()); // 첫째 줄: 정확한 수행 횟수
console.log(3);                // 둘째 줄: 최고차항의 차수
