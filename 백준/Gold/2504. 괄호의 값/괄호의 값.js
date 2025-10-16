// BOJ 2504 - 괄호의 값
// Node.js (ECMAScript 2021)

const fs = require('fs');
const s = fs.readFileSync(0, 'utf8').trim(); // 한 줄 입력

const stack = [];

// 닫는 괄호를 처리하는 공통 함수
function close(expectedOpen, base) {
  let acc = 0;

  while (stack.length > 0) {
    const top = stack.pop();

    if (typeof top === 'number') {
      // 내부에 있는 값들을 누적
      acc += top;
    } else if (top === expectedOpen) {
      // 여는 괄호를 만났을 때: 비어있다면 base, 아니면 base * acc
      const val = acc === 0 ? base : base * acc;
      stack.push(val);
      return true; // 정상 처리
    } else {
      // 다른 종류의 여는 괄호거나 이상한 문자가 있으면 불일치
      return false;
    }
  }
  // 스택이 비도록 여는 괄호를 못 찾음 → 불일치
  return false;
}

// 메인 스캔
let ok = true;

for (const ch of s) {
  if (ch === '(' || ch === '[') {
    stack.push(ch);
  } else if (ch === ')') {
    if (!close('(', 2)) { ok = false; break; }
  } else if (ch === ']') {
    if (!close('[', 3)) { ok = false; break; }
  } else {
    // 문제 조건상 등장하지 않지만, 안전하게 처리
    ok = false; break;
  }
}

// 최종 검증: 스택에는 숫자만 남아 있어야 함
let answer = 0;
if (ok) {
  for (const item of stack) {
    if (typeof item !== 'number') {
      ok = false;
      break;
    }
    answer += item;
  }
}

console.log(ok ? answer : 0);
