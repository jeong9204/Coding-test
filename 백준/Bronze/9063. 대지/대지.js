const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const input = [];

rl.on('line', line => input.push(line)).on('close', () => {
  const N = Number(input[0]);
  
  let minX = Infinity, maxX = -Infinity;
  let minY = Infinity, maxY = -Infinity;

  for (let i = 1; i <= N; i++) {
    const [x, y] = input[i].split(' ').map(Number);
    if (x < minX) minX = x;
    if (x > maxX) maxX = x;
    if (y < minY) minY = y;
    if (y > maxY) maxY = y;
  }

  const width = maxX - minX;
  const height = maxY - minY;
  const area = width * height;

  console.log(area);
});
