const fs = require('fs');

// 입력 받아서 처리
const input = fs.readFileSync('/dev/stdin').toString().trim();
const N = parseInt(input, 10);

// N * 4000 출력
console.log(N * 4000);
