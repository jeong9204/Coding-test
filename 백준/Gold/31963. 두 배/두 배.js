const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const N = Number(input[0]);
const A = input[1].split(' ').map(Number);

let count = 0;

for (let i = 1; i < N; i++) {
  let current = A[i];

  // A[i]가 이전 값보다 작거나 같아야 오름차순 유지 가능
  while (current < A[i - 1]) {
    current *= 2;
    count++;
  }

  A[i] = current; // A[i] 갱신
}

console.log(count);
