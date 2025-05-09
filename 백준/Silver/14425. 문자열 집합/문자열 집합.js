const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const input = [];

rl.on('line', line => input.push(line)).on('close', () => {
  const [N, M] = input[0].split(' ').map(Number);
  const S = new Set();

  // 집합 S에 문자열 저장
  for (let i = 1; i <= N; i++) {
    S.add(input[i]);
  }

  let count = 0;

  // 검사할 문자열들과 비교
  for (let i = N + 1; i <= N + M; i++) {
    if (S.has(input[i])) {
      count++;
    }
  }

  console.log(count);
});
