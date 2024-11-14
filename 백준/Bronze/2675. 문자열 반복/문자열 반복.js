// 입력 받기 위한 readline 모듈을 불러옵니다.
const readline = require("readline");

// 인터페이스 설정
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// 입력 데이터를 담을 배열 초기화
let input = [];

// 줄별로 입력 받기
rl.on("line", (line) => {
  input.push(line.trim());
});

// 모든 입력을 받은 후 처리
rl.on("close", () => {
  const T = parseInt(input[0]); // 첫 줄은 테스트 케이스의 개수 T입니다.
  
  // 각 테스트 케이스에 대해 반복 처리
  for (let i = 1; i <= T; i++) {
    // 현재 줄에서 반복 횟수 R과 문자열 S를 분리
    const [R, S] = input[i].split(" ");
    const repeatCount = parseInt(R); // R은 반복 횟수
    
    // 새로운 문자열 P를 생성하기 위한 초기화
    let result = "";
    
    // 문자열 S의 각 문자에 대해 R번씩 반복하여 result에 추가
    for (const char of S) {
      result += char.repeat(repeatCount);
    }
    
    // 결과 출력
    console.log(result);
  }
});
