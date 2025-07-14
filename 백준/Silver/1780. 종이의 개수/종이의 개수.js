const readline = require('readline');
const rl = readline.createInterface({ input: process.stdin });

let N;
let matrix = [];
let line = 0;

rl.on('line', (input) => {
  if (!N) {
    N = Number(input);
  } else {
    matrix.push(input.trim().split(' ').map(Number));
    line++;
    if (line === N) {
      rl.close();
    }
  }
});

rl.on('close', () => {
  const result = { '-1': 0, '0': 0, '1': 0 };

  function isSame(x, y, size) {
    const first = matrix[x][y];
    for (let i = x; i < x + size; i++) {
      for (let j = y; j < y + size; j++) {
        if (matrix[i][j] !== first) return false;
      }
    }
    return true;
  }

  function divide(x, y, size) {
    if (isSame(x, y, size)) {
      result[matrix[x][y]]++;
      return;
    }

    const newSize = size / 3;
    for (let dx = 0; dx < 3; dx++) {
      for (let dy = 0; dy < 3; dy++) {
        divide(x + dx * newSize, y + dy * newSize, newSize);
      }
    }
  }

  divide(0, 0, N);

  console.log(result['-1']);
  console.log(result['0']);
  console.log(result['1']);
});
