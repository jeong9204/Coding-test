const readline = require('readline');

// 별을 오른쪽 정렬로 출력하는 함수
const printStars = (n) => {
  for (let i = 0; i < n; i++) {
    // 공백과 별을 조합해 출력
    const spaces = ' '.repeat(i); // 왼쪽 공백
    const stars = '*'.repeat(n - i); // 오른쪽 정렬된 별
    console.log(spaces + stars); // 출력
  }
};

// 표준 입력 처리
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on('line', (input) => {
  const n = parseInt(input, 10); // 입력값을 정수로 변환
  printStars(n); // 함수 호출
  rl.close(); // 입력 종료
});
