// Adding Trouble

const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split(' ');
const [a, b, c] = input.map(Number);

console.log(a + b === c ? 'correct!' : 'wrong!');
