const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let N;

rl.on('line', line => {
  N = parseInt(line);
  const result = [];

  // 상단 (1 ~ N)
  for (let i = 1; i <= N; i++) {
    const stars = '*'.repeat(i); // 왼쪽 별
    const space = ' '.repeat(2 * (N - i)); // 가운데 공백
    result.push(stars + space + stars); // 오른쪽 별 포함
  }

  // 하단 (N-1 ~ 1)
  for (let i = N - 1; i >= 1; i--) {
    const stars = '*'.repeat(i);
    const space = ' '.repeat(2 * (N - i));
    result.push(stars + space + stars);
  }

  console.log(result.join('\n'));
  rl.close();
});
