const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let input = [];

rl.on('line', (line) => {
  input.push(line);
}).on('close', () => {
  const n = parseInt(input[0]); // 배열 길이
  const arr = input[1].split(' ').map(Number); // 숫자 배열 변환

  let maxSum = arr[0]; // 최대 합 (첫 번째 값으로 초기화)
  let currentSum = arr[0]; // 현재 연속 합 (첫 번째 값으로 초기화)

  for (let i = 1; i < n; i++) {
    // 현재 값부터 시작하는 게 나은지, 이전까지의 합에 더하는 게 나은지 선택
    currentSum = Math.max(arr[i], currentSum + arr[i]);
    maxSum = Math.max(maxSum, currentSum); // 최댓값 갱신
  }

  console.log(maxSum);
});
