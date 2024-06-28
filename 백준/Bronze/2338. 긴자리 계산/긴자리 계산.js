const fs = require('fs')
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n')
const [a, b] = [ BigInt(input[0]), BigInt(input[1]) ]

console.log( [a+b, a-b, a*b].join('\n') )