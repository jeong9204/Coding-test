const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let input = [];

rl.on('line', (line) => {
  input.push(line.trim());
}).on('close', () => {
  let results = [];

  for (let i = 0; i < input.length; i++) {
    const [A, B] = input[i].split(' ').map(Number);

    // 종료 조건: 0 0 입력이면 반복 종료
    if (A === 0 && B === 0) break;

    // factor, multiple, neither 판별
    if (B % A === 0) {
      results.push("factor");
    } else if (A % B === 0) {
      results.push("multiple");
    } else {
      results.push("neither");
    }
  }

  console.log(results.join('\n'));
});
