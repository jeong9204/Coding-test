const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();

const N = Number(input);
const result = [];

for (let i = 1; i <= N; i++) {
  result.push(`Hello World, Judge ${i}!`);
}

console.log(result.join('\n'));