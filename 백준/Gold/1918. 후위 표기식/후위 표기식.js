// 실행: node main.js < input.txt
const fs = require('fs');
const expr = fs.readFileSync(0, 'utf8').trim();

const out = [];      // 후위표기 출력 버퍼
const stack = [];    // 연산자 스택

function prec(op) {
  if (op === '+' || op === '-') return 1;
  if (op === '*' || op === '/') return 2;
  return 0; // '(' 등
}

for (const ch of expr) {
  if (ch >= 'A' && ch <= 'Z') {
    // 1) 피연산자 → 즉시 출력
    out.push(ch);
  } else if (ch === '(') {
    // 2) 여는 괄호 → 스택에
    stack.push(ch);
  } else if (ch === ')') {
    // 3) 닫는 괄호 → '(' 만날 때까지 스택 팝하여 출력
    while (stack.length && stack[stack.length - 1] !== '(') {
      out.push(stack.pop());
    }
    stack.pop(); // '(' 제거
  } else {
    // 4) 연산자: top이 '('가 아니고, top 우선순위 ≥ 현재면 팝하여 출력
    while (stack.length) {
      const top = stack[stack.length - 1];
      if (top === '(') break;
      if (prec(top) >= prec(ch)) out.push(stack.pop());
      else break;
    }
    stack.push(ch);
  }
}

// 남은 연산자 모두 출력
while (stack.length) out.push(stack.pop());

console.log(out.join(''));
