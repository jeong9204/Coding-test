let [n, m] = require('fs').readFileSync('/dev/stdin').toString().split(' ').map(el => BigInt(el));
if(n === m) {
    console.log(1)
} else {
    console.log(0)
}