const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const [N, M] = input[0].split(' ').map(Number);
const matrix = input.slice(1, N + 1).map(line => line.split(' ').map(Number));

// 누적합 배열 생성 (1-indexed)
const prefix = Array.from({ length: N + 1 }, () => Array(N + 1).fill(0));

for (let i = 1; i <= N; i++) {
  for (let j = 1; j <= N; j++) {
    prefix[i][j] =
      matrix[i - 1][j - 1] +
      prefix[i - 1][j] +
      prefix[i][j - 1] -
      prefix[i - 1][j - 1];
  }
}

const results = [];

for (let k = N + 1; k < N + 1 + M; k++) {
  const [x1, y1, x2, y2] = input[k].split(' ').map(Number);

  const sum =
    prefix[x2][y2] -
    prefix[x1 - 1][y2] -
    prefix[x2][y1 - 1] +
    prefix[x1 - 1][y1 - 1];

  results.push(sum);
}

console.log(results.join('\n'));
