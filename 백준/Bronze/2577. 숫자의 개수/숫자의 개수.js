// 필요한 모듈을 로드합니다. (없어도 되는 간단한 프로그램)
const readline = require("readline");

// 입력을 처리할 인터페이스를 생성합니다.
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// 입력 데이터를 저장할 배열
const input = [];

// 입력 처리
rl.on("line", (line) => {
  input.push(Number(line)); // 입력 값을 숫자로 변환해서 저장
}).on("close", () => {
  // A, B, C 값을 가져옵니다.
  const [A, B, C] = input;

  // 세 수의 곱을 계산합니다.
  const result = (A * B * C).toString(); // 곱한 결과를 문자열로 변환

  // 0부터 9까지의 숫자 사용 횟수를 저장할 배열
  const counts = Array(10).fill(0);

  // 결과 문자열의 각 문자를 순회하며 카운트를 증가
  for (const char of result) {
    counts[Number(char)]++;
  }

  // 결과 출력
  counts.forEach((count) => console.log(count));
});
