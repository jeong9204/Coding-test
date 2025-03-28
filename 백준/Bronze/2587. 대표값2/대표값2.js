const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const nums = [];

rl.on('line', (line) => {
  nums.push(Number(line));

  // 입력이 5개 들어오면 처리
  if (nums.length === 5) {
    // 평균 계산
    const sum = nums.reduce((acc, cur) => acc + cur, 0);
    const average = sum / 5;

    // 중앙값 계산
    const sorted = nums.slice().sort((a, b) => a - b); // 오름차순 정렬
    const median = sorted[2]; // 0,1,2,3,4 → 가운데는 2번째 인덱스

    console.log(average); // 평균 출력
    console.log(median);  // 중앙값 출력

    rl.close();
  }
});
