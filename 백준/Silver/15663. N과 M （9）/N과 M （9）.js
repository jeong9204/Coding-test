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
  const nums = input[1].split(' ').map(Number).sort((a, b) => a - b);
  const visited = Array(N).fill(false);
  const result = [];
  const path = [];

  const outputSet = new Set();

  function backtrack(depth) {
    if (depth === M) {
      const str = path.join(' ');
      if (!outputSet.has(str)) {
        outputSet.add(str);
        result.push(str);
      }
      return;
    }

    for (let i = 0; i < N; i++) {
      if (visited[i]) continue;

      visited[i] = true;
      path.push(nums[i]);
      backtrack(depth + 1);
      path.pop();
      visited[i] = false;
    }
  }

  backtrack(0);

  console.log(result.join('\n'));
});
