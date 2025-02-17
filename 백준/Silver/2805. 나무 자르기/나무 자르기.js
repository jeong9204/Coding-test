const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let input = [];

rl.on('line', (line) => {
  input.push(line);
}).on('close', () => {
  // 입력 처리
  const [N, M] = input[0].split(' ').map(Number);
  const trees = input[1].split(' ').map(Number);

  // 이진 탐색을 위한 변수 설정
  let low = 0;
  let high = Math.max(...trees);
  let result = 0;

  // 이진 탐색 수행
  while (low <= high) {
    let mid = Math.floor((low + high) / 2);
    let wood = trees.reduce((sum, tree) => sum + Math.max(tree - mid, 0), 0);

    if (wood >= M) { 
      // 필요한 나무 길이 이상이면 절단 높이 증가
      result = mid;
      low = mid + 1;
    } else {
      // 부족하면 절단 높이 낮춤
      high = mid - 1;
    }
  }

  console.log(result);
});
