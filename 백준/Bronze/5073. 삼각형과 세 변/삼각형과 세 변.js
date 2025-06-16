const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const input = [];

rl.on('line', line => {
  if (line === '0 0 0') {
    rl.close();
  } else {
    input.push(line);
  }
}).on('close', () => {
  for (const line of input) {
    const sides = line.split(' ').map(Number).sort((a, b) => a - b);
    const [a, b, c] = sides;

    // 삼각형이 될 수 있는 조건 확인
    if (a + b <= c) {
      console.log('Invalid');
    } else if (a === b && b === c) {
      console.log('Equilateral');
    } else if (a === b || b === c || a === c) {
      console.log('Isosceles');
    } else {
      console.log('Scalene');
    }
  }
});
