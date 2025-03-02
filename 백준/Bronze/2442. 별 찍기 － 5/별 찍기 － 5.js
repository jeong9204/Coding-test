const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.on('line', (line) => {
  const N = parseInt(line.trim(), 10);

  for (let i = 1; i <= N; i++) {
    let spaces = ' '.repeat(N - i);    // 왼쪽 공백 N-i 개
    let stars = '*'.repeat(2 * i - 1); // 별 2*i-1 개
    console.log(spaces + stars);
  }

  rl.close();
});
