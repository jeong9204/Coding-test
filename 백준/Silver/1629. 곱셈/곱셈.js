const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split(' ').map(BigInt);

const [A, B, C] = input;

function modPow(a, b, c) {
    if (b === 0n) return 1n;
    let half = modPow(a, b / 2n, c);
    let result = (half * half) % c;
    if (b % 2n === 1n) {
        result = (result * a) % c;
    }
    return result;
}

console.log(modPow(A, B, C).toString());
