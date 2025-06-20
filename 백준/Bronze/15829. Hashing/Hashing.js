const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const input = [];
rl.on('line', line => input.push(line)).on('close', () => {
  const L = Number(input[0]);
  const str = input[1];

  const M = 1234567891;
  const r = 31;
  let hash = 0;
  let power = 1;

  for (let i = 0; i < L; i++) {
    const charValue = str.charCodeAt(i) - 96; // 'a' = 1, 'b' = 2 ...
    hash = (hash + charValue * power) % M;
    power = (power * r) % M; // r^i 값을 매번 갱신
  }

  console.log(hash);
});
