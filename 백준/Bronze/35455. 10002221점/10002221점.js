const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim().split('\n');

let idx = 0;
const T = Number(input[idx++]);
const answers = [];

for (let t = 0; t < T; t++) {
  const [N, S] = input[idx++].split(' ').map(Number);

  if (S === 10000000 + N) {
    answers.push('Yes');
  } else {
    answers.push('No');
  }
}

console.log(answers.join('\n'));