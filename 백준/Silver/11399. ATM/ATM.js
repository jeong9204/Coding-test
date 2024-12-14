const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];
rl.on("line", (line) => {
  input.push(line);
}).on("close", () => {
  // 입력값 처리
  const N = parseInt(input[0]); // 사람 수
  const P = input[1]
    .split(" ")
    .map(Number)
    .sort((a, b) => a - b); // Pi를 오름차순 정렬

  let totalWaitTime = 0; // 전체 대기 시간의 합
  let cumulativeTime = 0; // 누적 시간

  for (let i = 0; i < N; i++) {
    cumulativeTime += P[i]; // 현재 사람의 인출 시간 누적
    totalWaitTime += cumulativeTime; // 누적 시간을 전체 대기 시간에 추가
  }

  console.log(totalWaitTime); // 최솟값 출력
});
