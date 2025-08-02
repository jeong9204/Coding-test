const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const input = [];

rl.on('line', (line) => {
  input.push(line.trim());
}).on('close', () => {
  const [N, M] = input[0].split(' ').map(Number);
  const nums = input[1].split(' ').map(Number).sort((a, b) => a - b); // 사전 순 출력을 위해 정렬
  const result = [];
  const path = [];

  function backtrack(start) {
    if (path.length === M) {
      result.push(path.join(' '));
      return;
    }

    for (let i = start; i < N; i++) {
      path.push(nums[i]);
      backtrack(i); // 같은 인덱스부터 다시 시작 (중복 허용 + 비내림차순)
      path.pop();
    }
  }

  backtrack(0);
  console.log(result.join('\n'));
});
