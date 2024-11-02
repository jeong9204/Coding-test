const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let inputs = [];

rl.on('line', (input) => {
  inputs.push(parseInt(input.trim()));
}).on('close', () => {
  const [R, G, B] = inputs;
  const cost = (R * 3) + (G * 4) + (B * 5);
  console.log(cost);
});
