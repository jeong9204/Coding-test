const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.on('line', (isbn) => {
  const chars = isbn.trim().split('');
  let missingIndex = -1;
  let sum = 0;

  for (let i = 0; i < 13; i++) {
    if (chars[i] === '*') {
      missingIndex = i;
      continue;
    }

    const digit = Number(chars[i]);
    const weight = i % 2 === 0 ? 1 : 3;
    sum += digit * weight;
  }

  // i % 2 === 0이면 가중치 1, 아니면 가중치 3
  const weight = missingIndex % 2 === 0 ? 1 : 3;

  // 가능한 숫자(0~9)를 하나씩 넣어보며 전체 합이 10으로 나누어 떨어지는지 확인
  for (let x = 0; x <= 9; x++) {
    const testSum = sum + x * weight;
    if (testSum % 10 === 0) {
      console.log(x);
      break;
    }
  }
});
