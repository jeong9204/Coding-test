const readline = require("readline");

// 입력을 처리하기 위한 readline 인터페이스 생성
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// 사용자 입력 받기
rl.on("line", (input) => {
  // 입력된 문자열을 공백을 기준으로 분리하고, 숫자로 변환
  const numbers = input.split(" ").map(Number);

  // 세 번째로 큰 값을 찾는 로직
  numbers.sort((a, b) => a - b); // 오름차순으로 정렬

  // 두 번째로 큰 값은 정렬 후 두 번째 원소
  const secondLargest = numbers[1];

  // 결과 출력
  console.log(secondLargest);

  rl.close(); // 입력 종료
});
