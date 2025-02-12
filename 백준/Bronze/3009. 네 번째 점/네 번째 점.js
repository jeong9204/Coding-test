const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const points = [];

rl.on('line', (line) => {
  points.push(line.split(' ').map(Number));
  if (points.length === 3) {
    rl.close();
  }
});

rl.on('close', () => {
  const xValues = points.map(p => p[0]);
  const yValues = points.map(p => p[1]);

  const x = xValues.find(num => xValues.indexOf(num) === xValues.lastIndexOf(num));
  const y = yValues.find(num => yValues.indexOf(num) === yValues.lastIndexOf(num));

  console.log(x, y);
});
