const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const [N, M] = input[0].split(' ').map(Number);
const targets = input[1].split(' ').map(Number);

let deque = Array.from({ length: N }, (_, i) => i + 1); // 1~N
let totalOps = 0;

for (let target of targets) {
  let idx = deque.indexOf(target);

  // 왼쪽으로 회전 vs 오른쪽으로 회전 중 더 짧은 쪽 선택
  if (idx <= Math.floor(deque.length / 2)) {
    // 왼쪽으로 idx번 회전
    while (deque[0] !== target) {
      deque.push(deque.shift());
      totalOps++;
    }
  } else {
    // 오른쪽으로 (deque.length - idx)번 회전
    while (deque[0] !== target) {
      deque.unshift(deque.pop());
      totalOps++;
    }
  }

  // 맨 앞 요소 제거
  deque.shift();
}

console.log(totalOps);
