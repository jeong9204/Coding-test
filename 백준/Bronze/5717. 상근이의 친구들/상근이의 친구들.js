// 백준 - 상근이의 친구 (5717)
// Node.js 풀이: 각 줄의 두 수 M, F를 더하고, 0 0 나오면 종료

const fs = require('fs');

// 입력 전체를 읽어서 공백 기준으로 숫자 배열로 만들기
const input = fs.readFileSync(0, 'utf8').trim().split(/\s+/).map(Number);

let idx = 0;
const outputs = [];

while (idx < input.length) {
  const M = input[idx++];
  const F = input[idx++];

  // 종료 조건: 0 0
  if (M === 0 && F === 0) {
    break;
  }

  // 친구 수 = 남자 친구 + 여자 친구
  outputs.push(String(M + F));
}

// 줄바꿈으로 합쳐서 출력
console.log(outputs.join('\n'));
