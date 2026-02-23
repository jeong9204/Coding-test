'use strict';

const fs = require('fs');
const data = fs.readFileSync(0, 'utf8');
let p = 0;
const L = data.length;

function nextInt() {
  while (p < L) {
    const c = data.charCodeAt(p);
    if (c > 32) break;
    p++;
  }
  let num = 0;
  while (p < L) {
    const c = data.charCodeAt(p);
    if (c <= 32) break;
    num = num * 10 + (c - 48);
    p++;
  }
  return num;
}

const T = nextInt();
let out = [];

for (let tc = 0; tc < T; tc++) {
  const N = nextInt();

  // A1 체크
  const a1 = nextInt();
  if (a1 !== 1) {
    // 남은 입력은 읽어야 다음 테스트로 넘어감
    for (let i = 2; i <= N; i++) nextInt();
    out.push('NO');
    continue;
  }

  // stack에는 "각 들여쓰기 깊이에서 마지막으로 사용한 번호" 저장
  const stack = [1];
  let ok = true;

  for (let i = 2; i <= N; i++) {
    const a = nextInt();

    if (!ok) continue; // 이미 NO면 입력만 소비

    if (a === 1) {
      // 새 레벨로 들어가는 것(들여쓰기 +1)
      stack.push(1);
    } else {
      // a-1을 top에서 찾을 때까지 팝 (들여쓰기 감소)
      const need = a - 1;
      while (stack.length > 0 && stack[stack.length - 1] !== need) {
        stack.pop();
      }
      if (stack.length === 0) {
        ok = false;
      } else {
        // 이어서 번호 증가
        stack[stack.length - 1] = a;
      }
    }
  }

  out.push(ok ? 'YES' : 'NO');
}

process.stdout.write(out.join('\n'));