let input = require('fs').readFileSync(0,{encoding:"utf-8"}).split("\n")[0].split(" ");

console.log((BigInt(input[0]) + BigInt(input[1])).toString());