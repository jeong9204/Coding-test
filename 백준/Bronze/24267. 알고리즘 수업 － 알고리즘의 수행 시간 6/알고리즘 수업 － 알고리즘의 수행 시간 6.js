const fs = require('fs');

// 입력 n 읽기
const n = BigInt(fs.readFileSync(0, 'utf8').trim());

// 코드1 수행 횟수 = nC3 = n*(n-1)*(n-2)/6
// 단, n이 1이나 2일 수도 있기 때문에 음수 안 나오게 주의할 필요는 없지만
// 결과는 자동으로 0이 될 거라 괜찮다.
let count;
if (n < 3n) {
  count = 0n;
} else {
  count = (n * (n - 1n) * (n - 2n)) / 6n;
}

// 출력
// 첫째 줄: 실행 횟수
// 둘째 줄: 최고차항의 차수 (이 알고리즘은 항상 3중 반복문 구조라 3)
console.log(count.toString());
console.log(3);
