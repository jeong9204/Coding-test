const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let N;

rl.on('line', (line) => {
  N = parseInt(line);
  rl.close();
}).on('close', () => {
  const result = [];

  // 상단 (역삼각형)
  for (let i = 0; i < N; i++) {
    const spaces = ' '.repeat(i);
    const stars = '*'.repeat(2 * (N - i) - 1);
    result.push(spaces + stars);
  }

  // 하단 (정삼각형)
  for (let i = 1; i < N; i++) {
    const spaces = ' '.repeat(N - i - 1);
    const stars = '*'.repeat(2 * i + 1);
    result.push(spaces + stars);
  }

  console.log(result.join('\n'));
});
