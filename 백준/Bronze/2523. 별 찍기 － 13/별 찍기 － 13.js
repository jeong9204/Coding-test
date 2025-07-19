const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let input;

rl.on('line', (line) => {
  input = Number(line);
  rl.close();
});

rl.on('close', () => {
  let result = '';

  // 위쪽 삼각형: 1 ~ N줄
  for (let i = 1; i <= input; i++) {
    result += '*'.repeat(i) + '\n';
  }

  // 아래쪽 삼각형: N-1 ~ 1줄
  for (let i = input - 1; i >= 1; i--) {
    result += '*'.repeat(i) + '\n';
  }

  console.log(result.trim()); // 마지막 줄 개행 제거
});
