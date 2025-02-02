const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let input = [];
rl.on('line', (line) => {
  input.push(line.trim());
}).on('close', () => {
  const n = parseInt(input[0]); // 삼각형의 크기
  const triangle = input.slice(1).map(row => row.split(' ').map(Number)); // 삼각형 배열

  // 아래에서부터 위로 DP 갱신
  for (let i = n - 2; i >= 0; i--) {  // 끝에서 두 번째 줄부터 시작
    for (let j = 0; j <= i; j++) {
      triangle[i][j] += Math.max(triangle[i + 1][j], triangle[i + 1][j + 1]);
    }
  }

  console.log(triangle[0][0]); // 맨 위에 최댓값이 저장됨
});
