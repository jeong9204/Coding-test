const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim();

let stack = [];
let result = 0;

for (let i = 0; i < input.length; i++) {
  const now = input[i];

  if (now === '(') {
    stack.push('(');
  } else { // now === ')'
    stack.pop(); // 현재 닫는 괄호에 대응하는 여는 괄호 제거

    if (input[i - 1] === '(') {
      // 레이저인 경우: 앞이 '(' 였다면 '()' 즉 레이저!
      result += stack.length;
    } else {
      // 쇠막대기 끝나는 지점
      result += 1;
    }
  }
}

console.log(result);
