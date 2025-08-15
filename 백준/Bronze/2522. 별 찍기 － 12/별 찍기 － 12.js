const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let N = 0;

rl.on('line', (line) => {
  N = Number(line.trim());
  rl.close();
}).on('close', () => {
  const out = [];

  // 위쪽: 1 ~ N (별이 증가)
  for (let i = 1; i <= N; i++) {
    const spaces = ' '.repeat(N - i);
    const stars = '*'.repeat(i);
    out.push(spaces + stars);
  }

  // 아래쪽: N-1 ~ 1 (별이 감소)
  for (let i = N - 1; i >= 1; i--) {
    const spaces = ' '.repeat(N - i);
    const stars = '*'.repeat(i);
    out.push(spaces + stars);
  }

  console.log(out.join('\n'));
});
