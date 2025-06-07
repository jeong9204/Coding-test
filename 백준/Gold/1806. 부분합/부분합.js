const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let input = [];
rl.on('line', (line) => {
  input.push(line);
}).on('close', () => {
  const [N, S] = input[0].split(' ').map(Number); // N: 수열 길이, S: 목표 합
  const nums = input[1].split(' ').map(Number); // 수열

  let minLength = Infinity;
  let sum = 0;
  let start = 0;

  for (let end = 0; end < N; end++) {
    sum += nums[end]; // end 지점을 오른쪽으로 이동하면서 합 누적

    // sum이 S 이상이 되는 동안 start를 오른쪽으로 옮기며 길이를 최소화
    while (sum >= S) {
      minLength = Math.min(minLength, end - start + 1); // 현재 길이 기록
      sum -= nums[start]; // 구간에서 start 제거
      start++; // start 이동
    }
  }

  // 결과 출력 (불가능하면 0)
  console.log(minLength === Infinity ? 0 : minLength);
});
