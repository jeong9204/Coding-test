const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const input = [];

rl.on('line', line => {
  input.push(line);
}).on('close', () => {
  const [n, m] = input[0].split(' ').map(Number);
  const parent = Array.from({ length: n + 1 }, (_, i) => i);

  function find(x) {
    if (parent[x] !== x) {
      parent[x] = find(parent[x]);
    }
    return parent[x];
  }

  function union(a, b) {
    const rootA = find(a);
    const rootB = find(b);
    if (rootA !== rootB) {
      parent[rootB] = rootA;
    }
  }

  const result = [];

  for (let i = 1; i <= m; i++) {
    const [cmd, a, b] = input[i].split(' ').map(Number);
    if (cmd === 0) {
      union(a, b);
    } else {
      result.push(find(a) === find(b) ? 'YES' : 'NO');
    }
  }

  console.log(result.join('\n'));
});
