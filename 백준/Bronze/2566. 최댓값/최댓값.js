const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let input = [];

rl.on('line', (line) => {
  input.push(line.trim());
}).on('close', () => {
  let max = -1;
  let maxRow = 0;
  let maxCol = 0;
  
  // 9행 9열의 격자를 순회하면서 최댓값과 그 위치를 찾음.
  for (let i = 0; i < 9; i++) {
    const numbers = input[i].split(' ').map(Number);
    for (let j = 0; j < 9; j++) {
      if (numbers[j] > max) {
        max = numbers[j];
        maxRow = i;
        maxCol = j;
      }
    }
  }
  
  console.log(max);
  // 문제에서 행과 열 번호는 1부터 시작하므로 +1 해준다.
  console.log((maxRow + 1) + " " + (maxCol + 1));
});
