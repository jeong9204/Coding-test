const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('', (input) => {
  const [W, H] = input.split(' ').map(Number);
  const area = (W * H) / 2;
  console.log(area.toFixed(1));
  rl.close();
});
