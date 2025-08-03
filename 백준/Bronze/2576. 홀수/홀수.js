const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const input = [];

rl.on('line', (line) => {
  input.push(Number(line.trim()));
  if (input.length === 7) rl.close();  // 7개 입력 받으면 종료
}).on('close', () => {
  const odds = input.filter(num => num % 2 === 1);

  if (odds.length === 0) {
    console.log(-1);
  } else {
    const sum = odds.reduce((acc, cur) => acc + cur, 0);
    const min = Math.min(...odds);
    console.log(sum);
    console.log(min);
  }
});
