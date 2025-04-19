const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];
rl.on('line', (line) => {
  input.push(line.trim());
}).on('close', () => {
  const [N, S] = input[0].split(' ').map(Number);
  const nums = input[1].split(' ').map(Number);

  let count = 0;

  function dfs(index, sum) {
    if (index === N) return;
    if (sum + nums[index] === S) count++;

    // 현재 index의 수를 선택하지 않는 경우
    dfs(index + 1, sum);

    // 현재 index의 수를 선택하는 경우
    dfs(index + 1, sum + nums[index]);
  }

  dfs(0, 0);
  console.log(count);
});
