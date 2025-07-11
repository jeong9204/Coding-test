const fs = require("fs");
const input = Number(fs.readFileSync("/dev/stdin").toString().trim());

let count = 0;
let X = input;

// 이진수 변환을 통해 1의 개수를 센다
while (X > 0) {
  if (X % 2 === 1) count++; // 현재 비트가 1이면 조각 하나 필요
  X = Math.floor(X / 2);    // 오른쪽으로 한 비트 이동
}

console.log(count);
