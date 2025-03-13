const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim();
const N = Number(input);

let count = 0;
let divisor = 5;

while (N >= divisor) {
    count += Math.floor(N / divisor);
    divisor *= 5;
}

console.log(count);
