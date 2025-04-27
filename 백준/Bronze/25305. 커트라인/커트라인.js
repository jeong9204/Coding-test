const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let input = [];

rl.on('line', (line) => {
  input.push(line.trim());
}).on('close', () => {
  // 입력 처리
  const [N, k] = input[0].split(' ').map(Number);
  const scores = input[1].split(' ').map(Number);

  // 점수를 내림차순 정렬
  scores.sort((a, b) => b - a);

  // k번째 사람의 점수 (k는 1부터 시작하니까 인덱스는 k-1)
  const cutoff = scores[k - 1];

  console.log(cutoff);
});
