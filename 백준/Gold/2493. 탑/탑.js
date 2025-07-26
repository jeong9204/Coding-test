const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];
rl.on("line", line => {
  input.push(line.trim());
}).on("close", () => {
  const N = Number(input[0]);
  const heights = input[1].split(" ").map(Number);
  const result = Array(N).fill(0);
  const stack = []; // [height, index]

  for (let i = 0; i < N; i++) {
    const currentHeight = heights[i];

    // 스택에서 현재 탑보다 낮은 탑 제거
    while (stack.length > 0 && stack[stack.length - 1][0] < currentHeight) {
      stack.pop();
    }

    // 스택의 top이 수신 가능한 탑
    if (stack.length > 0) {
      result[i] = stack[stack.length - 1][1] + 1; // 0-index → 1-index
    }

    // 현재 탑 스택에 추가
    stack.push([currentHeight, i]);
  }

  console.log(result.join(" "));
});
