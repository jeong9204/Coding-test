const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let heights = [];

rl.on('line', (line) => {
  heights.push(parseInt(line));
  if (heights.length === 9) {
    rl.close();
  }
});

rl.on('close', () => {
  let totalSum = heights.reduce((sum, h) => sum + h, 0);

  // 두 명을 찾아 제거
  let found = false;
  for (let i = 0; i < 9; i++) {
    for (let j = i + 1; j < 9; j++) {
      if (totalSum - heights[i] - heights[j] === 100) {
        heights.splice(j, 1); // 먼저 큰 인덱스를 지움
        heights.splice(i, 1); // 작은 인덱스를 지움
        found = true;
        break;
      }
    }
    if (found) break;
  }

  // 오름차순 정렬 후 출력
  heights.sort((a, b) => a - b);
  console.log(heights.join('\n'));
});
