const fs = require('fs');

// 입력값을 파일에서 읽어옵니다.
const input = fs.readFileSync('/dev/stdin').toString().trim();

// 입력값을 정수로 변환합니다.
const N = parseInt(input);

// 결과를 `LoveisKoreaUniversity`를 N번 출력하여 문자열로 만듭니다.
const result = Array(N).fill("LoveisKoreaUniversity").join(" ");

// 결과를 출력합니다.
console.log(result);
