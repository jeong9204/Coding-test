const readline = require('readline');
const rl = readline.createInterface({ input: process.stdin });

let input = [];
rl.on('line', line => {
  input.push(line);
}).on('close', () => {
  const [N, K] = input[0].split(' ').map(Number);
  const temps = input[1].split(' ').map(Number);

  // 1. 초기 윈도우 K일 합 계산
  let windowSum = 0;
  for (let i = 0; i < K; i++) {
    windowSum += temps[i];
  }

  let maxSum = windowSum;

  // 2. 슬라이딩 윈도우 진행
  for (let i = K; i < N; i++) {
    windowSum += temps[i] - temps[i - K]; // 새로 들어오는 값 - 빠지는 값
    maxSum = Math.max(maxSum, windowSum); // 최대값 갱신
  }

  console.log(maxSum);
});
