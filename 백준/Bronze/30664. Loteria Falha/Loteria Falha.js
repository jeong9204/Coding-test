const list = require('fs')
  .readFileSync('dev/stdin')
  .toString()
  .trim()
  .split('\n')
  .map(BigInt);

list.pop();

const result = [];
list.forEach(e => {
  if (e % 42n === 0n) {
    result.push('PREMIADO');
  } else {
    result.push('TENTE NOVAMENTE');
  }
});

console.log(result.join('\n'));
