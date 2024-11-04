// fs 모듈을 사용하여 표준 입력으로부터 데이터 읽기
const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim();

// 소수점 숫자를 내림(floor) 처리 후 정수로 변환하여 출력
const x = parseFloat(input);
console.log(Math.floor(x));
