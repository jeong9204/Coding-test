const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];

rl.on("line", (line) => {
  input.push(line.trim());
}).on("close", () => {
  const [N, M] = input[0].split(" ").map(Number);
  const A = input[1].split(" ").map(Number);

  let count = 0;
  let sum = 0;
  let start = 0;
  let end = 0;

  while (end <= N) {
    if (sum < M) {
      // 합이 목표보다 작으면 오른쪽 끝을 한 칸 확장
      sum += A[end++];
    } else if (sum > M) {
      // 합이 목표보다 크면 왼쪽 시작을 한 칸 줄임
      sum -= A[start++];
    } else {
      // 합이 정확히 M일 경우
      count++;
      sum += A[end++];
    }
  }

  console.log(count);
});
