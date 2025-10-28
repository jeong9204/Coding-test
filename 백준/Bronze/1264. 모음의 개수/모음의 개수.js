const fs = require('fs');

// 모든 입력 읽기
const input = fs.readFileSync(0, 'utf8').trimEnd().split('\n');

const vowels = 'aeiouAEIOU';
let result = [];

for (const line of input) {
  if (line === '#') {
    break; // 입력 종료 조건
  }

  let count = 0;

  // 이 줄에서 모음 세기
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (vowels.includes(ch)) {
      count++;
    }
  }

  result.push(count);
}

// 출력
console.log(result.join('\n'));
