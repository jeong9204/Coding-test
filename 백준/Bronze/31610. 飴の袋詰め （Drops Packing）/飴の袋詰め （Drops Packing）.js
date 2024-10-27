const sol = (a, b, c) => a * b + c;

const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const inputs = [];
rl.on('line', (line) => {
  inputs.push(parseInt(line));
  if (inputs.length === 3) {
    const [a, b, c] = inputs;
    console.log(sol(a, b, c));
    rl.close();
  }
});
