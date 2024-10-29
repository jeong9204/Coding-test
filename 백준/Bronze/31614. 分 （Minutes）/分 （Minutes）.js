const sol = (h, m) => h * 60 + m;

const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const input = [];
rl.on('line', line => input.push(Number(line.trim()))).on('close', () => {
  const [h, m] = input;
  console.log(sol(h, m));
});
