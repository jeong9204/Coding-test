const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.on('line', function (line) {
  const [N, B] = line.trim().split(' ');
  const result = parseInt(N, parseInt(B));
  console.log(result);
  rl.close();
});
