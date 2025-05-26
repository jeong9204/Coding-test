const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const T = Number(input[0]);
const result = [];

for (let i = 1; i <= T; i++) {
  const original = input[i];
  const modified = original.split('PO').join('PHO'); // 모든 'PO' → 'PHO'
  result.push(modified);
}

console.log(result.join('\n'));
