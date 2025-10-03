// 실행: node main.js < input.txt
const fs = require('fs');
const n = BigInt(fs.readFileSync(0, 'utf8').trim());

// 코드1 수행 횟수: nC2 = n*(n-1)/2
const count = (n * (n - 1n)) / 2n;

// 1줄: 수행 횟수
console.log(count.toString());

// 2줄: 최고차항의 차수 (n^2 이므로 2)
console.log(2);
