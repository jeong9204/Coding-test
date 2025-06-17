const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const input = [];

rl.on('line', line => input.push(line)).on('close', () => {
  const T = Number(input[0]);

  for (let i = 1; i <= T; i++) {
    const N = Number(input[i]);
    const sqrt = Math.floor(Math.sqrt(N));

    if (sqrt * sqrt === N) {
      console.log(1);
    } else {
      console.log(0);
    }
  }
});
