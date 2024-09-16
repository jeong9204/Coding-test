const readline = require('readline');

// 인터페이스 설정
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

let count = 0;

// 줄 단위로 입력 처리
rl.on('line', (input) => {
  count++;
});

// 입력 종료 시 처리
rl.on('close', () => {
  console.log(count);
});
