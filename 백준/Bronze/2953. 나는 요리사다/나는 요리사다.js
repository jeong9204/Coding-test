const fs = require('fs');

// 모든 숫자를 한 번에 파싱 (공백/개행 무시)
const nums = fs.readFileSync(0, 'utf8').trim().split(/\s+/).map(Number);

// 참가자는 5명, 각 4점씩 총 20개
let winner = 1;
let maxSum = -1;

for (let i = 0; i < 5; i++) {
  const base = i * 4;
  const sum = nums[base] + nums[base + 1] + nums[base + 2] + nums[base + 3];
  if (sum > maxSum) {
    maxSum = sum;
    winner = i + 1; // 번호는 1부터 시작
  }
}

console.log(`${winner} ${maxSum}`);
