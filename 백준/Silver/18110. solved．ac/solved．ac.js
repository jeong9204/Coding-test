const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const n = Number(input[0]);

if (n === 0) {
  console.log(0);
  return;
}

const scores = input.slice(1).map(Number).sort((a, b) => a - b);

// 절사 비율 15% 계산 및 반올림
const cutCount = Math.round(n * 0.15);

// 절사 후 남은 배열로 평균 계산
const trimmed = scores.slice(cutCount, n - cutCount);
const sum = trimmed.reduce((acc, cur) => acc + cur, 0);
const avg = sum / trimmed.length;

// 반올림해서 출력
console.log(Math.round(avg));
