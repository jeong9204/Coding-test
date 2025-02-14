const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.on('line', (input) => {
  // '-'를 기준으로 문자열을 나누기
  const parts = input.split('-');

  // 첫 번째 그룹의 합 (초기값)
  let result = parts[0].split('+').map(Number).reduce((a, b) => a + b, 0);

  // 이후 그룹은 모두 뺀다.
  for (let i = 1; i < parts.length; i++) {
    const sum = parts[i].split('+').map(Number).reduce((a, b) => a + b, 0);
    result -= sum;
  }

  console.log(result);
  rl.close();
});
