const fs = require('fs');
const s = fs.readFileSync(0, 'utf8').trim();

// 0만 들어오면 바로 0
if (s === '0') {
  console.log('0');
  process.exit(0);
}

// 첫 번째 0이 아닌 자리 위치
let first = 0;
while (first < s.length && s[first] === '0') first++;

// 전부 0이었다면(예: "0000") 0
if (first === s.length) {
  console.log('0');
  process.exit(0);
}

// 첫 비영(0이 아닌) 자리: 패딩 없이 2진수
const head = parseInt(s[first], 8).toString(2);

// 나머지는 3비트 패딩 테이블 사용
const map3 = ['000', '001', '010', '011', '100', '101', '110', '111'];

const out = [head];
for (let i = first + 1; i < s.length; i++) {
  const d = s.charCodeAt(i) - 48; // '0'~'7'만 주어짐
  out.push(map3[d]);
}

console.log(out.join(''));
