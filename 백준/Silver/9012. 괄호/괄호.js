const readline = require("readline");

// 입력을 처리하는 인터페이스 생성
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const input = [];
rl.on("line", (line) => {
  input.push(line);
}).on("close", () => {
  const T = parseInt(input[0]); // 테스트 케이스의 수
  const results = [];

  for (let i = 1; i <= T; i++) {
    const ps = input[i];
    results.push(isValidParenthesisString(ps) ? "YES" : "NO");
  }

  console.log(results.join("\n"));
});

// 올바른 괄호 문자열인지 확인하는 함수
function isValidParenthesisString(ps) {
  let balance = 0; // 여는 괄호와 닫는 괄호의 균형을 나타냄
  for (const char of ps) {
    if (char === "(") {
      balance += 1;
    } else {
      balance -= 1;
    }

    // 닫는 괄호가 더 많아지는 순간 NO
    if (balance < 0) {
      return false;
    }
  }

  // 균형이 맞다면 YES
  return balance === 0;
}
