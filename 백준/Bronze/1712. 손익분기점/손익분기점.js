const readline = require('readline');

// 손익분기점을 계산하는 함수
const calculateBreakEvenPoint = (A, B, C) => {
  if (B >= C) {
    // 가변 비용(B)이 판매 가격(C) 이상이면 이익을 낼 수 없음
    return -1;
  }
  
  // 손익분기점 계산: 고정 비용(A) / (판매 가격(C) - 가변 비용(B)) + 1
  return Math.floor(A / (C - B)) + 1;
};

// 표준 입력 처리
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on('line', (line) => {
  const [A, B, C] = line.split(' ').map(Number); // 입력값 분리 및 숫자 변환
  const result = calculateBreakEvenPoint(A, B, C); // 손익분기점 계산
  console.log(result); // 결과 출력
  rl.close(); // 입력 종료
});
