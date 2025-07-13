const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];
let testCases = 0;
let current = 0;

rl.on('line', (line) => {
  input.push(line.trim());
}).on('close', () => {
  testCases = +input[0];
  let idx = 1;

  const results = [];

  for (let t = 0; t < testCases; t++) {
    const n = +input[idx++];
    const clothesMap = new Map();

    for (let i = 0; i < n; i++) {
      const [, type] = input[idx++].split(' ');
      clothesMap.set(type, (clothesMap.get(type) || 0) + 1);
    }

    // 조합 계산: (종류별 개수 + 1)들을 곱하고, 마지막에 -1 (알몸 제거)
    let combinations = 1;
    for (let count of clothesMap.values()) {
      combinations *= (count + 1);
    }

    results.push(combinations - 1);
  }

  console.log(results.join('\n'));
});
