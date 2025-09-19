// BOJ - 알고리즘 수업: 수행 시간 (중첩 루프 n^2)
// 첫째 줄: 코드1 수행 횟수 (n^2)
// 둘째 줄: 최고차항 차수 (2)

const fs = require('fs');

const input = fs.readFileSync(0, 'utf8').trim();
const n = BigInt(input);

// 코드1 총 실행 횟수 = n^2
const count = n * n;

// 출력
console.log(count.toString()); // 첫 줄: n^2
console.log(2);                // 둘째 줄: 차수 2
