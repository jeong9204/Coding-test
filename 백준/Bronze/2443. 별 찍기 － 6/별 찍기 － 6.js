const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('', input => {
  const N = parseInt(input);

  for (let i = 0; i < N; i++) {
    const spaceCount = i; // 줄이 내려갈수록 왼쪽 공백은 1씩 증가
    const starCount = 2 * (N - i) - 1; // 줄이 내려갈수록 별은 2씩 감소

    const spaces = ' '.repeat(spaceCount);
    const stars = '*'.repeat(starCount);

    console.log(spaces + stars);
  }

  rl.close();
});
