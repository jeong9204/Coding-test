const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let input = '';
rl.on('line', (line) => {
  input = line.trim();  // 한 줄 입력을 받음
  rl.close();
});

rl.on('close', () => {
  const count = new Array(26).fill(0);  // 알파벳 소문자 26개를 0으로 초기화

  for (let ch of input) {
    const idx = ch.charCodeAt(0) - 'a'.charCodeAt(0);  // 알파벳을 인덱스로 변환
    count[idx]++;
  }

  console.log(count.join(' '));  // 공백으로 구분해 출력
});
