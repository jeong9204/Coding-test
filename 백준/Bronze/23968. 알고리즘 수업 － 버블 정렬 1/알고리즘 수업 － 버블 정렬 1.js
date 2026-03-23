const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim().split('\n');

const [N, K] = input[0].split(' ').map(Number);
const A = input[1].split(' ').map(Number);

let count = 0;
let answer = null;

for (let last = N - 1; last >= 1; last--) {
  let swapped = false;

  for (let i = 0; i < last; i++) {
    if (A[i] > A[i + 1]) {
      const x = A[i];
      const y = A[i + 1];

      // 교환 횟수 증가
      count++;

      // K번째 교환이면 답 저장 후 종료 준비
      if (count === K) {
        answer = [Math.min(x, y), Math.max(x, y)];
        break;
      }

      // 실제 swap
      A[i] = y;
      A[i + 1] = x;
      swapped = true;
    }
  }

  if (answer !== null) break;
  if (!swapped) break; // 이미 정렬 완료
}

if (answer === null) {
  console.log(-1);
} else {
  console.log(answer.join(' '));
}