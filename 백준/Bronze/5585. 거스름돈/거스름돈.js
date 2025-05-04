const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.on("line", (input) => {
  const pay = parseInt(input);      // 입력받은 금액
  let change = 1000 - pay;          // 잔돈 (1000엔 - 지불한 금액)
  const coins = [500, 100, 50, 10, 5, 1];  // 동전 종류 (큰 순서부터)
  let count = 0;                    // 잔돈 동전 개수

  for (let coin of coins) {
    count += Math.floor(change / coin);  // 해당 동전이 몇 개 필요한지 더함
    change %= coin;                     // 남은 잔돈 업데이트
  }

  console.log(count);
  rl.close();
});
