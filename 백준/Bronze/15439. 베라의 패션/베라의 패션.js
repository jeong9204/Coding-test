// 실행: node main.js < input.txt
const fs = require('fs');

// 입력: 한 줄에 정수 N
const N = parseInt(fs.readFileSync(0, 'utf8').trim(), 10);

// 서로 다른 색 조합 수 = N * (N - 1)
const ans = N * (N - 1);

// 출력
console.log(ans.toString());
