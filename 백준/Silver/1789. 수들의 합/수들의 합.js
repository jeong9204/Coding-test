const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let input = [];

rl.on("line", line => {
  input.push(line.trim());
}).on("close", () => {
  let S = BigInt(input[0]);  // 큰 수이므로 BigInt 사용

  let sum = 0n;
  let n = 1n;

  while (true) {
    if (sum + n > S) break;
    sum += n;
    n += 1n;
  }

  console.log((n - 1n).toString());
});
