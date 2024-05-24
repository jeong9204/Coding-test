const fs = require('fs');
const inputData = fs.readFileSync('/dev/stdin').toString().split(' ').map(Number);

const A = inputData[0];
const B = inputData[1];

console.log(A+B);
console.log(A-B);
console.log(A*B);
console.log(parseInt(A/B));
console.log(A%B);