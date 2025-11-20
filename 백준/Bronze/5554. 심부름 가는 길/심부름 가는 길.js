// BOJ 스타일 Node.js 풀이

const fs = require('fs');

// 전체 입력 읽어서 줄 단위로 나누기
const lines = fs.readFileSync(0, 'utf8').trim().split('\n');

// 4줄의 시간을 초 단위로 변환해서 합계 구하기
let totalSec = 0;
for (let i = 0; i < 4; i++) {
  totalSec += Number(lines[i].trim());
}

// 분과 초로 나누기
const minutes = Math.floor(totalSec / 60);
const seconds = totalSec % 60;

// 출력
console.log(minutes);
console.log(seconds);
