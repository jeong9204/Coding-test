const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.on('line', line => {
  const n = Number(line.trim());
  console.log(4 * n);
  rl.close();
});
