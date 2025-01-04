const readline = require('readline');

// 내림차순으로 정렬하는 함수
const sortDigitsDesc = (input) => {
  return input
    .toString()       // 숫자를 문자열로 변환
    .split('')        // 문자열을 문자 배열로 변환
    .sort((a, b) => b - a) // 내림차순 정렬
    .join('');        // 정렬된 배열을 다시 문자열로 합침
};

// 표준 입력 처리
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// 입력 이벤트 처리
rl.on('line', (input) => {
  const sortedNumber = sortDigitsDesc(input); // 함수 호출
  console.log(sortedNumber); // 결과 출력
  rl.close(); // 입력 종료
});
