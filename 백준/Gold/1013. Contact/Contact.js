// 백준 1013번: Contact
// 패턴: (100+1+|01)+
// Node.js (JavaScript) 풀이

const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim().split('\n');

const T = parseInt(input[0], 10);

// 정규식 패턴: 문자열 전체가 이 패턴에 딱 맞아야 하므로 ^, $ 사용
const pattern = /^(100+1+|01)+$/;

let out = [];

for (let i = 1; i <= T; i++) {
  const s = input[i].trim();

  if (pattern.test(s)) {
    out.push('YES');
  } else {
    out.push('NO');
  }
}

console.log(out.join('\n'));
