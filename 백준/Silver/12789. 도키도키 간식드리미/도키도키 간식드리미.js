// BOJ 12789 도키도키 간식드리미
// 스택 1개로 1..N 순서대로 만들 수 있는지 판별

const fs = require('fs');

const input = fs.readFileSync(0, 'utf8').trim().split(/\s+/);
let idx = 0;

const N = Number(input[idx++]);
const line = new Array(N);
for (let i = 0; i < N; i++) line[i] = Number(input[idx++]);

const stack = [];      // 옆 공간(스택)
let need = 1;          // 다음에 통과해야 할 번호
let p = 0;             // 본 줄에서 현재 보고 있는 위치(맨 앞부터 진행)

while (p < N) {
  // 1) 스택 맨 위가 need면, 가능한 만큼 먼저 빼서 통과시킴
  while (stack.length > 0 && stack[stack.length - 1] === need) {
    stack.pop();
    need++;
  }

  // 2) 본 줄 맨 앞(현재 p)이 need면 바로 통과
  if (line[p] === need) {
    need++;
    p++;
  } else {
    // 3) 아니면 옆 스택으로 이동
    stack.push(line[p]);
    p++;
  }
}

// 본 줄을 다 처리한 뒤에도 스택에서 더 꺼낼 수 있으면 꺼냄
while (stack.length > 0 && stack[stack.length - 1] === need) {
  stack.pop();
  need++;
}

// need가 N+1이면 1..N을 전부 순서대로 통과시킨 것
console.log(need === N + 1 ? 'Nice' : 'Sad');
