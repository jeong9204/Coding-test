const input = require('fs').readFileSync(0).toString().split("\n").map((el) => Number(el));
console.log(input.reduce((past, curr) => past + curr, 0));