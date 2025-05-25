const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const N = Number(input[0]);
const A = input[1].split(' ').map(Number);

A.sort((a, b) => a - b); // 정렬 필요 (투포인터용)

let count = 0;

for (let k = 0; k < N; k++) {
  const target = A[k];
  let i = 0;
  let j = N - 1;

  while (i < j) {
    if (i === k) {
      i++;
      continue;
    }
    if (j === k) {
      j--;
      continue;
    }

    const sum = A[i] + A[j];
    if (sum === target) {
      count++;
      break; // 중복 GOOD은 한 번만 카운트
    } else if (sum < target) {
      i++;
    } else {
      j--;
    }
  }
}

console.log(count);
