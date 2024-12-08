const readline = require("readline");

// 입력을 처리하기 위한 readline 설정
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const input = []; // 입력 데이터를 저장할 배열

// 입력을 줄 단위로 저장
rl.on("line", (line) => {
  input.push(line);
});

// 입력이 끝나면 실행
rl.on("close", () => {
  const N = parseInt(input[0]); // 첫 줄은 명령의 개수
  const commands = input.slice(1); // 나머지는 명령어들

  const stack = []; // 스택을 저장할 배열
  const result = []; // 출력 결과를 저장할 배열

  // 명령어 처리
  commands.forEach((command) => {
    if (command.startsWith("push")) {
      const [, num] = command.split(" "); // "push X"에서 X 추출
      stack.push(parseInt(num)); // 스택에 정수 추가
    } else if (command === "pop") {
      if (stack.length > 0) {
        result.push(stack.pop()); // 스택의 마지막 값을 꺼내 출력에 저장
      } else {
        result.push(-1); // 스택이 비었으면 -1 출력
      }
    } else if (command === "size") {
      result.push(stack.length); // 스택의 크기를 출력에 저장
    } else if (command === "empty") {
      result.push(stack.length === 0 ? 1 : 0); // 스택이 비었으면 1, 아니면 0 출력
    } else if (command === "top") {
      if (stack.length > 0) {
        result.push(stack[stack.length - 1]); // 스택의 마지막 값을 출력에 저장
      } else {
        result.push(-1); // 스택이 비었으면 -1 출력
      }
    }
  });

  // 결과 출력
  console.log(result.join("\n"));
});
