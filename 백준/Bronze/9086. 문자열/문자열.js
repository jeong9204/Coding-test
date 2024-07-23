//9086번
//문자열의 첫글자와 마지막 글자 출력
// 문자열의 첫 시작은 0, 마지막 부분은 글자의 길이출력해서 -1 해서 구함
//그 외 substring() 활용해도 됨, 사용법 string 객체의 시작 인덱스로 부터 종료 인덱스 전 까지 문자열의 부분 문자열을 반환합니다.

const fs = require("fs");
const file = process.platform === "linux" ? "dev/stdin" : "./text.txt";
const input = fs.readFileSync(file).toString().trim().split("\n");

const t = input[0];

for (i = 1; i <= t; i++) {
  // input[i].trim()을 사용해서  \r 제거
  // 개행문자 때문에 length가 하나 늘어나는 것 방지(문제 제출시에는 상관 없음)
  let str = input[i].trim();

  let End = str.length - 1;

  console.log(
    input[i].substring(0, 1) + input[i].substring(End, input[i].length)
  );
  // console.log(input[i].charAt(0) + input[i].charAt(End));
}