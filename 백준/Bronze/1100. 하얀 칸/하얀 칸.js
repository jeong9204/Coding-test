// BOJ 1100 - 하얀 칸
// 입력: 8줄, 각 줄은 8문자 ('.' 또는 'F')
// 출력: 하얀 칸 위의 'F' 개수

const fs = require('fs');

const lines = fs.readFileSync(0, 'utf8').trim().split('\n').map(s => s.trim());
let count = 0;

for (let r = 0; r < 8; r++) {
  const row = lines[r];
  for (let c = 0; c < 8; c++) {
    if ((r + c) % 2 === 0 && row[c] === 'F') {
      count++;
    }
  }
}

console.log(count);
