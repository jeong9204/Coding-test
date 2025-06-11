const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on('line', line => {
  const N = Number(line.trim());
  const size = Math.pow(2, N) + 1;
  const result = size * size;
  console.log(result);
});
