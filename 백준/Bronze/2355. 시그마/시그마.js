const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim().split(' ').map(Number);

const [A, B] = input;

const min = Math.min(A, B);
const max = Math.max(A, B);

const count = max - min + 1;
const sum = (min + max) * count / 2;

console.log(sum);