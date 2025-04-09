const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let input = [];
rl.on("line", line => {
  input.push(line.trim());
}).on("close", () => {
  const T = parseInt(input[0]); // 테스트 케이스 수
  for (let i = 1; i <= T; i++) {
    let C = parseInt(input[i]); // 거스름돈 센트 단위
    const coins = [25, 10, 5, 1]; // 쿼터, 다임, 니켈, 페니
    const result = [];

    for (let coin of coins) {
      let count = Math.floor(C / coin); // 해당 동전으로 줄 수 있는 최대 개수
      result.push(count);
      C %= coin; // 나머지 금액
    }

    console.log(result.join(" "));
  }
});
