const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const input = [];
rl.on("line", (line) => {
  input.push(line);
}).on("close", () => {
  const T = Number(input[0]); // 테스트 케이스 개수
  const N_list = input.slice(1).map(Number);

  // 🟢 P(N) 값을 저장할 배열 (N 최대 100)
  const P = new Array(101).fill(0);
  
  // 🟢 기본 초기값 설정 (문제에서 주어진 값)
  P[1] = P[2] = P[3] = 1;
  P[4] = P[5] = 2;
  
  // 🟢 점화식으로 P(N) 계산 (1 ≤ N ≤ 100)
  for (let i = 6; i <= 100; i++) {
    P[i] = P[i - 1] + P[i - 5];
  }

  // 🟢 각 테스트 케이스에 대해 결과 출력
  N_list.forEach((N) => console.log(P[N]));
});
