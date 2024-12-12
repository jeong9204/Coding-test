const fs = require('fs');

// 입력값 받기
const input = fs.readFileSync('/dev/stdin').toString().trim().split(' ');
const [A, B, V] = input.map(Number);

// 계산
const effectiveDistancePerDay = A - B; // 하루 효과적인 이동 거리
const remainingHeight = V - A;         // 마지막 날 전까지 올라야 할 거리
const days = Math.ceil(remainingHeight / effectiveDistancePerDay) + 1;

console.log(days);
