const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const input = [];

rl.on('line', line => {
  if (line === '0') rl.close();
  else input.push(line);
}).on('close', () => {
  const results = [];

  for (const line of input) {
    const [k, ...nums] = line.split(' ').map(Number);
    const combinations = [];
    const selected = [];

    const dfs = (start, depth) => {
      if (depth === 6) {
        combinations.push(selected.join(' '));
        return;
      }

      for (let i = start; i < k; i++) {
        selected[depth] = nums[i];
        dfs(i + 1, depth + 1);
      }
    };

    dfs(0, 0);
    results.push(combinations.join('\n'));
  }

  console.log(results.join('\n\n'));
});
