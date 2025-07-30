const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let input = [];
rl.on('line', (line) => {
  input.push(line.trim());
}).on('close', () => {
  const N = Number(input[0]);
  const filenames = input.slice(1);
  const length = filenames[0].length;
  let pattern = '';

  for (let i = 0; i < length; i++) {
    const char = filenames[0][i];
    let same = true;

    for (let j = 1; j < N; j++) {
      if (filenames[j][i] !== char) {
        same = false;
        break;
      }
    }

    pattern += same ? char : '?';
  }

  console.log(pattern);
});
