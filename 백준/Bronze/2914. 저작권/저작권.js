const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.on('line', line => {
  const [A, I] = line.trim().split(' ').map(Number);

  // 공식: melody ≥ A * (I - 1) + 1
  const melody = A * (I - 1) + 1;
  console.log(melody);

  rl.close();
});
