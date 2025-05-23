const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.on('line', line => {
  const [X, Y] = line.trim().split(' ').map(Number);

  const repunitX = Number('1'.repeat(X));
  const repunitY = Number('1'.repeat(Y));

  console.log(repunitX + repunitY);
  rl.close();
});
