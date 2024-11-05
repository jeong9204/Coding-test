const fs = require('fs');

// 표준 입력으로부터 데이터 읽기
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

// 문제 개수 및 난이도 배열
const n = parseInt(input[0]);
const difficulties = input.slice(1).map(Number);

// 홀수 난이도의 문제 개수 계산
const excludedCount = difficulties.filter(d => d % 2 !== 0).length;

// 결과 출력
console.log(excludedCount);
