const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on("line", (input) => {
  // 문자열을 공백 기준으로 나누고 빈 문자열 제거
  const words = input.trim() === "" ? [] : input.trim().split(/\s+/);

  // 단어 개수 출력
  console.log(words.length);

  rl.close();
});
