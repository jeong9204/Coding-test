const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.on('line', (line) => {
  const [N, M] = line.split(' ').map(Number);
  let result = [];

  function dfs(sequence) {
    if (sequence.length === M) {
      result.push(sequence.join(' '));
      return;
    }

    for (let i = 1; i <= N; i++) {
      dfs([...sequence, i]);
    }
  }

  dfs([]);
  console.log(result.join('\n'));
  rl.close();
});
