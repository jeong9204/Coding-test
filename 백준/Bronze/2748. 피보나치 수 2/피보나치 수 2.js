const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.on('line', (line) => {
  const n = parseInt(line.trim(), 10);

  if (n === 0) {
    console.log(0);
    rl.close();
    return;
  }

  let a = BigInt(0), b = BigInt(1), temp;

  for (let i = 2; i <= n; i++) {
    temp = a + b;
    a = b;
    b = temp;
  }

  console.log(b.toString());  // BigInt는 toString()으로 변환해야 정확한 출력 가능
  rl.close();
});
