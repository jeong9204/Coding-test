const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];
rl.on('line', line => {
  input.push(line.trim());
}).on('close', () => {
  const T = Number(input[0]);

  for (let i = 1; i <= T; i++) {
    const [a, b] = input[i].split(' ').map(Number);
    const cycle = [];

    // a의 제곱수들을 10으로 나눈 나머지 패턴을 찾기
    let value = a % 10;
    while (!cycle.includes(value)) {
      cycle.push(value);
      value = (value * a) % 10;
    }

    // b번째 연산 결과는 cycle의 (b - 1) % cycle.length 번째에 위치
    const result = cycle[(b - 1) % cycle.length];
    console.log(result === 0 ? 10 : result);
  }
});
