const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const input = [];
rl.on('line', (line) => input.push(line)).on('close', () => {
  const [aSize, bSize] = input[0].split(' ').map(Number);
  const A = new Set(input[1].split(' ').map(Number));
  const B = new Set(input[2].split(' ').map(Number));

  let count = 0;

  // A - B
  for (const num of A) {
    if (!B.has(num)) count++;
  }

  // B - A
  for (const num of B) {
    if (!A.has(num)) count++;
  }

  console.log(count);
});
