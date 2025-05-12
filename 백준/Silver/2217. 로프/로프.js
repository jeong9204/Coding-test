const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const input = [];

rl.on('line', line => input.push(line)).on('close', () => {
  const N = Number(input[0]);
  const ropes = input.slice(1).map(Number);

  // 1. 내림차순 정렬
  ropes.sort((a, b) => b - a);

  let maxWeight = 0;

  // 2. i+1개의 로프 사용했을 때 가능한 최대 중량 계산
  for (let i = 0; i < N; i++) {
    const weight = ropes[i] * (i + 1);
    if (weight > maxWeight) {
      maxWeight = weight;
    }
  }

  console.log(maxWeight);
});
