const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];
rl.on('line', (line) => {
  input.push(line.trim());
}).on('close', () => {
  const [N, M] = input[0].split(' ').map(Number);
  const result = [];
  const sequence = [];

  // dfs(start) : start부터 N까지 선택해서 sequence에 추가하며, 
  // 비내림차순 (같은 수 재사용 허용)을 유지하는 함수.
  function dfs(start, depth) {
    if (depth === M) {
      result.push(sequence.join(' '));
      return;
    }
    for (let i = start; i <= N; i++) {
      sequence.push(i);
      dfs(i, depth + 1);
      sequence.pop();
    }
  }

  dfs(1, 0);
  console.log(result.join('\n'));
});
