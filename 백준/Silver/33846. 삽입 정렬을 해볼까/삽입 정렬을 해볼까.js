const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim().split('\n');

const [n, t] = input[0].split(' ').map(Number);
const arr = input[1].split(' ').map(Number);

// 앞의 t개만 정렬
const prefix = arr.slice(0, t).sort((a, b) => a - b);

// 결과 배열 만들기
const result = prefix.concat(arr.slice(t));

console.log(result.join(' '));