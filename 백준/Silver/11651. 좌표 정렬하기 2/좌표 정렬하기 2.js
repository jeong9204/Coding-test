const readline = require('readline');

// 입력 받기
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];
rl.on('line', (line) => {
  input.push(line.trim());
}).on('close', () => {
  const N = parseInt(input[0]); // 점의 개수
  const points = input.slice(1).map((point) => point.split(' ').map(Number));

  // 정렬: y좌표 기준 오름차순 -> y가 같으면 x좌표 기준 오름차순
  points.sort((a, b) => {
    if (a[1] === b[1]) {
      return a[0] - b[0]; // y가 같으면 x 기준 정렬
    }
    return a[1] - b[1]; // y 기준 정렬
  });

  // 결과 출력
  points.forEach((point) => {
    console.log(`${point[0]} ${point[1]}`);
  });
});
