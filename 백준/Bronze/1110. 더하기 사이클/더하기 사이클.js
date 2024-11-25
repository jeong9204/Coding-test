const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on("line", (input) => {
  let N = parseInt(input, 10); // 입력값을 정수로 변환
  let original = N; // 초기값 저장
  let count = 0; // 사이클 길이
  
  do {
    // 각 자리 숫자 계산
    let tens = Math.floor(N / 10); // 10의 자리 숫자
    let ones = N % 10; // 1의 자리 숫자
    let sum = tens + ones; // 각 자리 숫자 합
    N = ones * 10 + (sum % 10); // 새로운 숫자 생성
    count++; // 사이클 길이 증가
  } while (N !== original); // 원래 숫자로 돌아올 때까지 반복

  console.log(count); // 사이클 길이 출력
  rl.close();
});
