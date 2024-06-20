const n = require('fs').readFileSync('/dev/stdin').toString().trim();
const arr = [];

for(i = 0; i < parseInt(n) / 4; i++) {
    arr.push("long");
}
arr.push("int");

console.log(arr.join(' '));