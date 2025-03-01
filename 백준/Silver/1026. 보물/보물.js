const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let input = [];
rl.on('line', (line) => {
  input.push(line.trim());
}).on('close', () => {
  const N = parseInt(input[0], 10);
  const A = input[1].split(' ').map(Number);
  const B = input[2].split(' ').map(Number);

  // A 배열을 오름차순 정렬
  A.sort((a, b) => a - b);
  
  // B 배열을 내림차순 정렬
  B.sort((a, b) => b - a);

  // 최소 S 값 계산
  let S = 0;
  for (let i = 0; i < N; i++) {
    S += A[i] * B[i];
  }

  console.log(S);
});
