const readline = require('readline');

// 인터페이스 설정
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let sum = 0; // 합을 저장할 변수
let n = 0;   // 더할 정수의 개수
let count = 0; // 입력된 숫자의 개수

// 첫 번째 입력: 더할 정수의 개수를 받음
rl.on('line', (input) => {
  if (n === 0) {
    n = parseInt(input); // 정수의 개수 입력
  } else {
    sum += parseInt(input); // 입력받은 정수를 더함
    count++;
  }

  if (count === n) { // n개의 숫자를 다 받았으면
    console.log(sum); // 합을 출력
    rl.close(); // 입력 종료
  }
});
