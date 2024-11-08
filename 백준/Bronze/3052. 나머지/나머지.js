// 필요한 모듈을 불러옵니다.
const fs = require('fs');

// 입력 데이터를 받아오고, 줄 단위로 분리해 숫자 배열로 변환합니다.
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n').map(Number);

// 각 숫자를 42로 나눈 나머지를 저장할 Set 객체를 생성합니다.
const remainders = new Set();

// 배열의 각 숫자에 대해 나머지를 구해 Set에 추가합니다.
input.forEach(num => {
    remainders.add(num % 42);
});

// Set의 크기를 출력하여 서로 다른 나머지의 개수를 나타냅니다.
console.log(remainders.size);
