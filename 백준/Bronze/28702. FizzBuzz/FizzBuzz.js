'use strict';

const fs = require('fs');
const [A, B, C] = fs.readFileSync(0, 'utf8').trim().split('\n').map(s => s.trim());

function fb(i) {
  const fizz = (i % 3 === 0);
  const buzz = (i % 5 === 0);
  if (fizz && buzz) return 'FizzBuzz';
  if (fizz) return 'Fizz';
  if (buzz) return 'Buzz';
  return String(i);
}

function isNumberStr(s) {
  // 문제에서 입력은 항상 유효한 FizzBuzz 출력이므로, 숫자는 0으로 시작하지 않는 자연수 문자열
  // (어차피 정규식으로 숫자만 체크해도 충분)
  return /^[0-9]+$/.test(s);
}

const arr = [A, B, C];

// 1) 숫자 줄이 있으면 그걸로 시작 인덱스 x를 역추론
let x = null;
for (let j = 0; j < 3; j++) {
  if (isNumberStr(arr[j])) {
    const v = Number(arr[j]);  // 길이 <= 8 이므로 안전 (<= 1e8)
    const candidate = v - j;   // arr[j] = out(x+j) = v  => x = v - j
    x = candidate;
    break;
  }
}

if (x !== null) {
  console.log(fb(x + 3));
} else {
  // 2) 숫자가 하나도 없으면 (Fizz/Buzz/FizzBuzz만) 작은 범위에서 x를 찾아도 됨 (15주기)
  for (let start = 1; start <= 15; start++) {
    if (fb(start) === A && fb(start + 1) === B && fb(start + 2) === C) {
      console.log(fb(start + 3));
      process.exit(0);
    }
  }
  // 이론상 입력이 항상 유효하므로 여기 도달하지 않음
}
