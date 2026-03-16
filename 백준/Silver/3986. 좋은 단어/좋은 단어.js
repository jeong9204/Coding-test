const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim().split('\n');

const N = Number(input[0]);
let goodCount = 0;

for (let i = 1; i <= N; i++) {
  const word = input[i].trim();
  const stack = [];

  for (const ch of word) {
    if (stack.length > 0 && stack[stack.length - 1] === ch) {
      stack.pop();
    } else {
      stack.push(ch);
    }
  }

  if (stack.length === 0) {
    goodCount++;
  }
}

console.log(goodCount);