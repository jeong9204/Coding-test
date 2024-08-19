const input = require('fs').readFileSync('/dev/stdin').toString().split(' ');
const n1 = parseInt(input[0]);
const n2 = parseInt(input[1]);
const n3 = parseInt(input[2]);

const result = Math.floor((n1 + 1) * (n2 + 1) / (n3 + 1)) - 1;
console.log(result);