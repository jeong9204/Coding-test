const fs = require('fs');

const [A, B] = fs.readFileSync(0, 'utf8').trim().split(/\s+/).map(Number);

// 1) 수열을 B번째 원소까지 생성
const arr = [];
for (let i = 1; arr.length < B; i++) {
  for (let j = 0; j < i && arr.length < B; j++) {
    arr.push(i);
  }
}

// 2) A~B 구간 합 (입력은 1-indexed이므로 인덱스는 A-1 ~ B-1)
let sum = 0;
for (let i = A - 1; i <= B - 1; i++) sum += arr[i];

console.log(sum);
