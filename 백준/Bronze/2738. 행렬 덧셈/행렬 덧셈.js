const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];
rl.on('line', (line) => {
  input.push(line);
}).on('close', () => {
  // 입력 처리
  const [N, M] = input[0].split(' ').map(Number); // 행렬 크기 N, M
  const A = [];
  const B = [];
  for (let i = 1; i <= N; i++) {
    A.push(input[i].split(' ').map(Number));
  }
  for (let i = N + 1; i <= 2 * N; i++) {
    B.push(input[i].split(' ').map(Number));
  }

  // 행렬 덧셈
  const result = [];
  for (let i = 0; i < N; i++) {
    const row = [];
    for (let j = 0; j < M; j++) {
      row.push(A[i][j] + B[i][j]);
    }
    result.push(row);
  }

  // 결과 출력
  result.forEach((row) => console.log(row.join(' ')));
});
