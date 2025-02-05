const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.on('line', (line) => {
  const [N, K] = line.split(' ').map(Number);
  const people = Array.from({ length: N }, (_, i) => i + 1);
  const result = [];
  let index = 0;

  while (people.length > 0) {
    index = (index + K - 1) % people.length;
    result.push(people.splice(index, 1)[0]); // K번째 사람 제거 후 저장
  }

  console.log(`<${result.join(', ')}>`);
  rl.close();
});
