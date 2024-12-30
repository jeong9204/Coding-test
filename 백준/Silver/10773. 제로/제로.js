const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

// 첫 번째 줄: 명령의 수 K
const K = parseInt(input[0]);

// 나머지 줄: 정수 명령들
const commands = input.slice(1).map(Number);

// 스택 사용을 위해 빈 배열 생성
const stack = [];

// 명령 처리
for (let i = 0; i < K; i++) {
  const num = commands[i];
  if (num === 0) {
    // 0이면 가장 최근의 수를 제거 (스택에서 pop)
    stack.pop();
  } else {
    // 0이 아닌 숫자는 스택에 추가
    stack.push(num);
  }
}

// 스택에 남은 숫자들의 합 계산
const sum = stack.reduce((acc, curr) => acc + curr, 0);

// 결과 출력
console.log(sum);
