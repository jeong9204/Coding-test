const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.on('line', (line) => {
  const [r1, s] = line.trim().split(' ').map(Number);
  const r2 = 2 * s - r1;
  console.log(r2);
  rl.close();
});
