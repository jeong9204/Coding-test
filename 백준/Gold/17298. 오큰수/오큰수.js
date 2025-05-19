const fs = require('fs');
const [nStr, aStr] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const n = Number(nStr);
const A = aStr.split(' ').map(Number);

const answer = Array(n).fill(-1); // 기본값 -1로 초기화
const stack = []; // 인덱스를 저장하는 스택

for (let i = 0; i < n; i++) {
  while (stack.length && A[i] > A[stack[stack.length - 1]]) {
    const index = stack.pop();
    answer[index] = A[i];
  }
  stack.push(i);
}

console.log(answer.join(' '));
